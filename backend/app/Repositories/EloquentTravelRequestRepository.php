<?php

namespace App\Repositories;

use App\Models\TravelRequest;
use Illuminate\Support\Collection;

class EloquentTravelRequestRepository implements TravelRequestRepositoryInterface
{
    public function search(\App\Models\User $user, array $filters = []): Collection
    {
        $query = TravelRequest::query();
        if ($user->role != 'admin') {
            $query->where('requester_id', $user->id);
        }

        if (! empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (! empty($filters['destination'])) {
            $query->where('destination', 'like', '%' . $filters['destination'] . '%');
        }

        if (! empty($filters['from_date'])) {
            $query->whereDate('departure_date', '>=', $filters['from_date']);
        }

        if (! empty($filters['to_date'])) {
            $query->whereDate('return_date', '<=', $filters['to_date']);
        }

        return $query->orderByDesc('created_at')->get();
    }

    public function findOrFail(int $id): TravelRequest
    {
        return TravelRequest::findOrFail($id);
    }

    public function createForUser(int $userId, string $userName, array $data): TravelRequest
    {
        return TravelRequest::create([
            'requester_id' => $userId,
            'requester_name' => $userName,
            'destination' => $data['destination'],
            'departure_date' => $data['departure_date'],
            'return_date' => $data['return_date'],
            'status' => TravelRequest::STATUS_REQUESTED,
        ]);
    }

    public function updateStatus(TravelRequest $travelRequest, string $status): TravelRequest
    {
        $travelRequest->status = $status;
        $travelRequest->save();

        return $travelRequest->refresh();
    }
}

