<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function getUsers()
    {
        $getUsers = User::get();
        return $getUsers;
    }

    public function registerUser(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->input();

            $rules = [
                "email" => "required|email|unique:users,email",
                "password" => "required|required_with:confirmPassword|same:confirmPassword|min:6"
            ];
            $customMessages = [
                "email.required" => "Email is required",
                "email.email" => "Email address is invalid",
                "email.unique" => "Email is existed",
                "password.required" => "Password is required",
                "password.min" => "Password must have at least 6 characters",
                "password.same" => "Password is confirmed"
            ];

            $validator = Validator::make($data, $rules, $customMessages);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }

            $user = User::create([
                'name' => $data['email'],
                'email' => $data['email'],
                'password' => bcrypt($data['password'])
            ]);

            $token = $user->createToken('myapptoken')->plainTextToken;
            $user->token = $token;
            $user->save();

            return response()->json([
                'status' => true,
                'message' => 'Singup successful'
            ], 201);
        }
    }

    public function loginUser(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->input();

            $rules = [
                "email" => "required|email|exists:users",
                "password" => "required"
            ];
            $customMessages = [
                "email.required" => "Email is required",
                "email.email" => "Email address is invalid",
                "email.exists" => "Email does not exists",
                "password.required" => "Password is required"
            ];

            $validator = Validator::make($data, $rules, $customMessages);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }

            // Xác minh người dùng
            $userCount = User::where('email', $data['email'])->count();
            if ($userCount > 0) {
                $userDetails = User::where('email', $data['email'])->first();

                if (password_verify($data['password'], $userDetails->password)) {
                    return response()->json([
                        'userDetails' => $userDetails,
                        'status' => true,
                        'message' => 'Login successfully'
                    ], 201);
                } else {
                    $message = "Password is incorrect";
                    return response()->json(['status' => false, 'message' => $message], 422);
                }
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Email does not exists'
                ], 422);
            }
        }
    }

    public function logoutUser(Request $request)
    {
        // auth()->user()->tokens()->delete();
        $request->user('sanctum')->currentAccessToken()->delete();
        return [
            'message' => 'Logged out'
        ];
    }

    public function updateUser(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->input();

            $userCount = User::where('id', $data['id'])->count();
            if ($userCount > 0) {
                //Update
                User::where('id', $data['id'])->update(array_filter($request->all()));

                //Fetch
                $userDetails = User::where('id', $data['id'])->first();

                return response()->json([
                    'userDetails' => $userDetails,
                    'status' => true,
                    'message' => 'User update successfully'
                ], 201);
            } else {
                $message = "User does not exists";
                return response()->json(['status' => false, 'message' => $message], 422);
            }
        }
    }
    
    public function uploadImg(Request $request){
        if ($request->isMethod('post')) {
            if ($request->hasFile('image')) {

                $image = $request->file('image');
                $imageName = $image->getClientOriginalName();

                // $imageData = file_get_contents($image->getRealPath());

                // $newImage = new Image();
                
                // $newImage->name = $image->getClientOriginalName();
                // $newImage->image = $imageData;
                // $newImage->save();


                $image->store('avatar', 'public');
                // auth()->user()->update(['avatar' => storage_path('app')."/$path"]);

                return response()->json(['message' => $imageName], 200);
            }

            return response()->json(['message' => 'Không tìm thấy ảnh'], 400);
        }
    }
    
}
