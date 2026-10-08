# Java 3: kartat dhe faqet

## Prova 1 · Lista në telefon

Faqja kryesore shfaq tri udhëtime fiktive dhe përshtatet për ekran të ngushtë. Nuk kërkohet lëvizje horizontale.

## Prova 2 · Detajet dhe vendet

Udhëtimi 2 hapet te `/udhetimi/2` me vendtakimin “Te stacioni kryesor” dhe një vend të lirë. Udhëtimi 3 nuk lejon kërkesë sepse nuk ka vende të lira. ID-ja 99 shfaq faqen “Udhëtimi nuk u gjet”.

## Prova 3 · Kërkesa dhe kthimi

“Kërko vend” për udhëtimin 2 hap `/udhetimi/2/kerkesa` dhe shfaq “Simulim: Në pritje”. Kthimi te detajet dhe lista funksionon. Kërkesa nuk dërgohet dhe nuk ruhet.

## Verifikimi teknik

`npm run build` përfundoi me sukses. Rrugët e udhëtimeve 1, 2 dhe 3 u gjeneruan gjatë build-it.