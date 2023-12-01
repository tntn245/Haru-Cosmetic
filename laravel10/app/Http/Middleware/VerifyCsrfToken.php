<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        // 
        'api/register-user',
        'api/login-user',
        'api/login-google',
        'api/logout-user',
        'api/get-user',
        'api/update-user',
        'google/callback',
        'google/redirect',
        'auth/google',
        'auth/google/callback',

        'api/get-categories',
        'api/load-products-in-category',
        
        'api/get-brands',
        'api/load-products-in-brand',

        'api/get-products',
        'api/get-product-inf',

        'api/get-reviews',
        'api/add-new-review',

        'api/get-addresses',
        'api/add-new-address',
        'api/update-address',
        'api/delete-address',

        'api/get-cart',
        'api/add-to-cart',
        'api/remove-to-cart',
        'api/update-to-cart',
        'api/clear-cart',

        'api/get-favs',
        'api/add-to-favs',
        'api/check-faved',
        'api/remove-from-favs',
        
        'api/create-order',
        'api/update-order-status',
        'api/update-payment-status',

        'api/create-order-details',

        'upload-img-product',
        'search-product',

        'vnpay',
        'momo',
        'next-order-id',

    ];
}
