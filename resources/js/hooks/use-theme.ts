import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';

function getInitialDark(): boolean {
    if (typeof document === 'undefined') return true;
    if (document.documentElement.classList.contains('dark')) return true;
    if (document.documentElement.classList.contains('light')) return false;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? true;
}

function applyTheme(isDark: boolean): void {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (isDark) {
        root.classList.add('dark');
        localStorage.setItem(STORAGE_KEY, 'dark');
    } else {
        root.classList.remove('dark');
        localStorage.setItem(STORAGE_KEY, 'light');
    }
}

export function useTheme(): { isDark: boolean; toggle: () => void } {
    const [isDark, setIsDark] = useState(getInitialDark);

    useEffect(() => {
        applyTheme(isDark);
    }, [isDark]);

    useEffect(() => {
        const root = document.documentElement;
        const observer = new MutationObserver(() => {
            setIsDark(root.classList.contains('dark'));
        });
        observer.observe(root, {
            attributes: true,
            attributeFilter: ['class'],
        });
        return () => observer.disconnect();
    }, []);

    const toggle = useCallback(() => {
        setIsDark((prev) => !prev);
    }, []);

    return { isDark, toggle };
}
