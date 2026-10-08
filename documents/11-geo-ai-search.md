# 11 — GEO: widoczność w wyszukiwarkach AI

GEO (Generative Engine Optimization) = żeby ChatGPT Search, Perplexity,
Claude, Copilot i Google AI Overviews **znajdowały, rozumiały i cytowały**
Ecogenica przy pytaniach typu „best R290 heat pump UK”, „does an 8kW heat pump
work at −7°C”, „how much is the boiler upgrade scheme”.

Fundament jest już w planie (SSG/ISR = pełny HTML, structured data, sitemap).
Ten plik dokłada to, czego brakowało. Lista crawlerów AI zmienia się często —
przed wdrożeniem sprawdzić aktualne nazwy w dokumentacji dostawców.

---

## 1. Dostęp crawlerów AI

### robots.txt
Rozróżniamy boty **wyszukiwania/cytowania** (przynoszą ruch) od botów
**treningowych** (nie przynoszą ruchu). Rekomendacja: wyszukiwanie — allow;
trening — decyzja klienta (domyślnie allow, firma chce być „znana” modelom).

| Bot | Dostawca | Rola | Domyślnie |
|---|---|---|---|
| Googlebot | Google | wyszukiwarka + AI Overviews | allow |
| Bingbot | Microsoft | Bing + Copilot + **źródło dla ChatGPT Search** | allow |
| OAI-SearchBot, ChatGPT-User | OpenAI | wyszukiwanie / pobieranie na żądanie | allow |
| GPTBot | OpenAI | trening | decyzja klienta |
| Claude-SearchBot, Claude-User | Anthropic | wyszukiwanie / pobieranie na żądanie | allow |
| ClaudeBot | Anthropic | trening | decyzja klienta |
| PerplexityBot, Perplexity-User | Perplexity | indeks / pobieranie | allow |
| Google-Extended | Google | kontrola użycia w Gemini (nie wpływa na AI Overviews) | decyzja klienta |
| Applebot-Extended | Apple | trening | decyzja klienta |

Disallow dla wszystkich: `/its` (panel), `/api`.
Konfiguracja przez `robots` z `lib/content` — sprawdzić w `docs/seo.md`, czy
`buildRobots` przyjmuje reguły per user-agent. Jeśli nie → **raport do pluginu**
(uniwersalne: każdy projekt będzie tego potrzebował), nie ręczny `robots.ts`.

### htmlLimitedBots
Rozszerzyć regex w `next.config.ts` o boty AI (nie wykonują JS, muszą dostać
metadata w `<head>`):
```
/Googlebot|Google-InspectionTool|Storebot-Google|Bingbot|Yandex|DuckDuckBot|Baiduspider|Screaming Frog|AhrefsBot|SemrushBot|GPTBot|OAI-SearchBot|ChatGPT-User|ClaudeBot|Claude-SearchBot|Claude-User|PerplexityBot|Perplexity-User|Applebot/i
```
Zaproponować tę zmianę też jako domyślną w docs pluginu (`seo.md`).

### Cloudflare
Cloudflare domyślnie potrafi blokować boty AI („Block AI bots” / AI Crawl
Control). **Sprawdzić i ustawić zgodnie z tabelą wyżej**, inaczej robots.txt
nic nie da. Bot Fight Mode nie może blokować Bingbota ani OAI-SearchBota.

### Bing Webmaster Tools + IndexNow
ChatGPT Search opiera się m.in. na indeksie Bing. Zgłosić sitemapę w Bing
Webmaster Tools; IndexNow (ping po publikacji) — jeśli plugin ma, włączyć;
jeśli nie → raport (hook afterChange → IndexNow, uniwersalne).

### llms.txt
`docs/seo.md` pluginu wspomina `llms.txt` — włączyć. Treść generowana z panelu:
krótki opis firmy + lista kluczowych stron (gama, 4 produkty, BUS, FAQ,
installers, support) z jednozdaniowym opisem. Niski koszt, niepewny efekt —
traktować jako dodatek, nie filar.

---

## 2. Spójność encji (najważniejsze dla Ecogenica)

Modele AI łączą informacje o firmie z wielu źródeł. Sprzeczności = mniejsze
zaufanie i błędne odpowiedzi. Obecnie Ecogenica ma **4 numery telefonu,
2 adresy, 3 różne liczby instalacji** — to trzeba ujednolicić przed startem.

- **NAP** (nazwa, adres, telefon) identyczne: strona, Google Business Profile,
  Companies House, MCS directory, LinkedIn, katalogi instalatorów.
- **Organization JSON-LD** z `sameAs`: Companies House (15127696), rejestr MCS,
  LinkedIn, ecogenica.com.au (spółka-matka — `parentOrganization`), profil Google.
  Pola w globalu firmy (`sameAs` array) — raport do pluginu, jeśli
  `buildOrganizationJsonLd` ich nie przyjmuje.
- Jedna nazwa produktu wszędzie: „Ecogenica Outback 8kW (ECO-ZR03FC)”.

## 3. Treść, którą AI chętnie cytuje

Reguły pisania (dopisać do briefów Impeccable i do instrukcji dla redaktora):
- **Odpowiedź w pierwszym zdaniu sekcji.** Pytanie w H2, pod nim 1–2 zdania
  pełnej odpowiedzi z liczbą, potem rozwinięcie.
  Przykład: H2 „Does the Outback work at −7°C?” → „Yes. The Outback 8kW
  delivers 7.95 kW at −7°C outside air with 35°C flow (COP 2.88, tested to
  BS EN 14511).”
- **Liczby z kontekstem i źródłem** (warunki testu, data) — już wymuszone
  polem `claimSource`; dla GEO pokazywać źródło jawnie (`showSource = true`)
  przy kluczowych danych.
- **Tabele w HTML** (`<table>` z `<caption>`), nie obrazki i nie PDF-only.
  Specyfikacja i dane wydajności każdego modelu muszą być w HTML strony
  produktu (są — `podstrony/12` §4 i §6). Nie chować ich za JS-only zakładkami;
  `<details>` jest OK (treść w DOM).
- **Daty aktualności** widoczne: „Last updated” na produktach, BUS, FAQ
  (pole `updatedAt` z Payload + `dateModified` w JSON-LD).
- **Strony porównawcze i definicyjne** — modele AI często odpowiadają na
  „X vs Y”. Na MVP: sekcja „R290 vs R32” w FAQ + blok refrigerantCompare.
  Faza 2 (Guides): „Heat pump sizes explained”, „Running costs”, „Monobloc vs split”.
- **FAQ z prawdziwymi pytaniami** klientów (z rozmów sprzedaży, Spruce, Google
  „People also ask”), nie wymyślonymi.
- **Autorstwo/ekspertyza**: strony techniczne podpisane przez osobę z zespołu
  technicznego UK (imię, rola) — pole `reviewedBy` (relacja do prostego
  globala/array „experts” w siteSettings — nie nowa kolekcja, chyba że klient
  chce stron autorów).

## 4. Structured data — uzupełnienia pod GEO
Poza listą w `07` §4:
- Product: `additionalProperty` dla SCOP, mocy, hałasu, czynnika (AI czyta je wprost).
- FAQPage tylko z treścią widoczną na stronie.
- `dateModified` na wszystkich stronach treściowych.
- Organization: `parentOrganization`, `sameAs`, `contactPoint` per dział
  (sales / technical support / warranty — z `phones[].purpose`).

## 5. Sygnały zewnętrzne (poza kodem — zadania marketingowe)
AI cytuje to, co jest powtarzane przez wiarygodne źródła:
- Wpis w rejestrze MCS z poprawnym linkiem do strony.
- Google Business Profile (magazyn/biuro) z opiniami UK.
- Trustpilot lub Google reviews — prawdziwe opinie UK.
- Wzmianki w branżowych mediach (H&V News, Installer, Heat Pump Federation),
  listach „best heat pumps UK”, katalogach dostawców.
- Spójny profil LinkedIn firmy.

## 6. Pomiar
- GA4: segment ruchu z referrerów AI (chatgpt.com, perplexity.ai, copilot.microsoft.com,
  gemini.google.com, claude.ai) — raport kanału „AI Search”.
- Cloudflare: logi wizyt botów AI (czy w ogóle wchodzą, czy dostają 200).
- Co miesiąc ręczny test 15 promptów (lista w CMS lub arkuszu klienta), np.:
  „best R290 heat pump UK”, „Ecogenica Outback review”, „8kW heat pump
  performance at −7°C”, „boiler upgrade scheme 2026 amount”, „heat pump
  without cylinder space” — zapis: czy Ecogenica wymieniona, czy cytowana
  strona, czy dane poprawne.
- Google Search Console: wyświetlenia stron w AI Overviews (raportowane
  w Performance).

## 7. Checklist GEO
- [ ] robots.txt: boty wyszukiwania allow, trening wg decyzji klienta
- [ ] htmlLimitedBots rozszerzony o boty AI
- [ ] Cloudflare nie blokuje botów AI (sprawdzone w logach: 200)
- [ ] Bing Webmaster Tools + sitemap; IndexNow (plugin lub raport)
- [ ] llms.txt włączony
- [ ] NAP ujednolicone (strona + GBP + MCS + Companies House + LinkedIn)
- [ ] Organization z `sameAs`, `parentOrganization`, `contactPoint`
- [ ] Specyfikacje i dane wydajności jako tabele HTML na stronach produktów
- [ ] Answer-first w FAQ, BUS, produktach; daty aktualizacji widoczne
- [ ] Segment „AI Search” w GA4 + miesięczny test promptów
