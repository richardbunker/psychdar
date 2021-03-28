<?php

use App\Services\EffectSizeService;
use Carbon\Carbon;
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

Route::get('/for-testing', function () {
    $clients = \App\Models\Client::byUser(Auth::user()->id)
        ->with(['treatments.assessments' => function ($query) {
            $query->where('measure_id', 1);
        }])->get();
    $prePost = new \App\Services\EffectSizeService;
    return $prePost->prepareArray($clients);
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


// USER ROUTES
Route::group(['middleware' => ['auth:web']], function () {

    //Dashboard
    Route::get('/dashboard', [App\Http\Controllers\UserDashboardController::class, 'index'])->name('userDashboard');
    Route::post('/user-data', [App\Http\Controllers\UserDataController::class, 'store']);


    // Clients
    Route::get('/clients', [App\Http\Controllers\UserClientsController::class, 'index'])->name('showClients');
    Route::post('/clients', [App\Http\Controllers\UserClientsController::class, 'store']);
    Route::get('/client/{hashed_client_id}', [App\Http\Controllers\UserClientsController::class, 'show'])->name('showClient');
    Route::get('/api/organisation/{hashed_organisation_id}/clients', [App\Http\Controllers\OrganisationClientsController::class, 'index']);
    Route::post('/client-settings', [App\Http\Controllers\UserClientsController::class, 'updateSettings']);

    // ClientMeasure
    Route::post('/client-measure', [App\Http\Controllers\ClientMeasureController::class, 'store']);

    // Measures
    Route::get('/measures', [App\Http\Controllers\UserMeasuresController::class, 'index'])->name('indexMeasures');
    Route::post('/measures', [App\Http\Controllers\UserMeasuresController::class, 'store']);
    Route::get('/measure/create', [App\Http\Controllers\UserMeasuresController::class, 'create']);
    Route::get('/measure/{hashed_measure_id}', [App\Http\Controllers\UserMeasuresController::class, 'show'])->name('showMeasure');
    Route::get('/measure-json/{hashed_measure_id}', [App\Http\Controllers\UserMeasuresController::class, 'showJSON']);
    Route::get('/preview-measure/{hashed_measure_id}', [App\Http\Controllers\UserMeasuresController::class, 'preview']);
    Route::get('/measure/{hashed_measure_id}/edit', [App\Http\Controllers\UserMeasuresController::class, 'edit'])->name('editMeasure');
    Route::post('/measure/edit', [App\Http\Controllers\UserMeasuresController::class, 'update'])->name('updateMeasure');
    Route::post('/measure/details', [App\Http\Controllers\UserMeasuresController::class, 'updateDetails']);
    Route::post('/measure/scales', [App\Http\Controllers\UserMeasuresController::class, 'updateScales']);
    Route::post('/measure/publish', [App\Http\Controllers\UserMeasuresController::class, 'publishMeasure']);
    Route::get('/public-measures', [App\Http\Controllers\UserMeasuresController::class, 'indexPublic']);
    Route::post('/add-measure', [App\Http\Controllers\UserMeasuresController::class, 'addMeasure']);


    // Treatments
    Route::post('/end-treatment', [App\Http\Controllers\ClientTreatmentController::class, 'end']);
    Route::post('/update-ended-treatment', [App\Http\Controllers\ClientTreatmentController::class, 'update']);
    Route::post('/activate-ended-treatment', [App\Http\Controllers\ClientTreatmentController::class, 'reactivate']);


    // AnchorsGroups
    Route::get('/api/anchor-groups/{type}', [App\Http\Controllers\AnchorGroupController::class, 'index']);
    Route::post('/api/anchor-group/create', [App\Http\Controllers\AnchorGroupController::class, 'store']);

    // Assessments
    Route::get('/treatment-assessments/{hashed_treatment_id}', [App\Http\Controllers\TreatmentAssessmentsController::class, 'index']);


    // Effect Sizes
    Route::get('/effect-size-calculation/{hashed_measure_id}/{dateRange}', [App\Http\Controllers\UserEffectSizeController::class, 'index']);
});


// Client Assessments
Route::get('/a/{hashed_client_id}/{hashed_measure_id}', [App\Http\Controllers\ClientAssessmentController::class, 'show']);
Route::post('/a/client', [App\Http\Controllers\ClientAssessmentController::class, 'store'])->name('saveClientAssessment');
Route::get('/thankyou', [App\Http\Controllers\ClientAssessmentController::class, 'thankyou'])->name('thankyou');
