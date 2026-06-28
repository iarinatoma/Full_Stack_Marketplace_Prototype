<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ArticleAPIController;
use App\Http\Controllers\Api\ShoppingcartAPIController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// M3 Aufgabe 8 - Artikelsuche
Route::get('/articles', [ArticleAPIController::class, 'search']);

// M3 Aufgabe 9 - Artikel anlegen
Route::post('/articles', [ArticleAPIController::class, 'store']);

// M3 Aufgabe 10 - Artikel loschen
Route::delete('/articles/{id}', [ArticleAPIController::class, 'destroy']);

// M3 Aufgabe 11 - Warenkorb
Route::get('/shoppingcart', [ShoppingcartAPIController::class, 'index']);
Route::post('/shoppingcart', [ShoppingcartAPIController::class, 'store']);
Route::delete('/shoppingcart/{shoppingcartid}/articles/{articleId}', [ShoppingcartAPIController::class, 'destroy']);

Route::post('/articles/{id}/sold', function ($id) {
    $article = \Illuminate\Support\Facades\DB::table('ab_article')->where('id', $id)->first();

    if (!$article) {
        return response()->json(['error' => 'Artikel nicht gefunden.'], 404);
    }

    event(new \App\Events\VerkaufsEvent($article->ab_name));

    return response()->json(['message' => 'Verkaufsmeldung gesendet!']);
});

Route::post('/articles/{id}/angebot', function ($id) {
    $article = \Illuminate\Support\Facades\DB::table('ab_article')->where('id', $id)->first();

    if (!$article) {
        return response()->json(['error' => 'Artikel nicht gefunden.'], 404);
    }

    event(new \App\Events\AngebotEvent($article->ab_name, $article->id));

    return response()->json(['message' => 'Angebot gesendet!']);
});
