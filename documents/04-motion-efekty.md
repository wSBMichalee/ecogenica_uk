# 04 — Motion, efekty, scroll, custom cursor

Cel: strona ma być „petardą”, ale każdy efekt **coś tłumaczy** (Impeccable:
*Use motion to make changes, relationships, and feedback clear*). Ten plik to
specyfikacja techniczna wszystkich efektów — odwołują się do niej pliki
`podstrony/*`.

---

## 1. Zasady nadrzędne

1. **Treść widoczna bez JS.** Każda sekcja renderuje się kompletnie w HTML
   (RSC). Animacja tylko modyfikuje stan wyjściowy po hydracji
   (`data-motion="ready"` na `<html>`); brak JS = pełna, statyczna strona.
2. **`prefers-reduced-motion: reduce`** → wyłączone: smooth scroll, parallax,
   pin/scrub, kursor custom, autoplay wideo (pokazujemy poster + przycisk play).
   Zostają: zmiany kolorów stanów, fade ≤ 150 ms.
3. **`prefers-reduced-data` / Save-Data / 2G** → poster zamiast wideo, sekwencja
   exploded view jako 6 statycznych klatek.
4. **Tylko `transform` i `opacity`** w animacjach (Impeccable: *animation that
   changes layout*). Żadnego animowania `width/height/top/margin`.
5. **Easing:** `cubic-bezier(.2,.7,.2,1)` (wejścia), `cubic-bezier(.6,0,.4,1)`
   (przejścia stanów). Żadnego bounce/elastic. Czas: 180–320 ms UI,
   600–900 ms wejścia sekcji, scrub = sterowany scroll-em.
6. **Budżet:** cały JS motion ≤ 45 kB gz, ładowany dynamicznie
   (`import('gsap')` dopiero gdy sekcja zbliża się do viewportu).
   INP < 200 ms, CLS < 0.05.

## 2. Biblioteki

| Narzędzie | Do czego | Ładowanie |
|---|---|---|
| CSS `animation-timeline: view()` | proste wejścia sekcji, liczniki, paski porównań | natywnie; `@supports` + fallback IntersectionObserver |
| GSAP + ScrollTrigger | pin + scrub (exploded view, przejście kolorów strony), timeline hero | dynamic import, tylko na stronach, które mają blok wymagający |
| Lenis (opcjonalnie) | wygładzony scroll na desktop | **wyłącznie** pointer:fine + brak reduced-motion; decyzja po teście na realnym sprzęcie. Domyślnie OFF, natywny scroll jest bezpieczniejszy dla a11y |
| Canvas 2D | sekwencja klatek exploded view | własny lekki komponent `motion/sequence.ts` |
| R3F / three.js | **NIE w MVP** | 3D tylko jeśli klient dostarczy model GLB i budżet pozwoli (opcja fazy 2) |

Wszystko to warstwa prezentacji projektu (`src/motion/`), bez treści.

---

## 3. Katalog efektów

### E1. Przejście „outside → inside” (cała strona Home)
- Tło `<body>` interpolowane przez zmienną CSS `--ambient` (0 → 1) od hero
  (`--ink-950`) do sekcji testimonials/CTA (`--paper-50`).
- Sterowane ScrollTrigger na całej długości strony; kolor tekstu przełącza się
  skokowo w punkcie, gdzie kontrast tekstu jasnego spada poniżej 4.5:1
  (wyliczone, nie „na oko”).
- Każdy blok ma pole `tone` (select: `outside` | `inside` | `auto`) — redaktor
  może przestawiać bloki, a przejście dalej działa.
- Reduced motion: sekcje mają twarde tła wg `tone`, bez interpolacji.

### E2. Hero wideo z „odszranianiem”
- Pętla 8–12 s: jednostka Outback w zimowym ogrodzie, szron na żebrach
  wymiennika, para z wentylatora przy −5°C. (Ujęcia w `podstrony/10-home.md`).
- Pierwsza klatka = poster = LCP (`priority`, AVIF). Wideo startuje po
  `requestIdleCallback` i tylko gdy w viewport (IntersectionObserver).
- Na scroll (pierwsze 40% wysokości hero): wideo skaluje się z full-bleed do
  karty z promieniem 20 i przesuwa w górę, a pod nim wjeżdża pasek z trzema
  odczytami (SpecValue mono): `−15°C operating floor` · `SCOP up to 5.22` ·
  `GWP 3`. Wartości z produktu wskazanego w bloku (relacja), nie wpisane.
- Przycisk pauzy wideo zawsze widoczny (WCAG 2.2.2).

### E3. Exploded view Outback (pin + scrub)
- Sekcja przypięta na ~250% wysokości viewportu. Scroll przewija sekwencję
  90–120 klatek render 3D: obudowa odjeżdża, pokazując wentylator, wymiennik
  (evaporator), sprężarkę, zawór 4-drożny, pompę wody, przyłącza.
- Hotspoty (z CMS: `explodedView.hotspots`) pojawiają się przy odpowiednich
  `frameIndex` — nazwa części + 1 zdanie, czym jest dla właściciela domu
  („Rotary inverter compressor: speeds up and slows down to match demand,
  instead of switching on and off.”).
- Implementacja: preload klatek w `<link rel=prefetch>` dopiero gdy sekcja jest
  1 viewport od widoku; canvas `drawImage`; DPR max 2.
  Alternatywa lżejsza: `.webm` all-intra (każda klatka kluczowa) przewijany
  przez `video.currentTime` — test obu, wybrać szybszy na Safari iOS.
- Mobile: bez pinowania — 6 kluczowych klatek jako poziomy swipe z hotspotami.
- Źródło: render z CAD producenta (Ecogenica AU ma schemat 16 części).
  **Bez renderów ten efekt nie powstaje** — fallback: zdjęcie produktu
  z numerowanymi markerami (jak schemat w PDF).

### E4. Climate range — interaktywna skala temperatur
- Pozioma skala od −15°C do +40°C (jedyny dozwolony gradient: frost → heat).
- Suwak „Outside temperature” (domyślnie −2°C) + wybór modelu (5/8/11/16) +
  wybór temperatury zasilania (35/45/55°C).
- Odczyt: `Heat output 9.49 kW · COP 3.17` z tabeli `products.performance`
  (interpolacja liniowa pomiędzy punktami pomiarowymi, wyraźnie oznaczona:
  „Interpolated between test points”). Poza zakresem danych (≤ −7°C) pokazujemy
  ostatni zmierzony punkt i komunikat z CMS, nie zgadujemy.
- Pod spodem linia: przykładowe temperatury UK (pole CMS, np. „Average January
  low in Leicester”) — źródło Met Office w polu `source`.
- Klawiatura: suwak = `<input type="range">` z `aria-valuetext="−2 degrees"`.
- Mikro-delight: przy przesuwaniu w dół, delikatny szron (SVG noise, opacity
  0→0.15) na krawędzi karty; w górę — znika. Off przy reduced motion.

### E5. Refrigerant compare (GWP 3 vs 675)
- Dwa poziome paski w skali liniowej. R290 = 3 (prawie niewidoczny pasek +
  podpis), R32 = 675. Pasek R32 „rośnie” przy wejściu w viewport
  (`animation-timeline: view()`), 900 ms.
- Liczby w mono, dane z produktu + pole `source`.

### E6. Wejścia sekcji (globalne)
- Nagłówek: `translateY(16px) → 0`, `opacity .0 → 1`, 600 ms, raz.
- Listy/karty: stagger 60 ms, max 6 elementów (reszta bez opóźnienia).
- Obrazy: `clip-path: inset(8% round 20px) → inset(0 round 20px)`, 800 ms.
- Brak animacji wejścia dla tekstu body (czytelność).

### E7. Liczniki
- Tylko przy liczbach z kontekstem w zdaniu (np. „8 years of cover with Premium
  Warranty”). Count-up 900 ms, `tabular-nums`, końcowa wartość w HTML (SEO, bez JS).

### E8. Product lineup — „wybór rozmiaru”
- Cztery jednostki obok siebie **w realnej skali względem siebie** (wysokości
  805/845/1015/1435 mm z CMS) — od razu widać, że 16 kW jest dużo wyższa.
  Pod nimi linia podłogi i sylwetka człowieka 1.75 m dla skali (SVG, a11y
  `aria-hidden`).
- Hover/focus na jednostce: unosi się 6 px, pod nią pojawia się karta
  „Typical home: …” (pole CMS `typicalHomeFit`, np. „2–3 bed, well insulated”).

### E9. Mega-menu
- Otwiera się na hover (opóźnienie 120 ms intent) i na klik/Enter, panel
  `translateY(-8px) → 0` + opacity 180 ms. Miniatury produktów lazy.
- Nagłówek: przezroczysty na ciemnym hero → solidny `--ink-950/92%` + blur 12 px
  po 24 px scrolla (jedyne uzasadnione użycie blur: czytelność nad wideo).
  Chowa się przy scrollu w dół, wraca przy scrollu w górę (desktop i mobile).

### E10. Przyciski i linki
- Primary: tło `--heat-500`, hover `--heat-600` + strzałka przesuwa się o 3 px.
  Press: `scale(.97)` 120 ms.
- Magnetyzm przycisku CTA hero (przesunięcie max 6 px w stronę kursora) —
  tylko pointer:fine, tylko 2 CTA w hero.

---

## 4. Custom cursor (wymaganie klienta) — specyfikacja

Kursor ma **mówić, co się stanie po kliknięciu**, nie tylko ozdabiać.

### Wygląd
- Kropka 8 px (`--text-strong` na jasnym, `--paper-50` na ciemnym — przez
  `mix-blend-mode: difference` tylko dla kropki) + pierścień 36 px, 1.5 px,
  z opóźnieniem (lerp 0.18).
- **Systemowy kursor NIE jest ukrywany** na polach formularzy, tekście
  do zaznaczania, iframe Spruce i w panelu cookies — tam custom cursor znika.

### Stany (etykiety z CMS: `siteSettings.uiLabels.cursor*`, localized)
| Kontekst (atrybut `data-cursor`) | Stan | Etykieta (propozycja) |
|---|---|---|
| link/przycisk | pierścień → 56 px, wypełnienie 10% | — |
| wideo (pauza/odtwarzanie) | pierścień 88 px z ikoną play/pause | „Play” / „Pause” |
| exploded view (desktop) | pierścień z pionową strzałką | „Scroll to open” |
| packshot w galerii | pierścień 88 px | „View” |
| karta produktu w lineup | pierścień z odczytem mocy produktu | np. „8 kW” (z danych) |
| climate range | ukryty pierścień, kropka → °C aktualnej pozycji przy przeciąganiu | z danych |
| link zewnętrzny / PDF | ikona ↗ / ⤓ | „Open” / „Download” |

### Implementacja
- Komponent `components/Cursor.tsx` (`'use client'`), montowany raz w layoutcie,
  dynamic import, tylko gdy `matchMedia('(pointer: fine)')` i brak reduced motion.
- Jeden `requestAnimationFrame`, transform `translate3d`, `will-change: transform`.
  Brak nasłuchu na każdym elemencie — delegacja `pointerover` po `data-cursor`.
- Etykiety przychodzą propsami z layoutu (global), nie z JSX.
- `aria-hidden="true"`, `pointer-events: none`. Nie wpływa na focus — fokus
  klawiatury ma własny, wyraźny `:focus-visible` ring 2 px `--heat-500` + offset.
- Wyłączany automatycznie: touch, reduced motion, okna < 1024 px, ustawienie
  w `siteSettings` (`enableCustomCursor` checkbox — klient może wyłączyć).

---

## 5. Wideo — standard

| Pozycja | Wymaganie |
|---|---|
| Hosting | R2 (media), nie YouTube (prywatność, brak cookies, brak brandingu) |
| Formaty | MP4 H.264 (fallback) + WebM VP9/AV1, 1920 px i 1080 px (`<source media>`) |
| Pętle | ≤ 12 s, ≤ 8 MB (1920), bez dźwięku, `muted playsinline loop` |
| Wideo z dźwiękiem (About, case study) | odtwarzane na klik, napisy `.vtt` (upload w media) obowiązkowe |
| Poster | zawsze, AVIF/WebP, jest LCP |
| Sterowanie | widoczny przycisk pauzy; pauza auto, gdy poza viewportem lub karta w tle |

---

## 6. Test akceptacyjny motion

- [ ] Strona w pełni czytelna z wyłączonym JS
- [ ] Reduced motion: zero scrub/pin/parallax, kursor systemowy
- [ ] Lighthouse mobile: LCP < 2.0 s, CLS < 0.05, TBT < 150 ms (Home)
- [ ] INP < 200 ms podczas przeciągania suwaka climate range
- [ ] 60 fps na exploded view (MacBook Air M1, iPhone 12) — Performance panel
- [ ] Kursor nie zasłania pól formularza; fokus klawiatury zawsze widoczny
- [ ] `npx impeccable detect` — 0 findings w kategorii Motion
