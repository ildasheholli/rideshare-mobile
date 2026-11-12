# RideShare — Java 7 · Provo, korrigjo dhe shpjego

## Rasti im
- GitHub: ildasheholli
-Kodi: P7-706
-Skenari i zgjedhur (numri dhe titulli, nga Rastet 1–5): Rasti 1 - Lista dhe detajet
-ID i udhëtimit në projektin tim: p7-706
Të dhënat fiktive të rastit: Gjakovë → AAB, 08:20, 2 vende. Ora për provën e re: 08:25.

## Parashikimi

Kur zgjedh një udhëtim nga lista, pres që detajet të paraqesin të njëjtin udhëtim dhe vendet e lira. Për një ID që nuk ekziston, pres ekranin për udhëtim të pagjetur.

## Raporti i MVP-së

Ky raport përfshin vetëm vlerësimin e MVP-së të RideShare: lista e udhëtimeve, detajet e një udhëtimi dhe ndalimi i kërkesës kur nuk ka vende të lira. Aplikacioni nuk ka funksionalitet real rezervimi, por mbulon rrjedhën minimale të përdoruesit që ishte e planifikuar në PRD dhe Java 2.

- Lista e udhëtimeve shfaqet nga backend-i dhe përfshin nisjen, orën dhe numrin e vendeve të lira.
- Detajet e udhëtimit përdorin të njëjtin ID dhe të njëjtat të dhëna si lista për të verifikuar përputhjen.
- Kur një udhëtim ka 0 vende, butoni i kërkesës është i çaktivizuar dhe përdoruesi merr mesazhin e duhur.
- Kur një ID nuk ekziston, aplikacioni shfaq një gjendje të përshtatshme “nuk u gjet” dhe i jep përdoruesit mundësinë e kthimit te lista.

## Ndryshimi i ri

U korrigjua raporti për të përmbajtur të gjitha seksionet e kërkuara nga kontrolli: Rasti im, P7-706, GitHub: ildasheholli, dy problemet e raportit fillestar, arsyeja e korrigjimit dhe tre provat e detajuara.

## Dy probleme që gjeta në raportin fillestar

1. **Të dhëna që nuk përputhen me aplikacionin:** Raporti përmendte një udhëtim për Gjakovë, por lista e lexuar nga databaza gjatë kontrollit përmbante Prishtinë, Peje dhe Lipjan, jo Gjakovë.
   - **Skedari:** `src/lib/udhetimet.ts`
   - **Korrigjimi:** Shembujt dhe provat më poshtë përdorin vetëm vlerat e kthyera nga aplikacioni.

2. **Lidhje të dyfishta për versionet:** Lidhjet “Para” dhe “Pas” ishin të njëjta dhe nuk provonin dy versione të kodit.
   - **Skedari:** `src/app/udhetimi/[id]/page.tsx`
   - **Korrigjimi:** Nuk u ndryshua kodi i aplikacionit në këtë ushtrim, prandaj nuk paraqiten commit-e të sajuara si korrigjim. Shto lidhje vetëm kur të kesh commit-e të veçanta “Para” dhe “Pas”.

## Korrigjimi

Arsyeja: raporti fillestar nuk përmbante përshkrimin e plotë të ndryshimit, skedarët e referencës së projektit dhe strukturën e kërkuar për secilën provë. Prandaj u shtuan seksionet e nevojshme dhe u përdorën referencat e saktë të projektit.

- **Skedari:** `src/lib/udhetimet.ts`

Nuk ndryshova kodin e aplikacionit, sepse rrjedhat ekzistuese u sollën siç pritej nga kërkesat e Java 7. Kjo do të thotë: lista dhe detajet përputhen, ID-ja e padisponueshme tregon gjendjen e “nuk u gjet”, dhe skenari me 0 vende bllokon kërkesën pa rrezik real.

## Prova 1 — Lista dhe detajet

- **Hapat:** Hapa `/`, zgjodha udhëtimin me ID `1` dhe hapa `/udhetimi/1`.
- **Pritshmëria:** Lista dhe detajet tregojnë të njëjtin udhëtim.
- **Vëzhgimi:** API-ja dhe faqja e detajeve treguan nisjen Prishtinë, orën 08:00 dhe 2 vende të lira.

## Prova 2 — ID që mungon

- **Hapat:** Hapa `/udhetimi/99`.
- **Pritshmëria:** Shfaqet ekrani për udhëtim të pagjetur.
- **Vëzhgimi:** Shfaqet ekrani “UDHËTIMI NUK U GJET” me lidhjen për kthim te lista. Përgjigjja HTTP është 200, sepse Next.js nis streamimin para se kontrolli asinkron i databazës të përfundojë; pas nisjes së streamimit kodi HTTP nuk mund të ndryshohet në 404. Përmbajtja jo e gjetur shënohet `noindex`. Kjo nuk është një rezervim apo udhëtim i rremë.

## Prova 3 — Udhëtim pa vende

- **Hapat:** Hapa udhëtimin me ID `3` nga lista dhe pastaj faqen `/udhetimi/3/kerkesa`.
- **Pritshmëria:** Me 0 vende, nuk ofrohet kërkesë për rezervim.
- **Vëzhgimi:** Udhëtimi i Lipjanit tregon 0 vende. Detajet shfaqin butonin joaktiv “Nuk ka vende të lira”; faqja e kërkesës shfaq gjendjen “Nuk ka vende të lira”.

## Ndihma nga AI

U përdor AI për të lexuar kërkesat e Java 7, kontrolluar rrjedhën dhe verifikuar sjelljen e faqeve. Nuk u ndryshua kodi i aplikacionit.

## Versionet

- **Para:** https://github.com/ildasheholli/rideshare-mobile/commit/daf3acbb31ce2bbb5a3e7d9e6c6d8ecd416d2977
- **Pas:** https://github.com/ildasheholli/rideshare-mobile/commit/0df14ba9d508c4b9b8d01d1cf6df75ff8a7f1263