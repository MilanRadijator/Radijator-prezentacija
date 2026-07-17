# Radijator Premium Prezentacija

Moderna staticka web prezentacija za kotlove, sredjena prema izvornoj prezentaciji
`D:/MilanS/pozadina/Prezentacija 2026.pptx` i dopunjena iz starijih Radijator
prezentacija za razvoj, proizvodnju i digitalizaciju. Tehnicki podaci i aktivni
preseci proizvoda provereni su prema katalogu
`D:/MilanS/Katalog RADIJATOR 2024 SRB new 2.pdf`.

## Struktura

- `index.html` glavni deck sa 37 slajda: uvod o firmi, kapaciteti, razvojni prostori, proizvodni procesi, tok kotlova, akumulatori toplote i zavrsna zahvalnica
- `styles.css` prezentacioni katalog stil, levi dashboard, layout, responzivni prikaz
- `i18n.js` visejezicni sloj sa samo aktivnim SR, EN, DE i SL tekstovima prezentacije
- `main.js` blage animacije pri skrolu i pracenje aktivnog slajda u dashboardu
- `assets/images/` slike firme, proizvodnje, proizvoda i kataloski preseci
- `assets/videos/` story video snimci ubaceni na odgovarajuce proizvodne slajdove
- `exports/radijator-prezentacija-2026-dokument.html` print-friendly pregledni dokument
- `docs/priprema-za-podizanje.md` detaljan pregled provera i preporuka za objavu
- `tools/build-release.js` pravi cist `dist/` paket za upload

Dodati su i novi brend elementi:

- `assets/images/radijator-logo-transparent.png` transparentni Radijator logo za naslovnu i headere
- `assets/images/bedz-35-godina.png` brend bedz prikazan na zavrsnom slajdu zahvalnosti
- `assets/images/company-building-rex-0004.jpg` fotografija poslovnog objekta za uvod o firmi
- `assets/images/product-ecoflame-plus-main.png` optimizovana glavna fotografija EcoFlame Plus modela

Video materijali su ubaceni kao autoplay/muted/loop ambijentalni paneli, bez
klasicnih player kontrola:

- `assets/videos/story-ecoflame.mp4` na EcoFlame slajdu
- `assets/videos/story-uni-2.mp4` na UNI slajdu
- `assets/videos/story-cuba.mp4` na Cuba slajdu
- `assets/videos/story-fenx.mp4` na FenX slajdu

## Trenutna verzija

Aktivni deck prati strukturu `Prezentacija 2026.pptx`, uz ciljane dopune iz
prezentacija `Radijator prezentacija 2019 za Masinski fax.pptx` i
`Radijator prezentacija 2019 za Masinski fax Koki dodao kotlove.ppt`. Za K,
PK18, EcoFlame, EcoFlame Plus, EcoComfort, UNI, TKAN, TKAN MINI, Cuba, Biolux, GreenSlim, FenX, elektro kotlove i
akumulatore toplote merodavan izvor je katalog za 2024. godinu.

Web prezentacija sada ima uvod o firmi, pregled kapaciteta, razvojnih prostora i proizvodnih procesa
pre tehnickog dela, a zatim prati tok kotlova bez
direktor/kontakt prodajnih prosirenja:

1. uvod o firmi, tradiciji i proizvodnji
2. kapaciteti firme i digitalna osnova: lokacije, zaposleni, proizvodi, CNC, PDM, ERP i CAM
3. razvojna stanica, laboratorija, showroom i tehnicka zgrada
4. cetiri proizvodna slajda: lasersko secenje, CNC savijanje, zavarivanje sudova pod pritiskom i ostali procesi rada
5. K serija i PK18 piroliticki kotao, sa karakteristikama i presecima
6. EcoFlame, EcoFlame Plus, EcoComfort i UNI, kroz karakteristike i konstrukciju
7. kombinovani kotlovi TKAN 1/2, TKAN MINI i njihovi preseci/detalji
8. kamini Cuba, Biolux, GreenSlim i FenX, sa servisnim ili video detaljima
9. industrijski TKAN osnovni i INTEGRA, sa konstrukcijom i presecima
10. elektricni kotlovi EK Classic i EK Smart
11. baferi kao zavrsni sistemski dodatak
12. zavrsna zahvalnica Radijator tima preko brendirane fotografije firme

Dodatno su iz PPTX media foldera i izvornog materijala ubacene slike koje su
falile za PK18, EK Classic, EK Smart i bafere. Preseci devet glavnih modelskih
grupa zamenjeni su preciznim kataloskim ilustracijama. Stari zasebni slajdovi
kontrolera uklonjeni su iz aktivnog toka, dok novi fotografski blokovi prikazuju
razvojne prostore i kljucne procese proizvodnje.

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
zadrzati `16 x 9 in` (`40,64 x 22,86 cm`) / `Custom` format (ne A4), pa Save. Print CSS je podesen na 37 posebne 16:9 PDF strane. Za video slajdove su dodate poster
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
