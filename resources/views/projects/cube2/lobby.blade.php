<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Lobby - {{ config('app.name', 'Laravel') }}</title>
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
    @vite(['resources/css/app.css'])
    <style>
        body { overflow: auto; }
    </style>
</head>
<body class="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 text-zinc-100 font-sans antialiased">
    <div class="min-h-screen flex flex-col">
        <header class="border-b border-zinc-800/80">
            <div class="max-w-3xl mx-auto px-6 py-5">
                <h1 class="text-xl font-semibold tracking-tight text-white">{{ config('app.name', 'Laravel') }}</h1>
                <p class="text-sm text-zinc-500 mt-0.5">Lobby</p>
            </div>
        </header>

        <main class="flex-1 max-w-3xl w-full mx-auto px-6 py-10">
            <section class="mb-10">
                <h2 class="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-4">Available games</h2>
                <a
                    href="{{ route('projects.cube2.game.show') }}"
                    class="group block rounded-xl bg-zinc-800/80 border border-zinc-700/80 shadow-lg shadow-black/20 hover:border-emerald-500/50 hover:shadow-emerald-500/5 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-zinc-900"
                >
                    <div class="p-6 flex items-center justify-between gap-4">
                        <div class="min-w-0">
                            <span class="font-semibold text-white group-hover:text-emerald-400 transition-colors">Main Lobby</span>
                            <p class="text-sm text-zinc-500 mt-1">Wave tile game · step on the right color before time runs out</p>
                        </div>
                        <span class="shrink-0 px-5 py-2.5 rounded-lg bg-emerald-600 text-sm font-medium text-white group-hover:bg-emerald-500 shadow-sm transition-colors">
                            Join
                        </span>
                    </div>
                </a>
            </section>

            <section>
                <h2 class="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-4">Stats</h2>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div class="rounded-xl bg-zinc-800/60 border border-zinc-700/80 p-5">
                        <div class="text-3xl font-semibold tabular-nums text-white">—</div>
                        <div class="text-sm text-zinc-500 mt-1">Games played</div>
                    </div>
                    <div class="rounded-xl bg-zinc-800/60 border border-zinc-700/80 p-5">
                        <div class="text-3xl font-semibold tabular-nums text-white">—</div>
                        <div class="text-sm text-zinc-500 mt-1">Best wave</div>
                    </div>
                    <div class="rounded-xl bg-zinc-800/60 border border-zinc-700/80 p-5 col-span-2 sm:col-span-1">
                        <div class="text-3xl font-semibold tabular-nums text-white">—</div>
                        <div class="text-sm text-zinc-500 mt-1">High score</div>
                    </div>
                </div>
            </section>
        </main>
    </div>
</body>
</html>
