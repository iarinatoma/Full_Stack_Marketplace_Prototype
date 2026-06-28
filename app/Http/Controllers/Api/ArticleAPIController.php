<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ArticleAPIController extends Controller
{
    public function search(Request $request)
    {
        $search = $request->input('search', '');
        $page = $request->input('page', 1);  // ce pagina vrea userul (default 1)
        $perPage = 5; // 5 articole pe pagina
        $offset = ($page - 1) * $perPage; // pagina 1 → offset 0, pagina 2 → offset 5

        $query = DB::table('ab_article')
            ->whereRaw('LOWER(ab_name) LIKE ?', ['%' . strtolower($search) . '%']);

        $total = $query->count();
        $totalPages = ceil($total / $perPage);

        $articles = $query
            ->limit($perPage) // LIMIT 5 — ia doar 5 articole
            ->offset($offset) // OFFSET 0/5/10 — de unde sa inceapa
            ->get();

        // daca vine request cu page, returnam format nou cu paginare
        // daca nu, returnam array simplu ca inainte - compatibil cu M3/M4
        if ($request->has('page')) {
            return response()->json([ // format nou cu paginare
                'data' => $articles,
                'total' => $total,
                'page' => $page,
                'perPage' => $perPage,
                'totalPages' => $totalPages
            ]);
        }

        return response()->json($articles); // format vechi — compatibil M3/M4
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
