# RideShare — Java 6 · PWA dhe puna offline

Ruaje si java-06.md pranë README të repository-t, jashtë aplikacioni/.
Hiqi. Mos vendos sekrete, email ose fotografi kredencialesh.

## Çfarë ndërtova
Manifesti te `/manifest.webmanifest` jep emrin, pamjen dhe ikonat e RideShare AAB për instalim si PWA. Service worker-i ruan skedarin e leximit offline dhe ikonat, pastaj ruan kopjen e listës publike kur ajo merret me sukses nga serveri. Faqja `/offline.html` e shfaq atë kopje vetëm për lexim; nuk krijon ose konfirmon rezervime.

## Provat që bëra
### Prova 1: Manifesti dhe vizita online
Nuk e verifikova në shfletues. Manifesti është te `/manifest.webmanifest`, me emrin “RideShare AAB” dhe ikonat `icon-192.png` (192×192) dhe `icon-512.png` (512×512). Kodi e kërkon listën nga `/api/udhetimet` dhe e ruan kur përgjigjja është e vlefshme, por nuk konfirmova në pajisje nëse kopja u ruajt ose nëse shfletuesi ofroi instalim.

### Prova 2: Pa internet dhe pas rifreskimit
Nuk e simulova ndërprerjen dhe nuk i verifikova tri kartat pas rifreskimit, ndaj nuk mund të raportoj kohë ose mesazh të parë në pajisje. Kodi shfaq kohën e ruajtjes së kopjes së fundit të suksesshme; nuk cakton afat automatik skadimi. Kur hapet kopja offline, faqja paralajmëron se lista mund të jetë e vjetruar dhe se rezervimi nuk është konfirmuar. Kjo është vetëm kopje leximi: veprimi për rezervim është i çaktivizuar dhe nuk dërgohet kërkesë te serveri.

### Prova 3: Lidhja rikthehet
Nuk e ndryshova udhëtimin ID 2 në Neon dhe nuk e provova rikthimin e lidhjes ose butonin “Rifresko listën”. Shënimi i Java 5 dokumenton ID 2 me orën `08:15` dhe pa pronar; nuk ka orë të re të verifikuar. Prandaj ora fillestare nuk është ndryshuar nga kjo provë. Kur lidhja rikthehet, faqja kërkon që përdoruesi të shtypë “Rifresko listën”; atëherë kopja përditësohet vetëm nëse serveri kthen listën me sukses.

## Ku gjendet puna
Repository: [ildasheholli/rideshare-mobile](https://github.com/ildasheholli/rideshare-mobile). Skedarët kryesorë të kësaj pune janë `src/app/manifest.ts`, `src/components/Pwa.tsx`, `public/sw.js`, `public/offline.html`, `src/app/api/udhetimet/route.ts` dhe ikonat në `public/icons/`. Nuk kam link të verifikuar për demo në Vercel.

## Çfarë mbetet për përmirësim
Në vizitën e parë pa kopje të ruajtur, faqja tregon se ende nuk ka listë dhe udhëzon përdoruesin ta hapë aplikacionin me internet e të provojë përsëri. Offline mund të lexohet vetëm lista e fundit e ruajtur; ajo mund të jetë e vjetruar, nuk përditësohet pa server dhe nuk mund të konfirmojë rezervim ose vende të lira.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
Përdora AI për të ndihmuar me përshkrimin e manifestit, service worker-it dhe kopjes offline. Nuk i kryeva vetë provat në pajisje për ndërprerjen e rrjetit, instalimin ose përditësimin e ID 2 në Neon.
