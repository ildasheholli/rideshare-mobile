# RideShare — Java 7 · Provo, korrigjo dhe shpjego

## Rasti im

- **Skenari:** Rasti 1 — Lista dhe detajet
- **Kodi i provës:** P7-... (plotësoje me kodin tënd nga gjeneratori i ushtrimit)

## Parashikimi

Kur zgjedh një udhëtim nga lista, pres që detajet të kenë të njëjtin ID, nisje, orë, vendtakim dhe vende të lira. Një ID që nuk ekziston duhet të shfaqë faqen 404 dhe lidhjen për kthim te lista.

## Dy sjellje që kontrollova

1. **Kontrolli:** Rrjedha e ID-së nga lista te detajet.
   - **Skedari:** `src/components/KartaUdhetimi.tsx` dhe `src/app/udhetimi/[id]/page.tsx`
   - **Vëzhgimi:** ID-ja e kartelës kalon te faqja e detajeve; faqja merr të njëjtat të dhëna nga `gjejUdhetimin(id)`.
2. **Kontrolli:** Sjellja për ID që mungon.
   - **Skedari:** `src/app/udhetimi/[id]/page.tsx` dhe `src/app/udhetimi/[id]/not-found.tsx`
   - **Vëzhgimi:** Kur databaza nuk gjen udhëtimin, faqja thërret `notFound()` dhe paraqet mesazhin 404 me lidhje te lista.

## Korrigjimi

- **Skedari i ndryshuar:** Asnjë.
- **Arsyeja:** Nuk u konfirmua ndonjë gabim real në këto dy kontrolle. Nuk krijova gabim artificial; para dorëzimit duhet të kontrolloj një problem tjetër real në projekt dhe, nëse nuk gjej të tillë, ta sqaroj me profesoren.

## Provat

Plotëso vëzhgimet pasi t'i kryesh në aplikacionin dhe databazën tënde. Mos shëno një provë si të kaluar pa e ekzekutuar.

### Prova 1 — Rrjedha

- **Hapat:** Hap listën dhe një udhëtim; krahaso ID-në, nisjen, orën, vendtakimin dhe vendet te lista dhe te detajet.
- **Pritshmëria:** Të dyja faqet i referohen të njëjtit udhëtim dhe vlerat përputhen.
- **Vëzhgimi:** [PLOTËSO pas provës]

### Prova 2 — ID që mungon

- **Hapat:** Hape `/udhetimi/99`.
- **Pritshmëria:** Shfaqet faqja 404 dhe lidhja për t'u kthyer te lista.
- **Vëzhgimi:** [PLOTËSO pas provës]

### Prova 3 — Një hyrje tjetër

- **Hapat:** Zgjidh një ID tjetër ekzistuese nga lista dhe krahaso të njëjtat fusha në detaje.
- **Pritshmëria:** Shfaqet udhëtimi i ID-së së zgjedhur, jo detajet e udhëtimit paraprak.
- **Vëzhgimi:** [PLOTËSO pas provës]

## Ndryshimi i ri

- **Skedari:** [PLOTËSO vetëm nëse bën një korrigjim real]
- **Përshkrimi dhe arsyeja:** [PLOTËSO; nëse nuk bën korrigjim, shpjego çfarë kontrollove dhe pse nuk nevojitej ndryshim]
- **Ndihma nga AI:** U përdor për të lexuar kërkesat e Java 7 dhe për të shqyrtuar rrjedhën e ID-së. Nuk u ndryshua kodi.

## Versionet

- **Para:** [LINKU I COMMIT-IT PARA KORRIGJIMIT]
- **Pas:** [LINKU I COMMIT-IT TË KORRIGJIMIT, nëse ka]
