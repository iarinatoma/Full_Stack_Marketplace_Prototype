<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ArticleHasArticleCategorySeeder extends Seeder
{
    public function run(): void
    {
        // al doilea param inseamna lungimea max a unei linii.
        // 0 inseamna fara limita
        $file = fopen(database_path('data/article_has_articlecategory.csv'), 'r');

        // Sarim prima linie
        fgetcsv($file, 0, ';');

        // fgetcsv citește o linie din CSV și o transformă într-un array.
        // ca eu in baza de date am doua coloane si creeaza un array cu 2 valori fiecare
        while (($row = fgetcsv($file, 0, ';')) !== false) {
            DB::table('ab_article_has_articlecategory')->insert([
                'ab_articlecategory_id' => $row[0],
                'ab_article_id'         => $row[1],
            ]);
        }

        fclose($file);
    }
}

//php artisan db:seed --class=ArticleHasArticleCategorySeeder
