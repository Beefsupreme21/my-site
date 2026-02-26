<?php

use App\Http\Controllers\LobbyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/test', function () {
    return Inertia::render('Test');
})->name('test');

Route::get('/multiplayer', [LobbyController::class, 'index'])->name('multiplayer.index');
Route::get('/lobbies/{lobby}', [LobbyController::class, 'show'])->name('lobbies.show');
Route::post('/lobbies', [LobbyController::class, 'store'])->name('lobbies.store');
Route::post('/lobbies/join', [LobbyController::class, 'join'])->name('lobbies.join');

Route::get('/projects/{id}', function (int $id) {
    $projects = [
        1 => [
            'id' => 1,
            'title' => 'Kanban',
            'description' => 'A simple Kanban board. Add tasks and drag them between columns. No persistence.',
            'demoComponent' => 'kanban',
        ],
        2 => [
            'id' => 2,
            'title' => 'Racing Game',
            'description' => 'An interactive 3D racing game built with Three.js and React Three Fiber. Click and drag to rotate, scroll to zoom.',
            'demoComponent' => 'threejs-game', // Component name in components/demos/
        ],
        3 => [
            'id' => 3,
            'title' => 'Wordle',
            'description' => 'Guess the 5-letter word in 6 tries. Green = right spot, yellow = wrong spot.',
            'demoComponent' => 'wordle',
        ],
        4 => [
            'id' => 4,
            'title' => 'Snake',
            'description' => 'Classic Snake. Use arrow keys to move, eat the yellow dots to grow. Don\'t hit the walls or yourself.',
            'demoComponent' => 'snake',
        ],
        5 => [
            'id' => 5,
            'title' => 'Multiplayer Lobby',
            'description' => 'Simple 2-player lobbies. Start a lobby, share the code, join from another browser.',
        ],
        6 => [
            'id' => 6,
            'title' => 'BlackJack',
            'description' => 'Classic Blackjack. Get as close to 21 as you can without going over. Beat the dealer.',
            'demoComponent' => 'blackjack',
        ],
    ];

    $project = $projects[$id] ?? abort(404);

    if ($id === 5) {
        return app(LobbyController::class)->index(request());
    }

    return Inertia::render('project-demo', [
        'project' => $project,
    ]);
})->name('project.demo');
