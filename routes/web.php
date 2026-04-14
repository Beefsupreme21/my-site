<?php

use App\Events\TestBroadcast;
use App\Http\Controllers\LobbyController;
use App\Http\Controllers\Projects\Cube2\GameController as Cube2GameController;
use Illuminate\Broadcasting\BroadcastException;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/test', function () {
    return Inertia::render('Test');
})->name('test');

Route::get('/test-broadcast', function () {
    return Inertia::render('test-broadcast');
})->name('test.broadcast');
Route::get('/test-broadcast/send', function () {
    $sent = false;
    try {
        broadcast(new TestBroadcast);
        Log::info('TestBroadcast sent to Reverb');
        $sent = true;
    } catch (BroadcastException $e) {
        Log::warning('TestBroadcast failed (is Reverb running?)', ['error' => $e->getMessage()]);
    }

    if (request()->wantsJson() || request()->header('X-Requested-With') === 'XMLHttpRequest') {
        return response()->json(['sent' => $sent]);
    }

    return redirect()->route('test.broadcast');
})->name('test.broadcast.send');

Route::get('/multiplayer', [LobbyController::class, 'index'])->name('multiplayer.index');
Route::get('/lobbies/{lobby}', [LobbyController::class, 'show'])->name('lobbies.show');
Route::post('/lobbies', [LobbyController::class, 'store'])->name('lobbies.store');
Route::post('/lobbies/join', [LobbyController::class, 'join'])->name('lobbies.join');

Route::prefix('/projects/cube2')->name('projects.cube2.')->group(function () {
    Route::get('/', [Cube2GameController::class, 'show'])->name('game.show');
    Route::get('/lobby', fn () => view('projects.cube2.lobby'))->name('lobby');
    Route::post('/game/join', [Cube2GameController::class, 'join'])->name('game.join');
    Route::post('/game/move', [Cube2GameController::class, 'move'])->name('game.move');
    Route::post('/game/leave', [Cube2GameController::class, 'leave'])->name('game.leave');
});

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
            'title' => 'Cube2',
            'description' => 'Wave tile game with multiplayer movement. Step on the right color before time runs out.',
            'link' => '/projects/cube2/lobby',
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
        return redirect()->route('projects.cube2.lobby');
    }

    return Inertia::render('project-demo', [
        'project' => $project,
    ]);
})->name('project.demo');
