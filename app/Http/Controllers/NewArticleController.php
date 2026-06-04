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

}
