# Ecogenica UK — plan nowej strony (Payload CMS + ipal-kit)

Plan przebudowy **ecogenica.co.uk** w nowoczesną stronę-wizytówkę producenta
pomp ciepła: Payload 3 + Next 16 + `@intecion/ipal-kit`, kierunek wizualny
inspirowany 1password.com, design prowadzony przez Impeccable (anti-slop),
motion i custom cursor tam, gdzie coś tłumaczą.

Przygotowane: 08.10.2026 · dla: Intecion Group (Michał Cukrowski)

---

## 1. Spis plików

| Plik | Zawartość |
|---|---|
| `01-audyt-obecnej-strony.md` | Inwentarz treści, dane produktów, sprzeczności, problemy P0–P2 |
| `02-architektura.md` | Stack, routing, byty danych (minimum + uzasadnienia), katalog bloków, struktura |
| `03-design-system-impeccable.md` | Lekcje z 1Password, koncepcja „Cold outside. Warm inside.”, PRODUCT.md, DESIGN.md seed, tryby, komendy Impeccable, lista zakazów |
| `04-motion-efekty.md` | Zasady ruchu, 10 efektów (E1–E10), custom cursor, wideo, testy |
| `05-bloki-cms.md` | Schematy pól każdego bloku, walidacje, `claimSource` |
| `06-integracje.md` | GA4, Meta, Spruce, Turnstile, e-mail, R2, opinie, **raporty rozbudowy pluginu** |
| `07-seo-migracja.md` | 301, mapa słów kluczowych, structured data, checklista techniczna |
| `08-compliance-uk.md` | UK GDPR / PECR / ASA / DMCC, cookies, rejestr claimów |
| `09-devops-deployment.md` | Środowiska, env, Coolify, bezpieczeństwo, CI, budżety, monitoring |
| `10-plan-wdrozenia-prompty.md` | 8 faz + gotowe polecenia dla Antigravity i Impeccable + testy |
| `11-geo-ai-search.md` | GEO: boty AI, robots/htmlLimitedBots/Cloudflare, Bing, llms.txt, spójność encji, treść cytowalna, pomiar |
| `podstrony/00-elementy-globalne.md` | Header, mega-menu, stopka, pasek mobilny, cookies, 404, formularze |
| `podstrony/10-home.md` | Strona główna — 12 sekcji |
| `podstrony/11-gama-outback.md` | `/heat-pumps` — gama, porównanie |
| `podstrony/12-produkt-szablon.md` | Szablon modelu (Outback 5/8/11/16) |
| `podstrony/13-wallaroo.md` | Wallaroo — coming soon |
| `podstrony/14-boiler-upgrade-scheme.md` | Przewodnik BUS + checker |
| `podstrony/15-how-it-works.md` | Proces instalacji |
| `podstrony/16-installers.md` | Program dla instalatorów (nowa grupa docelowa) |
| `podstrony/17-support-gwarancja-manuale.md` | Hub wsparcia, gwarancja, rejestracja, manuale |
| `podstrony/18-about.md` | O firmie |
| `podstrony/19-quote-contact-faq-legal.md` | Wycena (Spruce), kontakt, FAQ, strony prawne |

Kolejność czytania: 01 → 03 → 02 → podstrony → 04 → 05 → reszta.

## 2. Najważniejsze decyzje w skrócie
1. **Dwie grupy odbiorców od pierwszego ekranu** — Homeowners / Installers
   (odpowiednik Personal / Business z 1Password). Instalator dostaje własną
   stronę i hub dokumentów.
2. **Prawdziwe dane jako warstwa wizualna** — exploded view jednostki, suwak
   temperatury z wynikami testów BS EN 14511, lineup w realnej skali, GWP 3 vs 675.
3. **Kolor ma znaczenie**: Frost = zimno/powietrze zewnętrzne, Heat = ciepło
   i akcje. Strona przechodzi od ciemnej „zimy” do jasnego „wnętrza”.
4. **Minimum bytów**: rdzeń + `products` (z trasami) + `testimonials`
   (bez tras) + `redirects`. Manuale z `products.documents`, FAQ jako blok.
5. **Wszystko przez panel**, łącznie z kwotami grantu (z datą weryfikacji),
   etykietami kursora i źródłami claimów.
6. **Braki w pluginie → raporty**, nie łaty (Product JSON-LD, upload w
   formularzu, consent embed, announcement expiry, trackEvent).

## 3. Założenia i zastrzeżenia
- **Plik PDF ze stylem nie dotarł** — w załącznikach były tylko .md i .txt.
  Tokeny w `03` §4 są startowe; po otrzymaniu PDF/brandbooka nadpisze je
  `/impeccable document`.
- Załączone `polityka-prywatnosci.txt`, `polityka-plikow-cookies.txt`,
  `warunki-korzystania-ze-strony-internetowej.txt` dotyczą **The Clean Team
  (Opole, prawo PL)** — nie pasują do Ecogenica Ltd (UK). Wykorzystana tylko
  ich struktura i lista cookies systemu (patrz `08`).
- Copy w plikach podstron to **propozycje w British English** do akceptacji
  klienta. Liczby wyłącznie z potwierdzonych źródeł.
- Kwoty BUS aktualne na październik 2026 (£7,500; £9,000 off-gas do 31.03.2027)
  — w CMS z polem `lastReviewed`.

## 4. Pytania do klienta (blokują treść, nie kod)
1. Jedna liczba instalacji (200k / 250k / 350k?) + źródło + data.
2. Telefony: który sprzedaż, który wsparcie (4 różne numery w obiegu).
3. „From £3,500 including radiators” — przed czy po grancie? Warunki, termin.
4. SCOP i zakresy mocy 5 kW — strona vs PDF; prośba o certyfikaty MCS (numery).
5. Opinie UK — czy są? Jeśli nie: zgoda na oznaczone opinie AU czy ukrywamy sekcję.
6. Dowód „Australia’s No.1” i warunki „Best price guarantee” — albo usuwamy.
7. Czas instalacji, finansowanie (tak/nie), godziny „7 days”.
8. Materiały: rendery 3D / CAD Outback (exploded view), zdjęcia aplikacji,
   zdjęcia UK (instalacje, magazyn, zespół), logo w wektorze, brandbook.
9. Spruce: lista cookies w embedzie, `postMessage`, parametry (model, UTM).
10. Program partnerski dla instalatorów — warunki, czy jest szkolenie.
11. Wallaroo — przybliżony termin i czy będzie BUS-eligible.
12. Aktualizacja polityki prywatności i nowa polityka cookies (prawnik klienta).

## 5. Lista ujęć do sesji (zbiorczo)
- Wideo hero: zimowy ogród, szron na wymienniku, odszranianie, para z
  wentylatora, przejście do ciepłego wnętrza (16:9 + 9:16).
- Packshoty 4 modeli (front 3/4, profil, tył z przyłączami, tabliczka)
  + grupowy; cylinder i akcesoria.
- Instalacje UK: dom z cegły z jednostką, instalator przy przyłączach,
  ankieter z miernikiem, uruchomienie z aplikacją.
- Magazyn Atherstone, zespół techniczny, fabryka AU.
- Time-lapse jednej instalacji (90 s) z napisami.
