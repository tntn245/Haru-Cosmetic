<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Models\Order;

use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function getNextOrderID()
    {
        $maxID = DB::table('orders')->max('id');
        $nextID = $maxID + 1;
        return $nextID;
    }
    public function createOrder(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->input();
            $userID = $data['userID'];
            $totalPrice = $data['totalPrice'];
            $paymentMethod = $data['paymentMethod'];

            $order = Order::create([
                'user_id' => $userID,
                'total_price' => $totalPrice,
                'payment_method' => $paymentMethod
            ]);
            $order->save();

            return response()->json([
                'status' => true,
                'message' => 'Add order successful',
                'order_id' => $order->id
            ], 201);
        }
    }
    public function updatePaymentStatus(Request $request){
        
        if ($request->isMethod('post')) {
            $data = $request->input();
            $orderID = $data['orderID'];
            $paymentStatus = $data['paymentStatus'];

            DB::table('orders')
            ->where('id',  $orderID)
            ->update(['payment_status' => $paymentStatus]);
            
            return response()->json([
                'status' => true,
                'message' => 'Update payment status successful'
            ], 201);
        }
    }
    public function updateOrderStatus(Request $request){
        
        if ($request->isMethod('post')) {
            $data = $request->input();
            $orderID = $data['orderID'];
            $orderStatus = $data['orderStatus'];

            DB::table('orders')
            ->where('id',  $orderID)
            ->update(['order_status' => $orderStatus]);
            
            return response()->json([
                'status' => true,
                'message' => 'Update order status successful'
            ], 201);
        }
    }
}
