<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function getProducts()
    {
        $getProducts = DB::table('products')
        ->leftJoin('categories', 'products.category_id', '=', 'categories.id')
        ->leftJoin('brands', 'products.brand_id', '=', 'brands.id')
        ->select('products.*', 'categories.name as category_name', 'brands.name as brand_name')
        ->get();
        return $getProducts;
    }
    public function getProductInf(Request $request)
    {
        $data = $request->input();
        $getProduct = Product::where('id',  $data['productID'])->get();
        return $getProduct;
    }
    public function uploadImageProduct(Request $request)
    {
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $request->file('image')->store('images');

            $uploadedFileUrl = Cloudinary::upload($request->file('image')->getRealPath())->getSecurePath();

            $newProduct = new Product();

            $newProduct->image = $uploadedFileUrl;
            $newProduct->save();

            if ($uploadedFileUrl) 
                return response()->json(['url' => $uploadedFileUrl], 200);
            else  
                return back()->with('status', 'Failed to upload image');
        } else {
            return back()->with('status', 'Failed to upload image');
        }
    }
    public function searchProducts($text)
    {
        $searchProducts =  Product::where('name', 'LIKE', '%' . $text . '%')->get();
        return $searchProducts;
    }
}