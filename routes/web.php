<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/projects/{id}', function (int $id) {
    $projects = [
        1 => [
            'id' => 1,
            'title' => 'Wordle',
            'description' => 'A word guessing game built with React. Guess the word in 6 tries!',
            'demoComponent' => 'simple-demo', // Component name in components/demos/
        ],
        2 => [
            'id' => 2,
            'title' => 'Racing Game',
            'description' => 'An interactive 3D racing game built with Three.js and React Three Fiber. Click and drag to rotate, scroll to zoom.',
            'demoComponent' => 'threejs-game', // Component name in components/demos/
        ],
        3 => [
            'id' => 3,
            'title' => 'Memory Game',
            'description' => 'A card matching memory game. Test your memory by finding matching pairs!',
            'demoComponent' => 'simple-demo', // Component name in components/demos/
        ],
    ];

    $project = $projects[$id] ?? abort(404);

    return Inertia::render('project-demo', [
        'project' => $project,
    ]);
})->name('project.demo');
