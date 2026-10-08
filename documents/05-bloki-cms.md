# 05 — Bloki CMS: schematy pól

Każdy blok = folder `src/blocks/<Pascal>/` z `config.ts` + `Component.tsx`,
slug camelCase = klucz w `registry.ts`. Teksty `localized: true`, obrazy
`upload → media`, linki wewnętrzne `relationship → pages` (lub `products`),
zewnętrzne `url`. Wspólne nazwy pól wg `fundamenty-projektu.md` §3.

**Pola wspólne dla KAŻDEGO bloku** (wspólny `fields/blockBase.ts`, bez treści):
```
anchorId   text          // #id sekcji (np. dla linków w mega-menu)
tone       select        outside | inside | auto (default auto)  → patrz 04 E1
spacing    select        compact | default | spacious
hidden     checkbox      // ukryj bez usuwania
```

**Pole `claimSource`** (dla bloków z liczbami/claimami marketingowymi):
`text`, wymagane gdy blok zawiera liczbę lub superlatyw; nie wyświetlane
publicznie (albo jako przypis, jeśli `showSource = true`). Walidacja w configu:
publikacja zablokowana, gdy pole puste. Cel: zgodność z ASA/CAP (patrz `08`).

**Link (reużywalna grupa `linkField`)**:
```
ctaLabel   text, localized
linkType   select: internal | product | external | phone | email | download
ctaTarget  relationship → pages            (internal)
product    relationship → products         (product)
url        text                            (external)
phoneRef   select: sales | support | warranty | general  → numer z globala firmy
emailRef   select j.w.
file       upload → media                  (download)
style      select: primary | secondary | text
```
Telefon/e-mail wskazujemy **przez rolę**, numer bierze się z globala — zmiana
numeru w jednym miejscu.

---

## Bloki

### `heroVideo`
```
heading            text, localized, required, maxLength 70
subheading         textarea, localized, maxLength 180
primaryLink        linkField
secondaryLink      linkField
video              upload → media (mp4)
videoWebm          upload → media (webm)
posterImage        upload → media, required
videoAlt           text, localized  // opis dla czytników
featuredProduct    relationship → products   // źródło 3 odczytów pod wideo
readouts           array (max 3) { label(loc), specKey: select(listа pól specs) }
announcement       group { enabled, text(loc), link: linkField, expiresAt: date }
```

### `heroSplit`
```
heading, subheading, image, primaryLink, secondaryLink
layout   select: imageRight | imageLeft | imageBackground
breadcrumbs checkbox (default true)
```

### `explodedView`
```
heading, body
product    relationship → products (bierze explodedView z produktu)
mobileFallbackImages  array (max 6) upload
```

### `climateRange`
```
heading, body
products        relationship → products, hasMany (default: wszystkie Outback)
defaultAirTemp  number (-2)
defaultFlowTemp select 35 | 45 | 55
ukReferenceTemps array { label(loc), tempC, source }
disclaimer      textarea, localized   // „Values interpolated between test points…”
```

### `bentoFeatures`
```
heading, subheading
items  array (3–7) {
  heading(loc), body(loc), image(upload, opcjonalnie), icon(select z listy ikon),
  size: select small | wide | tall | large,
  specProduct: relationship products (opcjonalnie) + specKey  // liczba z danych
  claimSource
}
```
Render: CSS grid z `grid-template-areas` dobieranym do kombinacji rozmiarów;
waliduj, że jest dokładnie jeden `large`.

### `audienceSplit`
```
items  array (2) { heading, body, image, link: linkField, audience: homeowner|installer }
```

### `productLineup`
```
heading, subheading
products   relationship → products, hasMany (sort ręczny)
showScale  checkbox (default true)   // sylwetka człowieka dla skali
humanHeightMm number (1750)
```
Produkt w CMS dostaje pole `typicalHomeFit` (text, localized) — dodać do `products`.

### `compareTable`
```
heading
products   relationship → products, hasMany
rows       array { label(loc), specKey: select, unit(loc), highlight: checkbox }
footnote   textarea, localized
```

### `refrigerantCompare`
```
heading, body
items   array (2–3) { name(text), gwp(number), isOurs(checkbox), note(loc) }
claimSource
```

### `processSteps`
```
heading, subheading
steps   array (3–6) { heading(loc), body(loc), duration(loc, np. "1–2 days"), image }
link    linkField
```

### `grantChecker`
```
heading, intro
questions  array {
  question(loc), help(loc),
  answers array { label(loc), outcome: select continue|eligible|ineligible|check, note(loc) }
}
resultEligible   group { heading(loc), body(loc), link: linkField }
resultIneligible group { heading, body, link }
resultCheck      group { heading, body, link }
grantAmounts     array { label(loc), amountGbp(number), validFrom(date), validTo(date), source(url) }
lastReviewed     date, required   // widoczne: „Grant information checked on …”
```
Brak stanu w URL (nie generujemy `?step=` — ISR/SSG zostaje czysty).

### `quoteEmbed`
```
heading, intro
embedHeightPx  number
consentCategory select functional | marketing (default functional)
fallbackBody   richText, localized   // gdy brak zgody: tekst + przycisk "Load quote tool"
fallbackLink   linkField             // np. telefon / formularz kontaktowy
```
URL iframe z `siteIntegrations.spruceEmbedUrl` przez enhanceProps.

### `formBlock` (builder pluginu)
```
heading, intro
form        relationship → forms
sideContent richText (np. co dalej, czas odpowiedzi)
```

### `testimonials`
```
heading
audience   select homeowner | installer | any
country    select uk | au | any
limit      number
manual     relationship → testimonials, hasMany (nadpisuje filtry)
layout     select scroller | featured | grid
```

### `trustStrip`
```
items  array (3–6) { logo(upload), label(loc), url, certificateNumber, verifyUrl }
```
Statyczny (NIE marquee). Każde logo akredytacji linkuje do weryfikacji
(np. rejestr MCS) — tylko akredytacje faktycznie posiadane.

### `warrantyTiers`
```
heading
tiers  array (2) { name(loc), years(number), price(loc, opcjonalnie), body(loc),
                   includes array { text(loc) }, excludes array { text(loc) } }
note   richText
```

### `downloadsList`
```
heading
source     select: allProducts | selectedProducts | manual
products   relationship → products, hasMany
docTypes   select hasMany: brochure | homeownerManual | installerManual | datasheet | mcsCertificate
manualFiles array { label(loc), file(upload) }
groupBy    select product | docType
```
Etykiety typów dokumentów z `uiLabels`.

### `faq`
```
heading
items  array { question(loc), answer(richText, loc) }
emitJsonLd checkbox (default true)  → buildFaqJsonLd
```

### `richTextSection`
```
heading, content(richText), width: select narrow | default
```

### `mediaFeature`
```
heading, body, image | video, layout: imageLeft|imageRight|fullBleed, link: linkField
captions array (opcjonalne podpisy liczbowe ze specKey)
```

### `videoFeature`
```
heading, body, video, videoWebm, posterImage, captionsVtt(upload), transcript(richText)
```

### `timeline`
```
heading
items array { year(text), heading(loc), body(loc), image }
```

### `valuesGrid`
```
heading
items array (3–6) { heading(loc), body(loc) }   // bez ikon w kafelkach
```

### `statementBand`
```
statement textarea(loc, max 160)   attribution(loc)   image (opcjonalnie)
```

### `ctaBand`
```
heading, body, primaryLink, secondaryLink, showPhone(checkbox → phoneRef)
image (opcjonalnie, np. ciepłe wnętrze)
```

### `contactCards`
```
heading
cards array { heading(loc), body(loc), phoneRef, emailRef, locationRef(select z locations), hours(loc) }
```

### `mapLocations`
```
heading
locations select hasMany (z globala firmy)
staticImage upload  // statyczna mapa domyślnie; interaktywna dopiero po zgodzie
```

---

## Walidacje wspólne (config, nie komponent)
- `heading` H1 tylko w pierwszym bloku strony (hero*) — reszta renderuje H2;
  komponent dostaje `headingLevel` z `page.tsx`, nie z CMS.
- `alt` wymagany w `media` (pole kolekcji), opcjonalny `decorative` checkbox.
- Pole `claimSource` wymagane przy publikacji bloków: bentoFeatures,
  refrigerantCompare, heroVideo (gdy readouts), statementBand.
- `lastReviewed` w grantChecker starsze niż 90 dni → ostrzeżenie w panelu
  (komponent `admin.description` / custom admin badge).
