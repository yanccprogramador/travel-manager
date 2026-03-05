<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;

class NotificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_fetch_notifications_successfully()
    {
        Artisan::call('migrate');
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'api')->getJson('/api/notifications');

        $response->assertStatus(200);
    }
}
