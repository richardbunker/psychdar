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
    public $userName;
    public $alertInfo;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Client $client, $userName, $alertInfo)
    {
        $this->client = $client;
        $this->userName = $userName;
        $this->alertInfo = $alertInfo;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('noreply@psychdar.com', 'Psychdar Bot')
                    ->subject($this->alertInfo["label"]." - ".$this->alertInfo["measure"])
                    ->view('emails.alert');
    }
}
