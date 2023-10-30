<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request) {
        $fields = $request->validate([
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string'
        ]);

        $user = User::create([
            'email' => $fields['email'],
            'password' => bcrypt($fields['password'])
        ]);

        $token = $user->createToken('myapptoken')->plainTextToken;
        $user->token = $token;
        $user->save();

        return response()->json(['status'=>true, 'message'=>'Register successfully!', 201]);       
    }

    // public function register(Request $request) {
    //     $fields = $request->validate([
    //         // 'name' => 'required|string',
    //         'email' => 'required|string|unique:users,email',
    //         'password' => 'required|string'
    //     ]);

    //     $user = User::create([
    //         // 'name' => $fields['name'],
    //         'email' => $fields['email'],
    //         'password' => bcrypt($fields['password'])
    //     ]);

    //     $token = $user->createToken('myapptoken')->plainTextToken;

    //     $response = [
    //         'user' => $user,
    //         'token' => $token
    //     ];

    //     return response($response, 201);
    // }

    public function login(Request $request) {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        // Check email
        $userCount = User::where('email', $fields['email'])->count();
        if($userCount>0){
            $user = User::where('email', $fields['email'])->first();

            // Check password
            if(!$user || !Hash::check($fields['password'], $user->password)) {
                return response([
                    'message' => 'Bad creds'
                ], 401);
            }

            $token = $user->createToken('myapptoken')->plainTextToken;

            $response = [
                'user' => $user,
                'token' => $token
            ];

            return response($response, 201);
        }
        else
            return response()->json(['status'=>false, 'message'=>'Email is incorrect!', 422]);
    
    }

    public function logout(Request $request) {
        // auth()->user()->tokens()->delete();
        $request->user('sanctum')->currentAccessToken()->delete();
        return [
            'message' => 'Logged out'
        ];
    }
}