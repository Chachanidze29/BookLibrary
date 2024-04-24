<?php

namespace App\Http\Middleware;

use App\Enums\RolesEnum;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        if ($request->user()) {
            return [
                ...parent::share($request),
                'auth' => [
                    'user' => [
                        ...$request->user()->toArray(),
                        'is_admin' => $request->user()->isAdmin(),
                    ],
                ],
                'flash' => function () use ($request) {
                    return [
                        'error' => $request->session()->get('error'),
                        'success' => $request->session()->get('success'),
                    ];
                },
            ];
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => null,
            ],
        ];
    }
}
