<?php

namespace App\Repositories;

use App\Models\TravelRequest;
use Illuminate\Support\Collection;

interface TravelRequestRepositoryInterface
{
    public function search(\App\Models\User $user, array $filters = []): Collection;

    public function findOrFail(int $id): TravelRequest;

    public function createForUser(int $userId, string $userName, array $data): TravelRequest;

    public function updateStatus(TravelRequest $travelRequest, string $status): TravelRequest;
}

