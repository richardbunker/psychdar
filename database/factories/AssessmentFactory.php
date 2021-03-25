<?php

namespace Database\Factories;

use App\Models\Assessment;
use Illuminate\Database\Eloquent\Factories\Factory;

class AssessmentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Assessment::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return
        [
            'responses' => json_encode([
                'item_0' => rand(0, 4),
                'item_1' => rand(0, 4),
                'item_2' => rand(0, 4),
                'item_3' => rand(0, 4),
                'item_4' => rand(0, 4),
                'item_5' => rand(0, 4),
                'item_6' => rand(0, 4),
                'item_7' => rand(0, 4),
                'item_8' => rand(0, 4),
                'item_9' => rand(0, 4),
            ]),
        ];
    }
}
