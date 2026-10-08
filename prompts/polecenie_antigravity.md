# Polecenie dla Antigravity — aktualizacja projektu do ipal-kit (najnowsza) + naprawa SEO

Wklej to Antigravity w każdym projekcie. Zastąp `<DOMENA>` domeną produkcyjną.

---

Zaktualizuj ten projekt do najnowszej wersji `@intecion/ipal-kit` i napraw SEO.
Wykonaj PO KOLEI, weryfikując każdy krok. NIE hardkoduj żadnych wartości — jeśli
czegoś brakuje, czytaj z panelu albo env (zasada A0/A0b z antigravity_zasady_agent.md).

## KROK 0 — pobierz dokumentację pluginu
Sprawdź docs pluginu przed zmianami:
`ls node_modules/@intecion/ipal-kit/docs/` — przeczytaj seo.md, storage.md,
deployment.md. Kieruj się nimi.

## KROK 1 — htmlLimitedBots (KRYTYCZNE, najpierw)
W `next.config.ts` dodaj do obiektu nextConfig:
```ts
htmlLimitedBots: /Googlebot|Google-InspectionTool|Storebot-Google|Bingbot|Yandex|DuckDuckBot|Baiduspider|Screaming Frog|AhrefsBot|SemrushBot/i,
```
To wymusza metadata (canonical, hreflang, title, favicon) w <head> dla crawlerów.
Bez tego Next 16 streamuje je do <body> i Google ignoruje (glob favicon, brak canonical).
NIE usuwaj ręcznego <head> z layoutu — to nie jest przyczyna, htmlLimitedBots jest rozwiązaniem.

Weryfikacja po zmianie: `pnpm build` musi przejść.

## KROK 1b — ISR + brak jawnego <head> (KRYTYCZNE SEO)
htmlLimitedBots to za mało — metadata dalej bywa w <body> przy wolnej bazie
(race condition). Dodaj:

1. W page.tsx: `export const revalidate = 3600` (cache strony z gotowym <head>).
2. W layout.tsx: USUŃ jawny `<head>`. MediaPreconnect przenieś do <body>:
```tsx
// ŹLE: <head><MediaPreconnect /></head>
// DOBRZE:
<html lang={locale}>
  <body>
    <MediaPreconnect />
    {children}
  </body>
</html>
```
React 19 hoistuje preconnect do head. Jawny <head> wypycha metadata do body.

Weryfikacja (10 zapytań, nie jedno — race condition):
```bash
for i in $(seq 1 10); do curl -s -A "Googlebot" https://<DOMENA>/pl/strona | python3 -c "import sys;h=sys.stdin.read();e=h.find('</head>');c=h.find('rel=\"canonical\"');print('head' if 0<c<e else 'BODY')"; done
# Cel: 10x 'head'.
```

## KROK 2 — aktualizacja pluginu
```bash
pnpm add @intecion/ipal-kit@latest
```
Restart dev (Payload buduje config przy starcie).
Weryfikacja: `grep '"@intecion/ipal-kit"' package.json` → latest+.

## KROK 3 — usuń hardkody i łaty (jeśli są)
Sprawdź i USUŃ (to antywzorce — patrz A0b):
```bash
grep -rn "R2_PUBLIC_URL.*||.*'https://" src/     # hook z zaszytą domeną
grep -rn "rel=.preconnect.*media\|dns-prefetch.*media" src/  # ręczny preconnect
grep -rn "rel=.icon\|apple-touch-icon" src/       # ręczne tagi favicon
grep -rn "theme_color.*#\|'#[0-9a-fA-F]\{6\}'" src/app/manifest.ts
```
- Hook afterRead z domeną mediów → USUŃ (adapter generuje URL z R2_PUBLIC_URL)
- Ręczny preconnect → zastąp `<MediaPreconnect />` z `@intecion/ipal-kit/rsc`
- Ręczne tagi favicon → USUŃ, użyj `buildIconsMetadata(settings.favicon)` w generateMetadata
- Manifest z zaszytymi kolorami/nazwą → czytaj z panelu, brak danych = pomiń pole
  (NIGDY fallback `|| 'Nazwa Klienta'` — to ukryty hardkod)

## KROK 4 — structured data (SEO/branding)
W root layout (RAZ, dane z panelu, jako <script type="application/ld+json">):
- `buildOrganizationJsonLd` — nazwa, logo
- `buildWebSiteJsonLd` — search TYLKO jeśli jest realna wyszukiwarka
- `buildLocalBusinessJsonLd` — jeśli firma lokalna (usługi + miasto): adres,
  telefon, godziny, geo z globala company. Zastąp ewentualny ręczny schemat.
- `buildSiteNavigationJsonLd` — jeśli jest header nav

Per strona:
- `buildBreadcrumbJsonLd` — podstrony (z realnej ścieżki, nie zaszyte)
- `buildServiceJsonLd` — strony usługowe
- `buildFaqJsonLd` — strony z blokiem FAQ (Q&A MUSI odpowiadać treści strony)

## KROK 5 — noindex na stronach prawnych
W panelu SEO stron: polityka prywatności, regulamin, polityka cookies → zaznacz
`noindex`. Plugin doda robots: noindex, follow (linki dalej przekazują moc).

## KROK 6 — robots.txt (blokada parametrów)
W `app/robots.ts`:
```ts
export { robots as default } from '@/lib/content'
```
Jeśli projekt ma parametry (kalkulatory ?meter=, wyszukiwarka ?s=), przekaż
disallow przez konfigurację buildRobots w lib/content albo dodaj w app/robots.ts.
Sprawdź docs/seo.md sekcja robots.

## KROK 7 — sitemap (force-dynamic)
`app/sitemap.ts` MUSI mieć:
```ts
export { sitemap as default } from '@/lib/content'
export const dynamic = 'force-dynamic'
```
Bez force-dynamic build kontenerowy (Coolify) pada na połączeniu z bazą.
Plugin latest wyklucza strony 404 z sitemap automatycznie.

## KROK 8 — favicon
Jeśli favicon nie pokazuje się w Google (glob):
- Wgraj w panelu PNG (NIE SVG), kwadratowy, ≥48×48 (idealnie 192×192)
- Upewnij się, że root layout używa `buildIconsMetadata(settings.favicon)`
- Po KROKU 1 (htmlLimitedBots) favicon będzie w <head> dla Google

## WERYFIKACJA KOŃCOWA (po deployu)
```bash
# metadata w head dla Googlebota:
curl -A "Googlebot" https://<DOMENA>/pl/dowolna-strona > /tmp/gb.html
python3 -c "html=open('/tmp/gb.html').read(); h=html.find('</head>'); print('canonical w head:', 0<html.find('rel=\"canonical\"')<h)"

# sitemap bez 404:
curl -s https://<DOMENA>/sitemap.xml | grep -c "404"    # 0

# build czysty:
pnpm build
```

## ZASADY (przestrzegaj)
- **MINIMUM kolekcji, nie maksimum.** Rdzeń: pages, media, settings, navigation,
  footer. Kolekcja treści (blog/produkty) TYLKO gdy klient jawnie wymaga. NIE
  twórz: users (wbudowane w Payload!), daneFirmy (=global), FAQ/hero (=bloki),
  navigation/footer/seo (=globale). Test: lista rekordów + własny URL + jawna
  potrzeba. Patrz kolekcje-katalog.md.
- NIE hardkoduj wartości klienta (domena, nazwa, kolor) — env/panel
- NIE pisz własnych rendererów/helperów, których plugin już ma (RenderBlocks,
  buildIconsMetadata, MediaPreconnect, structured data)
- Brak funkcji w pluginie → zgłoś do rozbudowy pluginu, nie łataj w projekcie
- Formularze z buildera w panelu, nie własne
- Wszystko edytowalne przez panel (treść), kod tylko dla struktury/wyglądu

Po wykonaniu napisz raport: co zmienione, co zweryfikowane, czy build czysty,
czy metadata w head, czy sitemap bez 404.
