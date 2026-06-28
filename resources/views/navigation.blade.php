<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Abalo</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="/css/navigationsmenu.css">
    <script src="https://js.pusher.com/8.2.0/pusher.min.js"></script>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>

<nav id="navigation"></nav>
<div id="vue-test">
    <p>@{{ mesaj }}</p>
</div>

<div id="wartung-banner" style="display:none; background:red; color:white; padding:20px; text-align:center; font-size:18px;"></div>

<div id="verkauf-banner" style="display:none; background:green; color:white; padding:20px; text-align:center; font-size:18px;"></div>

<script>
    var pusher = new Pusher('o0moyvc1ek5cdve622f9', {
        wsHost: '127.0.0.1',
        wsPort: 8080,
        forceTLS: false,
        enabledTransports: ['ws'],
        cluster: 'mt1'
    });

    var channel = pusher.subscribe('wartung-channel');
    channel.bind('wartung-event', function(data) {
        var banner = document.getElementById('wartung-banner');
        banner.innerText = data.message;
        banner.style.display = 'block';
    });

    var verkaufChannel = pusher.subscribe('verkauf-channel');
    verkaufChannel.bind('verkauf-event', function(data) {
        var banner = document.getElementById('verkauf-banner');
        banner.innerText = data.message;
        banner.style.display = 'block';
    });
</script>

</body>
</html>
