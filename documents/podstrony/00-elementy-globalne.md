# 00 — Elementy globalne: header, mega-menu, stopka, pasek mobilny, cookies, 404

Dane: globale `navigation`, `footer`, `siteSettings`, dane firmy, `siteIntegrations`.
Nic w kodzie poza strukturą i wyglądem.

---

## 1. Announcement bar (nad headerem)

- Źródło: `siteSettings.announcement` { enabled, text, link, expiresAt }.
  Po `expiresAt` znika sam (sprawdzane w RSC; strona ma ISR 3600, więc
  maksymalnie 1 h opóźnienia — akceptowalne).
- Przykład treści: „Off-gas homes (oil or LPG): Boiler Upgrade Scheme grant up to
  £9,000 until 31 March 2027. Check eligibility →”
- Tło `--ink-900`, tekst `small`, wysokość 40 px, zamykany (stan w
  `sessionStorage` — funkcjonalne, nie wymaga zgody; nie cookie).

## 2. Header + mega-menu (wzór: 1Password)

Desktop (≥ 1024 px), wysokość 72 px:

```
[Logo]   Heat pumps ▾   Homeowners ▾   Installers ▾   Support   About        [☎ number]  [Get a quote]
```

- Logo z `siteSettings.logoLight` / `logoDark` wg `tone` sekcji pod headerem.
- Telefon: `phoneRef = sales`, format `tel:` z globala, ikona + numer
  (ukryty < 1280 px, zostaje ikona).
- CTA „Get a quote” = primary heat, zawsze widoczny.

### Panel „Heat pumps” (mega)
Lewa kolumna 2/3: cztery karty Outback z packshotem (miniatura 160 px),
nazwą, `nominalOutputKw`, `typicalHomeFit`; piąta karta Wallaroo z plakietką
„Coming soon” (status z produktu). Prawa 1/3: linki „Compare all models”,
„Why R290”, „Download brochure” (plik z produktu) + mała karta „Not sure which
size? We size it for you during the free suitability check.” → Get a quote.

### Panel „Homeowners”
How it works · Boiler Upgrade Scheme · FAQ · Get a quote — każdy z jednym
zdaniem opisu (pole `description` w pozycji menu). Po prawej wyróżniony blok
z ostatnią opinią UK (relacja do testimonial).

### Panel „Installers”
Become an installer partner · Register a product · Manuals & spec sheets ·
Technical support (telefon support) · Wallaroo for installers.

### Struktura globalu `navigation`
```
items array {
  label(loc), type: select link | mega,
  link: linkField,
  columns array {
    heading(loc),
    links array { label(loc), description(loc), link: linkField, icon(select) },
    featuredProducts relationship → products hasMany,
    featuredTestimonial relationship → testimonials,
    promo group { heading(loc), body(loc), link: linkField, image }
  }
}
ctaLink linkField
showPhone checkbox
```
JSON-LD: `buildSiteNavigationJsonLd` z tych pozycji.

### Mobile (< 1024 px)
- Header 60 px: logo, ikona telefonu, hamburger.
- Menu pełnoekranowe (`--ink-950`), akordeony dla mega, focus trap, Esc zamyka,
  `aria-expanded`. Na dole menu: duży przycisk „Get a quote” + telefon.

### Zachowanie
Patrz `04` E9 — przezroczysty na hero, solidny po 24 px, hide-on-scroll-down.
Skip link „Skip to content” (etykieta z `uiLabels`) jako pierwszy element.

## 3. Pasek akcji mobile (sticky bottom)

Na stronach Persuade (Home, gama, produkt, BUS, How it works):
`[☎ Call]  [Get a quote]` — 64 px, pojawia się po przewinięciu hero, chowa się
nad stopką i gdy otwarty jest baner cookies (żeby nie nakładać warstw).
Safe-area inset dla iPhone.

## 4. Stopka (tło `--ink-950`)

```
┌────────────────────────────────────────────────────────────────────────┐
│ [Logo]  „Heat pumps designed in Australia, supported in the UK.”        │
│ ☎ sales  ☎ support  ✉ info@                                            │
├──────────────┬───────────────┬──────────────┬──────────────────────────┤
│ Heat pumps   │ Homeowners    │ Installers   │ Company                  │
│ Outback 5kW  │ How it works  │ Partner prog.│ About                    │
│ Outback 8kW  │ BUS grant     │ Register prod│ Contact                  │
│ Outback 11kW │ FAQ           │ Manuals      │ Customer T&C             │
│ Outback 16kW │ Get a quote   │ Tech support │ Privacy · Cookies        │
│ Wallaroo     │               │              │ Cookie settings (Cookie- │
│              │               │              │ Button z pluginu)        │
├──────────────┴───────────────┴──────────────┴──────────────────────────┤
│ [MCS logo + cert no.] [ErP A+++] [inne akredytacje — tylko potwierdzone]│
├────────────────────────────────────────────────────────────────────────┤
│ © {rok z serwera} Ecogenica Ltd · Registered in England & Wales         │
│ No. 15127696 · VAT 463 5080 95 · Registered office: …                   │
│ Warehouse & technical support: …                                        │
└────────────────────────────────────────────────────────────────────────┘
```
- Wszystkie dane z globala firmy, linki prawne przez `getSystemPagePath`.
- Rok copyright liczony w kodzie (`new Date().getFullYear()` — to nie treść
  klienta, tylko wartość systemowa), prefiks „©” i nazwa firmy z globala.
- Social linki — tylko jeśli klient poda (pole w footer).

## 5. Cookies (ipal-kit)

- `ConsentProvider` + `CookieBanner` + `CookieButton` w layoutcie, teksty
  z panelu (Cookie Settings). Banner jako karta w lewym dolnym rogu (desktop),
  dolny arkusz (mobile), „Reject all” i „Accept all” równorzędne wizualnie,
  „Manage” otwiera kategorie.
- Kategorie i realne skrypty: patrz `08-compliance-uk.md` §3.
- Banner nie może zasłaniać CTA w sposób blokujący — kolejność warstw:
  banner > pasek mobilny (pasek chowa się, gdy banner otwarty).

## 6. Strona 404 (`not-found.tsx`)

- Treść z panelu (wg playbooka): heading, body, link powrotu.
- Propozycja: tło `--ink-950`, wielki odczyt mono „404°C — that’s not a
  temperature we work in.” + linki: Heat pumps, Get a quote, Contact.
- Bez efektów, szybka. Wykluczona z sitemap (plugin robi to sam).

## 7. Formularz — wygląd globalny (builder pluginu)

- Etykiety zawsze nad polem (nie placeholder-only — Impeccable P0).
- Pola 48 px, promień 4, focus ring heat, błędy pod polem z ikoną + tekstem.
- Checkbox `consent` z tekstem z panelu i linkiem do polityki (getSystemPagePath).
- Turnstile w trybie managed/invisible.
- Stany: idle → submitting (przycisk z spinnerem, disabled) → success (panel
  z tekstem z Notifications) → error (komunikat + telefon jako alternatywa).
