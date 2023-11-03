<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    public function getProductsInCart(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->input();
            $userID = $data['userID'];

            $getProductsInCart =  DB::table('carts')
            ->join('products', 'carts.product_id', '=', 'products.id')
            ->where('user_id',  $userID)
            ->select('carts.*', 'products.*')
            ->get();
            
            $productsArr = [];
            foreach ($getProductsInCart as $product) {
                $productsArr[] = $product;
            }
            return $productsArr;
        }
    }
    public function addToCart(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->input();
            $userID = $data['userID'];
            $productID = $data['productID'];

            $getProductsInCart =  DB::table('carts')->where('user_id',  $userID)->where('product_id',  $productID)->get();
            $flag = false;
            foreach ($getProductsInCart as $product) {
                $flag = true;
                $new_quantity = $product->quantity + 1;
                
                DB::table('carts')
                ->where('user_id',  $userID)
                ->where('product_id',  $productID)
                ->update(['quantity' => $new_quantity]);
                
                return response()->json([
                    'status' => true,
                    'message' => 'Update quantity successful'
                ], 201);
            }
            
            if(!$flag){
                $cart = Cart::create([
                    'user_id' => $userID,
                    'product_id' => $productID,
                    'quantity' => 1
                ]);
                $cart->save();
                return response()->json([
                    'status' => true,
                    'message' => 'Add to cart successful'
                ], 201);
            }

        }
    }
    public function removeToCart(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->input();
            $userID = $data['userID'];
            $productID = $data['productID'];

            DB::table('carts')
            ->where('user_id',  $userID)
            ->where('product_id',  $productID)
            ->delete();
            
            return response()->json([
                'status' => true,
                'message' => 'Delete product in cart successful'
            ], 201);
        }
    }
    public function updateToCart(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->input();
            $userID = $data['userID'];
            $productID = $data['productID'];
            $new_quantity = $data['newQuantity'];

            DB::table('carts')
                ->where('user_id',  $userID)
                ->where('product_id',  $productID)
                ->update(['quantity' => $new_quantity]);

            return response()->json([
                'status' => true,
                'message' => 'Update quantity successful'
            ], 201);
        }
    }
    public function clearCart(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->input();
            $userID = $data['userID'];

            DB::table('carts')
            ->where('user_id',  $userID)
            ->delete();
            
            return response()->json([
                'status' => true,
                'message' => 'Clear cart successful'
            ], 201);
        }
    }
}