<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/test', function () {
    return Inertia::render('Test');
})->name('test');

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
            'title' => 'Breakout',
            'description' => 'Classic block breaker. Move the paddle with mouse or arrow keys, press Space to launch. Break all bricks to win.',
            'demoComponent' => 'breakout',
        ],
        6 => [
            'id' => 6,
            'title' => 'Project Six',
            'description' => 'Another project demo. Replace with your own description and demo component.',
            'demoComponent' => 'simple-demo',
        ],
    ];

    $project = $projects[$id] ?? abort(404);

    return Inertia::render('project-demo', [
        'project' => $project,
    ]);
})->name('project.demo');
