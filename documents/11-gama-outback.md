# 11 — Gama pomp ciepła `/heat-pumps`

**Mode:** Persuade (góra) → Read (porównanie) · **Typ:** strona w `pages`,
jednocześnie archiwum kolekcji `products` (`archiveSlug`) — sprawdzić w
`docs/content.md`, czy archiwum może renderować bloki strony; jeśli nie, strona
z blokiem `productLineup` + `compareTable`.

**SEO**
- title: `Outback R290 Air Source Heat Pumps, 5–16 kW`
- description: `Compare the Outback range: 5, 8, 11 and 16 kW R290 monobloc heat pumps. SCOP up to 5.22, MCS certified, BUS eligible. Spec sheets and manuals.`
- JSON-LD: Breadcrumb; ItemList produktów (raport do pluginu — `06` §8).

---

## Sekcje

### 1. `heroSplit` (tone outside, layout imageRight)
- H1: **The Outback range.**
- Sub: `R290 monobloc air source heat pumps for UK homes, from 5 to 16 kW. Designed to work down to −15°C.`
- Obraz: `product-group-units` — cztery jednostki obok siebie na ciemnym tle
  (nowy packshot grupowy, światło boczne, szron na najmniejszej).
- CTA: `Find my size` (kotwica #lineup) · `Download brochure` (PDF z produktu).
- Breadcrumbs: Home › Heat pumps.

### 2. `productLineup` #lineup (tone inside)
Jak na Home (E8, skala realna), ale z rozbudowaną kartą pod jednostką:
moc nominalna, SCOP 35/55, hałas, zasilanie, wymiary, `View Outback 8kW →`.

### 3. `compareTable` #compare (Read)
- H2: **Compare every model.**
- Wiersze (`specKey`): Model code · Heat output @A7/W35 · @A7/W55 · SCOP 35°C ·
  SCOP 55°C · ErP 35/55 · Max power input · Max current · Power supply ·
  Noise dB(A) · Water flow · Dimensions · Weight · Refrigerant · Wi-Fi.
- Desktop: sticky pierwsza kolumna + sticky nagłówek z nazwą i packshotem 48 px.
  Hover wiersza podświetla cały wiersz. Liczby mono, wyrównanie do prawej,
  jednostki w `small` muted.
- Mobile: przełącznik „Compare 2 models” (dwa selecty) zamiast poziomego
  przewijania 4 kolumn.
- Footnote z CMS (źródła: MCS, BS EN 14511).
- Przycisk „Download full spec table (PDF)”.

### 4. `climateRange` (tone outside — kontrast celowy, „wyjście na zewnątrz”)
Wszystkie 4 modele, domyślnie 8 kW.

### 5. `bentoFeatures` — sześć korzyści z obecnej strony, przepisane:
- **Heating and hot water down to −15°C** — defrost, heat injection.
- **Inverter control** — `The compressor adjusts its speed to match demand, so it runs longer at low power instead of cycling.` (zamiast „Sophisticated (VFD) algorithms”)
- **R290 refrigerant** — GWP 3.
- **Quicker installs** — monobloc: no refrigerant pipework inside the home (claim do potwierdzenia: monobloc = brak F-gas pracy na miejscu).
- **App control** — schedules, zones, energy monitoring.
- **Warranty** — 5 years standard, 8 with Premium; cylinders up to 20 (źródło).

### 6. `mediaFeature` — Hot water cylinders & accessories
- `Ecogenica also supplies matched hot water cylinders and accessories, so installs are quicker and parts come from one place.`
- Zdjęcie cylindra + akcesoriów (do sesji). Link do Installers.

### 7. Teaser Wallaroo — `mediaFeature` (tone outside, layout fullBleed)
- H2: **Next: the Wallaroo.**
- `Heat pump and hot water cylinder in one outdoor unit. No cylinder cupboard needed.`
- CTA: `Register interest` → /heat-pumps/wallaroo.

### 8. `downloadsList` (source allProducts, docTypes brochure + datasheet, groupBy product)

### 9. `faq` (produktowe: rozmiar, hałas, 1 vs 3 fazy, cylinder, monobloc vs split)

### 10. `ctaBand`

## Zdjęcia do sesji
Grupowy packshot 4 jednostek (studio, ciemne tło i jasne tło) · każdy model
osobno 3/4 front + profil + tył (przyłącza) · tabliczka znamionowa (detal) ·
cylinder + akcesoria · jednostka na wsporniku ściennym i na stopach.

## Brief Impeccable → `range.md`
Mode: Persuade above the fold, Read from the comparison table down. The table
must be the clearest table on the site: tabular numbers, sticky headers,
nothing decorative. `/impeccable layout the comparison table`, `typeset`,
`adapt for mobile`.
