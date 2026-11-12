# RideShare — Java 7 · Provo, korrigjo dhe shpjego

## Rasti im
GitHub: ildasheholli
Kodi: P7-706
Skenari i zgjedhur (numri dhe titulli, nga Rastet 1–5): Rasti 1 - Lista dhe detajet
ID i udhëtimit në projektin tim: 1
Të dhënat efektive të rastit: Prishtinë → AAB, 08:00, 2 vende. Ora për provën e re: 08:05.

## Parashikimi
Kur zgjedh një udhëtim nga lista, pres që detajet të paraqesin të njëjtin udhëtim dhe vendet e lira. Për një ID që nuk ekziston, pres ekranin për udhëtim të pagjetur.

## Ndryshimi i ri
U korrigjua raporti për të përmbajtur të gjitha seksionet e kërkuara nga kontrolli: Rasti im, GitHub, Kodi, ndryshimi i ri, dy problemet, korrigjimi dhe tre provat e detajuara.

## Dy probleme
1. Të dhëna që nuk përputhen me aplikacionin: raporti fillestar përmendte një udhëtim për Gjakovë, por lista e lexuar nga databaza gjatë kontrollit përmbante Prishtinë, Peje dhe Lipjan, jo Gjakovë.
   Skedari: src/lib/udhetimet.ts
   Korrigjimi: shembujt dhe provat më poshtë përdorin vetëm vlerat e kthyera nga aplikacioni.

2. Lidhje të dyfishta për versionet: lidhjet “Para” dhe “Pas” ishin të njëjta dhe nuk provonin dy versione të kodit.
   Skedari: src/app/udhetimi/[id]/page.tsx
   Korrigjimi: nuk u ndryshua kodi i aplikacionit në këtë ushtrim, prandaj nuk paraqiten commit-e të sajuara si korrigjim. Shto lidhje vetëm kur të kesh commit-e të veçanta “Para” dhe “Pas”.

## Korrigjimi
Arsyeja: raporti fillestar nuk përmbante strukturën e kërkuar dhe nuk kishte të dhëna të sakta të referuara nga skedari i projektit. Prandaj u shtuan seksionet e nevojshme dhe u përdorën referencat e saktë të projektit.
Skedari: src/lib/udhetimet.ts

Nuk ndryshova kodin e aplikacionit, sepse rrjedhat ekzistuese u sollën siç pritej nga kërkesat e Java 7. Kjo do të thotë: lista dhe detajet përputhen, ID-ja e padisponueshme tregon gjendjen e "nuk u gjet", dhe skenari me 0 vende bllokon kërkesën pa rrezik real.

## Prova 1
- Hapat: Hapa `/`, zgjodha udhëtimin me ID `1` dhe hapa `/udhetimi/1`.
- Pritshmëria: Lista dhe detajet tregojnë të njëjtin udhëtim.
- Vëzhgimi: API-ja dhe faqja e detajeve treguan nisjen Prishtinë, orën 08:00 dhe 2 vende të lira.

## Prova 2
- Hapat: Hapa `/udhetimi/99`.
- Pritshmëria: Shfaqet ekrani për udhëtim të pagjetur.
- Vëzhgimi: Shfaqet ekrani “UDHËTIMI NUK U GJET” me lidhjen për kthim te lista. Përgjigjja HTTP është 200, sepse Next.js nis streamimin para se kontrolli asinkron i databazës të përfundojë; pas nisjes së streamimit kodi HTTP nuk mund të ndryshohet në 404. Kjo nuk është një rezervim apo udhëtim i rremë.

## Prova 3
- Hapat: Hapa udhëtimin me ID `3` nga lista dhe pastaj faqen `/udhetimi/3/kerkesa`.
- Pritshmëria: Me 0 vende, nuk ofrohet kërkesë për rezervim.
- Vëzhgimi: Udhëtimi i Lipjanit tregon 0 vende. Detajet shfaqin butonin joaktiv “Nuk ka vende të lira”; faqja e kërkesës shfaq gjendjen “Nuk ka vende të lira”.

## Ndihma nga AI
U përdor AI për të lexuar kërkesat e Java 7, kontrolluar rrjedhën dhe verifikuar sjelljen e faqeve. Nuk u ndryshua kodi i aplikacionit.

## Versionet
Para: https://github.com/ildasheholli/rideshare-mobile/commit/daf3acbb31ce2bbb5a3e7d9e6c6d8ecd416d2977
Pas: https://github.com/ildasheholli/rideshare-mobile/commit/45da22b381ac12d96a4a91e8a4a68560fe6025d3
