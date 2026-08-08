// Pre-hydration theme swap. Loaded synchronously in <head> so it runs
// before React paints — avoids FOUC when the user's saved theme differs
// from the default. Kept OUT of index.html so the page CSP can drop
// 'unsafe-inline' from script-src.
(function () {
    try {
        var saved = localStorage.getItem('gitme-theme');
        var prefersLight =
            window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: light)').matches;
        var theme = saved || (prefersLight ? 'light' : 'dark');
        var r = document.documentElement;
        r.classList.remove('light', 'dark');
        r.classList.add(theme);
    } catch (e) {
        /* private-mode / disabled storage — fall through, default theme wins */
    }
})();
