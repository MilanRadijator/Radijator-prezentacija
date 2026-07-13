# Radijator Premium Prezentacija

Moderna staticka web prezentacija za kotlove, sredjena prema izvornoj prezentaciji
`D:/MilanS/pozadina/Prezentacija 2026.pptx`.

## Struktura

- `index.html` glavni deck sa 28 slajdova: uvod o firmi, razvojni blok i PPTX tok kotlova
- `styles.css` prezentacioni katalog stil, levi dashboard, layout, responzivni prikaz
- `i18n.js` visejezicni sloj za SR, EN, DE i SL verziju prezentacije
- `main.js` blage animacije pri skrolu i pracenje aktivnog slajda u dashboardu
- `assets/images/` slike, preseci, dijagrami i kontroleri izvuceni iz PPTX-a
- `assets/videos/` story video snimci ubaceni na odgovarajuce proizvodne slajdove
- `exports/radijator-prezentacija-2026-dokument.html` print-friendly pregledni dokument
- `docs/priprema-za-podizanje.md` detaljan pregled provera i preporuka za objavu
- `tools/build-release.js` pravi cist `dist/` paket za upload

Dodati su i novi brend elementi:

- `assets/images/radijator-logo-transparent.png` transparentni Radijator logo za naslovnu i headere
- `assets/images/bedz-35-godina.png` brend bedz, trenutno nije prikazan jer je naslovni slajd uklonjen
- `assets/images/company-building-rex-0007.jpg` fotografija poslovnog objekta za uvod o firmi

Video materijali su ubaceni kao autoplay/muted/loop ambijentalni paneli, bez
klasicnih player kontrola:

- `assets/videos/story-ecoflame.mp4` na EcoFlame slajdu
- `assets/videos/story-uni-2.mp4` na UNI slajdu
- `assets/videos/story-cuba.mp4` na Cuba slajdu
- `assets/videos/story-fenx.mp4` na FenX slajdu

## Trenutna verzija

Aktivni deck je sveden na jedan izvor: `Prezentacija 2026.pptx`.

U fajlu na toj putanji detektovana su 24 XML slajda. Web prezentacija sada ima
uvod o firmi i razvojni blok pre tehnickog dela, a zatim prati PPTX tok kotlova
bez direktor/kontakt prodajnih prosirenja:

1. uvod o firmi, tradiciji i proizvodnji
2. razvojni tok: PDM, ERP, CAM i put od zahteva do gotovog proizvoda
3. SolidWorks PDM, kontrola revizija i utrosak sirovina
4. dokumentacija, ispitivanje i elektro sektor
5. podela kotlova na pelet
6. EcoFlame i EcoFlame Plus
7. automatika MB250
8. TKAN 1/2 i TKAN industrijski
9. EcoComfort i SY325 Basic
10. nasipna lozista: UNI, Biolux, Cuba
11. SY250, FenX
12. K i FK serije sa presecima
13. SY325 WOOD
14. GREENY i TKAN MINI

Dodatno su iz PPTX media foldera ubacene slike koje su falile u prethodnoj verziji:
logo, `Since 1991`, dijagrami nacina dovoda peleta, UNI slike i pravi GREENY
proizvod/presek.
Iz prezentacije `Radijator prezentacija 2019 za Masinski fax.pptx` dodati su PDM,
SolidWorks Composer, ispitna stanica i elektro sektor materijali za razvojni blok.

Deck se moze otvoriti direktno preko `index.html` bez posebnog servera.

## Jezici

Srpski ostaje primarni izvorni tekst u HTML-u. U levom dashboardu je dodat izbor
jezika `SR / EN / DE / SL`, a izabrani jezik se pamti u browseru. PDF export
koristi trenutno aktivan jezik, jer se tekst prevodi direktno u prezentaciji pre
otvaranja print dijaloga.

## Export

U levom dashboardu glavne prezentacije postoje dve opcije:

- `PDF export` prvo prikazuje kratko uputstvo, zatim otvara browser print dijalog.
- `Dokument` otvara pregledni dokument koji se takodje moze exportovati kao PDF.

Chrome zbog sigurnosnih pravila statickih stranica ne dozvoljava tiho cuvanje
PDF-a bez sistemskog print dijaloga, niti dozvoljava da stranica sama prebaci
Destination sa stampaca na `Save as PDF`. Zato je export tok: klik na `PDF
export`, zatim `Otvori PDF export`, u Destination rucno izabrati `Save as PDF`,
pa Save. Print CSS je podesen na 28 strana. Za video slajdove su dodate poster
slike u print modu, da PDF export ne ostane sa praznim ili crnim video poljima.

## Priprema za upload

Za cist paket sa aktivnim fajlovima pokrenuti:

```powershell
node tools/build-release.js
```

Skripta pravi `dist/` folder sa glavnom prezentacijom, export dokumentom i samo
assetima koji se koriste. Izvorni `assets/` folder ostaje sacuvan sa dodatnim
materijalom za dalje dizajnerske izmene.

Neaktivni rezervni asseti su dodati u `.gitignore`, tako da ostaju lokalno za
dalji rad, ali ne ulaze u commit.
