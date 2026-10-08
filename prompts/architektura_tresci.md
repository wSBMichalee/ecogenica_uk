# Architektura treści — jak budować, żeby klient mógł wszystko zmienić

Payload to **system zarządzania treścią**. Sedno: klient (redaktor, nie
developer) musi móc zmienić KAŻDY tekst, obraz, sekcję i stronę SAM, przez
panel, bez dotykania kodu i bez dzwonienia do Was. Jeśli klient musi prosić
developera o zmianę słowa na stronie — CMS jest zrobiony źle.

Ten dokument to filozofia + workflow. Mechanika bloków: [blocks.md](./blocks.md).
Setup projektu: [getting-started.md](./getting-started.md).

---

## FUNDAMENTALNA ZASADA

> **Wszystko, co widać na stronie, redaktor edytuje w panelu.**

Nie „większość". Nie „najważniejsze". **Wszystko**: nagłówki, akapity, przyciski
(tekst i link), obrazy, ikony, sekcje, kolejność sekcji, meta SEO, teksty
formularza, dane kontaktowe. Deweloper buduje **klocki i szablony**; redaktor
**składa z nich stronę** i **wypełnia treścią**.

**Test:** wyobraź sobie, że klient chce zmienić „Zadzwoń dziś" na „Skontaktuj
się z nami" i podmienić zdjęcie w hero. Jeśli musi do tego edytować kod —
zrobiłeś to źle. Powinien: wejść w panel, kliknąć pole, zmienić, zapisać.

---

## MODEL MYŚLENIA: komponent → blok → strona

Payload odwraca zwykły sposób budowy stron. Nie budujesz „strony o nas" jako
pliku. Budujesz **klocki**, a redaktor **układa z nich strony w panelu**.

```
1. KOMPONENT (kod)      → deweloper: wygląd + pola edytowalne
2. BLOK (schemat)       → deweloper: jakie pola redaktor wypełnia
3. STRONA (panel)       → redaktor: składa bloki, wypełnia treść
```

### Krok 1 — KOMPONENT (deweloper, RAZ)

Komponent to wizualny klocek: hero, sekcja tekstowa, galeria, CTA, FAQ, cennik.
Deweloper robi go **raz**, z pełną kontrolą wyglądu. KLUCZOWE: komponent NIE ma
żadnej treści na sztywno — wszystko przychodzi jako propsy (z panelu).

```tsx
// src/blocks/Hero/Component.tsx
// ŹLE — treść na sztywno (klient nie zmieni):
export function Hero() {
  return <section><h1>Witaj w naszej firmie</h1><button>Zadzwoń</button></section>
}

// DOBRZE — treść z propsów (z panelu):
export function Hero({ heading, subheading, image, ctaLabel, ctaHref }: HeroProps) {
  return (
    <section className="relative py-24">
      {image?.url && <img src={image.url} alt={image.alt} className="..." />}
      {heading && <h1 className="text-5xl font-bold">{heading}</h1>}
      {subheading && <p className="mt-4 text-xl">{subheading}</p>}
      {ctaLabel && ctaHref && <a href={ctaHref} className="btn">{ctaLabel}</a>}
    </section>
  )
}
```

Wygląd (kolory, spacing, animacje) — Twój, w kodzie. Treść (co pisze, jaki
obraz, dokąd link) — redaktora, z panelu. Ta granica jest święta.

### Krok 2 — BLOK (deweloper, RAZ)

Blok to **schemat pól**, które redaktor wypełni dla tego komponentu. Każde pole
= jedna rzecz, którą redaktor może zmienić. Wszystko `localized: true` (per
język), obrazy jako `upload`.

```ts
// src/blocks/Hero/config.ts
import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Hero' },   // czytelne w panelu
  fields: [
    { name: 'heading', type: 'text', localized: true },
    { name: 'subheading', type: 'textarea', localized: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'ctaLabel', type: 'text', localized: true },
    {
      name: 'ctaTarget', type: 'relationship', relationTo: 'pages',   // link jako relacja
    },
  ],
}
```

Pola mają **czytelne nazwy i opisy** — bo redaktor je zobaczy. Dodaj
`admin.description` tam, gdzie nieoczywiste („Zdjęcie tła sekcji, min. 1920px").

### Krok 3 — STRONA (redaktor, w panelu, BEZ kodu)

Teraz redaktor wchodzi w panel → Pages → nowa strona → dodaje bloki z listy
(Hero, Sekcja tekstowa, Galeria...) w dowolnej kolejności, wypełnia pola,
zapisuje. **Strona powstaje w panelu, nie w kodzie.**

To jest cała idea: deweloper dostarczył klocki (Krok 1-2), redaktor buduje
dowolną liczbę stron (Krok 3) bez dewelopera. Nowa strona = zero kodu.

---

## ARCHITEKTURA PLIKÓW

```
src/
  blocks/
    Hero/
      config.ts           # schemat pól (co redaktor edytuje)
      Component.tsx        # wygląd (propsy z panelu)
    TextSection/
      config.ts
      Component.tsx
    Gallery/
      config.ts
      Component.tsx
    Cta/
      config.ts
      Component.tsx
    registry.ts           # mapa blockType → komponent
  collections/
    Pages.ts              # pole 'layout' typu blocks (lista dostępnych bloków)
    Media.ts              # obrazy (z wariantami rozmiarów)
  globals/                # dane globalne (nagłówek, stopka, firma)
```

**Reguła:** jeden blok = jeden folder (config + Component razem). Registry spina
wszystko. Pages udostępnia bloki redaktorowi.

```ts
// src/blocks/registry.ts
import { Hero } from './Hero/Component'
import { TextSection } from './TextSection/Component'
// ... registry mapuje slug bloku → komponent
export const blockRegistry = { hero: Hero, textSection: TextSection, /* ... */ }
```

```ts
// src/collections/Pages.ts — redaktor wybiera bloki z tej listy
import { HeroBlock } from '@/blocks/Hero/config'
import { TextSectionBlock } from '@/blocks/TextSection/config'
// layout: { type: 'blocks', blocks: [HeroBlock, TextSectionBlock, ...] }
```

---

## CO GDZIE TRZYMAĆ (treść vs struktura)

| Rodzaj treści | Gdzie | Przykład |
|---|---|---|
| Treść strony (zmienna per strona) | **bloki** w Pages | hero, sekcje, CTA |
| Powtarzalne globalnie | **globals** | nagłówek, stopka, dane firmy |
| Teksty UI/systemowe | **globals** (Notifications, Cookie) | komunikaty formularza, baner cookies |
| Obrazy | **kolekcja Media** | wszystkie zdjęcia, z wariantami |
| Meta SEO | **pola SEO** (plugin) | title, description per strona/język |
| Nawigacja | **global** header/footer | menu jako relationship→pages |

**Zasada:** jeśli treść jest na jednej stronie → blok. Jeśli powtarza się wszędzie
(stopka) → global. Nigdy w kodzie.

---


---

## NARZĘDZIA: podział pracy AI (Antigravity + Impeccable)

W workflow projektowym używamy DWÓCH narzędzi AI o różnych rolach:

- **Antigravity** — buduje **kod i logikę**: kolekcje, bloki, pola, routing,
  integracje, funkcjonalność. Odpowiada za to, że strona DZIAŁA i że treść jest
  edytowalna (wszystko przez panel).
- **Impeccable** ([impeccable.style](https://impeccable.style)) — dopracowuje
  **wygląd**: kolory, typografia, spacing, komponenty, animacje. Odpowiada za to,
  że strona WYGLĄDA dobrze i spójnie.

**Podział:** Antigravity stawia klocki (Krok 1-2: komponent + blok, funkcjonalne
ale surowe wizualnie). Impeccable je dopracowuje wizualnie (kolory, typografia,
detale). Redaktor składa strony z gotowych, dopracowanych klocków (Krok 3).

### GRANICA (ważne — nie łam „nic na sztywno")

Impeccable dotyczy **wyglądu komponentów** (warstwa kodu/dewelopera), NIE treści:

| Impeccable stylizuje | Panel Payload trzyma |
|---|---|
| Kolory, typografia, spacing | Teksty (localized) |
| Wygląd bloku (layout, detale) | Obrazy (upload) |
| Animacje, przejścia | Linki (relationship) |
| System wizualny (DESIGN.md) | Dane firmy, nawigacja |

Design tokeny w `DESIGN.md` to NIE „treść na sztywno" — to system wizualny, który
i tak jest w kodzie (Tailwind/CSS). Impeccable go porządkuje i pilnuje spójności.
Treść dalej idzie z panelu. Te dwie warstwy się nie kłócą — jedna to WYGLĄD
klocka (kod), druga to TREŚĆ w klocku (panel).

### Jak Impeccable działa (dla agenta)

Impeccable czyta kontekst projektu z dwóch plików, które tworzysz raz:

- **PRODUCT.md** — strategia: platforma, odbiorcy, cel, pozycjonowanie marki
- **DESIGN.md** — system wizualny: kolory, typografia, komponenty, radii, reguły

Setup (raz na projekt, z roota):
```bash
/impeccable init        # tworzy PRODUCT.md (strategia)
/impeccable document    # tworzy DESIGN.md (system wizualny) + .impeccable/design.json
```

Impeccable szuka tych plików w roocie, a jeśli nie ma — też w `.agents/context/`
i `docs/`. W monorepo każdy workspace ma własne, z fallbackiem do roota.

Praca na konkretnej stronie (Impeccable dobiera standard wg roli strony):
```bash
/impeccable polish the marketing homepage    # strona sprzedażowa — ma przyciągać
/impeccable audit the billing settings        # panel — ma „zniknąć", być czytelny
```

Cztery tryby (Impeccable wybiera wg roli strony, nie wg tego, co firma sprzedaje):
- **Persuade** — landing/marketing (design przyciąga, wyrazista typografia)
- **Operate** — panel/dashboard (gęstość, przewidywalność, spokój)
- **Read** — dokumentacja/blog (czytelność przede wszystkim)
- **Experience** — portfolio/galeria (dzieło prowadzi, interfejs znika)

Utrzymanie kontekstu: `PRODUCT.md` aktualizuj przy zmianie strategii/odbiorców;
`DESIGN.md` przy zmianie palety/typografii/komponentów. `/impeccable doctor`
sprawdza, co się zdezaktualizowało.

### Reguła dla agenta

- **Antigravity NAJPIERW** — zbuduj funkcjonalność, edytowalność (panel), logikę.
  Strona ma działać i być zarządzalna przez klienta.
- **Impeccable POTEM** — dopracuj wygląd gotowych, działających komponentów.
- **Nie myl warstw** — Impeccable nie rusza treści (to panel), Antigravity nie
  „dopieszcza" wizualnie ad hoc (to Impeccable, spójnie, z DESIGN.md).
- **Zapisz reguły projektu** — jeśli pracujesz jako agent, umieść kluczowe
  ustalenia (stack, zasady, tryby stron) we własnym pliku kontekstu agenta
  (`agents.md` / `.agents/context/`), żeby nie gubić ich między sesjami.

## WZORCE EDYTOWALNOŚCI (jak zrobić różne rzeczy edytowalnymi)

### Tekst → pole localized
```ts
{ name: 'heading', type: 'text', localized: true }        // krótki
{ name: 'body', type: 'textarea', localized: true }       // dłuższy
{ name: 'content', type: 'richText', localized: true }    // formatowany (pogrubienia, listy, linki)
```
RichText gdy redaktor potrzebuje formatowania (pogrubienie, nagłówki, listy).
Text/textarea gdy zwykły tekst.

### Obraz → upload
```ts
{ name: 'image', type: 'upload', relationTo: 'media' }
```
Warianty rozmiarów konfiguruj w kolekcji Media (`imageSizes`) — redaktor wgrywa
raz, system generuje rozmiary.

**Normalizacja nazw plików:** wepnij `normalizeFilenameHook` w kolekcję Media —
nazwy wgrywanych plików są automatycznie czyszczone („Zdjęcie nad morzem.jpg" →
„zdjecie-nad-morzem.jpg"). Czyste URL-e, przenośność, bez problemów z kodowaniem.
Redaktor wgrywa plik o dowolnej nazwie, system ją porządkuje. Patrz storage.md.

**Media obsługiwane przez plugin (nie hardkoduj w projekcie):**
- Favicon → `buildIconsMetadata(settings.favicon)` w root layout (z panelu,
  poprawne tagi dla Google). NIE renderuj favicon ręcznie.
- Logo/branding → `buildOrganizationJsonLd(...)` (structured data z panelu).
- Preconnect do CDN mediów → `<MediaPreconnect/>` (domena z env, NIE zaszyta).
Wszystko czyta z panelu/env — redaktor zmienia favicon/logo w panelu, kod podąża.

### Link → relationship albo pole tekstowe
```ts
// wewnętrzny (redaktor wybiera stronę):
{ name: 'target', type: 'relationship', relationTo: 'pages' }
// zewnętrzny (dowolny URL):
{ name: 'url', type: 'text' }
```

### Powtarzalne elementy → array
Gdy redaktor ma dodawać N elementów (lista usług, FAQ, opinie):
```ts
{
  name: 'faqs', type: 'array', localized: true,
  fields: [
    { name: 'question', type: 'text' },
    { name: 'answer', type: 'textarea' },
  ],
}
```
Redaktor dodaje/usuwa/przestawia elementy w panelu.

### Wybór z opcji → select
```ts
{ name: 'style', type: 'select', options: ['jasny', 'ciemny'], defaultValue: 'jasny' }
```

---

## CZĘSTE BŁĘDY (antywzorce CMS)

| Antywzorzec | Dlaczego źle | Zamiast |
|---|---|---|
| Tekst w JSX (`<h1>Witaj</h1>`) | klient nie zmieni | pole localized |
| `import img from '@/hero.jpg'` | klient nie podmieni | upload → media |
| Osobny plik na każdą stronę | nie skaluje się, klient nie utworzy nowej | bloki + panel |
| Tekst per język przez `if (locale)` | duplikacja, klient nie zmieni | localized: true |
| „Sekcja o nas" zahardkodowana | klient nie przestawi/usunie | blok w layout |
| Dane firmy w kodzie | klient nie zaktualizuje | global company |
| Menu jako tablica w kodzie | klient nie zmieni nawigacji | global + relationship |

---

## TEST GOTOWOŚCI (czy to naprawdę CMS)

Zanim oddasz stronę, sprawdź — czy REDAKTOR (nie Ty) potrafi przez panel:

- [ ] Zmienić dowolny nagłówek i akapit, w każdym języku
- [ ] Podmienić dowolne zdjęcie
- [ ] Zmienić tekst i cel dowolnego przycisku
- [ ] Dodać nową sekcję do strony (nowy blok)
- [ ] Usunąć sekcję / zmienić kolejność sekcji
- [ ] Utworzyć CAŁKIEM NOWĄ stronę z bloków
- [ ] Zmienić dane w stopce (telefon, adres)
- [ ] Zmienić menu (dodać/usunąć link)
- [ ] Zmienić meta SEO strony
- [ ] Zmienić teksty formularza i baneru cookies

Jeśli COKOLWIEK wymaga developera — to nie jest jeszcze CMS. Przenieś tę rzecz
do panelu (pole/blok/global). Dopiero gdy wszystkie punkty są ✓, klient jest
naprawdę niezależny — a o to chodzi w Payload.

---

## DLACZEGO TO SIĘ OPŁACA

- **Klient jest samodzielny** — zmiany treści bez Was, natychmiast
- **Wy nie jesteście wąskim gardłem** — nie dzwonią o każdą literówkę
- **Skaluje się** — klient tworzy 5 czy 50 stron bez nowego kodu
- **Wielojęzyczność za darmo** — localized robi to automatycznie
- **Jedna strona = jeden zestaw bloków** — reużywasz je w kolejnych projektach

To jest różnica między „zbudowaliśmy stronę" a „daliśmy klientowi system, którym
zarządza sam". Payload jest do tego drugiego — wykorzystaj to w pełni.
