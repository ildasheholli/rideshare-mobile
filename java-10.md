# RideShare — Java 10

## Çfarë ndërtova
Kërkesa ruhet në Neon me udhëtimin dhe udhëtarin nga sesioni. Shoferi sheh kërkesat vetëm për udhëtimin e vet; udhëtari sheh vetëm të vetën. Të dy ekranet rilexojnë gjendjen çdo pesë sekonda. Gjatë shkëputjes ekrani ruan vlerat e fundit, shfaq “Po rilidhemi” dhe bllokon veprimet.

Pranimi ekzekutohet nga funksioni `prano_udhetim_kerkesen` në databazë: kyç udhëtimin dhe kërkesën, pranon vetëm kërkesën në pritje dhe ul vendet një herë. Kufizimi unik ndalon kërkesa të përsëritura nga i njëjti udhëtar për të njëjtin udhëtim.

## Përgatitja e provës
Për provën e databazës krijova përkohësisht një udhëtim fiktiv me dy vende dhe profile testimi, pastaj i fshiva brenda të njëjtit bllok prove. Nuk përdora llogari reale dhe nuk krijova dy sesione të shfletuesit. Hyrja GitHub në mjedisin lokal nuk është konfiguruar ende.

## Provat që bëra
### Prova 1: Rasti 1 · Kërkesa mbërrin te shoferi
- Hapat: Provova endpoint-in e leximit pa sesion dhe pastaj simulova përgjigjen e tij me një kërkesë në pritje në Playwright.
- Çfarë prisja: Kërkesa të ruhet me ID-në e udhëtarit nga sesioni dhe të jetë e dukshme vetëm për udhëtarin dhe shoferin pronar.
- Çfarë pa realisht shoferi dhe udhëtari, pa Refresh: Me përgjigje të simuluar, ekrani i shoferit shfaqi kërkesën “Në pritje” dhe 2 vende. Nuk i provova dy shfletues me llogari reale, sepse OAuth-i lokal nuk është konfiguruar.
- Ku e verifikova ruajtjen: Prova e përkohshme në Neon krijoi kërkesa testimi dhe ushtroi funksionin e pranimit. Endpoint-i real i leximit u provua pa sesion dhe refuzoi kërkesën me 401. Rreshtat testues u fshinë; leximi i autorizuar mbetet për t'u provuar.

### Prova 2: Rasti 2 · Pranimi përditëson të dy ekranet
- Hapat dhe vendet para/pas: Në Neon pranova kërkesën e parë nga 2 në 1 vend; pranova një të dytë nga 1 në 0.
- Përsëritja e pranimit dhe prova me 0 vende: Përsëritja e së njëjtës kërkesë ktheu `already_accepted` dhe la 1 vend; kërkesa tjetër me 0 vende u refuzua dhe mbeti në pritje. Në një provë paralele me 1 vend dhe dy kërkesa, njëra u pranua, tjetra mbeti në pritje dhe vendet nuk ranë nën zero.
- Çfarë pashë realisht te të dy përdoruesit: Nuk i verifikova dy ekranet me sesione reale. Funksioni i databazës kaloi provat e kontrolluara të përsëritjes, konkurrencës dhe refuzimit pa vende.

### Prova 3: Rasti 3 · Ndërprerja dhe rilidhja
- ID-ja e udhëtimit të ri të provës, cila dritare ishte offline dhe si e provova: Nuk e provova me dy dritare; OAuth-i lokal mungon.
- Pamja e fundit gjatë ndërprerjes: Në Playwright simulova ngjarjen `offline`; ekrani ruajti 2 vendet e fundit, shfaqi “Po rilidhemi” dhe çaktivizoi pranimin.
- Çfarë ndryshoi pas rilidhjes: Simulova `online` dhe përgjigje të re nga API-ja; ekrani u përditësua menjëherë në 1 vend dhe hoqi paralajmërimin. Testi me Network → Offline dhe dy sesione reale mbetet për t'u bërë.

## Ku gjendet puna
Skedarët kryesorë: `schema-java10.sql`, `src/app/udhetimi/[id]/actions.ts`, `src/app/api/udhetimet/[id]/gjendja/route.ts`, `src/components/GjendjaUdhetimit.tsx` dhe faqet e detajeve/kërkesës.
Migrimi u aplikua në Neon-in e zhvillimit. Repository: https://github.com/ildasheholli/rideshare-mobile
Faqja e udhëtimit: http://localhost:3000/udhetimi/2

## Prova me kolegun
Nuk u bë provë me koleg. Prova me dy përdorues, parashikimi dhe vëzhgimi real mbeten për t'u shënuar pas konfigurimit të hyrjes.

## Çfarë mbetet për përmirësim
Duhet konfiguruar hyrja GitHub dhe caktuar një udhëtim me dy vende te shoferi testues, pastaj të provohen dy sesione, polling-u dhe ndërprerja e rrjetit në shfletues. Pa këto, ndërfaqja dhe veprimet e sesioneve nuk janë testuar fund më fund.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
AI ndihmoi me veprimet e serverit, polling-un dhe funksionin atomik të pranimit. Verifikova me lint/build, migrimin në Neon, pyetjen e leximit dhe provë të përkohshme të pranimit të përsëritur dhe rasteve me zero vende.

## Pas dorëzimit të parë — përditëso më vonë
Ky seksion mund të mbetet kështu në dorëzimin e parë. Pasi të marrësh përgjigjen, shto linkun e Issue-t, commit-in e kontrolluar dhe çfarë kaloi ose duhet korrigjuar. 2/2 teknikisht nuk provon funksionimin e aplikacionit.
