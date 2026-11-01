# Bastians skolträning

En fristående webbapp för årskurs 3 med sex korta lästexter och 18 läsfrågor, 1 000 engelska ord, 1 000 svenska ord med förklaringar, mattegenerator på tre nivåer, uppläsning, blandade pass med tio frågor och lokala framsteg med export/import.

Starta med `npm start` och öppna http://localhost:4183. Kör `npm test` för innehålls- och generatorkontroller. Webbplatsen kräver inga externa bibliotek eller inloggning.

Ordfrågor prioriterar ord som är nya eller tidigare har varit svåra. Mattens nivå styr talområdet i plus och minus och val av tabeller. Uppläsning använder enhetens tillgängliga röster. Resultat sparas bara i webbläsaren; export behövs för byte av enhet. Dagens pass kan göras flera gånger och använder tre läsfrågor, tre mattefrågor, två svenska ord och två engelska ord.

Materialet är allmän träning för årskurs 3 och är inte hämtat från skolans läromedel eller individuella planering.

Ordmaterialet har 50 omgångar med 20 ord per språk och en sökbar lista. Se WORD-SOURCES.md för urval, attribution och licenser. Ord-id bygger på ordet, så framsteg behålls när listan utökas eller ändrar ordning. Gamla framsteg från den första korta ordlistan flyttas automatiskt.

## Läroplan och Upptäckarverkstan

Under Läroplan finns en inventering av 16 ämnen mot Lgr22, med status per område, luckor och källor. Samma inventering finns i CURRICULUM-AUDIT.md. Den bedömer webbplatsens innehåll, inte elevens kunskaper.

Upptäckarverkstan innehåller tio lektioner om AI, 3D-print och C++, med 20 frågor, uppläsning och praktiska uppgifter. Demonstrationerna visar en liten modell med närmaste granne, genererar ett enkelt rätblock i STL-format och förhandsvisar färdiga C++-exempel. Ingen extern AI-tjänst anropas och C++ kompileras inte i webbläsaren. STL-filen måste öppnas av en vuxen i en slicer, med millimeter som enhet. Faktisk utskrift ska skötas av en vuxen.
