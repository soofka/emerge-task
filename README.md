# emerge-task

## Zadanie

Twoim zadaniem jest zaprojektowanie i zaimplementowanie prostej aplikacji służącej do przeglądania listy zdarzeń systemowych.

### Opis domeny

Aplikacja powinna prezentować listę zdarzeń systemowych. Każde zdarzenie zawiera co najmniej:

- unikalny identyfikator,
- poziom zdarzenia (np. DEBUG, INFO, WARNING, ERROR),
- treść zdarzenia,
- stempel czasowy.

### Funkcjonalności

Użytkownik aplikacji powinien mieć możliwość:

- przeglądania listy zdarzeń,
- filtrowania zdarzeń:
  - po zakresie dat,
  - po poziomie zdarzenia (np. wszystkie zdarzenia o poziomie WARNING i wyższym).

#### Backend

- Zaimplementuj część backendową w NestJS.
- Backend powinien udostępniać API zwracające listę zdarzeń.
- Dane mogą być zamockowane (nie ma potrzeby korzystania z bazy danych).
- Struktura API, sposób filtrowania oraz format danych pozostawiamy do Twojej decyzji.

#### Frontend

- Zaimplementuj część frontendową w React.
- Aplikacja powinna prezentować listę zdarzeń w postaci prostej tabeli.
- Użytkownik powinien mieć możliwość ustawiania filtrów i obserwowania ich wpływu na prezentowane dane.

## Rozwiązanie

### Uruchomienie

Z katalogu głównego:

```
cd api
npm run build
npm run start
```

Uruchamia serwer NestJS na porcie 3000.

```
cd ui
npm run build
npm run start
```

Uruchamia serwer plików statycznych na porcie 3001.

### Co tu jest

#### `/api`

Wygenerowane zgodnie z dokumentacją NestJS czyli przy pomocy `nest new project_name`. Zamieniłem znajdujący się tam endpoint typu hello world na taki który zwraca listę zdarzeń w oparciu o przekazane parametry. 100 wydarzeń zostaje wygenerowanych losowo w momencie uruchomienia serwera. Dodałem też obejście dla CORS z serwera plików statycznych.

#### `/ui`

Prosta apka Reaktowa bez żadnego boilerplate'u. Własny mały serwer HTTP, kompilacja do JS odbywa się przy pomocy TSC, nie ma bundlingu (dlatego biblioteki typu React w `index.html` są podlinkowane z CDN-a). Zawiera UI który strzela do API z parametrami wybranymi przez użytkownika (zawiera debounce). Dodatkowo zawiera też client-side sortowanie kolumn.

### Czego tu nie ma

- testów (są defaultowo wygenerowane z boilerplate'u NestJS, nawet je trochę dostosowałem, ale bardzo podstawowo, bez np. obsługi parametrów)
- obsługi błędów (api zwraca błędy a ui niby próbuje je wyświetlać ale one nic nie mówią)
- mądrego strzelania do api (strzelamy za każdym razem jak filtry się zmienią i strzelamy po wszystko; większość strzałów jest raczej niepotrzebna bo większość tych danych już mamy z poprzednich strzałów. ale to zależy od źródła danych, jak często się zmieniają, i czy ta tabelka ma wyświetlać zawsze absolutnie najnowsze. w tej chwili tak robi ale w rzeczywistości powinno to być zrobione mądrzej)
- paginacji (ale wówczas sortowanie musiałoby być po backendzie)
- współdzielenia typów pomiędzy api a ui (przy tej konfiguracji w tym repo są po prostu dwa osobne projekty i nie chciało mi się tego konfigurować tak żeby miały wspólnego roota)
- css-ów

Gdybyście chcieli żebym coś dodał to dajcie znać.
