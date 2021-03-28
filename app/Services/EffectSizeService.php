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
                $hasMultiple = $treatment->assessments->count() > 1;
                $canBeInStats = $treatment->included_in_stats;
                $hasBeenCompleted = !is_null($treatment->ended_at);
                if ($hasMultiple && $canBeInStats && $hasBeenCompleted){                        
                    $pre->push(collect($treatment->assessments->first()->responses));
                    $post->push(collect($treatment->assessments->last()->responses));
                }
            });
        });        
    
        return ['pre' => $pre, 'post' => $post];
    }
}