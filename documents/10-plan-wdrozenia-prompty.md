# 10 — Plan wdrożenia + gotowe polecenia dla Antigravity i Impeccable

Workflow Michała: Claude pisze prompt → Antigravity wykonuje i commituje →
Michał testuje i raportuje. Każda faza ma **jedno polecenie do wklejenia** i
**test akceptacyjny**. Nie przechodzimy dalej, dopóki test nie jest zielony.

Przed fazą 1 do repo projektu trafiają: `agents.md` (z załączników),
`antigravity_zasady_agent.md`, oraz cały ten folder jako `docs/plan/`.

---

## Faza 0 — decyzje klienta (blokujące copy, nie kod)
Lista w `00-README.md` §4. Kod można zaczynać równolegle.

---

## Faza 1 — szkielet i fundament

```text
Przeczytaj agents.md, antigravity_zasady_agent.md i docs/plan/02-architektura.md.
Zbuduj szkielet projektu Ecogenica UK: Payload 3 + Next 16, pnpm, Node 22.

1. .npmrc z rejestrem @intecion, pnpm add @intecion/ipal-kit, przeczytaj
   node_modules/@intecion/ipal-kit/docs/ (getting-started, i18n, seo, security,
   storage, forms, consent, blocks, content, kolekcje-katalog).
2. i18n.config.ts: jeden locale "en". Sprawdź w docs/i18n.md tryb strony
   jednojęzycznej bez prefiksu i opisz w raporcie, co wybrałeś i dlaczego.
3. payload.config.ts: ipalKit({...}), email: mailAdapter(), postgres,
   twoFactor: { issuer: 'Ecogenica' } (+ @clocklimited/payload-2fa@3.0.0-beta.7),
   adminRoute '/its' z przeniesieniem folderu admina.
4. Rdzeń: pages, media (normalizeFilenameHook, imageSizes z planu §5, mime: obrazy,
   mp4, webm, pdf), siteSettings, siteIntegrations, navigation, footer, forms.
   Dane firmy w globalu przewidzianym przez plugin + pola locations[] i phones[]
   z purpose (sales/support/warranty/general). NIE twórz users ani kolekcji
   na dane firmy.
5. buildR2Storage(['media']) z env, .env.example wg docs/plan/09 §2.
6. lib/content.ts (createContentHelpers, jedno źródło getCachedPayload) i lib/payload.ts.
7. proxy.ts (NIE middleware.ts). [[...slug]]/page.tsx z RenderBlocks + registry,
   revalidate = 3600, export { generateStaticParams } from '@/lib/content'.
8. Layout bez <head>, MediaPreconnect w <body>, ConsentProvider, CookieBanner,
   CookieButton, Analytics, TurnstileProvider. not-found.tsx z treścią z panelu.
9. next.config.ts: htmlLimitedBots, buildSecurityHeaders, buildCsp (report-only).
10. robots.ts, sitemap.ts (force-dynamic), manifest.ts (brak danych = pomiń pole),
    buildIconsMetadata, Organization + WebSite + SiteNavigation JSON-LD.
11. Hooki: buildRevalidateHook, trackSlugHistoryHook, buildPreventDeleteSystemPage,
    buildValidateUniqueRole.
Zero tekstu w JSX, zero danych Ecogenica w kodzie, zero any/@ts-ignore.
Zapisz ustalenia w agents.md projektu. Na koniec: pnpm build --webpack i raport
(co zrobione, co sprawdzone grepem, czego brakuje w pluginie).
```

**Test:** build OK · panel pod `/its` wymaga 2FA · `curl -A Googlebot` ×10 → canonical
w `<head>` · sitemap bez 404 · grep-strażnicy z `09` §6 = czysto.

---

## Faza 2 — kolekcje treści

```text
Wg docs/plan/02-architektura.md §3.3 dodaj kolekcje:
- products (wszystkie pola z planu, w tym specs, performance[], explodedView,
  documents, typicalHomeFit, status, specSource wymagane), wpięta w contentConfig
  z archiveSlug 'heat-pumps';
- testimonials (bez trasy, NIE w contentConfig) z walidacją: publikacja wymaga
  verifiedAt i consentOnFile;
- redirects (mapa z docs/plan/07 §1) + obsługa 301 przez mechanizm pluginu
  (sprawdź docs; jeśli brak — raport, nie własny middleware).
pnpm generate:types. Wprowadź seed danych Outback 5/8/11/16 z tabeli
w docs/plan/01 §2.2 TYLKO jako plik seed (scripts/seed.ts), nie w komponentach.
Wallaroo jako status comingSoon. Raport + build.
```
**Test:** 5 produktów w panelu, `/heat-pumps/outback-8kw` renderuje się (pusty szablon OK),
sitemap zawiera produkty, testimonial bez `consentOnFile` nie publikuje się.

---

## Faza 3 — bloki (funkcjonalnie, surowe wizualnie)

```text
Zbuduj wszystkie bloki z docs/plan/05-bloki-cms.md: config.ts + Component.tsx
w osobnych folderach, slug camelCase = klucz w registry.ts, wspólne pola
blockBase (anchorId, tone, spacing, hidden) i linkField (telefon/e-mail przez
rolę z globala). Dane z lib przekazuj przez enhanceProps w page.tsx, bloki nie
importują lib. RSC domyślnie; 'use client' tylko: heroVideo (wideo), explodedView,
climateRange, grantChecker, quoteEmbed, testimonials (scroller), compareTable
(mobile), formBlock. Walidacja claimSource przy publikacji. Szablon produktu
wg docs/plan/podstrony/12-produkt-szablon.md. Mega-menu, stopka, pasek mobilny,
announcement bar wg podstrony/00-elementy-globalne.md.
NIE dopieszczaj wyglądu — tylko semantyczny HTML, poprawne nagłówki, a11y,
podstawowa siatka. Wygląd zrobi Impeccable w fazie 5.
Brakujące w pluginie rzeczy (upload w formularzu, Product JSON-LD, consent
embed, announcement expiry) — raporty wg docs/plan/06 §8, bez łatania.
```
**Test:** test „wszystko przez panel” (antigravity_zasady_agent.md część D) dla każdej strony ·
każda strona z `podstrony/*` złożona w panelu z bloków · JS wyłączony = cała treść widoczna.

---

## Faza 4 — Impeccable: kontekst i kierunek

```text
npx impeccable install (build dla Antigravity), /impeccable init — użyj treści
PRODUCT.md z docs/plan/03 §3, /impeccable hooks on, /impeccable document
w trybie seed z tokenami z docs/plan/03 §4. Utwórz .impeccable/surfaces/*.md
z sekcji "Brief Impeccable" każdego pliku docs/plan/podstrony/*.
Następnie: /impeccable shape the homepage for homeowners and installers,
potem /impeccable design the homepage (comp-led, jeśli image generation
włączone). Pokaż mi warianty kierunku przed zmianami w kodzie.
```
**Test:** Michał akceptuje kierunek Home (screen/mockup) · `PRODUCT.md`, `DESIGN.md`
przejrzane i poprawione.

---

## Faza 5 — Impeccable: wygląd stron (kolejność)

```text
Pracuj strona po stronie, w tej kolejności: Home, produkt (szablon), gama,
BUS, Installers, Support, Manuals, How it works, About, Wallaroo, Quote,
Contact, FAQ, legal, 404, globalne (header/mega-menu/stopka).
Dla każdej: /impeccable critique → typeset → layout → colorize →
(Persuade: bolder/delight; Operate: quieter/distill) → adapt for mobile →
polish → audit. Trzymaj się DESIGN.md i listy zakazów z docs/plan/03 §7.
Impeccable nie dodaje tekstu do JSX — jeśli potrzebny nowy tekst, dodaj pole
do bloku. Po każdej stronie: npx impeccable detect + screenshot desktop/mobile.
```
**Test:** `impeccable detect` = 0 findings na każdej stronie · `audit` bez P0/P1.

---

## Faza 6 — motion, kursor, efekty

```text
Zaimplementuj docs/plan/04-motion-efekty.md: E1 (przejście outside→inside
z polem tone), E2 (hero wideo → karta + odczyty), E3 (exploded view canvas
lub webm scrub — zmierz oba na iPhone Safari, wybierz szybszy), E4 (climate
range z interpolacją i komunikatem poza zakresem), E5–E10, custom cursor wg §4
(etykiety z siteSettings.uiLabels, tylko pointer:fine, wyłączany w panelu).
GSAP przez dynamic import. Reduced motion i reduced data wg §1.
Potem /impeccable animate dla każdej sekcji z ruchem i /impeccable optimize
the homepage. Raport z pomiarami (LCP, INP, fps).
```
**Test:** checklista `04` §6 · budżety `09` §7.

---

## Faza 7 — integracje i compliance

```text
Wg docs/plan/06 i 08: GA4 przez komponent pluginu (za zgodą), Meta Pixel
(jeśli klient potwierdzi), quoteEmbed Spruce za zgodą z fallbackiem, CSP
uzupełniona o Spruce, formularze w builderze (kontakt, partner, rejestracja,
Wallaroo interest, data request) z consent + osobnym marketing opt-in,
powiadomienia e-mail na właściwe skrzynki, zdarzenia GA4. Przejdź checklistę
08 §7 i wymagania_prawne §5. CSP z report-only na enforce po tygodniu.
```
**Test:** Network przed zgodą czysty · każdy formularz dociera na właściwą skrzynkę · CSP bez naruszeń.

### Faza 7b — GEO

```text
Wdróż docs/plan/11-geo-ai-search.md: reguły robots per user-agent (przez
plugin; jeśli buildRobots tego nie wspiera — raport do pluginu), rozszerzony
regex htmlLimitedBots o boty AI, llms.txt z pluginu, Organization JSON-LD
z sameAs/parentOrganization/contactPoint, dateModified na stronach treściowych,
tabele HTML z caption na stronach produktów. Sprawdź curl z user-agentem
GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot: status 200 i metadata w <head>.
Raport + lista rzeczy do ustawienia ręcznie (Cloudflare AI bots, Bing Webmaster Tools).
```
**Test:** curl z 4 user-agentami AI → 200 + canonical w `<head>` · checklista `11` §7.

---

## Faza 8 — treść, migracja, start
1. Wgranie finalnego copy (po akceptacji klienta), zdjęć z sesji, wideo, PDF.
2. Redirects (`07` §1) + test każdego starego URL-a (skrypt curl -I).
3. Staging → akceptacja klienta → produkcja (Coolify), DNS przez Cloudflare.
4. Search Console, monitoring (`09` §9), 30 dni obserwacji 404.
5. `/impeccable document` — odświeżenie DESIGN.md z kodu produkcyjnego.

---

## Szacunek (orientacyjnie, dni robocze zespołu)
| Faza | Dni |
|---|---|
| 1 Szkielet | 2 |
| 2 Kolekcje | 1.5 |
| 3 Bloki + szablony + globalne | 5 |
| 4 Impeccable kontekst/kierunek | 1 |
| 5 Wygląd stron | 5–6 |
| 6 Motion + kursor | 4 |
| 7 Integracje + compliance | 2 |
| 8 Treść + migracja + start | 2–3 |
| **Razem** | **~23–25** + czas klienta na treści, zdjęcia, wideo, rendery 3D |
