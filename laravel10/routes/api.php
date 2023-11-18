<?php

use App\Http\Controllers\BillController;
use App\Http\Controllers\FavouriteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CartController;

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
    Route::post('update-user', [UserController::class, 'updateUser']);
    // Route::post('images', [UserController::class, 'uploadImg']);

    Route::post('get-cart', [CartController::class, 'getProductsInCart']);
    Route::post('add-to-cart', [CartController::class, 'addToCart']);
    Route::post('remove-to-cart', [CartController::class, 'removeToCart']);
    Route::post('update-to-cart', [CartController::class, 'updateToCart']);
    Route::post('clear-cart', [CartController::class, 'clearCart']);

    Route::post('add-to-favs', [FavouriteController::class, 'addToFavs']);

});

