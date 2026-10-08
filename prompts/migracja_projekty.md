# Migracja istniejących projektów → ipal-kit (najnowsza wersja) + naprawa SEO

Jednorazowy playbook do przejścia przez KAŻDY istniejący projekt. Uniwersalny —
zastąp `<PROJEKT>` nazwą projektu, `<DOMENA>` domeną produkcyjną. Przechodź
sekcjami, odhaczaj. Sekcje ułożone wg priorytetu: A (krytyczne SEO) → E (audyt).

> Zasada: rób JEDNĄ sekcję na raz, weryfikuj, potem następna. Nie wszystko naraz.

---

## A. KRYTYCZNE — metadata w <head> dla Google (htmlLimitedBots)

**Największa naprawa SEO. Dotyczy KAŻDEGO projektu.** Bez tego canonical,
hreflang, title i favicon są w <body> (Next streamuje je), crawlery ignorują.

### Zmiana w `next.config.ts`

Dodaj do obiektu `nextConfig`:
```ts
const nextConfig: NextConfig = {
  htmlLimitedBots:
    /Googlebot|Google-InspectionTool|Storebot-Google|Bingbot|Yandex|DuckDuckBot|Baiduspider|Screaming Frog|AhrefsBot|SemrushBot/i,
  // ...reszta bez zmian
}
```

### Weryfikacja (po deployu)
```bash
curl -A "Googlebot" https://<DOMENA>/pl/<dowolna-strona> > /tmp/gb.html
python3 -c "
html=open('/tmp/gb.html').read(); h=html.find('</head>')
for t,n in [('canonical','rel=\"canonical\"'),('hreflang','hreflang'),('title','<title'),('favicon','rel=\"icon\"')]:
    p=html.find(n); print(f'{t:10} w head: {0<p<h}')
"
```
Wszystkie cztery `True` → OK. Jeśli którykolwiek `False` → build nie objął zmiany
albo deploy niegotowy.

- [ ] htmlLimitedBots dodane
- [ ] build + deploy
- [ ] curl Googlebot: canonical/hreflang/title/favicon w head = True

---

## B. Aktualizacja pluginu do latest

```bash
cd <PROJEKT>
pnpm add @intecion/ipal-kit@latest
# jeśli używa R2:
pnpm add @payloadcms/storage-s3   # jeśli jeszcze nie ma
```

### Weryfikacja
```bash
grep '"@intecion/ipal-kit"' package.json    # latest
# nowe helpery dostępne:
grep -c "buildLocalBusinessJsonLd" node_modules/@intecion/ipal-kit/dist/index.js  # >0
```
Po aktualizacji ZAWSZE restart dev (Payload buduje config przy starcie).

- [ ] pnpm add @intecion/ipal-kit@latest
- [ ] restart dev

---

## B2. Bezpieczeństwo — 2FA + panel (NOWE, dla każdego projektu)

### 2FA WYMUSZONE
```bash
pnpm add @clocklimited/payload-2fa@3.0.0-beta.7
```
```ts
ipalKit({ twoFactor: { issuer: 'Nazwa Firmy' }, /* ... */ })
```
Wymusza TOTP dla wszystkich użytkowników. Przy pierwszym logowaniu każdy
konfiguruje aplikację authenticator. Patrz security.md.

- [ ] @clocklimited/payload-2fa zainstalowane
- [ ] twoFactor: { issuer } w ipalKit
- [ ] test: nowe logowanie wymaga setupu TOTP

### Ścieżka panelu (opcjonalnie)
```ts
ipalKit({ adminRoute: '/its', /* ... */ })
```
+ przenieś `app/(payload)/admin/` → `app/(payload)/its/`

- [ ] adminRoute + folder przeniesiony (jeśli chcesz ukryć panel)

### CSP + nagłówki
- [ ] buildSecurityHeaders w next.config (COOP z automatu)
- [ ] buildCsp (report-only → enforce) jeśli potrzeba

## C. Usuń hardkody / łaty w projekcie (jeśli są)

Antigravity w niektórych projektach zaszył wartości. Sprawdź i usuń:

### Sprawdzenie
```bash
cd <PROJEKT>
# hook afterRead z zaszytą domeną mediów:
grep -rn "R2_PUBLIC_URL.*||.*'https://\|afterRead.*media" src/ | grep -v ".map"
# ręczny preconnect z zaszytą domeną:
grep -rn "rel=.preconnect.*media\|dns-prefetch.*media" src/ | grep -v ".map"
# ręczne tagi favicon (powinno być buildIconsMetadata):
grep -rn "rel=.icon\|apple-touch-icon" src/ | grep -v ".map"
# manifest z hardkodami:
grep -rn "'#[0-9a-fA-F]\{6\}'\|theme_color.*#" src/app/manifest.ts 2>/dev/null
```

### Naprawa (jeśli coś znalazło)
- Hook afterRead z domeną → USUŃ (adapter generuje URL z R2_PUBLIC_URL)
- Ręczny preconnect → zastąp `<MediaPreconnect />` z `@intecion/ipal-kit/rsc`
- Ręczne tagi favicon → USUŃ, użyj `buildIconsMetadata(settings.favicon)` w metadata
- Manifest z kolorami/nazwą na sztywno → czytaj z panelu (patrz docs/seo.md)

- [ ] brak hooka afterRead z zaszytą domeną
- [ ] preconnect przez MediaPreconnect (nie ręczny)
- [ ] favicon przez buildIconsMetadata (nie ręczne tagi)
- [ ] manifest bez hardkodów (albo pomija pola bez danych)

---

## D. Wepnij structured data (jeśli brakuje) — SEO/branding

Nowe helpery latest. Wepnij te, które pasują do projektu.

### Root layout (RAZ, dane z panelu)
```tsx
import { buildOrganizationJsonLd, buildWebSiteJsonLd,
         buildLocalBusinessJsonLd, buildSiteNavigationJsonLd } from '@intecion/ipal-kit'

// Organization — zawsze
// WebSite — zawsze (search tylko jeśli jest wyszukiwarka)
// LocalBusiness — firmy lokalne (usługi + miasto): adres, telefon, godziny z panelu
// SiteNavigation — jeśli jest header nav
// każdy jako <script type="application/ld+json" dangerouslySetInnerHTML=...>
```

### Per strona (jeśli dotyczy)
```tsx
import { buildBreadcrumbJsonLd, buildServiceJsonLd, buildFaqJsonLd } from '@intecion/ipal-kit'
// Breadcrumb — podstrony (z realnej ścieżki)
// Service — strony usługowe (usługa + miasto)
// FAQ — strony z blokiem FAQ (Q&A musi odpowiadać treści!)
```

Firmy lokalne: zamień ewentualny ręczny `cleaningServiceLd`/podobny na
`buildLocalBusinessJsonLd` (dane z globala company).

### Weryfikacja
```bash
curl -s https://<DOMENA>/pl | grep -o 'application/ld+json' | wc -l   # liczba schematów
# + Google Rich Results Test (wklej URL): https://search.google.com/test/rich-results
```

- [ ] Organization + WebSite w root layout
- [ ] LocalBusiness (jeśli firma lokalna)
- [ ] Breadcrumb na podstronach
- [ ] Rich Results Test bez błędów

---

## E. Naprawy z audytu SEO (per projekt)

### E1. noindex na stronach prawnych
Strony polityki/regulamin/cookies NIE powinny być w indeksie (kanibalizacja).
```ts
// w meta strony (panel SEO): noindex = true
// buildMetadata automatycznie doda robots: noindex, follow
```
Ustaw `noindex` dla: polityka prywatności, regulamin, polityka cookies.

- [ ] noindex na stronach prawnych

### E2. robots.txt — blokada parametrów
```ts
// app/robots.ts
export default function robots() {
  return buildRobots({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL!,
    disallow: ['/admin', '/api', '/*?meter=*', '/*?s=*'],  // + parametry projektu
  })
}
```
Dostosuj parametry do projektu (kalkulatory, wyszukiwarka).

- [ ] robots blokuje parametry (jeśli są)

### E3. sitemap — force-dynamic + bez /404
```ts
// app/sitemap.ts
export { sitemap as default } from '@/lib/content'
export const dynamic = 'force-dynamic'   // KONIECZNE (deploy kontenerowy)
```
Sprawdź, czy sitemap NIE zawiera `/pl/404` ani stron noindex.

```bash
curl -s https://<DOMENA>/sitemap.xml | grep -c "404"   # ma być 0
curl -s https://<DOMENA>/robots.txt                     # sprawdź zawartość
```

- [ ] sitemap ma force-dynamic
- [ ] sitemap bez /404, bez stron noindex

### E4. Cloudflare Email Obfuscation (jeśli generuje 404)
Objaw: link `/cdn-cgi/l/email-protection` → 404.
Napraw: Cloudflare → Scrape Shield → Email Address Obfuscation → OFF.
Albo owiń maile: `<!--email_off-->mail@domena<!--/email_off-->`.

- [ ] Email Obfuscation wyłączone (jeśli był problem)

### E5. Martwe linki zewnętrzne
```bash
# znajdź linki wychodzące, sprawdź czy żyją:
grep -rn "href=.https://" src/ | grep -v ".map" | grep -v "<DOMENA>"
```
Usuń/popraw martwe (np. link agencji, który już nie istnieje).

- [ ] brak martwych linków zewnętrznych

### E6. Tytuły stron (SEO)
Każda strona: unikalny, opisowy meta.title, słowa kluczowe na początku,
50-60 znaków. Strona główna: `titleOverride` z pełnym tytułem.
- Bez "Strona Główna", "Home" jako title
- Schemat usług: `[Usługa] [Miasto] | [Marka]`
- Bez dublowania marki (meta.title bez nazwy firmy — plugin dokłada siteName)

- [ ] tytuły unikalne, opisowe, ze słowami kluczowymi
- [ ] strona główna: sensowny titleOverride

### E7. Favicon (jeśli glob w Google)
- PNG (NIE SVG), kwadratowy, wielokrotność 48 (min 48×48, idealnie 192×192)
- Wgrany w panelu (buildIconsMetadata generuje tag)
- Po htmlLimitedBots (sekcja A) favicon jest w head → Google go zobaczy
- Search Console → re-crawl strony głównej (cache favicony wolny: dni/tygodnie)

- [ ] favicon PNG ≥48×48 kwadratowy w panelu

### E8. Wydajność mobile (LCP) — jeśli słaba
- Obraz hero: `priority` (fetchpriority high) na komponencie Image
- `sizes` dopasowane do mobile (mniejszy obraz na telefon)
- Format WebP/AVIF (Next Image robi automatycznie z R2)

- [ ] hero image ma priority (jeśli LCP > 2.5s mobile)

---

## F. Compliance (jeśli brakuje)

- [ ] Strony polityk istnieją (privacy, cookies, terms) — role System Pages
- [ ] Baner cookies działa (analytics nie ładuje się przed zgodą)
- [ ] Formularze mają zgodę RODO (checkbox required)
- [ ] Dane administratora w globalu company

Patrz docs/wymagania-prawne.md.

---

## G. Search Console (po wszystkich zmianach)

1. Inspekcja URL strony głównej + kluczowych podstron
2. Poproś o ponowne indeksowanie
3. Sprawdź "User-declared canonical" — powinien pokazywać Twój canonical (nie None)
4. Usuń stare sitemapy z GSC (www, stare domeny), zostaw aktualną
5. Poczekaj — indeksacja i favicon: dni do tygodni

- [ ] re-crawl kluczowych stron
- [ ] canonical rozpoznany w GSC
- [ ] stare sitemapy usunięte z GSC

---

## CHECKLIST SKRÓCONA (per projekt)

```
[ ] A. htmlLimitedBots w next.config + deploy + curl test
[ ] B. pnpm add @intecion/ipal-kit@latest + restart
[ ] C. usuń hardkody (hook, preconnect, favicon, manifest)
[ ] D. structured data wpięte (Organization, WebSite, Local, Breadcrumb)
[ ] E1. noindex na prawnych
[ ] E2. robots blokuje parametry
[ ] E3. sitemap force-dynamic, bez /404
[ ] E4. Cloudflare email (jeśli 404)
[ ] E5. martwe linki usunięte
[ ] E6. tytuły SEO
[ ] E7. favicon PNG (jeśli glob)
[ ] E8. LCP hero priority (jeśli słaba)
[ ] F. compliance
[ ] G. Search Console re-crawl
```

Priorytet: A (natychmiast, największy efekt) → B → reszta wg potrzeb projektu.
Nie każdy projekt potrzebuje wszystkiego z E (zależy od audytu danego projektu).
