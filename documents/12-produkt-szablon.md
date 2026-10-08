# 12 — Szablon produktu `/heat-pumps/{slug}` (np. outback-8kw)

**Mode:** Persuade (hero) → Read (specyfikacja, dokumenty) · **Źródło:**
kolekcja `products` — szablon jeden dla wszystkich modeli; treść generowana
z pól produktu + opcjonalne bloki `layout` z panelu.

**SEO (z pól produktu; meta.title nadpisuje)**
- title wzór: `{title} Air Source Heat Pump ({modelCode})` → „Outback 8kW Air Source Heat Pump (ECO-ZR03FC)”
- description wzór z `subheading`.
- JSON-LD: Breadcrumb + Product (name, model, brand, image, additionalProperty ze
  spec; Offer **tylko** gdy klient poda cenę katalogową). Helper → raport pluginu.
- Canonical do siebie; PDF-y z `noindex` nagłówkiem? (PDF-y indeksowane mogą
  być OK — decyzja SEO, patrz `07`).

---

## Sekcje (stała kolejność szablonu)

### 1. Hero produktu (komponent szablonu, tone outside)
**Układ desktop:** 7/5 kolumn. Lewa: duży packshot na `--ink-950` z cieniem
kontaktowym; pod spodem miniatury galerii (`gallery`). Prawa: breadcrumb,
plakietka statusu (Available / Coming soon — statyczna), H1 `title`,
`subheading`, trzy `SpecValue`: heat output @A7/W35, SCOP 35°C, noise dB(A);
CTA `Get a quote for this model` (przekazuje `?model=` do Spruce **tylko jeśli
Spruce to obsługuje** — sprawdzić; inaczej bez parametru), `Download spec sheet`.

Galeria: klik → lightbox (pełny ekran, strzałki, Esc, swipe). Kursor „View”.
Opcjonalnie `heroVideo` produktu (360° obrót jednostki — scrub myszą
w poziomie, kursor „Drag”). Packshoty: front 3/4, profil, tył z przyłączami,
tabliczka.

### 2. Kluczowe liczby (pasek, tone outside)
Pięć `SpecValue` w rzędzie: `Operating range −15 to 40°C` · `SCOP 4.80 / 3.63`
· `ErP A+++ / A++` · `R290 · GWP 3` · `Single phase 230V`. Wszystko z pól.

### 3. `explodedView` (z `product.explodedView`; jeśli puste — sekcja pomijana)

### 4. Wydajność — `climateRange` (zablokowany na ten model)
Dodatkowo pod wykresem **pełna tabela `performance`** (powietrze × temperatura
zasilania × output × COP) jako `<table>` z `caption` — Read mode, dla
instalatorów, zwinięta za `Show test data`.

### 5. Gdzie pasuje — `mediaFeature`
- Treść z pola `typicalHomeFit` + body (np. `Typically suits a well-insulated 3–4 bedroom home. Your installer confirms the size with a room-by-room heat loss calculation.`)
- Zdjęcie: jednostka przy konkretnym typie domu (semi-detached dla 8 kW).

### 6. Specyfikacja techniczna (komponent szablonu, Read)
Pełna lista `specs` w dwóch kolumnach definicji (`<dl>`), grupy:
Performance · Electrical · Hydraulic · Physical · Acoustic · Refrigerant ·
Connectivity. Pod spodem `specSource`. Przycisk „Copy specs” (instalatorzy) —
skopiowanie tabeli jako tekst; etykieta z `uiLabels`.

### 7. Wymiary — rysunek
SVG wymiarowy generowany z `dimensionsMm` (prostokąty front/bok z liniami
wymiarowymi) — dane, nie grafika rysowana ręcznie, więc zawsze aktualny.
Obok: wymagane odstępy montażowe (pola do dodania w `specs.clearancesMm`
— od producenta).

### 8. Dokumenty — `downloadsList` (source: ten produkt, wszystkie typy)
Karty plików: ikona typu, nazwa, rozmiar (z media), data aktualizacji,
„Download PDF”. Kursor ⤓.

### 9. Gwarancja — skrót `warrantyTiers` (z `warrantyYears`, `premiumWarrantyYears`) + link /support

### 10. Inne modele — `productLineup` (pozostałe 3, bez skali)

### 11. `faq` (modelowe, z `layout` produktu — opcjonalnie)

### 12. `ctaBand`

## Wallaroo (status comingSoon) — wariant szablonu
Gdy `status = comingSoon`: ukryte sekcje 2, 4, 6, 7; hero ma CTA
`Register interest` (formBlock „Wallaroo interest”: imię, e-mail, typ: homeowner/installer,
postcode, consent). Szczegóły i warstwa „Experience” w `13-wallaroo.md`.

## Brief Impeccable → `product.md`
```markdown
# Product page (template)
Mode: Persuade for the hero, Read for specs and documents.
Users: homeowners checking size/noise; installers checking electrical and hydraulic data.
Priorities: spec values instantly scannable; downloads one tap away; no decoration in spec areas.
```
`/impeccable layout the product page`, `typeset the spec list`,
`clarify the documents section`, `harden the product page` (brak galerii,
brak performance, brak explodedView — strona nadal kompletna).
