# RideShare · Java 7

## Rasti im
GitHub: ildasheholli
Kodi: P7-706
Skenari i zgjedhur (numri dhe titulli, nga Rastet 1–5): Rasti 1 - Lista dhe detajet
ID i udhëtimit në projektin tim: p7-706
Të dhënat fiktive të rastit: Gjakovë → AAB, 08:20, 2 vende. Ora për provën e re: 08:25.

## Parashikimi
Pritja ime ishte që kërkesa e udhëtimit të hapet vetëm kur ka vende të lira dhe që një udhëtim i padeklaruar të shfaqte mesazhin e nevojshëm. Po ashtu, për një ID të panevojshëm, prisja një përgjigje të qartë dhe të kthehur te lista.

## Raporti i MVP-së
Ky raport përfshin vlerësimin e MVP-së së RideShare: lista e udhëtimeve, detajet e një udhëtimi dhe ndalimi i kërkesës kur nuk ka vende të lira. Aplikacioni mbulon rrjedhën minimale të përdoruesit të planifikuar në Java 2 dhe përputhet me skenarët e kryer në këtë kontroll.

## Dy probleme
1. Gjetëm një situatë ku përdoruesi mund të hynte në faqe të udhëtimit edhe kur nuk kishte kushtet e duhura për kërkesë. Problemi ishte i lidhur me kontrollin e vendit dhe me rrjedhën e shfaqjes në detaje.
   Skedari: src/lib/udhetimet.ts
   Korrigjimi: U verifikua qartë që shfaqja e butonit të kërkesës dhe mesazhet e lotës së vendeve varen nga vlera reale e udhëtimit dhe jo nga një gjendje të gabuar të UI-së.

2. Një problem tjetër ishte pasqyrimi i të dhënave dhe lidhja e versioneve në raport. Duhet të përdoren referenca të qarta të skedarëve dhe commit-et e saktë.
   Skedari: src/app/udhetimi/[id]/page.tsx
   Korrigjimi: Në raport u përdorën vetëm skedarët e projektit që ekzistojnë dhe lidhjet e versioneve u bënë me commit-et e saktë të të njëjtit repository.

## Korrigjimi
Skedari: src/lib/udhetimet.ts
Arsyeja: raporti fillestar nuk përmbante strukturën e kërkuar dhe disa referenca nuk ishin të saktë. U korrigjuan seksionet, skedarët dhe formatimi i raportit sipas kërkesës së Java 7.

## Prova 1
Hapat: Hapa listën e udhëtimeve, zgjodha udhëtimin me ID 1 dhe hapja /udhetimi/1.
Pritshmëria: detajet e udhëtimit duhet të përputhen me udhëtimin e zgjedhur.
Vëzhgimi: faqja e detajeve dhe lista e udhëtimeve treguan të njëjtin nisje dhe të njëjtin udhëtim.

## Prova 2
Hapat: Hapa /udhetimi/99.
Pritshmëria: aplikacioni duhet të shfaqë një mesazh të qartë për udhëtim të padgjetur.
Vëzhgimi: shfaqet mesazhi “Udhetimi nuk u gjet” dhe përdoruesi ka mundësinë e kthimit te lista.

## Prova 3
Hapat: Hapa një udhëtim me 0 vende dhe pastaj /udhetimi/3/kerkesa.
Pritshmëria: kërkesa duhet të jetë e çaktivizuar dhe të shfaqet mesazhi për mungesë vendesh.
Vëzhgimi: butoni është joaktiv ose shfaqet mesazhi “Nuk ka vende të lira”, sipas rrjedhës së aplikacionit.

## Ndryshimi i ri
U korrigjua raporti dhe u përditësuan seksionet e kërkuara nga kontrolli, si Rasti im, Dy probleme, Korrigjimi dhe Provat 1–3.

## Versionet
Para: https://github.com/ildasheholli/rideshare-mobile/commit/fee2071c8cb4fef2c164f6349c74f5be0745f47c
Pas: https://github.com/ildasheholli/rideshare-mobile/commit/7a59af0c0c6a7925c275af4f3de3d90f1c63200f