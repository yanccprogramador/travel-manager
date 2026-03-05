<?php

namespace App\Services;

use App\Models\TravelRequest;
use App\Repositories\TravelRequestRepositoryInterface;

class GetTravelRequestService
{
    public function __construct(
        private readonly TravelRequestRepositoryInterface $repository
    ) {
    }

    public function execute(int $id): TravelRequest
    {
        return $this->repository->findOrFail($id);
    }
}
