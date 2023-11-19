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
        'api/update-user',

        'api/get-cart',
        'api/add-to-cart',
        'api/remove-to-cart',
        'api/update-to-cart',
        'api/clear-cart',

        'api/get-favs',
        'api/add-to-favs',
        'api/check-faved',
        'api/remove-from-favs',
        
        'upload-img-product',
        'search-product',

        'vnpay',
        'next-bill-id',

    ];
}
