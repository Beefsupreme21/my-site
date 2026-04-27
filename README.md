# Personal site & portfolio

Full-stack Laravel application that serves as a portfolio home page and a playground for small interactive demos: React Three Fiber scenes, classic browser games, and a realtime multiplayer prototype backed by **Laravel Reverb**.

## Stack

| Layer | Technology |
|--------|-------------|
| Backend | [Laravel 12](https://laravel.com), PHP 8.2+ |
| Frontend | [Inertia.js](https://inertiajs.com) + [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) (Vite plugin) |
| Build | [Vite 7](https://vitejs.dev) |
| 3D | [Three.js](https://threejs.org), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei) |
| Realtime | [Laravel Reverb](https://reverb.laravel.com), Laravel Echo, Pusher protocol |
| Routing (TS) | [Laravel Wayfinder](https://github.com/laravel/wayfinder) |
| Tests | [Pest 4](https://pestphp.com) |

## Features

### Landing / welcome

<img src="./public/images/personalsite.png" alt="Personal site preview" width="640" />

The home page is a single Inertia route: hero, animated UI accents, **project cards** (same previews as below), skills / tools, optional timeline, and outbound links. Each card opens its demo or the multiplayer experience.

---

### Project demos

Each demo is registered in the Laravel app and rendered through a shared Inertia **project demo** shell. Thumbnails match the project grid on the welcome page.

#### Racing Game

<img src="./public/images/racing-game.png" alt="Racing Game preview" width="640" />

Interactive 3D scene built with **Three.js** and **React Three Fiber** (orbit-style camera: drag to rotate, scroll to zoom).

#### Kanban

<img src="./public/images/kanban.png" alt="Kanban preview" width="640" />

Simple board: add tasks and drag them between columns (in-memory only).

#### Multiplayer

<img src="./public/images/cube.png" alt="Multiplayer game preview" width="640" />

A small **3D wave-tile** playground where multiple people can inhabit the same scene. The browser runs **Laravel Echo** against **Reverb** (Pusher-compatible WebSockets). Each match subscribes to a public **`game.{code}`** channel.

When you move, the client sends **throttled HTTP POSTs** with position, yaw, and animation state. Laravel validates the payload, **writes the latest transform to the game’s player pivot**, then fires broadcast events (`PlayerJoined`, **`PlayerMoved`**, `PlayerLeft`) that implement `ShouldBroadcastNow` so updates hit the socket immediately instead of waiting on a queue worker.

Everyone else on that channel receives **`player-moved`** (and related) payloads; the Three.js side **spawns or updates remote player meshes** so you see other avatars slide and turn in sync. Broadcasts use **`toOthers()`** plus the client’s **socket id** header so your own machine does not apply redundant echoes of its own movement.

That stack—HTTP for authoritative-ish snapshots, Reverb for fan-out, Echo for subscription—is the same shape you’d use for a larger realtime game, just pared down for a portfolio-sized experiment.

#### Wordle

<img src="./public/images/wordle.png" alt="Wordle preview" width="640" />

Guess the five-letter word in six tries with familiar green / yellow feedback.

#### Snake

<img src="./public/images/snake.png" alt="Snake preview" width="640" />

Classic Snake: arrow keys, grow by eating dots, avoid walls and yourself.

#### Blackjack

<img src="./public/images/poker.png" alt="Blackjack preview" width="640" />

Play a full round against the dealer toward 21.
