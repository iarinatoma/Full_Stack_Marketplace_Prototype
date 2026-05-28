<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Artikel</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="/css/navigationsmenu.css">
</head>
<body>

<nav id="navigation"></nav>

<form method="GET" action="/articles">
    <input type="text" name="search" placeholder="Search..." value="{{ request('search') }}">
    <button type="submit">Search</button>
</form>

<h2>Warenkorb</h2>
<div id="cart">
    <p>Der Warenkorb ist leer.</p>
</div>

<table border="1">
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Price</th>
        <th>Description</th>
        <th>Image</th>
        <th>Aktion</th>
    </tr>

    @foreach($articles as $article)
        <tr>
            <td>{{ $article->id }}</td>
            <td>{{ $article->ab_name }}</td>
            <td>{{ $article->ab_price }}</td>
            <td>{{ $article->ab_description }}</td>
            <td>
                @php
                    $png = "images/{$article->id}.png";
                    $jpg = "images/{$article->id}.jpg";
                @endphp

                @if(file_exists(public_path($png)))
                    <img src="/{{ $png }}" width="100">
                @elseif(file_exists(public_path($jpg)))
                    <img src="/{{ $jpg }}" width="100">
                @else
                    No image
                @endif
            </td>

            <td>
                <button
                    class="add-to-cart"
                    data-id="{{ $article->id }}"
                    data-name="{{ $article->ab_name }}"
                    data-price="{{ $article->ab_price }}">
                    +
                </button>
            </td>
        </tr>
    @endforeach
</table>

<script src="/js/navigationsmenu.js" defer></script>
<script src="/js/warenkorb.js" defer></script>

</body>
</html>
