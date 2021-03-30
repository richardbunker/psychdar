<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/User', [
            'user' => User::where('id', Auth::user()->id)
                ->with('clients.treatments.assessments')
                ->with('data')
                ->with('snapshots')
                ->with('measures')
                ->first()
        ]);
    }
}
