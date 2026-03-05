<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\TravelRequestRepositoryInterface;
use Illuminate\Support\Collection;

class ListTravelRequestsService
{
    public function __construct(
        private readonly TravelRequestRepositoryInterface $repository
    ) {
    }

    public function execute(User $user, array $filters = []): Collection
    {
        return $this->repository->search($user, $filters);
    }
}
