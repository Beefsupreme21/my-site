import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';

function SunIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn('h-5 w-5', className)}
            aria-hidden
        >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
    );
}

function MoonIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn('h-5 w-5', className)}
            aria-hidden
        >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
    );
}

interface ThemeToggleProps {
    className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
    const { isDark, toggle } = useTheme();

    return (
        <button
            type="button"
            onClick={toggle}
            className={cn(
                'fixed top-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white/90 text-neutral-600 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:border-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-transparent dark:border-neutral-600 dark:bg-neutral-800/90 dark:text-neutral-300 dark:hover:border-neutral-500 dark:hover:bg-neutral-700 dark:hover:text-white',
                className,
            )}
            aria-label={isDark ? 'Switch to light mode (day)' : 'Switch to dark mode (night)'}
        >
            {isDark ? (
                <SunIcon />
            ) : (
                <MoonIcon />
            )}
        </button>
    );
}
