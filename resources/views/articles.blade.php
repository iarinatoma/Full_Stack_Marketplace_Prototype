<form method="GET" action="/articles">
    <input type="text" name="search" placeholder="Search..." value="{{ request('search') }}">
    <button type="submit">Search</button>
</form>

<table border="1">
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Price</th>
        <th>Description</th>
        <th>Image</th>
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
        </tr>
    @endforeach
</table>
