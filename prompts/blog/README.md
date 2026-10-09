# Blog „Guides” — partia 1: 16 wpisów P1

Gotowe teksty (British English) wszystkich wpisów P1 z planu `13-blog.md`.
Każdy plik = jeden rekord w kolekcji `blogPosts`. Stan faktów: **9 października
2026**.

| Nr | Plik | Fraza główna | Kiedy |
|---|---|---|---|
| 4 | `04-off-gas-grid-heat-pump-grant.md` | off gas grid heat pump grant | przed startem |
| 7 | `07-heat-pump-running-costs-winter.md` | heat pump running costs winter | przed startem |
| 15 | `15-is-my-home-suitable-for-a-heat-pump.md` | is my home suitable for a heat pump | przed startem |
| 16 | `16-do-you-need-new-radiators-for-a-heat-pump.md` | do i need new radiators for a heat pump | przed startem |
| 26 | `26-heat-pump-noise.md` | heat pump noise | przed startem |
| 35 | `35-r290-vs-r32.md` | r290 vs r32 | przed startem |
| 27 | `27-heat-pump-defrost-mode.md` | heat pump defrost | do listopada (zima) |
| 46 | `46-outback-cold-weather-performance.md` | heat pump performance cold weather | do listopada (zima) |
| 1 | `01-whats-included-in-a-heat-pump-quote.md` | heat pump quote breakdown | miesiąc 1 |
| 8 | `08-best-electricity-tariffs-for-heat-pumps.md` | best electricity tariff for heat pump | miesiąc 1 |
| 9 | `09-heat-pump-settings-to-save-money.md` | heat pump settings | miesiąc 1 |
| 23 | `23-heat-pump-installation-day.md` | what happens during heat pump installation | miesiąc 1 |
| 24 | `24-heat-pump-planning-permission-rules.md` | heat pump planning permission | miesiąc 1 |
| 34 | `34-monobloc-vs-split-heat-pump.md` | monobloc vs split heat pump | miesiąc 2 |
| 40 | `40-lpg-vs-heat-pump.md` | lpg vs heat pump running costs | miesiąc 2 |
| 42 | `42-gas-boiler-ban-uk.md` | gas boiler ban | miesiąc 2 |

Razem ok. 12 tys. słów. Wpisy są zwięzłe (ok. 600–1 100 słów treści plus
Key takeaways i FAQ), krócej niż szacunki w planie. To celowe: odpowiedź
w pierwszym zdaniu, tabele zamiast lania wody. Rozbudowa ma sens dopiero
po danych z GSC (`13-blog.md` §5).

---

## Jak wgrać do Payload

Frontmatter → pola kolekcji `blogPosts` (`13-blog.md` §1):

| Frontmatter | Pole Payload |
|---|---|
| `title` | `meta.title` (≤ 55 znaków; plugin dokleja „\| Ecogenica”) |
| `h1` | `title` (wyświetlany H1) |
| `slug` | `slug` |
| `category` | `category` (relacja, slug kategorii) |
| `metaDescription` | `meta.description` |
| `excerpt` | `excerpt` |
| `author`, `reviewedBy` | relacje → `authors` (prawdziwe osoby!) |
| `timeSensitive`, `lastReviewedAt` | pola o tej samej nazwie |
| `keyTakeaways` | array `keyTakeaways` |
| `sources` | array `sources` |
| `relatedPosts` | relacje → `blogPosts` (dopiąć po publikacji wszystkich) |
| `moneyPage` | link w treści już jest; pole pomocnicze do `relatedGuides` na stronie sprzedażowej |
| `coverImage` | **opis zdjęcia do zrobienia/wyboru**, nie plik |
| `primaryKeyword`, `secondaryKeywords` | `primaryKeyword` (admin-only); wspierające tylko w CSV |

Treść (markdown) → bloki w `content`:

| W pliku | Blok |
|---|---|
| zwykły tekst, `##`, `###`, listy | `richTextSection` (Lexical) |
| tabela markdown + linia `*…*` pod nią | `dataTable` (caption = nagłówek sekcji, `source` = linia kursywą) |
| `> **[callout: info / warning / tip]** …` | `callout` z wariantem |
| `> **[inlineCta]** **Nagłówek** tekst → Etykieta (`/link`)` | `inlineCta` |
| `## Frequently asked questions` + `### pytania` | `faq` (`emitJsonLd: true`) |

Etykieta CTA „Get my price” jest zgodna z audytem (§13). Linki wewnętrzne
wpisywać jako relacje do stron/wpisów, nie jako tekst URL (zasada „nic na sztywno”).

---

## Przed publikacją — obowiązkowo

### 1. Placeholdery `[[DO POTWIERDZENIA: …]]` (71 w partii)
Nie publikować wpisu, w którym zostało choć jedno. Większość to:
- **autor i recenzent techniczny** (32×): prawdziwe osoby z zespołu UK,
- **URL-e do kart produktu i manuali** po wgraniu PDF do `media`,
- **dane z manuala Outback**: odstępy montażowe, czas defrostu, ilość R290,
  ochrona przed zamarzaniem, tryb cichy, funkcje aplikacji, krzywa pogodowa,
  cykl antylegionella,
- **dane firmowe**: cena od £3,500 (przed/po grancie), zakres „including
  radiators”, czas instalacji, ważność oferty, odliczanie grantu, rejestracja
  gwarancji,
- **hałas dB(A)**: czy to moc akustyczna (Lw), czy ciśnienie w danej
  odległości — bez tego wpis 26 jest niepełny,
- **cena LPG luzem** i koszt dzierżawy zbiornika (wpis 40) — nie znalazłem
  wiarygodnego, aktualnego źródła dla domów.

### 2. Fakty wymagające weryfikacji na gov.uk w dniu publikacji
- **Wpis 42 (gas boiler ban):** źródła wtórne różnią się co do daty Warm Homes
  Plan (styczeń vs marzec 2026). Future Homes Standard: publikacja 24.03.2026,
  wejście 24.03.2027 — zgodne w dwóch źródłach, potwierdzić na gov.uk.
- **Wpis 24 (planning):** warunki permitted development z przewodnika
  branżowego — potwierdzić na Planning Portal.
- **Wpis 35 (F-gas):** status GB z artykułu branżowego — potwierdzić na gov.uk.
- **Dane Outback** (wpisy 7, 9, 16, 26, 35, 46): z flyera PDF; klient potwierdza
  jedno źródło (karta MCS). Wiersz −2°C dla 8 kW w PDF ma przesunięte kolumny,
  więc go nie użyłem.

### 3. Linki do wpisów, których jeszcze nie ma (P2)
W treści są linki do 5 wpisów z partii P2. Albo opublikować je przed tymi
wpisami, albo czasowo usunąć link:

| Link | Używany we wpisach |
|---|---|
| `/guides/where-to-put-an-air-source-heat-pump` (nr 25) | 15, 26 |
| `/guides/cop-vs-scop` (nr 11) | 35, 46 |
| `/guides/is-r290-safe` (nr 36) | 35 |
| `/guides/leave-heat-pump-on-all-the-time` (nr 10) | 9 |
| `/guides/heat-pump-and-solar-panels` (nr 13) | 8 |

Rekomendacja: te 5 wpisów na początek partii 2.

---

## Liczby użyte we wpisach (jedno źródło prawdy)

| Dana | Wartość | Źródło (dostęp 09.10.2026) |
|---|---|---|
| Price cap prąd X–XII 2026 | 26.32p/kWh, 54.83p/dzień, bez VAT do 31.03.2027 | Ofgem |
| Price cap gaz X–XII 2026 | 7.97p/kWh, 29.68p/dzień, z 5% VAT | Ofgem |
| Typowe zużycie gazu (TDCV) | 9,500 kWh/rok (od 1.07.2026; wcześniej 11,500) | Ofgem |
| Olej opałowy, 1 000 l | 117.9p/l z VAT (8.10.2026) | PriceTank |
| BUS | £7,500; +£1,500 dla oil/LPG bez gazu do 31.03.2027; air-to-air £2,500 | GOV.UK, EST |
| BUS warunki | EPC ≤ 10 lat; bez wymogu izolacji; montaż ≤ 120 dni od wniosku; hybrydy wykluczone | GOV.UK, Vaillant |
| VAT na instalację ASHP (GB) | 0% do 31.03.2027, potem stawka obniżona | HMRC |
| Permitted development (Anglia) | od 29.05.2025: ≤ 1,5 m³, bez reguły 1 m, 37 dB (MCS 020) | przewodnik branżowy |
| Future Homes Standard | publ. 24.03.2026, obowiązuje od 24.03.2027 (nowe domy) | źródła wtórne |
| Przykładowy dom | 8 550 kWh ciepła/rok = 9 500 kWh gazu × 90% | wyliczenie |
| Energia w paliwie | olej ~10,35 kWh/l, LPG ~7,08 kWh/l | wartości przybliżone |

**Wpisy oznaczone `timeSensitive: true`** (4, 7, 8, 24, 26, 35, 40, 42, 1)
przeglądać co kwartał i przy każdej zmianie price cap (1.01.2027 następna).
