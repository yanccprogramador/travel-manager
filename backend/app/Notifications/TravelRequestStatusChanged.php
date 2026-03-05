<?php

namespace App\Notifications;

use App\Models\TravelRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TravelRequestStatusChanged extends Notification
{

    public function __construct(
        protected TravelRequest $travelRequest
    ) {
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function viaConnection(): string
    {
        return 'sqlite';
    }


    public function toArray(object $notifiable): array
    {
        return [
            'travel_request_id' => $this->travelRequest->id,
            'destination' => $this->travelRequest->destination,
            'status' => $this->travelRequest->status,
            'message' => 'O status do seu pedido de viagem para ' . $this->travelRequest->destination . ' foi atualizado para: ' . $this->travelRequest->status . '.'
        ];
    }
}

