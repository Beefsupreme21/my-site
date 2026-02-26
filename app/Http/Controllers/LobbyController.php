<?php

namespace App\Http\Controllers;

use App\Events\LobbyUpdated;
use App\Models\Lobby;
use App\Models\LobbyPlayer;
use Illuminate\Broadcasting\BroadcastException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class LobbyController extends Controller
{
    public function index(Request $request): Response
    {
        $currentLobbyId = $request->session()->get('current_lobby_id');

        $lobbies = Lobby::with('players')
            ->whereIn('status', ['open', 'full'])
            ->latest()
            ->get()
            ->map(fn (Lobby $l) => [
                'id' => $l->id,
                'code' => $l->code,
                'max_players' => $l->max_players,
                'status' => $l->status,
                'players' => $l->players->map(fn (LobbyPlayer $p) => ['id' => $p->id, 'name' => $p->name]),
                'player_count' => $l->players->count(),
            ]);

        return Inertia::render('multiplayer-demo', [
            'lobbies' => $lobbies,
            'current_lobby_id' => $currentLobbyId,
            'flash' => [
                'created_code' => $request->session()->get('created_code'),
                'joined' => $request->session()->get('joined'),
                'error' => $request->session()->get('error'),
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:64'],
        ]);

        $code = strtoupper(Str::random(6));
        $lobby = Lobby::create([
            'code' => $code,
            'max_players' => 2,
            'status' => 'open',
        ]);

        $player = $lobby->players()->create(['name' => $validated['name']]);

        $request->session()->put('current_lobby_id', $lobby->id);
        $request->session()->put('current_lobby_player_id', $player->id);

        try {
            broadcast(new LobbyUpdated($lobby->fresh()));
        } catch (BroadcastException $e) {
            report($e);
        }

        return redirect()->route('lobbies.show', $lobby)->with('created_code', $code);
    }

    public function join(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'code' => ['required', 'string', 'max:16'],
            'name' => ['required', 'string', 'max:64'],
        ]);

        $lobby = Lobby::where('code', strtoupper($validated['code']))->firstOrFail();

        if ((int) $request->session()->get('current_lobby_id') === $lobby->id) {
            return redirect()->route('lobbies.show', $lobby);
        }

        if ($lobby->status !== 'open') {
            return redirect()->route('multiplayer.index')->with('error', 'Lobby is full or closed.');
        }

        if ($lobby->players()->count() >= $lobby->max_players) {
            $lobby->update(['status' => 'full']);

            return redirect()->route('multiplayer.index')->with('error', 'Lobby is full.');
        }

        $player = $lobby->players()->firstOrCreate(
            ['lobby_id' => $lobby->id, 'name' => $validated['name']]
        );

        if ($lobby->players()->count() >= $lobby->max_players) {
            $lobby->update(['status' => 'full']);
        }

        $request->session()->put('current_lobby_id', $lobby->id);
        $request->session()->put('current_lobby_player_id', $player->id);

        try {
            broadcast(new LobbyUpdated($lobby->fresh()));
        } catch (BroadcastException $e) {
            report($e);
        }

        return redirect()->route('lobbies.show', $lobby)->with('joined', $lobby->code);
    }

    public function show(Request $request, Lobby $lobby): Response|RedirectResponse
    {
        if ((int) $request->session()->get('current_lobby_id') !== $lobby->id) {
            return redirect()->route('multiplayer.index');
        }

        $lobby->load('players');

        return Inertia::render('lobby-show', [
            'lobby' => [
                'id' => $lobby->id,
                'code' => $lobby->code,
                'max_players' => $lobby->max_players,
                'status' => $lobby->status,
                'player_count' => $lobby->players->count(),
                'players' => $lobby->players->map(fn (LobbyPlayer $p) => ['id' => $p->id, 'name' => $p->name]),
            ],
        ]);
    }
}
