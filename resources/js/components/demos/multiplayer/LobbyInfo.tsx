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
            <Link href="/multiplayer" className="mb-6 inline-block text-sm text-neutral-400 hover:text-white">
                ← Back to Lobbies
            </Link>
            <h1 className="mb-2 text-2xl font-semibold">Lobby</h1>
            <p className="mb-6 text-sm text-neutral-400">
                Code: <span className="font-mono text-emerald-400">{lobby.code}</span>
            </p>
            <div className="mb-8 max-w-sm rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-4">
                <p className="mb-1 text-sm text-neutral-400">Lobby ID</p>
                <p className="mb-4 font-mono text-white">{lobby.id}</p>
                <p className="mb-1 text-sm text-neutral-400">Players</p>
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
