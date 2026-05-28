# ***Meilenstein 2 - DBWT2 - Gruppe 317***

# *Team Members*
- Toma Iarina Ariana (Matrikelnummer:3815395)
- Chialda Ana (Matrikelnummer:3815379)

## Aufgabe 1 - Java Einuben

- Die Dateien befinden sich im `/public/js-aufgabe1` und konnen in Webbrowser getestet werden

## Aufgabe 2, 3 und 4

- Wurden in der Datei `Aufgabe-2-3-4.md` beantwortet.

## Aufgabe 5 - Array Datenabfrage

- wurde in der Datei `/public/Datenabfrage/datenabfrage.html` gelost und im Browser ist die Ausgabe sichtbar.

## Aufgabe 6 - JS DOM Ubungen

- in `/public/js-aufgabe6` gelost und die Ausgaben in Browser sichtbar

## Aufgabe 7 - Navigationsmenu

- der View wurde erstellt: `navigation.blade.php`
- JavaScript wurde in eine verschiedene Datei geschrieben `/public/js/navigationsmenu.js` und durch `<script src="/js/navigationsmenu.js" defer></script>` mit dem View verbindet
- CSS wurde auch in einer anderen Datei geschrieben `/public/css/navigationsmenu.css` und durch `<link rel="stylesheet" href="/css/navigationsmenu.css">` mit dem View verbindet.

## Aufgabe 8 - Cookies 

- erscheint in den Navigationsmenu
- Logik geschrieben in `/public/js/cookiecheck.js`
- verbindet mit view durch `<script src="/js/cookiecheck.js" defer></script>`

## Aufgabe 9 - Artikeleingabe

- view: `newarticle.blade.php`
- JS Datei `/public/js/newarticle.js` mit View durch `<script src="/js/newarticle.js" defer></script>` verbindet

## Aufgabe 10 - Warenkorb
- Ich habe im HTML eine eigene Sektion fur den Warenkorb erstellt (<div id="cart">).
- In der Artikelliste habe ich für jeden Artikel einen Button „+“ hinzugefugt.
- Die Artikeldaten (ID, Name, Preis) werden über `data-Attribute` an den Button ubergeben.

- Beim Klick auf „+“ wird der Artikel in ein JavaScript-Array (cart) eingefugt.
-  Danach wird der Warenkorb im DOM dynamisch neu gerendert.
-  Jeder Artikel kann nur einmal hinzugefügt werden - uberpruft dies uber die Artikel-ID.
- Zusatzlich wird der „+“-Button deaktiviert.

-  Im Warenkorb hat jeder Artikel einen „-“-Button. 
- Beim Klick wird der Artikel aus dem Array entfernt -> Der „+“-Button in der Artikelliste wird wieder aktiviert.

- eingesetzt in `/public/js/warenkorb.js`

# Einige Quellen:

https://www.w3schools.com/howto/howto_js_topnav_responsive.asp
https://www.w3schools.com/js/js_htmldom.asp
https://www.w3schools.com/js/js_cookies.asp
https://www.w3schools.com/js/js_events.asp
https://www.w3schools.com/css/default.asp
https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
Vorlesung
https://www.ili.fh-aachen.de/ilias.php?baseClass=ilrepositorygui&ref_id=1534043



