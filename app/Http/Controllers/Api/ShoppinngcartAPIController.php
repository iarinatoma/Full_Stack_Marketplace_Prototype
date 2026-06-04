<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ShoppingcartAPIController extends Controller
{
    // GET /api/shoppingcart
    public function index(Request $request)
    {
        $items = DB::table('ab_shoppingcart_item')
            ->join('ab_shoppingcart', 'ab_shoppingcart_item.ab_shoppingcart_id', '=', 'ab_shoppingcart.id')
            ->join('ab_article', 'ab_shoppingcart_item.ab_article_id', '=', 'ab_article.id')
            ->where('ab_shoppingcart.ab_creator_id', 1)
            ->select(
                'ab_shoppingcart_item.id as item_id',
                'ab_shoppingcart_item.ab_shoppingcart_id',
                'ab_article.id as article_id',
                'ab_article.ab_name as name',
                'ab_article.ab_price as price'
            )
            ->get();

        return response()->json($items);
    }

    // POST /api/shoppingcart
    public function store(Request $request)
    {
        $articleId = $request->input('articleid');

        if (empty($articleId)) {
            return response()->json(['error' => 'articleid fehlt.'], 422);
        }

        $article = DB::table('ab_article')->where('id', $articleId)->first();

        if (!$article) {
            return response()->json(['error' => 'Artikel nicht gefunden.'], 404);
        }

        $cart = DB::table('ab_shoppingcart')
            ->where('ab_creator_id', 1)
            ->first();

        if (!$cart) {
            $cartId = DB::table('ab_shoppingcart')->insertGetId([
                'ab_creator_id' => 1,
                'ab_createdate' => now(),
            ]);
        } else {
            $cartId = $cart->id;
        }

        $alreadyIn = DB::table('ab_shoppingcart_item')
            ->where('ab_shoppingcart_id', $cartId)
            ->where('ab_article_id', $articleId)
            ->first();

        if ($alreadyIn) {
            return response()->json(['error' => 'Artikel bereits im Warenkorb.'], 422);
        }

        $itemId = DB::table('ab_shoppingcart_item')->insertGetId([
            'ab_shoppingcart_id' => $cartId,
            'ab_article_id'      => $articleId,
            'ab_createdate'      => now(),
        ]);

        return response()->json(['id' => $itemId], 200);
    }

    // DELETE /api/shoppingcart/{shoppingcartid}/articles/{articleId}
    public function destroy(Request $request, $shoppingcartid, $articleId)
    {
        DB::table('ab_shoppingcart_item')
            ->where('ab_shoppingcart_id', $shoppingcartid)
            ->where('ab_article_id', $articleId)
            ->delete();

        return response()->json(['result' => 'Erfolgreich entfernt.'], 200);
    }
}
