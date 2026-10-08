# 07 — SEO i migracja z obecnej strony

Stan wyjściowy: Next.js bez CMS, 8 podstron, PDF-y w `/public`. Domena zostaje
`ecogenica.co.uk`. Cel: zero utraconych URL-i, poprawny `<head>` dla botów,
strony produktowe na frazy modelowe, przewodnik BUS na frazy grantowe.

---

## 1. Mapa przekierowań 301 (kolekcja `redirects`)

| Stary URL | Nowy URL |
|---|---|
| `/product` | `/heat-pumps` |
| `/about` | `/about` (bez zmian) |
| `/warranty` | `/support#warranty` → w praktyce `/support` (fragment nie idzie w 301) |
| `/manuals` | `/support/manuals` |
| `/enquire-now` | `/contact` |
| `/homeowner-enquiry-form` | `/get-a-quote` |
| `/customer-terms-conditions` | `/terms` |
| `/privacy-policy` | `/privacy-policy` (bez zmian) |
| `/OutBackFlyer/Outback_Flyer_ProductPage.pdf` | nowy URL brochure z media (R2) |
| `/Wallaroo_Flyer.pdf` | nowy URL Wallaroo brochure |
| `/OutBackFlyer/new/Outback_5kW_Homeowners_Manual.pdf` (×4 modele) | nowe URL-e manuali |
| `/manuals/Outback_Installers_Manual_31JUL26[52].pdf` | nowy URL installer manual |
| `/request-access-to-personal-data/` i 8 pozostałych formularzy z polityki | `/contact` (lub nowy formularz data request) |

Jeśli i18n wymusi prefiks `/en` — dodatkowe 301 z każdej ścieżki bez prefiksu
(sprawdzić, czy proxy pluginu robi to automatycznie).
PDF-y z R2: przekierowanie wykonuje Next (redirects z kolekcji), nie Cloudflare
— jedno źródło prawdy w panelu.

`trackSlugHistoryHook` pilnuje 301 przy przyszłych zmianach slugów.

## 2. Mapa słów kluczowych → strony

| Strona | Fraza główna | Frazy wspierające |
|---|---|---|
| Home | air source heat pump UK | R290 heat pump, heat pump installation |
| /heat-pumps | R290 monobloc heat pump | 5kW / 8kW / 11kW / 16kW heat pump, heat pump sizes |
| /heat-pumps/outback-8kw (×4) | 8kW air source heat pump | ECO-ZR03FC, 8kW heat pump specs, single phase |
| /heat-pumps/wallaroo | outdoor heat pump with cylinder | heat pump no cylinder space, all-in-one heat pump |
| /boiler-upgrade-scheme | boiler upgrade scheme | heat pump grant, £7,500 / £9,000 grant, BUS eligibility |
| /how-it-works | heat pump installation process | how long does a heat pump install take |
| /installers | heat pump installer partner | R290 heat pump supplier UK, MCS installer |
| /support | heat pump warranty | register heat pump |
| /faq | heat pump FAQ | are heat pumps noisy, do heat pumps work in cold weather |

Wolumeny i trudność — do sprawdzenia w Ahrefs/Semrush przed finalizacją copy
(nie w tym planie).

## 3. Nagłówki i meta (zasady)
- Jeden H1 na stronę (pierwszy blok hero), H2 per sekcja, H3 w kartach — poziomy
  bez przeskoków (Impeccable *skipped heading level*).
- `meta.title` 50–60 znaków, fraza na początku, **bez** nazwy marki — plugin
  dokleja siteName (nie dublować).
- Home: `titleOverride`.
- OG image per strona (rozmiar `og`), domyślny z `siteSettings`.
- Strony prawne: `noindex` (follow).

## 4. Structured data
| Gdzie | Typ | Helper |
|---|---|---|
| root layout | Organization (logo, adresy, telefony, sameAs) | `buildOrganizationJsonLd` |
| root layout | WebSite (bez SearchAction — brak wyszukiwarki) | `buildWebSiteJsonLd` |
| root layout | SiteNavigationElement | `buildSiteNavigationJsonLd` |
| podstrony | BreadcrumbList | `buildBreadcrumbJsonLd` |
| produkty | Product (+Offer jeśli cena) | raport do pluginu |
| /heat-pumps | ItemList | raport do pluginu |
| strony z FAQ | FAQPage (treść = widoczne Q&A) | `buildFaqJsonLd` |
| /how-it-works, /installers | Service (opcjonalnie) | `buildServiceJsonLd` |

## 5. Techniczne (z `migracja_projekty.md` — obowiązkowe od dnia 1)
- [ ] `htmlLimitedBots` w `next.config.ts`
- [ ] layout bez jawnego `<head>`, `MediaPreconnect` w `<body>`
- [ ] `revalidate = 3600` + `generateStaticParams` w `[[...slug]]`
- [ ] `app/robots.ts` z `lib/content`; disallow: panel (`/its`), `/api`
- [ ] `app/sitemap.ts` + `export const dynamic = 'force-dynamic'`; bez 404/noindex
- [ ] favicon PNG 192×192 w panelu (`buildIconsMetadata`)
- [ ] `manifest.ts` z panelu, brak danych = pomiń pole
- [ ] `llms.txt` i cała warstwa GEO (boty AI, Bing, spójność encji) — patrz `11-geo-ai-search.md`
- [ ] Weryfikacja curl Googlebot ×10 (canonical/title/favicon w `<head>`)

## 6. Po starcie
1. Search Console: nowa sitemap, usunąć starą; inspekcja Home + 4 produkty + BUS.
2. Monitoring 404 (log Coolify / Cloudflare) przez 30 dni → dopisywać redirects.
3. Porównanie ruchu organicznego 4 tygodnie przed/po.
4. Faza 2 (decyzja klienta): sekcja „Guides” (blogPosts) na frazy informacyjne
   (heat pump running costs, R290 vs R32, radiators for heat pumps).
