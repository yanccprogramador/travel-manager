<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\JwtService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request, \App\Services\AuthService $authService)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        try {
            $tokenData = $authService->login($credentials);
            return response()->json($tokenData);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Credenciais inválidas.',
            ], 401);
        }
    }
}

