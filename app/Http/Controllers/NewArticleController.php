<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NewArticleController extends Controller
{
    public function validate(Request $request) {
        $validated = $request->validate([
            'name'        => 'required',
            'price'       => 'required|numeric|min:0.01',
            'description' => 'required',
        ]);

        DB::table('ab_article')->insert([
            'ab_name'        => $validated['name'],
            'ab_price'       => (int)($validated['price']),
            'ab_description' => $validated['description'],
            'ab_creator_id'  => 1,
            'ab_createdate'  => now(),
        ]);

        return redirect('/articles');
    }
}
