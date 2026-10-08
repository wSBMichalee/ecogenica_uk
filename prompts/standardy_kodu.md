# Standardy kodu — Next 16 + Payload 3

Standard tworzenia kodu dla projektów Intecion (Next 16, Payload CMS 3,
TypeScript). Poziom senior: nie „działa", ale „działa, jest czytelne, bezpieczne
typowo, i następny człowiek/agent to zrozumie za pół roku".

Dla ludzi i dla Antigravity. Reguły są twarde, przykłady realne — wiele z nich to
błędy, które FAKTYCZNIE się zdarzyły (oznaczone „z sesji"). Odstępstwa tylko
świadome, z uzasadnieniem w kodzie.

Powiązane: [architektura-tresci.md](./architektura-tresci.md) (filozofia CMS),
[WDROZENIE-PLAYBOOK.md](./WDROZENIE-PLAYBOOK.md) (proces), [getting-started.md](./getting-started.md).

---

## 1. TYPY — bez `any`, bez `@ts-ignore`

Typy to nie biurokracja — to kontrakt, który łapie błędy zanim trafią na produkcję.

### 1.1 Nigdy `any`, nigdy `@ts-ignore` jako rozwiązanie

```ts
// ŹLE — any wyłącza type-checking, błąd przejdzie dalej
const data = (await res.json()) as any
doStuff(data.field)                    // literówka? runtime crash

// ŹLE — @ts-ignore ukrywa problem, nie rozwiązuje
// @ts-ignore
payload.sendEmail(wrongShape)

// DOBRZE — typuj, a przy nieznanym kształcie użyj unknown + zawężenie
const data: unknown = await res.json()
if (isMyShape(data)) doStuff(data.field)   // type guard
```

**Zasada (z sesji):** przy błędzie typu — napraw u ŹRÓDŁA, nie łataj. `as any`
przy graphAdapter ukryłby, że `SendEmailOptions` nie ma pola, którego używasz —
i wysyłka padłaby w runtime. Typ zmusił do poprawnego kształtu.

### 1.2 `unknown` + type guard zamiast rzutowania na siłę

```ts
// dane z zewnątrz (API, panel, JSON) są unknown — zawężaj
function isMediaObject(v: unknown): v is { url: string; alt?: string } {
  return typeof v === 'object' && v !== null && 'url' in v && typeof (v as any).url === 'string'
}

const hero = settings.heroImage
if (isMediaObject(hero)) {
  // tu TS WIE, że hero.url istnieje — bezpiecznie
}
```

### 1.3 Generyki przy wywołaniu, nie rzutowanie wyniku

```ts
// ŹLE — rzutujesz wynik, tracisz kontrolę
const settings = (await getSiteSettings(payload)) as SiteSetting

// DOBRZE — generyk przy wywołaniu, funkcja zwraca właściwy typ (z sesji)
const settings = await getSiteSettings<SiteSetting>(payload)
```

### 1.4 Typy z generowanego źródła, nie ręcznie

```ts
// ŹLE — ręczny typ rozjedzie się ze schematem
type Page = { title: string; slug: string }

// DOBRZE — z payload-types (generowane z kolekcji)
import type { Page } from '@/payload-types'
// po zmianie schematu: pnpm generate:types
```

### 1.5 `satisfies` dla konfiguracji

```ts
// as const satisfies — walidacja kształtu BEZ utraty wąskiego typu (z sesji)
export const i18nConfig = {
  defaultLocale: 'pl',
  locales: [{ code: 'pl', label: 'Polski' }],
} as const satisfies I18nConfig
// satisfies sprawdza zgodność, as const zachowuje literały (TS wie, że 'pl' to 'pl')
```

---

## 2. ARCHITEKTURA I GRANICE WARSTW

Największe źródło długu technicznego to nie brzydki kod — to **rozmyte granice**:
logika w złym miejscu, duplikacja, brak jednego źródła prawdy.

### 2.1 Trzy warstwy — co gdzie

```
PLUGIN (@intecion/ipal-kit)   — logika uniwersalna, reużywalna między projektami
PROJEKT (kolekcje, bloki)     — specyfika klienta: dane, wygląd, domeny
LIB (lib/*)                   — spoiwo: helpery projektu, jedno źródło dostępu
```

**Reguła decyzyjna:** „czy to samo w każdym projekcie?"
- TAK → plugin (i18n, SEO, forms, consent, email, bezpieczeństwo)
- NIE, zależy od klienta → projekt (bloki, CSP, dane firmy, schema.org)

Pełna tabela: [WDROZENIE-PLAYBOOK.md](./WDROZENIE-PLAYBOOK.md#część-g).

### 2.2 Jedno źródło prawdy (single source of truth)

Każda informacja ma DOKŁADNIE jedno miejsce. Duplikat = gwarantowany rozjazd.

```ts
// ŹLE — locale w dwóch miejscach, rozjadą się
// payload.config.ts: locales: ['pl', 'en']
// proxy.ts:          const locales = ['pl', 'en']   // kopia!

// DOBRZE — jeden plik, importowany wszędzie (z sesji)
// i18n.config.ts:    export const i18nConfig = {...}
// payload.config + proxy + lib   ← wszystkie importują to samo
```

**Antywzorce z sesji:**
- Nazwa cookie w wielu plikach → jedna stała `LOCALE_COOKIE_NAME`, propaguje
- `getCachedPayload` w kilku miejscach → jeden w `lib/content.ts`
- Zaszyta mapa slugów (kopia bazy w kodzie) → `getLocalizedSlugs` z bazy

### 2.3 Kierunek zależności — bez cykli

```ts
// ŹLE — cykl: blok → lib → config → blok (crash albo undefined)
// blocks/Form/Component.tsx:  import { turnstileKey } from '@/lib/content'

// DOBRZE — dane wstrzykiwane z góry, blok nie sięga do lib (z sesji)
// page.tsx buduje enhanceProps → przekazuje do bloku jako props
const enhanceProps = ({ block }) =>
  block.blockType === 'form' ? { turnstileSiteKey } : {}
```

Warstwa niższa (blok) nie importuje wyższej (lib). Dane płyną w dół, przez propsy.

### 2.4 Nie łataj w projekcie — brakującą funkcję dodaj do pluginu

Gdy coś nie działa i kusi Cię łata w projekcie (hook z zaszytą wartością, własny
helper) — to sygnał, że plugin czegoś nie ma. Dodaj to do PLUGINU (uniwersalne),
nie łataj w projekcie (jednorazowe, z hardkodem).

```ts
// ŹLE — łata w projekcie z zaszytą domeną klienta (z sesji)
afterRead: [({ doc }) => {
  const url = process.env.R2_PUBLIC_URL || 'https://media.rcustomcars.pl'  // hardkod!
  doc.url = `${url}/${doc.filename}`
  return doc
}]

// DOBRZE — plugin generuje URL z env, projekt nic nie łata
buildR2Storage(['media'])   // czyta R2_PUBLIC_URL, generuje URL sam
```

Test: „czy ta łata przyda się w innym projekcie?" Jeśli tak → należy do pluginu.
Jeśli ma zaszytą wartość konkretnego klienta → na pewno źle (patrz 2.5).

### 2.5 Wartości projektu z env/panelu, NIGDY zaszyte w kodzie

Domena, klucz, adres klienta — NIGDY w kodzie projektu. Do `.env` (infrastruktura)
albo panelu (treść). Realne błędy z sesji: hook z `media.rcustomcars.pl`,
`<link preconnect href="media.rcustomcars.pl">` — oba zaszywały domenę klienta.
Poprawnie: plugin czyta z env (R2_PUBLIC_URL) i dostarcza (MediaPreconnect).

### 2.5b Rzutowanie typu — kiedy JEST poprawne (locale:'all')

Zakaz `any` nie znaczy zakazu wszelkich rzutowań. Czasem typ statyczny NIE
modeluje kształtu runtime — wtedy czyste, wąskie rzutowanie jest poprawne.

Realny przypadek: `payload.findByID({ id, locale: 'all' })` zwraca zlokalizowane
pole jako obiekt `{ pl, en }`, ale wygenerowane typy Payloada deklarują `slug`
jako `string` (generator nie odróżnia trybu `all`). Poprawne:
```ts
// DOBRZE — pomost między typem (string) a runtime (obiekt), którego TS nie zna
getLocalizedSlugs({
  slugField: doc.slug as unknown as Record<string, unknown>,
  config,
})

// ŹLE — zagłuszenie całego wywołania
getLocalizedSlugs({ slugField: doc.slug as any, config })  // any = utrata typów
```
Różnica: `as unknown as <konkretny typ>` celuje w JEDNO znane niedopasowanie,
zachowując typowanie reszty. `as any` gasi typy globalnie. Pierwsze OK, drugie nie.
Patrz i18n.md (pułapka slug locale:'all').

Domena, klucz, adres klienta — NIGDY w kodzie projektu. Do `.env` (infrastruktura)
albo panelu (treść). Realne błędy z sesji: hook z `media.rcustomcars.pl`,
`<link preconnect href="media.rcustomcars.pl">` — oba zaszywały domenę klienta.
Poprawnie: plugin czyta z env (R2_PUBLIC_URL) i dostarcza (MediaPreconnect).

### 2.6 Nie duplikuj logiki pluginu

```ts
// ŹLE — własna wersja tego, co plugin już ma (z sesji)
function resolvePage(slug) { /* ... */ }        // plugin ma resolveRoute
const locales = ['pl', 'en']                    // plugin ma getConfiguredLocales
function buildSlug(t) { /* ... */ }             // plugin ma buildSlugField

// DOBRZE — użyj pluginu, sprawdź w docs/ zanim napiszesz
import { resolveRoute, getConfiguredLocales, buildSlugField } from '@intecion/ipal-kit'
```

Zanim napiszesz helper — sprawdź, czy plugin go nie ma (docs/ + `.d.ts`).

---

## 3. NEXT 16 + PAYLOAD 3 — WZORCE

Rzeczy specyficzne dla tego stacku, gdzie junior najczęściej błądzi.

### 3.1 Server vs Client Components — granica

Domyślnie wszystko to Server Component (RSC). `'use client'` TYLKO gdy potrzebujesz
interaktywności (useState, onClick, hooki przeglądarki).

```tsx
// DOBRZE — RSC domyślnie: pobiera dane server-side, zero JS do klienta
export default async function Page() {
  const data = await getData()          // bezpośrednio, bez useEffect/fetch
  return <Article data={data} />
}

// 'use client' TYLKO dla interakcji
'use client'
export function LikeButton() {
  const [liked, setLiked] = useState(false)   // wymaga klienta
  return <button onClick={() => setLiked(!liked)}>♥</button>
}
```

**Reguła:** pobieranie danych → server. Interakcja → client. Nie rób całej strony
`'use client'`, żeby „było prościej" — tracisz zalety RSC (SEO, wydajność).

### 3.2 server-only — chroń sekrety

```ts
// lib/email.ts — plik z hasłem SMTP / nodemailer
import 'server-only'                     // crash przy imporcie z klienta (z sesji)
// dzięki temu przypadkowy import w komponencie client = błąd BUILDU, nie wyciek
```

### 3.3 Cache i rewalidacja — świadomie

```ts
// React cache() — deduplikacja w obrębie jednego renderu
export const getSettings = cache(async (locale: string) => { /* ... */ })
// woła raz na render, choćby 5 komponentów prosiło

// Rewalidacja po zmianie w panelu — hook w kolekcji
afterChange: [({ doc }) => { revalidatePath(`/${doc.slug}`) }]
```

### 3.4 Transakcje — przekazuj `req`

```ts
// ŹLE — operacja w hooku bez req = osobna transakcja, brak atomowości
afterChange: [async ({ doc, req }) => {
  await req.payload.create({ collection: 'log', data: {...} })   // brak req!
}]

// DOBRZE — req przekazany, wszystko w jednej transakcji
afterChange: [async ({ doc, req }) => {
  await req.payload.create({ collection: 'log', data: {...}, req })
}]
```

### 3.5 Hooki — bez nieskończonych pętli

```ts
// ŹLE — hook aktualizuje dokument → wywołuje ten sam hook → pętla
afterChange: [async ({ doc, req }) => {
  await req.payload.update({ collection: 'posts', id: doc.id, data: {...}, req })
}]

// DOBRZE — flaga w context przerywa pętlę
afterChange: [async ({ doc, req, context }) => {
  if (context.skip) return
  await req.payload.update({ ..., req, context: { skip: true } })
}]
```

### 3.6 Access control — Local API domyślnie omija

```ts
// PUŁAPKA — przekazujesz user, ale access control OMIJANY domyślnie
await payload.find({ collection: 'posts', user })              // omija!

// DOBRZE — overrideAccess: false wymusza sprawdzenie uprawnień
await payload.find({ collection: 'posts', user, overrideAccess: false })
```

---

## 4. OBSŁUGA BŁĘDÓW

Senior nie zakłada, że wszystko się uda. Kod odporny na błędy = mniej pożarów.

### 4.1 Nie połykaj błędów po cichu

```ts
// ŹLE — błąd znika, nie wiesz, że coś padło
try { await sendEmail() } catch {}

// ŹLE — łapiesz i logujesz byle co
try { await sendEmail() } catch (e) { console.log('error') }

// DOBRZE — zaloguj konkret, zwróć czytelny wynik (z sesji, graphAdapter)
try {
  await sendEmail()
} catch (err) {
  const msg = err instanceof Error ? err.message : String(err)
  payload.logger.error(`[ipal] Email failed: ${msg}`)
  return { sent: false, error: 'Send failed. Check transport settings.' }
}
```

### 4.2 Rozróżniaj błąd użytkownika od błędu systemu

```ts
// błąd użytkownika (zły input) → czytelny komunikat, status 400
if (!isValidEmail(to)) {
  return Response.json({ error: 'Podaj poprawny adres.' }, { status: 400 })
}
// błąd systemu (Graph padł) → log techniczny + ogólny komunikat, status 502
```

### 4.3 Waliduj dane wejściowe (nie ufaj klientowi)

```ts
// endpoint / server action — ZAWSZE waliduj, zanim użyjesz (z sesji)
const to = (req.data?.to as string | undefined)?.trim()
if (!to || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(to)) {
  return Response.json({ error: 'Invalid recipient.' }, { status: 400 })
}
```

### 4.4 Guard clauses zamiast zagnieżdżonych if

```ts
// ŹLE — piramida zagnieżdżeń
function handle(user) {
  if (user) {
    if (user.active) {
      if (user.role === 'admin') { /* ... */ }
    }
  }
}

// DOBRZE — wczesne wyjścia, płaski kod
function handle(user) {
  if (!user) return
  if (!user.active) return
  if (user.role !== 'admin') return
  /* ... */
}
```

---

## 5. NAZEWNICTWO I CZYTELNOŚĆ

Kod czyta się 10× częściej, niż pisze. Nazwa to dokumentacja.

### 5.1 Nazwy mówią CO, nie JAK

```ts
// ŹLE — nic nie mówi
const d = await get(x)
const arr = data.filter(i => i.s === 'p')

// DOBRZE — czytelne bez komentarza
const settings = await getSettings(locale)
const publishedPosts = posts.filter(post => post.status === 'published')
```

### 5.2 Nazwy funkcji = czasownik + rzeczownik

```ts
buildSecurityHeaders()    // build + co
getLocalizedSlugs()       // get + co
resolveFormMessage()      // resolve + co
isValidLocale()           // is + predykat (zwraca boolean)
```

### 5.3 Komentarz tłumaczy DLACZEGO, nie CO

```ts
// ŹLE — komentarz powtarza kod
// zwiększ licznik o 1
counter += 1

// DOBRZE — tłumaczy nieoczywistą decyzję (z sesji)
// from.address MUSI = sender — inny adres wymaga Send-As w Exchange
// i kończy się ErrorSendAsDenied. Nazwę zmieniamy, adres NIE.
from: { emailAddress: { address: env.sender, name: senderName } }
```

### 5.4 Magic strings/numbers → stałe nazwane

```ts
// ŹLE — magiczna wartość rozsiana po kodzie
if (status === 202) { /* ... */ }
cookie.maxAge = 31536000

// DOBRZE — nazwana stała, jedno miejsce
const HTTP_ACCEPTED = 202
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365
```

---

## 6. ANTYWZORCE Z NASZYCH SESJI (realne błędy)

Katalog błędów, które FAKTYCZNIE się zdarzyły. Każdy kosztował czas.

| Antywzorzec | Co się stało | Reguła |
|---|---|---|
| Eksport pominięty w index.ts | `buildSecurityHeaders is not a function` | grep dist po build |
| Dublet @payloadcms/ui | `Cannot destructure 'config'` — hooki bez kontekstu | peer deps, nie deps |
| `from` ≠ sender w Graph | `ErrorSendAsDenied` | address = sender, klient w replyTo |
| Grep z kolejnością kluczy | fałszywe 0 mimo poprawnego kodu | grepuj token, nie frazę |
| `pnpm add` bez restartu dev | stary adapter w pamięci | restart po wciągnięciu |
| middleware.ts w Next 16 | routing nie działa / konflikt | tylko proxy.ts |
| Zaszyta mapa slugów | drugie źródło prawdy, rozjazd | getLocalizedSlugs z bazy |
| lib/pages.ts (duplikat) | rozjazd z pluginem | użyj resolveRoute |
| `[slug]` zamiast `[[...slug]]` | `slug.join is not a function` | podwójne nawiasy |
| publish bez build | stary dist w pakiecie | build przed publish |
| version przed commit | „working directory not clean" | commit przed version |
| Puste `blocks: []` | crash traverseFields | zawsze ≥1 blok |
| Brak `@source` na node_modules | komponenty pluginu bez stylów | @source w CSS |
| Sekrety storage (R2) w panelu | infrastruktura wiąże się przy starcie | R2 z .env (jak DB) |
| `Object.fromEntries` gubi literał `true` | TS2322 przy s3Storage | akumulator `Record<string, true>` |
| Hook/wartość z zaszytą domeną klienta w projekcie | inny projekt = cudza domena | z env (R2_PUBLIC_URL) przez plugin |
| `generateFileURL` na głównym poziomie s3Storage | ignorowany → obrazy 403 | per-kolekcja (`collections[slug]`) |
| Favicon renderowany ręcznie w projekcie | zły rozmiar/brak w head → Google nie pokazuje | buildIconsMetadata z panelu |
| Jawny `<head>` w layoutcie App Router | wypycha metadata (canonical/title) do body → crawlery nie widzą | bez `<head>`, Next zarządza; MediaPreconnect w body |
| Brak ISR (revalidate) w stronach | race condition metadata w body + wolny TTFB + 503 | `export const revalidate` w page.tsx |

**Wspólny mianownik większości:** przerwany łańcuch (zmiana nie dotarła tam,
gdzie trzeba) albo duplikacja (dwa źródła prawdy). Weryfikacja grepem i jedno
źródło prawdy eliminują ~80% z nich.

---

## 7. PROCES (jak pracować jak senior)

### 7.1 Zanim napiszesz kod
- Sprawdź, czy plugin/biblioteka już to ma (docs/, `.d.ts`) — nie wymyślaj koła
- Sprawdź sygnaturę, nie zgaduj (`node_modules/.../dist/*.d.ts`)
- Zastanów się, do której warstwy należy (plugin/projekt/lib)

### 7.2 Gdy piszesz
- Najmniejsza zmiana, która rozwiązuje problem (nie przepisuj przy okazji)
- Typuj od razu (nie „potem poprawię")
- Nazwij dobrze za pierwszym razem

### 7.3 Zanim powiesz „gotowe"
- `pnpm build --webpack` przechodzi LOKALNIE (nie tylko dev)
- Zero `any`/`@ts-ignore` (chyba że z komentarzem-uzasadnieniem)
- Weryfikacja grepem, jeśli zmiana w pluginie (łańcuch)
- Przeczytaj własny diff — czy następna osoba zrozumie?

### 7.4 Gdy coś nie działa
- Nie zgaduj — zdiagnozuj (log, grep, izolacja przyczyny)
- „Kod dobry, zachowanie złe" → lista z [WDROZENIE-PLAYBOOK.md](./WDROZENIE-PLAYBOOK.md#część-c)
- Napraw przyczynę, nie objaw (bez `as any` tłumiącego błąd)

---

## 8. CZEGO NIGDY NIE ROBIMY (twarde zakazy)

1. `any` / `@ts-ignore` jako rozwiązanie (tylko z uzasadnieniem w komentarzu)
2. Duplikacja logiki pluginu (resolvePage, własny slug, mapa slugów)
3. Dwa źródła prawdy (locale, cookie, config w wielu miejscach)
4. `middleware.ts` w Next 16 (tylko proxy.ts)
5. Treść na sztywno w JSX (wszystko z panelu — patrz architektura-tresci.md)
6. Połykanie błędów (`catch {}`)
7. Sekrety w kodzie/repo (env, server-only)
8. Publikacja pluginu bez: build → grep dist → (docs jeśli API) → commit → version
9. „Gotowe" bez lokalnego `build --webpack`
10. Cykle importów (blok → lib → config → blok)

---

## PODSUMOWANIE (kompas senior)

1. **Typy to kontrakt** — unknown+guard zamiast any, generyk przy wywołaniu
2. **Jedno źródło prawdy** — zero duplikacji, import zamiast kopii
3. **Granice warstw** — plugin/projekt/lib, dane płyną w dół
4. **RSC domyślnie** — 'use client' tylko dla interakcji
5. **Błędy jawnie** — loguj konkret, waliduj input, guard clauses
6. **Nazwy mówią CO** — komentarz mówi DLACZEGO
7. **Napraw przyczynę** — nie objaw, nie as any
8. **Weryfikuj** — grep, lokalny build, przeczytaj diff
9. **Nie wymyślaj koła** — sprawdź plugin/docs zanim napiszesz
10. **Zostaw kod lepszym** — następna osoba (albo Ty za pół roku) podziękuje
