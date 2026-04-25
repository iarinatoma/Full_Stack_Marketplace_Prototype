<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DevelopmentData extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('ab_article')->truncate();
        DB::table('ab_articlecategory')->truncate();
        DB::table('ab_user')->truncate();

        $file = fopen(database_path('data/user.csv'), 'r');

        // sari header
        fgetcsv($file);

        while (($row = fgetcsv($file, 0, ';')) !== FALSE) {
            DB::table('ab_user')->insert([
                'id' => (int)$row[0],
                'ab_name' => $row[1],
                'ab_password' => $row[2],
                'ab_mail' => $row[3],
            ]);
        }

        fclose($file);

        $file = fopen(database_path('data/articlecategory.csv'), 'r');
        fgetcsv($file);

        while (($row = fgetcsv($file, 0, ';')) !== FALSE) {
            DB::table('ab_articlecategory')->insert([
                'id' => (int)$row[0],
                'ab_name' => $row[1],
                'ab_description' => $row[2] !== '' ? $row[2] : null,
                'ab_parent' => isset($row[3]) && $row[3] !== '' ? $row[3] : null            ]);
        }

        fclose($file);

        $file = fopen(database_path('data/articles.csv'), 'r');
        fgetcsv($file);

        while (($row = fgetcsv($file, 0, ';')) !== FALSE) {
            DB::table('ab_article')->insert([
                'id' => (int)$row[0],
                'ab_name' => $row[1],
                'ab_price' => (int)$row[2],
                'ab_description' => $row[3],
                'ab_creator_id' => (int)$row[4],
                'ab_createdate' => date('Y-m-d H:i:s', strtotime($row[5])),
            ]);
        }

        fclose($file);
    }
}
