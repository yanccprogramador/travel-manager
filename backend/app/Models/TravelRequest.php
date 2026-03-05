<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TravelRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'requester_id',
        'requester_name',
        'destination',
        'departure_date',
        'return_date',
        'status',
    ];

    protected $casts = [
        'departure_date' => 'date',
        'return_date' => 'date',
    ];

    public const STATUS_REQUESTED = 'solicitado';
    public const STATUS_APPROVED = 'aprovado';
    public const STATUS_CANCELED = 'cancelado';

    public function requester()
    {
        return $this->belongsTo(User::class, 'requester_id');
    }
}

