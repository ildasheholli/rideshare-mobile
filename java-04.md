# RideShare — Java 4 · Neon dhe PostgreSQL

## Çfarë ndërtova

Lista dhe detajet lexojnë udhëtimet nga PostgreSQL në Neon në anën e serverit. Shtova tabelën `udhetimet` me kufizime për orën dhe numrin e vendeve, si dhe tri udhëtime fillestare në `schema.sql`. Lidhja lokale përdor `DATABASE_URL`; në Vercel përdoret variabla private `STORAGE_POSTGRES_URL`. Kërkesa për vend mbetet simulim dhe nuk ruhet në databazë.

## Provat që bëra

### Prova 1: Ndryshimi në databazë shfaqet në aplikacion

SQL Editor-i ktheu tri rreshta. Lista në aplikacion shfaqi tri udhëtimet. Detajet e ID 2 shfaqën orën 08:15 dhe një vend të lirë. Nuk e ndryshova orën në 08:25, prandaj nuk e provova rifreskimin pas ndryshimit në SQL.

### Prova 2: Lista bosh dhe rikthimi

Nuk e provova përkohësisht pyetjen me `WHERE false`. Verifikova se query-ja normale kthen tri udhëtime dhe ato shfaqen në listë.

### Prova 3: Lidhja mungon, rikthimi dhe siguria

Lokalisht fillimisht mungonte `.env.local`. E lidha projektin me Vercel CLI dhe tërhoqa variablat e Production në `.env.local`; aplikacioni lokal më pas shfaqi tri udhëtimet. `git check-ignore .env.local` konfirmoi se skedari përjashtohet nga Git. Nuk e riemërtova variablën për të provuar rastin e lidhjes së munguar.

## Ku gjendet puna

Kodi dhe `schema.sql` janë në repository: [ildasheholli/rideshare-mobile](https://github.com/ildasheholli/rideshare-mobile). Ndryshimet kryesore janë te `src/lib/udhetimet.ts`, `src/app/page.tsx`, `src/app/udhetimi/[id]/page.tsx` dhe `src/app/udhetimi/[id]/kerkesa/page.tsx`.

Aplikacioni në Vercel: [rideshare-mobile-ilda2.vercel.app](https://rideshare-mobile-ilda2.vercel.app/).

## Çfarë mbetet për përmirësim

Nuk ka rezervim real; kërkesa “Në pritje” mbetet demonstrim. Duhet kryer prova e ndryshimit të orës dhe prova e listës bosh. Gjithashtu, domeni dublikatë `rideshare-mobile-royy.vercel.app` shfaqi “Peje” për ID 2, ndërsa SQL Editor-i dhe domeni kryesor shfaqën “Fushë Kosovë”; duhet kontrolluar që të dy projektet përdorin të njëjtën degë të Neon-it.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

Përdora AI për lidhjen e aplikacionit me Neon, konfigurimin e deploy-it dhe krijimin e këtij raporti. Kontrollova vetë rezultatin e SQL Editor-it, listën, detajet e ID 2, deploy-in dhe përjashtimin e `.env.local` nga Git.