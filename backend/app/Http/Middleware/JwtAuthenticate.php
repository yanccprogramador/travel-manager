<?php

namespace App\Http\Middleware;

use App\Models\User;
use App\Services\JwtService;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class JwtAuthenticate
{
    public function handle(Request $request, Closure $next): Response
    {
        $authHeader = $request->header('Authorization');

        if (! $authHeader || ! str_starts_with($authHeader, 'Bearer ')) {
            return response()->json(['message' => 'Token JWT não informado.'], 401);
        }

        $token = substr($authHeader, 7);
        $payload = JwtService::decode($token);

        if (! $payload || ! isset($payload['sub'])) {
            return response()->json(['message' => 'Token JWT inválido ou expirado.'], 401);
        }

        $user = User::find($payload['sub']);

        if (! $user) {
            return response()->json(['message' => 'Usuário não encontrado.'], 401);
        }

        Auth::login($user);

        return $next($request);
    }
}

