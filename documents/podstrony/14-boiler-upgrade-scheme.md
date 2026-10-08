# 14 — Boiler Upgrade Scheme `/boiler-upgrade-scheme`

**Mode:** Read + Operate (checker) · **Cel SEO:** fraza „boiler upgrade scheme”,
„heat pump grant”; **cel biznesowy:** kwalifikowany lead do Get a quote.

**Stan prawny (do weryfikacji przy każdym `lastReviewed`):** BUS w Anglii
i Walii: £7,500 na ASHP; £9,000 dla domów off-gas (olej/LPG) od 21.07.2026 do
31.03.2027; wniosek składa instalator MCS; grant odejmowany od ceny.
Źródła do pól `source`: gov.uk/apply-boiler-upgrade-scheme, Energy Saving Trust.
**Kwoty tylko w polach `grantAmounts` — nigdy w treści na sztywno** (zmieniają się).

**SEO**
- title: `Boiler Upgrade Scheme 2026: Heat Pump Grant up to £9,000`
- description: `How the Boiler Upgrade Scheme works, who qualifies and how much you can get off an air source heat pump. Check your eligibility in a minute.`
- JSON-LD: Breadcrumb, FAQ.

## Sekcje

### 1. `heroSplit` (tone inside — strona „spokojna”)
- H1: **The Boiler Upgrade Scheme, explained.**
- Sub: `A government grant that takes money off the cost of a heat pump in England and Wales. Your installer applies for you.`
- Obok, karta z dwoma kwotami (z `grantAmounts`, data ważności widoczna):
  `£7,500` air source heat pump · `£9,000` off-gas homes until 31 March 2027.
  Liczby `data-xl`, z kontekstem w zdaniu (nie hero-metric).
- „Last checked: {lastReviewed}”.

### 2. `grantChecker` (pełny, 5–6 pytań)
Pytania (propozycja, klient + prawnik zatwierdzają):
1. Where is the property? England / Wales / Scotland / Northern Ireland
   (SC/NI → wynik „check”: inne programy, link zewn. do Home Energy Scotland / NI)
2. Do you own it? Owner-occupier / Private landlord / Social housing / Tenant
3. What heats it now? Gas / Oil or LPG / Electric / Already a heat pump
4. Is it a new build? Yes / No
5. Does it have a valid EPC? Yes / No / Not sure
6. Has it had a government-funded heat pump or biomass boiler before? Yes / No
Wyniki: eligible (+ kwota wg odpowiedzi 3) → `Get a free suitability check`;
check → kontakt; ineligible → uprzejme wyjaśnienie + alternatywy.
**Nie zapisujemy odpowiedzi** (brak danych osobowych; brak cookies).
Copy wyniku zawsze: „likely eligible — your installer confirms”.

### 3. Jak działa grant — `processSteps` (4 kroki)
Free check → Installer applies to Ofgem → Grant deducted from your quote →
Install and commission. Ilustracja: prosta oś, bez ikon w kafelkach.

### 4. `richTextSection` — szczegóły kwalifikacji (Read, szerokość narrow)
Nagłówki H2/H3, listy, linki do gov.uk. Tabela „What the grant covers”.

### 5. `mediaFeature` — „How Ecogenica handles it”
`We check eligibility before quoting and deduct the grant from your price, so you never pay it upfront.` (claim do potwierdzenia przez klienta)

### 6. `faq` (8–10 pytań: EPC, landlords, new builds, Scotland, kombinacja z innymi grantami, ile trwa, co jeśli odrzucą)

### 7. `ctaBand`

## Brief Impeccable → `bus-grant.md`
Mode: Read, with one Operate component (checker). Calm, high-legibility,
generous line height. The checker must feel like a form, not a game.
`/impeccable clarify the grant checker`, `harden` (zmiana kwot, brak
odpowiedzi, cofanie), `typeset the grant page`.
