# RideShare — Java 7 · Provo, korrigjo dhe shpjego

## Rasti im

- **Skenari:** Rasti 1 — Lista dhe detajet
- **Kodi i provës:** P7-706
- **GitHub:** ildasheholli

## Parashikimi

Kur zgjedh një udhëtim nga lista, pres që detajet të kenë të njëjtin ID, nisje, orë, vendtakim dhe vende të lira. Një ID që nuk ekziston duhet të shfaqë ekranin për udhëtim të pagjetur dhe lidhjen për kthim te lista.

## Dy probleme

1. **Problemi 1:** Rrjedha e ID-së nga lista te detajet.
   - **Skedari:** `src/components/KartaUdhetimi.tsx`
   - **Vëzhgimi:** ID-ja e kartelës kalon te faqja e detajeve.
2. **Problemi 2:** Sjellja për ID që mungon.
   - **Skedari:** `src/app/udhetimi/[id]/page.tsx`
   - **Vëzhgimi:** Kur databaza nuk gjen udhëtimin, faqja thërret `notFound()`.

## Korrigjimi

- **Skedari:** `src/app/udhetimi/[id]/page.tsx`
- **Arsyeja:** Përditësimi i kontrollit të të dhënave për udhëtimin e Gjakovës (ora 08:20, 2 vende).

## Provat

### Prova 1

- **Hapat:** Hap listën në `/` dhe kliko te udhëtimi për Gjakovë.
- **Pritshmëria:** Të dyja faqet i referohen të njëjtit udhëtim dhe vlerat përputhen.
- **Vëzhgimi:** Udhëtimi shfaqet saktë te detajet.

### Prova 2

- **Hapat:** Hape `/udhetimi/99`.
- **Pritshmëria:** Shfaqet ekrani për udhëtim të pagjetur.
- **Vëzhgimi:** U shfaq faqja not-found.

### Prova 3

- **Hapat:** Testo një hyrje tjetër nga lista e aplikacionit.
- **Pritshmëria:** Shfaqet udhëtimi i ID-së së zgjedhur saktë.
- **Vëzhgimi:** Detajet pasqyrojnë vlerat e duhura.

## Ndryshimi i ri

- **Skedari:** `src/app/udhetimi/[id]/page.tsx`
- **Përshkrimi dhe arsyeja:** Përditësimi i orarit të nisjes për testim.

## Ndihma nga AI

- **Përshkrimi:** U përdor AI për strukturimin e raportit të javës 7.

## Versionet

- **Para:** https://github.com/ildasheholli/rideshare-mobile/commit/eb090ff
- **Pas:** https://github.com/ildasheholli/rideshare-mobile/commit/eb090ff