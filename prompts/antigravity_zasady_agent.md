# Zasady dla Antigravity — budowa aplikacji Payload + ipal-kit

Ten dokument to **jedyne**, co musisz przeczytać, zanim zaczniesz. Zawiera:
zasady zachowania, jak zdobyć pełną dokumentację, i mapę „gdzie szukać czego".
Pełne instrukcje implementacji są w `/docs` pluginu — ten plik mówi, JAK się
zachowywać i GDZIE szukać szczegółów.

---

## KROK 0 — ZDOBĄDŹ DOKUMENTACJĘ (zrób to PIERWSZE)

Cała szczegółowa dokumentacja (jak zbudować, jak działa każdy moduł) jest w
pakiecie pluginu, w folderze `docs/`. Żeby ją mieć:

**1. Utwórz `.npmrc` w katalogu projektu:**
```
legacy-peer-deps=true
@intecion:registry=https://git.intecion.net/api/packages/IntecionSoftware/npm/
```
To scoped override — tylko `@intecion/*` idzie do Gitea, reszta z npm. Bez
sekretu, commituj do repo. Rejestr jest PUBLICZNY — instalacja bez tokenu.

**2. Zainstaluj plugin:**
```bash
pnpm add @intecion/ipal-kit
```

**3. Znajdź dokumentację:**
```bash
ls node_modules/@intecion/ipal-kit/docs/
```
Tam jest wszystko. **Zawsze zaglądaj tam po szczegóły**, zamiast zgadywać.

> NIE instaluj z gita (`git+https://...`) — łamie React Client Manifest w Next
> (komponenty 'use client' padają w runtime). Zawsze rejestr.

### Mapa dokumentacji — gdzie czego szukać

| Chcę... | Plik w docs/ |
|---|---|
| Zbudować projekt od zera, krok po kroku | `getting-started.md` |
| **Struktura, nazewnictwo, konwencje (standard)** | `fundamenty-projektu.md` |
| **Jakie kolekcje budować, kiedy, jak wpiąć** | `kolekcje-katalog.md` |
| **Zmienne .env + deployment na produkcję** | `deployment.md` |
| **Jak budować treść, żeby klient edytował (CMS!)** | `architektura-tresci.md` |
| **Dobre praktyki kodu (typy, architektura, antywzorce)** | `standardy-kodu.md` |
| Procedurę publikacji, pułapki, diagnostykę | `WDROZENIE-PLAYBOOK.md` |
| Formularze, zgoda RODO, komunikaty | `forms.md` |
| Email (SMTP/Graph), test wysyłki | `email.md` |
| Powiadomienia (teksty wyników per język) | `notifications.md` |
| Consent, cookies, locale za zgodą | `consent.md`, `i18n.md` |
| Widget dostępności (OPCJONALNY — tylko gdy klient wymaga) | `accessibility.md` |
| **Polityki, regulaminy, baner cookies, RODO** | `wymagania-prawne.md` |
| Nagłówki bezpieczeństwa | `security.md` |
| Media na R2 (storage) | `storage.md` |
| SEO, metadane, sitemap, hreflang | `seo.md` |
| Hooki (revalidate, slug history, ochrona stron) | `hooks.md` |
| Auto-slug | `slug.md` |
| Bloki, treść, blog/archiwa | `blocks.md`, `content.md` |
| Turnstile (captcha) | `turnstile.md` |
| Publikacja nowej wersji pluginu | `publishing.md`, `gitea-*.md` |
| Indeks wszystkiego | `README.md` |

**Zasada:** gdy nie wiesz jak coś zrobić — NIE zgaduj. Zajrzyj do właściwego
pliku w `docs/`. Wszystko tam jest, z kodem i pułapkami.

---

## CZĘŚĆ A — ZASADY ZACHOWANIA (ściśle przestrzegać)

### A0. ipal-kit jest OBOWIĄZKOWY (zasada nadrzędna)

**Korzystanie z ipal-kit jest OBOWIĄZKOWE, nie opcjonalne.** Każda funkcja, którą
plugin dostarcza (i18n, SEO, formularze, consent, email, slug, bezpieczeństwo,
strony systemowe), MUSI być realizowana przez plugin — NIGDY przez własny kod
w projekcie dublujący to, co plugin już robi.

**Zanim napiszesz cokolwiek — sprawdź, czy plugin to ma** (docs/ + `.d.ts`).
Jeśli ma → użyj pluginu. Jeśli piszesz własną wersję istniejącej funkcji pluginu
— robisz błąd.

**Gdy plugin czegoś NIE ma:**
- NIE obchodź go własnym kodem w projekcie (to tworzy dług i rozjazd).
- Zasygnalizuj, że brakuje funkcji w pluginie — to sygnał do ROZBUDOWY pluginu,
  nie do łatania w projekcie.
- Wyjątek: projekt wymaga tak dużej przebudowy, że i tak zaczniemy od zmian
  w bibliotece. Wtedy najpierw rozbudowa pluginu, potem użycie go w projekcie.

**Reguła:** logika uniwersalna (przydatna w innych projektach) → plugin. Tylko
specyfika JEDNEGO klienta (jego bloki, wygląd, dane) → projekt. Jeśli piszesz
w projekcie coś, co przyda się gdzie indziej — to powinno być w pluginie.

Powtarzalne naruszenia (NIE rób tak):
- Własny formularz zamiast form-buildera pluginu (patrz forms.md — OBOWIĄZKOWY builder)
- Własny slug zamiast buildSlugField
- Własna negocjacja locale zamiast pluginu
- Własna mapa ścieżek zamiast getLocalizedSlugs
- Własny renderer bloków (switch) zamiast RenderBlocks + mapa registry
- Jawny <head> w layoutcie (wypycha metadata do body — psuje SEO)
- MediaPreconnect w <head> zamiast w <body> (ten sam problem)
- Brak ISR (revalidate) w stronach (race condition metadata + wolny TTFB)
- Brak generateStaticParams w [[...slug]] (trasa dynamiczna, metadata w body)
- `await searchParams` w stronie bez paginacji (deoptymalizuje ISR/SSG)
- **Tworzenie kolekcji na zapas** (users, media-nowa, daneFirmy, settings jako
  kolekcje). Users są WBUDOWANE w Payload. Dane firmy = GLOBAL. Nawigacja/footer
  = GLOBALE. FAQ/hero = BLOKI. Twórz MINIMUM: rdzeń (pages/media/settings/nav/
  footer) + kolekcja treści TYLKO gdy klient jawnie wymaga. Patrz kolekcje-katalog.md.
- **Hardkodowanie wartości w projekcie zamiast czytania z env/pluginu** (patrz niżej)

### A0b. NIE łataj hardkodem w projekcie — zgłoś brak do pluginu

Gdy coś nie działa i kusi Cię, żeby ZAŁATAĆ to w projekcie (hook, hardkodowana
wartość, własny helper) — ZATRZYMAJ SIĘ. To prawie zawsze znak, że:
- albo plugin już to ma (nie znalazłeś — sprawdź docs/),
- albo pluginowi tej funkcji brakuje (zgłoś do rozbudowy pluginu).

**Realne błędy (NIE powtarzaj):**
- Hook `afterRead` w Media z zaszytą domeną `https://media.klient.pl` — zamiast
  tego adapter pluginu generuje URL z R2_PUBLIC_URL (env).
- `<link rel="preconnect" href="https://media.klient.pl">` zaszyte w layoutcie —
  zamiast tego `<MediaPreconnect />` z pluginu (czyta R2_PUBLIC_URL).

**Ukryty hardkod w fallbacku (UWAGA — częsty):** `siteName || 'Nazwa Klienta'`
wygląda niewinnie, ale to hardkod. Gdy panel zawiedzie, pokaże cudzą nazwę; inny
projekt skopiuje i ma cudze dane. Realne błędy: manifest z
`|| 'Kancelaria Adwokacka...'`, `catch { return { name: 'Kancelaria...' } }`,
`theme_color: '#0e1e24'`. **Brak danych → POMIŃ pole** (`...(x ? {name:x} : {})`),
nie wstawiaj wartości klienta w `||` ani w `catch`.

**Reguła:** wartość zależna od projektu (domena, klucz, adres, NAZWA, KOLOR)
NIGDY nie jest zaszyta w kodzie projektu — ani wprost, ani w fallbacku `||`, ani
w `catch`. Idzie do `.env` (infrastruktura) albo panelu (treść),
a plugin ją konsumuje. Jeśli plugin nie ma mechanizmu, który tego potrzebuje —
to sygnał do rozbudowy PLUGINU, nie do hardkodu w projekcie.



### A1. Nic na sztywno — treść
ZAKAZANE: tekst widoczny dla użytkownika w JSX, etykiety/komunikaty w kodzie,
`if (locale === 'pl')`, tablice tekstów w kodzie.
WYMAGANE: każdy tekst z pola `localized: true`, pobierany z panelu. Fallback
tylko jako wartość domyślna w helperze, nie podstawowe źródło.

### A2. Nic na sztywno — obrazy
ZAKAZANE: `import logo from '@/assets/...'`, ścieżki `src="/images/..."`.
WYMAGANE: pole `type: 'upload', relationTo: 'media'`, render z `media.url`.

### A3. Nic na sztywno — linki i nawigacja
ZAKAZANE: `href="/pl/kontakt"`, menu jako tablica w kodzie, **zaszyta mapa
zlokalizowanych ścieżek** (`const localizedRoutes = {...}` — NAJGORSZY antywzorzec).
WYMAGANE: `getLocalizedSlugs`/`switchLocalePath` z bazy, `getSystemPagePath`,
nawigacja jako relationship→pages w panelu. (Szczegóły: getting-started.md §8.)

### A4. Nic na sztywno — konfiguracja
ZAKAZANE: `locale as 'pl'|'en'`, slug kolekcji zaszyty, dane firmy w kodzie.
WYMAGANE: `locale as never`, slug z konfiguracji, dane firmy z globala.

### A5. Architektura
- **NIGDY nie twórz `middleware.ts`.** Next 16 = WYŁĄCZNIE `proxy.ts` (funkcja
  `proxy`). Jeśli istnieje middleware.ts — USUŃ. Wiedza „middleware to standard"
  jest nieaktualna (Next < 16). Import `@intecion/ipal-kit/next/middleware` to
  nazwa subpath, NIE nazwa pliku.
- Logika w pluginie — projekt podłącza i styluje, nie duplikuje.
- Jedno źródło `getCachedPayload` (lib/content.ts). Bloki NIE importują lib
  (cykl) — dane przez enhanceProps.
- Generyki `getSiteSettings<T>` przy wywołaniu.

### A6. Proces pracy
1. **Nie zgaduj sygnatur** — sprawdź w `node_modules/@intecion/ipal-kit/dist/*.d.ts`
   albo w docs.
2. **Weryfikuj każdą zmianę grepem** (patrz WDROZENIE-PLAYBOOK.md — łańcuch zmiany).
3. **Buduj lokalnie przed deployem** (`next build --webpack`).
4. **Nie twórz duplikatów** logiki pluginu (resolvePage, własny slug, mapa slugów).
5. **Napraw u źródła** — bez `as any`/`@ts-ignore`.
6. **Sprawdź, czy plugin już to ma**, zanim coś napiszesz. Zajrzyj do docs.
7. **Zapisz reguły projektu** do własnego pliku kontekstu (`agents.md` albo
   `.agents/context/`) — stack, zasady, ustalenia — żeby nie gubić ich między
   sesjami. Nie polegaj tylko na pamięci sesji.
8. **Podział pracy:** TY (Antigravity) budujesz kod/logikę/edytowalność.
   Wygląd dopracowuje Impeccable (osobne narzędzie) — patrz architektura-tresci.md.
   Nie „dopieszczaj" wizualnie ad hoc; skup się na funkcjonalności i panelu.

---

## CZĘŚĆ B — JAK REALIZOWAĆ „WSZYSTKO PRZEZ PANEL"

Plugin sam stosuje te wzorce (consent, favicon) — naśladuj.

- **Tekst** → pole `localized: true`, render z `getSettings(locale)`.
- **Obraz** → pole `upload → media`, render z `depth>=1` i `media.url`.
- **Link** → relationship→pages albo `getSystemPagePath`.
- **Zlokalizowane ścieżki** → `getLocalizedSlugs` z bazy (NIGDY mapa w kodzie).
- **Dane firmy** → global (nazwa, NIP, adres, kontakt).
- **Komunikaty formularza** → global Notifications + `resolveFormMessage`
  (patrz notifications.md).

Szczegóły każdego wzorca z kodem: odpowiedni plik w docs/.

---

## CZĘŚĆ C — KOLEJNOŚĆ BUDOWY (skrót; pełne kroki w getting-started.md)

1. Szkielet Payload 3 + Next 16, pnpm, Node 22
2. `.npmrc` + `pnpm add @intecion/ipal-kit` + zależności peer
3. build script z `--webpack`
4. i18n.config.ts (jedno źródło locale)
5. payload.config.ts — `ipalKit({...})`, `email: mailAdapter()`
6. Kolekcje/globale — WSZYSTKO localized/upload
7. lib/content.ts + lib/payload.ts (jedno źródło)
8. proxy.ts (NIE middleware.ts)
9. Bloki — enhanceProps, nie import lib
10. buildSlugField (nie ręczny slug)
11. buildSecurityHeaders w next.config
11-2fa. 2FA WYMUSZONE: ipalKit({ twoFactor: { issuer: 'Firma' } }) +
     pnpm add @clocklimited/payload-2fa@3.0.0-beta.7. Bez opcji wyłączenia per user. NIE
     dawaj twoFactor: false. Opcjonalnie adminRoute: '/its' (przenieś folder
     app/(payload)/admin → /its). Patrz security.md.
11a. htmlLimitedBots w next.config (KRYTYCZNE SEO — metadata/favicon w <head>
     dla Google; bez tego canonical/hreflang/favicon w <body>, patrz seo.md)
11a2. ISR w stronach: `export const revalidate = 3600` w page.tsx (KRYTYCZNE —
      metadata zawsze w <head>, nie body; eliminuje race condition streamingu;
      TTFB ~20ms, brak 503). Redaktor widzi zmiany po rewalidacji — rozważ
      on-demand revalidation (hook afterChange → revalidatePath). Patrz seo.md.
11a1. generateStaticParams w [[...slug]]/page.tsx (KRYTYCZNE — bez niego trasa
      DYNAMICZNA → metadata w body → SEO spada. Z nim SSG → head synchroniczny,
      SEO 100/100). Eksportuj z lib/content: `export { generateStaticParams }
      from '@/lib/content'`. Plugin generuje. To SILNIEJSZE niż samo ISR.
11a3. Layout BEZ jawnego <head>! Sztywny <head> wypycha metadata do <body>.
      MediaPreconnect w <body> (React 19 hoistuje link do head), nie w <head>.
11b. Media: kolekcja z normalizeFilenameHook (czyste nazwy plików)
11c. Storage: buildR2Storage(['media']) jeśli R2 (dane z .env, NIE panel)
11d. Jeśli R2: <MediaPreconnect/> w <head> (preconnect CDN, z env — NIE hardkod)
12. SEO structured data (root layout, dane z panelu, jako ld+json):
    - buildOrganizationJsonLd (logo, nazwa)
    - buildWebSiteJsonLd (search TYLKO jeśli jest realna wyszukiwarka)
    - buildSiteNavigationJsonLd (z pozycji menu, jeśli header nav)
13. SEO per strona: buildBreadcrumbJsonLd (z realnej ścieżki, NIE zaszyte)
14. Trasy SEO — OBOWIĄZKOWE (bez nich Google nie widzi stron):
    - app/robots.ts  → export { robots as default } from '@/lib/content'
    - app/sitemap.ts → export { sitemap as default } from '@/lib/content'
      + export const dynamic = 'force-dynamic'
      OPCJONALNIE czytelny XML w przeglądarce: zamiast sitemap.ts użyj
      app/sitemap.xml/route.ts z buildSitemapXml (czysty XML, przeglądarka robi
      drzewo — NIE XSLT, jest wycofywany!). ALBO sitemap.ts ALBO route.ts — NIGDY
      oba. To kosmetyka, nie SEO. Patrz seo.md.
      + export const dynamic = 'force-dynamic' (KONIECZNE — deploy kontenerowy)
    - favicon: buildIconsMetadata w root generateMetadata (PNG, NIE SVG!)
15. Test: root `/` przekierowuje, formularz wysyła, panel edytowalny

**Każdy krok ma pełny opis z kodem w `docs/getting-started.md`.** Ten spis to
tylko kolejność — po szczegóły idź do docs.

---

## CZĘŚĆ D — TEST AKCEPTACYJNY „WSZYSTKO PRZEZ PANEL"

Aplikacja jest poprawna, jeśli redaktor przez SAM panel (bez kodu) może:
1. Zmienić każdy nagłówek/tekst/etykietę — per język
2. Podmienić każdy obraz treściowy
3. Zmienić dane firmy (stopka, kontakt)
4. Ułożyć nawigację
5. Zmienić teksty cookies per język
6. Utworzyć stronę z bloków
7. Zmienić metadane SEO per strona/język
8. Przypisać strony systemowe

Cokolwiek wymaga zmiany w kodzie → zasada złamana → napraw (przenieś do pola panelu).

---

## PODSUMOWANIE (kompas)

1. **Najpierw zdobądź docs** (KROK 0) — instaluj plugin, czytaj `docs/`
2. **Nic na sztywno** — panel/baza, nie kod
3. **NIGDY middleware.ts** — Next 16 = proxy.ts
4. **NIGDY mapa slugów** — getLocalizedSlugs z bazy
5. **Plugin już to ma** — sprawdź docs, zanim napiszesz
6. **Weryfikuj grepem** — łańcuch zmiany (playbook)
7. **Napraw u źródła** — bez as any
8. **Gdy nie wiesz — czytaj docs**, nie zgaduj

Wszystkie szczegóły techniczne, kod, pułapki → `node_modules/@intecion/ipal-kit/docs/`.
