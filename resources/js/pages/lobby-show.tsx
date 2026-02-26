import { LobbyInfo } from '@/components/demos/multiplayer';
import { getEcho } from '@/echo';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface LobbyPlayer {
    id: number;
    name: string;
}

interface LobbyShowProps {
    lobby: {
        id: number;
        code: string;
        max_players: number;
        status: string;
        player_count: number;
        players: LobbyPlayer[];
    };
}

export default function LobbyShow({ lobby: initialLobby }: LobbyShowProps) {
    const [lobby, setLobby] = useState(initialLobby);
    const [live, setLive] = useState(false);
    const reverb = (usePage().props as { reverb?: { key: string; host: string; port: number; scheme: string } | null }).reverb ?? null;

    useEffect(() => {
        setLobby(initialLobby);
    }, [initialLobby.id, initialLobby.player_count]);

    useEffect(() => {
        const echo = getEcho(reverb);
        if (!echo) return;

        const channel = echo.channel(`lobby.${initialLobby.id}`);
        channel.listen('LobbyUpdated', (e: { lobby: typeof initialLobby }) => {
            setLobby(e.lobby);
            setLive(true);
        });
        setLive(true);

        return () => {
            channel.stopListening('LobbyUpdated');
            echo.leave(`lobby.${initialLobby.id}`);
        };
    }, [reverb, initialLobby.id]);

    return (
        <>
            <Head title={`Lobby ${lobby.code} - Demo`} />
            <div className="min-h-screen bg-neutral-950 text-white p-6">
                <div className="mb-4 flex items-center gap-3">
                    <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            reverb && live ? 'bg-emerald-500/20 text-emerald-400' : 'bg-neutral-600/50 text-neutral-400'
                        }`}
                    >
                        <span className={`h-1.5 w-1.5 rounded-full ${reverb && live ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-500'}`} />
                        {reverb && live ? 'Live' : 'Reverb offline'}
                    </span>
                    <span className="text-sm text-neutral-500">
                        Players: {lobby.player_count} / {lobby.max_players}
                    </span>
                </div>
                <LobbyInfo lobby={lobby} />
            </div>
        </>
    );
}