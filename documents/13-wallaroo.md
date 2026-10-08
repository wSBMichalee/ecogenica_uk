# 13 — Wallaroo `/heat-pumps/wallaroo` (coming soon)

**Mode:** Experience · **Źródło:** produkt `status = comingSoon` + bloki
w `layout` produktu. **Cel:** zebrać zgłoszenia zainteresowania (osobno
homeowner / installer) przed premierą.

**SEO**
- title: `Wallaroo: Outdoor Heat Pump and Hot Water Cylinder in One`
- description: `The Wallaroo puts the heat pump and hot water cylinder in one outdoor unit, so homes without cylinder space can switch. Register your interest.`

## Sekcje

### 1. Hero — pełnoekranowy, „reveal”
- Tło `--ink-950`. Jednostka Wallaroo (render z flyera) wyłania się z mroku:
  światło przesuwa się po obudowie w miarę scrollu (maska `clip-path` +
  `translateY` obrazu oświetlenia — transform only). To jedyna strona, gdzie
  dopuszczamy `/impeccable overdrive`.
- H1: **The Wallaroo. Everything outside.**
- Sub: `Heat pump and hot water cylinder in one outdoor unit. No cupboard to give up.`
- CTA: `Register interest`. Plakietka „Coming soon” statyczna, bez daty, dopóki klient jej nie poda.

### 2. Problem → rozwiązanie (`mediaFeature` ×2, przeciwległe)
- **Short on space?** `Many homes can’t fit a hot water cylinder indoors, which rules out a standard heat pump. The Wallaroo keeps it outside.` — zdjęcie: mała szafa w szeregowcu, ciasna.
- **Simpler installation.** `One unit, one location. Fewer components to fit inside the home.` — zdjęcie: instalator przy jednej jednostce.

### 3. `bentoFeatures` — 3 kafle z flyera: Save space · All outdoors · All-in-one
(dla instalatorów kafel 4: „Win jobs you’d otherwise turn down” — wg flyera).

### 4. Galeria flyera (`WallarooFlyer-product1…5`) jako poziomy scroller
sterowany przez użytkownika (scroll-snap, strzałki), kursor „Drag”.

### 5. `formBlock` — Register interest
Pola (builder): First name · Email · I am a (homeowner / installer) ·
Postcode (homeowner) / Company (installer) · consent · marketing opt-in
(osobny, nieobowiązkowy checkbox — PECR). Turnstile.

### 6. `faq` — „When will it launch?”, „Will it qualify for BUS?” (tylko z odpowiedzią klienta), „What sizes?”

## Brief Impeccable → `wallaroo.md`
Mode: Experience. The product leads, interface steps back. One dramatic
light-reveal moment, everything else calm. No invented specs or dates.
