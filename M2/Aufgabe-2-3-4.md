# Meilenstein 2 - DBWT2 - Gruppe 317

## Aufgabe 2 - IDE Features

## 1. Direktes Öffnen von HTML-Dateien im Browser

In der IDE kann ich eine HTML-Datei direkt öffnen und im gewünschten Browser anzeigen lassen (z. B. Chrome, Firefox, Safari).
Das hilft bei kein manuelles Suchen der Datei im Browser, keine Probleme mit falschen Pfaden, schnellere Vorschau während der Entwicklung
und hilfreich beim Testen von kleinen Änderungen.


## Farbvorschau und Farbauswahl direkt im Code

Wenn ich eine Farbe (z. B. `#df8fe8`) im CSS verwende, zeigt die IDE automatisch eine Vorschau der Farbe an. Durch Anklicken kann ich eine neue Farbe auswählen.
Das hilft bei sofortige visuelle Rückmeldung, kein Wechsel zu externen Tools notwendig und genauere Auswahl von Farbtönen

## 3. Automatischer Server-Link im Terminal

Beim Starten der Anwendung (z. B. mit `php artisan serve`) wird automatisch ein klickbarer Link im Terminal angezeigt.
Das hilft bei kein manuelles Eintippen der URL im Browser, direkter Zugriff auf die Anwendung und schnellere Navigation beim Testen


---



## Aufgabe 3 - Browserunterstützung

**a)** Auf Desktop-Geräten ist Google Chrome mit ca. 65% Marktanteil
der meistgenutzte Browser, gefolgt von Microsoft Edge mit ca. 13%
und Firefox mit ca. 7%. Auf mobilen Geräten führt ebenfalls Chrome
mit ca. 65%, gefolgt von Safari mit ca. 25%.

**b)** Bei der Auswahl der Quelle achte ich auf folgende Kriterien:
- Aktualität der Daten (möglichst aktuell)
- Größe der Stichprobe (je mehr Nutzer gemessen, desto zuverlässiger)
- Transparenz der Methodik (wie wurden die Daten erhoben?)
- Bekanntheit und Reputation der Quelle (z.B. StatCounter, W3Counter)

**c)** Die Unterstützung von JavaScript-Versionen (ECMAScript)
durch die wichtigsten Browser:
- Google Chrome: unterstützt ES2023 vollständig (ab Version 117+)
- Mozilla Firefox: unterstützt ES2023 vollständig (ab Version 115+)
- Microsoft Edge: unterstützt ES2023 vollständig (ab Version 117+)
- Safari: unterstützt ES2023 größtenteils (ab Version 17+)
- Opera: unterstützt ES2023 vollständig (ab Version 103+)

**d)** Für die Umsetzung von Abalo würde ich folgende drei
Browser priorisieren:

1. **Google Chrome** - mit ca. 65% Marktanteil der meistgenutzte
   Browser weltweit. Unterstützt alle modernen JavaScript-Features
   vollständig und hat die beste Performance.

2. **Safari** - wichtig für mobile Apple-Nutzer (ca. 25% auf Mobilgeräten).
   Da Abalo ein Marketplace ist, der auch mobil genutzt wird,
   ist Safari-Unterstützung essenziell.

3. **Microsoft Edge** - mit ca. 13% auf Desktop der zweitmeistgenutzte
   Browser. Basiert auf Chromium wie Chrome, daher gute
   JavaScript-Kompatibilität.

---

## Aufgabe 4 - Vergleich JavaScript mit C++

### Ähnlichkeiten

**1. Kontrollstrukturen**
Beide Sprachen verwenden ähnliche Kontrollstrukturen
wie if-else, for, while, do-while.

```javascript
// JavaScript:
if (x > 0) { console.log("positiv"); }
```
```cpp
// C++:
if (x > 0) { cout << "positiv"; }
```

**2. Funktionen**
Beide Sprachen unterstützen Funktionen mit Parametern
und Rückgabewerten.

```javascript
// JavaScript:
function add(a, b) { return a + b; }
```
```cpp
// C++:
int add(int a, int b) { return a + b; }
```

**3. Arrays**
Beide Sprachen unterstützen Arrays zur Speicherung
mehrerer Werte.

```javascript
// JavaScript:
let arr = [1, 2, 3];
```
```cpp
// C++:
int arr[] = {1, 2, 3};
```

**4. Operatoren**
Beide Sprachen verwenden ähnliche arithmetische
und logische Operatoren (+, -, *, /, &&, ||, !).

```javascript
// JavaScript:
let result = (5 + 3) * 2;
```
```cpp
// C++:
int result = (5 + 3) * 2;
```

**5. Objektorientierung**
Beide Sprachen unterstützen objektorientierte
Programmierung mit Klassen.

```javascript
// JavaScript:
class Car { constructor(name) { this.name = name; } }
```
```cpp
// C++:
class Car { public: string name; };
```

**6. Kommentare**
Beide Sprachen verwenden die gleiche Kommentarsyntax.

```javascript
// JavaScript:
// einzeiliger Kommentar
/* mehrzeiliger Kommentar */
```
```cpp
// C++:
// einzeiliger Kommentar
/* mehrzeiliger Kommentar */
```

---

### Unterschiede

**1. Typisierung**
JavaScript ist dynamisch typisiert - Variablen können
ihren Typ zur Laufzeit ändern.
C++ ist statisch typisiert - der Typ muss beim
Deklarieren angegeben werden.

```javascript
// JavaScript:
let x = 5;      // number
x = "hallo";    // jetzt string - kein Fehler!
```
```cpp
// C++:
int x = 5;
x = "hallo";    // Fehler! Typ kann nicht geändert werden
```

**2. Ausführung**
JavaScript wird im Webbrowser oder in Node.js ausgeführt (interpretiert).
C++ wird kompiliert und direkt vom Betriebssystem ausgeführt.

```javascript
// JavaScript: läuft direkt im Browser
```
```cpp
// C++: muss zuerst kompiliert werden
// g++ programm.cpp
```

**3. Speicherverwaltung**
JavaScript hat automatische Speicherverwaltung (Garbage Collector).
C++ erfordert manuelle Speicherverwaltung (new/delete).

```javascript
// JavaScript:
let obj = {name: "Auto"}; // automatisch verwaltet
```
```cpp
// C++:
Car* obj = new Car();  // manuell erstellt
delete obj;            // manuell gelöscht!
```

**4. Typ- und Wertvergleiche**
JavaScript unterscheidet zwischen == (nur Wert)
und === (Wert und Typ).
C++ vergleicht immer Wert und Typ.

```javascript
// JavaScript:
5 == "5"   // true  (nur Wert)
5 === "5"  // false (Wert und Typ)
```
```cpp
// C++:
5 == 5     // true
// kein === Operator
```

**5. Einsatzgebiet**
JavaScript wird hauptsächlich für Webentwicklung
(Frontend & Backend) verwendet.
C++ wird für Systemprogrammierung, Spiele,
eingebettete Systeme verwendet.

**6. Vererbung**
JavaScript verwendet prototypbasierte Vererbung.
C++ verwendet klassenbasierte Vererbung.

```javascript
// JavaScript:
class Buyer extends User { ... }
// intern: prototype chain
```
```cpp
// C++:
class Buyer : public User { ... };
// direkte Klassenvererbung
```
    
