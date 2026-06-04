<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>New Article</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="/css/navigationsmenu.css">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
<nav id="navigation"></nav>
<h1>Neuen Artikel anlegen</h1>
<div id="vue-artikel-form"></div>
</body>
</html>
