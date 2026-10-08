# Zasady i Standardy Projektowe — Payload CMS 3 + Next 16 + @intecion/ipal-kit

Niniejszy dokument stanowi bezwzględnie obowiązujące reguły pracy dla agenta (Antigravity) w niniejszym projekcie. Został sporządzony na podstawie dokumentacji w `/docs`. Każda zasada musi być ściśle przestrzegana, bez wyjątków i bez stosowania obejść/prowizorek.

---

## 1. ZASADA NADRZĘDNA: ipal-kit JEST OBOWIĄZKOWY

1. **Obowiązkowe użycie pluginu:**
   - Każda funkcja dostarczana przez `@intecion/ipal-kit` (i18n, SEO, formularze, consent, email, slug, bezpieczeństwo, strony systemowe, storage R2, breadcrumbs, JSON-LD) **MUSI** być realizowana przez plugin.
   - **NIGDY** nie twórz własnego kodu w projekcie dublującego możliwości pluginu.
2. **Sprawdzaj przed pisaniem:**
   - Zanim napiszesz jakąkolwiek funkcję, helper czy komponent — sprawdź dokumentację w `node_modules/@intecion/ipal-kit/docs/` oraz definicje typów `.d.ts`. Jeśli funkcja istnieje w pluginie, **musisz** jej użyć.
3. **Gdy w pluginie czegoś brakuje:**
   - **NIE** obchodź braku prowizorką ani własnym kodem w projekcie (to tworzy dług technologiczny i rozbieżności).
   - **Zgłoś brak funkcji do rozbudowy pluginu**, zamiast łatać to lokalnie.
   - Logika uniwersalna (przydatna w innych projektach) trafia do pluginu. W projekcie znajduje się **wyłącznie** specyfika danego klienta (jego bloki, wygląd, struktura danych).
4. **Gdy coś w pluginie nie działa:**
   - **Zgłoś problem i błąd**, zamiast tworzyć ciche obejścia, prowizoryczne hooki czy hardkodowane patche.

---

## 2. KROK 0: INSTALACJA I DOSTĘP DO DOKUMENTACJI PLUGINU

1. **Utwórz `.npmrc` w katalogu projektu:**
   ```ini
   legacy-peer-deps=true
   @intecion:registry=https://git.intecion.net/api/packages/IntecionSoftware/npm/
   ```
   *(Scoped override: tylko `@intecion/*` z Gitea, rejestr publiczny bez tokena).*
2. **Instalacja pluginu:**
   ```bash
   pnpm add @intecion/ipal-kit
   ```
   *(NIGDY nie instaluj z gita `git+https://...` — psuje React Client Manifest w Next).*
3. **Lokalizacja dokumentacji źródłowej:**
   ```bash
   ls node_modules/@intecion/ipal-kit/docs/
   ```
   Zawsze korzystaj z plików w `docs/` pluginu (`getting-started.md`, `seo.md`, `forms.md`, `email.md`, `storage.md`, `i18n.md`, `blocks.md`, `turnstile.md` itd.).

---

## 3. ABSOLUTNY ZAKAZ HARDKODOWANIA

### A. Treść i teksty:
- **ZAKAZ:** Tekst widoczny dla użytkownika wpisany w JSX, etykiety i komunikaty w kodzie, instrukcje `if (locale === 'pl')`, tablice z tekstami w kodzie.
- **WYMAGANE:** Każdy tekst pochodzi z pola `localized: true`, pobierany z panelu CMS.
- **Częsty błąd (ukryty hardkod w fallbacku):** `siteName || 'Nazwa Klienta'` lub `catch { return { name: 'Firma...' } }` to **niedopuszczalny hardkod**! Gdy brak danych z panelu/env: **pomiń pole** (np. `...(val ? { name: val } : {})`), nie wstawiaj danych klienta w fallbacku `||` ani w bloku `catch`.

### B. Obrazy i multimedia:
- **ZAKAZ:** `import logo from '@/assets/...'`, ścieżki `src="/images/..."`.
- **WYMAGANE:** Pole `type: 'upload', relationTo: 'media'`, renderowane z `media.url`. Do kolekcji `Media` obowiązkowo wepnij `normalizeFilenameHook`.
- **Preconnect:** Użyj `<MediaPreconnect />` z pluginu (czyta `R2_PUBLIC_URL` z env), nigdy sztywnego tagu `<link>` z domeną.
- **Favicon:** Użyj `buildIconsMetadata(settings.favicon)` z panelu (format PNG, nie ręczny SVG).

### C. Linki i routing:
- **ZAKAZ:** `href="/pl/kontakt"`, menu jako statyczna tablica w kodzie, oraz **sztywna mapa zlokalizowanych ścieżek** (`const localizedRoutes = {...}` — kardynalny antywzorzec).
- **WYMAGANE:** `getLocalizedSlugs` / `switchLocalePath` z bazy danych, `getSystemPagePath`, relacje `relationship -> pages` w panelu CMS.

### D. Konfiguracja i dane firmy:
- **ZAKAZ:** `locale as 'pl' | 'en'`, zaszyty slug kolekcji, dane firmy, NIP, adres, telefon w kodzie.
- **WYMAGANE:** Jedno źródło prawdy `i18n.config.ts`, `locale as never`, dane firmy z globala (np. `siteSettings` / `CompanyInfo`), infrastruktura wyłącznie w `.env`.

### E. Renderer bloków, kolekcje, formularze (częste błędy):
- **Renderer bloków:** ZAWSZE `RenderBlocks` z pluginu + mapa `registry`. NIGDY własny `switch (block.blockType)` — to gadatliwe, bez enhanceProps, rośnie liniowo. Mapa deklaratywna, silnik z pluginu.
- **MINIMUM kolekcji, nie maksimum:** Domyślnie tylko rdzeń (pages, media, settings, navigation, footer + globale). Kolekcję treści (blog/produkty) TYLKO gdy klient JAWNIE wymaga. NIGDY nie twórz: `users` (WBUDOWANE w Payload — nie duplikuj!), `daneFirmy`/`settings` jako kolekcje (to GLOBALE), FAQ/hero/features jako kolekcje (to BLOKI). Test przed stworzeniem: lista rekordów + własny URL + jawna potrzeba + Payload nie ma wbudowanego. Patrz `kolekcje-katalog.md`.
- **Formularze z buildera:** ZAWSZE formularz z buildera w panelu (kolekcja Forms) + `submitForm`. NIGDY własny hardkodowany formularz z polami w JSX — omija Turnstile, rate-limit, consent RODO, powiadomienia. Turnstile: `TurnstileProvider` (siteKey raz w layoutcie) + `useTurnstile()` w formularzu.
- **ZAKAZ:** `locale as 'pl' | 'en'`, zaszyty slug kolekcji, dane firmy, NIP, adres, telefon w kodzie.
- **WYMAGANE:** Jedno źródło prawdy `i18n.config.ts`, `locale as never`, dane firmy z globala (np. `siteSettings` / `CompanyInfo`), infrastruktura wyłącznie w `.env`.

---

## 4. ARCHITEKTURA I STRUKTURA PROJEKTU

### A. Next 16 + Payload 3:
- **NIGDY nie twórz `middleware.ts`.** W Next 16 stosuje się **WYŁĄCZNIE `proxy.ts`** (funkcja `proxy`). Jeśli plik `middleware.ts` istnieje — usuń go natychmiast.
- **Struktura katalogów:**
  ```
  src/
    app/
      (frontend)/
        styles.css              # Tailwind + @source na plugin
        [locale]/
          layout.tsx            # root layout bez sztywnego <head>
          not-found.tsx         # 404 (treść z panelu)
          [[...slug]]/
            page.tsx            # render stron z bloków (podwójne nawiasy!)
      (payload)/                # panel admina
      manifest.ts               # PWA z panelu
      sitemap.ts                # z lib/content + export const dynamic = 'force-dynamic'
      robots.ts                 # z lib/content
    blocks/
      <NazwaBloku>/
        config.ts               # schemat pól bloku
        Component.tsx           # render komponentu
      registry.ts               # mapa blockType -> komponent
    collections/
      Pages.ts                  # layout typu blocks
      Media.ts                  # upload + normalizeFilenameHook
    globals/                    # siteSettings, siteIntegrations, navigation, footer
    lib/
      content.ts                # createContentHelpers — JEDNO źródło
      payload.ts                # helpery projektu (getSettings...)
    i18n.config.ts              # locale — jedno źródło
    payload.config.ts
    proxy.ts                    # routing locale (NIE middleware.ts)
  ```

### B. Przepływ danych i zależności:
- **Brak cykli importów:** Warstwa niższa (bloki) **NIE** może importować warstwy wyższej (`lib/*`). Dane zewnętrzne (np. klucze Turnstile) przekazuj przez `enhanceProps` w `page.tsx`.
- **Dostęp do Payloada:** Jedno źródło `getCachedPayload` w `lib/content.ts`.
- **Server Components (RSC) domyślnie:** Pobieranie danych po stronie serwera; `'use client'` stosuj wyłącznie dla komponentów z lokalnym stanem/interakcją. Chroń wrażliwe moduły przez `import 'server-only'`.

### C. Kluczowe wymagania SEO i Renderingu:
1. **Brak jawnego `<head>` w layoutcie:** Sztywny `<head>` wypycha metatagi Next.js do `<body>`. Pozwól Next.js zarządzać nagłówkiem. `<MediaPreconnect />` umieszczaj w `<body>` (React 19 automatycznie hoistuje tag link do head).
2. **Wymagane ISR:** `export const revalidate = 3600` w `page.tsx` stron (zapobiega race condition streamingu metadanych i zapewnia TTFB ~20ms).
3. **Wymagane `generateStaticParams`:** W `[[...slug]]/page.tsx` eksportuj `generateStaticParams` z `lib/content` (`export { generateStaticParams } from '@/lib/content'`). Gwarantuje synchroniczne generowanie metadanych w `<head>` dla robotów.
4. **`htmlLimitedBots`:** Skonfiguruj w `next.config.ts` zgodnie z `seo.md`.

---

## 5. STANDARDY KODU I TYPOWANIA (POZIOM SENIOR)

1. **Zero `any` i zero `@ts-ignore`:**
   - Zawsze typuj precyzyjnie. Jeśli kształt danych z zewnątrz jest nieznany, użyj `unknown` + zawężenie (type guard).
   - Wyjątek: wąskie rzutowanie `as unknown as Record<string, unknown>` przy udokumentowanych rozbieżnościach generatora Payload (np. pole zlokalizowane przy `locale: 'all'`).
2. **Typy generowane:** Importuj typy z `@/payload-types` (`pnpm generate:types`), nie twórz ręcznych duplikatów interfejsów.
3. **Generyki przy wywołaniu:** Stosuj np. `getSiteSettings<SiteSetting>(payload)`, a nie rzutowanie `as SiteSetting` na wyniku.
4. **`satisfies` dla konfiguracji:** Używaj `as const satisfies I18nConfig`.
5. **Obsługa błędów:** Nigdy nie połykaj błędów (`catch {}`). Loguj konkretny komunikat i zwracaj kontrolowany błąd. Stosuj guard clauses (płaski kod).
6. **Transakcje i hooki:** W hookach Payload zawsze przekazuj `req` do kolejnych operacji bazodanowych. Chroń hooki przed nieskończonymi pętlami za pomocą flagi w `context` (np. `context.skip`). Przy `payload.find` pamiętaj o `overrideAccess: false`, jeśli operacja ma respektować uprawnienia usera.

---

## 6. NAZEWNICTWO I KONWENCJE

- **Foldery bloków i pliki kolekcji:** PascalCase (`blocks/HeroSection/`, `collections/Pages.ts`).
- **Pliki bloku:** `config.ts` + `Component.tsx` w jednym folderze.
- **Slugi kolekcji:** camelCase, liczba mnoga (`pages`, `blogPosts`, `products`).
- **Slugi bloków:** camelCase (`hero`, `textSection`). Klucz w `registry.ts` musi być identyczny ze slugiem bloku.
- **Wspólne nazwy pól (obowiązkowe w każdym projekcie):**
  - Nagłówek: `heading`
  - Podtytuł: `subheading`
  - Treść: `body` (textarea) lub `content` (richText)
  - Obraz: `image` (upload -> media)
  - Przycisk CTA: `ctaLabel` (text, localized)
  - Cel CTA: `ctaTarget` (relationship -> pages)
  - Link zewn.: `url` (text)
  - Zgoda prawna: `consent` (checkbox)

---

## 6b. WYMAGANIA PRAWNE (COMPLIANCE)

Każda strona (PL/EU) MUSI mieć: polityka prywatności, polityka cookies, baner
zgody cookies, zgoda RODO w formularzach. Plugin dostarcza MECHANIZM:
- **Strony polityk** → System Pages (role: privacyPolicy, cookiePolicy, termsOfService), linkowane przez `getSystemPagePath`.
- **Baner cookies** → CookieBanner + CookieButton + ConsentProvider (analytics/marketing gated — NIE ładują się przed zgodą).
- **Zgoda RODO** → checkbox `consent` w formularzu (enforcement server-side w submitForm).
- **Strony noindex** → polityki/regulamin zaznacz `noindex` w panelu SEO (kanibalizacja fraz).
- **Ochrona:** hook `buildPreventDeleteSystemPage` blokuje usunięcie strony systemowej.

Granica: MY dostarczamy mechanizm, TREŚĆ prawną (tekst polityk) tworzy klient/prawnik.

**Widget dostępności (a11y)** — OPCJONALNY, NIE dodawaj domyślnie. Wymagany tylko
dla podmiotów publicznych / części e-commerce (European Accessibility Act). Dla
zwykłych stron komercyjnych to opcja — dodawaj GDY klient wymaga (AccessibilityProvider
+ AccessibilityWidget + CSS projektu). Patrz `accessibility.md`.
Patrz `wymagania-prawne.md`.

## 6c. HOOKI PLUGINU (automatyzacja)

Wpinaj w kolekcje gdzie dotyczy (patrz `hooks.md`):
- **buildRevalidateHook** (afterChange/afterDelete) — ISR odświeżany po zapisie (redaktor od razu widzi zmianę). `revalidatePath` wstrzykiwany z projektu.
- **trackSlugHistoryHook** (beforeChange) — zmiana slug → zapis starego → projekt robi 301 (stary URL nie daje 404).
- **setPublishedAtHook** — auto-data publikacji (blog).
- **normalizeFilenameHook** — czyste nazwy plików (Media, obowiązkowo).
- **buildPreventDeleteSystemPage** / **buildValidateUniqueRole** — ochrona stron systemowych.

## 6d. BEZPIECZEŃSTWO (nagłówki)

- **buildSecurityHeaders** w next.config — HSTS, COOP, nosniff, Referrer-Policy (z automatu, uniwersalne).
- **buildCsp** — generator CSP z twardymi regułami (base-uri, object-src, frame-ancestors). Flagi: turnstile, analytics, youtube, r2Url. Wdrażaj przez `report-only` → sprawdź konsolę → `enforce`.
- **2FA WYMUSZONE** — `ipalKit({ twoFactor: { issuer: 'Nazwa Firmy' } })` + `pnpm add @clocklimited/payload-2fa@3.0.0-beta.7`. Wymuszone dla WSZYSTKICH użytkowników (forceSetup), bez opcji wyłączenia per user. NIE ustawiaj `twoFactor: false` (chyba że klient wprost odmawia). Bez zależności = błąd buildu. Patrz security.md.
- **Ścieżka panelu** — `ipalKit({ adminRoute: '/its' })` ukrywa panel. WYMAGA przeniesienia folderu `app/(payload)/admin/` → `app/(payload)/its/`. To obscurity, nie security (2FA to prawdziwa ochrona).
- CSP zostaje w projekcie (domeny), ale skeleton z pluginu. NIE Trusted Types (psuje Turnstile/GA).

## 7. PODZIAŁ PRACY I RÓL

- **Antigravity (Agent):** Buduje architekturę, logikę, kolekcje, bloki, routing, edytowalność przez panel, integracje oraz dba o brak hardkodów.
- **Impeccable (osobne narzędzie):** Dopracowuje wygląd, system wizualny na bazie `PRODUCT.md` i `DESIGN.md`. Antigravity nie „dopieszcza" styli ad-hoc kosztem logiki i edytowalności.
- **Klient / Redaktor:** Samodzielnie zarządza każdą treścią z poziomu panelu CMS.

---

## 8. PROCEDURA RAPORTOWANIA DO PLUGINU

Jeśli w trakcie pracy:
1. Funkcja okaże się brakująca w `@intecion/ipal-kit`,
2. Wystąpi błąd wewnętrzny w bibliotece pluginu,
3. Pojawi się powtarzalna potrzeba biznesowa przydatna w wielu projektach,

**Należy natychmiast przygotować raport proponowanej zmiany/rozbudowy pluginu:**
- Dokładny opis problemu / brakującej funkcjonalności,
- Proponowany interfejs API / sygnatura funkcji lub konfiguracji,
- Uzasadnienie uniwersalności dla innych projektów.
**Nie wolno tworzyć cichej łaty w kodzie projektu.**

---

## 9. MAPA DOKUMENTACJI — gdzie szukać szczegółów

Ten plik to skondensowane reguły. Szczegóły w `node_modules/@intecion/ipal-kit/docs/`:

| Chcę... | Plik |
|---|---|
| Zbudować projekt od zera | `getting-started.md` |
| Strukturę, nazewnictwo, konwencje | `fundamenty-projektu.md` |
| Jakie kolekcje budować (minimum!) | `kolekcje-katalog.md` |
| SEO, metadane, sitemap, favicon, structured data, llms.txt | `seo.md` |
| Hooki (revalidate, slug history, ochrona) | `hooks.md` |
| Bezpieczeństwo, CSP, COOP | `security.md` |
| Formularze, Turnstile, submitForm | `forms.md`, `turnstile.md` |
| i18n, strona jednojęzyczna, ścieżki | `i18n.md` |
| Strony systemowe, routing | `pages.md` |
| Bloki, RenderBlocks | `blocks.md` |
| Media, R2, MediaPreconnect | `storage.md` |
| Email (SMTP/Graph) | `email.md` |
| Consent, cookies | `consent.md` |
| Deployment, ISR/SSG, Coolify | `deployment.md` |
| Wymagania prawne, compliance | `wymagania-prawne.md` |
| Filozofia CMS, edytowalność, Impeccable | `architektura-tresci.md` |
| Standardy kodu, antywzorce | `standardy-kodu.md` |

---

## 10. ZAPISZ REGUŁY PROJEKTU

Kluczowe ustalenia projektu (stack, decyzje, tryby stron) zapisz we własnym pliku
kontekstu (`agents.md` / `.agents/context/`), żeby nie gubić ich między sesjami.
Nie polegaj tylko na pamięci sesji.
