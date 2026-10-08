# 17 — Support `/support` i Manuals `/support/manuals`

**Mode:** Operate · Strona ma „zniknąć”: szybko do celu, zero efektów
poza stanami UI. Obecne `/warranty` i `/manuals` + martwy link menu
„SERVICE & SUPPORT” → jeden spójny hub.

---

## A. `/support`

**SEO**
- title: `Heat Pump Support, Warranty and Product Registration`
- description: `Register an Ecogenica heat pump, check warranty cover, make a claim or contact technical support.`

### 1. Hub — `heroSplit` (tone inside, bez obrazu) + 4 karty zadań
- H1: **How can we help?**
- Karty (linki-kotwice, układ 2×2, duże cele dotykowe):
  `Register a product` (#register) · `Warranty cover` (#warranty) ·
  `Make a claim` (#claim) · `Manuals & spec sheets` (/support/manuals)
- Pod kartami: telefon support + e-mail warranty@ + godziny (z globala).

### 2. `warrantyTiers` #warranty
| | Standard | Premium |
|---|---|---|
| Lata | 5 | 8 |
| Cena | included | £350 (płatne w 14 dni od commissioning) |
| Zakres | części wadliwe fabrycznie | j.w. |
Excludes (lista z CMS): ancillary items, incorrect installation, lack of servicing,
external damage. Note: roczny serwis wymagany, prowadź dziennik serwisu.
Wszystkie wartości z pól bloku (klient może zmienić cenę Premium bez dewelopera).

### 3. `richTextSection` — „What activates your warranty”
Lista 9 wymaganych zdjęć instalatora (z obecnej strony) jako numerowana lista
z miniaturami przykładowych dobrych zdjęć (do przygotowania przez klienta).

### 4. `formBlock` #register — Product registration (dla instalatora)
Pola (builder): Installer company · MCS number · Installer email ·
Homeowner name · Installation postcode · **Model (select: wszystkie 4 modele
+ Wallaroo — naprawiony brak 16kW)** · Serial number · Commissioning date ·
**9 zdjęć** (upload) · Proof of purchase (upload) · Premium warranty (checkbox
+ informacja o płatności) · consent. Turnstile.
> ⚠ **Upload plików w form builderze** — sprawdzić `docs/forms.md`. Jeśli plugin
> nie obsługuje pól typu file → **raport rozbudowy pluginu** (`06` §8),
> NIE własny formularz w JSX. Tymczasowo (do decyzji Michała): formularz bez
> uploadu + instrukcja wysłania zdjęć na warranty@.
Opcje modelu w select — z kolekcji products (jeśli builder pozwala na
dynamiczne opcje; jeśli nie → opcje w panelu formularza, ręcznie — też OK, bo
to treść w panelu).

### 5. `processSteps` #claim — Making a claim (3 kroki z obecnej strony)
+ `ctaBand` z telefonem support i e-mailem.

### 6. `faq` — warranty status, transfer przy sprzedaży domu, serwis.

---

## B. `/support/manuals`

**SEO**
- title: `Ecogenica Manuals and Spec Sheets`
- description: `Homeowner and installer manuals, brochures and spec sheets for the Outback range.`

### 1. `heroSplit` (bez obrazu) — H1: **Manuals and spec sheets.**
Pole filtra: przełącznik `Homeowner | Installer | All` (client, filtr po
`docTypes`; stan w hash URL `#installer` — nie query param, ISR zostaje).

### 2. `downloadsList` (source allProducts, groupBy product)
Każdy produkt: wiersz z packshotem 64 px, nazwą, i listą dokumentów
(typ, rozmiar, data, `Download`). Installer manual wspólny dla wszystkich
modeli → render raz w sekcji „All Outback models” (nie 4× ten sam plik).

### 3. `ctaBand` — „Can’t find a document?” + support.

Plik PDF-y: nazwy po `normalizeFilenameHook` (np. `outback-installers-manual.pdf`),
stare URL-e PDF → 301 (patrz `07`).

## Brief Impeccable → `support.md`, `manuals.md`
Mode: Operate. Calm, predictable, dense but legible. Task cards first.
`/impeccable quieter the support page`, `clarify the registration form`,
`harden the registration form` (duże pliki, słabe łącze na budowie, błędy uploadu).
