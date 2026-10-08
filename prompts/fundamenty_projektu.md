# Fundamenty projektu — struktura, nazewnictwo, konwencje

Każdy projekt Intecion (Payload 3 + Next 16 + ipal-kit) ma tę SAMĄ strukturę i
te SAME konwencje nazewnicze. Dzięki temu każdy — człowiek czy agent — wchodzi
w dowolny projekt i od razu wie, gdzie co jest. Ten dokument to standard: nie
propozycja, ale obowiązujący układ.

Powiązane: [getting-started.md](./getting-started.md) (setup krok po kroku),
[architektura-tresci.md](./architektura-tresci.md) (filozofia CMS),
[standardy-kodu.md](./standardy-kodu.md) (jakość kodu).

---

## 1. STRUKTURA KATALOGÓW (obowiązkowa)

```
projekt/
  src/
    app/
      (frontend)/
        styles.css              # Tailwind + @source na plugin
        [locale]/
          layout.tsx            # root layout: <html lang>, consent, analytics
          not-found.tsx         # 404 (treść z panelu)
          [[...slug]]/
            page.tsx            # render stron z bloków
      (payload)/                # panel admina (generowany)
      manifest.ts               # PWA (dane z panelu — patrz seo.md)
      sitemap.ts                # z lib/content
      robots.ts                 # z lib/content
    blocks/
      <NazwaBloku>/
        config.ts               # schemat pól
        Component.tsx           # render
      registry.ts               # mapa blockType → komponent
    collections/
      Pages.ts
      Media.ts
      <Inne>.ts
    globals/                    # jeśli projekt dodaje własne (rzadko)
    lib/
      content.ts                # createContentHelpers — JEDNO źródło
      payload.ts                # helpery projektu (getSettings...)
    i18n.config.ts              # locale — jedno źródło
    payload.config.ts
    proxy.ts                    # routing locale (NIE middleware.ts)
  .env
  .env.example                  # szablon zmiennych (patrz deployment.md)
  next.config.ts
  package.json
```

**Twarde reguły struktury:**
- Bloki: JEDEN folder na blok (`config.ts` + `Component.tsx` razem)
- `lib/content.ts` i `lib/payload.ts` — jedyne miejsca dostępu do danych
- `proxy.ts`, NIGDY `middleware.ts`
- `[[...slug]]` podwójne nawiasy (opcjonalny catch-all)
- Trasy pod `[locale]` (bo `<html lang>` musi znać język)

---

## 2. NAZEWNICTWO PLIKÓW I FOLDERÓW

| Element | Konwencja | Przykład |
|---|---|---|
| Folder bloku | PascalCase | `blocks/HeroSection/` |
| Komponent bloku | PascalCase + `.tsx` | `Component.tsx`, `HeroSection.tsx` |
| Config bloku | `config.ts` | `blocks/Hero/config.ts` |
| Kolekcja | PascalCase, l.mn. | `collections/Pages.ts`, `Products.ts` |
| Global | PascalCase | `globals/CompanyInfo.ts` |
| Helper lib | camelCase | `lib/content.ts`, `lib/payload.ts` |
| Plik konfiguracji | kebab/dot | `i18n.config.ts`, `payload.config.ts` |

**Reguły:**
- Foldery bloków i kolekcje — PascalCase (to „byty")
- Pliki pomocnicze/helpery — camelCase
- Bez skrótów w nazwach (`HeroSection`, nie `HeroSec`)
- Nazwa mówi CO to jest (patrz standardy-kodu.md §5)

---

## 3. NAZEWNICTWO W PAYLOAD (pola, slugi, kolekcje)

### Slugi kolekcji — camelCase, l.mn.
```ts
slug: 'pages'          // ✓
slug: 'blogPosts'      // ✓ camelCase dla wielosłownych
slug: 'Pages'          // ✗ nie PascalCase
slug: 'blog_posts'     // ✗ nie snake_case
```

### Slugi bloków — camelCase
```ts
slug: 'hero'           // ✓
slug: 'textSection'    // ✓
slug: 'text-section'   // ✗ nie kebab (klucz w registry musi pasować)
```
Klucz w `registry.ts` MUSI dokładnie odpowiadać slug bloku:
```ts
export const blockRegistry = { hero: Hero, textSection: TextSection }
```

### Nazwy pól — camelCase, opisowe
```ts
{ name: 'heading', ... }           // ✓
{ name: 'ctaLabel', ... }          // ✓ camelCase
{ name: 'cta_label', ... }         // ✗ nie snake
{ name: 'h', ... }                 // ✗ nieopisowe
```

### Pola wspólne — te same nazwy wszędzie
Dla spójności między projektami, te pola nazywamy ZAWSZE tak samo:

| Znaczenie | Nazwa pola |
|---|---|
| Nagłówek sekcji | `heading` |
| Podtytuł | `subheading` |
| Treść tekstowa | `body` (textarea) / `content` (richText) |
| Obraz | `image` |
| Tekst przycisku | `ctaLabel` |
| Cel przycisku (wewn.) | `ctaTarget` (relationship→pages) |
| Link zewnętrzny | `url` |
| Zgoda RODO | `consent` |

Redaktor uczy się raz — w każdym projekcie te same nazwy.

---

## 4. KONWENCJE KOMPONENTÓW BLOKÓW

```tsx
// Nazwana funkcja (nie default arrow), PascalCase = nazwa bloku
export function HeroSection({ heading, image, ctaLabel, ctaTarget }: HeroSectionProps) {
  // 1. Guard clauses dla braków (pola opcjonalne)
  // 2. Wszystko z propsów (nic na sztywno — patrz architektura-tresci.md)
  return (
    <section className="...">
      {heading && <h2>{heading}</h2>}
    </section>
  )
}
```

**Reguły komponentów:**
- Props typowane (interface/type `<Nazwa>Props`)
- Pola opcjonalne → guard (`{heading && ...}`)
- ZERO treści na sztywno (teksty z propsów/panelu)
- Tailwind (spójnie z pluginem)
- Server Component domyślnie; `'use client'` tylko dla interakcji

---

## 5. KONWENCJE lib/ (dostęp do danych)

```ts
// lib/content.ts — JEDNO źródło helperów pluginu (createContentHelpers)
export const { getCachedPayload, getSettings, resolveRoute, ... } = createContentHelpers({...})

// lib/payload.ts — helpery PROJEKTU, typowane, cache()
export const getSettings = cache(async (locale: string) => ...)
```

**Reguły:**
- `getCachedPayload` — TYLKO w `lib/content.ts`, importowany wszędzie
- Bloki NIE importują `lib/*` (cykl — dane przez enhanceProps)
- Nie twórz `lib/pages.ts`, `lib/locales.ts` — plugin ma resolveRoute, getConfiguredLocales

---

## 6. CHECKLIST NOWEGO PROJEKTU (fundament gotowy?)

- [ ] Struktura katalogów jak w §1
- [ ] `i18n.config.ts` — jedno źródło locale
- [ ] `lib/content.ts` + `lib/payload.ts` — jedyny dostęp do danych
- [ ] `proxy.ts` (nie middleware.ts)
- [ ] Bloki: folder na blok, registry spina, camelCase slugi
- [ ] Pola: camelCase, wspólne nazwy z §3
- [ ] `.env.example` z listą zmiennych (patrz deployment.md)
- [ ] Nazewnictwo wg §2 (PascalCase byty, camelCase helpery)

Jeśli wszystko ✓ — projekt ma standardowy fundament, każdy się w nim odnajdzie.

---

## DLACZEGO STANDARYZACJA

- **Każdy projekt wygląda tak samo** — wchodzisz i wiesz, gdzie co jest
- **Agent nie wymyśla** — ma jeden wzorzec, nie improwizuje za każdym razem
- **Redaktor uczy się raz** — te same nazwy pól wszędzie
- **Onboarding szybki** — nowa osoba zna układ z pierwszego projektu
- **Mniej błędów** — konwencje eliminują „a gdzie to położyć?"
