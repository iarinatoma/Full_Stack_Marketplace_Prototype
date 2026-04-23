<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AbTestDataController;

Route::get('/', function () {
    return view('welcome');
});

//Laravel vede URL-ul /testdata și spune: „apelează controller-ul”
Route::get('/testdata', [AbTestDataController::class, 'index']);

