<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RestrictAdminAccess
{
    public function handle(Request $request, Closure $next): mixed
    {
        if (Auth::check() && Auth::user()->isAdmin()) {
            return redirect(RouteServiceProvider::ADMIN_HOME)->with('error', 'Not allowed for admin.');
        }

        return $next($request);
    }
}
