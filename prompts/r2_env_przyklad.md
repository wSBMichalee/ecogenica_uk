# R2 (Cloudflare) — zmienne środowiskowe

Storage mediów przez Cloudflare R2. Dane R2 to **infrastruktura agencyjna** —
trzymaj je w `.env` (jak DATABASE_URI, PAYLOAD_SECRET, GRAPH_*), NIE w panelu.

## Wymagane zmienne w `.env`

```bash
# --- Cloudflare R2 (media storage) ---
R2_BUCKET=nazwa-bucketa
R2_ENDPOINT=https://<ACCOUNT_ID>.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=<access-key-id>
R2_SECRET_ACCESS_KEY=<secret-access-key>

# Publiczny URL (custom domena) — żeby obrazy się wyświetlały (nie 403).
# Ustaw PO podpięciu custom domeny w Cloudflare (patrz docs/storage.md).
R2_PUBLIC_URL=https://media.klient.pl
```

**R2_PUBLIC_URL** — opcjonalna, ale WYMAGANA do publicznego wyświetlania
mediów. To custom domena podpięta do bucketa (np. `https://media.klient.pl`).
Bez niej upload działa, ale obrazy dają 403 na froncie. Ustaw po konfiguracji
custom domeny (patrz docs/storage.md — sekcja publiczny dostęp).

## Skąd wziąć wartości (Cloudflare dashboard)

1. **R2_BUCKET** — nazwa bucketa: R2 → utwórz/wybierz bucket → jego nazwa.
2. **R2_ENDPOINT** — R2 → Overview → „S3 API" → endpoint dla Twojego konta.
   Format: `https://<ACCOUNT_ID>.r2.cloudflarestorage.com` (bez nazwy bucketa).
3. **R2_ACCESS_KEY_ID** + **R2_SECRET_ACCESS_KEY** — R2 → „Manage R2 API Tokens"
   → Create API Token → uprawnienia „Object Read & Write" na bucket → wygeneruje
   parę kluczy. Secret pokazywany RAZ — zapisz od razu.

## Zachowanie

- **Wszystkie 4 zmienne ustawione** → media lądują w R2.
- **Brak którejś** → fallback na lokalny dysk (dev bez R2 działa).
- **Część ustawiona** → ostrzeżenie w logu + fallback (częściowa konfiguracja =
  prawdopodobnie pomyłka).

## Uwaga — publiczny dostęp do mediów

R2 domyślnie jest prywatny. Żeby media były widoczne na stronie (obrazy w
`<img>`), musisz albo:
- podpiąć **publiczny bucket** (R2 → Settings → Public access → custom domain), albo
- serwować przez własną domenę / Cloudflare CDN.

Sam upload do R2 działa od razu; **publiczny odczyt** wymaga konfiguracji domeny
w Cloudflare. Bez tego obrazy wgrają się, ale nie wyświetlą (403).

## Produkcja (Coolify/hosting)

Te zmienne ustaw w **runtime** environment (jak DATABASE_URI), nie w build.
