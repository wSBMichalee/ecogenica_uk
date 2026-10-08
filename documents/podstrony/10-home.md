# 10 — Strona główna `/`

**Mode:** Persuade · **Rola systemowa:** homepage · **Cel:** właściciel domu
klika „Get a quote” albo „Check grant eligibility”; instalator przechodzi do
`/installers`. Narracja strony = przejście „outside → inside” (`04` E1):
zaczynamy w zimnym ogrodzie, kończymy w ciepłym salonie.

**SEO**
- title (titleOverride): `Air Source Heat Pumps UK | R290 Outback Range | Ecogenica`
- description: `R290 air source heat pumps from 5 to 16 kW, MCS certified and Boiler Upgrade Scheme eligible. Get a free suitability check and a clear quote.`
- H1: jeden, w hero.
- JSON-LD: Organization + WebSite (root), FAQ (blok 11).

Copy poniżej = **propozycja** (British English) do akceptacji klienta.
Liczby tylko z potwierdzonych źródeł (`01` §2).

---

## Sekwencja sekcji

| # | Blok | tone | Tło |
|---|---|---|---|
| 1 | heroVideo | outside | `--ink-950`, wideo |
| 2 | audienceSplit | outside | `--ink-950` |
| 3 | explodedView | outside | `--ink-950` → `--ink-900` |
| 4 | climateRange | outside | `--ink-900` |
| 5 | bentoFeatures | auto (przejście) | interpolacja ink → paper |
| 6 | productLineup | inside | `--paper-50` |
| 7 | refrigerantCompare | inside | `--paper-100` |
| 8 | processSteps | inside | `--paper-50` |
| 9 | grantChecker (wersja skrócona) | inside | `--paper-100` |
| 10 | testimonials | inside | `--paper-50` |
| 11 | faq | inside | `--paper-50` |
| 12 | ctaBand | inside | zdjęcie ciepłego wnętrza |

---

### 1. Hero — `heroVideo`

**Układ (desktop):** full-bleed wideo 100svh. Tekst lewa dolna ćwiartka,
max 640 px szer. Pod spodem dwa CTA. Gradient przyciemniający wideo tylko od
dołu (scrim `linear-gradient(to top, ink-950 0%, transparent 55%)` — to scrim
dla kontrastu, nie dekoracja).

**Copy**
- H1: **Warm homes, made from cold air.**
- Sub: `Outback air source heat pumps run down to −15°C, use natural R290 refrigerant and qualify for the Boiler Upgrade Scheme.`
- CTA primary: `Get a free suitability check` → /get-a-quote
- CTA secondary (text link): `Explore the Outback range` → /heat-pumps
- Odczyty pod wideo (po scrollu, `04` E2) z produktu Outback 16kW lub 5kW:
  `−15°C operating floor` · `SCOP up to 5.22` · `GWP 3`.

**Wideo — lista ujęć dla klienta / operatora**
1. Ogród przy domu z czerwonej cegły (Midlands), świt, szron na trawie, para z ust.
2. Close-up żeber wymiennika Outback ze szronem → cykl odszraniania, kapanie.
3. Wentylator obracający się wolno, para nad jednostką.
4. (koniec pętli) Przejście przez okno do środka: kaloryfer, dłoń na nim.
Format 16:9 + kadr 9:16 do mobile (osobny plik w `video`/`videoWebm` mobile).
Jeżeli nagrania brak przy starcie: render 3D jednostki w zimowej scenie
lub statyczne zdjęcie (poster) — hero działa bez wideo.

**Efekty:** E2 (wideo kurczy się do karty), magnetyczne CTA (E10), kursor
„Pause/Play” nad wideo. Mobile: wideo 9:16 lub poster, tekst pod nim.

**Announcement bar** nad headerem: BUS off-gas £9,000 (z datą końcową).

---

### 2. Dwie ścieżki — `audienceSplit`

**Układ:** dwie karty 50/50, wysokość 420 px, zdjęcie w tle karty z ciemnym
scrimem; na mobile stos.
- **For homeowners** — `Replacing a gas, oil or LPG boiler? See what a switch involves, what the grant covers and what it costs.` → How it works
  Zdjęcie: para przed domem z jednostką Outback przy ścianie.
- **For installers** — `Fit an R290 monobloc that’s quick to install, with UK stock and technical support from Leicestershire.` → Installers
  Zdjęcie: instalator przy podłączaniu przyłączy wody, narzędzia.

Hover: zdjęcie NIE zoomuje (anti-slop); strzałka CTA przesuwa się, karta
podnosi tło o jeden ton. Kursor: domyślny stan link.

---

### 3. Jak to działa w środku — `explodedView`

**Układ:** sekcja przypięta (desktop), jednostka centralnie, nagłówek lewy
górny róg, hotspoty po prawej jako lista, która podświetla się z postępem.
- H2: **Every part, built for a British winter.**
- Body: `Scroll to open an Outback unit and see what does the work.`
- Hotspoty (z produktu, propozycje):
  - Fan & motor — moves outside air across the coil, quietly at low speed.
  - Evaporator coil — where the refrigerant picks up heat from the air, even below zero.
  - Rotary inverter compressor — speeds up and slows down to match your home’s demand.
  - Four-way valve — reverses the cycle briefly to clear frost from the coil.
  - Water pump & connections — sends heated water to your radiators and cylinder.
  - Controller — Wi-Fi app control, weather compensation and scheduling.
- Efekt E3. Mobile: swipe 6 klatek. Brak renderów → zdjęcie z markerami.

---

### 4. Zakres temperatur — `climateRange`

**Układ:** karta pełnej szerokości `--ink-900`, skala −15…+40 u góry, pod nią
trzy kontrolki (model, flow temp, temperatura zewnętrzna), po prawej duże
odczyty `data-xl` (kW i COP).
- H2: **How much heat at −7°C? Here are the test results.**
- Body: `Choose a model and an outside temperature. Figures are from tests to BS EN 14511.`
- Disclaimer (z CMS): `Values between test points are interpolated. Real performance depends on your home, emitters and settings.`
- Linie referencyjne UK (z CMS, źródło Met Office).
- Efekt E4 (szron przy niskich temp.), kursor pokazuje °C przy przeciąganiu.

---

### 5. Dlaczego Ecogenica — `bentoFeatures`

**Układ bento (desktop 12 kol.):**
```
┌───────────── large (7) ─────────────┬──── tall (5) ────┐
│ R290, GWP 3                         │  Wi-Fi app       │
│ zdjęcie: jednostka + liść szronu    │  (zrzut ekranu   │
├──── small (4) ───┬──── small (3) ───┤   aplikacji)     │
│ MCS certified    │ Up to 8-year     ├──────────────────┤
│ (logo + nr cert) │ warranty         │ UK stock & tech  │
├──────────────────┴──── wide (8) ────┤ support (zdjęcie │
│ Boiler Upgrade Scheme eligible      │  magazynu)       │
└─────────────────────────────────────┴──────────────────┘
```
Treść (propozycje, każda z `claimSource`):
- **Natural refrigerant.** `R290 has a global warming potential of 3. R32, used in many heat pumps, is 675.`
- **Control it from your phone.** `Schedules, zones, hot water boost and energy use in one app.` (wymaga zrzutów aplikacji)
- **MCS certified.** `Required for the Boiler Upgrade Scheme. Certificate {nr} — verify on the MCS register.`
- **Up to 8 years of cover.** `5-year standard warranty, extendable to 8 years.`
- **Grant eligible.** `Up to £7,500 off through the Boiler Upgrade Scheme, or up to £9,000 for eligible off-gas homes until 31 March 2027.` (kwoty z `grantAmounts`)
- **Supported from Leicestershire.** `UK warehouse and technical support team in Atherstone.`

Tło: tu następuje przejście ink → paper (E1). Wejścia kart E6 (stagger).

---

### 6. Wybierz rozmiar — `productLineup`

- H2: **Four sizes. One sized for your home.**
- Sub: `We calculate your home’s heat loss before recommending a size. Here’s the range.`
- Cztery jednostki w realnej skali + sylwetka 1.75 m (E8). Pod każdą: nazwa,
  `nominalOutputKw`, `typicalHomeFit`, hałas dB(A), zasilanie (1/3 fazy),
  link „View specs”.
- Kursor nad jednostką: odczyt „8 kW”.
- Pod spodem link `Compare all models →` /heat-pumps#compare.
- Tło `--paper-50`, cień kontaktowy pod jednostkami (CSS ellipse blur —
  dopuszczalne, bo to cień fizyczny, nie glow).

---

### 7. Czynnik chłodniczy — `refrigerantCompare`

- H2: **A refrigerant with a lighter footprint.**
- Body: `R290 (propane) is a natural refrigerant. Its global warming potential is 3, compared with 675 for R32.`
- Paski E5. Mały link: `Why R290 matters →` (FAQ anchor).
- Zwięzła sekcja, dużo światła — oddech po gęstym lineupie.

---

### 8. Proces — `processSteps`

- H2: **From first call to first warm evening.**
- Kroki (numeracja OK — to sekwencja):
  1. **Free suitability check** — `We look at your home, heating and insulation to see whether a heat pump suits it.`
  2. **Clear quote, grant checked** — `A fixed price with Boiler Upgrade Scheme eligibility confirmed upfront.`
  3. **Accredited installation** — `Fitted and commissioned by MCS-certified installers. Most installs take {X} days.` (X od klienta)
  4. **Ongoing support** — `Annual servicing and up to 8 years of warranty cover.`
- Układ: pozioma oś z czterema punktami (desktop), pionowa (mobile); linia
  łącząca wypełnia się kolorem heat w miarę scrollu (scroll-driven CSS).
- Zdjęcia (pole `image` per krok): ankieter z miernikiem, przegląd wyceny
  na tablecie, instalacja, serwis.
- CTA: `See the full process →` /how-it-works

---

### 9. Grant — `grantChecker` (skrót, 3 pytania)

- H2: **Could you get up to £7,500 off?**
- Pytania (z CMS): `Is the property in England or Wales?` · `Do you own it (or rent it out as a small landlord)?` · `What heats it now? Gas / Oil or LPG / Electric / Other`
- Wynik → link do pełnego checkera `/boiler-upgrade-scheme` lub Get a quote.
- `lastReviewed` widoczne pod checkerem.
- Układ: karta na `--paper-100`, jedno pytanie na raz, przejście slide 240 ms,
  wstecz zawsze dostępne. Operate wewnątrz Persuade — spokojny styl.

---

### 10. Opinie — `testimonials`

- H2: **What customers say.**
- Filtr: `audience = homeowner`, `country = uk` **jeśli są**; inaczej `any`
  z obowiązkowym oznaczeniem „Australia · Hot water heat pump”.
- Układ `featured`: jedna duża opinia (cytat `heading-l`) + scroller 3–6
  mniejszych, przyciski ←/→, bez autoplay. Źródło opinii (Google) z linkiem.
- Plakietka Google rating **tylko** z realnym profilem UK i liczbą opinii
  z widgetu/API — nie obrazek „g-review.svg”.

---

### 11. FAQ — `faq`

5 pytań (z obecnej strony, z napisanymi odpowiedziami — klient zatwierdza):
1. Do Outback heat pumps work in cold weather? (−15°C, test BS EN 14511, defrost)
2. Can I get the Boiler Upgrade Scheme grant? (Anglia/Walia, właściciel, EPC, instalator MCS składa wniosek, kwoty)
3. How long does installation take? (od klienta)
4. Do you offer finance? (od klienta — jeśli nie, pytanie usunąć)
5. How loud is a heat pump? (dB(A) z kart + info o warunkach pomiaru)
`emitJsonLd = true`. Link „All questions →” /faq.

---

### 12. Zamknięcie — `ctaBand`

- Tło: zdjęcie ciepłego salonu (wieczór, lampa, kaloryfer), scrim dla tekstu.
- H2: **Ready to see what a heat pump would cost for your home?**
- CTA: `Get a free suitability check` + `Call {sales}` (phoneRef).
- Koniec narracji: jesteśmy „inside”.

---

## Mobile — różnice
- Hero: poster 9:16 + tekst pod spodem, CTA pełnej szerokości.
- Exploded view: swipe, bez pinu. Climate range: kontrolki w stosie, odczyty nad suwakiem.
- Bento → jedna kolumna w kolejności ważności (grant, R290, MCS, warranty, app, UK).
- Lineup: poziomy scroll z zachowaną skalą wysokości (snap).
- Sticky pasek Call / Get a quote od sekcji 2.

## Brief Impeccable → `.impeccable/surfaces/home.md`
```markdown
# Home
Mode: Persuade
Purpose: Homeowners decide whether to ask for a quote; installers find their path.
Narrative: cold outside → warm inside, carried by one continuous background shift.
Must keep: real product imagery, real test data as visual elements, one action colour.
Avoid: hero metric layout, eyebrow chips, glow, identical card grids, marquee.
Signature moments: exploded view, climate range slider, scale-true product lineup.
```
Komendy: `/impeccable shape the homepage…` → `design` (comp-led) →
po buildzie `critique` → `overdrive the homepage hero` → `animate` →
`adapt for mobile` → `optimize` → `polish` → `audit`.
