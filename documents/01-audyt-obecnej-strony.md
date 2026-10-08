# 01 — Audyt obecnej strony ecogenica.co.uk

Stan na 08.10.2026. Źródło: przejście wszystkich podstron + PDF-y produktowe
(Outback flyer, Wallaroo flyer). Ten plik to **inwentarz treści do migracji**
i lista problemów, które nowa strona MUSI naprawić.

---

## 1. Mapa obecnej strony

| URL | Co jest | Ocena |
|---|---|---|
| `/` | Hero z ofertą „from £3,500 (including radiators)”, lista USP, „Why Ecogenica”, proces 4 kroki, FAQ (5 pytań, odpowiedzi ukryte), opinie, CTA BUS | Treść OK, forma przeciętna, brak hierarchii |
| `/product` | Outback (4 modele, zakładki), specyfikacja tylko 5kW widoczna w HTML, Wallaroo „soon”, 6 benefitów | Najcenniejsze dane techniczne, schowane w zakładkach |
| `/about` | Overview, wideo `/ab-video.mp4`, Vision & Mission, 5 Core Values z ikonami PNG, opinie | Dobra historia, słaba forma |
| `/warranty` | Standard 5 lat, Premium +3 lata (£350), zakres, reklamacje, formularz rejestracji produktu | Treść instalatorska wymieszana z konsumencką |
| `/manuals` | Homeowner's manual ×4 + Installer's manual (ten sam plik ×4) | Tylko lista linków |
| `/homeowner-enquiry-form` | iframe `app.spruce.eco/ecogenica/embed` (Spruce — narzędzie wycen dla instalatorów) | Integracja do zachowania |
| `/enquire-now` | Formularz kontaktowy (pola renderowane JS), nagłówek „For more information please contact us today” | Do przebudowy |
| `/customer-terms-conditions` | Regulamin (literówki „ECOGENCIA”, link gwarancji do .com.au) | Treść prawna — po stronie klienta |
| `/privacy-policy` | UK GDPR notice, ICO, transfer do Eco Light Up (AU) przez IDTA, linki do 9 formularzy praw | Treść prawna — po stronie klienta |
| Menu „SERVICE & SUPPORT” | link `#` (martwy) | Błąd |
| GTM | `GTM-5T4VZP4R` ładowany bez zgody | **Naruszenie PECR/UK GDPR** |

---

## 2. Inwentarz treści do przeniesienia (fakty, nie copy)

### 2.1 Firma
- Ecogenica Ltd, Company No. **15127696**, VAT **463 5080 95**
- Siedziba rejestrowa (z PDF): 77 Mount Ephraim, Tunbridge Wells, Kent TN4 8BS
- Magazyn + Technical Support: Unit 4 Orton House Farm, Norton Lane, Little Orton, Atherstone, Leicestershire CV9 3NR
- E-maile: info@, sales@, warranty@, legal@ ecogenica.co.uk
- Telefony: **trzy różne** — +44 116 483 0473 (stopka), 07539 108 707 („Call 7 days a week”), +44 116 409 1869 (Outback PDF), 0808 273 5159 (Wallaroo PDF)
- Firma-matka w Australii, 100+ pracowników, własna fabryka; partner danych: Eco Light Up (AU)

### 2.2 Produkty — Outback (R290 monoblock DC inverter)

Zakres pracy −15°C…+40°C, GWP 3 (vs R32: 675), ErP A+++ @35°C / A++ @55°C,
Wi-Fi app, MCS certified, BUS eligible. Testy wg BS EN 14511.

| | 5 kW | 8 kW | 11 kW | 16 kW |
|---|---|---|---|---|
| Model | ECO-ZR02FC | ECO-ZR03FC | ECO-ZR04FC | ECO-ZR06FC |
| SCOP 35°C (MCS) | 4.98 | 4.80 | 4.54 | 5.22 |
| SCOP 55°C (MCS) | 3.77 | 3.63 | 3.49 | 3.79 |
| Moc grzewcza A7/W35 (kW) | 1.83–6.65 | 3.2–10.6 | 3.6–13.8 | 5.3–20.7 |
| Moc grzewcza A7/W55 (kW) | 1.75–5.87 | 2.8–8.68 | 3.7–11.7 | 4.6–17.5 |
| Max pobór (kW / A) | 2.8 / 13 | 4.6 / 20 | 5.75 / 25 | 8.9 / 13.5 |
| Zasilanie | 230V 1ph | 230V 1ph | 230V 1ph | 400V 3ph |
| Hałas dB(A) | 59.08 | 60.54 | 63.04 | 68.26 |
| Przepływ (L/min) | 20.0 | 28.3 | 34.0 | 51.0 |
| Wymiary L×W×H (mm) | 1045×400×805 | 1205×475×845 | 1205×475×1015 | 1205×475×1435 |
| Waga (kg) | 85 | 119 | 137 | 198 |

Pełna tabela COP/output dla temp. powietrza 7 / 2 / 0 / −2 / −7°C i zasilania
35/45/55/65°C jest w `Outback_Flyer_ProductPage.pdf` — **przenosimy ją do
CMS 1:1** (to paliwo dla interaktywnego wykresu, patrz `podstrony/12`).

> ⚠ Rozbieżność: strona `/product` dla 5kW podaje SCOP 4.91/3.69 i zakres
> 2.5–7.5 kW, PDF podaje 4.98/3.77 i 1.83–6.65 kW. W wierszu −2°C tabeli PDF
> (8kW, 45°C/55°C) kolumny są przesunięte (wartości „2.78 / 9.05”). **Klient musi
> potwierdzić jedno źródło prawdy (najlepiej karta MCS).**

Schemat Outback (16 części) z PDF: Front Panel, Fan, Fan Motor, Motor Bracket,
Top Cover Plate, PCB Housing Lid, Controller Assembly, LH Protective Panel
Condenser, Evaporator Assembly, Rear Panel, Four-Way Valve Assembly, Compressor,
Condenser Housing, Water Pump, Water Inlet, Water Outlet → **materiał na
scrollowany „exploded view”**.

### 2.3 Produkty — Wallaroo
Pierwsza zintegrowana pompa ciepła + cylinder montowana całkowicie na zewnątrz.
Brak specyfikacji publicznej. Status „soon to be launched”. Zestaw 5 grafik flyer.

### 2.4 Gwarancja i serwis
- Standard: 5 lat, części, aktywacja przez instalatora + 9 zdjęć
- Premium: +3 lata = 8 lat, £350, opłacenie w 14 dni od uruchomienia
- Coroczny serwis wymagany
- Cylindry: „up to 20 years” (wg /product)
- Formularz rejestracji: model (brak 16kW!), 4 zdjęcia, proof of purchase

### 2.5 Liczby „social proof” — sprzeczne
| Miejsce | Liczba |
|---|---|
| Home | 250,000+ installations supported |
| Home/About — opinie | 200,000+ satisfied customers |
| About + PDF | 350,000 installed |
| Home | 15+ years innovation |
| About | „over the last decade” |

> **Decyzja klienta wymagana:** jedna liczba, jedno źródło, data. Do tego czasu
> nowa strona pokazuje tylko liczbę potwierdzoną dokumentem.

### 2.6 Oferta
„Introductory offer from £3,500 (including radiators)” — **nie wiadomo, czy to
cena przed czy po grancie BUS (£7,500)**. Stan BUS na dziś: £7,500 dla ASHP
w Anglii i Walii; £9,000 dla domów off-gas (olej/LPG) od 21.07.2026 do
31.03.2027. Klient musi doprecyzować cenę i warunki.

### 2.7 Media do pozyskania / odzyskania
- `Logo-transparent.png`, `logo-hero.svg`, `residential-hot-water-hero.jpg`
- `product-group-units.jpg`, `/modals/final/ECO-ZR0xFC.jpg` (packshoty 4 modeli)
- `WallarooFlyer-product1…5.png`
- `ab-video.mp4` (About)
- Ikony wartości (PNG) — **do zastąpienia**, nie migrujemy
- PDF: flyer Outback, flyer Wallaroo, 4× homeowner manual, installer manual

---

## 3. Problemy do naprawy (priorytet)

### P0 — prawne / zaufanie
1. **GTM ładuje się bez zgody** → ConsentProvider z ipal-kit, analytics gated.
2. **Opinie są z Australii i dotyczą pomp do ciepłej wody (HWS)**, prezentowane
   na brytyjskiej stronie o pompach CO jako „Satisfied Customers”. Ryzyko
   wprowadzenia w błąd (UK: CAP Code / DMCC Act 2024 — zakaz mylących opinii).
   → Oznaczyć kraj + produkt albo zastąpić opiniami UK. Decyzja klienta + prawnik.
3. **Claimy bez źródła**: „Australia’s No.1”, „Best price guarantee”,
   „Unbeatable prices”, „Highest A+++”. W UK reklama musi mieć dowody (ASA).
   → Każdy claim w CMS ma pole `source` (wymagane do publikacji, patrz `05`).
4. Niespójne dane (liczby, telefony, SCOP, gwarancja 5 vs 8 lat).

### P1 — UX / konwersja
5. Dwie grupy odbiorców (właściciel domu vs instalator) wymieszane na każdej
   stronie. Instalator to realny klient (manuale instalatorskie, rejestracja
   gwarancji przez instalatora, „Win more jobs” w Wallaroo flyer).
6. Martwy link menu „SERVICE & SUPPORT”.
7. Specyfikacja ukryta w zakładkach — Google i porównanie modeli cierpią.
8. Formularz rejestracji produktu bez modelu 16kW.
9. Karuzela opinii zdublowana 3× w DOM (pętla bez końca).

### P2 — SEO / technika
10. Jeden H1 na stronę głównej to cały akapit ceny.
11. Brak per-model URL (Outback 8kW nie ma swojej strony).
12. PDF-y w nazwach z `[52]`, spacje, wersje w nazwie → złe URL-e.
13. Copyright 2025, „Updated Annually” itd. — treść nieaktualizowana.
