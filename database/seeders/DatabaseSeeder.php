<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RolePermissionSeeder::class,
            ConfigurationSeeder::class,
            LanguageSeeder::class,
            ConditionSeeder::class,
            StatusSeeder::class,
            BookSeeder::class,
        ]);
    }
}
