# 08 — Compliance (UK)

Granica z `wymagania_prawne.md`: **my dostarczamy mechanizm, treść prawną
dostarcza klient / jego prawnik.** Nie jesteśmy kancelarią — poniżej lista
wymagań technicznych i rzeczy, które klient musi potwierdzić.

> **Uwaga do załączników:** `polityka-prywatnosci.txt`, `polityka-plikow-cookies.txt`
> i `warunki-korzystania-ze-strony-internetowej.txt` dotyczą **The Clean Team
> (VAN STEV Sp. z o.o., Opole)** i prawa polskiego (RODO/UODO). Nie nadają się
> dla Ecogenica Ltd (UK GDPR, ICO, PECR). Wykorzystuję z nich wyłącznie
> **strukturę i listę cookies systemu ipal-kit** (`ipal-locale`, `payload-token`),
> która jest wspólna dla wszystkich naszych wdrożeń.

---

## 1. Ramy prawne (dla kontekstu, nie porada prawna)
- **UK GDPR + Data Protection Act 2018** — polityka prywatności, prawa osób,
  transfer do Australii (Eco Light Up, IDTA — już w obecnej polityce).
- **PECR** — zgoda na cookies nie-niezbędne i na marketing e-mail/SMS
  (soft opt-in ograniczony).
- **CAP Code / ASA** — reklama musi mieć dowody (claimy „No.1”, „best price”,
  „highest A+++”, liczby instalacji, oszczędności).
- **DMCC Act 2024** (nieuczciwe praktyki, w tym fałszywe/mylące opinie) — opinie
  muszą być prawdziwe i nie wprowadzać w błąd co do kontekstu.
- **Consumer Contracts Regulations** — jeśli sprzedaż/umowa na odległość
  (prawdopodobnie przez instalatora — do ustalenia).
- **MCS / BUS** — zasady komunikowania grantu (nie obiecywać przyznania).

## 2. Polityki — co klient musi dostarczyć
| Dokument | Stan | Do zrobienia przez klienta/prawnika |
|---|---|---|
| Privacy notice | jest (02.2025, „Updated Annually” — nieaktualizowana) | aktualizacja: nowe formularze (partner, rejestracja, Wallaroo interest), Spruce jako odbiorca/procesor, R2/Cloudflare, Turnstile, Google Analytics, Meta; usunąć 9 martwych linków |
| Cookie policy | **brak** | nowa — lista z §3 |
| Customer T&C | jest, z literówkami i linkiem do .com.au | korekta |
| Website terms of use | brak | opcjonalnie |
| Warranty terms | na stronie /warranty | potwierdzić 5/8 lat, £350, cylindry 20 lat |

## 3. Cookies i skrypty — inwentarz (do weryfikacji w Network po wdrożeniu)

| Nazwa | Dostawca | Kategoria | Okres | Uwagi |
|---|---|---|---|---|
| `ipal-locale` | ipal-kit | necessary/functional | sesja | przy jednym języku może nie być ustawiany — sprawdzić |
| `payload-token` | Payload | necessary | 2 h | tylko zalogowani w panelu |
| (cookie zgody pluginu) | ipal-kit | necessary | wg pluginu | nazwę i okres wziąć z `consent.md` |
| Turnstile | Cloudflare | necessary | wg Cloudflare | ochrona formularzy |
| `__cf_bm` itp. | Cloudflare (CDN/bot) | necessary | 30 min | jeśli Cloudflare proxy |
| `_ga`, `_ga_<id>` | Google Analytics 4 | analytics | do 2 lat (przeglądarki ograniczają ~400 dni) | tylko po zgodzie |
| `_fbp` | Meta Pixel | marketing | 90 dni | tylko po zgodzie, jeśli wdrożony |
| cookies Spruce | Spruce | do ustalenia | — | iframe ładowany po zgodzie |
| Google Maps | Google | marketing/functional | — | tylko interaktywna mapa po zgodzie |

Teksty banera i kategorii — w panelu (Cookie Settings). Test z
`wymagania_prawne.md` §5 (Network przed akceptacją = zero GA/Meta/Spruce).

## 4. Formularze
- Checkbox `consent` (required, server-side enforcement pluginu) z linkiem do
  privacy policy (`getSystemPagePath`).
- **Osobny, nieobowiązkowy** checkbox zgody marketingowej (PECR) — nie łączyć
  z consent na przetwarzanie zapytania.
- Minimalizacja danych: bez daty urodzenia, bez numeru telefonu jako wymaganego
  (poza callback).
- Retencja submissions w Payload — klient określa okres; zadanie cron
  czyszczące stare submissions → **raport do pluginu**, jeśli brak.
- Uploady zdjęć z rejestracji (mogą zawierać dom/adres) — prywatny bucket/ACL,
  nie publiczny R2 URL.

## 5. Claimy marketingowe — rejestr dowodów
Każdy blok z liczbą lub superlatywem ma `claimSource` (patrz `05`). Do
uzupełnienia przez klienta przed publikacją:

| Claim (obecna strona) | Status | Akcja |
|---|---|---|
| „Australia’s No.1 heat pump manufacturer” | brak źródła | dowód albo usunąć |
| 200k / 250k / 350k | sprzeczne | jedna liczba + źródło + data |
| „Best price guarantee”, „Unbeatable prices” | brak warunków | warunki gwarancji ceny albo usunąć |
| „Highest A+++ energy saving” | A+++ to klasa ErP @35°C | „ErP A+++ at 35°C flow” |
| „from £3,500 including radiators” | niejasne vs BUS | pełne warunki oferty, data końca |
| „15+ years” vs „last decade” | sprzeczne | jedna wersja |
| opinie AU o HWS | kontekst mylący | oznaczyć kraj/produkt albo zastąpić UK |
| SCOP 4.91 vs 4.98 (5 kW) | sprzeczne | wartości z certyfikatu MCS |

## 6. Dostępność
WCAG 2.2 AA jako standard jakości (nie wymóg prawny dla tej firmy, ale
grupa 55+). Widget dostępności (ipal-kit) — **nie dodajemy** domyślnie
(zgodnie z `agents.md` 6b); tylko na życzenie klienta.

## 7. Checklist przed produkcją
- [ ] Polityki od klienta wgrane, role System Pages przypisane, noindex
- [ ] Network: przed zgodą brak GA/Meta/Spruce/Maps
- [ ] „Reject all” = „Accept all” wizualnie; CookieButton w stopce
- [ ] Wycofanie zgody usuwa cookies (cookieMap)
- [ ] Wszystkie formularze: consent required + osobny marketing opt-in
- [ ] Rejestr claimów: każdy claim ma `claimSource`
- [ ] Opinie: `country`, `verifiedAt`, `consentOnFile` uzupełnione
- [ ] Dane administratora (Ecogenica Ltd, nr, adres rejestrowy) w globalu i stopce
