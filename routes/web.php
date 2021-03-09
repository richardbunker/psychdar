<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redirect;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Route::get('/query', function () {
//     return \App\Models\Clinician::where('clinic_id', 1)
//         ->with('clients.treatments.consultations')
//         ->get();
// });

Route::get('/for-testing', function ()
{
    return Redirect::route('showMeasure', '45b1gLPMaD');  
});

Route::get('/query', function () {
    return $lags = \App\Models\AnchorGroup::orderBy('name')->get();
    // $collect = collect($lags);
    // return $collect->map(function($item) {
    //     return $item->structure->anchors;
    // });
});
// Route::get('/query', function () {
//     return \App\Models\Organisation::where('id', 3)
//         ->with('clinics.clinicians.clients.treatments.consultations')
//         ->get();
// });

Route::get('/query/client', function () {
    return \App\Models\Client::where('id', 591)
        ->with('treatments.assessments')
        ->first();

    // return $client->treatments->first()->assessments->map(function ($consult) {
    //     return collect($consult->data->questionnaires->core10->response_data)->values()->sum();
    // });
});

Auth::routes();

Route::get('/logout', '\App\Http\Controllers\Auth\LoginController@logout');
Route::post('/c/login', [\App\Http\Controllers\Auth\LoginController::class, 'clinicianLogin'])->name('clinicianLogin');
Route::get('/c/login', [App\Http\Controllers\Auth\LoginController::class, 'showClinicianLoginForm'])->name('clinicianLogin');


// USER ROUTES
Route::group(['middleware' => ['auth:web']], function () {
    
    //Dashboard
    Route::get('/dashboard', [App\Http\Controllers\UserDashboardController::class, 'index'])->name('userDashboard');
    Route::get('/api/dashboard/organisation/{hashed_organisation_id}/clinics', [App\Http\Controllers\UserDashboardController::class, 'clinics']);
    Route::get('/api/dashboard/organisation/{hashed_organisation_id}/clinicians', [App\Http\Controllers\UserDashboardController::class, 'clinicians']);
    Route::get('/api/dashboard/organisation/{hashed_organisation_id}/clients', [App\Http\Controllers\UserDashboardController::class, 'clients']);
    Route::get('/api/dashboard/organisation/{hashed_organisation_id}/treatments', [App\Http\Controllers\UserDashboardController::class, 'treatments']);
    Route::get('/api/dashboard/organisation/{hashed_organisation_id}/consultations', [App\Http\Controllers\UserDashboardController::class, 'consultations']);
    Route::get('/api/dashboard/organisation/{hashed_organisation_id}/assessments', [App\Http\Controllers\UserDashboardController::class, 'assessments']);

    // Clinics
    Route::get('/clinics', [App\Http\Controllers\UserClinicsController::class, 'index']);
    Route::get('/api/organisation/{hashed_organisation_id}/clinics', [App\Http\Controllers\UserClinicsController::class, 'clinics']);
    Route::get('/clinic/{hashed_clinic_id}', [App\Http\Controllers\UserClinicsController::class, 'show']);
    
    
    // Clients
    Route::get('/clients', [App\Http\Controllers\UserClientsController::class, 'index']);
    Route::get('/client/{hashed_client_id}', [App\Http\Controllers\UserClientsController::class, 'show'])->name('showClient');
    Route::get('/api/organisation/{hashed_organisation_id}/clients', [App\Http\Controllers\OrganisationClientsController::class, 'index']);
    Route::post('/api/client-active-status/{hashed_client_id}', [App\Http\Controllers\UserClientsController::class, 'updateActiveStatus']);
    Route::post('/api/client-url-status/{hashed_client_id}', [App\Http\Controllers\UserClientsController::class, 'updateUrlStatus']);
    Route::post('/api/client-stats-status/{hashed_client_id}', [App\Http\Controllers\UserClientsController::class, 'updateStatsStatus']);

    // ClientMeasure
    Route::post('/client-measure', [App\Http\Controllers\ClientMeasureController::class, 'store']);

    // Measures
    Route::get('/measures', [App\Http\Controllers\UserMeasuresController::class, 'index']);
    Route::post('/measures', [App\Http\Controllers\UserMeasuresController::class, 'store']);
    Route::get('/measure/create', [App\Http\Controllers\UserMeasuresController::class, 'create']);
    Route::get('/measure/{hashed_measure_id}', [App\Http\Controllers\UserMeasuresController::class, 'show'])->name('showMeasure');
    Route::get('/measure/{hashed_measure_id}/edit', [App\Http\Controllers\UserMeasuresController::class, 'edit'])->name('editMeasure');
    Route::post('/measure/edit', [App\Http\Controllers\UserMeasuresController::class, 'update'])->name('updateMeasure');
    Route::post('/measures/details', [App\Http\Controllers\UserMeasuresController::class, 'updateDetails']);
    Route::post('/measure/publish', [App\Http\Controllers\UserMeasuresController::class, 'publishMeasure']);


    // AnchorsGroups
    Route::get('/api/anchor-groups/{type}', [App\Http\Controllers\AnchorGroupController::class, 'index']);
    Route::post('/api/anchor-group/create', [App\Http\Controllers\AnchorGroupController::class, 'store']);
});


// SHARED AUTH ROUTES
Route::group(['middleware' => ['auth:web,clinician']], function () {

    // Check User Type
    Route::get('/api/role', [App\Http\Controllers\RoleCheckController::class, 'index']);

    // Effect Sizes
    Route::get('/api/pre_post/{hashed_clinician_id}/{questionnaire_name}', [App\Http\Controllers\ClinicianEffectSizeController::class, 'show']);

});

// CLINICIAN ROUTES
Route::group(['middleware' => ['auth:clinician']], function () {

    // Dashboard
    Route::get('/c/dashboard', [\App\Http\Controllers\ClinicianDashboardController::class, 'index'])->name('clinicianDashboard');

    // Clients
    Route::get('/c/clients', [App\Http\Controllers\ClinicianClientsController::class, 'index']);
    Route::get('/c/client/{hashed_client_id}', [App\Http\Controllers\ClinicianClientsController::class, 'show']);
    Route::post('/api/c/client-active-status/{hashed_client_id}', [App\Http\Controllers\ClinicianClientsController::class, 'updateActiveStatusAPI']);
    Route::post('/api/c/client-url-status/{hashed_client_id}', [App\Http\Controllers\ClinicianClientsController::class, 'updateUrlStatusAPI']);
    Route::post('/api/c/client-stats-status/{hashed_client_id}', [App\Http\Controllers\ClinicianClientsController::class, 'updateStatsStatusAPI']);

});


