<?php

namespace App\Providers;

use App\Repositories\EloquentTravelRequestRepository;
use App\Repositories\TravelRequestRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            TravelRequestRepositoryInterface::class,
            EloquentTravelRequestRepository::class,
        );
        $this->app->bind(
            \App\Repositories\UserRepositoryInterface::class,
            \App\Repositories\EloquentUserRepository::class,
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
