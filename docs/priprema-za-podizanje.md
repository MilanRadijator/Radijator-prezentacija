# Priprema za podizanje

Datum pregleda: 2026-07-15

## Status

Prezentacija je spremna kao staticki web deck:

- 34 slajda
- 34 stavke u levom dashboardu
- 4 autoplay/muted/loop video snimka
- 54 aktivna asseta
- 0 nedostajucih lokalnih fajlova
- `dist/` paket napravljen za upload

## Export

Dodate su dve export opcije:

- `PDF export` u levom dashboardu glavne prezentacije prvo prikazuje kratko uputstvo, pa poziva browser print/save-as-PDF tok.
- `exports/radijator-prezentacija-2026-dokument.html` je poseban pregledni dokument sa svojim PDF export dugmetom.

Chrome ne dozvoljava statickoj stranici da tiho upise PDF fajl bez sistemskog
print dijaloga, niti dozvoljava da stranica sama promeni Destination sa stampaca
na `Save as PDF`. Ispravan tok je: klik na `PDF export`, zatim `Otvori PDF
export`, Destination `Save as PDF`, Paper size `16 x 9 in` (`40,64 x 22,86 cm`) / `Custom` (ne A4), Margins `None`, Scale `100`, pa Save. Za video slajdove su dodate
`print-poster` slike, da PDF export ne prikazuje prazna/crna video polja. Print
CSS koristi poseban 16:9 format strane, bez A4 margina koje mogu da poremete
raspored.

## Ciscenje

Uradjeno:

- Napravljen `tools/build-release.js` za cist upload paket.
- Build pre kopiranja automatski proverava redosled slajdova i dashboard linkova, duple ID-jeve, lokalne reference, CSS strukturu i video atribute.
- Napravljen `dist/` sa samo aktivnim fajlovima i koriscenim assetima.
- `dist/` je dodat u `.gitignore`, jer je generisani build izlaz.
- Rezervni/neaktivni asseti su dodati u `.gitignore`, tako da ostaju lokalno za dalje dizajnerske izmene, ali ne ulaze u commit.
- Uklonjen je mrtav CSS za stare naslovne/cover varijante i neaktivni `automation-grid` layout.
- Dodat je fotografski slajd za razvojnu stanicu, laboratoriju, showroom i tehnicku zgradu.
- Slajd procesa proizvodnje razdvojen je na tri odvojena fotografska slajda: secenje, savijanje i zavarivanje.
- Proizvodni blok je slozen po prodajnim grupama: drvo, piroliza, pelet, kombinovani kotlovi, kamini, industrija, elektro i baferi.
- Svaki proizvod prati isti tok: karakteristike, zatim presek ili dodatni tehnicki detalji kada postoje.
- Uklonjeni su zasebni slajdovi Tiemme/SY/MB kontrolera iz aktivne prezentacije.
- Aktivni SR, EN, DE i SL prevodi objedinjeni su u jednom ociscenom `i18n.js` fajlu sa 331 aktivnim kljucem po jeziku.
- Karakteristike i preseci K, PK18, EcoFlame, EcoFlame Plus, EcoComfort, UNI, TKAN, Cuba, Biolux i FenX programa provereni su prema katalogu za 2024. godinu i dostavljenom proizvodnom materijalu.
- U pregledni dokument dodate su dve tabele sa potvrdjenim tehnickim podacima proizvoda.
- Dodat je zavrsni slajd zahvalnosti sa optimizovanom fotografijom firme i prevodima na sva cetiri jezika.

Velicine:

- Release `dist/`: 61 fajl, 54 aktivna asseta, oko 101.92 MB.

Najvecu tezinu nose MP4 fajlovi:

- `story-ecoflame.mp4`
- `story-uni-2.mp4`
- `story-cuba.mp4`
- `story-fenx.mp4`

## Validacija

Provereno:

- Svi dashboard linkovi vode na postojece slajdove.
- Svi lokalni `src`, `href` i `poster` asseti postoje.
- `main.js`, `i18n.js` i `tools/build-release.js` prolaze `node --check`.
- Video elementi nemaju klasicne `controls` i svi imaju `autoplay muted loop`.
- Novi fajlovi su ASCII konzistentni.

## Preporuke pre javne objave

- Rucno otvoriti `dist/index.html` i proci slajdove 01-34.
- Testirati PDF export iz glavne prezentacije.
- Testirati PDF export iz preglednog dokumenta.
- Ako se zeli brze ucitavanje na slabijem internetu, sledeci korak je kompresija MP4 fajlova.
- Ako se objavljuje preko Netlify/Vercel/static hostinga, publish folder moze biti `dist`.
- Ako se objavljuje preko GitHub Pages iz root-a, commitovati izvorne fajlove i ne commitovati `dist`, osim ako bas zelite deploy iz build foldera.

## Napomena

Ugradjeni browser u Codex okruzenju moze blokirati direktno otvaranje lokalnog `file://` URL-a, pa je vizuelnu finalnu proveru najbolje uraditi direktno u Chrome/Edge-u sa lokalnog fajla ili iz `dist/` foldera.
