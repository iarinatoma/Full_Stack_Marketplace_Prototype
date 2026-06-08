<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Abalo</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="/css/navigationsmenu.css">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>


<nav id="navigation"></nav>
<div id="vue-test">
    <p>@{{ mesaj }}</p>
</div>
</body>
</html>
