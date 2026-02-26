<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LobbyPlayer extends Model
{
    protected $fillable = [
        'lobby_id',
        'name',
    ];

    /**
     * @return BelongsTo<Lobby, LobbyPlayer>
     */
    public function lobby(): BelongsTo
    {
        return $this->belongsTo(Lobby::class);
    }
}
