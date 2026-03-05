<?php

namespace App\Services;

use App\Models\TravelRequest;
use App\Models\User;
use App\Repositories\TravelRequestRepositoryInterface;

class CreateTravelRequestService
{
    public function __construct(
        private readonly TravelRequestRepositoryInterface $repository
    ) {
    }

    public function execute(User $requester, array $data): TravelRequest
    {
        return $this->repository->createForUser($requester->id, $requester->name, $data);
    }
}
