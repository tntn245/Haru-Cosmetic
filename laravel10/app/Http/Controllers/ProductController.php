<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class ProductController extends Controller
{
    public function getProducts()
    {
        $getProduct = Product::get();
        return $getProduct;
    }
}