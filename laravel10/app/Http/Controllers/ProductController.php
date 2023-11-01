<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class ProductController extends Controller
{
    public function getProducts()
    {
        $getProduct = Product::get();
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
}