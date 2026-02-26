import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
    interface Window {
        Pusher: typeof Pusher;
    }
}

window.Pusher = Pusher;

export interface ReverbConfig {
    key: string;
    host: string;
    port: number;
    scheme: string;
}

let echoInstance: Echo<'reverb'> | null = null;

export function getEcho(config: ReverbConfig | null): Echo<'reverb'> | null {
    if (!config?.key) return null;
    if (echoInstance) return echoInstance;

    const wsHost = config.scheme === 'https' ? config.host : `${config.host}:${config.port}`;

    echoInstance = new Echo({
        broadcaster: 'reverb',
        key: config.key,
        wsHost,
        wsPort: config.port,
        wssPort: config.port,
        forceTLS: config.scheme === 'https',
        enabledTransports: ['ws', 'wss'],
    });

    return echoInstance;
}
