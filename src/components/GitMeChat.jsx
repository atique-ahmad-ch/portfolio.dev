import React, { useState, useEffect, useMemo, useRef } from 'react';
import { MessageSquare, X, Send, Loader2, Bot, Sparkles } from 'lucide-react';
import userConfig from '../../userConfig';

/* ------------------------------------------------------------------ */
/*  Config                                                            */
/* ------------------------------------------------------------------ */

// Model priority list. `openrouter/free`, add any specific one below.
// via VITE_OPENROUTER_MODEL.
const MODEL_FALLBACKS = [
    import.meta.env.VITE_OPENROUTER_MODEL, // caller's explicit override wins
    'openrouter/free',
].filter(Boolean);

const MAX_HISTORY = 12;          // user + assistant turns kept in context
const MAX_RESPONSE_TOKENS = 500; // cap on assistant reply
const TEMPERATURE = 0.4;         // low → grounded, factual

// Per-session rate limit — protects our OpenRouter quota from a single
// visitor spamming the chat. Sliding window of RATE_WINDOW_MS.
const RATE_MAX_REQUESTS = 8;
const RATE_WINDOW_MS = 60_000;

// HTTP header values must be ISO-8859-1 (Latin-1). Strip anything outside
// printable ASCII so header construction never throws — em dashes, curly
// quotes, and other Unicode we use freely in the UI would otherwise break.
const asciiHeader = (s) =>
    (s || '')
        .normalize('NFKD')
        .replace(/[^\x20-\x7E]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

/* ------------------------------------------------------------------ */
/*  Portfolio context builder                                          */
/* ------------------------------------------------------------------ */

// Compact natural-language brief the model can quote from.
// Keeps token count reasonable while still covering every section.
const buildPortfolioBrief = (cfg, ghData) => {
    if (!cfg) return '';
    const lines = [];

    // SECURITY / privacy — do NOT ship email, phone, LinkedIn URL, or the
    // calendar meeting link into the third-party model. The model doesn't
    // need PII to answer questions; if a visitor asks how to contact the
    // owner, we tell it to point them at the on-page Contact section.
    lines.push(`# About ${cfg.name}`);
    lines.push(`Handle: ${cfg.handle}`);
    if (cfg.tagline) lines.push(`Tagline: ${cfg.tagline}`);
    if (cfg.location) lines.push(`Location: ${cfg.location}`);
    if (cfg.availability) lines.push(`Availability: ${cfg.availability}`);
    if (cfg.website) lines.push(`Website: ${cfg.website}`);
    if (cfg.github) lines.push(`GitHub: ${cfg.github}`);
    lines.push(
        'Contact details (email, LinkedIn, calendar link) are visible on the site itself — ' +
        'refer visitors to the Contact section rather than quoting them.'
    );

    if (cfg.bioShort || cfg.bioLong?.length) {
        lines.push('');
        lines.push('## Bio');
        if (cfg.bioShort) lines.push(cfg.bioShort);
        if (Array.isArray(cfg.bioLong)) {
            cfg.bioLong.forEach((p) => lines.push(p));
        }
    }

    if (cfg.experience?.length) {
        lines.push('');
        lines.push('## Experience');
        cfg.experience.forEach((e) => {
            lines.push(
                `- ${e.role} @ ${e.org} (${e.period}, ${e.location || 'n/a'})`
            );
            (e.highlights || []).forEach((h) => lines.push(`    · ${h}`));
        });
    }

    if (cfg.education?.length) {
        lines.push('');
        lines.push('## Education');
        cfg.education.forEach((ed) => {
            const bits = [ed.degree, ed.school, ed.location, ed.period]
                .filter(Boolean)
                .join(' · ');
            lines.push(`- ${bits}`);
            if (ed.note) lines.push(`    · ${ed.note}`);
        });
    }

    if (cfg.projects?.length) {
        lines.push('');
        lines.push('## Selected work / projects');
        cfg.projects.forEach((p) => {
            const tags = p.tags?.length ? ` [${p.tags.join(', ')}]` : '';
            lines.push(`- ${p.name}${tags}: ${p.description || ''}`);
        });
    }

    if (cfg.publications?.length) {
        lines.push('');
        lines.push('## Publications');
        cfg.publications.forEach((pub) => {
            const venue = pub.publishedIn ?? pub.conference ?? '';
            lines.push(
                `- "${pub.title}" — ${pub.venue}${venue ? ` · ${venue}` : ''} (${pub.date}) — authors: ${pub.authors}`
            );
        });
    }

    if (cfg.blogs?.length) {
        lines.push('');
        lines.push('## Writings / blogs');
        cfg.blogs.forEach((b) => {
            lines.push(
                `- "${b.title}" (${b.date})${b.summary ? ` — ${b.summary}` : ''}`
            );
        });
    }

    if (cfg.orgs?.length) {
        lines.push('');
        lines.push('## Organisations & projects contributed to');
        cfg.orgs.forEach((o) => {
            const name = typeof o === 'string' ? o : o.name;
            lines.push(`- ${name}`);
        });
    }

    if (cfg.stack && Object.keys(cfg.stack).length) {
        lines.push('');
        lines.push('## Skills');
        Object.entries(cfg.stack).forEach(([group, items]) => {
            lines.push(`- ${group}: ${items.join(', ')}`);
        });
    }

    // GitHub live data — only recent titles for context, no giant blobs.
    if (ghData) {
        const prs = (ghData.pullRequests?.nodes || []).slice(0, 10);
        const issues = (ghData.issues?.nodes || []).slice(0, 5);
        const discussions = (ghData.repositoryDiscussions?.nodes || []).slice(0, 5);
        if (prs.length || issues.length || discussions.length) {
            lines.push('');
            lines.push('## Recent GitHub activity');
            if (ghData.followers?.totalCount != null) {
                lines.push(
                    `Followers: ${ghData.followers.totalCount}, Following: ${ghData.following?.totalCount ?? 0}`
                );
            }
            prs.forEach((n) =>
                lines.push(
                    `- PR (${n.state}) in ${n.repository?.nameWithOwner}: ${n.title}`
                )
            );
            issues.forEach((n) =>
                lines.push(
                    `- Issue (${n.state}) in ${n.repository?.nameWithOwner}: ${n.title}`
                )
            );
            discussions.forEach((n) =>
                lines.push(
                    `- Discussion in ${n.repository?.nameWithOwner}: ${n.title}`
                )
            );
        }
    }

    return lines.join('\n');
};

/* ------------------------------------------------------------------ */
/*  System prompt                                                      */
/* ------------------------------------------------------------------ */

const buildSystemPrompt = (portfolioBrief, name) => `
You are the personal AI assistant embedded on ${name}'s portfolio website.
Your job is to answer questions from visitors about ${name} — their
experience, skills, projects, publications, education, open-source
contributions, and writings.

Ground rules:
1. Answer ONLY from the "Portfolio brief" below. Do NOT invent employers,
   titles, dates, papers, skills, or GitHub activity that isn't listed.
2. If a question can't be answered from the brief, say so plainly and
   suggest the most relevant section of the portfolio (e.g. "See the
   Experience section" or "See the Publications section").
3. Keep answers short: 2–4 sentences, plain prose, no bullet lists unless
   the visitor asks for a list. No markdown headings.
4. Refer to ${name} in the third person by first name.
5. Be warm and clear, not salesy. Do not use marketing adjectives ("amazing",
   "world-class", etc.). Let the facts speak.
6. Do not answer questions that are unrelated to ${name} or their work —
   politely redirect visitors back to the portfolio's topic.

--- Portfolio brief ---
${portfolioBrief}
--- End brief ---
`.trim();

/* ------------------------------------------------------------------ */
/*  Suggested opening questions                                        */
/* ------------------------------------------------------------------ */

const suggestionsFor = (name) => [
    `What is ${name.split(' ')[0]} working on right now?`,
    `Which open-source projects has ${name.split(' ')[0]} contributed to?`,
    'What are the strongest skills here?',
    'Show me recent publications.',
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const GitMeChat = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const [showTeaser, setShowTeaser] = useState(false);

    const name = userConfig.name || data?.name || 'this developer';

    // Build the brief once per data change — not per keystroke.
    const portfolioBrief = useMemo(
        () => buildPortfolioBrief(userConfig, data),
        [data]
    );

    const systemPrompt = useMemo(
        () => buildSystemPrompt(portfolioBrief, name),
        [portfolioBrief, name]
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isOpen) setShowTeaser(true);
        }, 2500);
        return () => clearTimeout(timer);
    }, [isOpen]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
            setShowTeaser(false);
        }
    }, [messages, isOpen]);

    // In-memory sliding window of recent send timestamps.
    // Not persisted — resets when the tab closes.
    const rateStampsRef = useRef([]);

    const send = async (contentOverride) => {
        const raw = (contentOverride ?? input).trim();
        if (!raw || isLoading) return;

        // Per-session rate limit — keeps a single visitor from burning
        // through our OpenRouter quota.
        const now = Date.now();
        rateStampsRef.current = rateStampsRef.current.filter(
            (t) => now - t < RATE_WINDOW_MS
        );
        if (rateStampsRef.current.length >= RATE_MAX_REQUESTS) {
            const waitMs =
                RATE_WINDOW_MS - (now - rateStampsRef.current[0]);
            const waitSec = Math.max(1, Math.ceil(waitMs / 1000));
            setMessages((prev) => [
                ...prev,
                { role: 'user', content: raw },
                {
                    role: 'assistant',
                    content: `You're sending messages too quickly. Please wait ${waitSec}s and try again.`,
                },
            ]);
            setInput('');
            return;
        }
        rateStampsRef.current.push(now);

        const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY?.trim();
        if (!apiKey) {
            setMessages((prev) => [
                ...prev,
                { role: 'user', content: raw },
                {
                    role: 'assistant',
                    content:
                        "Chat isn't configured — VITE_OPENROUTER_API_KEY is missing. Add it to your .env file and reload.",
                },
            ]);
            setInput('');
            return;
        }

        const userMessage = { role: 'user', content: raw };
        const nextHistory = [...messages, userMessage].slice(-MAX_HISTORY);
        setMessages(nextHistory);
        setInput('');
        setIsLoading(true);

        try {
            let answer = null;
            let lastError = null;

            for (const model of MODEL_FALLBACKS) {
                const response = await fetch(
                    'https://openrouter.ai/api/v1/chat/completions',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${apiKey}`,
                            'HTTP-Referer': asciiHeader(window.location.origin),
                            'X-Title': asciiHeader(`${name} - Portfolio`),
                        },
                        body: JSON.stringify({
                            model,
                            temperature: TEMPERATURE,
                            max_tokens: MAX_RESPONSE_TOKENS,
                            messages: [
                                { role: 'system', content: systemPrompt },
                                ...nextHistory,
                            ],
                        }),
                    }
                );

                let result;
                try {
                    result = await response.json();
                } catch (_) {
                    lastError = new Error(`Non-JSON response (HTTP ${response.status})`);
                    continue;
                }

                if (response.ok && !result.error) {
                    answer =
                        result.choices?.[0]?.message?.content?.trim() ||
                        "I didn't get a response — try rephrasing.";
                    break;
                }

                const status = response.status;
                const upstream = result.error?.message || result.error || '';

                // Retry-worthy: model access / availability / paywall problems
                // — a `:free` fallback might not hit the same wall.
                const isRetryable =
                    status === 402 || // out of credits for THIS model
                    status === 404 || // model not found on this account
                    status === 429 || // per-model rate-limit
                    /model|not available|does not exist|credit/i.test(upstream);

                if (isRetryable) {
                    lastError = new Error(`Model "${model}" unavailable (${status})`);
                    continue;
                }

                // Only auth errors are truly fatal for every model.
                if (status === 401) {
                    throw new Error(
                        'The OpenRouter API key was rejected. Check VITE_OPENROUTER_API_KEY.'
                    );
                }
                throw new Error(`Upstream error (${status}): ${upstream || 'unknown'}`);
            }

            if (!answer) {
                throw (
                    lastError ||
                    new Error(
                        'No fallback model succeeded. Set VITE_OPENROUTER_MODEL to a model you can access.'
                    )
                );
            }

            setMessages((prev) =>
                [...prev, { role: 'assistant', content: answer }].slice(-MAX_HISTORY)
            );
        } catch (err) {
            // Show a friendly message in the chat window instead of a raw
            // stack trace. Real user-facing text only — no plumbing details.
            const friendly =
                err?.message && /API key|credits|rate|OpenRouter/i.test(err.message)
                    ? err.message
                    : "I couldn't reach the assistant right now. Please try again in a moment.";
            setMessages((prev) =>
                [...prev, { role: 'assistant', content: friendly }].slice(-MAX_HISTORY)
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        send();
    };

    if (!data) return null;

    const suggestions = suggestionsFor(name);

    return (
        <div className="fixed bottom-6 right-6 z-[100] font-sans">
            {/* Teaser Popup */}
            {!isOpen && showTeaser && (
                <div className="absolute bottom-16 right-0 mb-2 mr-0 whitespace-nowrap animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="relative bg-brand-action text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-2xl border border-white/20 flex items-center gap-2">
                        <Sparkles size={14} className="animate-pulse" />
                        <span>Ask me anything about {name.split(' ')[0]}!</span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowTeaser(false);
                            }}
                            className="ml-1 hover:bg-white/20 rounded-full p-0.5 transition-colors"
                        >
                            <X size={12} />
                        </button>
                        <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-brand-action rotate-45 border-r border-b border-white/20"></div>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => {
                    setIsOpen(!isOpen);
                    setShowTeaser(false);
                }}
                className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 border-2 border-white/10 ${isOpen
                    ? 'bg-github-status-closed text-white hover:rotate-90'
                    : 'bg-brand-action text-white'
                    }`}
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
            >
                {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 w-[92vw] max-w-[400px] h-[540px] bg-brand-surface/95 backdrop-blur-md rounded-2xl shadow-2xl border border-brand-ai/30 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                    {/* Header */}
                    <div className="p-4 border-b border-brand-ai/20 flex items-center gap-3 bg-gradient-to-r from-brand-ai/10 to-transparent">
                        <div className="w-8 h-8 rounded-full bg-brand-action flex items-center justify-center">
                            <Bot size={18} className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                                Ask about {name.split(' ')[0]}
                                <Sparkles size={12} className="text-brand-action" />
                            </h3>
                            <p className="text-[10px] text-github-text-secondary">
                                Portfolio assistant · grounded in {name.split(' ')[0]}'s work only
                            </p>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                        {messages.length === 0 && (
                            <div className="py-2 space-y-4">
                                <p className="text-xs text-github-text-secondary leading-relaxed px-1">
                                    Hi. I'm the assistant on {name}'s portfolio.
                                    Ask about experience, projects, publications, or
                                    open-source contributions.
                                </p>
                                <div className="flex flex-col gap-2">
                                    {suggestions.map((q) => (
                                        <button
                                            key={q}
                                            onClick={() => send(q)}
                                            className="text-left text-[12px] px-3 py-2 rounded-lg border border-github-border/60 bg-github-bg-secondary/40 hover:border-brand-action/60 hover:bg-brand-action/5 text-github-text transition-colors"
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'
                                    }`}
                            >
                                <div
                                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user'
                                        ? 'bg-brand-action text-white rounded-tr-none'
                                        : 'bg-gradient-to-br from-brand-ai/20 to-transparent border border-brand-ai/10 text-github-text rounded-tl-none'
                                        }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-github-bg-secondary px-4 py-2 rounded-2xl rounded-tl-none border border-github-border flex gap-1 items-center">
                                    <span className="w-1.5 h-1.5 bg-github-text-secondary rounded-full animate-bounce [animation-delay:-0.3s]" />
                                    <span className="w-1.5 h-1.5 bg-github-text-secondary rounded-full animate-bounce [animation-delay:-0.15s]" />
                                    <span className="w-1.5 h-1.5 bg-github-text-secondary rounded-full animate-bounce" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form
                        onSubmit={handleSubmit}
                        className="p-4 border-t border-brand-ai/20"
                    >
                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={`Ask about ${name.split(' ')[0]}...`}
                                className="w-full bg-github-bg-tertiary border border-github-border rounded-xl px-4 py-2 text-sm text-github-text focus:outline-none focus:border-brand-action transition-colors pr-12"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-brand-action hover:bg-brand-action/10 rounded-lg transition-all disabled:opacity-30"
                                aria-label="Send"
                            >
                                {isLoading ? (
                                    <Loader2 size={16} className="animate-spin" />
                                ) : (
                                    <Send size={16} />
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default GitMeChat;
