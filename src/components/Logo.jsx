import React, { useState } from 'react';

/**
 * Small square logo for experience / education / org entries.
 *
 * Fallback chain (in order — each on-error advances to the next):
 *   1. `logo`                    — explicit URL or public path (best quality)
 *   2. DuckDuckGo icon service   — reliable, no rate limits, no auth
 *   3. Google s2/favicons        — legacy; historically throttled
 *   4. Initials monogram         — pure text, always renders
 *
 * Every image origin the fallback chain uses must be listed in the CSP
 * `img-src` in index.html. If you add a new provider, update that list.
 */
const Logo = ({ logo, logoDomain, name = '', size = 40, className = '' }) => {
    const [tier, setTier] = useState(0);

    const initials =
        name
            .split(/[\s\-—·/]+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((s) => s[0]?.toUpperCase())
            .join('') || '·';

    // Build the ordered candidate list dynamically so we skip a tier
    // when the corresponding input is missing.
    const candidates = [];
    if (logo) candidates.push(logo);
    if (logoDomain) {
        const d = encodeURIComponent(logoDomain);
        candidates.push(`https://icons.duckduckgo.com/ip3/${logoDomain}.ico`);
        candidates.push(`https://www.google.com/s2/favicons?domain=${d}&sz=128`);
    }

    const src = candidates[tier];

    if (!src) {
        return (
            <div
                aria-hidden="true"
                className={`shrink-0 rounded-md border border-github-border bg-github-bg-secondary flex items-center justify-center font-mono text-[11px] text-github-text-secondary ${className}`}
                style={{ width: size, height: size }}
                title={name}
            >
                {initials}
            </div>
        );
    }

    return (
        <div
            className={`shrink-0 rounded-md border border-github-border bg-github-bg-secondary overflow-hidden flex items-center justify-center ${className}`}
            style={{ width: size, height: size }}
            title={name}
        >
            <img
                key={src}
                src={src}
                alt={`${name} logo`}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={() => setTier((t) => t + 1)}
                className="w-[70%] h-[70%] object-contain"
            />
        </div>
    );
};

export default Logo;
