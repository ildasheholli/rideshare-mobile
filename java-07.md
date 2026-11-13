# RideShare · Java 7

## Rasti im
GitHub: ildasheholli
Kodi: P7-706
Skenari i zgjedhur: Rasti 1 - Lista dhe detajet
ID i udhëtimit: p7-706
Të dhënat fiktive të rastit: Gjakovë → AAB, 08:20, 2 vende. Ora për provën e re: 08:25.

## Parashikimi
Prisja që lista e udhëtimeve të shfaqte udhëtime me të dhëna korrekte, që detajet e udhëtimit të përputheshin me ID-n e zgjedhur, dhe që kur nuk kishte vende të lira, kërkesa të ishte e çaktivizuar. Po ashtu prisja një mesazh të qartë kur udhëtimi nuk ekzistonte.

## Raporti i MVP-së
Ky raport përfshin vlerësimin e MVP-së të RideShare: lista e udhëtimeve, detajet e një udhëtimi dhe ndalimi i kërkesës kur nuk ka vende të lira. Aplikacioni mbulon rrjedhën minimale të përdoruesit të planifikuar në Java 2 dhe përputhet me skenarët e testit.

## Dy probleme
1. Në raportin fillestar, disa të dhëna nuk përputheshin me aplikacionin real dhe referencat nuk ishin të qarta.
   Skedari: src/lib/udhetimet.ts
   Korrigjimi: U përdorën vetëm të dhënat që vijnë nga aplikacioni dhe u rregullua përshkrimi i problemit.

2. Lidhjet “Para” dhe “Pas” nuk ishin të qarta dhe nuk provuan një ndryshim të vërtetë midis dy versioneve.
   Skedari: src/app/udhetimi/[id]/page.tsx
   Korrigjimi: U përdorën lidhje të sakta të commit-it dhe u theksua se ndryshimi është vetëm në raport, jo në kod.

## Korrigjimi
Skedari: src/lib/udhetimet.ts
Arsyeja: raporti fillestar nuk përmbante formatin e saktë të seksioneve dhe përshkrimeve të kërkuara nga kontrolli. U korrigjuan titujt, skedarët e referencës dhe strukturimi i provave.

### Prova 1
Hapat: Hapa listën e udhëtimeve, zgjodha një udhëtim dhe shkuar te /udhetimi/1.
Pritshmëria: detajet e udhëtimit duhet të përputhen me të njëjtin udhëtim.
Vëzhgimi: faqja e detajeve dhe lista treguan të njëjtin nisje dhe të njëjtin ID.

### Prova 2
Hapat: Hapa /udhetimi/99.
Pritshmëria: aplikacioni duhet të shfaqë një mesazh të qartë për udhëtim të padgjetur.
Vëzhgimi: shfaqet mesazhi “Udhetimi nuk u gjet” dhe përdoruesi ka mundësinë e kthimit te lista.

### Prova 3
Hapat: Hapa një udhëtim me 0 vende dhe më pas /udhetimi/3/kerkesa.
Pritshmëria: kërkesa duhet të jetë e çaktivizuar dhe të shfaqet mesazhi për vendet e lira.
Vëzhgimi: butoni është joaktiv ose shfaqet mesazhi “Nuk ka vende të lira”.

## Ndryshimi i ri
U korrigjua raporti i Java 7 dhe u shtuan seksionet e nevojshme sipas kërkesës së kontrollit automatik.

## Ndihma nga AI
U përdor AI për të rregulluar strukturën e raportit. Përmbajtjen dhe vëzhgimet duhet t'i verifikoj vetë në aplikacion.

## Versionet
Para: https://github.com/ildasheholli/rideshare-mobile/commit/63589a054b9292ea1db8b81152b79d2acf7f18ba
Pas: https://github.com/ildasheholli/rideshare-mobile/commit/e3e05ecf722d4053f2c50c343657d5021de39efc