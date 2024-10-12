(Zainstalowane dependency: 
    - openapi client generator
    - react native vector icons
    - react native async storage
    - react navigation (drawer, native)
    - date-fns
    - react-native-calendar-picker
    - react-native-paper
    - react-native-chart-kit
)

Template: główny obiekt zawierający wszystkie gotowe komponenty
Obiekty:
    Container: kontener, odpowiednik View, atrybuty:
        - motive: motyw kontenera w postaci obiektu który przechowuje styl dziedziczony przez dzieci komponentu
        - flex: parametr rozmiaru (stosunek do innych kontenerów (kiedy 3 kontenery obok siebie będą miały kolejno wartości 2, 1, 1 to pierwszy będzie dwa razy większy od pozostałych))(liczba)
        - direction: flex-direction (row lub column)
        - alternateMotive: motyw alternatywny, dziedziczone kolory z motywu zostaną odwrócone (color zmieni się z backgroundColor) (true/false)
        - onClick: funkcja która zostanie uruchomiona po kliknięciu na kontener (ustawienie parametru zmieni kontener w przestrzeń klikalną) (funkcja przyjmuje jeden parametr, jest to props danego kontenera)
        - fullWidth, fullHeight: określają czy dany kontener ma zająć całe dostępne miejsce w danej osi (dla direction row należy zastosować fullHeight a dla column fullWidth) (true/false)
        - style: klasyczny styl obiektu z react native, ma pierwszeńśtwo nad motive
        - unFocusOnClick: dodaje przed kontenerem wyłączony scrollview sprawiając że inputy wewnątrz kontenera tracą focus po kliknięciu poza inputem (true/false)
        - id: unikalny identyfikator komponentu 
        - class: klasa wzorowana na klasach css do której należy komponent

    Text: napis, odpowiednik reactowego Text, atrybuty:
        - motive: motyw kontenera w postaci obiektu który przechowuje styl dziedziczony przez dzieci komponentu
        - alternateMotive: motyw alternatywny, dziedziczone kolory z motywu zostaną odwrócone (color zmieni się z backgroundColor) (true/false)
        - style: klasyczny styl obiektu z react native, ma pierwszeńśtwo nad motive
        - id: unikalny identyfikator komponentu 
        - class: klasa wzorowana na klasach css do której należy komponent
    
    Button: przycisk, atrybuty:
        - onClick: funkcja która zostanie uruchomiona po kliknięciu na kontener (ustawienie parametru zmieni kontener w przestrzeń klikalną) (funkcja przyjmuje jeden parametr, jest to props danego kontenera)
        - motive: motyw kontenera w postaci obiektu który przechowuje styl dziedziczony przez dzieci komponentu
        - alternateMotive: motyw alternatywny, dziedziczone kolory z motywu zostaną odwrócone (color zmieni się z backgroundColor) (true/false)
        - style: klasyczny styl obiektu z react native, ma pierwszeńśtwo nad motive
        - id: unikalny identyfikator komponentu 
        - class: klasa wzorowana na klasach css do której należy komponent
    
    TextBox: edycyjne pole tekstowe:
        - motive: motyw kontenera w postaci obiektu który przechowuje styl dziedziczony przez dzieci komponentu
        - alternateMotive: motyw alternatywny, dziedziczone kolory z motywu zostaną odwrócone (color zmieni się z backgroundColor) (true/false)
        - style: klasyczny styl obiektu z react native, ma pierwszeńśtwo nad motive
        - placeholder: podpowiedź dla pola tekstowego (string)
        - defaultValue: wartość domyślna pola tekstowego (numer lub string)
        - onChangeText: reakcja na zmianę wartości pola edycyjnego (funkcja z jednym argumentem)
        - id: unikalny identyfikator komponentu 
        - class: klasa wzorowana na klasach css do której należy komponent

    NumberBox: numeryczne pole tekstowe:
        - motive: motyw kontenera w postaci obiektu który przechowuje styl dziedziczony przez dzieci komponentu
        - alternateMotive: motyw alternatywny, dziedziczone kolory z motywu zostaną odwrócone (color zmieni się z backgroundColor) (true/false)
        - style: klasyczny styl obiektu z react native, ma pierwszeńśtwo nad motive
        - placeholder: podpowiedź dla pola tekstowego (string)
        - defaultValue: wartość domyślna pola numerycznego (numer lub string)
        - onChangeText: reakcja na zmianę wartości pola edycyjnego (funkcja z jednym argumentem)
        - allowComma: umożliwia stosowanie przecinka w miejsce kropek (true/false)
        - id: unikalny identyfikator komponentu 
        - class: klasa wzorowana na klasach css do której należy komponent
    
    PassBox: pole hasła, jak textbox tylko z kropkami w miejscu tekstu

Panel: obiekt do szybkiego tworzenia zakładek z nawigacją

    - opiera się na dwóch podklasach: SelectedPage i NavBar

    - NavBar jest kontenerem w którym każdy element potomny jest elementem listy wszystkich zakładek panela, każdy element musi być komponentem klasy Nav , atrybuty: 
    - wszystkie atrybuty kontenera
    - blocksFullWidth, blocksFullHeight - po ustawieniu wartości na true przyciski będą reagować nie tylko po kliknięciu na tekst, ale na cały container

    - indeks można też zmienić ręcznie przez metodę panelu changeTo(num) gdzie num to numer indeksu

    - SelectedItem jest kontenerem na wszystkie zakładki, nie muszą być umieszczone w konkretnym komponencie, ale należy pamiętać o właściwym zagnieżdżaniu (komponenty potomne zakładki nie są traktowane jako kolejna zakładka)

Nav: komponent odpowiadający przyciskowi na liście nawigacyjnej:
    - motive: motyw kontenera w postaci obiektu który przechowuje styl dziedziczony przez dzieci komponentu
    - style: klasyczny styl obiektu z react native, ma pierwszeńśtwo nad motive
    - selectedMotive - motyw przyjmowany kiedy dana zakładka została wybrana
    - selectedStyle - styl przyjmowany kiedy dana zakładka została wybrana
    - id: unikalny identyfikator komponentu 
    - class: klasa wzorowana na klasach css do której należy komponent

Items: klasa do przechowywania właściwości komponentów:
    - metody statyczne:
    - getElementById: zwraca właściwości komponentu przekazane initializeComponent oznaczony id
    - getElementsByClassName: zwraca tablicy komponentu przekazanych initializeComponent oznaczonych daną klasą

DateBox: input daty
    - onChange: funkcja z jednym argumentem która zostanie wykonana kiedy data się zmieni
    - defaultValue: data domyślna pola
    - motive: motyw kontenera w postaci obiektu który przechowuje styl dziedziczony przez dzieci komponentu
    - alternateMotive: motyw alternatywny, dziedziczone kolory z motywu zostaną odwrócone (color zmieni się z backgroundColor) (true/false)
    - style: klasyczny styl obiektu z react native, ma pierwszeńśtwo nad motive
    - animationType: rodzaj animacji dla modal

Body: bazowy element strony który oddziela od niej paski urządzenia
    - text: motyw tekstu (light, dark)
    - backgroundColor: kolor tła pasków

Modal: okno modalne ponad pozostałymi elementami
    - visible: widoczność okna modalnego (true/false)
    metody zawarte w stanie:
        - hide: ukrywa modal
        - show: pokazuje model
        - change zmienia z ukrytego na pokazanego i vice versa
        - motive: motyw kontenera w postaci obiektu który przechowuje styl dziedziczony przez dzieci komponentu
        - style: klasyczny styl obiektu z react native, ma pierwszeńśtwo nad motive

funkcja initializeComponent:
        funkcja którą należy wykonać aby komponent załączył się do odpowiednich tablic 
        przymuje jako jeden argument obiekt, który jako właściwosć props musi mieć props komponentu, pozostałe właściwości wybieramy sami

Icon: komponent będący ikonką:
    - name: nazwa ikony
    - color: kolor ikony
    - backgroundColor: tło ikony
    - size: rozmiar ikony

IconButton: przycisk z ikoną (wewnątrz umieszczamy tekst po ikonie):
    - name: nazwa ikony
    - color: kolor ikony i tekstu
    - backgroundColor: tło ikony
    - onPress: funkcja wywoływana po kliknięciu na przycisk

Navigaton: nawigacja strony w postaci chowanego paska bocznego, opiera się na liście kluczy (nazw) i wartości (komponentów)
    default - domyślny komponent (nazwa)
    color - kolor tekstu dla headera nawigacji
    backgroundColor - kolor tła dla headera nawigacji
    drawerBackgroundColor - kolor tła paska
    drawerColor - kolor tekstu paska
    
    każdy element nawigacji podajemy jako element Screen:
        name - nazwa
        component - komponent
        headerTitle - customowy tekst headera

LoginPanel: szybki panel logowania
    backgroundColor - kolor tła
    titleColor - kolor tekstu dla etykiet
    loginIcon - ikona etykiety dla loginu
    loginText - tekst etykiety dla loginu
    passwordIcon - ikona etykiety dla hasła
    passwordText - tekst etykiety dla hasła
    inputFontSize - rozmiar czcionki dla inputów
    titleFontSize - rozmiar czcionki dla etykiet
    buttonBackgroundColor - kolor tła dla przycisku 
    borderColor - kolor obramowań
    onSubmit - funkcja wywoływana po zatwierdzeniu przyciskiem przyjmuje dwa argumenty: login i hasło

Calendar: kalendarz
    - callendarProps: properties dla kalendarza: https://www.npmjs.com/package/react-native-calendar-picker 
    - onChange: funkcja wykonywana po zmianie wybranej daty z kalendarza, przyjmuje jeden argument, wybraną datę


    

