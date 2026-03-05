<?php

namespace App\Services;

class JwtService
{
    public static function encode(array $payload, ?string $secret = null): string
    {
        $secret ??= config('app.key');

        $header = [
            'alg' => 'HS256',
            'typ' => 'JWT',
        ];

        $segments = [
            self::base64UrlEncode(json_encode($header, JSON_THROW_ON_ERROR)),
            self::base64UrlEncode(json_encode($payload, JSON_THROW_ON_ERROR)),
        ];

        $signingInput = implode('.', $segments);
        $signature = hash_hmac('sha256', $signingInput, $secret, true);

        $segments[] = self::base64UrlEncode($signature);

        return implode('.', $segments);
    }

    public static function decode(string $token, ?string $secret = null): ?array
    {
        $secret ??= config('app.key');

        $parts = explode('.', $token);

        if (count($parts) !== 3) {
            return null;
        }

        [$encodedHeader, $encodedPayload, $encodedSignature] = $parts;

        $headerJson = json_decode(self::base64UrlDecode($encodedHeader), true);

        if (! is_array($headerJson) || ($headerJson['alg'] ?? null) !== 'HS256') {
            return null;
        }

        $signingInput = $encodedHeader . '.' . $encodedPayload;
        $expectedSignature = self::base64UrlEncode(hash_hmac('sha256', $signingInput, $secret, true));

        if (! hash_equals($expectedSignature, $encodedSignature)) {
            return null;
        }

        $payload = json_decode(self::base64UrlDecode($encodedPayload), true);

        if (! is_array($payload)) {
            return null;
        }

        if (isset($payload['exp']) && time() >= (int) $payload['exp']) {
            return null;
        }

        return $payload;
    }

    private static function base64UrlEncode(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    private static function base64UrlDecode(string $data): string
    {
        $remainder = strlen($data) % 4;

        if ($remainder) {
            $padLen = 4 - $remainder;
            $data .= str_repeat('=', $padLen);
        }

        return base64_decode(strtr($data, '-_', '+/')) ?: '';
    }
}

