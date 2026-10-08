# 12 — Słowa kluczowe UK (pompy ciepła) i mapa na podstrony

Rynek: **Wielka Brytania (England & Wales)**, język: **British English**.
Źródła: audyt Intecion z 29.09.2026 (§5, §10, §12), plan `02`/`07`, analiza
rynku i konkurencji. Plik zawiera:

1. Jak uzupełnić wolumeny (20 minut, za darmo)
2. Zasady użycia fraz w tekstach
3. **Brief SEO dla każdej podstrony**: fraza główna, title, H1, meta, nagłówki H2
4. Pełną listę **138 fraz** w 11 klastrach (też w `12-slowa-kluczowe.csv`)

---

## 0. Uczciwie o wolumenach

Publicznie dostępne, zweryfikowane wolumeny dla UK są tylko dla trzech fraz
(oznaczone ¹ w tabelach):

| Fraza | Wolumen / mies. (Google UK) | Źródło |
|---|---|---|
| heat pump | 96,454 | Confused.com, średnia XI 2022–XII 2023 ([ESS](https://essmag.co.uk/heat-pumps-revealed-as-most-in-demand-green-energy-source-in-the-uk/), [ACR Journal](https://acrjournal.uk/heat-pumps/rising-demand-for-green-energy-as-heat-pumps-lead-in-popularity/)) |
| heat pump costs | 6,131 | Confused.com via [AirQualityNews](https://airqualitynews.com/fuels/the-publics-interest-in-heat-pumps-not-translating-to-purchases/), 2024, okres niepodany |
| heat pump installation costs | 1,946 | j.w. |

Reszty **nie wpisuję na oko**. Priorytety (P1–P3) wynikają z intencji zakupowej,
dopasowania do oferty Ecogenica i realnej szansy na ranking nowej domeny,
nie z wolumenu. Wolumeny trzeba pobrać z narzędzia, zanim zespół zacznie pisać teksty
— zmienią kolejność tylko w obrębie priorytetu, nie strukturę stron.

### Jak uzupełnić kolumnę `wolumen_uk_mies` (20 min)
1. **Google Keyword Planner** (darmowy, wymaga konta Google Ads — Ecogenica
   prowadzi płatne kampanie, więc konto pewnie jest):
   Tools → Keyword Planner → *Get search volume and forecasts* → wklej kolumnę
   `fraza` z CSV → Location: **United Kingdom** (lub England + Wales),
   Language: English → okres: ostatnie 12 mies. → Download.
2. Wkleić `Avg. monthly searches` do kolumny `wolumen_uk_mies`,
   `Competition` / `Top of page bid` do `uwagi` (pomaga w Google Ads).
3. Opcjonalnie trudność (`kd`): Ahrefs / Semrush (darmowe limity wystarczą
   na frazy P1).
4. **Po starcie:** Google Search Console → Performance → Queries. Po 6–8
   tygodniach realne zapytania zastępują szacunki; nowe frazy dopisywać do CSV.

Frazy z `[town]` i `{slug}` to szablony, nie wpisywać ich do Keyword Plannera.

---

## 1. Zasady użycia fraz

- **Jedna fraza główna = jedna strona.** Bez kanibalizacji: „heat pump cost”
  żyje tylko na `/heat-pump-cost`, inne strony do niej linkują.
- **Fraza główna w:** title (na początku), H1, pierwszym akapicie (≤ 100 słów),
  slug, alt głównego obrazu, meta description. W H2 warianty i pytania.
- **Pisać dla człowieka.** Odpowiedź w pierwszym zdaniu sekcji (też GEO, plik
  `11`), naturalne odmiany, zero wypychania fraz.
- **British English:** *colour, optimise, centre, programme, litre*; „£”,
  „kW”, „°C”.
- **Title:** ≤ 55 znaków przed sufiksem; plugin dokleja nazwę marki (`| Ecogenica`)
  — nie dopisywać jej w `meta.title`.
- **Meta description:** 140–160 znaków, korzyść + CTA.
- **Liczby i claimy** tylko z potwierdzonym źródłem (`claimSource`). Kwoty
  grantu z pola `grantAmounts`, nie wpisywane w treść na sztywno.
- **Frazy lokalne** tylko tam, gdzie Ecogenica naprawdę instaluje (audyt §12).
  Strony miejskie z unikalną treścią (realizacje, zdjęcia, lokalne dane);
  kopiowane strony z podmienioną nazwą miasta Google traktuje jako doorway pages.
- **„near me”** wygrywa Google Business Profile, nie strona. Bez GBP i opinii
  UK (audyt §7) frazy lokalne nie zadziałają.

### Realne szanse rankingowe (nowa domena, ~0 ruchu organicznego wg audytu)
| Horyzont | Gdzie realnie wygrywamy |
|---|---|
| 0–3 mies. | marka (ecogenica*), kody modeli, R290 / monobloc, frazy modelowe „8kW air source heat pump” |
| 3–6 mies. | oil/LPG replacement + £9,000, koszt po grancie, lokalne (z GBP + opiniami), pytania FAQ |
| 6–12 mies. | boiler upgrade scheme (long tail), running costs, heat pump vs gas boiler |
| raczej nie | „heat pump”, „air source heat pump” w top 3 (Octopus, British Gas, EST, Which?) — te frazy obsłużyć Google Ads |

---

## 2. Briefy SEO per strona

Title bez sufiksu marki. H1 i meta to **propozycje** do akceptacji klienta; ceny
i kwoty oznaczone `*` wymagają potwierdzenia (audyt §15). Nowe strony
z audytu oznaczone 🆕.

### Home `/`
- **Fraza główna:** air source heat pump · wspierające: air source heat pumps uk, air source heat pump installation, ecogenica
- **Title:** `Air Source Heat Pumps Installed from £3,500*`
- **H1:** `Air source heat pumps, installed from £3,500 with the £7,500 grant*`
- **Meta:** `MCS-certified R290 air source heat pumps for UK homes. Radiators included, fixed price, up to 8-year warranty. Check your grant and price in 60 seconds.`
- **H2:** What a heat pump costs after the grant · Does it work in a British winter? · Which size suits your home · How installation works · What UK customers say · Questions homeowners ask
- Kreatywne hasło „Warm homes, made from cold air.” przechodzi do sekcji exploded view jako H2 / statement (H1 musi zawierać frazę).

### Gama `/heat-pumps`
- **Główna:** r290 heat pump · wspierające: monobloc heat pump, ecogenica outback, air to water heat pump, best air source heat pump uk
- **Title:** `R290 Air Source Heat Pumps, 5–16 kW | Outback Range`
- **H1:** `Outback R290 air source heat pumps (5–16 kW)` (audyt §4)
- **Meta:** `Compare the Outback range: R290 monobloc heat pumps from 5 to 16 kW. SCOP up to 5.22, MCS certified, BUS eligible. Specs, sizes and manuals.`
- **H2:** Which size do I need? · Compare every model · Do heat pumps work in cold weather? · R290 vs R32: why the refrigerant matters · Monobloc vs split · Hot water cylinders

### Modele `/heat-pumps/outback-{5|8|11|16}kw`
- **Główna:** `{N}kw air source heat pump` · wspierające: `{N}kw heat pump`, kod modelu, (16 kW) three phase heat pump
- **Title (wzór):** `{N}kW Air Source Heat Pump – Outback ECO-ZR0xFC`
- **H1 (wzór):** `Outback {N}kW air source heat pump`
- **Meta (wzór, 8 kW):** `Outback 8kW R290 air source heat pump: 3.2–10.6 kW output, SCOP 4.80, 60.5 dB(A), single phase. Specs, test data, manuals and price.`
- **H2:** What size home it suits · Heat output at −7°C · Full specifications · Dimensions and clearances · Noise · Manuals and downloads · Warranty
- Frazy „heat pump for {2|3|4} bed house” tylko gdy klient potwierdzi `typicalHomeFit`.

### Hot water cylinders 🆕 `/heat-pumps/hot-water-cylinders`
- **Główna:** heat pump hot water cylinder · **H1:** `Hot water cylinders for heat pumps` · **Title:** `Heat Pump Hot Water Cylinders and Accessories`
- Warunek: dane cylindrów od klienta (pojemności, gwarancja 20 lat — źródło).

### Wallaroo `/heat-pumps/wallaroo`
- **Główna:** heat pump without hot water cylinder · wspierające: outdoor heat pump with cylinder, all in one heat pump, ecogenica wallaroo
- **Title:** `Outdoor Heat Pump with Built-in Cylinder – Wallaroo`
- **H1:** `Wallaroo: heat pump and hot water cylinder in one outdoor unit`
- **Meta:** `No room for a hot water cylinder? The Wallaroo keeps the heat pump and cylinder outside. Coming soon to the UK. Register your interest.`

### Boiler Upgrade Scheme `/boiler-upgrade-scheme`
- **Główna:** boiler upgrade scheme · wspierające: heat pump grant (uk), air source heat pump grant, £7500 heat pump grant, boiler upgrade scheme eligibility
- **Title:** `Boiler Upgrade Scheme 2026: Up to £9,000 Grant`
- **H1:** `Boiler Upgrade Scheme: the £7,500 heat pump grant, explained`
- **Meta:** `Who qualifies for the Boiler Upgrade Scheme, how much you get (£7,500, or £9,000 for oil and LPG homes) and how your installer applies. Check eligibility.`
- **H2:** How much is the grant? · Who is eligible? · How to apply (your installer does it) · Do I need an EPC? · Landlords and the grant · Is the scheme still open? · Check your eligibility

### Koszt 🆕 `/heat-pump-cost`
- **Główna:** heat pump cost · wspierające: air source heat pump cost uk, heat pump installation costs, air source heat pump price, heat pump cost after grant
- **Title:** `Air Source Heat Pump Cost UK: Price After the Grant`
- **H1:** `How much does an air source heat pump cost?`
- **Meta:** `What an air source heat pump costs in the UK, what's included (radiators, cylinder, installation) and what you pay after the £7,500 grant. Get your fixed price.`
- **H2:** Typical price after the grant* · What's included · What changes the price · Do I need new radiators? · Finance options (jeśli są) · Get your fixed price
- To strona z najwyższą intencją zakupową; tabela „co wchodzi w cenę” w HTML.

### Koszty eksploatacji 🆕 `/running-costs`
- **Główna:** heat pump running costs · wspierające: air source heat pump running costs, heat pump running costs calculator, are heat pumps cheaper to run than gas
- **Title:** `Heat Pump Running Costs: Calculator and Real Figures`
- **H1:** `What does a heat pump cost to run?`
- **Meta:** `Estimate your heat pump running costs against gas, oil or LPG. Uses SCOP from MCS test data and current UK energy prices. Free calculator.`
- **H2:** Running cost calculator · Heat pump vs gas: cost per kWh of heat · What SCOP means for your bill · Best tariffs for heat pumps · How to cut running costs
- Kalkulator: blok `client` z jawną metodologią i źródłem cen (Ofgem price cap) w CMS — claimy oszczędności pod ASA.

### Heat pump vs gas boiler 🆕 `/heat-pump-vs-gas-boiler`
- **Główna:** heat pump vs gas boiler · wspierające: replace gas boiler with heat pump, heat pump vs boiler running costs
- **Title:** `Heat Pump vs Gas Boiler: Costs, Comfort and Grants`
- **H1:** `Heat pump vs gas boiler: which is right for your home?`
- **H2:** Upfront cost after the grant · Running costs · Comfort and how heat feels different · Space needed · Lifespan and servicing · When a heat pump isn't the right choice

### Oil i LPG 🆕 `/oil-lpg-boiler-replacement`
- **Główna:** replace oil boiler with heat pump · wspierające: oil boiler replacement, lpg boiler replacement, heat pump vs oil boiler, heat pump for off gas grid homes, £9000 heat pump grant
- **Title:** `Replace Your Oil or LPG Boiler with a Heat Pump`
- **H1:** `Replace your oil or LPG boiler with a heat pump, with up to £9,000 off`
- **Meta:** `Off the gas grid? Swap oil or LPG for an R290 heat pump. Eligible homes get a £9,000 Boiler Upgrade Scheme grant until 31 March 2027. Check your price.`
- **H2:** The £9,000 grant for off-gas homes · Heat pump vs oil: running costs · No more fuel deliveries or tank · Rural and older homes · What happens to the oil tank
- Audyt: najmocniejszy przypadek do zamiany. Dobra strona pod kampanie Google Ads.

### How it works `/how-it-works`
- **Główna:** heat pump installation · wspierające: how long does a heat pump installation take, is my house suitable for a heat pump, do i need planning permission for a heat pump, where to put a heat pump
- **Title:** `Heat Pump Installation: What Happens, Step by Step`
- **H1:** `How heat pump installation works`
- **H2:** Is my home suitable? · Survey and heat loss design · Installation day · Planning permission and where the unit goes · Commissioning and handover · Aftercare

### Installers `/installers`
- **Główna:** r290 heat pump supplier uk · wspierające: heat pump wholesaler uk, r290 heat pump wholesaler uk, heat pump distributor uk, become a heat pump installer partner
- **Title:** `R290 Heat Pump Supplier for UK Installers`
- **H1:** `R290 monobloc heat pumps for UK installers`
- **Meta:** `Fit R290 monobloc heat pumps from 5 to 16 kW with UK stock, technical support in Leicestershire, spec sheets and fast warranty registration.`

### Support `/support` i `/support/manuals`
- Support — **główna:** heat pump warranty, ecogenica warranty; **H1:** `Ecogenica heat pump warranty and product registration` (audyt §4)
- Manuals — **główna:** ecogenica manual, monobloc heat pump installation manual; **H1:** `Outback heat pump manuals and brochures` (audyt §4)

### FAQ `/faq`
- **Główna:** heat pump faq · wszystkie frazy z rolą `faq` jako pytania (H3 w grupach H2), odpowiedź widoczna w HTML (audyt §5: obecnie ukryte).
- 10–15+ pytań na start (audyt §11), FAQPage JSON-LD.

### Realizacje 🆕 `/case-studies` (+ `/case-studies/{slug}`)
- **Główna:** heat pump installation case study; pojedyncza: `heat pump installation {town}`
- Warunek: min. 3 prawdziwe instalacje UK ze zgodą klientów. Wtedy kolekcja
  `caseStudies` (przechodzi test z `kolekcje_katalog.md`: lista, własny URL,
  jawna potrzeba z audytu §12). Do tego czasu strona nie powstaje.

### Opinie 🆕 `/reviews`
- **Główna:** ecogenica reviews · wspierające: air source heat pump reviews uk
- Widget Trustpilot/Google z prawdziwymi opiniami UK; AggregateRating dopiero
  przy realnych opiniach. Do tego czasu strona nie powstaje (pusta strona opinii szkodzi).

### Obszary 🆕 `/areas/{area}`
- **Główna:** `heat pump installer {town}` · wspierające: `air source heat pump {town}`
- Tylko obszary z realnymi instalacjami (audyt §12: np. Leicestershire,
  Warwickshire, Coventry, Birmingham, Nottingham — **klient potwierdza**).
- Strony w kolekcji `pages` z blokami, każda z unikalną treścią: lokalne
  realizacje, czas dojazdu, typowe domy w okolicy, lokalna opinia.
- **Title (wzór):** `Heat Pump Installers in {Town}` · **H1:** `Air source heat pump installation in {Town}`

### About `/about`
- **Główna:** ecogenica uk · wspierające: heat pump manufacturer uk
- **H1:** `About Ecogenica UK: heat pump manufacturer and installer` (audyt §4)

### Get a quote `/get-a-quote` i Contact `/contact`
- Quote — **główna:** heat pump quote, air source heat pump quote; **H1:** `Get your fixed heat pump price in 60 seconds` (audyt §4)
- Contact — **H1:** `Contact Ecogenica UK`; bez celu frazowego poza marką.

### Guides (faza 2, kolekcja `blogPosts` po decyzji klienta)
Kandydaci z klastra G/F z priorytetem P3 + audyt §12: *Is my home suitable for a
heat pump?* · *Do I need new radiators for a heat pump?* · *Heat pump winter
running costs* · *Air source vs ground source* · *Heat pumps in older homes*.

---

## 3. Lista fraz (138)

Kolumny: intencja (informacyjna / komercyjna / transakcyjna / lokalna / marka /
B2B), priorytet (P1 start i fraza główna, P2 start i H2/FAQ, P3 faza 2 lub
warunkowa), strona docelowa, rola (primary / secondary / h2 / faq).
¹ = wolumen ze źródła w §0. Pełna wersja do filtrowania i uzupełniania:
**`12-slowa-kluczowe.csv`** (UTF-8, otwiera się w Excelu / Google Sheets).

### A. Kategoria

| # | Fraza | Intencja | Prio | Strona | Rola | Wolumen UK | Uwagi |
|---|---|---|---|---|---|---|---|
| 1 | air source heat pump | komercyjna | P1 | `/` | primary | — | Główna fraza strony głównej; silna konkurencja (Octopus, British Gas, EST) |
| 2 | air source heat pumps uk | komercyjna | P1 | `/` | secondary | — |  |
| 3 | heat pump | komercyjna | P2 | `/` | secondary | 96,454¹ | Fraza ogólna — realnie poza zasięgiem nowej domeny; tylko w treści |
| 4 | air source heat pump installation | transakcyjna | P1 | `/` | secondary | — | Też w /how-it-works |
| 5 | heat pump installation | transakcyjna | P1 | `/how-it-works` | primary | — |  |
| 6 | air source heat pump installers | transakcyjna | P1 | `/` | secondary | — | Wspierać lokalnie (GBP + /areas) |
| 7 | heat pump installers near me | lokalna | P1 | `Google Business Profile` | primary | — | Wynik z mapy — strona tylko wspiera; patrz audyt §7 |
| 8 | best air source heat pump uk | komercyjna | P2 | `/heat-pumps` | secondary | — | Rankingi zajmują portale; ważne dla GEO (11) |
| 9 | air to water heat pump | komercyjna | P2 | `/heat-pumps` | secondary | — |  |
| 10 | monobloc heat pump | komercyjna | P1 | `/heat-pumps` | secondary | — | Wyróżnik produktu |
| 11 | monobloc air source heat pump | komercyjna | P1 | `/heat-pumps` | secondary | — |  |
| 12 | r290 heat pump | komercyjna | P1 | `/heat-pumps` | primary | — | Realna szansa na top 10 — mniejsza konkurencja |
| 13 | r290 air source heat pump | komercyjna | P1 | `/heat-pumps` | secondary | — |  |
| 14 | propane heat pump | komercyjna | P2 | `/heat-pumps` | h2 | — | Wyjaśnić R290 = propan, bezpieczeństwo |
| 15 | natural refrigerant heat pump | komercyjna | P2 | `/heat-pumps` | h2 | — |  |
| 16 | mcs certified heat pump | komercyjna | P2 | `/heat-pumps` | h2 | — | Pokazać nr certyfikatu MCS |
| 17 | quiet air source heat pump | komercyjna | P2 | `/heat-pumps` | h2 | — | Dane dB(A) z kart |
| 18 | heat pump supplier uk | komercyjna | P2 | `/installers` | secondary | — |  |

### B. Rozmiary i produkty

| # | Fraza | Intencja | Prio | Strona | Rola | Wolumen UK | Uwagi |
|---|---|---|---|---|---|---|---|
| 19 | 5kw air source heat pump | komercyjna | P1 | `/heat-pumps/outback-5kw` | primary | — |  |
| 20 | 5kw heat pump | komercyjna | P1 | `/heat-pumps/outback-5kw` | secondary | — |  |
| 21 | 8kw air source heat pump | komercyjna | P1 | `/heat-pumps/outback-8kw` | primary | — | Przykład z audytu |
| 22 | 8kw heat pump | komercyjna | P1 | `/heat-pumps/outback-8kw` | secondary | — |  |
| 23 | 11kw air source heat pump | komercyjna | P1 | `/heat-pumps/outback-11kw` | primary | — |  |
| 24 | 11kw heat pump | komercyjna | P1 | `/heat-pumps/outback-11kw` | secondary | — |  |
| 25 | 16kw air source heat pump | komercyjna | P1 | `/heat-pumps/outback-16kw` | primary | — |  |
| 26 | 16kw heat pump | komercyjna | P1 | `/heat-pumps/outback-16kw` | secondary | — |  |
| 27 | three phase heat pump | komercyjna | P2 | `/heat-pumps/outback-16kw` | h2 | — | 16 kW = 3 fazy |
| 28 | single phase heat pump | komercyjna | P2 | `/heat-pumps` | h2 | — | 5/8/11 kW |
| 29 | what size heat pump do i need | informacyjna | P1 | `/heat-pumps` | h2 | — | Sekcja 'Find my size' + link do wyceny |
| 30 | heat pump size calculator | informacyjna | P2 | `/heat-pumps` | faq | — | Nie budować kalkulatora heat loss — odesłać do ankiety |
| 31 | heat pump for 3 bed house | komercyjna | P2 | `/heat-pumps/outback-8kw` | h2 | — | Tylko jeśli typicalHomeFit potwierdzony |
| 32 | heat pump for 4 bed house | komercyjna | P2 | `/heat-pumps/outback-11kw` | h2 | — | j.w. |
| 33 | heat pump for 2 bed house | komercyjna | P2 | `/heat-pumps/outback-5kw` | h2 | — | j.w. |
| 34 | heat pump hot water cylinder | komercyjna | P2 | `/heat-pumps/hot-water-cylinders` | primary | — | Nowa strona z audytu |
| 35 | heat pump cylinder | komercyjna | P2 | `/heat-pumps/hot-water-cylinders` | secondary | — |  |
| 36 | heat pump without hot water cylinder | informacyjna | P2 | `/heat-pumps/wallaroo` | primary | — | Wallaroo |
| 37 | outdoor heat pump with cylinder | komercyjna | P3 | `/heat-pumps/wallaroo` | secondary | — | Z audytu |
| 38 | all in one heat pump | komercyjna | P3 | `/heat-pumps/wallaroo` | secondary | — |  |
| 39 | heat pump no cylinder space | informacyjna | P3 | `/heat-pumps/wallaroo` | h2 | — |  |

### C. Grant BUS

| # | Fraza | Intencja | Prio | Strona | Rola | Wolumen UK | Uwagi |
|---|---|---|---|---|---|---|---|
| 40 | boiler upgrade scheme | komercyjna | P1 | `/boiler-upgrade-scheme` | primary | — | Duża konkurencja (gov.uk, EST, MSE) — celować w long tail |
| 41 | heat pump grant | komercyjna | P1 | `/boiler-upgrade-scheme` | secondary | — |  |
| 42 | heat pump grant uk | komercyjna | P1 | `/boiler-upgrade-scheme` | secondary | — |  |
| 43 | air source heat pump grant | komercyjna | P1 | `/boiler-upgrade-scheme` | secondary | — |  |
| 44 | £7500 heat pump grant | komercyjna | P1 | `/boiler-upgrade-scheme` | secondary | — | Kwota z pola grantAmounts |
| 45 | £9000 heat pump grant | komercyjna | P1 | `/oil-lpg-boiler-replacement` | secondary | — | Off-gas do 31.03.2027 |
| 46 | boiler upgrade scheme eligibility | komercyjna | P1 | `/boiler-upgrade-scheme` | h2 | — | Checker |
| 47 | boiler upgrade scheme how to apply | informacyjna | P2 | `/boiler-upgrade-scheme` | h2 | — | Wniosek składa instalator |
| 48 | boiler upgrade scheme epc | informacyjna | P2 | `/boiler-upgrade-scheme` | faq | — |  |
| 49 | boiler upgrade scheme landlords | informacyjna | P2 | `/boiler-upgrade-scheme` | faq | — |  |
| 50 | boiler upgrade scheme installers | transakcyjna | P2 | `/boiler-upgrade-scheme` | h2 | — |  |
| 51 | is the boiler upgrade scheme still available | informacyjna | P2 | `/boiler-upgrade-scheme` | faq | — | Data lastReviewed |
| 52 | government heat pump grant | komercyjna | P2 | `/boiler-upgrade-scheme` | secondary | — |  |
| 53 | free heat pump | informacyjna | P3 | `/boiler-upgrade-scheme` | faq | — | Intencja 'za darmo' — uczciwie wyjaśnić, nie obiecywać |

### D. Koszt i cena

| # | Fraza | Intencja | Prio | Strona | Rola | Wolumen UK | Uwagi |
|---|---|---|---|---|---|---|---|
| 54 | heat pump cost | komercyjna | P1 | `/heat-pump-cost` | primary | — | Nowa strona z audytu (priorytet High) |
| 55 | heat pump costs | komercyjna | P1 | `/heat-pump-cost` | secondary | 6,131¹ |  |
| 56 | air source heat pump cost | komercyjna | P1 | `/heat-pump-cost` | secondary | — |  |
| 57 | air source heat pump cost uk | komercyjna | P1 | `/heat-pump-cost` | secondary | — | Przykład z audytu |
| 58 | heat pump installation costs | komercyjna | P1 | `/heat-pump-cost` | secondary | 1,946¹ |  |
| 59 | air source heat pump price | komercyjna | P1 | `/heat-pump-cost` | secondary | — |  |
| 60 | heat pump cost after grant | komercyjna | P1 | `/heat-pump-cost` | h2 | — | Główne pytanie klienta wg audytu |
| 61 | cost of heat pump for 3 bed house | komercyjna | P2 | `/heat-pump-cost` | h2 | — | Tylko z realnymi widełkami od klienta |
| 62 | heat pump finance | transakcyjna | P2 | `/heat-pump-cost` | h2 | — | Tylko jeśli finansowanie istnieje |
| 63 | heat pump quote | transakcyjna | P1 | `/get-a-quote` | primary | — |  |
| 64 | air source heat pump quote | transakcyjna | P1 | `/get-a-quote` | secondary | — |  |
| 65 | what's included in a heat pump installation | informacyjna | P2 | `/heat-pump-cost` | h2 | — | Radiatory, cylinder, uruchomienie |

### E. Koszty eksploatacji

| # | Fraza | Intencja | Prio | Strona | Rola | Wolumen UK | Uwagi |
|---|---|---|---|---|---|---|---|
| 66 | heat pump running costs | komercyjna | P1 | `/running-costs` | primary | — | Nowa strona + kalkulator (audyt High) |
| 67 | air source heat pump running costs | komercyjna | P1 | `/running-costs` | secondary | — |  |
| 68 | heat pump running costs calculator | komercyjna | P1 | `/running-costs` | secondary | — | Kalkulator = lead magnet |
| 69 | are heat pumps cheaper to run than gas | informacyjna | P1 | `/running-costs` | h2 | — |  |
| 70 | heat pump electricity usage | informacyjna | P2 | `/running-costs` | h2 | — |  |
| 71 | best electricity tariff for heat pump | informacyjna | P2 | `/running-costs` | h2 | — | Linki do taryf, bez rekomendacji dostawcy |
| 72 | heat pump savings | komercyjna | P2 | `/running-costs` | secondary | — | Claimy oszczędności tylko z metodologią (ASA) |
| 73 | what is scop heat pump | informacyjna | P2 | `/faq` | faq | — | Też na stronach modeli |
| 74 | cop vs scop | informacyjna | P3 | `/faq` | faq | — |  |

### F. Zamiana i porównania

| # | Fraza | Intencja | Prio | Strona | Rola | Wolumen UK | Uwagi |
|---|---|---|---|---|---|---|---|
| 75 | heat pump vs gas boiler | komercyjna | P1 | `/heat-pump-vs-gas-boiler` | primary | — | Nowa strona z audytu |
| 76 | replace gas boiler with heat pump | komercyjna | P1 | `/heat-pump-vs-gas-boiler` | secondary | — |  |
| 77 | heat pump vs boiler running costs | komercyjna | P2 | `/heat-pump-vs-gas-boiler` | h2 | — |  |
| 78 | replace oil boiler with heat pump | komercyjna | P1 | `/oil-lpg-boiler-replacement` | primary | — | Najmocniejszy argument + £9,000 |
| 79 | oil boiler replacement | transakcyjna | P1 | `/oil-lpg-boiler-replacement` | secondary | — |  |
| 80 | lpg boiler replacement | transakcyjna | P1 | `/oil-lpg-boiler-replacement` | secondary | — |  |
| 81 | heat pump vs oil boiler | komercyjna | P1 | `/oil-lpg-boiler-replacement` | h2 | — |  |
| 82 | off grid heating options | informacyjna | P2 | `/oil-lpg-boiler-replacement` | h2 | — |  |
| 83 | heat pump for off gas grid homes | komercyjna | P1 | `/oil-lpg-boiler-replacement` | secondary | — |  |
| 84 | replace storage heaters with heat pump | komercyjna | P3 | `/heat-pump-vs-gas-boiler` | faq | — | BUS obejmuje ogrzewanie elektryczne |
| 85 | monobloc vs split heat pump | informacyjna | P2 | `/heat-pumps` | h2 | — |  |
| 86 | r290 vs r32 | informacyjna | P1 | `/heat-pumps` | h2 | — | Blok refrigerantCompare + FAQ; dobre dla GEO |
| 87 | air source vs ground source heat pump | informacyjna | P3 | `/guides/air-vs-ground-source` | primary | — | Faza 2 |
| 88 | hybrid heat pump | informacyjna | P3 | `/faq` | faq | — | Ecogenica nie sprzedaje hybryd — krótka odpowiedź |

### G. Obawy i dopasowanie

| # | Fraza | Intencja | Prio | Strona | Rola | Wolumen UK | Uwagi |
|---|---|---|---|---|---|---|---|
| 89 | is my house suitable for a heat pump | informacyjna | P1 | `/how-it-works` | h2 | — | Też guide w fazie 2 |
| 90 | do heat pumps work in cold weather | informacyjna | P1 | `/heat-pumps` | h2 | — | Climate range + dane −7°C |
| 91 | heat pump in cold weather | informacyjna | P1 | `/heat-pumps` | secondary | — |  |
| 92 | do heat pumps work in old houses | informacyjna | P2 | `/faq` | faq | — |  |
| 93 | do i need new radiators for a heat pump | informacyjna | P1 | `/faq` | faq | — | Audyt: temat na guide |
| 94 | heat pump radiators | komercyjna | P2 | `/heat-pump-cost` | h2 | — | Oferta 'including radiators' |
| 95 | underfloor heating heat pump | informacyjna | P3 | `/faq` | faq | — |  |
| 96 | are heat pumps noisy | informacyjna | P1 | `/faq` | faq | — | Przykład z audytu |
| 97 | how loud is a heat pump | informacyjna | P2 | `/faq` | faq | — |  |
| 98 | do i need planning permission for a heat pump | informacyjna | P2 | `/how-it-works` | h2 | — | Permitted Development — link do Planning Portal |
| 99 | where to put a heat pump | informacyjna | P2 | `/how-it-works` | h2 | — |  |
| 100 | how long does a heat pump installation take | informacyjna | P1 | `/how-it-works` | h2 | — | Czas od klienta |
| 101 | how long does a heat pump last | informacyjna | P2 | `/faq` | faq | — |  |
| 102 | heat pump servicing | transakcyjna | P2 | `/support` | h2 | — |  |
| 103 | heat pump service cost | komercyjna | P2 | `/support` | faq | — | Tylko z ceną od klienta |
| 104 | heat pump defrost cycle | informacyjna | P3 | `/faq` | faq | — |  |
| 105 | heat pump flow temperature | informacyjna | P3 | `/faq` | faq | — |  |
| 106 | does a heat pump heat hot water | informacyjna | P2 | `/faq` | faq | — |  |
| 107 | heat pump warranty | komercyjna | P2 | `/support` | primary | — |  |

### H. Instalatorzy (B2B)

| # | Fraza | Intencja | Prio | Strona | Rola | Wolumen UK | Uwagi |
|---|---|---|---|---|---|---|---|
| 108 | r290 heat pump supplier uk | B2B | P1 | `/installers` | primary | — |  |
| 109 | heat pump wholesaler uk | B2B | P1 | `/installers` | secondary | — |  |
| 110 | r290 heat pump wholesaler uk | B2B | P1 | `/installers` | secondary | — | Przykład z audytu |
| 111 | heat pump distributor uk | B2B | P2 | `/installers` | secondary | — |  |
| 112 | heat pump trade price | B2B | P2 | `/installers` | h2 | — | Tylko jeśli konto trade istnieje |
| 113 | heat pump manufacturer uk | B2B | P2 | `/about` | secondary | — | Uczciwie: producent AU, wsparcie UK |
| 114 | become a heat pump installer partner | B2B | P2 | `/installers` | h2 | — |  |
| 115 | monobloc heat pump installation manual | B2B | P2 | `/support/manuals` | secondary | — |  |
| 116 | heat pump spec sheet | B2B | P3 | `/support/manuals` | secondary | — |  |

### I. Lokalne

| # | Fraza | Intencja | Prio | Strona | Rola | Wolumen UK | Uwagi |
|---|---|---|---|---|---|---|---|
| 117 | heat pump installer leicester | lokalna | P2 | `/areas/leicester` | primary | — | Warunek: realne instalacje w obszarze |
| 118 | air source heat pump leicester | lokalna | P2 | `/areas/leicester` | secondary | — | Przykład z audytu |
| 119 | heat pump installers leicestershire | lokalna | P2 | `/areas/leicestershire` | primary | — |  |
| 120 | heat pump installer coventry | lokalna | P3 | `/areas/coventry` | primary | — | j.w. |
| 121 | heat pump installer birmingham | lokalna | P3 | `/areas/birmingham` | primary | — | j.w. |
| 122 | heat pump installer nottingham | lokalna | P3 | `/areas/nottingham` | primary | — | j.w. |
| 123 | heat pump installer warwickshire | lokalna | P3 | `/areas/warwickshire` | primary | — | j.w. |
| 124 | heat pump installer nuneaton | lokalna | P3 | `/areas/warwickshire` | secondary | — | Blisko Atherstone |
| 125 | heat pump installer tamworth | lokalna | P3 | `/areas/staffordshire` | secondary | — |  |
| 126 | heat pump installer hinckley | lokalna | P3 | `/areas/leicestershire` | secondary | — |  |

### J. Marka

| # | Fraza | Intencja | Prio | Strona | Rola | Wolumen UK | Uwagi |
|---|---|---|---|---|---|---|---|
| 127 | ecogenica | marka | P1 | `/` | primary | — | Uwaga: Trustpilot myli z ecogenuk.co.uk (audyt §7) |
| 128 | ecogenica uk | marka | P1 | `/about` | primary | — |  |
| 129 | ecogenica heat pump | marka | P1 | `/heat-pumps` | secondary | — |  |
| 130 | ecogenica reviews | marka | P1 | `/reviews` | primary | — | Wymaga prawdziwych opinii UK |
| 131 | ecogenica outback | marka | P1 | `/heat-pumps` | secondary | — |  |
| 132 | ecogenica wallaroo | marka | P2 | `/heat-pumps/wallaroo` | secondary | — |  |
| 133 | ecogenica manual | marka | P2 | `/support/manuals` | primary | — | Przykład z audytu |
| 134 | ecogenica warranty | marka | P2 | `/support` | secondary | — |  |
| 135 | eco-zr02fc / eco-zr03fc / eco-zr04fc / eco-zr06fc | marka | P2 | `/heat-pumps/outback-*` | secondary | — | Kody modeli w title i specyfikacji |

### K. Realizacje i opinie

| # | Fraza | Intencja | Prio | Strona | Rola | Wolumen UK | Uwagi |
|---|---|---|---|---|---|---|---|
| 136 | heat pump installation case study | komercyjna | P3 | `/case-studies` | primary | — | Warunek: min. 3 realne instalacje UK |
| 137 | heat pump installation [town] | lokalna | P3 | `/case-studies/{slug}` | primary | — | Szablon frazy z audytu |
| 138 | air source heat pump reviews uk | komercyjna | P3 | `/reviews` | secondary | — |  |
