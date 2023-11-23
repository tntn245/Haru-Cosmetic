<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\FavouriteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderDetailsController;
use App\Http\Controllers\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::namespace('App\Http\Controllers')->group(function(){
    Route::post('register-user', [UserController::class, 'registerUser']);
    Route::post('login-user', [UserController::class, 'loginUser']);
    Route::post('login-google', [UserController::class, 'loginGoogle']);
    Route::post('logout-user', [UserController::class, 'logoutUser']);
    Route::post('get-user', [UserController::class, 'getUser']);
    Route::post('update-user', [UserController::class, 'updateUser']);
    // Route::post('images', [UserController::class, 'uploadImg']);

    Route::post('get-products', [ProductController::class, 'getProducts']);

    Route::post('get-cart', [CartController::class, 'getProductsInCart']);
    Route::post('add-to-cart', [CartController::class, 'addToCart']);
    Route::post('remove-to-cart', [CartController::class, 'removeToCart']);
    Route::post('update-to-cart', [CartController::class, 'updateToCart']);
    Route::post('clear-cart', [CartController::class, 'clearCart']);

    Route::post('get-favs', [FavouriteController::class, 'getProductsInFavs']);
    Route::post('add-to-favs', [FavouriteController::class, 'addToFavs']);
    Route::post('check-faved', [FavouriteController::class, 'checkFaved']);
    Route::post('remove-from-favs', [FavouriteController::class, 'removeFromFavs']);

    Route::post('create-order', [OrderController::class, 'createOrder']);
    Route::post('update-order-status', [OrderController::class, 'updateOrderStatus']);
    Route::post('update-payment-status', [OrderController::class, 'updatePaymentStatus']);

    Route::post('create-order-details', [OrderDetailsController::class, 'createOrderDetails']);

    Route::group(['middleware' => ['auth:sanctum']], function(){
        Route::post('get-user', [UserController::class, 'getUser']);
    });
});

