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

        $getProductsInCategory =  DB::table('category')
        ->join('products', 'category.id', '=', 'products.category_id')
        ->where('category.name_str',  $data['categoryStr'])
        ->select('category.*', 'products.*')
        ->get();
        
        return $getProductsInCategory;
    }
}
