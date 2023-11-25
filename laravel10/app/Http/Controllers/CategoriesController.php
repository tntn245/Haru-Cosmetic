<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoriesController extends Controller
{
    public function getCategories()
    {
        $getCategories = Categories::get();
        return $getCategories;
    }
    public function loadProductsInCategory(Request $request)
    {
        $data = $request->input();

        $getProductsInCategory =  DB::table('categories')
        ->join('products', 'categories.id', '=', 'products.category_id')
        ->where('categories.name_str',  $data['categoryStr'])
        ->select('categories.*', 'products.*')
        ->get();
        
        return $getProductsInCategory;
    }
}
