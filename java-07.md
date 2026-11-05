# RideShare — Java 7 · Provo, korrigjo dhe shpjego

## Rasti im

- **Skenari:** Rasti 1 — Lista dhe detajet
- **Kodi i provës:** P7-706

## Parashikimi

Kur zgjedh një udhëtim nga lista, pres që detajet të kenë të njëjtin ID, nisje, orë, vendtakim dhe vende të lira. Një ID që nuk ekziston duhet të shfaqë ekranin për udhëtim të pagjetur dhe lidhjen për kthim te lista.

## Dy probleme

1. **Problemi 1:** Rrjedha e ID-së nga lista te detajet.
   - **Skedari:** `src/components/KartaUdhetimi.tsx` dhe `src/app/udhetimi/[id]/page.tsx`
   - **Vëzhgimi:** ID-ja e kartelës kalon te faqja e detajeve; faqja merr të njëjtat të dhëna nga `gjejUdhetimin(id)`.
2. **Problemi 2:** Sjellja për ID që mungon.
   - **Skedari:** `src/app/udhetimi/[id]/page.tsx` dhe `src/app/udhetimi/[id]/not-found.tsx`
   - **Vëzhgimi:** Kur databaza nuk gjen udhëtimin, faqja thërret `notFound()` dhe përdor ekranin për ID që mungon.

## Korrigjimi

- **Skedari:** `src/app/udhetimi/[id]/page.tsx`
- **Arsyeja:** U përditësua kontrolli i të dhënave për udhëtimin për të siguruar shfaqjen e saktë të detajeve dhe menaxhimin e rasteve kur nuk ka vende të lira.

## Provat

### Prova 1

- **Hapat:** Hap listën në `/` dhe kliko te udhëtimi me ID 2 (Ferizaj → AAB). Krahaso të dhënat.
- **Pritshmëria:** Të dyja faqet i referohen të njëjtit udhëtim dhe vlerat përputhen.
- **Vëzhgimi:** ID 2 shfaqet saktë te detajet me të njëjtat të dhëna.

### Prova 2

- **Hapat:** Shkruaj me dorë te shiriti i adresës `/udhetimi/99`.
- **Pritshmëria:** Shfaqet ekrani për udhëtim të pagjetur dhe lidhja për t'u kthyer te lista.
- **Vëzhgimi:** U shfaq faqja `not-found.tsx` me mesazhin "Udhëtimi nuk u gjet".

### Prova 3

- **Hapat:** Zgjidh udhëtimin me ID 1 (Prizren → AAB) nga lista.
- **Pritshmëria:** Shfaqet udhëtimi i ID-së së zgjedhur, jo detajet e udhëtimit paraprak.
- **Vëzhgimi:** U hapën detajet për ID 1 me orarin dhe vendet e lira përkatëse.

## Ndryshimi i ri

- **Skedari:** `src/app/udhetimi/[id]/page.tsx`
- **Përshkrimi dhe arsyeja:** Shtohet kontrolli për vende të lira për të deaktivizuar butonin e simulimit të rezervimit.

## Ndihma nga AI

- **Përshkrimi:** U përdor AI për verifikimin e strukturës së raportit java-07.md dhe komandat Git.

## Versionet

- **Para:** https://github.com/ildasheholli/rideshare-mobile/commit/eb090ff
- **Pas:** https://github.com/ildasheholli/rideshare-mobile/commit/eb090ff