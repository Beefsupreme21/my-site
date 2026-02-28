import { getEcho } from '@/echo';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function TestBroadcast() {
    const [lastMessage, setLastMessage] = useState<string | null>(null);
    const [count, setCount] = useState(0);
    const [sendStatus, setSendStatus] = useState<'idle' | 'sent' | 'failed'>('idle');
    const reverb = (usePage().props as { reverb?: { key: string; host: string; port: number; scheme: string } | null }).reverb ?? null;

    useEffect(() => {
        // eslint-disable-next-line no-console
        console.log('Reverb config in page:', reverb);

        // Show every Pusher/Reverb message in console (event names, payloads)
        if (typeof window !== 'undefined' && window.Pusher) {
            (window.Pusher as unknown as { logToConsole: boolean }).logToConsole = true;
        }

        const echo = getEcho(reverb);
        if (!echo) {
            // eslint-disable-next-line no-console
            console.log('No Echo instance (getEcho returned null)');
            return;
        }

        // eslint-disable-next-line no-console
        console.log('Echo instance created:', echo);

        const channel = echo.channel('test-channel');
        // eslint-disable-next-line no-console
        console.log('Subscribed to channel: test-channel');

        channel.listen('TestBroadcast', (e: { message: string }) => {
            // eslint-disable-next-line no-console
            console.log('Received TestBroadcast event:', e);
            setLastMessage(e.message);
            setCount((c) => c + 1);
        });

        return () => {
            channel.stopListening('TestBroadcast');
            echo.leave('test-channel');
        };
    }, [reverb]);

    return (
        <>
            <Head title="Test Reverb" />
            <div className="min-h-screen bg-neutral-950 text-white p-8 max-w-lg">
                <Link href="/" className="text-sm text-neutral-400 hover:text-white mb-6 inline-block">
                    ← Home
                </Link>
                <h1 className="text-xl font-semibold mb-2">Reverb test</h1>
                <p className="text-neutral-400 text-sm mb-6">
                    {reverb
                        ? `Config: ${reverb.host}:${reverb.port}. Start Reverb with: php artisan reverb:start`
                        : 'No Reverb config. Set BROADCAST_CONNECTION=reverb and REVERB_* in .env'}
                </p>
                <div className="rounded-lg border border-neutral-700 bg-neutral-800/50 p-4 mb-4">
                    <p className="text-sm text-neutral-400 mb-1">Received</p>
                    <p className="font-mono text-sm text-emerald-400">{lastMessage ?? '—'}</p>
                    <p className="text-xs text-neutral-500 mt-2">Count: {count}</p>
                </div>
                <button
                    type="button"
                    onClick={async () => {
                        setSendStatus('idle');
                        const res = await fetch('/test-broadcast/send', {
                            headers: { Accept: 'application/json' },
                        });
                        const data = (await res.json().catch(() => ({}))) as { sent?: boolean };
                        setSendStatus(data.sent ? 'sent' : 'failed');
                    }}
                    className="inline-block rounded bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
                >
                    Send test broadcast
                </button>
                {sendStatus === 'sent' && (
                    <p className="mt-2 text-sm text-emerald-400">Server sent event to Reverb.</p>
                )}
                {sendStatus === 'failed' && (
                    <p className="mt-2 text-sm text-amber-400">Server could not reach Reverb. Run: php artisan reverb:start</p>
                )}
                <p className="text-xs text-neutral-500 mt-4">
                    Count and “Received” update when the event is delivered over the socket.
                </p>
            </div>
        </>
    );
}
