# Wymagania prawne — polityki, regulaminy, baner cookies

Każda strona kliencka (zwłaszcza w PL/EU) MUSI spełniać wymagania prawne:
dokumenty polityk, zgoda na cookies, RODO. To nie jest opcja ani „miłe dodatki"
— brak tego naraża klienta na kary (RODO: do 20 mln € / 4% obrotu). Ten dokument
mówi, CO strona musi mieć i JAK to zrealizować narzędziami ipal-kit.

> **Granica odpowiedzialności:** dostarczamy MECHANIZM (strony systemowe, baner
> zgody, enforcement RODO w formularzach). TREŚĆ prawną (tekst polityki,
> regulaminu) tworzy klient albo jego prawnik. Nie jesteśmy kancelarią — nie
> piszemy treści prawnych ani nie doradzamy prawnie. Nasza rola: zapewnić, że
> strona ma gdzie tę treść umieścić i że mechanizmy (cookies, zgody) działają
> zgodnie z wymogami technicznymi.

---

## CO KAŻDA STRONA MUSI MIEĆ (checklist compliance)

- [ ] **Polityka prywatności** (RODO/GDPR) — jak przetwarzane są dane osobowe
- [ ] **Polityka cookies** — jakie cookies, po co, jak zarządzać
- [ ] **Baner zgody na cookies** — przed ustawieniem cookies nie-niezbędnych
- [ ] **Regulamin** — jeśli strona świadczy usługi / sprzedaż / konta
- [ ] **Zgoda RODO w formularzach** — checkbox przy zbieraniu danych osobowych
- [ ] **Link do polityki** w banerze cookies i przy formularzach
- [ ] **Dane administratora danych** — kto przetwarza (dane firmy)

Wszystkie te elementy ipal-kit wspiera technicznie. Poniżej — jak.

---

## 1. STRONY POLITYK — System Pages

Plugin ma wbudowany mechanizm **stron systemowych** o zdefiniowanych rolach:

```ts
type SystemPageRole = 'homepage' | 'privacyPolicy' | 'cookiePolicy' | 'termsOfService'
```

### Jak to działa

1. **Redaktor tworzy strony** w kolekcji Pages (treść z bloków, per język).
2. **Przypisuje rolę** w panelu: Site Settings → System Pages → wskazuje, która
   strona jest polityką prywatności, która regulaminem itd.
3. **Kod linkuje przez rolę**, nie przez slug — `getSystemPagePath`:

```ts
import { getSystemPagePath } from '@intecion/ipal-kit'

// link do polityki prywatności (locale-aware, z bazy):
const privacyHref = getSystemPagePath({
  page: settings.privacyPolicy, locale, config: i18nConfig,
})
// → '/pl/polityka-prywatnosci' albo '/en/privacy-policy'
```

**Dlaczego role, nie slug:** klient może zmienić slug polityki („polityka" →
„polityka-prywatnosci"), a linki dalej działają — bo wskazują na ROLĘ, nie na
zaszyty adres. Zero hardkodu (patrz [architektura-tresci.md](./architektura-tresci.md)).

### Treść polityk — z bloków, edytowalna

Strony polityk to **normalne strony z bloków** — redaktor (albo prawnik klienta)
wpisuje treść przez panel, per język. NIE zaszywaj treści polityki w kodzie.
Klient musi móc ją zaktualizować (zmiana przepisów, nowy podmiot przetwarzający)
bez developera.

---

## 2. BANER COOKIES — zgoda przed ustawieniem

RODO + ePrivacy: cookies nie-niezbędne (analytics, marketing) wymagają **zgody
PRZED ustawieniem**. Nie „baner informacyjny" — realna zgoda, z możliwością
odmowy równie łatwej jak akceptacji.

### Co plugin daje

- **CookieBanner** — baner zgody (4 kategorie: necessary / functional /
  analytics / marketing)
- **CookieButton** — przycisk ponownego otwarcia ustawień (wymóg: zgodę można
  wycofać tak łatwo, jak udzielić)
- **ConsentProvider** — kontekst zgody, gating skryptów
- **Enforcement** — analytics/marketing ładują się TYLKO po zgodzie

```tsx
// layout.tsx — baner + provider (patrz consent.md, getting-started.md §10)
<ConsentProvider texts={texts}>
  {children}
  <CookieBanner />       {/* zgoda przy pierwszej wizycie */}
  <CookieButton />       {/* ponowne otwarcie ustawień */}
  <Analytics {...analytics} />   {/* ładuje się TYLKO za zgodą */}
</ConsentProvider>
```

### Wymogi prawne, które plugin realizuje

| Wymóg RODO/ePrivacy | Jak plugin realizuje |
|---|---|
| Zgoda PRZED cookies nie-niezbędnymi | analytics/marketing gated przez ConsentProvider |
| Odmowa równie łatwa jak zgoda | baner ma „Odrzuć" na równi z „Akceptuj" |
| Granularność (per kategoria) | 4 osobne kategorie do wyboru |
| Wycofanie zgody | CookieButton otwiera ustawienia ponownie |
| Sprzątanie po wycofaniu | cookies usuwane po cofnięciu zgody (cookieMap) |
| Link do polityki cookies | baner linkuje do strony cookiePolicy |

Teksty banera — z panelu (Cookie Settings), per język. Szczegóły:
[consent.md](./consent.md).

### Kategorie cookies (co znaczą)

- **necessary** — niezbędne (sesja, bezpieczeństwo). Bez zgody, zawsze aktywne.
- **functional** — funkcjonalne (np. wybór języka `NEXT_LOCALE`). Za zgodą.
- **analytics** — statystyki (GA4). Za zgodą.
- **marketing** — reklamowe/remarketing. Za zgodą.

Necessary nie wymaga zgody (są konieczne do działania). Reszta — tylko po
akceptacji danej kategorii.

---

## 3. ZGODA RODO W FORMULARZACH

Zbieranie danych osobowych (formularz kontaktowy) wymaga **zgody na przetwarzanie**
— checkbox, który użytkownik musi świadomie zaznaczyć.

### Co plugin daje

Enforcement server-side: formularz z checkboxem zgody NIE przejdzie bez
zaznaczenia (walidacja w `validateSubmission`, nie tylko front).

```ts
// konfiguracja formularza — pole zgody
{ name: 'consent', type: 'checkbox', required: true }
// FormsOption.consentFieldName wskazuje, które pole to zgoda
```

- **Server-side enforcement** — nawet ominięcie frontu (bezpośredni request) nie
  przepuści zgłoszenia bez zgody
- **Konfigurowalny** — nazwa pola zgody przez `consentFieldName`
- Szczegóły: [forms.md](./forms.md)

### Treść zgody — z panelu, z linkiem do polityki

Tekst przy checkboxie („Wyrażam zgodę na przetwarzanie danych zgodnie z
[polityką prywatności]") — z konfiguracji formularza w panelu, link przez
getSystemPagePath do strony privacyPolicy. NIE zaszywaj.

---

## 4. DANE ADMINISTRATORA (kto przetwarza dane)

Polityka prywatności musi wskazać **administratora danych** — podmiot
przetwarzający (nazwa firmy, adres, kontakt, często NIP). To dane firmy klienta.

- Trzymaj w **globalu** (np. `company`) — nazwa, adres, NIP, email, telefon
- Polityka i stopka czytają z tego globala
- Klient aktualizuje w panelu (zmiana adresu, danych) bez developera

NIGDY nie wpisuj danych firmy w kodzie (patrz architektura-tresci.md).

---

## 5. CHECKLIST WDROŻENIA COMPLIANCE

Przed oddaniem strony klientowi — sprawdź:

- [ ] Strony polityk utworzone (privacy, cookies, terms jeśli dotyczy)
- [ ] Role przypisane w System Pages (privacyPolicy, cookiePolicy, termsOfService)
- [ ] Treść polityk wypełniona przez klienta/prawnika (nie placeholder)
- [ ] Baner cookies działa — pokazuje się przy pierwszej wizycie
- [ ] Analytics NIE ładuje się przed zgodą (sprawdź w Network przed akceptacją)
- [ ] „Odrzuć" w banerze działa (analytics nie startuje)
- [ ] CookieButton otwiera ustawienia ponownie (wycofanie zgody)
- [ ] Cookies znikają po wycofaniu zgody
- [ ] Formularze mają checkbox zgody (required, enforcement server-side)
- [ ] Link do polityki w banerze i przy formularzach (przez getSystemPagePath)
- [ ] Dane administratora w globalu (widoczne w polityce i stopce)
- [ ] Wszystko per język (polityki, baner, zgody — dla każdego locale)

Jeśli któryś punkt kuleje — strona nie jest gotowa prawnie, niezależnie od tego,
jak dobrze wygląda.

---

## 6. GRANICA: MECHANIZM vs TREŚĆ (ważne)

**My (deweloper/agencja) dostarczamy:**
- Strony systemowe (miejsce na polityki)
- Baner zgody spełniający wymogi techniczne (granularność, wycofanie, gating)
- Enforcement RODO w formularzach
- Mechanizm linkowania i danych administratora

**Klient (albo jego prawnik) dostarcza:**
- TREŚĆ polityki prywatności (co, jak, po co przetwarza dane)
- TREŚĆ regulaminu (warunki usług)
- TREŚĆ polityki cookies (lista cookies, cele)
- Decyzję, jakie cookies faktycznie używa i w jakich kategoriach

**Nie jesteśmy kancelarią.** Nie piszemy treści prawnych, nie doradzamy, czy
dana klauzula wystarcza. Zapewniamy, że strona ma poprawny MECHANIZM. Za zgodność
TREŚCI z przepisami odpowiada klient/prawnik. Warto to zapisać w umowie z klientem
— że compliance treści jest po jego stronie, my dajemy narzędzia.

> Jeśli klient nie ma polityk — wskaż, że musi je dostarczyć (od prawnika albo
> generatora), zanim strona pójdzie na produkcję. Strona bez polityki prywatności
> i banera cookies zbierająca dane = ryzyko prawne dla klienta.
