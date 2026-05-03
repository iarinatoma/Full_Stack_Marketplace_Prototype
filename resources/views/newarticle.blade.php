<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>New Article</title>

    <script src="/js/newarticle.js" defer></script>
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>

<h1>Neuen Artikel anlegen</h1>

<div id="form-container"></div>

@if ($errors->any())
    <div>
        <strong>Fehler:</strong>
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

</body>
</html>
