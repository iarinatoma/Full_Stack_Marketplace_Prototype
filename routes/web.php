<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AbTestDataController;
use App\Http\Controllers\ArticleController;

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


use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

Route::post('/articles', function (Request $request) {
    $validated = $request->validate([
        'name' => 'required',
        'price' => 'required|numeric|min:0.01',
        'description' => 'required',
    ]);

    DB::table('ab_article')->insert([
        'ab_name' => $validated['name'],
        'ab_price' => (int)($validated['price'] * 100),
        'ab_description' => $validated['description'],
        'ab_creator_id' => 1,
        'ab_createdate' => now(),
    ]);

    return redirect('/articles');
});
