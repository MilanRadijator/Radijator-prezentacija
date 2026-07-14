# Radijator Premium Prezentacija

Moderna staticka web prezentacija za kotlove, sredjena prema izvornoj prezentaciji
`D:/MilanS/pozadina/Prezentacija 2026.pptx` i dopunjena iz starijih Radijator
prezentacija za razvoj, proizvodnju, digitalizaciju i BiomaxPRO.

## Struktura

- `index.html` glavni deck sa 31 slajdom: uvod o firmi, razvojni blok, proizvodnja, digitalizacija i tok kotlova
- `styles.css` prezentacioni katalog stil, levi dashboard, layout, responzivni prikaz
- `i18n.js` visejezicni sloj za SR, EN, DE i SL verziju prezentacije
- `main.js` blage animacije pri skrolu i pracenje aktivnog slajda u dashboardu
- `assets/images/` slike, preseci, dijagrami, proizvodnja, digitalizacija i kontroleri izvuceni iz prezentacija
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

Aktivni deck primarno prati `Prezentacija 2026.pptx`, uz ciljane dopune iz
prezentacija `Radijator prezentacija 2019 za Masinski fax.pptx` i
`Radijator prezentacija 2019 za Masinski fax Koki dodao kotlove.ppt`.

Web prezentacija sada ima uvod o firmi, razvojni blok, digitalnu proizvodnju i
digitalizaciju pre tehnickog dela, a zatim prati tok kotlova bez
direktor/kontakt prodajnih prosirenja:

1. uvod o firmi, tradiciji i proizvodnji
2. razvojni tok: PDM, ERP, CAM i put od zahteva do gotovog proizvoda
3. SolidWorks PDM, kontrola revizija i utrosak sirovina
4. dokumentacija, ispitivanje i elektro sektor
5. digitalna proizvodnja: Lantek, Cadman, SolidCAM i tok do gotovog proizvoda
6. digitalizacija proizvoda: 4HEAT, touch paneli, programator i System Pro
7. podela kotlova na pelet
8. EcoFlame i EcoFlame Plus
9. automatika MB250
10. TKAN 1/2 i TKAN industrijski
11. EcoComfort, SY325 Basic i BiomaxPRO
12. nasipna lozista: UNI, Biolux, Cuba
13. SY250, FenX
14. K i FK serije sa presecima
15. SY325 WOOD
16. GREENY i TKAN MINI

Dodatno su iz PPTX media foldera ubacene slike koje su falile u prethodnoj verziji:
logo, `Since 1991`, dijagrami nacina dovoda peleta, UNI slike i pravi GREENY
proizvod/presek.
Iz prezentacija iz 2019. dodati su PDM, SolidWorks Composer, ispitna stanica,
elektro sektor, proizvodni procesi, digitalizacija proizvoda i BiomaxPRO.

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
pa Save. Print CSS je podesen na 31 posebnu 16:9 PDF stranu. Za video slajdove su dodate poster
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
