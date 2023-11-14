<?php

use App\Http\Controllers\BillController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});
Route::post('/', function () {
    return [];
});

Route::get('get-products', [ProductController::class, 'getProducts']);
Route::post('upload-img-product', [ProductController::class, 'uploadImageProduct']);
Route::get('search-product/{text}', [ProductController::class, 'searchProducts']);

Route::post('vnpay', [CheckoutController::class, 'VNPay']);
Route::get('vnpay', [CheckoutController::class, 'VNPay']);
Route::get('getvnpay', [CheckoutController::class, 'getVNPay']);

Route::post('next-bill-id', [BillController::class, 'getNextBillID']);

// require __DIR__.'/auth.php';
