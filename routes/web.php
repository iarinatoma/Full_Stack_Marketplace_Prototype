<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AbTestDataController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\NewArticleController;
use App\Http\Controllers\ShoppingcartController;

Route::get('/', function () {
    return view('navigation');
});

//Laravel vede URL-ul /testdata și spune: „apelează controller-ul”
Route::get('/testdata', [AbTestDataController::class, 'index']);

Route::get('/login', [App\Http\Controllers\AuthController::class, 'login'])->name('login');
Route::get('/logout', [App\Http\Controllers\AuthController::class, 'logout'])->name('logout');
Route::get('/isloggedin', [App\Http\Controllers\AuthController::class, 'isloggedin'])->name('haslogin');

Route::get('/articles', [ArticleController::class, 'index']);

Route::get('/newarticle', function () {
    return view('newarticle');
});

// artikelsuche -> http://localhost:8000/api/articles?search=Iphone
Route::get('/api/articles', [NewArticleController::class, 'search_api']);
Route::post('/api/articles', [NewArticleController::class, 'store_api']);

Route::post('/articles', [NewArticleController::class, 'validate']);

// cerinta b - adauga articol in cos
Route::post('/api/shoppingcart', [ShoppingcartController::class, 'store_api']);

// cerinta c - sterge articol din cos
Route::delete('/api/shoppingcart/{shoppingcartid}/articles/{articleId}', [ShoppingcartController::class, 'destroy_api']);

// cerinta d - incarca cosul la reload
Route::get('/api/shoppingcart', [ShoppingcartController::class, 'index_api']);
