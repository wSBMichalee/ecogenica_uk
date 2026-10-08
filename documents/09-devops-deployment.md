# 09 — DevOps, deployment, jakość

Rola: senior DevOps. Środowiska, CI, bezpieczeństwo, wydajność, monitoring.
Szczegóły pluginu: `docs/deployment.md`, `docs/security.md`, `docs/storage.md`.

---

## 1. Środowiska

| Env | Domena | Baza | Media | Cel |
|---|---|---|---|---|
| local | localhost:3000 | Postgres w Dockerze | lokalny dysk (fallback R2) | dev |
| staging | `staging.ecogenica.co.uk` (basic auth / Cloudflare Access) | Postgres staging | R2 bucket `ecogenica-staging` | akceptacja klienta, noindex |
| production | `ecogenica.co.uk` | Postgres prod | R2 `ecogenica-media` + `media.ecogenica.co.uk` | live |

Staging: `robots` disallow all + nagłówek `X-Robots-Tag: noindex` (z env, nie
z kodu warunkowego na nazwę domeny).

## 2. `.env.example` (bez wartości)

```bash
# Core
DATABASE_URI=
PAYLOAD_SECRET=
NEXT_PUBLIC_SERVER_URL=          # https://ecogenica.co.uk

# R2 (patrz r2_env_przyklad.md)
R2_BUCKET=
R2_ENDPOINT=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_PUBLIC_URL=                   # https://media.ecogenica.co.uk

# E-mail — Graph (jeśli M365) albo SMTP w panelu
GRAPH_TENANT_ID=
GRAPH_CLIENT_ID=
GRAPH_CLIENT_SECRET=
GRAPH_SENDER=

# Opcjonalne
GOOGLE_PLACES_API_KEY=           # tylko jeśli rating z Google (server-side)
SEARCH_ENGINE_NOINDEX=           # true na staging
```
Klucze GA4/Meta/Turnstile/Spruce URL → `siteIntegrations` w panelu.
Zmienne R2/Graph w **runtime** env Coolify, nie build.

## 3. Build i deploy (Coolify)
- Dockerfile multi-stage, Node 22-alpine, `pnpm install --frozen-lockfile`,
  `pnpm build` (= `next build --webpack`), output `standalone`.
- `sitemap.ts` z `force-dynamic` (build w kontenerze nie łączy się z bazą).
- Migracje Payload (`payload migrate`) jako krok przed startem kontenera.
- Healthcheck: `/api/health` (jeśli plugin ma; inaczej prosty route — raport?
  To trywialne, projektowe — dozwolone, bez treści).
- Zero-downtime: Coolify rolling; rollback = poprzedni obraz.
- Cloudflare: proxy, SSL Full (strict), cache statyki `/_next/static` 1 rok,
  HTML bez cache na edge (ISR robi Next), **Email Obfuscation OFF**
  (pułapka z `migracja_projekty.md` E4), Rocket Loader OFF.

## 4. Bezpieczeństwo
- `buildSecurityHeaders` w `next.config.ts` (HSTS, COOP, nosniff, Referrer-Policy).
- `buildCsp` — flagi: turnstile, analytics, r2Url; dodatkowo w projekcie:
  `frame-src https://app.spruce.eco` (+ Google Maps po zgodzie),
  `connect-src` GA4, `img-src` R2 + Google (jeśli rating avatars).
  Wdrożenie: `report-only` na staging 1 tydzień → `enforce`.
  Bez Trusted Types (psuje Turnstile/GA).
- 2FA wymuszone (`twoFactor: { issuer: 'Ecogenica' }`).
- `adminRoute: '/its'` + folder przeniesiony.
- Role w panelu: `admin` (Intecion), `editor` (Ecogenica — treść, bez
  siteIntegrations). Access control na kolekcjach i globalach.
- Rate limit + Turnstile na formularzach (plugin).
- Uploady formularzy: limit 10 MB/plik, tylko image/* i PDF, skan typu po
  stronie serwera (magic bytes).

## 5. Backup i odtwarzanie
- Postgres: dzienny `pg_dump` → osobny bucket R2 (`ecogenica-backups`),
  retencja 30 dni + miesięczne 12 mies. Test odtworzenia raz na kwartał.
- R2 media: wersjonowanie/replika w osobnym buckecie (lub lifecycle copy).

## 6. CI (Gitea Actions / GitHub Actions — wg repo Intecion)
Na każdy PR:
1. `pnpm lint` + `tsc --noEmit` (zero `any`, zero `@ts-ignore`)
2. `pnpm build`
3. Grep-strażnicy (z playbooka):
   ```bash
   test ! -f src/middleware.ts
   ! grep -rn "localizedRoutes\|as any\|@ts-ignore" src/
   ! grep -rnE "href=\"/(heat-pumps|contact|support|get-a-quote)" src/
   ! grep -rnE "ecogenica\.co\.uk|0116|07539|Atherstone|15127696" src/   # dane klienta w kodzie
   ! grep -rn "<head>" src/app
   ```
4. `npx impeccable detect src/` (detektor slop w kodzie; exit code ≠ 0 = fail)
5. Preview deploy → `npx impeccable detect https://preview…` + Lighthouse CI
   (budżety niżej) + Playwright smoke + axe-core.

## 7. Budżety wydajności (Lighthouse CI, mobile, throttling domyślny)

| Strona | LCP | CLS | TBT | JS (gz, first load) |
|---|---|---|---|---|
| Home | < 2.0 s | < 0.05 | < 150 ms | ≤ 170 kB |
| Gama / produkt | < 1.8 s | < 0.05 | < 120 ms | ≤ 150 kB |
| Support / Contact / Quote | < 1.5 s | < 0.02 | < 80 ms | ≤ 120 kB |
Accessibility ≥ 95, SEO = 100, Best Practices ≥ 95.

Techniki: poster hero `priority` + AVIF; wideo lazy; GSAP i sekwencje
dynamic import; fonty `next/font/local` z `display: swap` i subsetem Latin;
`sizes` na każdym `Image`; bloki client jako wyspy.

## 8. Testy
- **Playwright smoke** (staging): wszystkie strony 200, root redirect wg i18n,
  formularz kontaktowy wysyła (mailbox testowy), checker grantu daje 3 wyniki,
  climate range zmienia odczyt, cookie banner: reject → brak GA w Network.
- **axe-core** na każdej stronie: 0 krytycznych.
- **Visual regression** (opcjonalnie): Playwright screenshots Home/produkt.
- **Manual**: iPhone Safari (exploded view, wideo), Android Chrome, VoiceOver
  na formularzu rejestracji, klawiatura w mega-menu.

## 9. Monitoring
- Uptime (Better Stack / Uptime Kuma) na `/` i `/api/health`, co 1 min.
- Logi błędów: Sentry (DSN w env; **za zgodą** dla session replay — replay OFF).
- Cloudflare Web Analytics (bez cookies) jako uzupełnienie GA bez zgody.
- Alert: wzrost 404 (nowe redirecty), błędy wysyłki e-mail (log pluginu).

## 10. Przekazanie klientowi
- Konta editor z 2FA, krótki film „jak edytować stronę / produkt / opinię”.
- Dokument: role stron systemowych, gdzie są kwoty grantu (`grantAmounts`)
  i **że trzeba je aktualizować** (`lastReviewed`), rejestr claimów.
