<?php

namespace Tests\Feature;

use App\Models\TravelRequest;
use App\Models\User;
use App\Services\JwtService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TravelRequestTest extends TestCase
{
    use RefreshDatabase;

    private function generateAuthToken(User $user)
    {
        $now = time();
        $payload = [
            'iss' => config('app.url'),
            'sub' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'iat' => $now,
            'exp' => $now + (60 * 60 * 2),
        ];

        return trim(JwtService::encode($payload));
    }

    public function test_authenticated_user_can_only_list_their_own_travel_requests()
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $token = $this->generateAuthToken($user);

        TravelRequest::create([
            'requester_id' => $user->id,
            'requester_name' => $user->name,
            'destination' => 'Test Destination',
            'departure_date' => now()->addDays(2),
            'return_date' => now()->addDays(5),
            'status' => TravelRequest::STATUS_REQUESTED,
        ]);

        TravelRequest::create([
            'requester_id' => $otherUser->id,
            'requester_name' => $otherUser->name,
            'destination' => 'Other Destination',
            'departure_date' => now()->addDays(2),
            'return_date' => now()->addDays(5),
            'status' => TravelRequest::STATUS_REQUESTED,
        ]);

        $response = $this->getJson('/api/travel-requests', [
            'Authorization' => "Bearer $token",
        ]);

        $response->assertStatus(200);
        $response->assertJsonCount(1);
        $this->assertEquals('Test Destination', $response->json('0.destination'));
    }

    public function test_admin_can_list_all_travel_requests()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $otherUser = User::factory()->create();
        $token = $this->generateAuthToken($admin);

        TravelRequest::create([
            'requester_id' => $otherUser->id,
            'requester_name' => $otherUser->name,
            'destination' => 'Test Destination',
            'departure_date' => now()->addDays(2),
            'return_date' => now()->addDays(5),
            'status' => TravelRequest::STATUS_REQUESTED,
        ]);

        $response = $this->getJson('/api/travel-requests', [
            'Authorization' => "Bearer $token",
        ]);

        $response->assertStatus(200);
        $response->assertJsonCount(1);
    }

    public function test_authenticated_user_can_create_travel_request()
    {
        $user = User::factory()->create();
        $token = $this->generateAuthToken($user);

        $payload = [
            'destination' => 'Paris',
            'departure_date' => now()->addDays(10)->format('Y-m-d'),
            'return_date' => now()->addDays(15)->format('Y-m-d'),
        ];

        $response = $this->postJson('/api/travel-requests', $payload, [
            'Authorization' => "Bearer $token",
        ]);

        $response->assertStatus(201);
        $response->assertJsonFragment([
            'destination' => 'Paris',
            'status' => TravelRequest::STATUS_REQUESTED,
        ]);
        
        $this->assertDatabaseHas('travel_requests', [
            'destination' => 'Paris',
            'requester_id' => $user->id,
        ]);
    }

    public function test_admin_can_update_travel_request_status()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $token = $this->generateAuthToken($admin);

        $travelRequest = TravelRequest::create([
            'requester_id' => $admin->id,
            'requester_name' => $admin->name,
            'destination' => 'London',
            'departure_date' => now()->addDays(2),
            'return_date' => now()->addDays(5),
            'status' => TravelRequest::STATUS_REQUESTED,
        ]);

        $response = $this->patchJson("/api/travel-requests/{$travelRequest->id}/status", [
            'status' => TravelRequest::STATUS_APPROVED,
        ], [
            'Authorization' => "Bearer $token",
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('travel_requests', [
            'id' => $travelRequest->id,
            'status' => TravelRequest::STATUS_APPROVED,
        ]);
    }

    public function test_regular_user_cannot_update_travel_request_status()
    {
        $user = User::factory()->create(['role' => 'user']);
        $token = $this->generateAuthToken($user);

        $travelRequest = TravelRequest::create([
            'requester_id' => $user->id,
            'requester_name' => $user->name,
            'destination' => 'London',
            'departure_date' => now()->addDays(2),
            'return_date' => now()->addDays(5),
            'status' => TravelRequest::STATUS_REQUESTED,
        ]);

        $response = $this->patchJson("/api/travel-requests/{$travelRequest->id}/status", [
            'status' => TravelRequest::STATUS_APPROVED,
        ], [
            'Authorization' => "Bearer $token",
        ]);

        $response->assertStatus(422); // Based on the DomainException caught in the controller
        $response->assertJson([
            'message' => 'Apenas administradores podem alterar o status de pedidos.',
        ]);
    }

    public function test_user_receives_notification_when_request_status_changes()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $user = User::factory()->create(['role' => 'user']);
        $token = $this->generateAuthToken($admin);

        $travelRequest = TravelRequest::create([
            'requester_id' => $user->id,
            'requester_name' => $user->name,
            'destination' => 'Tokyo',
            'departure_date' => now()->addDays(2),
            'return_date' => now()->addDays(5),
            'status' => TravelRequest::STATUS_REQUESTED,
        ]);

        $this->patchJson("/api/travel-requests/{$travelRequest->id}/status", [
            'status' => TravelRequest::STATUS_APPROVED,
        ], [
            'Authorization' => "Bearer $token",
        ]);

        $this->assertDatabaseHas('notifications', [
            'notifiable_id' => $user->id,
            'notifiable_type' => User::class,
        ]);
        
        $notification = $user->notifications()->first();
        $this->assertNotNull($notification);
        $this->assertEquals(TravelRequest::STATUS_APPROVED, $notification->data['status']);
    }
}
