<?php

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
require __DIR__.'/auth.php';
