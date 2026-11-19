# RideShare — Java 8

## Çfarë ndërtova
Shtova zgjedhjen lokale të vendtakimit te detajet e udhëtimit. Arta mund ta shkruajë dhe konfirmojë një vend ose, me klikim, t'i kërkojë telefonit pozicionin. Aplikacioni shfaq vetëm saktësinë në metra; koordinatat nuk ruhen dhe vendtakimi nuk dërgohet te shoferi. Shtova `/java-08-test`, që përdor të njëjtin komponent dhe të dhëna fiktive pa u lidhur me databazën.

## Provat që bëra
### Prova 1: Leja nuk kërkohet sapo hapet faqja.
Hapat: Hapa `/java-08-test` dhe nuk shtypa butonin e vendndodhjes. Pastaj e shtypa për të nisur kërkesën.
Pritshmëria: Faqja hapet pa kërkuar leje; klikimi e nis leximin dhe përfundimi shfaq rezultatin.
Vëzhgimi: Para klikimit gjendja ishte `idle` dhe nuk u shfaq kërkesë. Kërkesa u nis vetëm pas klikimit; suksesi, refuzimi dhe skadimi u provuan me rezultate të simuluara.

### Prova 2: Refuzimi i lejes nuk e bllokon përdoruesin.
Hapat: Simulova refuzimin e lejes, shkrova “Biblioteka” dhe e konfirmova.
Pritshmëria: Pritja përfundon, shfaqet mesazhi i refuzimit dhe vendtakimi manual mund të konfirmohet.
Vëzhgimi: U shfaq “Leja u refuzua. Shkruaj vendtakimin vetë.”; fusha manuale dhe konfirmimi mbetën të përdorshme. Simulova veçmas edhe skadimin; pritja përfundoi dhe aplikacioni lejoi riprovimin.

### Prova 3: Dëshmitë në GitHub nuk tregojnë adresën time reale.
Hapat: Kontrollova ndryshimet e kësaj pune për koordinata, adresa personale dhe sekrete.
Pritshmëria: Provat përdorin të dhëna fiktive dhe skedarët e mjedisit nuk përfshihen.
Vëzhgimi: Faqja e provës përdor të dhëna të shkruara në kod për demonstrim; komponenti nuk shfaq apo ruan koordinatat, vetëm saktësinë. Nuk shtova skedarë mjedisi ose koordinata reale.

## Ku gjendet puna
Skedarët kryesorë: `src/components/Vendtakimi.tsx`, `src/app/udhetimi/[id]/page.tsx`, `src/app/java-08-test/page.tsx` dhe `mobile-week08.json`.
Repository: https://github.com/ildasheholli/rideshare-mobile
Faqja e provës lokale: http://localhost:3000/java-08-test. Nuk publikova version të ri në Vercel.

## Çfarë mbetet për përmirësim
Zgjedhja dhe saktësia janë gjendje lokale dhe humbasin pas rifreskimit; Dritoni nuk e merr vendtakimin. Hapi tjetër do të ishte dërgimi i vendtakimit me pëlqimin e përdoruesit dhe ruajtja e sigurt në aplikacion.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
AI ndihmoi me implementimin e komponentit dhe faqes së pavarur të provës. Verifikova kodin me lint, build dhe prova të ndërveprimit në faqen lokale.

## Prova me një hyrje të re
- Hyrja që provova: Shkrova “Parkingu” pa e konfirmuar, pastaj provova tekstin bosh me hapësira.
- Parashikimi im para klikimit: Vendtakimi i konfirmuar mbetet “Biblioteka” derisa të konfirmoj tekstin tjetër; teksti bosh nuk e zëvendëson atë.
- Çfarë pashë realisht: “Parkingu” mbeti vetëm në fushë dhe vlera e konfirmuar mbeti “Biblioteka”. Hapësirat shfaqën gabim dhe ruajtën vlerën e mëparshme.
- Skedari dhe funksioni që e shpjegojnë: `src/components/Vendtakimi.tsx`, `konfirmoVendtakimin`.
- Çfarë kuptova ose korrigjova: Shkrimi dhe konfirmimi janë veprime të ndara; vendtakimi i konfirmuar ndryshon vetëm kur teksti i pastruar nuk është bosh dhe klikohet konfirmimi.

Kjo pjesë e provës u kontrollua në aplikacionin lokal. Testi i telefonit real dhe prova me koleg nuk u kryen.
