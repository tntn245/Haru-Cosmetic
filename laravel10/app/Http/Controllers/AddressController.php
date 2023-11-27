<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    public function getAddress(Request $request)
    {
        $data = $request->input();
        $getAddress = Address::where("user_id", $data['userID'])->get();
        return $getAddress;
    }
    public function addNewAddress(Request $request)
    {
        $data = $request->input();
        
        $address = Address::create([
            'user_id' => $data['userID'],
            'name' => $data['name'],
            'phone' => $data['phone'],    
            'address' => $data['address'],
        ]);
        $address->save();

        return $address;
    }
}
