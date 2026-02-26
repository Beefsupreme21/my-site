import { Link } from '@inertiajs/react';

interface LobbyPlayer {
    id: number;
    name: string;
}

interface LobbyInfoProps {
    lobby: {
        id: number;
        code: string;
        max_players: number;
        player_count: number;
        players: LobbyPlayer[];
    };
}

export function LobbyInfo({ lobby }: LobbyInfoProps) {
    return (
        <>
            <Link
                href="/multiplayer"
                className="inline-block mb-6 text-sm text-neutral-400 hover:text-white"
            >
                ← Back to Lobbies
            </Link>
            <h1 className="text-2xl font-semibold mb-2">Lobby</h1>
            <p className="text-neutral-400 text-sm mb-6">
                Code: <span className="font-mono text-emerald-400">{lobby.code}</span>
            </p>
            <div className="rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-4 max-w-sm mb-8">
                <p className="text-sm text-neutral-400 mb-1">Lobby ID</p>
                <p className="font-mono text-white mb-4">{lobby.id}</p>
                <p className="text-sm text-neutral-400 mb-1">Players</p>
                <p className="text-white">
                    {lobby.player_count} / {lobby.max_players}
                </p>
                {lobby.players.length > 0 && (
                    <ul className="mt-2 text-sm text-neutral-300">
                        {lobby.players.map((p) => (
                            <li key={p.id}>{p.name}</li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}
