<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ArticleHasArticleCategorySeeder extends Seeder
{
    public function run(): void
    {
        $file = fopen(database_path('data/article_has_articlecategory.csv'), 'r');

        // Sarim prima linie
        fgetcsv($file, 0, ';');

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
