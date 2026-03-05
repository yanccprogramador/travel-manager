<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TravelRequestController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth.jwt')->group(function () {
    Route::get('/travel-requests', [TravelRequestController::class, 'index']);
    Route::post('/travel-requests', [TravelRequestController::class, 'store']);
    Route::get('/travel-requests/{id}', [TravelRequestController::class, 'show']);
    Route::patch('/travel-requests/{id}/status', [TravelRequestController::class, 'updateStatus']);

    Route::get('/notifications', [\App\Http\Controllers\NotificationController::class, 'index']);
    Route::patch('/notifications/{id}/read', [\App\Http\Controllers\NotificationController::class, 'markAsRead']);
});

