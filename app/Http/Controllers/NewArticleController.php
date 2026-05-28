<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NewArticleController extends Controller
{
    public function validate(Request $request) {
        try {
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

            return response("Erfolgreich", 200);

        } catch (ValidationException $e) {
            $errors = implode(", ", $e->validator->errors()->all());
            return response("Fehler: " . $errors, 422);

        } catch (\Exception $e) {
            return response("Fehler: " . $e->getMessage(), 500);
        }
    }

    public function search_api(Request $request) {
        // citim parametrul ?search= din URL
        $search = $request->input('search', '');

        // cautam in baza de date
        $articles = DB::table('ab_article')
            ->where('ab_name', 'like', '%' . $search . '%')
            ->get();

        // returnam rezultatul ca JSON
        return response()->json($articles);
    }

    public function store_api(Request $request) {
        // validare manuala - name nu e gol, price > 0
        if (empty($request->input('name'))) {
            return response()->json(['error' => 'Name darf nicht leer sein.'], 422);
        }

        if ($request->input('price') <= 0) {
            return response()->json(['error' => 'Price muss größer als 0 sein.'], 422);
        }

        // inserare in baza de date
        $id = DB::table('ab_article')->insertGetId([
            'ab_name'        => $request->input('name'),
            'ab_price'       => (int)($request->input('price')),
            'ab_description' => $request->input('description'),
            'ab_creator_id'  => 1,
            'ab_createdate'  => now(),
        ]);

        // returnam id-ul ca JSON
        return response()->json(['id' => $id], 200);
    }
}
