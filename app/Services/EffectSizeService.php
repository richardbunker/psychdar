<?php

namespace App\Services;

class EffectSizeService
{
    public function prepareArray($clients)
    {
        $pre = collect();
        $post = collect();

        $clients->each(function ($client) use ($pre, $post){
            $client->treatments->each(function ($treatment) use ($pre, $post) {
                if ($treatment->assessments->count() > 1) {                        
                    $pre->push(collect($treatment->assessments->first()->responses));
                    $post->push(collect($treatment->assessments->last()->responses));
                }
            });
        });        
    
        return ['pre' => $pre, 'post' => $post];
    }
}