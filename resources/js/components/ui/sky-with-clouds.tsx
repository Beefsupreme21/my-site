'use client';

import { cn } from '@/lib/utils';

interface SkyWithCloudsProps {
    className?: string;
}

/**
 * Cumulus-style cloud: overlapping ellipses so it reads as a single fluffy cloud.
 * Scale via width/height; use as many as you want at different positions.
 */
function CloudSvg({
    className,
    style,
}: {
    className?: string;
    style?: React.CSSProperties;
}) {
    return (
        <svg
            viewBox="0 0 160 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn('absolute', className)}
            style={style}
            aria-hidden
        >
            <g fill="white" fillOpacity="0.92">
                <ellipse cx="45" cy="48" rx="38" ry="26" />
                <ellipse cx="95" cy="48" rx="36" ry="24" />
                <ellipse cx="70" cy="38" rx="32" ry="22" />
                <ellipse cx="55" cy="42" rx="22" ry="18" />
                <ellipse cx="85" cy="42" rx="20" ry="16" />
            </g>
        </svg>
    );
}

export function SkyWithClouds({ className }: SkyWithCloudsProps) {
    return (
        <div
            className={cn(
                'absolute inset-0 overflow-hidden',
                'bg-gradient-to-b from-sky-300 via-sky-200 to-sky-400',
                className,
            )}
        >
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    background:
                        'radial-gradient(ellipse 80% 50% at 50% 20%, rgba(255,255,255,0.7), transparent 50%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(255,255,255,0.25), transparent 40%)',
                }}
            />
            {/* Cumulus clouds – different sizes and positions */}
            <CloudSvg
                className="left-[5%] top-[12%] w-[220px] animate-[float_28s_ease-in-out_infinite]"
                style={{ animationDelay: '0s' }}
            />
            <CloudSvg
                className="left-[35%] top-[18%] w-[180px] animate-[float_22s_ease-in-out_infinite_reverse]"
                style={{ animationDelay: '-7s' }}
            />
            <CloudSvg
                className="right-[8%] top-[14%] w-[200px] animate-[float_25s_ease-in-out_infinite]"
                style={{ animationDelay: '-3s' }}
            />
            <CloudSvg
                className="left-[15%] top-[42%] w-[160px] animate-[float_30s_ease-in-out_infinite_reverse]"
                style={{ animationDelay: '-12s' }}
            />
            <CloudSvg
                className="right-[20%] top-[48%] w-[190px] animate-[float_26s_ease-in-out_infinite]"
                style={{ animationDelay: '-5s' }}
            />
            <CloudSvg
                className="left-[50%] top-[55%] w-[140px] animate-[float_24s_ease-in-out_infinite_reverse]"
                style={{ animationDelay: '-9s' }}
            />
        </div>
    );
}
