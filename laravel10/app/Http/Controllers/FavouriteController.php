<?php

namespace App\Http\Controllers;

use App\Models\Favourite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FavouriteController extends Controller
{
    public function getProductsInFavs(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->input();
            $userID = $data['userID'];

            $getProductsInFavs =  DB::table('favourites')
            ->join('products', 'carts.product_id', '=', 'products.id')
            ->where('user_id',  $userID)
            ->select('favourites.*', 'products.*')
            ->get();
            
            $productsArr = [];
            foreach ($getProductsInFavs as $product) {
                $productsArr[] = $product;
            }
            return $productsArr;
        }
    }
    public function addToFavs(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->input();
            $userID = $data['userID'];
            $productID = $data['productID'];
            
            $getProductsInFavs =  DB::table('favourites')->where('user_id',  $userID)->where('product_id',  $productID)->get();
            $flag = false;
            foreach ($getProductsInFavs as $product) {
                $flag = true;
            }
            
            if(!$flag){
                $favs = Favourite::create([
                    'user_id' => $userID,
                    'product_id' => $productID
                ]);
                $favs->save();
                return response()->json([
                    'status' => true,
                    'message' => 'Add to favourite cart successful'
                ], 201);
            }
        }
    }
}
