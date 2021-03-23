<?php

namespace App\Jobs;

use App\Mail\ScaleScoreAlert;
use App\Models\Client;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldBeUnique;

class SendEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $client;
    protected $user;
    protected $alertInfo;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Client $client, User $user, $alertInfo)
    {
        $this->client = $client;
        $this->user = $user;
        $this->alertInfo = $alertInfo;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $email = new ScaleScoreAlert($this->client, $this->user->name, $this->alertInfo);
        Mail::to($this->user->email)->send($email);
    }
}
