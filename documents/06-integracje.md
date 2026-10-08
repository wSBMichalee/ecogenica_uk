# 06 — Integracje

Zasada: **wszystko, co ipal-kit ma — przez ipal-kit**. Klucze/ID w
`siteIntegrations` (panel, admin-only, maskowane) lub `.env` (infrastruktura).
Każdy skrypt zewnętrzny za ConsentProvider w kategorii wynikającej z jego
faktycznych cookies.

| # | Integracja | Status na starej stronie | Gdzie konfiguracja | Zgoda | Plugin? |
|---|---|---|---|---|---|
| 1 | Google Tag Manager / GA4 | GTM-5T4VZP4R, bez zgody | `siteIntegrations` | analytics | ✓ `Analytics` z pluginu |
| 2 | Meta Pixel (jest weryfikacja domeny FB) | weryfikacja meta tag | `siteIntegrations` + meta tag weryfikacyjny w `siteSettings` (SEO) | marketing | sprawdzić w docs; jeśli brak → raport |
| 3 | Google Search Console | meta verification | `siteSettings` / metadata | — | ✓ metadata |
| 4 | Spruce (quote tool) | iframe | `siteIntegrations.spruceEmbedUrl` | functional/marketing — wg audytu cookies Spruce | blok `quoteEmbed` → kandydat do pluginu (§8) |
| 5 | Turnstile | brak | `siteIntegrations` | necessary | ✓ |
| 6 | E-mail (Graph/SMTP) | ? | `.env` (GRAPH_*) / panel SMTP | — | ✓ `mailAdapter()` |
| 7 | Cloudflare R2 | brak | `.env` (R2_*) | — | ✓ `buildR2Storage` |
| 8 | Google reviews (rating) | obrazek SVG | Places API key w `.env`, place ID w `siteIntegrations`; cache 24 h server-side | brak (render server-side, bez skryptu Google w przeglądarce) | → raport (uniwersalne: „ReviewsRating” helper) |
| 9 | Mapy | brak | statyczny obraz w media; interaktywna za zgodą | marketing/functional | blok projektu |
| 10 | CRM / Spruce lead handoff | brak | — | — | faza 2 (webhook z form-submissions → CRM klienta, gdy klient wskaże system) |
| 11 | MCS register (weryfikacja) | brak | link w `trustStrip` | — | — |

---

## Szczegóły

### GA4 / GTM
- Rekomendacja: **GA4 bezpośrednio przez komponent pluginu**, nie GTM
  (GTM łatwo „przemyca” tagi bez zgody i bez aktualizacji polityki cookies).
  Jeśli klient wymaga GTM — Consent Mode v2 + konfiguracja tagów w GTM pod
  kategorie (dokumentacja dla klienta w README przekazania).
- Zdarzenia: `generate_lead` (submit formularzy), `file_download` (PDF),
  `click_phone`, `grant_checker_result` (wynik, bez danych osobowych),
  `climate_range_interaction` (model, temp — anonimowe).
  Implementacja: jeden helper `trackEvent` w projekcie **tylko jeśli** plugin
  nie ma API zdarzeń — sprawdzić docs; jeśli nie ma → raport do pluginu
  (uniwersalne).

### Spruce
- Przed wdrożeniem: zapytać Spruce o (a) listę cookies/trackerów w embedzie,
  (b) `postMessage` (resize, completed), (c) czy przyjmuje parametr modelu
  i UTM. Odpowiedzi → konfiguracja bloku i kategoria zgody.
- CSP: `frame-src https://app.spruce.eco` (+ ewentualne domeny zasobów).
- Bezpieczeństwo: `sandbox="allow-scripts allow-forms allow-same-origin allow-popups"`
  — testować, czy formularz Spruce działa; `referrerpolicy="strict-origin-when-cross-origin"`.

### E-mail
- Formularze: kontakt → info@, partner → sales@, rejestracja → warranty@,
  data request → legal@ — adresy w konfiguracji formularzy w panelu.
- Transport: jeśli domena na M365 → Graph (pułapki z playbooka: from = GRAPH_SENDER,
  klient w replyTo, admin consent).

---

## §8 — Raporty rozbudowy pluginu (procedura z `agents.md` §8)

Antigravity NIE łata tych rzeczy w projekcie. Przygotowuje raport wg wzoru:

```markdown
### [PLUGIN] buildProductJsonLd
Problem: Projekty z katalogiem produktów (Ecogenica, RCustomCars) potrzebują
schema.org Product/Offer. Plugin ma Organization/WebSite/LocalBusiness/
Breadcrumb/Service/FAQ/Article, nie ma Product.
Propozycja API:
  buildProductJsonLd({ name, description, image: Media | string, sku?, mpn?,
    brand: string, url, additionalProperty?: { name: string; value: string|number; unitText?: string }[],
    offer?: { price: number; priceCurrency: string; availability: 'InStock'|'PreOrder'|'OutOfStock' } })
  + buildItemListJsonLd({ items: { url: string; name: string; position: number }[] })
Uniwersalność: każdy sklep/katalog/portfolio produktów.
```

Lista raportów dla tego projektu:
1. **buildProductJsonLd + buildItemListJsonLd** (jak wyżej).
2. **Pole `upload` w form builderze** (rejestracja produktu: 9 zdjęć + proof
   of purchase) z limitem rozmiaru, typów MIME, zapisem do R2, linkami
   w powiadomieniu e-mail — jeśli `forms.md` tego nie ma.
3. **ConsentGatedEmbed** — komponent iframe ładowany po zgodzie z kategorią,
   fallbackiem i obsługą `postMessage` resize (Spruce, mapy, YouTube —
   uniwersalne).
4. **Announcement bar z `expiresAt`** w siteSettings (uniwersalne dla
   promocji/terminów).
5. **API zdarzeń analitycznych** `trackEvent(name, params)` respektujące zgodę.
6. **Reviews rating** (Google Places server-side z cache) — opcjonalnie.
7. **Scalanie FAQ JSON-LD** z wielu bloków na stronie (jeśli brak).

Do czasu publikacji rozszerzeń: funkcja jest wyłączona lub zastąpiona treścią
z panelu (np. Product JSON-LD pominięty), **nie** zastępowana łatą w projekcie.
Wyjątek wymaga świadomej decyzji Michała (zapisanej w `agents.md` projektu).
