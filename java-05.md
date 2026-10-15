# RideShare — Java 5 · Hyrja dhe lejet

## Çfarë ndërtova

Shtova hyrjen me GitHub përmes NextAuth v4, profilin me rolin `udhetar` si parazgjedhje, panelin `/panel` dhe kontrollin server-side për ndryshimin e orës. Identiteti vjen nga sesioni GitHub; roli dhe pronësia lexohen nga Neon. `UPDATE` ruan orën vetëm kur përdoruesi është shofer dhe `shofer_id` i udhëtimit përputhet me ID-në e tij. Formulari nuk vendos vetë rolin ose pronësinë.

`schema-java05.sql` krijon tabelën e profileve, shton `shofer_id` dhe cakton ID 1 te shoferi demo. ID 2 mbetet pa pronar derisa të hyj me GitHub dhe ta caktoj veten në SQL, siç kërkon ushtrimi.

## Provat që bëra

### Prova 1: Hyrja, rifreskimi dhe dalja

Nuk përfundova hyrjen, rifreskimin e sesionit ose daljen. Në localhost `/panel` shfaq udhëzimin se hyrja me GitHub pret `GITHUB_SECRET`. GitHub OAuth App u krijua me callback-un lokal, por secret-i nuk është vendosur ende në Vercel Development ose `.env.development.local`.

### Prova 2: Shoferi ndryshon udhëtimin e vet

Nuk e provova ruajtjen si shofer. SQL Editor-i konfirmoi se ID 2 është ende `08:15` dhe pa pronar; prandaj nuk pretendova se ndryshimi në `08:25` u krye.

### Prova 3: Veprimi pa leje refuzohet

Nuk e provova formularin me ID 1 pa hyrë si shofer. Kodi e kontrollon rolin në Neon dhe pronësinë në vetë `UPDATE`; rezultati real duhet provuar pasi të konfigurohet secret-i dhe të caktohet pronari i ID 2.

## Ku gjendet puna

Repository: [ildasheholli/rideshare-mobile](https://github.com/ildasheholli/rideshare-mobile). Skedarët kryesorë janë `schema-java05.sql`, `src/lib/auth.ts`, `src/lib/lejet.ts`, `src/app/api/auth/[...nextauth]/route.ts`, `src/app/panel/page.tsx`, `src/app/panel/actions.ts` dhe `src/components/Hyrja.tsx`.

## Çfarë mbetet për përmirësim

Hyrja kërkon `GITHUB_SECRET` vetëm në Vercel Development dhe `.env.development.local`; sekreti nuk duhet vendosur në kod ose Production për callback-un lokal. Pas hyrjes, duhet caktuar ID-ja jote GitHub si shofer dhe pronar i udhëtimit 2, pastaj të kryhen tri provat. Kërkesa për vend mbetet simulim dhe nuk krijon rezervim.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

Përdora AI për të ndërtuar hyrjen, kontrollin e lejeve dhe panelin. Verifikova build-in, lint-in, SQL-në në Neon, pronarin demo për ID 1 dhe gjendjen e panelit lokalisht.