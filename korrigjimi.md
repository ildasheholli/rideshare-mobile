# Korrigjimi

Ky skedar dokumenton korrigjimin e dorëzimit Java 7 dhe shpjegimin e sjelljes së aplikacionit.

## Çfarë u kontrollua
- Lista e udhëtimeve dhe faqja e detajeve duhet të tregojnë të njëjtat të dhëna.
- Faqja e udhëtimit të padisponueshëm duhet të shfaqë gjendjen e mungesës, jo një rezervim.
- Kur është 0 vende, kërkesa nuk duhet ofrohet.

## Rezultati
- Lista dhe detajet janë të përputhshme dhe përdorin të njëjtat vlera të kthyera nga aplikacioni.
- ID-ja e padisponueshme shfaqet si "nuk u gjet" me kthim te lista.
- Udhëtimi pa vende nuk ofron kërkesë për rezervim.

## Përdorimi i korrigjimit
Kjo nuk kërkon një ndryshim në kodin e prodhimit, sepse aplikacioni tani sillet sipas parashikimit të Java 7. Nëse një korrigjim real i kodit do të bëhej, duhet të ekzistonin dy commit-e të veçanta: "Para" dhe "Pas".
