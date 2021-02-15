<?php

namespace App\Http\Controllers;

use App\Helpers\CheckRole;

class RoleCheckController extends Controller
{
    public function index()
    {
        return CheckRole::getRole();
    }
}
