# ***Meilenstein 3 - DBWT2 - Gruppe 317***

# *Team Members*
- Toma Iarina Ariana (Matrikelnummer:3815395)
- Chialda Ana (Matrikelnummer:3815379)

---

## Aufgabe 6 – Recherche: JavaScript-Sprachkonstrukte

### 1. Set.prototype.* (Mengenoperationen)

Neue Methoden für die `Set`-Klasse: `intersection`, `union`, `difference`, `symmetricDifference`, `isSubsetOf`, `isSupersetOf`, `isDisjointFrom`. Diese Methoden wurden in ES2024 standardisiert.

| Engine | Browser | Unterstützung |
|---|---|---|
| V8 | Chrome 122+ | vollständig |
| SpiderMonkey | Firefox 127+ | vollständig |
| JavaScriptCore | Safari 17+ | vollständig |

---

### 2. Temporal.Now.instant()

Neues globales Namespace-Objekt als moderner Ersatz für das fehlerhafte `Date`-Objekt.

| Engine | Browser | Unterstützung |
|---|---|---|
| V8 | Chrome 144+ | seit Januar 2026 |
| SpiderMonkey | Firefox 139+ | seit Mai 2025 |
| JavaScriptCore | Safari | noch nicht fertig |

---

### 3. Static Blocks in Klassen

```js
class CL {
    static {
        // Initialisierungslogik hier
    }
}
```

In ECMAScript 2022 standardisiert. Seit März 2023 in allen modernen Browsern verfügbar.

| Engine | Browser | Unterstützung |
|---|---|---|
| V8 | Chrome 94+ | vollständig |
| SpiderMonkey | Firefox 93+ | vollständig |
| JavaScriptCore | Safari 16.4+ | vollständig |

---

### 4. Decorators (@decorator)

```js
@decorator
class MyClass { }
```

| Engine | Browser | Unterstützung |
|---|---|---|
| V8 | Chrome | noch nicht nativ |
| SpiderMonkey | Firefox | in Arbeit |
| JavaScriptCore | Safari | nicht unterstützt |

Aktuell nur in TypeScript verfügbar. Kein nativer Browser-Support.

---

### 5. Array.prototype.group

Gruppierung von Array-Elementen. Wurde wegen Web-Kompatibilitätsproblemen in die statische Methode `Object.groupBy()` umgewandelt.

| Engine | Browser | Unterstützung |
|---|---|---|
| V8 | Chrome 117+ | als `Object.groupBy()` |
| SpiderMonkey | Firefox 119+ | als `Object.groupBy()` |
| JavaScriptCore | Safari 17.4+ | als `Object.groupBy()` |

---

### Entscheidung: Verwenden wir diese Konstrukte in Abalo?

**Nein** – aus folgenden Gründen:

- **Set.prototype.\*** – Kein konkreter Anwendungsfall in Abalo.
- **Temporal** – Noch nicht in Safari/JavaScriptCore verfügbar. Ohne Polyfill nicht einsetzbar.
- **Static Blocks** – Abalo verwendet keine Klassen, daher kein Nutzen.
- **Decorators** – Kein nativer Browser-Support. Nur mit Build-Tools wie TypeScript oder Babel nutzbar.
- **Object.groupBy** – Alle modernen Browser unterstützen es, aber kein konkreter Vorteil gegenüber einer einfachen Schleife in unserem Fall.

**Fazit:** Wir verzichten auf den Einsatz dieser Konstrukte in Abalo, da entweder der Browser-Support noch unvollständig ist oder kein konkreter Nutzen für das Projekt besteht.

---

### Verwendete Quellen
### Verwendete Quellen

**Allgemeine Quellen:**
- https://compat-table.github.io/compat-table/esnext/
- https://developer.mozilla.org/en-US/docs/Web/JavaScript
- https://github.com/tc39/proposals
- https://v8.dev/features
- https://webkit.org/status/
- https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases

**Feature-spezifische Quellen:**
- https://github.com/tc39/proposal-set-methods
- https://tc39.es/proposal-temporal/
- https://github.com/tc39/proposal-class-static-block
- https://github.com/tc39/proposal-decorators
- https://github.com/tc39/proposal-array-grouping


# Aufgabe 7 – Analyse von Webservices (REST APIs)

## 1. Einführung

### Was ist eine API?
Eine API (Application Programming Interface) ist eine Schnittstelle, die es verschiedenen Software-Systemen ermöglicht, miteinander zu kommunizieren. Sie definiert, wie Anfragen und Antworten strukturiert sind, damit Daten zwischen Client und Server ausgetauscht werden können.

### Was ist eine REST API?
Eine REST API (Representational State Transfer) ist ein Architekturstil für Web-APIs, der auf folgenden Prinzipien basiert:
- HTTP-Methoden (GET, POST, PUT, DELETE)
- Ressourcenbasierte URLs
- Zustandslose Kommunikation (stateless)
- Meist JSON als Datenformat

REST APIs sind weit verbreitet, da sie einfach, skalierbar und gut für Webanwendungen geeignet sind.

### Ausgewählte APIs
Für diese Analyse wurden zwei REST APIs unterschiedlicher Anbieter ausgewählt:
- Google Maps Platform API (Google)
- Spotify Web API (Spotify)

Diese wurden gewählt, da sie gut dokumentiert sind und REST-Prinzipien klar in realen Anwendungen umsetzen.

---

## 2. Google Maps Platform API

### Was ist der Zweck der API? Welche Daten können ausgetauscht werden?
Die Google Maps Platform API dient zur Integration von Karten- und Standortdiensten in Anwendungen.  
Dabei können folgende Daten ausgetauscht werden:
- Geografische Koordinaten (Latitude/Longitude)
- Karten- und Kartendaten (Map Tiles)
- Routen- und Navigationsinformationen
- Orte und Geschäftsinformationen (Places)
- Entfernungs- und Zeitberechnungen

### Welche REST-Prinzipien sind umgesetzt?
Die API folgt den REST-Prinzipien:
- Ressourcenbasierte URLs
- Verwendung von HTTP-Methoden (GET, POST)
- Zustandslose Kommunikation zwischen Client und Server
- JSON als Standarddatenformat
- Klare Trennung von Client und Server

### Richardson Maturity Model (RMM)
Die API befindet sich hauptsächlich auf **Level 2** des Richardson Maturity Models:
- Nutzung von HTTP-Methoden
- Ressourcenorientierte Endpoints
- Stateless Kommunikation

HATEOAS wird nicht vollständig umgesetzt, daher wird Level 3 nicht erreicht.

### Wie ist eine Versionierung implementiert?
Die Versionierung erfolgt über versionsspezifische Endpoints und API-Services sowie über die offizielle Dokumentation der Plattform.

### Quellen
- https://developers.google.com/maps/documentation
- https://martinfowler.com/articles/richardsonMaturityModel.html

---

## 3. Spotify Web API

### Was ist der Zweck der API? Welche Daten können ausgetauscht werden?
Die Spotify Web API ermöglicht den Zugriff auf Musik- und Nutzerdaten von Spotify.  
Dabei können folgende Daten ausgetauscht werden:
- Songs, Alben und Künstler
- Playlists und Benutzerinformationen
- Musikempfehlungen
- Wiedergabedaten und Geräteinformationen
- Metadaten zu Tracks

### Welche REST-Prinzipien sind umgesetzt?
Die API implementiert REST-Prinzipien:
- Ressourcenbasierte Endpoints (z.B. /tracks, /artists)
- Verwendung von HTTP-Methoden (GET, POST, PUT, DELETE)
- Zustandslose Kommunikation
- JSON als Datenformat
- Trennung von Client und Server

### Richardson Maturity Model (RMM)
Die Spotify API befindet sich auf **Level 2** des Richardson Maturity Models:
- Korrekte Nutzung von HTTP-Methoden
- Ressourcenbasierte URLs
- Stateless Kommunikation

HATEOAS wird nicht implementiert, daher bleibt die API auf Level 2.

### Wie ist eine Versionierung implementiert?
Die Versionierung erfolgt direkt in der URL, z.B.:
- `/v1/`

### Quellen
- https://developer.spotify.com/documentation/web-api
- https://martinfowler.com/articles/richardsonMaturityModel.html


# Aufgabe 9
Wir konnen den Webservice durch: 

    curl -X POST http://localhost:8000/api/articles \
    -H "Content-Type: application/json" \
    -d '{"name": "Holzstuhl", "price": 4999, "description": "Ein schöner Stuhl"}'

testen.
