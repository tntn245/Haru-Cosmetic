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
    public function loadProductsInCategoryUseID(Request $request)
    {
        $data = $request->input();

        $getProductsInCategory =  DB::table('categories')
        ->join('products', 'categories.id', '=', 'products.category_id')
        ->where('categories.id',  $data['id'])
        ->select('categories.id', 'products.*')
        ->get();
        
        return $getProductsInCategory;
    }
    public function updateCategory(Request $request)
    {
            $data = $request->input();

            $categoryCount = Categories::where('id', $data['id'])->count();
            if ($categoryCount > 0) {
                $updateData = array_filter($request->input());

                Categories::where('id', $data['id'])->update([
                    'status'=>$data['status'],
                    'name' => $data['name'],
                    'description' => $data['description'],
                    'name_str' => $data['name_str'],
                ]);

                return response()->json([
                    'status' => true,
                    'message' => 'Category update successfully'
                ], 201);
            } else {
                return response()->json(['status' => false, 'message' => "Category does not exists"], 422);
            }
    }
}
