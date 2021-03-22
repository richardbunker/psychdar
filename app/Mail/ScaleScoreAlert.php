<?php

namespace App\Mail;

use App\Models\Client;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ScaleScoreAlert extends Mailable
{
    use Queueable, SerializesModels;


    public $client;
    public $alertInfo;
    public $userName;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Client $client, $alertInfo, $userName)
    {
        $this->client = $client;
        $this->alertInfo = $alertInfo;
        $this->userName = $userName;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('noreply@psychdar.com', 'Psychdar Bot')
                    ->subject("🚨 Alert: ".$this->alertInfo["measure"]." 🚨")
                    ->view('emails.alert');
    }
}
