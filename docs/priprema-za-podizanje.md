# Priprema za podizanje

Datum pregleda: 2026-07-13

## Status

Prezentacija je spremna kao staticki web deck:

- 28 slajdova
- 28 stavki u levom dashboardu
- 4 autoplay/muted/loop video snimka
- 43 aktivne asset reference
- 0 nedostajucih lokalnih fajlova
- `dist/` paket napravljen za upload

## Export

Dodate su dve export opcije:

- `PDF export` u levom dashboardu glavne prezentacije prvo prikazuje kratko uputstvo, pa poziva browser print/save-as-PDF tok.
- `exports/radijator-prezentacija-2026-dokument.html` je poseban pregledni dokument sa svojim PDF export dugmetom.

Chrome ne dozvoljava statickoj stranici da tiho upise PDF fajl bez sistemskog
print dijaloga, niti dozvoljava da stranica sama promeni Destination sa stampaca
na `Save as PDF`. Ispravan tok je: klik na `PDF export`, zatim `Otvori PDF
export`, Destination `Save as PDF`, pa Save. Za video slajdove su dodate
`print-poster` slike, da PDF export ne prikazuje prazna/crna video polja.

## Ciscenje

Uradjeno:

- Napravljen `tools/build-release.js` za cist upload paket.
- Napravljen `dist/` sa samo aktivnim fajlovima i koriscenim assetima.
- `dist/` je dodat u `.gitignore`, jer je generisani build izlaz.
- Rezervni/neaktivni asseti su dodati u `.gitignore`, tako da ostaju lokalno za dalje dizajnerske izmene, ali ne ulaze u commit.
- Uklonjen je mrtav CSS za stare naslovne/cover varijante i neaktivni `automation-grid` layout.

Velicine:

- Izvorni `assets/`: 65 fajlova, oko 108.75 MB.
- Release `dist/`: 50 fajlova, oko 94.11 MB.

Najvecu tezinu nose MP4 fajlovi:

- `story-ecoflame.mp4`
- `story-uni-2.mp4`
- `story-cuba.mp4`
- `story-fenx.mp4`

## Validacija

Provereno:

- Svi dashboard linkovi vode na postojece slajdove.
- Svi lokalni `src`, `href` i `poster` asseti postoje.
- `main.js` i `tools/build-release.js` prolaze `node --check`.
- Video elementi nemaju klasicne `controls` i svi imaju `autoplay muted loop`.
- Novi fajlovi su ASCII konzistentni.

## Preporuke pre javne objave

- Rucno otvoriti `dist/index.html` i proci slajdove 01-28.
- Testirati PDF export iz glavne prezentacije.
- Testirati PDF export iz preglednog dokumenta.
- Ako se zeli brze ucitavanje na slabijem internetu, sledeci korak je kompresija MP4 fajlova.
- Ako se objavljuje preko Netlify/Vercel/static hostinga, publish folder moze biti `dist`.
- Ako se objavljuje preko GitHub Pages iz root-a, commitovati izvorne fajlove i ne commitovati `dist`, osim ako bas zelite deploy iz build foldera.

## Napomena

Ugradjeni browser u Codex okruzenju moze blokirati direktno otvaranje lokalnog `file://` URL-a, pa je vizuelnu finalnu proveru najbolje uraditi direktno u Chrome/Edge-u sa lokalnog fajla ili iz `dist/` foldera.
