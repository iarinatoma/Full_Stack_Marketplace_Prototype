<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class VerkaufsEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public string $message;

    public function __construct(string $artikelName)
    {
        $this->message = "Großartig! Ihr Artikel {$artikelName} wurde erfolgreich verkauft!";
    }

    public function broadcastOn(): Channel
    {
        return new Channel('verkauf-channel');
    }

    public function broadcastAs(): string
    {
        return 'verkauf-event';
    }
}
