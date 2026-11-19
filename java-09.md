# RideShare — Java 9

## Çfarë ndërtova
Shtova preferimet personale të udhëtimeve për përdoruesin e kyçur. Ylli dhe numri ndryshojnë menjëherë; serveri e ruan preferimin në Neon duke përdorur ID-në nga sesioni. Pas suksesit, preferimi lexohet sërish nga databaza pas rifreskimit. Në gabim, ylli dhe numri rikthehen dhe përdoruesi mund të provojë përsëri.

`schema-java09.sql` krijon tabelën e preferimeve me kufizim unik për çiftin GitHub–udhëtim. Veprimi i serverit kontrollon sesionin dhe përdor `ON CONFLICT DO NOTHING`, që përsëritja të mos krijojë kopje. Nuk shtova heqjen e preferimit.

## Provat që bëra
### Prova 1: Ruajtja e suksesshme mbetet pas rifreskimit.
Hapat: Kontrollova faqen dhe kodin e leximit fillestar nga serveri.
Pritshmëria: Pas ruajtjes, preferimi lexohet përsëri nga Neon dhe mbetet pas rifreskimit.
Vëzhgimi: Faqja lokale shfaqi tri udhëtime, zero preferime dhe lidhjen për hyrje. Aplikova `schema-java09.sql` në Neon-in lokal të zhvillimit dhe verifikova kolonat, kufizimin unik dhe pyetjen e leximit. Nuk e provova ruajtjen reale pas hyrjes, sepse hyrja GitHub në mjedisin lokal nuk është konfiguruar.

### Prova 2: Gabimi i serverit nuk lë një sukses të rremë në ekran.
Hapat: Kontrollova degën e gabimit të veprimit dhe gjendjen optimistike në ndërfaqe.
Pritshmëria: Kur veprimi dështon, ylli dhe numri kthehen në gjendjen e mëparshme dhe shfaqet mundësia për riprovim.
Vëzhgimi: Kodi e rikthen gjendjen nëse veprimi kthen gabim ose kërkesa dështon. Nuk e provova kundër një gabimi real në Neon, sepse nuk ka sesion të konfiguruar për të kryer veprimin.

### Prova 3: Klikimet e përsëritura nuk krijojnë kopje.
Hapat: Kontrollova ruajtjen në server dhe kufizimin në SQL.
Pritshmëria: Butoni nuk pranon klikime të tjera gjatë pritjes dhe databaza lejon vetëm një rresht për çiftin përdorues–udhëtim.
Vëzhgimi: Butoni çaktivizohet gjatë pritjes; ruajtja përdor `ON CONFLICT DO NOTHING`, ndërsa `schema-java09.sql` përcakton `UNIQUE (github_id, udhetim_id)`. Prova me disa klikime dhe kontrolli i rreshtave në Neon mbeten për t'u bërë pas konfigurimit të hyrjes dhe migrimit.

## Ku gjendet puna
Skedarët kryesorë: `schema-java09.sql`, `src/lib/preferimet.ts`, `src/app/preferimet/actions.ts`, `src/components/Preferimet.tsx`, `src/components/KartaUdhetimi.tsx` dhe `src/app/page.tsx`.
Repository: https://github.com/ildasheholli/rideshare-mobile
Demonstrimi lokal: http://localhost:3000/

## Çfarë mbetet për përmirësim
Migrimi u aplikua në Neon-in lokal të zhvillimit; duhet ekzekutuar edhe në çdo databazë tjetër që përdoret për publikim. Hyrja GitHub duhet konfiguruar për të provuar ruajtjen reale. Preferimi mund të shtohet, por heqja nuk është pjesë e detyrës.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
AI ndihmoi me implementimin e ruajtjes optimistike, veprimit server-side, kufizimit unik dhe raportit. Verifikova kodin me lint dhe build; ruajtja reale duhet verifikuar pas konfigurimit të Neon dhe hyrjes GitHub.
