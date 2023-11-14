<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

class BillController extends Controller
{
    public function getNextBillID()
    {
        $maxID = DB::table('bills')->max('id');
        $nextID = $maxID + 1;
        return $nextID;
    }
}
