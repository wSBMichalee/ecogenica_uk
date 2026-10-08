# 19 — Get a quote, Contact, FAQ, strony prawne

---

## A. Get a quote `/get-a-quote`

**Mode:** Operate · **Integracja:** Spruce (`app.spruce.eco/ecogenica/embed`)
— narzędzie wycen/estymacji używane przez instalatorów UK. Zachowujemy.

**SEO:** title `Get a Heat Pump Quote | Free Suitability Check` · desc o wycenie
i grancie. Strona indeksowana (to cel konwersji), ale iframe nie jest treścią
dla Google → nad iframe musi być realny tekst.

### Sekcje
1. `heroSplit` (bez obrazu, tone inside) — H1: **Get your free suitability check.**
   Sub: `Answer a few questions about your home. You’ll get an estimate, with the Boiler Upgrade Scheme taken into account.`
   Pod spodem 3 punkty „What happens next” (krótko, z CMS) + czas odpowiedzi.
2. `quoteEmbed`:
   - iframe ładowany **dopiero po zgodzie** w kategorii wybranej w bloku
     (Spruce może ustawiać własne cookies/analitykę — zweryfikować u Spruce
     i w Network; kategoria wynika z faktycznych cookies, patrz `08`).
   - Bez zgody: karta `fallbackBody` + przycisk „Load the quote tool” (otwiera
     ustawienia zgody dla tej kategorii) + alternatywa: telefon + link do Contact.
   - Wysokość: `embedHeightPx` lub auto-resize przez `postMessage`, jeśli Spruce
     je wysyła (sprawdzić; nie zgadywać).
   - `title` iframe z CMS (a11y).
   - Analityka konwersji: zdarzenie GA4 `generate_lead` tylko jeśli Spruce
     wysyła `postMessage` o ukończeniu — inaczej konwersja mierzona po stronie
     Spruce/CRM.
3. Pasek zaufania `trustStrip` (MCS, BUS) + mały `testimonials` (1 opinia).
4. `faq` (3 pytania: ile kosztuje wycena — nic; czy zobowiązuje — nie; co z danymi — link polityka).

---

## B. Contact `/contact`

**Mode:** Operate.

1. `heroSplit` (bez obrazu) — H1: **Talk to us.**
2. `contactCards` (dane z globala firmy, routing wg intencji):
   - **Homeowners** — sales phone, info@, godziny „7 days” (od klienta).
   - **Installers & technical support** — support phone, godziny.
   - **Warranty** — warranty@.
   - **Data protection** — legal@ (wymóg UK GDPR notice).
3. `formBlock` — General enquiry: Name · Email · Phone (opt) · I am a
   (homeowner / installer / other) · Postcode (opt) · Message · consent ·
   marketing opt-in (osobno). Turnstile. Komunikaty z Notifications.
4. `mapLocations` — dwie lokalizacje (Registered office Tunbridge Wells,
   Warehouse Atherstone) — **statyczny obraz mapy domyślnie**, interaktywna
   mapa dopiero po zgodzie (Google Maps ustawia cookies). Link „Open in Maps”.
5. JSON-LD: Organization (z adresami) — `buildLocalBusinessJsonLd` **tylko**
   jeśli magazyn obsługuje klientów na miejscu (decyzja klienta); inaczej sam
   Organization.

---

## C. FAQ `/faq`

**Mode:** Read. Page z kilkoma blokami `faq` pogrupowanymi:
Heat pumps & performance · Grant & costs · Installation · Warranty & servicing ·
For installers. Na górze: pole wyszukiwania po pytaniach (client, filtr na
stronie, bez nowego endpointu). Nawigacja kotwicami po grupach (sticky na desktop).
`buildFaqJsonLd` — **jeden** zestaw JSON-LD na stronę (scalony z bloków) —
sprawdzić w docs, czy plugin scala; jeśli nie, `emitJsonLd` tylko na jednym
bloku lub raport do pluginu.

---

## D. Strony prawne (System Pages)

| Rola | Slug (propozycja) | Uwagi |
|---|---|---|
| privacyPolicy | `/privacy-policy` | treść klienta (obecna UK GDPR notice + aktualizacja), noindex |
| cookiePolicy | `/cookie-policy` | **nowa** — lista cookies wg `08` §3, noindex |
| termsOfService | `/terms` (Customer Terms & Conditions) | treść klienta, poprawić literówki „ECOGENCIA” i link .com.au, noindex |

- Strony z bloku `richTextSection` (width narrow), mode Read, bez efektów.
- `buildPreventDeleteSystemPage` + `buildValidateUniqueRole`.
- Formularze praw (9 linków w obecnej polityce prowadzi do nieistniejących
  stron WordPress) → zastąpić **jednym** formularzem „Data protection request”
  (builder: typ żądania select, imię, e-mail, opis, consent) albo adresem
  legal@ — decyzja klienta/prawnika.

## Brief Impeccable → `quote.md`, `contact.md`, `faq.md`, `legal.md`
Operate/Read. Nothing animated except state changes. `/impeccable clarify`,
`harden` (iframe blocked, form errors), `typeset the legal pages`.
