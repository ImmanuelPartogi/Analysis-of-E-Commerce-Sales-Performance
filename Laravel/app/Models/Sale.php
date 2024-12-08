<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    protected $fillable = [
        'transaction_date',
        'category',
        'city',
        'quantity',
        'price',
        'customer_rating'
    ];

    protected $dates = ['transaction_date'];
}
