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


Route::post('/articles', [NewArticleController::class, 'validate']);

Route::get('/newsite', function () {
    return view('newsite');
});

Route::get('/send-test', function () {
    event(new \App\Events\TestEvent('Hallo von Abalo!'));
    return 'Message sent!';
});

Route::get('/send-ws2', function () {
    event(new \App\Events\TestEvent('Hallo von Abalo!'));
    return 'Message sent!';
});

Route::get('/send-ws3', function () {
    event(new \App\Events\SelectedMessageEvent('Hallo an ID 42!', 42));
    return 'sent!';
});

Route::get('/send-ws4', function () {
    event(new \App\Events\TestEvent('Hallo von Vue!'));
    return 'sent!';
});

Route::get('/send-wartung', function () {
    event(new \App\Events\WartungsEvent());
    return 'Wartungsnachricht gesendet!';
});

Route::get('/send-verkauf/{id}', function ($id) {
    $article = \Illuminate\Support\Facades\DB::table('ab_article')->where('id', $id)->first();
    event(new \App\Events\VerkaufsEvent($article->ab_name));
    return 'Verkaufsmeldung gesendet!';
});
