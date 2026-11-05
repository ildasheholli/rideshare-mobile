# RideShare — Java 7 · Provo, korrigjo dhe shpjego

## Rasti im

- **Skenari:** Rasti 1 — Lista dhe detajet
- **Kodi i provës:** P7-R1-RIDE

## Parashikimi

Kur zgjedh një udhëtim nga lista, pres që detajet të kenë të njëjtin ID, nisje, orë, vendtakim dhe vende të lira. Një ID që nuk ekziston duhet të shfaqë ekranin për udhëtim të pagjetur dhe lidhjen për kthim te lista.

## Dy sjellje që kontrollova

1. **Kontrolli:** Rrjedha e ID-së nga lista te detajet.
   - **Skedari:** `src/components/KartaUdhetimi.tsx` dhe `src/app/udhetimi/[id]/page.tsx`
   - **Vëzhgimi:** ID-ja e kartelës kalon te faqja e detajeve; faqja merr të njëjtat të dhëna nga `gjejUdhetimin(id)`.
2. **Kontrolli:** Sjellja për ID që mungon.
   - **Skedari:** `src/app/udhetimi/[id]/page.tsx` dhe `src/app/udhetimi/[id]/not-found.tsx`
   - **Vëzhgimi:** Kur databaza nuk gjen udhëtimin, faqja thërret `notFound()` dhe përdor ekranin për ID që mungon, me lidhje te lista.

## Korrigjimi

- **Skedari i ndryshuar:** `src/app/udhetimi/[id]/page.tsx`
- **Arsyeja:** U ndryshua gjendja e butonit të rezervimit/kërkesës kur vendet e lira janë 0, duke e bërë joaktiv (disabled) dhe duke shtuar mesazhin qartësues që të mos premtohet rezervim real.

## Provat

### Prova 1 — Rrjedha

- **Hapat:** Hap listën në `/` dhe kliko te udhëtimi me ID 2 (Ferizaj → AAB). Krahaso të dhënat.
- **Pritshmëria:** Të dyja faqet i referohen të njëjtit udhëtim dhe vlerat përputhen.
- **Vëzhgimi:** ID 2 shfaqet saktë te detajet me të njëjtat të dhëna (ora 08:15, vendet e lira 2).

### Prova 2 — ID që mungon

- **Hapat:** Shkruaj me dorë te shiriti i adresës `/udhetimi/99`.
- **Pritshmëria:** Shfaqet ekrani për udhëtim të pagjetur dhe lidhja për t'u kthyer te lista.
- **Vëzhgimi:** U shfaq faqja `not-found.tsx` me mesazhin "Udhëtimi nuk u gjet" dhe butonin e kthimit te lista.

### Prova 3 — Një hyrje tjetër

- **Hapat:** Zgjidh udhëtimin me ID 1 (Prizren → AAB) nga lista.
- **Pritshmëria:** Shfaqet udhëtimi i ID-së së zgjedhur, jo detajet e udhëtimit paraprak.
- **Vëzhgimi:** U hapën detajet për ID 1 me orarin 08:00 dhe 3 vende të lira.

## Ndryshimi i ri

- **Skedari:** `src/app/udhetimi/[id]/page.tsx`
- **Përshkrimi dhe arsyeja:** Shtohet kontrolli për vende të lira (`vende === 0`) për të deaktivizuar butonin e simulimit të rezervimit.
- **Ndihma nga AI:** U përdor AI për të verifikuar strukturimin e raportit `java-07.md` dhe për komandat e Git në terminal.

## Versionet

- **Para:** https://github.com/ildasheholli/rideshare-mobile/commit/eb090ff
- **Pas:** https://github.com/ildasheholli/rideshare-mobile/commit/eb090ff
