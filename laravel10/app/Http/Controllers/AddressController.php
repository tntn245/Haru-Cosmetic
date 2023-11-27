<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AddressController extends Controller
{
    public function getAddresses(Request $request)
    {
        $data = $request->all();
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
    public function updateAddress(Request $request)
    {
        $data = $request->input();

        Address::where('id',  $data['id'])
        ->update([
            'name' => $data['name'],
            'phone' => $data['phone'],
            'address' => $data['address']
        ]);

        $updatedData = Address::where('id', $data['id'])->first();
        return $updatedData;
    }
    public function deleteAddress(Request $request)
    {
        $data = $request->input();

        Address::where('id',  $data['id'])->delete();

        return response()->json([
            'status' => true,
            'message' => 'Delete address successful'
        ], 201);
    }
}
