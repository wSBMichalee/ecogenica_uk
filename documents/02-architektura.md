# 02 — Architektura (Payload 3 + Next 16 + @intecion/ipal-kit)

Rola: senior Next.js / Payload. Ten plik mówi, **jakie byty powstają, dlaczego,
i jak spina je ipal-kit**. Wszystkie reguły z `agents.md`,
`antigravity_zasady_agent.md`, `fundamenty-projektu.md`, `kolekcje-katalog.md`
i `standardy-kodu.md` obowiązują bez wyjątków — tu ich NIE powtarzam, tylko
stosuję. Wszelkie sygnatury → `node_modules/@intecion/ipal-kit/docs/` + `.d.ts`.

---

## 1. Stack

| Warstwa | Wybór | Uwagi |
|---|---|---|
| Runtime | Node 22, pnpm | |
| Framework | Next 16 (App Router), React 19 | build `next build --webpack` |
| CMS | Payload 3 | panel pod `adminRoute: '/its'` (folder `app/(payload)/its/`) |
| Plugin | `@intecion/ipal-kit` (latest) z rejestru Gitea (`.npmrc`) | NIGDY z gita |
| Baza | PostgreSQL (`@payloadcms/db-postgres`) | backup dzienny (patrz `09`) |
| Media | Cloudflare R2 przez `buildR2Storage(['media'])` | env z `r2_env_przyklad.md`, `R2_PUBLIC_URL=https://media.ecogenica.co.uk` |
| Style | Tailwind 4 + tokeny z `DESIGN.md` | `@source` na plugin w `styles.css` |
| Motion | GSAP + ScrollTrigger (code-split), CSS scroll-driven gdzie wystarczy | patrz `04-motion-efekty.md` |
| E-mail | `email: mailAdapter()` — Graph jeśli klient na M365, inaczej SMTP | wybór w panelu |
| Captcha | Turnstile (TurnstileProvider w layoutcie) | |
| 2FA | `twoFactor: { issuer: 'Ecogenica' }` + `@clocklimited/payload-2fa@3.0.0-beta.7` | wymuszone |
| Hosting | Coolify (kontener) + Cloudflare przed | patrz `09-devops-deployment.md` |

---

## 2. Język i routing

- **Jeden locale: `en` (British English).** Rynek UK. Wszystkie pola treści i tak
  `localized: true` — dołożenie np. walijskiego (`cy`) = zmiana w
  `i18n.config.ts`, zero zmian w blokach.
- Tryb strony jednojęzycznej (bez prefiksu `/en`) — **sprawdź `docs/i18n.md`**,
  czy plugin go wspiera. Jeśli tak → bez prefiksu (stare URL-e są bez prefiksu,
  mniej przekierowań). Jeśli nie → prefiks `/en` i komplet 301 (patrz `07`).
  NIE pisać własnej negocjacji locale.
- `proxy.ts` (NIGDY `middleware.ts`) z `@intecion/ipal-kit/next/middleware`.
- `[[...slug]]/page.tsx` + `export { generateStaticParams } from '@/lib/content'`
  + `export const revalidate = 3600` + `buildRevalidateHook` w kolekcjach.
- Layout bez jawnego `<head>`, `<MediaPreconnect />` w `<body>`.
- `htmlLimitedBots` w `next.config.ts`.

### Docelowa mapa URL (slugi z panelu — poniżej tylko propozycja treści)

```
/                                  Home (rola systemowa: homepage)
/heat-pumps                        Gama Outback (strona z bloków)
/heat-pumps/outback-5kw            ┐
/heat-pumps/outback-8kw            │ kolekcja products (archiveSlug: heat-pumps)
/heat-pumps/outback-11kw           │
/heat-pumps/outback-16kw           │
/heat-pumps/wallaroo               ┘ (status: coming soon)
/boiler-upgrade-scheme             Przewodnik BUS + checker
/how-it-works                      Proces + co się dzieje w dniu instalacji
/installers                        Program partnerski dla instalatorów
/support                           Serwis, gwarancja, rejestracja produktu
/support/manuals                   Manuale i karty (generowane z products)
/about                             O firmie
/get-a-quote                       Wycena (Spruce)
/contact                           Kontakt
/faq                               FAQ zbiorcze
/privacy-policy  /cookie-policy  /terms   (System Pages, noindex)
```

Linki w kodzie: zawsze `getSystemPagePath` / relacje `→ pages` / `getLocalizedSlugs`.
Powyższe ścieżki NIE pojawiają się w kodzie.

---

## 3. Byty danych — MINIMUM, z uzasadnieniem

### 3.1 Rdzeń (zawsze)

| Byt | Typ | Zawartość dla Ecogenica |
|---|---|---|
| `pages` | collection | Wszystkie strony z bloków; `buildSlugField`, SEO tab, role System Pages, `trackSlugHistoryHook`, `buildRevalidateHook`, `buildPreventDeleteSystemPage` |
| `media` | collection (upload) | `normalizeFilenameHook`; `imageSizes` (patrz §5); dozwolone też `video/mp4`, `video/webm`, `application/pdf`, `model/gltf-binary` (jeśli 3D) |
| `siteSettings` | global | nazwa, logo (jasne/ciemne), favicon PNG 192, domyślne SEO, homepage, **etykiety kursora i UI** (patrz §6) |
| `siteIntegrations` | global | GA4/GTM ID, Meta Pixel ID, Turnstile, SMTP/Graph, Spruce embed URL — admin-only |
| `navigation` | global | mega-menu (patrz `podstrony/00-globalne-elementy.md`) |
| `footer` | global | kolumny linków, dane firmy, social, tekst prawny |

**Dane firmy** (nazwa prawna, Company No., VAT, siedziba rejestrowa, magazyn,
telefony, e-maile, godziny) → global firmowy, który przewiduje plugin
(`siteSettings` albo `company` — **sprawdź w docs, nie twórz drugiego**). Pola
specyficzne dla Ecogenica, których plugin nie ma (dwa adresy, telefon
sprzedaży vs wsparcia, godziny 7 dni) → array `locations` + array `phones`
z polem `purpose` (select: sales / support / warranty / general).

### 3.2 Compliance
| Byt | Typ |
|---|---|
| `forms` + `form-submissions` | z buildera pluginu (formularze: kontakt, partner-instalator, rejestracja produktu, callback) |
| System Pages | privacyPolicy, cookiePolicy, termsOfService |

### 3.3 Treść — tylko to, co przechodzi test z `kolekcje-katalog.md`

#### `products` — TAK (kolekcja z trasą)
Test: lista wielu rekordów ✓ (Outback ×4 + Wallaroo + przyszłe modele / cylindry),
każdy ma własny URL ✓ (SEO „Outback 8kW heat pump”, link z reklam), klient
jawnie sprzedaje produkty ✓, Payload nie ma wbudowanego ✓.

Pola (camelCase; `heading/subheading/body/image/ctaLabel/ctaTarget` wg standardu):

```
title                 text, localized            "Outback 8kW"
slug                  buildSlugField
range                 select: outback | wallaroo | cylinder | accessory
status                select: available | comingSoon | discontinued
modelCode             text                         "ECO-ZR03FC"
heading, subheading   localized
image                 upload → media (packshot, przezroczyste tło)
gallery               array { image, caption(localized) }
heroVideo             upload → media (opcjonalnie)
nominalOutputKw       number                       8
specs  (group)
  scop35, scop55      number
  erp35, erp55        select (A+++ … )
  refrigerant         text  "R290"
  gwp                 number 3
  capacityRange35     text  "3.2–10.6"
  capacityRange55     text
  powerInputRange35/55 text
  maxPowerInputKw     number
  maxCurrentA         number
  powerSupply         select: singlePhase | threePhase
  compressor          text
  noiseDbA            number
  waterConnectionInch number
  waterFlowLMin       number
  dimensionsMm        group { length, width, height }
  weightKg            number
  operatingRangeMin/Max number  (−15 / 40)
  wifi                checkbox
  testStandard        text "BS EN 14511"
  specSource          text, required  ← źródło (np. "MCS certificate MCS-xxxx")
performance           array { airTempC, flowTempC, outputKw, cop }   ← tabela z PDF
explodedView          group { frames: upload (zip/sekwencja) | model3d: upload,
                              hotspots: array { partName(loc), description(loc), frameIndex } }
documents             group { brochure, homeownerManual, installerManual,
                              datasheet, mcsCertificate } — wszystkie upload → media (PDF)
warrantyYears         number   (5)
premiumWarrantyYears  number   (8)
layout                blocks (opcjonalne bloki dodatkowe na stronie produktu)
meta                  SEO tab
```
Wpięcie: `contentConfig.collections = [{ slug: 'products', archiveSlug: 'heat-pumps' }]`
→ routing, sitemap, SSG, hreflang z pluginu. Structured data: Product/Offer —
plugin nie ma helpera → **raport rozbudowy pluginu** (patrz `06`, §8).

**Manuale NIE są osobną kolekcją** — strona `/support/manuals` renderuje je
z `products.documents`. Jedno źródło prawdy.

#### `testimonials` — TAK (kolekcja BEZ trasy)
Uzasadnienie: te same opinie występują na Home, About, Installers, stronach
produktu; filtrowane po odbiorcy i kraju. Zarządzane osobno, bez URL →
NIE dodajemy do `contentConfig`, renderuje blok `testimonials`.
```
quote          textarea, localized, required
authorName     text, required
authorContext  text, localized  ("Homeowner, Leicestershire")
country        select: uk | au   ← wymagane, wyświetlane
product        relationship → products (opcjonalnie) | text dla produktów AU (np. "Hot water heat pump")
audience       select (hasMany): homeowner | installer
source         select: google | trustpilot | direct | case-study  + sourceUrl
verifiedAt     date, required
rating         number 1–5 (opcjonalnie)
consentOnFile  checkbox, required  ← zgoda autora na publikację
```
Reguła renderu: opinia z `country = au` zawsze pokazuje „Australia” i nazwę
produktu. Bez `consentOnFile` i `verifiedAt` — nie publikuje się (walidacja).

#### `redirects` — TAK (migracja)
Mapowanie starych URL-i i PDF-ów (patrz `07-seo-migracja.md`).

#### Czego NIE tworzymy
- `faqs` → BLOK `faq` (array Q&A). Strona `/faq` to Page z kilkoma blokami FAQ
  pogrupowanymi tematycznie.
- `manuals`, `downloads` → z `products.documents`.
- `services`, `team`, `values`, `features`, `steps` → BLOKI.
- `users` → wbudowane.
- Blog / „Guides” → **nie w MVP**. Rekomendacja na fazę 2 (SEO: „heat pump cost
  UK”, „R290 vs R32”), tylko po jawnej decyzji klienta.

---

## 4. Katalog bloków (skrót — pełne pola w `05-bloki-cms.md`)

Każdy blok: folder `src/blocks/<Pascal>/{config.ts, Component.tsx}`, slug camelCase,
w `registry.ts`, render przez `RenderBlocks` z pluginu + `enhanceProps`.

| Slug | Komponent | Gdzie | Klient/serwer |
|---|---|---|---|
| `heroVideo` | HeroVideo | Home | RSC + wyspa `'use client'` (wideo, kursor) |
| `heroSplit` | HeroSplit | podstrony | RSC |
| `explodedView` | ExplodedView | Home, produkt | client (canvas sekwencji) |
| `climateRange` | ClimateRange | Home, produkt, gama | client (slider + wykres) |
| `bentoFeatures` | BentoFeatures | Home, gama | RSC + CSS |
| `audienceSplit` | AudienceSplit | Home | RSC |
| `productLineup` | ProductLineup | Home, gama | RSC (dane przez enhanceProps) |
| `compareTable` | CompareTable | gama | RSC + mały client (sticky/kolumny) |
| `refrigerantCompare` | RefrigerantCompare | Home, produkt | RSC + CSS scroll anim |
| `processSteps` | ProcessSteps | Home, How it works | RSC |
| `grantChecker` | GrantChecker | BUS, Home | client (quiz) |
| `quoteEmbed` | QuoteEmbed | Get a quote | client (iframe za zgodą) |
| `formBlock` | FormBlock (builder pluginu) | kontakt, installers, support | client |
| `testimonials` | Testimonials | wiele | RSC + client scroller |
| `trustStrip` | TrustStrip | wiele | RSC |
| `warrantyTiers` | WarrantyTiers | Support | RSC |
| `downloadsList` | DownloadsList | Manuals, produkt | RSC |
| `faq` | Faq | wiele | RSC (`<details>`) + `buildFaqJsonLd` |
| `richTextSection` | RichTextSection | wszędzie, polityki | RSC |
| `mediaFeature` | MediaFeature | wiele | RSC |
| `videoFeature` | VideoFeature | About | client |
| `timeline` | Timeline | About | RSC |
| `valuesGrid` | ValuesGrid | About | RSC |
| `statementBand` | StatementBand | About, Home | RSC |
| `ctaBand` | CtaBand | koniec każdej strony | RSC |
| `contactCards` | ContactCards | Contact | RSC (dane firmy przez enhanceProps) |
| `mapLocations` | MapLocations | Contact | client, **za zgodą** (lub statyczna mapa) |

---

## 5. Media — warianty i formaty

`imageSizes` (WebP/AVIF generuje Next Image):
- `thumb` 480, `card` 960, `feature` 1600, `hero` 2560, `og` 1200×630 (crop)
- Packshoty produktów: PNG/WebP z przezroczystością, min. 2400 px szer.
- Wideo: dwa pliki w `media` (MP4 H.264 + WebM VP9), poster obowiązkowy,
  pole `posterImage` w bloku; max 8 MB dla pętli hero.
- Sekwencja exploded view: 90–120 klatek WebP 1600 px, wgrywane jako jeden ZIP
  i rozpakowywane hookiem? → **NIE w projekcie** — to uniwersalny mechanizm →
  raport do pluginu. MVP: pole `array` 120× upload (redaktor raz) albo plik
  sprite/`.webm` sterowany scroll-em (rekomendowane, patrz `04`).

---

## 6. Teksty UI (żeby nic nie było na sztywno)

Etykiety, których nie da się przypisać do bloku (kursor, „Skip to content”,
„Open menu”, „Play video”, „Spec sheet”, jednostki „kW”, „dB(A)”), trzymamy
w globalu `siteSettings` → grupa `uiLabels` (localized). Jeśli plugin ma już
mechanizm tekstów UI (Notifications / cookie texts) — **sprawdź docs i rozszerz
plugin zamiast dublować**. Komunikaty formularzy → global Notifications +
`resolveFormMessage`.

---

## 7. Struktura katalogów (zgodna z `fundamenty-projektu.md`)

```
src/
  app/
    (frontend)/
      styles.css
      [locale]/
        layout.tsx          ConsentProvider, TurnstileProvider, CookieBanner,
                            CookieButton, Analytics, SiteHeader, SiteFooter,
                            CustomCursor (client island), JSON-LD root
        not-found.tsx
        [[...slug]]/page.tsx
    (payload)/its/...
    manifest.ts  sitemap.ts  robots.ts
  blocks/<Pascal>/{config.ts,Component.tsx}  +  registry.ts
  collections/  Pages.ts  Media.ts  Products.ts  Testimonials.ts  Redirects.ts
  components/   (wyłącznie prezentacyjne, bez treści: Button, SpecValue,
                 TempScale, Cursor, VideoPlayer, MegaMenu)
  motion/       gsap-setup.ts (dynamic import), useReducedMotion.ts, sequence.ts
  lib/          content.ts  payload.ts
  i18n.config.ts  payload.config.ts  proxy.ts
PRODUCT.md  DESIGN.md  .impeccable/   agents.md
```

`components/` i `motion/` to warstwa prezentacji projektu (dozwolone) —
NIE zawierają żadnego tekstu ani URL-a.

---

## 8. Kontrakt danych dla bloków (bez cykli)

`page.tsx` buduje `enhanceProps`:
- `productLineup`, `compareTable`, `climateRange`, `downloadsList` → produkty
  pobrane w `lib/content` (depth 1), przekazane propsami.
- `formBlock` → `turnstileSiteKey`.
- `contactCards`, `ctaBand` (telefon) → dane firmy z globala.
- `quoteEmbed` → URL z `siteIntegrations`.
- `testimonials` → lista z kolekcji wg filtrów bloku (audience, country, limit).

Bloki nie importują `lib/*`. Nigdy.
