import React, { useEffect, useState, useCallback } from 'react';
import { Sun, Moon } from 'lucide-react';

const STORAGE_KEY = 'gitme-theme';

const getInitialTheme = () => {
    if (typeof window === 'undefined') return 'dark';
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const applyTheme = (theme) => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
};

/**
 * Small, self-contained theme toggle. Reads/writes localStorage,
 * flips the `.light` / `.dark` class on <html>.
 */
const ThemeToggle = ({ className = '' }) => {
    const [theme, setTheme] = useState(getInitialTheme);

    // Apply on first mount to sync class before paint.
    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    const toggle = useCallback(() => {
        setTheme((prev) => {
            const next = prev === 'dark' ? 'light' : 'dark';
            try {
                window.localStorage.setItem(STORAGE_KEY, next);
            } catch (_) {
                /* ignore quota / private-mode errors */
            }
            return next;
        });
    }, []);

    const isDark = theme === 'dark';

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`relative flex items-center justify-center w-8 h-8 rounded-md border border-github-border text-github-text-secondary hover:text-github-text hover:bg-github-border/30 transition-colors ${className}`}
        >
            {isDark ? <Moon size={14} /> : <Sun size={14} />}
        </button>
    );
};

export default ThemeToggle;
