<?php

namespace App\Http\Controllers;

use App\Services\CreateTravelRequestService;
use App\Services\GetTravelRequestService;
use App\Services\ListTravelRequestsService;
use App\Services\UpdateTravelRequestStatusService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TravelRequestController extends Controller
{
    public function index(Request $request, ListTravelRequestsService $listService)
    {
        $filters = $request->only(['status', 'destination', 'from_date', 'to_date']);
        $user = Auth::user();

        return $listService->execute($user, $filters);
    }

    public function store(Request $request, CreateTravelRequestService $createService)
    {
        $user = Auth::user();

        $data = $request->validate([
            'destination' => ['required', 'string', 'max:255'],
            'departure_date' => ['required', 'date', 'after_or_equal:today'],
            'return_date' => ['required', 'date', 'after_or_equal:departure_date'],
        ]);

        $travelRequest = $createService->execute($user, $data);

        return response()->json($travelRequest, 201);
    }

    public function show(int $id, GetTravelRequestService $getService)
    {
        return $getService->execute($id);
    }

    public function updateStatus(Request $request, int $id, UpdateTravelRequestStatusService $updateStatusService)
    {
        $data = $request->validate([
            'status' => ['required', 'string'],
        ]);

        $user = Auth::user();

        try {
            $updated = $updateStatusService->execute($user, $id, $data['status']);
        } catch (\DomainException $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
            ], 422);
        }

        return $updated;
    }
}

