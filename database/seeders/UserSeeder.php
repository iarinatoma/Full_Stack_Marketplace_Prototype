<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Te întreabă direct în terminal: "Do you want to generate 10.000 users?"
        if ($this->command->confirm('Do you want to generate 10.000 users?')) {

            // Ștergem utilizatorii vechi pentru a nu aglomera baza
            DB::table('ab_user')->truncate();

            $hashedPassword = Hash::make('password123'); // one time

            $users = [];
            for ($i = 0; $i < 10000; $i++) {
                $users[] = [
                    'ab_name' => 'User_' . Str::random(5) . $i,
                    'ab_password' => $hashedPassword,
                    'ab_mail' => 'user' . $i . Str::random(5) . '@example.com',
                ];
            }

            // Inserăm în calupuri de 1000
            foreach (array_chunk($users, 1000) as $chunk) {
                DB::table('ab_user')->insert($chunk);
            }

            $this->command->info('10.000 users generated successfully!');
        } else {
            $this->command->info('Skipping user generation.');
        }
    }
}
