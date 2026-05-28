# ***Meilenstein 1 - DBWT2 - Gruppe 317***

# *Team Members*
 - Toma Iarina Ariana (Matrikelnummer:3815395)
 - Chialda Ana (Matrikelnummer:3815379)

## Aufgabe 1 - IDE Setup

  - PhpStorm 2026.1 wurde als IDE für die PHP-Entwicklung eingerichtet.

## Aufgabe 2 - PostgreSQL Installation
- PostgreSQL 17 wurde lokal installiert
  - Ein Useraccount mit dem Namen `dev` wurde erstellt
  - Eine Datenbank mit dem Namen `abalo` in UTF-8 Enkodierung wurde erstellt
  - Das Schema `public` wurde automatisch erstellt

## Aufgabe 3 - Laravel Projekt
  - Composer wurde installiert
  - Laravel Projekt `abalo` wurde mit folgendem Befehl erstellt:

          composer create-project laravel/laravel abalo
  - Projekt wurde erfolgreich gestartet mit:

        php artisan serve --port=8020

## Aufgabe 4 - IDE Einrichtung
  - PhpStorm wurde für das Projekt `abalo` eingerichtet
  - Projekt kann direkt über PhpStorm gestartet werden

## Aufgabe 5 - Testverbindung
  - Tabelle `ab_testdata` wurde erstellt (id, ab_testname)
  - Testdaten wurden eingefügt (Fotokamera, Blitzlicht)
  - Model `AbTestData` wurde in `app/Models/` erstellt
  - Controller `AbTestDataController` und Route `/testdata` wurden erstellt
  - Test erfolgreich unter `localhost:8020/testdata`

## Aufgabe 6 - Anmeldung
  - `auth.zip` wurde heruntergeladen und entpackt
  - `AuthController.php` wurde in `app/Http/Controllers/` kopiert
  - Der Controller simuliert einen Login und speichert folgende Daten in der PHP-Session:
      - `abalo_user` → Benutzername (visitor)
      - `abalo_mail` → E-Mail (visitor@abalo.example.com)
      - `abalo_time` → Zeitpunkt des Logins

  - Folgende Routen wurden in `routes/web.php` hinzugefügt:
      - `/login` → simuliert einen Login, speichert Daten in der Session
      - `/logout` → löscht die Session
      - `/isloggedin` → gibt den Session-Status als JSON zurück

- Test erfolgreich unter `localhost:8020/login`

## Aufgabe 7 - Schemamigration
  - Migrationsdateien wurden mit folgenden Befehlen erstellt:

            php artisan make:migration create_ab_user_table
            php artisan make:migration create_ab_article_table
            php artisan make:migration create_ab_articlecategory_table
            php artisan make:migration create_ab_article_has_articlecategory_table

  - Die Dateien befinden sich in `database/migrations/` und wurden wie folgt implementiert:

    - `create_ab_user_table` → Tabelle `ab_user` mit Feldern: id, ab_name, ab_password, ab_mail
    - `create_ab_article_table` → Tabelle `ab_article` mit Feldern: id, ab_name, ab_price, ab_description, ab_creator_id, ab_createdate. Foreign Key auf `ab_user.id`
    - `create_ab_articlecategory_table` → Tabelle `ab_articlecategory` mit Feldern: id, ab_name, ab_description, ab_parent. Self-referencing Foreign Key auf `ab_articlecategory.id`
    - `create_ab_article_has_articlecategory_table` → Tabelle `ab_article_has_articlecategory` mit Feldern: id, ab_articlecategory_id, ab_article_id. Foreign Keys auf beide Tabellen + UNIQUE constraint

  - Migrationen ausgeführt mit:

          php artisan migrate

## Aufgabe 8 - ER-Diagram
ER-Diagramm nach Chen wurde in draw.io erstellt (siehe Datei `Aufgabe8_Gruppe317.jpeg`)

## Aufgabe 9 - Daten laden
- `data.zip` wurde heruntergeladen und entpackt und die CSV-Dateien wurden in `database/data/` gespeichert

- `DevelopmentData` Seeder wurde erstellt
  - Daten aus folgenden CSV-Dateien wurden geladen:
  - `user.csv` → Tabelle `ab_user`
  - `articlecategory.csv` → Tabelle `ab_articlecategory`
  - `article.csv` → Tabelle `ab_article`
  - Seeder ausgeführt mit:
 
          php artisan db:seed --class=DevelopmentData

## Aufgabe 10 - Artikelübersicht
  - `articleimages.zip` wurde heruntergeladen und entpackt und die Bilder wurden in `public/images/` gespeichert

  - `ArticleController.php` wurde erstellt in `app/Http/Controllers/`
  - View `articles.blade.php` wurde erstellt in `resources/views/`
  - Route `/articles` wurde in `routes/web.php` hinzugefügt
  - Funktionalitäten:
    - Alle Artikel werden in einer Tabelle angezeigt
    - Suche via `?search=` Parameter (case-insensitive, partial match)
    - Artikel-Bilder werden angezeigt falls vorhanden (.png oder .jpg)

## Aufgabe 11 - Massendaten
  - `UserSeeder.php` wurde erstellt in `database/seeders/`
  - Generiert 10.000 zufällige Benutzer in `ab_user`
  - Fragt vor der Ausführung nach Bestätigung
  - Ausgeführt mit:

          php artisan db:seed --class=UserSeeder

  - Nach dem Test wurden die originalen Daten wiederhergestellt mit:

            php artisan db:seed --class=DevelopmentData


# Einige Quellen:
  - Tabellen mit Migrationsdateien erstellen (Aufgabe 7)

        laravel.com/docs/13.x/migrations 
  - Daten aus einer CSV-Datei mit DevelopmentData laden und 10000 Benutzer mit UserSeeder generieren (Aufgabe 9, 11)

        laravel.com/docs/13.x/seeding 
  - Artikelsuche mit dem Query Builder im ArticleController (Aufgabe 10)

        laravel.com/docs/13.x/queries
  - Anmeldung simulieren und Daten in der Sitzung mit AuthController speichern (Aufgabe 6)

        laravel.com/docs/13.x/session 
  - View erstellen: articles.blade.php mit Tabelle und Photos (Aufgabe 10o)

        laravel.com/docs/13.x/blade 
  - Hashing of the passwords in UserSeeder (Aufgabe 11)

        laravel.com/docs/13.x/hashing 
  - Lesen der CSV Files în DevelopmentData Seeder (Aufgabe 9):

          php.net/manual/en/function.fgetcsv.php 


