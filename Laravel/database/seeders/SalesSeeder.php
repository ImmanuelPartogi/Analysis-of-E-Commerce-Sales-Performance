<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Sale;
use Carbon\Carbon;

class SalesSeeder extends Seeder
{
    public function run()
    {
        $categories = ['Electronics', 'Fashion', 'Books', 'Home & Living', 'Sports', 'Beauty', 'Groceries'];
        $cities = ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang', 'Makassar', 'Yogyakarta'];

        for ($i = 0; $i < 1000; $i++) {
            Sale::create([
                'transaction_date' => Carbon::now()->subDays(rand(1, 365)),
                'category' => $categories[array_rand($categories)],
                'city' => $cities[array_rand($cities)],
                'quantity' => rand(1, 10),
                'price' => rand(50000, 1000000),
                'customer_rating' => rand(1, 5)
            ]);
        }
    }
}
