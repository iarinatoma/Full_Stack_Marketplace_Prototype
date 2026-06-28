<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Artikel</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="/css/navigationsmenu.css">
    <script src="https://js.pusher.com/8.2.0/pusher.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>

<nav id="navigation"></nav>

<!-- Angebot Banner -->
<div id="angebot-banner" style="display:none; background:orange; color:white; padding:20px; text-align:center; font-size:18px;"></div>

<h2>Dynamische Artikelsuche (Vue)</h2>
<div id="vue-search"></div>

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
        <tr id="artikel-{{ $article->id }}">
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
                <button class="add-to-cart"
                        data-id="{{ $article->id }}"
                        data-name="{{ $article->ab_name }}"
                        data-price="{{ $article->ab_price }}">+
                </button>
                <button class="angebot-btn" data-id="{{ $article->id }}">
                    Artikel jetzt als Angebot anbieten
                </button>
            </td>
        </tr>
    @endforeach
</table>

<script>
    // Pusher - empfange Angebot Nachrichten
    var pusher = new Pusher('o0moyvc1ek5cdve622f9', {
        wsHost: '127.0.0.1',
        wsPort: 8080,
        forceTLS: false,
        enabledTransports: ['ws'],
        cluster: 'mt1'
    });

    var angebotChannel = pusher.subscribe('angebot-channel');
    angebotChannel.bind('angebot-event', function(data) {
        // Zeige Banner
        var banner = document.getElementById('angebot-banner');
        banner.innerText = data.message;
        banner.style.display = 'block';

        // Optional: Artikel hervorheben
        var row = document.getElementById('artikel-' + data.artikelId);
        if (row) {
            row.style.fontWeight = 'bold';
            row.style.backgroundColor = '#fff3cd';
        }
    });

    // Axios - sende Angebot
    document.querySelectorAll('.angebot-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var id = this.dataset.id;
            axios.post('/api/articles/' + id + '/angebot', {}, {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                }
            }).then(function(response) {
                console.log('Angebot gesendet:', response.data);
            }).catch(function(error) {
                console.error('Fehler:', error);
            });
        });
    });
</script>

</body>
</html>
