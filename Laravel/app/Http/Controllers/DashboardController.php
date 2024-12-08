<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Illuminate\Http\Request;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $totalSales = Sale::count();
        $totalRevenue = Sale::sum('price');
        $averageRating = Sale::avg('customer_rating');

        $salesByCategory = Sale::selectRaw('category, sum(price) as total')
            ->groupBy('category')
            ->get();

        $salesByCity = Sale::selectRaw('city, sum(price) as total')
            ->groupBy('city')
            ->get();

        $ratingDistribution = Sale::selectRaw('customer_rating, count(*) as count')
            ->groupBy('customer_rating')
            ->get();

        $monthlySales = Sale::selectRaw('DATE_FORMAT(transaction_date, "%Y-%m") as month, sum(price) as total')
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return view('dashboard', compact(
            'totalSales',
            'totalRevenue',
            'averageRating',
            'salesByCategory',
            'salesByCity',
            'ratingDistribution',
            'monthlySales'
        ));
    }
}
