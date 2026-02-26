<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lobby extends Model
{
    protected $fillable = [
        'code',
        'max_players',
        'status',
    ];

    /**
     * @return HasMany<LobbyPlayer>
     */
    public function players(): HasMany
    {
        return $this->hasMany(LobbyPlayer::class);
    }
}
