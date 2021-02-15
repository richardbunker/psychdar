<?php

namespace App\Http\Controllers;

use App\Models\Organisation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrganisationController extends Controller
{
    public function indexAPI()
    {
        return Auth::user()->organisations;
    }
}
