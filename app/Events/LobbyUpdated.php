<?php

namespace App\Events;

use App\Models\Lobby;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class LobbyUpdated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public Lobby $lobby
    ) {}

    /**
     * @return array<int, Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('lobby.'.$this->lobby->id),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function broadcastWith(): array
    {
        $this->lobby->load('players');

        return [
            'lobby' => [
                'id' => $this->lobby->id,
                'code' => $this->lobby->code,
                'max_players' => $this->lobby->max_players,
                'status' => $this->lobby->status,
                'player_count' => $this->lobby->players->count(),
                'players' => $this->lobby->players->map(fn ($p) => ['id' => $p->id, 'name' => $p->name])->values()->all(),
            ],
        ];
    }
}
