# RideShare — Java 7 · Provo, korrigjo dhe shpjego

## Rasti im

Github:ildasheholli Kodi:P7-706 Te dhenat efektive te rastit:Gjakove->AAB, 08:20, 2 vende, Ora per Proven e re: 08:25.
 
## Parashikimi

Kur zgjedh një udhëtim nga lista, pres që detajet të paraqesin të njëjtin udhëtim dhe vendet e lira. Për një ID që nuk ekziston pres ekranin për udhëtim të pagjetur.

## Raporti i MVP-së

Ky raport përfshin vetëm vlerësimin e MVP-së të RideShare: lista e udhëtimeve, detajet e një udhëtimi, dhe ndalimi i kërkesës kur nuk ka vende të lira. Aplikacioni nuk ka funksionalitet real rezervimi, por mbulon rrjedhën minimale të përdoruesit që ishte e planifikuar në PRD dhe Java 2.

- Lista e udhëtimeve shfaqet nga backend-i dhe përfshin nisjen, orën dhe numrin e vendeve të lira.
- Detajet e udhëtimit përdorin të njëjtin ID dhe të njëjtat të dhëna si lista për të verifikuar përputhjen.
- Kur një udhëtim ka 0 vende, butoni i kërkesës është i çaktivizuar dhe përdoruesi merr mesazhin e duhur.
- Kur një ID nuk ekziston, aplikacioni shfaq një gjendje të përshtatshme "nuk u gjet" dhe i jep përdoruesit mundësinë e kthimit te lista.

## Dy probleme që gjeta në raportin fillestar

1. **Të dhëna që nuk përputhen me aplikacionin:** Raporti përmendte një udhëtim për Gjakovë, por lista e lexuar nga databaza gjatë kontrollit përmbante Prishtinë, Peje dhe Lipjan, jo Gjakovë.
   - **Skedari:** `src/lib/udhetimet.ts`
   - **Korrigjimi:** Shembujt dhe provat më poshtë përdorin vetëm vlerat e kthyera nga aplikacioni.
2. **Lidhje të dyfishta për versionet:** Lidhjet “Para” dhe “Pas” ishin të njëjta dhe nuk provonin dy versione të kodit.
   - **Skedari:** `src/app/udhetimi/[id]/page.tsx`
   - **Korrigjimi:** Nuk u ndryshua kodi i aplikacionit në këtë ushtrim, prandaj nuk paraqiten commit-e të sajuara si korrigjim. Shto lidhje vetëm kur të kesh commit-e të veçanta “Para” dhe “Pas”.

## Provat

### Prova 1 — Lista dhe detajet

- **Hapat:** Hapa `/`, zgjodha udhëtimin me ID `1` dhe hapa `/udhetimi/1`.
- **Pritshmëria:** Lista dhe detajet tregojnë të njëjtin udhëtim.
- **Vëzhgimi:** API-ja dhe faqja e detajeve treguan nisjen Prishtinë, orën 08:00 dhe 2 vende të lira.

### Prova 2 — ID që mungon

- **Hapat:** Hapa `/udhetimi/99`.
- **Pritshmëria:** Shfaqet ekrani për udhëtim të pagjetur.
- **Vëzhgimi:** Shfaqet ekrani “UDHËTIMI NUK U GJET” me lidhjen për kthim te lista. Përgjigjja HTTP është 200, sepse Next.js nis streamimin para se kontrolli asinkron i databazës të përfundojë; pas nisjes së streamimit kodi HTTP nuk mund të ndryshohet në 404. Përmbajtja jo e gjetur shënohet `noindex`. Kjo nuk është një rezervim apo udhëtim i rremë.

### Prova 3 — Udhëtim pa vende

- **Hapat:** Hapa udhëtimin me ID `3` nga lista dhe pastaj faqen `/udhetimi/3/kerkesa`.
- **Pritshmëria:** Me 0 vende, nuk ofrohet kërkesë për rezervim.
- **Vëzhgimi:** Udhëtimi i Lipjanit tregon 0 vende. Detajet shfaqin butonin joaktiv “Nuk ka vende të lira”; faqja e kërkesës shfaq gjendjen “Nuk ka vende të lira”.

## Korrigjimi i kodit

Nuk ndryshova kodin e aplikacionit, sepse rrjedhat ekzistuese u sollën siç pritej nga kërkesat e Java 7. Kjo do të thotë: lista dhe detajet përputhen, ID-ja e padisponueshme tregon gjendjen e "nuk u gjet", dhe skenari me 0 vende bllokon kërkesën pa rrezik real.

Nëse do të kërkohej një korrigjim real i kodit, do të ndërtohej një version i ri "Para" dhe "Pas" me vendosjen e vlerës së një udhëtimi, validimin e ID-së dhe testin e plotësimit të kërkesës. Në këtë rast nuk ka commit të përshtatshëm në GitHub, prandaj raporti përdor përshkrimin e sjelljes së aplikacionit dhe jo lidhje të rreme.

## Ndihma nga AI

U përdor AI për të lexuar kërkesat e Java 7, kontrolluar rrjedhën dhe verifikuar sjelljen e faqeve. Nuk u ndryshua kodi i aplikacionit.

## Versionet

- **Para:** Nuk ka commit të veçantë “Para” për një korrigjim kodi në këtë ushtrim.
- **Pas:** Nuk ka commit të veçantë “Pas” për një korrigjim kodi në këtë ushtrim. Mos përdor të njëjtën lidhje për të dy versionet.
