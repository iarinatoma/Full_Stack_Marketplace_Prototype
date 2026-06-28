<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AngebotEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public string $message;
    public int $artikelId;

    public function __construct(string $artikelName, int $artikelId)
    {
        $this->message = "Der Artikel {$artikelName} wird nun günstiger angeboten! Greifen Sie schnell zu.";
        $this->artikelId = $artikelId;
    }

    public function broadcastOn(): Channel
    {
        return new Channel('angebot-channel');
    }

    public function broadcastAs(): string
    {
        return 'angebot-event';
    }
}


