<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ArticleAPIController extends Controller
{
    // M3 Aufgabe 8 - GET /api/articles?search=
    public function search(Request $request)
    {
        $search = $request->input('search', '');

        $articles = DB::table('ab_article')
            ->whereRaw('LOWER(ab_name) LIKE ?', ['%' . strtolower($search) . '%'])
            ->get();

        return response()->json($articles);
    }

    // M3 Aufgabe 9 - POST /api/articles
    public function store(Request $request)
    {
        if (empty($request->input('name'))) {
            return response()->json(['error' => 'Name darf nicht leer sein.'], 422);
        }

        if ($request->input('price') <= 0) {
            return response()->json(['error' => 'Price muss größer als 0 sein.'], 422);
        }

        $id = DB::table('ab_article')->insertGetId([
            'ab_name'        => $request->input('name'),
            'ab_price'       => (int)($request->input('price')),
            'ab_description' => $request->input('description'),
            'ab_creator_id'  => 1,
            'ab_createdate'  => now(),
        ]);

        return response()->json(['id' => $id], 200);
    }

    // M3 Aufgabe 10 - DELETE /api/articles/{id}
    public function destroy($id)
    {
        $article = DB::table('ab_article')->where('id', $id)->first();

        if (!$article) {
            return response()->json(['error' => 'Artikel nicht gefunden.'], 404);
        }

        DB::table('ab_article')->where('id', $id)->delete();

        return response()->json(['result' => 'Artikel erfolgreich gelöscht.'], 200);
    }
}
