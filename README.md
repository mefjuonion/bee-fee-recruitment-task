# ZADANIE REKRUTACYJNE BEE-FEE
(było napisane po polsku, więc i readmie te dałem po polsku, jak co to zmienię, tylko dajcie znać)

## tl;dr
```
    nvm use
    npm i
    npm start
```

## Trochę zbędnego gadania na start
1. Standardowo w projektach używam mise i lefthooka do linta i ewentualnych testów na pre-commit, github actions i deployu terraformem, ale to chyba overkill na gierkę, która ma działać po sklonowaniu repo. 
2. Zgodnie z AC punkty miały spadać z nieba w postaci jedzenia i tak jest, ale asset, który dostałem bardzo dobrze radzi sobie w chodzeniu do przodu, potem przez chwilę kombinowałem z tłem (na wstępie chciałem się bawić vertex shaderem, ale w 2D i tak najlepiej było widać ten dym/cień drzew opadający na ziemię), więc mechanika właściwie ta sama, ale wygląda to bardziej spójnie.
3. Nie tak dawno popełniłem [gierkę we Three.js](https://smash-hit-app-cpsgf2fmpq-lm.a.run.app) opartą na [ECS](https://github.com/mefjuonion/smash-hit-web) i nie ukrywam, że gdyby nie AC taska, korciłoby mnie by znowu wykorzystać tę architekturę, tym bardziej, że kompozycja i deklarowane w niej systemy rozwiązują dość czytelnie problem wielodziedziczenia (istnieją chociażby elementy, które są jednocześnie kolidujące i responsywne, w tym wypdaku użyłem zwyczajnie interfejsu i zewnętrznej metody w utilsach, ale czułem zgrzyt, bo mógłbym po prostu wepchnąć odpowiednie komponenty do komponentów i stworzyć toższamy system, imo czystrze i bardziej przewidywalne) nie mniej chętnie pogadam na ten temat, lubię nie mieć racji xD
4. Co do gierki wspomnianej w punkcie 2, wchodzimy na stronkę, skanujemy telefonem QR i jak już wszystkie telefony są odpalone, klikamy start. Telefony są czymś na kształt pada, głównie dlatego, że żyroskop sprawdza się w roli celownika, na ten moment lepiej niż zabawy w AI, nie mniej testowałem to głównie na prywatnym iPhone i Macu, oraz osobno moimi pijanymi znajomymi na jednej imprezie. na której akurat nie mogłem byc (mówili, że spoko). To multiplayer na RTC, a obciążenie które powodowało wykożystanie diagramu voronoi do realistycznego pękania szkła doprowadziło mnie do wykorzystania webworkerów chyba pierwszy raz w życiu.
5. Na welcome screen mamy CEO styrtasiepali, tak nazwałem swoje JDG xD

## Architektrura projektu
```
src
-> core: bazowe elementy, klasy abstrakcyjne, kluczowe koncepty
-> managers: koordynują zadania, interakcje, reakacje i flow poszczególnych funkcjonalności
-> prefabs: gotowe elementy do umieszczenia w grze
-> shaders: shadery. Głównie wepchnąłem tam zmianę tekstury sceny opartą na fractional brownian noise i jakieś tam drobne upiększacze (a przynajmniej mam nadzieję, że upiększacze, designer miałby pewnie inne zdanie)
-> scenes: sceny, kontenery na wszystko co widać.
-> types, utlis: typy i narzędzia
```

0. `Game.ts` kontroluje flow gry, spina zaleności, reaguje na eventy.
1. Teoretycznie przy tak prostej grze możnaby trzymać punktację w storze projektu, ale ze względu na `wzięcie pod uwagę, że gra może być w przyszłości rozwijana` uznałem, że potencjalnie możemy rozważać multiplayer w przyszłości, a wówczas nadawanie cech poszczególnym graczom będzie konieczne.
2. Wyżej w projekcie mamy pluginy, chciałem postawić projekt na vite a ten ma problemy z pragmą (narzędziem do importu glsl w plikach glsl), to samo zrobiłem w projekcie omawianym wcześniej, jedyny dostępny plugin niestety nawala.
3. Dane na temat obecnego levelu mamy w `LevelManager`, zbiór levelów w `src/LEVELS.ts`, dodanie nowego to dosłownie ctrl+c, ctrl+v i dostosowanie parametrów.
4. Trochę się walnąłem w interpretacji zadania i bazowo oddzieliłem punkty od żyć, niby naprawione, ale daje znać na wypadek jakby ktoś był historią gita zainteresowany.
5. W `src` mamy `SETTINGS` - to zbiór ustawień projektu, jak ilość particles przy wybuchu, czy głośność dźwięków w tle.
6. `prefabs/ScoreLossZone` - zgodnie z AC gdy jedzenie spadnie poniżej gracza, ten traci życie. Oganięcie tego wykrywaniem dostępnej przestrzeni nie jest problemem, ale to jednak dodatkowa mechanika, która ze względu na założenia (gracz porusza się wyłącznie u dołu, przestrzeń jest statyczna (w moim przypadku nie do końca, ale ruch planszy trkatuję jako animację, nie jest interaktywna)) zdaje się zbędnym wzbogacaniem kodu. Wykrywanie kolizji i tak jest już zaimplementowane, a dodatkowy, spory i pojedynczy element nie wpłynie drastycznie na performance (mamy max FPSów, sprawdzałem w devtoolsach).
7. `managers/AssetsManager` - bazowo planowałem dać landing screen z preloadem w HTML, ale assety ładują się tak szybko, że okazało się to (chyba) zbędne, a że nie ma tego w AC to też jakoś bardzo się nad tym nie rozwlekałem. Nie mniej, gdybyśmy chcieli rozwijać grę, dodawać nowe assety, może się bardzo przydać.
8. Assety (chociażby butelki z trucizną czy robaczywe jabłka) sugerują, że w przyszłości niektóre spadające obiekty mogą być trucizną. W paczce z żarciem nie było instrukcji (jsona, w którym zdefiniowane jest na jakiej pozycji spritesheetu jest trucizna), a yagni jednak wymaga, bym potraktował to narazie jako zbędny domysł, ale każdy `FallingReward` przyjmuje w konstruktorze liczbę punktów, więc w wypadku takiej zmiany wystarczy nowy prefab, bliżniaćzy do `Food`, który zamiast samplować spritesheet będzie wybierać z niego poszczególne elementy i będzie miał punkty ujemne.
(**UPDATE**: jednak dodałem JSONA i wykorzystałem PIXI spritesheet)
9. Zakładając rozgrywkę multiplayer możnaby się pokusić o dodanie do eventu zmiany punktów ID gracza i drobną edycję `FallingRewardsManager` by smakołyki były współdzielone. Nie jest to karkołomne zadanie, tym bardziej, że sprawdzanie kolizji odnosi się do konkretnych elementów między którymi kolizja zaszła, nie jest globalne, jednak znowu na ten moment YAGNI, daję tylko znać, że było to przemyślane.
10. Na wypadek gdybyśmy chcieli w przyszłości przenieść grę na smartfony i na przykład bazować na żyroskopie, klasy, które odpowiadają za podawanie kierunku implementują `DirectionProvider`. Chyba jutro wyślę ten projekt, bo trochę się boję, że jak go zaraz nie skończę, to zrezygnuję ze snu, żeby wprowadzać ulepszenia. Stęskniłem się za tym uczuciem tbh xD

### Tech stack
- **TypeScript** - główny język projektu
- **Vite** - bundler i dev server
- **Pixi.js** - silnik renderujący (WebGL)
- **GLSL / glslify / glsl-noise** - shadery, w tym fractional brownian noise pod teksturę tła
- **Howler.js** - obsługa dźwięku
- **Lodash** - narzędzia pomocnicze
- **auto-bind** - automatyczny bind metod klas
- **ESLint** - lint (`@typescript-eslint`, `eslint-plugin-import`, `eslint-plugin-simple-import-sort`)

#### Post scriptum
Ogółem fajne zadanko, od czasów [projektu dla Suncorp](https://haven.suncorp.com.au) i jednego złożonego doświadczenia dla singapurskiego wojska, które zostało już niestety zdjęte z serwerów, nie bawiłem się tak dobrze w pracy.

Mam nadzieję, że załapię się na gwiazdkę firmową ;)

Struktura wydaje mi się dość jasna, ale jakby coś było niejasne, to służę odpowiedzią.

