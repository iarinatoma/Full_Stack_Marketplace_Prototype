# ***Meilenstein 3 - DBWT2 - Gruppe 317***

# *Team Members*
- Toma Iarina Ariana (Matrikelnummer:3815395)
- Chialda Ana (Matrikelnummer:3815379)

---

## Aufgabe 6 – VUE Plugins

### Vorteile des Vue.js Plugin

1. **Syntax-Highlighting und Autovervollständigung für Vue-Direktiven**
    
    * Die IDE erkennt Vue-Direktiven (v-if, v-for, v-model) und hebt sie farblich hervor. Das spart Zeit, da man sich nicht alle Direktiven merken muss.
   
2. **Echtzeit-Fehlererkennung**

    * Das Plugin erkennt Fehler in Vue-Templates noch vor der Kompilierung (z.B. undefinierte Variablen in {{ }}). Das verbessert die Codequalität.
   
3. **Navigation zwischen Komponenten**

    * Mit Ctrl+Click kann man direkt zwischen importierten Vue-Komponenten navigieren. Das spart Zeit, besonders wenn das Projekt viele Dateien hat.



## Aufgabe 12 – Diskussion: Dynamische Artikelsuche

### Was passiert, wenn sehr viele Benutzer:innen gleichzeitig die Lösung verwenden?

Bei unserer Lösung wird bei jeder Eingabe ab 3 Zeichen sofort eine Anfrage an den Server gesendet.
Wenn sehr viele Benutzer:innen gleichzeitig suchen, bedeutet das:

- Der Server bekommt sehr viele gleichzeitige Anfragen → hohe Last
- Die Datenbank muss sehr viele `LIKE`-Abfragen gleichzeitig verarbeiten
- Bei sehr vielen Nutzer:innen könnte der Server überlastet werden und langsamer antworten oder abstürzen


### Wie verhält sich die Suche, wenn der/die Benutzer:in die Eingabe sehr schnell mehrfach hintereinander anpasst?

Bei unserer aktuellen Lösung wird bei jeder Änderung sofort eine neue Anfrage gesendet. Das bedeutet:

- Bei schneller Eingabe (z.B. "kamera") werden mehrere Anfragen gesendet: "kam", "kame", "kamer", "kamera"
- Die Antworten kommen nicht unbedingt in der richtigen Reihenfolge zurück
- Eine ältere Antwort könnte nach einer neueren ankommen → falsche Ergebnisse werden angezeigt

## Aufgabe 13 – Refactoring Artikeleingabe mit Vue

Die Artikeleingabe wurde mit Vue.js neu entwickelt.
Die Daten werden über den Webservice unter `POST /api/articles` gesendet.

### Verwendete Vue-Features

- **`v-model`** – Two-Way Binding für die Eingabefelder (`name`, `price`, `description`).
  Die Variablen werden automatisch aktualisiert ohne manuelles `getElementById`.

- **`v-if`** – Fehler- und Erfolgsmeldungen werden nur angezeigt, wenn sie vorhanden sind.

- **`@click`** – Der Klick auf den Speichern-Button ruft die Methode `speichern()` auf.

- **`data()`** – Reaktive Variablen für alle Formulardaten.

- **`methods`** – `speichern()` validiert die Eingaben und sendet die Daten an die API.

---


# M4 – Zusammenfassung

## Aufgabe 1 – NPM Installation
**Was:** NPM installieren.
**Ergebnis:** Node v22.20.0, NPM v10.9.3 bereits installiert.

## Aufgabe 2 – Refactoring
**Was:** Gesamten JS-Code aus `public/js/` in `resources/js/app.js` verschieben.
**Geänderte Dateien:** `resources/js/app.js`, alle Blade-Views (`@vite` statt `<script src>`).
**Warum:** Ab jetzt wird der Code durch NPM/Vite kompiliert.

## Aufgabe 3 – math.js
**Was:** math.js einbinden und an zwei Stellen verwenden.
**Geänderte Dateien:** `package.json`, `resources/js/app.js`.
**Warum:** `round()` für Preisanzeige im Warenkorb und Preisvalidierung im Formular.

## Aufgabe 5 – CSV Import
**Was:** `article_has_articlecategory.csv` in die Datenbank laden.
**Geänderte Dateien:** `database/data/article_has_articlecategory.csv`, `database/seeders/ArticleHasArticleCategorySeeder.php`.
**Warum:** Beziehung zwischen Artikeln und Kategorien in der Datenbank speichern.

## Aufgabe 6 – IDE Plugins
**Was:** IDE für Vue konfigurieren.
**Plugins:** Vue.js, Prettier.
**Warum:** Syntax-Highlighting, Fehlererkennung, automatische Formatierung.

## Aufgabe 7 – Vue über NPM
**Was:** Vue.js über NPM einbinden und testen.
**Geänderte Dateien:** `package.json`, `vite.config.js`, `resources/js/app.js`, `navigation.blade.php`.
**Warum:** Vue funktioniert als NPM-Modul, kein CDN-Link nötig.

## Aufgabe 10 – Dynamische Artikelsuche
**Was:** Artikelsuche mit Vue – ab 3 Zeichen, max. 5 Ergebnisse.
**Geänderte Dateien:** `resources/js/app.js`, `articles.blade.php`.
**Warum:** Suche ohne Seitenneuladen, Daten kommen von `/api/articles`.

## Aufgabe 12 – Diskussion
**Was:** Diskussion über Skalierbarkeit und schnelle Eingabe.
**Ergebnis:** Bei vielen Nutzern → Serverlast. Bei schneller Eingabe → Debouncing empfohlen.

## Aufgabe 13 – Artikeleingabe mit Vue
**Was:** Artikelformular mit Vue neu entwickelt, Daten an `POST /api/articles`.
**Geänderte Dateien:** `resources/js/app.js`, `newarticle.blade.php`, `vite.config.js`.
**Warum:** Vue-Direktiven (`v-model`, `v-if`, `@click`) ersetzen manuelles DOM-Manipulation.
