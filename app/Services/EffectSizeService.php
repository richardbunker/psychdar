<?php

namespace App\Services;

class EffectSizeService
{
    public function prepareArray($clinician, $questionnaire_name)
    {
        $pre = collect();
        $post = collect();

        $clinician->clients->each(function ($client) use ($questionnaire_name, $pre, $post){
            $client->treatments->each(function ($treatment) use ($questionnaire_name, $pre, $post) {
                if ($treatment->assessments->count() > 1) {                        
                    $pre->push(collect($treatment->assessments->first()->data->responses)->values()->sum());
                    $post->push(collect($treatment->assessments->last()->data->responses)->values()->sum());
                }
            });
        });        
    
        return ['pre' => $pre, 'post' => $post];
    }
}