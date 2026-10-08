# Playbook wdrożenia — ipal-kit

Sztywna procedura dla pracownika albo AI (Antigravity). Mówi CO robić, W JAKIEJ
KOLEJNOŚCI, i CZYM SIĘ KIEROWAĆ. Zasady są twarde, przykłady realne — wzięte z
faktycznych błędów, które się zdarzyły. Odstępstwa tylko za świadomą decyzją.

Powiązane: [standardy-kodu.md](./standardy-kodu.md) (dobre praktyki senior),
[publishing.md](./publishing.md) (cykl publikacji), [getting-started.md](./getting-started.md)
(nowy projekt), ../antigravity_zasady_agent.md (zasady dla AI).

---

## ZŁOTE ZASADY (łam tylko świadomie)

1. **Nic na sztywno.** Tekst, obraz, link, dane firmy → panel/baza, nie kod.
2. **Logika w pluginie, projekt podłącza.** Jeśli piszesz w projekcie coś, co
   robi już plugin — zatrzymaj się, użyj pluginu.
3. **Next 16 = proxy.ts.** NIGDY middleware.ts. Jeśli istnieje — usuń.
4. **Weryfikuj każdy etap grepem.** Nie zakładaj, że zadziałało. Sprawdź.
5. **Napraw u źródła, nie łataj.** Bez `as any`, `@ts-ignore`, kopii logiki.
6. **Zmiana w pluginie nie działa, dopóki nie: build → publish → wciągnięcie.**
7. **Zmieniłeś API → zaktualizuj docs w tym samym commicie.** Docs jadą w
   pakiecie; rozjazd kod↔docs = agent dostaje złą mapę.

---

## CZĘŚĆ A — ŁAŃCUCH ZMIANY W PLUGINIE (najważniejsze)

Najczęstsze źródło frustracji tej sesji: „zmieniłem kod, a nie działa". Prawie
zawsze przyczyna: **przerwany łańcuch**. Zmiana w pluginie przechodzi przez
PIĘĆ etapów. Pominięcie któregokolwiek = stara wersja w projekcie.

```
źródła (src) → build (dist) → publish (rejestr) → wciągnięcie (node_modules) → restart
```

### Sztywna procedura zmiany w pluginie

```bash
cd ~/payload-cms/ipal-kit

# 1. ŹRÓDŁA — nanieś zmianę, ZWERYFIKUJ że jest
grep -c "<symbol-zmiany>" src/<ścieżka>            # MUSI być >0

# 1b. DOCS — jeśli zmiana dotyka API/zachowania, ZAKTUALIZUJ docs/
#     (nowa funkcja, zmiana sygnatury, nowe pole panelu, nowy adapter...).
#     Docs jadą w pakiecie (files: dist, docs) — nieaktualne docs = agent
#     dostaje złą mapę. Kod i docs publikuj RAZEM.

# 2. BUILD — zbuduj, ZWERYFIKUJ że dist ma zmianę
pnpm build
grep -c "<symbol-zmiany>" dist/<ścieżka>           # MUSI być >0

# 3. COMMIT (PRZED version — inaczej "working directory not clean")
git add -A && git commit -m "opis"

# 4. VERSION + PUBLISH
npm version patch                                   # czyste repo wymagane
npm publish

# 5. PUSH
git push && git push --tags

# 6. PROJEKT — wciągnij, ZWERYFIKUJ że node_modules ma zmianę
cd ~/<projekt>
pnpm add @intecion/ipal-kit@<nowa-wersja>
grep -c "<symbol-zmiany>" node_modules/@intecion/ipal-kit/dist/<ścieżka>   # MUSI być >0

# 7. RESTART dev (Payload buduje adaptery/config przy starcie!)
pnpm dev
```

### TRZY punkty kontrolne grep (nie pomijaj żadnego)

| Etap | Grep | Jeśli 0 |
|---|---|---|
| po edycji | `src/...` | zmiana nie zapisana / zły plik |
| po build | `dist/...` | build nie złapał / błąd typów |
| po pnpm add | `node_modules/...` | projekt ma starą wersję |

**Realny przykład (z tej sesji):** `buildSecurityHeaders is not a function`.
Przyczyna: moduł istniał w `src`, ale NIE był wyeksportowany w `src/index.ts`
→ `dist` go nie miał → import w projekcie = undefined. Grep `dist/index.js`
pokazał 0. Naprawa: dodać eksport, przejść łańcuch od nowa.

### Pułapki kolejności (realne błędy sesji)

- **`npm version` przed commitem** → "Git working directory not clean". ZAWSZE
  commit przed version.
- **`npm publish` bez `pnpm build`** → publikujesz STARY dist. ZAWSZE build przed
  publish, grep dist po buildzie.
- **`pnpm add` przy działającym dev** → proces ma stary adapter w pamięci.
  Payload czyta email/config przy starcie. ZAWSZE restart po wciągnięciu.
- **Publikacja bez aktualizacji docs** → agent (Antigravity) po `pnpm add`
  czyta `node_modules/@intecion/ipal-kit/docs/` z NIEAKTUALNĄ mapą. Jeśli
  zmieniłeś API — docs w tym samym commicie.

---

## CZĘŚĆ B — GREP JAKO NARZĘDZIE (jak weryfikować dobrze)

Grep był w tej sesji głównym narzędziem diagnozy. Ale trzeba go używać mądrze.

### Reguła: grepuj TOKENY, nie całe frazy z kolejnością

**Realny błąd:** grep `"env.sender, name: senderName"` dał 0, choć kod był OK —
bo plik miał odwróconą kolejność kluczy (`name: senderName, address: env.sender`).
Obiekt JS ignoruje kolejność, ale grep nie.

```bash
# ŹLE — zależny od kolejności/formatowania:
grep -c "env.sender, name: senderName" plik.ts        # 0 mimo poprawnego kodu

# DOBRZE — pojedynczy token, odporny:
grep -c "senderName" plik.ts                          # 3 ✓
```

Grepuj **nazwę symbolu** (funkcja, zmienna, eksport), nie całą linię z interpunkcją.

---

## CZĘŚĆ C — DIAGNOSTYKA „KOD DOBRY, ZACHOWANIE ZŁE"

Gdy grep potwierdza kod, wersja nowa, a zachowanie stare — przejdź listę:

1. **Dev nie zrestartowany?** Payload buduje adaptery/config przy starcie.
   Ctrl+C + `pnpm dev`. (Najczęstsza przyczyna.)
2. **Zmiana zapisana w panelu?** Endpointy czytają z BAZY, nie z pola na ekranie.
   Kliknij Save.
3. **Zdublowana zależność?** `@payloadcms/ui` w node_modules pluginu = dwie
   instancje = hooki bez kontekstu. Sprawdź:
   `ls node_modules/@intecion/ipal-kit/node_modules/@payloadcms/ui`
   Jest? → peerDependency problem (patrz Część D).
4. **Cache klienta?** Np. klient pocztowy pokazuje zapamiętaną nazwę nadawcy
   mimo poprawnych nagłówków. Sprawdź surowe źródło (View Source), wyślij na
   inny adres.
5. **Import map nieaktualny?** Custom komponenty Payload:
   `npx payload generate:importmap`.

**Realny przykład:** MaskedField rzucał "Cannot destructure property 'config'".
Kod OK. Przyczyna: dublet `@payloadcms/ui` (plugin miał własną kopię) →
`useField` z jednej instancji nie widział kontekstu z drugiej. Naprawa w Część D.

---

## CZĘŚĆ D — peerDependencies (dublety zależności)

**Zasada:** wszystko, co dostarcza PROJEKT, jest `peerDependency` w pluginie,
NIE `dependency`. Inaczej menedżer instaluje własną kopię dla pluginu → dublet
→ React/Payload context się rozjeżdża (dwie instancje nie widzą się nawzajem).

Peer (projekt dostarcza): `payload`, `@payloadcms/ui`, `@payloadcms/next`,
`@payloadcms/plugin-*`, `react`, `react-dom`, `next`.

**Realny błąd:** `@payloadcms/ui` był tylko w devDependencies (brak w peer) →
pnpm dołożył kopię pluginowi → MaskedField/TestEmailButton/CookieBanner
wszystkie się psuły (hooki bez kontekstu). Naprawa: dodać do peerDependencies,
opublikować, w projekcie `rm -rf node_modules/@intecion/ipal-kit && pnpm add`.

Weryfikacja braku dubletu:
```bash
ls node_modules/@intecion/ipal-kit/node_modules/@payloadcms/ui 2>/dev/null \
  && echo "DUBLET ✗" || echo "OK ✓"
```

---

## CZĘŚĆ E — NOWY PROJEKT KLIENCKI (kolejność)

Pełne szczegóły: [getting-started.md](./getting-started.md). Tu skrót kolejności.

1. **Szkielet** Payload 3 + Next 16, pnpm, Node 22
2. **`.npmrc`** — `legacy-peer-deps=true` + rejestr `@intecion`
3. **`pnpm add @intecion/ipal-kit`** + zależności peer
4. **build script z `--webpack`** (Next 16 + Payload; Turbopack konfliktuje)
5. **i18n.config.ts** — jedno źródło locale
6. **payload.config.ts** — ipalKit({...}), `email: mailAdapter()`
7. **Kolekcje/globale** — wszystko localized/upload (nic na sztywno)
8. **lib/content.ts + lib/payload.ts** — helpery, jedno źródło getCachedPayload
9. **proxy.ts** (NIE middleware.ts) — routing locale, obsługa roota
10. **Bloki** — dane przez enhanceProps, nie import lib (cykl)
11. **buildSlugField** zamiast ręcznego slug
12. **getLocalizedSlugs** zamiast zaszytej mapy ścieżek
13. **buildSecurityHeaders** w next.config
14. **Test:** root `/` przekierowuje, formularz wysyła, panel działa

---

## CZĘŚĆ F — EMAIL (SMTP vs Graph)

Pełne szczegóły: [email.md](./email.md). Decyzja transportu:

- **Klient na M365/Exchange** → Graph (SMTP AUTH na M365 często wyłączony)
- **Klient z własnym SMTP / Gmail** → SMTP
- **Przełącznik:** panel → Site Integrations → SMTP → Email Transport
- **Dyspozytor:** `email: mailAdapter()` czyta wybór przy każdej wysyłce

### Graph — checklist wdrożenia (Wasza strona, jednorazowo)

1. Azure: App registration → tenantId, clientId, clientSecret
2. Azure: Mail.Send APPLICATION permission + **Grant admin consent**
3. `.env` projektu: GRAPH_TENANT_ID, GRAPH_CLIENT_ID, GRAPH_CLIENT_SECRET, GRAPH_SENDER
4. Panel: From Name (nazwa nadawcy), From Address (→ reply-to)

### Realne pułapki Graph (wszystkie zdarzyły się w sesji)

| Błąd | Przyczyna | Naprawa |
|---|---|---|
| `ErrorSendAsDenied` | `from` ≠ sender | from.address = GRAPH_SENDER, klient w replyTo |
| nazwa „Noreply" mimo panelu | Exchange nadpisuje / cache klienta | display name skrzynki / sprawdź nagłówki |
| `Insufficient privileges` | brak admin consent | Grant admin consent w Azure |
| `AADSTS1002012` | zły scope | scope = `.../.default`, nie Mail.Send |

**Zasada from/replyTo:** `from.address` ZAWSZE = GRAPH_SENDER (wspólna skrzynka,
zero Send-As). Nazwa (`from.name`) z panelu — różna per projekt. Adres klienta
→ replyTo (odpowiedzi trafiają do klienta).

---

## CZĘŚĆ G — CO NALEŻY DO PLUGINU, A CO DO PROJEKTU

Powtarzalne pytanie. Reguła: **jeśli zależy od danych/domen konkretnego projektu
→ projekt. Jeśli identyczne wszędzie → plugin.**

| Rzecz | Gdzie | Dlaczego |
|---|---|---|
| i18n, SEO meta, forms, consent, blog | plugin | uniwersalne |
| Powiadomienia (teksty wyników) | plugin | uniwersalne, per język z panelu |
| Zgoda RODO (enforcement) | plugin | uniwersalne, server-side |
| Nagłówki bezpieczeństwa (HSTS...) | plugin | identyczne wszędzie |
| Email (SMTP + Graph) | plugin | uniwersalne, konfiguracja z panelu/env |
| **CSP** | **projekt** | zależy od domen projektu |
| **schema.org / JSON-LD** | **projekt** | zależy od danych firmy |
| **Breadcrumbs** | **projekt** | render z danych routingu projektu |
| **Dane rejestrowe firmy** | **projekt** | różne per typ firmy |

---

## CZĘŚĆ H — CHECKLIST PRZED „GOTOWE"

Nie mów „działa", dopóki:

- [ ] `pnpm build --webpack` przechodzi lokalnie (nie tylko dev)
- [ ] root `/` przekierowuje na locale (bez middleware.ts)
- [ ] formularz wysyła (test przez panel: Send test)
- [ ] panel: wszystkie teksty/obrazy edytowalne (nic na sztywno)
- [ ] brak dubletu @payloadcms/ui (Część D)
- [ ] grep potwierdza wersję pluginu w node_modules
- [ ] sekrety w .env (nie w repo), maskowane w panelu
- [ ] brak plików middleware.ts, brak zaszytej mapy slugów
- [ ] strona 404 (not-found.tsx) — edytowalna, per język, link powrotu
- [ ] app/robots.ts + app/sitemap.ts wystawione (Google widzi strony)
- [ ] favicon PNG (nie SVG) w buildIconsMetadata; structured data (Organization, WebSite)
- [ ] formularze z buildera w panelu (NIE własne hardkodowane)
- [ ] compliance: polityki, baner cookies, zgoda RODO w formularzach
      (patrz [wymagania-prawne.md](./wymagania-prawne.md))
