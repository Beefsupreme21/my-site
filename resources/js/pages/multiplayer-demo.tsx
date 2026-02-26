import { Head, Link, useForm } from '@inertiajs/react';

interface LobbyPlayer {
    id: number;
    name: string;
}

interface Lobby {
    id: number;
    code: string;
    max_players: number;
    status: string;
    players: LobbyPlayer[];
    player_count: number;
}

interface MultiplayerDemoProps {
    lobbies: Lobby[];
    current_lobby_id?: number | null;
    flash?: {
        created_code?: string;
        joined?: string;
        error?: string;
    };
}

export default function MultiplayerDemo({ lobbies, current_lobby_id, flash }: MultiplayerDemoProps) {
    const createForm = useForm({ name: '' });
    const joinForm = useForm({ code: '', name: '' });

    return (
        <>
            <Head title="Multiplayer Lobby - Demo" />
            <div className="min-h-screen bg-neutral-950 text-white p-6">
                <Link
                    href="/"
                    className="inline-block mb-6 text-sm text-neutral-400 hover:text-white"
                >
                    ← Back to Home
                </Link>

                <h1 className="text-2xl font-semibold mb-2">Multiplayer Lobby</h1>
                <p className="text-neutral-400 text-sm mb-6">
                    Start a lobby and share the code, or join one with a code. Max 2 players per lobby.
                </p>

                {flash?.error && (
                    <p className="mb-4 rounded bg-red-900/40 text-red-300 px-4 py-2 text-sm">
                        {flash.error}
                    </p>
                )}
                {flash?.created_code && (
                    <p className="mb-4 rounded bg-emerald-900/40 text-emerald-300 px-4 py-2 text-sm">
                        Lobby created! Share this code: <strong>{flash.created_code}</strong>
                    </p>
                )}
                {flash?.joined && (
                    <p className="mb-4 rounded bg-emerald-900/40 text-emerald-300 px-4 py-2 text-sm">
                        Joined lobby {flash.joined}.
                    </p>
                )}

                <div className="mb-8 flex flex-wrap items-end gap-4">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            createForm.post('/lobbies');
                        }}
                        className="flex flex-wrap items-end gap-3"
                    >
                        <label className="block">
                            <span className="block text-xs text-neutral-500 mb-1">Your name</span>
                            <input
                                type="text"
                                value={createForm.data.name}
                                onChange={(e) => createForm.setData('name', e.target.value)}
                                placeholder="Name"
                                className="rounded border border-neutral-600 bg-neutral-800 px-3 py-2 text-white placeholder-neutral-500 focus:border-neutral-500 focus:outline-none"
                                maxLength={64}
                            />
                        </label>
                        <button
                            type="submit"
                            disabled={createForm.processing || !createForm.data.name.trim()}
                            className="rounded bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-50"
                        >
                            Start lobby
                        </button>
                    </form>
                </div>
                <p className="text-neutral-500 text-xs mb-4">
                    Use the same name above when joining a lobby from another browser.
                </p>

                <h2 className="text-lg font-medium mb-3">Lobbies</h2>
                {lobbies.length === 0 ? (
                    <p className="text-neutral-500 text-sm">No lobbies yet. Start one above.</p>
                ) : (
                    <ul className="space-y-3">
                        {lobbies.map((lobby) => (
                            <li
                                key={lobby.id}
                                className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-3"
                            >
                                <div className="min-w-0 flex-1">
                                    {current_lobby_id === lobby.id ? (
                                        <Link
                                            href={`/lobbies/${lobby.id}`}
                                            className="inline-block font-mono font-semibold text-emerald-400 hover:text-emerald-300 hover:underline"
                                        >
                                            {lobby.code}
                                        </Link>
                                    ) : (
                                        <span className="font-mono font-semibold text-emerald-400">
                                            {lobby.code}
                                        </span>
                                    )}
                                    <span className="text-neutral-400 text-sm ml-3">
                                        {lobby.player_count}/{lobby.max_players} players
                                        {lobby.players.length > 0 && (
                                            <> — {lobby.players.map((p) => p.name).join(', ')}</>
                                        )}
                                    </span>
                                </div>
                                {current_lobby_id === lobby.id ? (
                                    <Link
                                        href={`/lobbies/${lobby.id}`}
                                        className="text-sm text-emerald-400 hover:text-emerald-300 hover:underline"
                                    >
                                        Open
                                    </Link>
                                ) : lobby.status === 'open' ? (
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            joinForm.setData('code', lobby.code);
                                            joinForm.setData('name', createForm.data.name || '');
                                            joinForm.post('/lobbies/join');
                                        }}
                                        className="flex items-center gap-2"
                                    >
                                        <button
                                            type="submit"
                                            disabled={joinForm.processing || !createForm.data.name.trim()}
                                            className="rounded bg-neutral-600 px-3 py-1.5 text-sm text-white hover:bg-neutral-500 disabled:opacity-50"
                                        >
                                            Join
                                        </button>
                                    </form>
                                ) : null}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}
