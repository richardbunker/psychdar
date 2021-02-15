<?php

namespace App\Http\Controllers;

use App\Models\Clinician;
use Illuminate\Http\Request;

class ClinicianController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:clinician');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return "clinician dashboard view";
        // return view('dashboard.clinician');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Clinician  $clinician
     * @return \Illuminate\Http\Response
     */
    public function show(Clinician $clinician)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Clinician  $clinician
     * @return \Illuminate\Http\Response
     */
    public function edit(Clinician $clinician)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Clinician  $clinician
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Clinician $clinician)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Clinician  $clinician
     * @return \Illuminate\Http\Response
     */
    public function destroy(Clinician $clinician)
    {
        //
    }
}
