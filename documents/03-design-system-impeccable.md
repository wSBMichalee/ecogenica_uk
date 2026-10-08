# 03 — Design system i workflow Impeccable

Rola: senior UX/UI. Kierunek wizualny inspirowany **1password.com**, ale
przełożony na produkt fizyczny (pompa ciepła), a każda decyzja przechodzi przez
**Impeccable** (`/impeccable init → document → shape → … → polish → audit`),
żeby strona nie wyglądała jak AI slop.

> Brak pliku PDF ze stylem w załącznikach (dotarły tylko .md i .txt). Jeśli
> istnieje brandbook Ecogenica — wgrać go, a tokeny w §4 zostaną nadpisane jego
> wartościami przez `/impeccable document`.

---

## 1. Czego uczymy się od 1Password (i czego NIE kopiujemy)

| 1Password robi | U Ecogenica | Dlaczego |
|---|---|---|
| Ciemny hero, produkt jako bohater (realne UI zamiast ilustracji) | Ciemny „mroźny” hero, **realna jednostka Outback** (wideo/packshot), nie ikonki | Produkt fizyczny = najlepszy dowód |
| Duży, krótki nagłówek + 1 zdanie + 2 CTA (primary/secondary) | „Warm homes, from cold air.” + 1 zdanie + Get a quote / Explore the range | Jasność decyzji |
| Rozdział na grupy klientów (Personal / Business) | **Homeowners / Installers** — dwa ścieżki od pierwszego ekranu | Ecogenica sprzedaje B2C i B2B |
| Mega-menu z miniaturami produktów | Mega-menu „Heat pumps” z packshotami 4 modeli + Wallaroo | Szybka nawigacja do modelu |
| Karty produktowe w nierównym bento | Bento z różnymi rozmiarami wg wagi treści | Hierarchia, nie siatka 3×2 |
| Historia klienta z marką partnera (Red Bull Racing) | Case study instalacji UK (zdjęcia, dom, dane zużycia) | Dowód lokalny |
| Spokojna, gęsta, uporządkowana stopka | Stopka z danymi firmy, akredytacjami, linkami | Zaufanie |
| Jeden mocny kolor akcji | Jeden kolor akcji („Heat”) | Czytelność CTA |

**Nie kopiujemy:** poświaty/halo za treścią i neonów na ciemnym tle (Impeccable
flaguje *radial-gradient halo*, *dark mode with glowing accents*), auto-marquee
logotypów, „eyebrow” pigułek nad H1, metryk-bohaterów bez kontekstu.

---

## 2. Koncepcja: „Cold outside. Warm inside.”

Pompa ciepła bierze ciepło z zimnego powietrza i oddaje je w domu. Strona
**opowiada to kolorem i ruchem**, a nie dekoracją:

- **Temperatura jako system znaczeń.** Kolor „Frost” (chłodny) pojawia się
  tylko tam, gdzie mowa o powietrzu zewnętrznym / zimnie. Kolor „Heat”
  (ciepły) tylko tam, gdzie mowa o cieple dostarczonym i akcjach (CTA).
  Nigdy jako ozdobny gradient.
- **Scroll = przejście z zewnątrz do środka.** Strona główna zaczyna w ciemnym,
  chłodnym otoczeniu (zimowy ogród, jednostka w szronie), a w miarę scrollowania
  tło przechodzi płynnie w ciepły jasny „papier” wnętrza domu. Jeden ciągły
  ruch na całą stronę, nie efekt per sekcję.
- **Dane jako ozdoba.** Prawdziwe liczby z kart (COP przy −7°C, GWP 3 vs 675,
  zakres −15…+40°C) są elementami graficznymi — skala temperatur, wykres COP,
  porównanie czynnika.

---

## 3. PRODUCT.md — szkic do `/impeccable init`

Antigravity uruchamia `/impeccable init` w roocie projektu i przy pytaniach
podaje poniższe. Wynik zapisany w `PRODUCT.md` (review przez Michała).

```markdown
## Platform
web

## Product
Ecogenica UK sells R290 air source heat pumps (Outback range: 5, 8, 11, 16 kW)
and, soon, the Wallaroo outdoor all-in-one heat pump + cylinder. Australian
manufacturer, UK warehouse and technical support in Leicestershire.

## Users
1. Homeowners in England and Wales replacing a gas, oil or LPG boiler.
   Usually researching on a phone in the evening, comparing 3–5 suppliers,
   anxious about cost, noise, cold-weather performance and disruption.
   Decision depends on: price after the Boiler Upgrade Scheme grant, proof it
   works in UK winters, a trustworthy installer.
2. MCS-certified heating installers choosing a heat pump brand to fit.
   Use a laptop at the office or a phone on site. Need: spec sheets, manuals,
   stock and lead times, warranty registration, technical support, margins.

## Product purpose
Homeowners: get a credible quote and understand what a switch involves.
Installers: decide to stock and fit Ecogenica, then find documents fast.

## Brand commitments
- Engineered, plain-spoken, Australian-direct. No hype words.
- Every number shown has a documented source (MCS certificate, test report).
- Testimonials always state country and product.
- Never imply the grant is guaranteed; eligibility is checked by the installer.

## Accessibility & inclusion
WCAG 2.2 AA. Many homeowners are 55+: body text ≥ 17px, high contrast,
large tap targets, motion reduced on request, no information only in colour.

## Terminology
"air source heat pump" (not "ASHP" in headings), "Boiler Upgrade Scheme (BUS)",
"MCS certified", "R290 (propane) refrigerant", "monobloc", "flow temperature".
British English spelling.
```

---

## 4. DESIGN.md — seed (do `/impeccable document` w trybie seed)

Wartości startowe. Po zbudowaniu pierwszych bloków `/impeccable document`
uruchamiamy ponownie, żeby zapisać faktyczne tokeny i komponenty.

### 4.1 Kolor (OKLCH, tryb jasny + ciemny sekcji)

| Token | Rola | Wartość startowa |
|---|---|---|
| `--ink-950` | tło sekcji „outside” (noc, szron) | `oklch(17% 0.02 250)` |
| `--ink-900` | powierzchnia na ciemnym | `oklch(22% 0.025 250)` |
| `--ink-700` | linie/obramowania na ciemnym | `oklch(36% 0.02 250)` |
| `--paper-50` | tło sekcji „inside” | `oklch(98.5% 0.004 85)` (ciepła biel, **nie** beż) |
| `--paper-100` | powierzchnia kart na jasnym | `oklch(96% 0.006 85)` |
| `--text-strong` | tekst na jasnym | `oklch(20% 0.02 250)` |
| `--text-muted` | tekst pomocniczy na jasnym | `oklch(45% 0.02 250)` (≥ 4.5:1) |
| `--frost-400` | znaczenie: zimno / powietrze zewn. | `oklch(78% 0.09 230)` |
| `--frost-600` | j.w., tekst na jasnym | `oklch(52% 0.12 235)` |
| `--heat-500` | **jedyny kolor akcji** + znaczenie „ciepło” | `oklch(68% 0.18 45)` (ember orange) |
| `--heat-600` | hover / tekst na jasnym | `oklch(58% 0.17 40)` |
| `--leaf-500` | wyłącznie stan „eco”/GWP (rzadko) | `oklch(68% 0.13 150)` |
| `--danger` / `--success` | stany formularzy | standardowe, AA |

Reguły:
- Kolor logo Ecogenica (do odczytania z `Logo-transparent.png`) ma pierwszeństwo
  — jeśli logo jest zielone, `--leaf` staje się brand color, a `--heat` dalej
  pełni rolę akcji. Decyzja przez `/impeccable colorize the homepage`.
- **Zero gradient text, zero purple/cyan, zero glow.** Gradient dozwolony tylko
  w jednym miejscu: skala temperatur (dane), od `--frost-400` do `--heat-500`.
- Kontrast tekstu sprawdzany na realnym tle (sekcje przejściowe w połowie
  przejścia kolorów też!).

### 4.2 Typografia

| Rola | Krój (propozycja) | Uwagi |
|---|---|---|
| Display + UI | **Schibsted Grotesk** (variable, 400–800) | inżynierski, nie „Inter-everywhere” |
| Dane / specyfikacje | **IBM Plex Mono** (400/500) z `tabular-nums` | odczyty kW, COP, dB, °C |
| Alternatywa do porównania | Hanken Grotesk / Familjen Grotesk | wybór przez `/impeccable typeset` |

Self-host przez `next/font/local` (bez Google Fonts CDN — RODO/UK GDPR,
brak transferu IP). Skala (rem, fluid `clamp`):

```
display-xl  clamp(2.75rem, 6vw, 5.25rem) / 1.02 / -0.02em / 700   (tylko H1 home)
display-l   clamp(2.25rem, 4.5vw, 3.75rem) / 1.05 / -0.015em / 700
heading-l   clamp(1.75rem, 3vw, 2.5rem) / 1.15 / -0.01em / 650
heading-m   1.5rem / 1.25 / 600
heading-s   1.1875rem / 1.3 / 600
body-l      1.1875rem / 1.6 / 400      (lead)
body        1.0625rem / 1.65 / 400     (17px — publiczność 55+)
small       0.9375rem / 1.5 / 400
data-xl     clamp(2.5rem, 5vw, 4rem) / 1 / mono 500 tabular
data        1rem mono 500 tabular
label       0.8125rem / 1.3 / 600 / +0.04em uppercase (TYLKO krótkie etykiety)
```
Szerokość tekstu 60–72 znaki. H1 max ~8 słów (Impeccable: *oversized hero headline*).

### 4.3 Kształt, siatka, odstępy
- Promienie: `4` (pola, pigułki danych), `10` (karty), `20` (duże media/bento).
  Nic powyżej 20 (Impeccable: *extreme border-radius*).
- Karty: **albo** tło, **albo** 1px linia — nigdy linia + szeroki cień.
  Żadnych kart w kartach, żadnych kolorowych pasków bocznych.
- Siatka 12 kol., max 1320 px treści, marginesy 16 / 24 / 40 px.
- Spacing 4-pt, sekcje: 96–160 px desktop, 64–96 mobile. Rytm nierówny celowo:
  powiązane rzeczy blisko, sekcje daleko (Impeccable: *monotonous spacing*).

### 4.4 Komponenty bazowe (dla `/impeccable extract`)
`Button` (primary heat / secondary ghost / text link), `SpecValue` (liczba mono +
jednostka + etykieta + źródło w tooltipie), `TempScale`, `ProductCard`,
`Field`/`Select`/`Checkbox` (builder form), `Badge` statusu (Available /
Coming soon — statyczne, bez pulsowania), `MegaMenu`, `Accordion`, `VideoPlayer`,
`Cursor`.

### 4.5 Ikonografia i obraz
- Ikony liniowe 1.5 px (Lucide lub własne), 20–24 px, **obok** nagłówka, nigdy
  w kolorowym kafelku nad nim (Impeccable: *icon tile stacked above heading*).
- Fotografia: realne domy w UK (cegła, zimowe ogrody, szron na jednostce),
  ludzie-instalatorzy przy pracy, detale (zawór, przyłącza). Zero stocków
  „uśmiechnięta rodzina z kubkiem”. Lista ujęć do sesji w `podstrony/*`.
- Packshoty na przezroczystym tle, cień kontaktowy rysowany CSS-em.
- Ilustracje: tylko techniczne (schemat obiegu, exploded view) — z CAD/3D
  klienta, nie rysowane ręcznie SVG (Impeccable: *rough SVG illustrations*).

---

## 5. Tryby stron (Impeccable modes)

| Strona | Mode | Brief w `.impeccable/surfaces/` |
|---|---|---|
| Home | **Persuade** | `home.md` |
| Heat pumps (gama) | Persuade | `range.md` |
| Produkt (szablon) | Persuade (hero) → **Read** (spec, dokumenty) | `product.md` |
| Wallaroo (coming soon) | **Experience** | `wallaroo.md` |
| Boiler Upgrade Scheme | **Read** + Operate (checker) | `bus-grant.md` |
| How it works | Read | `how-it-works.md` |
| Installers | Persuade | `installers.md` |
| Support / rejestracja | **Operate** | `support.md` |
| Manuals | Operate | `manuals.md` |
| About | Experience | `about.md` |
| Get a quote | Operate | `quote.md` |
| Contact | Operate | `contact.md` |
| FAQ, polityki | Read | `faq.md`, `legal.md` |

Każdy plik w `podstrony/` kończy się sekcją „Brief Impeccable” — wkleić ją
do `.impeccable/surfaces/<nazwa>.md`.

---

## 6. Workflow Impeccable (kolejność komend)

```bash
# 0. raz na projekt
npx impeccable install            # wybrać build dla Antigravity
/impeccable init                  # PRODUCT.md (§3)
/impeccable hooks on              # detektor slop przy każdej edycji UI
/impeccable document              # DESIGN.md w trybie seed (§4)

# 1. per strona — kierunek przed kodem (comp-led dla Home i Wallaroo)
/impeccable shape the homepage for homeowners and installers
/impeccable design the homepage using DESIGN.md and the home brief

# 2. po zbudowaniu funkcjonalnych bloków przez Antigravity
/impeccable critique the homepage
/impeccable typeset the homepage
/impeccable layout the product page
/impeccable colorize the homepage            # kontrola znaczenia frost/heat
/impeccable animate the exploded view section
/impeccable delight the climate range slider
/impeccable overdrive the homepage hero      # tylko hero Home + Wallaroo
/impeccable quieter the support page         # Operate ma „zniknąć”
/impeccable clarify the get-a-quote page     # komunikaty, kroki
/impeccable adapt the homepage for mobile
/impeccable harden the grant checker         # stany błędów, brak danych
/impeccable optimize the homepage            # LCP/JS budżet
/impeccable extract                          # wspólne komponenty
/impeccable polish <strona>                  # finalnie każda strona
/impeccable audit <strona>                   # a11y/jakość

# 3. utrzymanie
/impeccable document                         # odśwież DESIGN.md z kodu
/impeccable doctor
npx impeccable detect http://localhost:3000  # też w CI (patrz 09)
```

Iteracje wizualne na żywo: `/impeccable live` — wybór elementu, porównanie
wariantów, akceptacja do źródła. Warianty pojedynczego elementu:
`/impeccable generate`.

**Granica (z `architektura-tresci.md`):** Impeccable zmienia wygląd komponentów.
Jeśli podczas `polish` pojawi się tekst w JSX → to błąd, tekst wraca do pola CMS.

---

## 7. Lista „anti-slop” — twarde zakazy dla tej strony

Z katalogu Impeccable (59 reguł) — te najbardziej kuszące przy tym projekcie:

- ❌ Pigułka „Introducing / New” nad H1 → informacja do treści albo nic.
- ❌ Gradient text, fiolet/cyjan, neonowe obramowania, halo za hero.
- ❌ Glassmorphism kart nad wideo (dozwolony tylko pasek nawigacji, jeśli realnie
  rozwiązuje czytelność nad wideo — i wtedy z wystarczającym kontrastem).
- ❌ Ikona w kolorowym kafelku nad nagłówkiem; siatka 6 identycznych kart.
- ❌ „01 / 02 / 03” przy sekcjach bez sekwencji (OK w procesie 4 kroków — to
  sekwencja).
- ❌ Hero-metric „350,000+” w wielkich cyfrach bez kontekstu.
- ❌ Auto-marquee logotypów i opinii (opinie: scroller sterowany przez
  użytkownika z przyciskami).
- ❌ Pulsujące kropki statusu, migający kursor tekstowy, bounce/elastic easing.
- ❌ Zoom/obrót każdego zdjęcia na hover.
- ❌ Treść ukryta do czasu animacji (`opacity:0` bez fallbacku) — treść
  widoczna domyślnie, animacja tylko „ulepsza”.
- ❌ Copy: „supercharge”, „world-class”, „revolutionary”, „game-changing”,
  „Not just X. A Y.”, em-dash w co drugim zdaniu.
- ❌ Beż/kremowe tła z odruchu, italic serif w H1.
- ❌ Tekst body < 16 px, uppercase w akapitach, justowanie.

---

## 8. Copy — ton głosu

- Prosto, konkretnie, liczby zamiast przymiotników: zamiast „super efficient”
  → „SCOP up to 5.22 at 35°C flow”.
- Krótkie zdania, British English, „you/your home”.
- Każda obietnica z warunkiem: „Up to £7,500 off with the Boiler Upgrade Scheme,
  if your home is eligible.”
- Australijskość jako konkret, nie slogan: „Designed and built by an Australian
  manufacturer. Supported from our warehouse in Leicestershire.”
- Cała propozycja copy w `podstrony/*` jest **propozycją do akceptacji klienta**;
  liczby wyłącznie z potwierdzonych źródeł (patrz `01`, §2).
