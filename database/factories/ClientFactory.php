<?php

namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClientFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Client::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [            
            'identifier' => ($this->faker->lastName.", ".$this->faker->firstName),
            'is_active' => true,
            'preferences' => json_encode([
                'create_own_resources' => true,
                'include_in_analyses' => true,
                'outcome_measure' => '',
            ]),
        ];
    }
}
