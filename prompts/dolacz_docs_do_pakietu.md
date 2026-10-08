# Dołączenie docs do pakietu npm (żeby Antigravity je miał)

**Problem:** obecnie `package.json` pluginu ma `"files": ["dist"]` — pakiet npm
zawiera TYLKO `dist/`, bez `docs/`. Więc po `pnpm add @intecion/ipal-kit`
folder `docs/` NIE trafia do `node_modules/@intecion/ipal-kit/`. Antigravity
(ani nikt) nie znajdzie tam dokumentacji.

**Naprawa:** dodaj `docs` do `files` w `package.json` pluginu.

```bash
cd ~/payload-cms/ipal-kit
```

Edytuj `package.json` — zmień:
```json
"files": ["dist"]
```
na:
```json
"files": ["dist", "docs"]
```

Albo komendą:
```bash
python3 -c "
import json
with open('package.json') as f: d = json.load(f)
if 'docs' not in d.get('files', []):
    d['files'] = d.get('files', []) + ['docs']
with open('package.json','w') as f:
    json.dump(d, f, indent=2); f.write('\n')
print('files:', d['files'])
"
```

**Potem opublikuj** (docs to tekst, ~160K — nieistotne dla rozmiaru pakietu):
```bash
git add -A && git commit -m "ship docs/ in npm package for agent access"
npm version patch
npm publish
git push && git push --tags
```

**Weryfikacja po instalacji w projekcie:**
```bash
cd ~/<projekt>
pnpm add @intecion/ipal-kit@<nowa>
ls node_modules/@intecion/ipal-kit/docs/   # teraz docs SĄ
```

Od teraz Antigravity (po `pnpm add`) ma `docs/` lokalnie i może czytać
szczegóły zgodnie z mapą w antigravity_zasady_agent.md (KROK 0).

> **Uwaga:** docs muszą być w repo pluginu (`~/payload-cms/ipal-kit/docs/`),
> nie tylko w outputs. Skopiuj tam całą zawartość docs z tej sesji przed
> publikacją, żeby pakiet zawierał aktualną wersję.
