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

## Features (high level)

- **Landing / welcome** — Inertia page with project highlights, skills, and timeline-style content.
- **Project demos** — `/projects/{id}` loads registered demos (Kanban, Wordle, Snake, Blackjack, a Three.js racing scene, and more) via a shared demo shell.
- **Cube2** — Wave-style tile game with a lobby and server-backed game routes under `/projects/cube2`; multiplayer/realtime features expect Reverb when enabled.
- **Lobbies** — `/multiplayer` and lobby routes for experimenting with presence and game flow.
- **Broadcast smoke test** — `/test-broadcast` for verifying WebSockets when Reverb is configured.

## Requirements

- PHP **8.2+** with extensions Laravel needs (e.g. `pdo_sqlite`, `mbstring`, `openssl`, `curl`)
- [Composer](https://getcomposer.org)
- [Node.js](https://nodejs.org) **22+** (or current LTS that matches your local Vite/tooling)
- **SQLite** by default (see `.env.example`); you can switch to MySQL/Postgres if you prefer.

## Quick start

```bash
git clone <your-repo-url> my-site
cd my-site
composer run setup
```

`composer run setup` installs PHP dependencies, ensures `.env` exists, generates the app key, runs migrations, installs npm packages, and runs a production Vite build.

### Local development

```bash
composer run dev
```

That runs the Laravel dev server, queue worker, log tail (Pail), and `npm run dev` together. Visit the URL shown by `php artisan serve` (typically `http://127.0.0.1:8000`).

For assets only:

```bash
npm run dev
```

### Optional: Reverb (WebSockets)

For realtime lobbies and broadcasting, set `BROADCAST_CONNECTION=reverb` in `.env` and fill in the `REVERB_*` variables from `.env.example`. Then start Reverb (e.g. `php artisan reverb:start`) alongside your app. With `BROADCAST_CONNECTION=log`, broadcasts stay local without a socket server.

## Common commands

| Command | Purpose |
|---------|---------|
| `composer run dev` | App + queue + logs + Vite |
| `composer run test` | Pint (style) + Pest tests |
| `npm run build` | Production frontend build |
| `npm run lint` | ESLint |
| `npm run types` | TypeScript check (`tsc --noEmit`) |
| `npm run format` | Prettier on `resources/` |

## Project layout (short)

- `app/` — Laravel application code
- `routes/web.php` — Web routes, Inertia pages, project demo registry
- `resources/js/pages/` — Inertia React pages (`welcome`, `project-demo`, etc.)
- `resources/js/components/` — UI primitives, demos, and shared pieces
- `public/` — Static assets (images, SVG logos, etc.)
- `tests/` — Pest tests

## License

Released under the [MIT License](https://opensource.org/licenses/MIT) (see `composer.json` `license` field). Add a root `LICENSE` file if you want the standard GitHub license badge.
