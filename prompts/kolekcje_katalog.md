# Katalog kolekcji — co budować i jak (wytyczne dla agenta)

## ⛔ STOP — ZANIM STWORZYSZ KOLEKCJĘ, PRZECZYTAJ

**Twórz MINIMUM kolekcji, nie maksimum.** Domyślnie projekt ma TYLKO rdzeń
(pages, media, settings, navigation, footer). Kolekcję treści (blog, produkty)
dodajesz **wyłącznie**, gdy klient JAWNIE jej potrzebuje. Nie „na zapas", nie
„bo może się przyda", nie „dla kompletności".

**NIE TWÓRZ tych kolekcji NIGDY** (to NIE są kolekcje):
- ❌ `users` / `użytkownicy` — Payload MA wbudowaną kolekcję users (auth). NIE
  twórz własnej. Nie dotykaj, chyba że dodajesz pole do istniejącej.
- ❌ `media` jako nowa — Payload/projekt MA już Media. Jedna, nie wiele.
- ❌ `daneFirmy` / `companyData` / `dane` — to GLOBAL (siteSettings albo company),
  NIE kolekcja. Jeden zestaw danych = global.
- ❌ `settings` / `konfiguracja` jako kolekcja — to GLOBAL.
- ❌ `navigation`, `footer`, `seo`, `theme` jako kolekcje — to GLOBALE.
- ❌ kolekcja dla bloku (FAQ, hero, features, CTA, gallery) — to BLOKI, część strony.
- ❌ kolekcja dla pojedynczej rzeczy (jeden „about", jeden „kontakt") — to STRONA
  w pages albo global.

**Test PRZED stworzeniem kolekcji (wszystkie muszą być TAK):**
1. Czy to LISTA wielu rekordów tego samego typu? (nie: jeden zestaw → global)
2. Czy każdy rekord ma WŁASNY URL? (nie: sekcja strony → blok)
3. Czy klient JAWNIE tego potrzebuje? (nie: nie twórz)
4. Czy Payload NIE ma tego wbudowanego? (users są wbudowane — nie duplikuj)

Jeśli którykolwiek = NIE → to NIE jest kolekcja. Zostaw to jako global, blok,
stronę, albo w ogóle nie twórz.

**Domyślny projekt = 5 bytów rdzenia + globale. Nic więcej, dopóki klient nie
wymaga konkretnej treści (blog/sklep/portfolio).**

---

Które kolekcje tworzyć w projekcie, kiedy, jak nazwać i jak wpiąć w ipal-kit.
Nie każdy projekt ma wszystkie — dobierasz wg typu strony. Uniwersalne (rdzeń)
są zawsze; reszta TYLKO gdy klient jawnie potrzebuje.

Powiązane: [fundamenty-projektu.md](./fundamenty-projektu.md) (nazewnictwo),
[pages.md](./pages.md) (Pages + routing), [architektura-tresci.md](./architektura-tresci.md).

> **Zasada:** plugin NIE dostarcza gotowych kolekcji projektowych (blog, sklep) —
> daje mechanizm (buildSlugField, SEO, sitemap, resolveRoute obsługują dowolne
> kolekcje). Ty tworzysz kolekcje wg tego katalogu i wpinasz w plugin.

---

## RDZEŃ — zawsze (każdy projekt)

Te kolekcje/globale ma KAŻDY projekt, niezależnie od typu:

| Byt | Typ | Rola |
|---|---|---|
| `pages` | collection | Strony budowane z bloków (Pages) |
| `media` | collection (upload) | Obrazy, pliki |
| `siteSettings` | global | Nazwa, logo, favicon, SEO domyślne, homepage |
| `siteIntegrations` | global | Klucze API (analytics, Turnstile, SMTP) — admin-only |
| `navigation` | global | Menu główne |
| `footer` | global | Stopka (linki, treść) |

Media MUSI mieć `normalizeFilenameHook` (czyste nazwy) — patrz storage.md.
Pages MUSI mieć slug (buildSlugField) + SEO tab + role System Pages.

---

## COMPLIANCE — gdy strona zbiera dane / w EU (prawie zawsze)

| Byt | Typ | Rola |
|---|---|---|
| `forms` (+ submissions) | collection | Formularze z buildera (NIE własne!) |
| System Pages (role) | — | privacyPolicy, cookiePolicy, termsOfService |

Patrz wymagania-prawne.md. Formularze ZAWSZE z buildera pluginu.

---

## TREŚĆ — wg typu strony (dobierasz)

### Blog / aktualności
| Byt | Typ | Rola |
|---|---|---|
| `blogPosts` (albo `posts`) | collection | Wpisy blogowe |
| `authors` | collection | Autorzy (relacja z postami) |
| `categories` | collection | Kategorie (relacja) |

- Post: slug, SEO tab, `publishedAt` (data), relacja `author`, `category`,
  `coverImage` (upload), treść (bloki albo richText)
- Wpięcie: kolekcja w `contentConfig` (archiwum + prefix) → resolveRoute,
  sitemap, generateStaticParams obsłużą automatycznie
- Structured data: `buildArticleJsonLd` per post (patrz seo.md)

### Sklep / katalog produktów
| Byt | Typ | Rola |
|---|---|---|
| `products` | collection | Produkty |
| `categories` | collection | Kategorie produktów |

- Produkt: slug, SEO, `price`, `images`, opis (bloki), relacja `category`
- Structured data: Product/Offer schema (dorób helper jeśli trzeba)

### Usługi (agencja, firma usługowa)
| Byt | Typ | Rola |
|---|---|---|
| `services` (albo strony w `pages`) | collection/pages | Usługi |

- Zwykle strony usług to Pages z flagą `isService` (nie osobna kolekcja) —
  patrz seo.md (buildServiceJsonLd). Osobna kolekcja tylko gdy usług dużo i mają
  wspólną strukturę.

### Portfolio / realizacje
| Byt | Typ | Rola |
|---|---|---|
| `projects` (albo `portfolio`) | collection | Realizacje |

- Slug, SEO, galeria, opis, `completedAt`

### Opinie / referencje
| Byt | Typ | Rola |
|---|---|---|
| `testimonials` | collection | Opinie klientów |

- Zwykle BEZ własnej trasy (renderowane w bloku na stronie, nie osobne URL-e).
  Nie dodawaj do contentConfig (nie ma stron /testimonials/x).

---

## TECHNICZNE — wg potrzeb

| Byt | Typ | Kiedy |
|---|---|---|
| `redirects` | collection | Migracja ze starej strony (301) — mapowanie stary→nowy URL |
| `theme` | global | Gdy klient zmienia kolory/style z panelu (rzadko — zwykle w kodzie) |
| `socialLinks` | global | Linki społecznościowe (jeśli nie w footer) |

---

## DECYZJA: kolekcja czy blok/global?

Częsty błąd — robić kolekcję dla czegoś, co powinno być blokiem albo globalem.

- **Kolekcja** → gdy byt ma WŁASNY URL (post, produkt, realizacja mają /blog/x)
  ALBO jest listą wielu rekordów zarządzanych osobno.
- **Global** → gdy JEDEN zestaw danych na całą stronę (nawigacja, stopka,
  ustawienia). Nie ma listy, nie ma URL-i.
- **Blok** → gdy treść jest CZĘŚCIĄ strony (hero, features, CTA, FAQ, galeria).
  Renderowana w Pages, nie osobno.

Test: „czy to ma własny adres URL?" → tak: kolekcja. „Czy jeden na stronę?" →
global. „Czy to sekcja strony?" → blok.

Przykłady:
- Opinie → BLOK (sekcja na stronie) albo kolekcja bez trasy (jeśli zarządzane osobno)
- FAQ → BLOK (sekcja), nie kolekcja
- Blog post → KOLEKCJA (własny URL /blog/x)
- Nawigacja → GLOBAL (jeden zestaw)

---

## WPIĘCIE KOLEKCJI TREŚCI W PLUGIN

Kolekcja z własnymi URL-ami (blog, produkty) → dodaj do `contentConfig`:

```ts
// lib/content.ts
const contentConfig = {
  collections: [
    {
      slug: 'blogPosts',
      // archiwum: strona listująca (np. /blog), prefix slug per język
      archiveSlug: 'blog',   // albo mapa { pl: 'blog', en: 'blog' }
    },
  ],
}

export const { resolveRoute, sitemap, robots, generateStaticParams } =
  createContentHelpers({ config, content: contentConfig, i18n: i18nConfig, baseUrl })
```

Wtedy plugin automatycznie: routing (resolveRoute), sitemap (per wpis),
generateStaticParams (SSG per wpis), hreflang. Zero własnej logiki routingu.

Kolekcja BEZ tras (testimonials renderowane w bloku) → NIE dodawaj do
contentConfig. Renderuj przez blok na stronie.

---

## POLA WSPÓLNE — nazewnictwo (spójność między projektami)

Każda kolekcja treści powinna mieć:
- `slug` — buildSlugField (auto z tytułu)
- SEO tab — meta.title, meta.description, meta.noindex (plugin-seo)
- `title` — nazwa (używana jako fallback tytułu, patrz seo.md)

Nazwy pól wg fundamenty-projektu.md (camelCase, wspólne: heading, body, image,
ctaLabel). Slugi kolekcji camelCase l.mn. (`blogPosts`, `products`).

---

## CHECKLIST — nowa kolekcja treści

- [ ] slug camelCase l.mn. (`blogPosts`)
- [ ] buildSlugField (auto-slug z tytułu)
- [ ] SEO tab (plugin-seo)
- [ ] pole `title` (fallback tytułu)
- [ ] jeśli ma URL → contentConfig (routing/sitemap/SSG)
- [ ] jeśli upload → normalizeFilenameHook
- [ ] relacje (author, category) jeśli potrzebne
- [ ] structured data (Article/Product) jeśli dotyczy
- [ ] NIE kolekcja, jeśli to blok (FAQ, hero) albo global (nav, footer)
