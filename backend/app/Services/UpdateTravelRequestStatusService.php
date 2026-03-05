<?php

namespace App\Services;

use App\Models\TravelRequest;
use App\Models\User;
use App\Notifications\TravelRequestStatusChanged;
use App\Repositories\TravelRequestRepositoryInterface;

class UpdateTravelRequestStatusService
{
    public function __construct(
        private readonly TravelRequestRepositoryInterface $repository
    ) {
    }

    public function execute(User $actor, int $id, string $status): TravelRequest
    {
        if ($actor->role !== 'admin') {
            throw new \DomainException('Apenas administradores podem alterar o status de pedidos.');
        }

        $travelRequest = $this->repository->findOrFail($id);

        if (
            $status === TravelRequest::STATUS_CANCELED
            && $travelRequest->status === TravelRequest::STATUS_APPROVED
        ) {
            throw new \DomainException('Não é possível cancelar um pedido já aprovado.');
        }

        $updated = $this->repository->updateStatus($travelRequest, $status);
        $requester = $updated->requester;

        if ($requester) {
            $requester->notify(new TravelRequestStatusChanged($updated));
        }

        return $updated;
    }
}
