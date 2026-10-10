# DBWT2 — Meilenstein 5 | Gruppe 317
**Toma Iarina Ariana (3815395) & Chialda Ana (3815379)**

---

**Starten:**

```bash
php artisan reverb:start
php artisan queue:listen
php artisan serve
```

---

## Aufgabe 2 — Neue Einstiegsseite `/newsite`

**Was gefordert war:** Neue Einstiegsseite unter `/newsite` mit Vue SFCs: `siteheader`, `sitebody`, `sitefooter`.

**Erstellte/geänderte Dateien:**

    - `resources/js/newsite.js`
    - `resources/js/NewSite.vue`
    - `resources/js/components/SiteHeader.vue`
    - `resources/js/components/SiteBody.vue`
    - `resources/js/components/SiteFooter.vue`
    - `resources/views/newsite.blade.php`
    - `routes/web.php`
    - `vite.config.js`

---

## Aufgabe 3 — Impressum

**Was gefordert war:** Impressum als Vue-Komponente, Link im Footer, bei Klick im `sitebody` anzeigen. Andere Inhalte ausblenden.

**Erstellte/geänderte Dateien:**

    - `resources/js/components/Impressum.vue`
    - `resources/js/NewSite.vue`
    - `resources/js/components/SiteFooter.vue`

---

## Aufgabe 4 — Menu Vue

**Was gefordert war:** Bestehendes Menü in die neue Einstiegsseite integrieren.

**Erstellte/geänderte Dateien:**

-    `resources/js/components/SiteHeader.vue`

---

## Aufgabe 5 — Artikelsuche Vue

**Was gefordert war:** Bestehende Artikelsuche in `/newsite` integrieren. Warenkorb soll weiterhin funktionieren (server-seitig).

**Erstellte/geänderte Dateien:**

    - `resources/js/components/ArtikelSuche.vue`

---

## Aufgabe 6 — Pagination

**Was gefordert war:**
    - a) Seitenweises Laden mit je 5 Artikeln via LIMIT und OFFSET in der Datenbank
    - b) Bei Filteränderung auf Seite 5 → automatisch auf Seite 1 zurücksetzen

**Erstellte/geänderte Dateien:**

    - `app/Http/Controllers/Api/ArticleAPIController.php`
    - `resources/js/components/ArtikelSuche.vue`

**Antwort 6b:**
    Wenn der/die Benutzer:in beim Betrachten der 5. Seite die Suchfilter verändert,
    soll die Ergebnisliste automatisch auf Seite 1 zurückgesetzt werden.
    In unserer Implementierung haben wir dies im `watch` von `suchbegriff` gelöst: `this.page = 1` wird gesetzt,
    bevor die neue Suche gestartet wird.

---

## Aufgabe 7 — Video PrimeVue Rating-Komponente

**Was gefordert war:** Eine PrimeVue-Komponente auswählen, in Abalo integrieren und ein Video (min. 90 Sekunden) erstellen.

**Gewählte Komponente:**

    `Rating` (Sterne-Bewertung)

**Erstellte/geänderte Dateien:**

    - `resources/js/newsite.js`
    - `resources/js/components/ArtikelSuche.vue`

---

## Aufgabe 8 — Styling (BEM + Sass)

**Was gefordert war:**
    - a) Mindestens 5 BEM-Klassen (Block, Element, Modifier)
    - b) Mindestens 5 verschiedene Sass-Features

**Verwendete Sass-Features:**
    1. **Variables** — `$primary-color`, `$text-color`, `$border-color`, `$padding`
    2. **Mixins** — `@mixin flex-center`
    3. **Extend** — `%button-base`
    4. **Nesting** — BEM-Klassen verschachtelt
    5. **Functions** — `lighten-color()`

**BEM-Klassen:** `.menu__item--active`, `.menu__submenu--visible`, `.search__item--in-cart`, `.artikel-form__button--disabled`, `.cart__item`

**Erstellte/geänderte Dateien:**

    - `resources/sass/app.scss`
    - `resources/js/components/SiteHeader.vue`
    - `resources/js/components/ArtikelSuche.vue`
    - `vite.config.js`
    - `resources/views/newsite.blade.php`

---

## Aufgabe 10 — WebSockets: Installation Broadcaster

**Was gefordert war:** WebSocket-Server installieren (Ratchet oder Laravel Reverb).

**Gewählt:** Laravel Reverb (Ratchet inkompatibel mit Laravel 11)

**Erstellte/geänderte Dateien:**

    - `composer.json`
    - `.env`

---

## Aufgabe 11 — WebSocket Übungen

**Was gefordert war:** 4 HTML-Dateien mit WebSocket-Funktionalität.

**Erstellte/geänderte Dateien:**
- `public/5-ws1-connect.html` — Verbindung aufbauen, "Connected" in Konsole
- `public/5-ws2-message.html` — Nachricht empfangen, "Message received: <msg>" in Konsole
    - `public/5-ws3-selected-message.html` — Nachricht nur anzeigen wenn `kennungsid === MY_ID (42)`
    - `public/5-ws4-vue.html` — Empfangene Nachricht reaktiv via Vue anzeigen
    - `app/Events/TestEvent.php`
    - `app/Events/SelectedMessageEvent.php`
    - `routes/web.php` — Routen `/send-ws2`, `/send-ws3`, `/send-ws4` hinzugefügt

---

## Aufgabe 12 — Wartungsnachricht

**Was gefordert war:** Wartungsmeldung via WebSocket sofort an alle Nutzer senden.

**Meldung:** *"In Kürze verbessern wir Abalo für Sie! Nach einer kurzen Pause sind wir wieder für Sie da! Versprochen."*

**Erstellte/geänderte Dateien:**
- `app/Events/WartungsEvent.php`
- `routes/web.php` — Route `/send-wartung` hinzugefügt
- `resources/views/navigation.blade.php`

---

## Aufgabe 13 — Verkaufsmeldung

**Was gefordert war:** Bei Verkauf eines Artikels sofort Benachrichtigung an den Besitzer via WebSocket. Neuer Endpunkt `POST /api/articles/{id}/sold`.

**Meldung:** *"Großartig! Ihr Artikel <Artikelname> wurde erfolgreich verkauft!"*

    **Erstellte/geänderte Dateien:**
    - `app/Events/VerkaufsEvent.php`
    - `routes/api.php` — Route `POST /api/articles/{id}/sold` hinzugefügt
    - `routes/web.php` — Route `/send-verkauf/{id}` hinzugefügt
    - `resources/views/navigation.blade.php`

---

## Aufgabe 14 — Angebot

**Was gefordert war:**
- a) Schaltfläche "Artikel jetzt als Angebot anbieten" — Meldung an alle Betrachter
- b) Axios für den Request verwenden
- c) (Optional) Artikel visuell hervorheben

**Meldung:** *"Der Artikel <Artikelname> wird nun günstiger angeboten! Greifen Sie schnell zu."*

**Erstellte/geänderte Dateien:**
- `app/Events/AngebotEvent.php`
- `routes/api.php` — Route `POST /api/articles/{id}/angebot` hinzugefügt
- `resources/views/articles.blade.php`

---

## Aufgabe 15 — Erweiterungsmöglichkeiten

**Was gefordert war:** 3 weitere WebSocket-Erweiterungsmöglichkeiten mit Kundennutzen.

    1. **Live-Chat zwischen Käufer und Verkäufer** — Direkte Kommunikation erhöht Vertrauen und beschleunigt Kaufprozess.
    2. **Live-Gebotsystem (Auktion)** — Echtzeit-Gebote schaffen Spannung und motivieren zu höheren Preisen.
    3. **Echtzeit-Benachrichtigung bei neuen Artikeln** — Nutzer werden sofort über neue Angebote in beobachteten Kategorien informiert.

---

## Laufzeitumgebung

```bash
php artisan serve          # Terminal 1 — Laravel (Port 8000)
php artisan reverb:start   # Terminal 2 — WebSocket Server (Port 8080)
php artisan queue:listen   # Terminal 3 — Queue Worker
```

PostgreSQL muss gestartet sein (pgAdmin öffnen).
