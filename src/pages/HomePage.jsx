import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowUpRight,
    GitPullRequest,
    CheckCircle2,
    Clock,
    XCircle,
    Mail,
    Github,
    Linkedin,
    FileText,
    MapPin,
    Radio,
    Terminal,
    Code,
    Download,
    ChevronDown,
    ChevronUp,
} from 'lucide-react';
import userConfig from '../../userConfig';
import Logo from '../components/Logo';

/* ------------------------------------------------------------------ */
/*  Tiny presentational primitives                                     */
/* ------------------------------------------------------------------ */

const Prompt = ({ children }) => (
    <span className="text-github-status-open select-none">{children}</span>
);

const SectionHeader = ({ id, label }) => (
    <div className="flex items-baseline gap-3 mb-6 font-mono">
        <Prompt>❯</Prompt>
        <h2 id={id} className="text-sm uppercase tracking-[0.18em] text-github-text-secondary">
            {label}
        </h2>
        <div className="flex-1 border-t border-dashed border-github-border/60 translate-y-[-2px]" />
    </div>
);

const Chip = ({ children, tone = 'default' }) => {
    const tones = {
        default:
            'border-github-border text-github-text-secondary bg-github-bg-secondary/60',
        accent:
            'border-github-status-open/30 text-github-status-open bg-github-status-open/5',
        purple:
            'border-github-status-merged/30 text-github-status-merged bg-github-status-merged/5',
    };
    return (
        <span
            className={`inline-flex items-center px-2 py-0.5 text-[11px] font-mono border rounded-sm ${tones[tone]}`}
        >
            {children}
        </span>
    );
};

const BlinkingCursor = () => (
    <span
        aria-hidden="true"
        className="inline-block w-[10px] h-[1.05em] translate-y-[2px] ml-1 bg-github-status-open animate-pulse"
    />
);

/* ------------------------------------------------------------------ */
/*  Recent GitHub activity strip                                       */
/* ------------------------------------------------------------------ */

const stateIcon = (s) => {
    if (s === 'MERGED')
        return <CheckCircle2 size={12} className="text-github-status-merged" />;
    if (s === 'OPEN')
        return <Clock size={12} className="text-github-status-open" />;
    return <XCircle size={12} className="text-github-status-closed" />;
};

const ACTIVITY_TOTAL = 4;   // items to show in the strip
const ACTIVITY_PER_REPO = 2; // cap per repo → forces ≥ 2 unique repos when possible

const RecentActivity = ({ data }) => {
    const items = useMemo(() => {
        const prs = (data?.pullRequests?.nodes || []).map((n) => ({
            ...n,
            kind: 'PR',
        }));
        const issues = (data?.issues?.nodes || []).map((n) => ({
            ...n,
            kind: 'Issue',
        }));
        const sorted = [...prs, ...issues]
            .filter((x) => x?.createdAt)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // First pass: diversify by capping per-repo. This guarantees at least
        // 2 unique repos in the result whenever the user has activity in 2+.
        const perRepo = {};
        const picked = [];
        const pickedUrls = new Set();
        for (const item of sorted) {
            const repo = item.repository?.nameWithOwner || '__unknown__';
            if ((perRepo[repo] || 0) < ACTIVITY_PER_REPO) {
                picked.push(item);
                pickedUrls.add(item.url);
                perRepo[repo] = (perRepo[repo] || 0) + 1;
            }
            if (picked.length >= ACTIVITY_TOTAL) break;
        }
        // Second pass: fill any remaining slots (edge case — only 1 repo has
        // any activity in the fetched window).
        if (picked.length < ACTIVITY_TOTAL) {
            for (const item of sorted) {
                if (!pickedUrls.has(item.url)) {
                    picked.push(item);
                    pickedUrls.add(item.url);
                    if (picked.length >= ACTIVITY_TOTAL) break;
                }
            }
        }
        return picked;
    }, [data]);

    if (!items.length) return null;

    return (
        <div className="grid gap-2">
            {items.map((it) => (
                <a
                    key={it.url}
                    href={it.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 px-3 py-2 border border-github-border/60 rounded-sm bg-github-bg-secondary/40 hover:border-github-status-open/40 hover:bg-github-bg-secondary transition-colors"
                >
                    <span className="mt-1 shrink-0">{stateIcon(it.state)}</span>
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 text-[11px] font-mono text-github-text-secondary">
                            <span>{it.repository?.nameWithOwner}</span>
                            <span className="opacity-40">·</span>
                            <span>{it.kind}</span>
                        </div>
                        <div className="text-[13.5px] text-github-text truncate group-hover:text-github-text-link">
                            {it.title}
                        </div>
                    </div>
                    <ArrowUpRight
                        size={14}
                        className="mt-1 shrink-0 text-github-text-secondary/50 group-hover:text-github-status-open transition-colors"
                    />
                </a>
            ))}
        </div>
    );
};

/* ------------------------------------------------------------------ */
/*  Uptime counter — "current focus" flavor                            */
/* ------------------------------------------------------------------ */

const useUptime = () => {
    const [now, setNow] = useState(() => new Date());
    useEffect(() => {
        const t = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(t);
    }, []);
    // hh:mm:ss UTC — reads like a system clock, no PII
    return now.toISOString().slice(11, 19);
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const PUBS_DEFAULT = 4;
const BLOGS_DEFAULT = 3;

const HomePage = ({ data }) => {
    const uptime = useUptime();
    const avatarUrl = data?.avatarUrl || `https://github.com/${userConfig.handle}.png`;
    const resumeUrl = `${import.meta.env.BASE_URL}cv/${userConfig.cvUsername}.pdf`;

    const [pubsExpanded, setPubsExpanded] = useState(false);
    const [blogsExpanded, setBlogsExpanded] = useState(false);

    const allPublications = userConfig.publications || [];
    const allBlogs = userConfig.blogs || [];
    const visiblePublications = pubsExpanded
        ? allPublications
        : allPublications.slice(0, PUBS_DEFAULT);
    const visibleBlogs = blogsExpanded
        ? allBlogs
        : allBlogs.slice(0, BLOGS_DEFAULT);

    return (
        <div className="min-h-screen bg-github-bg text-github-text">
            {/* Subtle scanline / grid background — flips with theme */}
            <div
                aria-hidden="true"
                className="fixed inset-0 pointer-events-none opacity-[0.045]"
                style={{
                    backgroundImage:
                        'linear-gradient(rgb(var(--gh-grid)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--gh-grid)) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                }}
            />

            <div className="relative max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 pt-10 pb-24">
                {/* -------------------- HERO -------------------- */}
                <div className="font-mono text-[12px] text-github-text-secondary flex items-center gap-2 mb-6">
                    <Terminal size={13} className="text-github-status-open" />
                    <span className="text-github-status-open">atique@ml</span>
                    <span className="opacity-60">:</span>
                    <span className="text-github-text-link">~/portfolio</span>
                    <span className="opacity-60">$</span>
                    <span>whoami</span>
                    <span className="ml-auto hidden sm:inline opacity-60">uptime {uptime} UTC</span>
                </div>

                <header className="grid grid-cols-1 sm:grid-cols-[1fr_160px] gap-8 items-start">
                    <div>
                        <h1 className="font-mono text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-tight">
                            {userConfig.name}
                            <BlinkingCursor />
                        </h1>
                        <p className="mt-3 text-github-text-secondary text-[15px] leading-relaxed">
                            {userConfig.tagline}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] font-mono text-github-text-secondary">
                            <span className="flex items-center gap-1.5">
                                <MapPin size={12} /> {userConfig.location}
                            </span>
                            <span className="flex items-center gap-1.5 text-github-status-open">
                                <Radio size={12} className="animate-pulse" />
                                {userConfig.availability}
                            </span>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-2">
                            <a
                                href={userConfig.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-github-border rounded-sm hover:border-github-text-secondary hover:bg-github-bg-secondary transition-colors"
                            >
                                <Github size={13} /> github
                            </a>
                            <a
                                href={userConfig.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-github-border rounded-sm hover:border-github-text-secondary hover:bg-github-bg-secondary transition-colors"
                            >
                                <Linkedin size={13} /> linkedin
                            </a>
                            <a
                                href={`mailto:${userConfig.email}`}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-github-border rounded-sm hover:border-github-text-secondary hover:bg-github-bg-secondary transition-colors"
                            >
                                <Mail size={13} /> email
                            </a>
                            <a
                                href={resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-github-status-open/40 text-github-status-open rounded-sm hover:bg-github-status-open/10 transition-colors"
                            >
                                <FileText size={13} /> resume.pdf
                            </a>
                        </div>
                    </div>

                    <div className="justify-self-start sm:justify-self-end">
                        <div className="relative">
                            <div className="absolute inset-0 border border-dashed border-github-status-open/40 rounded-full translate-x-1 translate-y-1" />
                            <img
                                src={avatarUrl}
                                alt={userConfig.name}
                                className="relative w-[110px] h-[110px] sm:w-[150px] sm:h-[150px] rounded-full object-cover border border-github-border bg-github-bg-secondary"
                            />
                        </div>
                    </div>
                </header>

                {/* -------------------- ABOUT -------------------- */}
                <section className="mt-14">
                    <SectionHeader id="about" label="about" />
                    <div className="space-y-4 text-[15.5px] leading-[1.7] text-github-text/95">
                        {userConfig.bioLong.map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                    </div>
                </section>

                {/* -------------------- SKILLS -------------------- */}
                <section className="mt-14">
                    <SectionHeader id="skills" label="skills" />
                    <div
                        className="grid gap-x-6 gap-y-5"
                        style={{
                            gridTemplateColumns:
                                'repeat(auto-fit, minmax(220px, 1fr))',
                        }}
                    >
                        {Object.entries(userConfig.stack).map(([group, items]) => (
                            <div key={group} className="border-l-2 border-github-border pl-3">
                                <div className="text-[10.5px] uppercase tracking-[0.2em] text-github-text-secondary font-mono mb-2">
                                    {group}
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {items.map((x) => (
                                        <Chip key={x}>{x}</Chip>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* -------------------- EXPERIENCE -------------------- */}
                <section className="mt-16">
                    <SectionHeader id="experience" label="experience" />
                    <ol className="space-y-6">
                        {userConfig.experience.map((exp, i) => (
                            <li
                                key={i}
                                className="grid grid-cols-1 sm:grid-cols-[130px_1fr] gap-2 sm:gap-6"
                            >
                                <div className="font-mono text-[12px] text-github-text-secondary sm:text-right pt-1">
                                    {exp.period}
                                </div>
                                <div className="border-l border-github-border/60 pl-4 sm:pl-5">
                                    <div className="flex items-start gap-3">
                                        <Logo
                                            logo={exp.logo}
                                            logoDomain={exp.logoDomain}
                                            name={exp.org}
                                            size={40}
                                            className="mt-0.5"
                                        />
                                        <div className="min-w-0">
                                            <div className="text-[15.5px] font-medium text-github-text">
                                                {exp.role}
                                            </div>
                                            <div className="text-[13.5px] text-github-text-link">
                                                {exp.org}
                                                <span className="text-github-text-secondary">
                                                    {' '}
                                                    · {exp.location}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {exp.highlights?.length > 0 && (
                                        <ul className="mt-3 space-y-1 text-[14px] text-github-text-secondary leading-relaxed">
                                            {exp.highlights.map((h, j) => (
                                                <li key={j} className="flex gap-2">
                                                    <Prompt>—</Prompt>
                                                    <span>{h}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>

                {/* -------------------- EDUCATION -------------------- */}
                <section className="mt-16">
                    <SectionHeader id="education" label="education" />
                    <ol className="space-y-4">
                        {userConfig.education.map((ed, i) => (
                            <li
                                key={i}
                                className="grid grid-cols-1 sm:grid-cols-[130px_1fr] gap-2 sm:gap-6"
                            >
                                <div className="font-mono text-[12px] text-github-text-secondary sm:text-right pt-1">
                                    {ed.period}
                                </div>
                                <div className="border-l border-github-border/60 pl-4 sm:pl-5">
                                    <div className="flex items-start gap-3">
                                        <Logo
                                            logo={ed.logo}
                                            logoDomain={ed.logoDomain}
                                            name={ed.school}
                                            size={40}
                                            className="mt-0.5"
                                        />
                                        <div className="min-w-0">
                                            <div className="text-[15.5px] font-medium text-github-text">
                                                {ed.school}
                                            </div>
                                            <div className="text-[13.5px] text-github-text-link">
                                                {ed.degree}
                                                {ed.location && (
                                                    <span className="text-github-text-secondary">
                                                        {' '}· {ed.location}
                                                    </span>
                                                )}
                                            </div>
                                            {ed.note && (
                                                <p className="mt-1 text-[13.5px] text-github-text-secondary">
                                                    {ed.note}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>

                {/* -------------------- PROJECTS -------------------- */}
                <section className="mt-16">
                    <SectionHeader id="projects" label="selected work" />
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {userConfig.projects.map((p) => (
                            <div
                                key={p.name}
                                className="group flex flex-col p-4 border border-github-border/70 rounded-sm bg-github-bg-secondary/40 hover:border-github-status-open/40 transition-colors"
                            >
                                <div>
                                    {p.link ? (
                                        <a
                                            href={p.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-mono text-[15px] text-github-text font-medium hover:text-github-status-open transition-colors inline-flex items-baseline gap-1"
                                        >
                                            {p.name}
                                            <ArrowUpRight
                                                size={13}
                                                className="translate-y-[2px] opacity-60 group-hover:opacity-100"
                                            />
                                        </a>
                                    ) : (
                                        <div className="font-mono text-[15px] text-github-text font-medium">
                                            {p.name}
                                        </div>
                                    )}
                                </div>
                                <p className="mt-1.5 text-[13.5px] text-github-text-secondary leading-relaxed">
                                    {p.description}
                                </p>
                                {p.tags?.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                        {p.tags.map((t) => (
                                            <Chip key={t}>{t}</Chip>
                                        ))}
                                    </div>
                                )}
                                {(p.srcUrl || p.downloadUrl || p.prsUrl) && (
                                    <div className="mt-auto pt-3">
                                        <div className="pt-3 border-t border-dashed border-github-border/50 flex flex-wrap items-center gap-x-4 gap-y-2">
                                            {p.srcUrl && (
                                                <a
                                                    href={p.srcUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 text-[12px] font-mono text-github-text-secondary hover:text-github-status-open transition-colors"
                                                >
                                                    <Code size={12} />
                                                    <span>{p.srcLabel || 'source'}</span>
                                                    <ArrowUpRight size={11} className="opacity-60" />
                                                </a>
                                            )}
                                            {p.downloadUrl && (
                                                <a
                                                    href={p.downloadUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 text-[12px] font-mono text-github-text-secondary hover:text-github-status-open transition-colors"
                                                >
                                                    <Download size={12} />
                                                    <span>{p.downloadLabel || 'download'}</span>
                                                    <ArrowUpRight size={11} className="opacity-60" />
                                                </a>
                                            )}
                                            {p.prsUrl && (
                                                <a
                                                    href={p.prsUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 text-[12px] font-mono text-github-text-secondary hover:text-github-status-open transition-colors"
                                                >
                                                    <GitPullRequest size={12} />
                                                    <span>{p.prsLabel || 'my PRs'}</span>
                                                    <ArrowUpRight size={11} className="opacity-60" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* -------------------- PUBLICATIONS -------------------- */}
                {userConfig.publications?.length > 0 && (
                    <section className="mt-16">
                        <SectionHeader id="publications" label="publications" />
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-[12.5px] text-github-text-secondary font-mono">
                                <Prompt>$</Prompt> cat ~/papers/*.bib
                            </p>
                            {userConfig.profiles?.researchgate && (
                                <a
                                    href={userConfig.profiles.researchgate}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-[11.5px] font-mono text-github-text-link hover:underline"
                                >
                                    researchgate <ArrowUpRight size={12} />
                                </a>
                            )}
                        </div>
                        <ol className="space-y-4">
                            {visiblePublications.map((p, i) => {
                                // Row container is a plain <div> — never <a>. Individual
                                // links (title, publishedIn) are separate anchors so no
                                // <a> ever nests inside another <a>.
                                const publishedIn = p.publishedIn ?? p.conference;
                                const publishedInUrl = p.publishedInUrl ?? p.conferenceUrl;
                                return (
                                    <li
                                        key={i}
                                        className="group grid grid-cols-1 sm:grid-cols-[130px_1fr] gap-1 sm:gap-6"
                                    >
                                        <div className="font-mono text-[12px] text-github-text-secondary sm:text-right pt-1">
                                            {p.date}
                                        </div>
                                        <div className="border-l border-github-border/60 pl-4 sm:pl-5">
                                            {p.link ? (
                                                <a
                                                    href={p.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[14.5px] text-github-text leading-snug hover:text-github-text-link transition-colors inline-flex items-baseline gap-1"
                                                >
                                                    {p.title}
                                                    <ArrowUpRight
                                                        size={13}
                                                        className="translate-y-[2px] opacity-50 group-hover:opacity-100"
                                                    />
                                                </a>
                                            ) : (
                                                <div className="text-[14.5px] text-github-text leading-snug">
                                                    {p.title}
                                                </div>
                                            )}
                                            <div className="text-[12.5px] font-mono text-github-status-open mt-1">
                                                {p.venue}
                                                {publishedIn && (
                                                    <>
                                                        <span className="text-github-text-secondary"> · </span>
                                                        {publishedInUrl ? (
                                                            <a
                                                                href={publishedInUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-github-text-link hover:underline"
                                                            >
                                                                {publishedIn}
                                                                <ArrowUpRight
                                                                    size={11}
                                                                    className="inline-block ml-0.5 -translate-y-[1px] opacity-70"
                                                                />
                                                            </a>
                                                        ) : (
                                                            <span className="text-github-text">
                                                                {publishedIn}
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                            {p.authors && (
                                                <div className="text-[12.5px] text-github-text-secondary mt-1">
                                                    {p.authors}
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </ol>
                        {allPublications.length > PUBS_DEFAULT && (
                            <div className="mt-5 flex justify-center">
                                <button
                                    type="button"
                                    onClick={() => setPubsExpanded((v) => !v)}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-github-border bg-github-bg-secondary/60 text-[13.5px] font-mono text-github-text hover:border-github-status-open/50 hover:text-github-status-open hover:bg-github-status-open/5 transition-colors"
                                >
                                    {pubsExpanded ? (
                                        <>
                                            <ChevronUp size={16} />
                                            <span>less</span>
                                        </>
                                    ) : (
                                        <>
                                            <ChevronDown size={16} />
                                            <span>more</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </section>
                )}

                {/* -------------------- BLOGS / WRITINGS -------------------- */}
                {userConfig.blogs?.length > 0 && (
                    <section className="mt-16">
                        <SectionHeader id="blogs" label="writings & blogs" />
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-[12.5px] text-github-text-secondary font-mono">
                                <Prompt>$</Prompt> ls ~/blog/ | sort -r
                            </p>
                            {userConfig.profiles?.medium && (
                                <a
                                    href={userConfig.profiles.medium}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-[11.5px] font-mono text-github-text-link hover:underline"
                                >
                                    medium <ArrowUpRight size={12} />
                                </a>
                            )}
                        </div>
                        <ul className="space-y-5">
                            {visibleBlogs.map((w, i) => (
                                <li key={i}>
                                    {w.link ? (
                                        <a
                                            href={w.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group block"
                                        >
                                            <div className="text-[15px] text-github-text group-hover:text-github-text-link transition-colors leading-snug">
                                                {w.title}
                                                <ArrowUpRight
                                                    size={13}
                                                    className="inline-block ml-1 opacity-50 group-hover:opacity-100 -translate-y-[1px]"
                                                />
                                            </div>
                                            {w.summary && (
                                                <div className="text-[13px] text-github-text-secondary mt-1 leading-relaxed">
                                                    {w.summary}
                                                </div>
                                            )}
                                            <div className="text-[11.5px] font-mono text-github-text-secondary/70 mt-1">
                                                {w.date}
                                            </div>
                                        </a>
                                    ) : (
                                        <div>
                                            <div className="text-[15px] text-github-text leading-snug">
                                                {w.title}
                                            </div>
                                            {w.summary && (
                                                <div className="text-[13px] text-github-text-secondary mt-1 leading-relaxed">
                                                    {w.summary}
                                                </div>
                                            )}
                                            <div className="text-[11.5px] font-mono text-github-text-secondary/70 mt-1">
                                                {w.date}
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                        {allBlogs.length > BLOGS_DEFAULT && (
                            <div className="mt-5 flex justify-center">
                                <button
                                    type="button"
                                    onClick={() => setBlogsExpanded((v) => !v)}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-github-border bg-github-bg-secondary/60 text-[13.5px] font-mono text-github-text hover:border-github-status-open/50 hover:text-github-status-open hover:bg-github-status-open/5 transition-colors"
                                >
                                    {blogsExpanded ? (
                                        <>
                                            <ChevronUp size={16} />
                                            <span>less</span>
                                        </>
                                    ) : (
                                        <>
                                            <ChevronDown size={16} />
                                            <span>more</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </section>
                )}

                {/* -------------------- RECENT ACTIVITY -------------------- */}
                {data && (
                    <section className="mt-16">
                        <SectionHeader id="now" label="recent activity" />
                        <p className="text-[13px] text-github-text-secondary mb-4 font-mono">
                            <Prompt>$</Prompt> git log --author={userConfig.handle} --recent
                        </p>
                        <RecentActivity data={data} />
                        <div className="mt-4">
                            <Link
                                to="/profile"
                                className="inline-flex items-center gap-1.5 text-[12.5px] font-mono text-github-text-link hover:underline"
                            >
                                see full contribution log <ArrowUpRight size={13} />
                            </Link>
                        </div>
                    </section>
                )}

                {/* -------------------- ORGS -------------------- */}
                <section className="mt-16">
                    <SectionHeader id="orgs" label="worked with" />
                    <div className="flex flex-wrap gap-2.5">
                        {userConfig.orgs.map((o) => {
                            const isString = typeof o === 'string';
                            const org = isString ? { name: o } : o;
                            const Wrapper = org.url ? 'a' : 'span';
                            const wrapperProps = org.url
                                ? {
                                    href: org.url,
                                    target: '_blank',
                                    rel: 'noopener noreferrer',
                                }
                                : {};
                            return (
                                <Wrapper
                                    key={org.name}
                                    {...wrapperProps}
                                    className={`group inline-flex items-center gap-2.5 pl-2 pr-3.5 py-2 border rounded-md bg-github-bg-secondary/60 border-github-border text-github-text-secondary transition-colors ${org.url
                                        ? 'hover:border-github-status-open/50 hover:text-github-status-open hover:bg-github-status-open/5 cursor-pointer'
                                        : ''
                                        }`}
                                >
                                    <Logo
                                        logo={org.logo}
                                        logoDomain={org.logoDomain}
                                        name={org.name}
                                        size={26}
                                    />
                                    <span className="text-[13.5px] font-mono">
                                        {org.name}
                                    </span>
                                    {org.url && (
                                        <ArrowUpRight
                                            size={13}
                                            className="opacity-40 group-hover:opacity-100 -translate-y-[1px]"
                                        />
                                    )}
                                </Wrapper>
                            );
                        })}
                    </div>
                </section>

                {/* -------------------- CONTACT -------------------- */}
                <section className="mt-20 pt-8 border-t border-dashed border-github-border/60">
                    <div className="font-mono text-[13px] text-github-text-secondary mb-3">
                        <Prompt>❯</Prompt> ./contact --purpose=&quot;let&apos;s build something&quot;
                    </div>
                    <p className="text-[15px] text-github-text leading-relaxed max-w-lg">
                        If you&apos;re working on LLM evaluation, hallucination detection,
                        RAG, or agentic AI systems — I&apos;d love to talk.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        <a
                            href={`mailto:${userConfig.email}`}
                            className="inline-flex items-center gap-1.5 px-3 py-2 text-[13px] font-mono border border-github-status-open/40 text-github-status-open rounded-sm hover:bg-github-status-open/10 transition-colors"
                        >
                            <Mail size={13} /> {userConfig.email}
                        </a>
                        {userConfig.meetingLink && (
                            <a
                                href={userConfig.meetingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-2 text-[13px] font-mono border border-github-border rounded-sm hover:border-github-text-secondary hover:bg-github-bg-secondary transition-colors"
                            >
                                book a slot <ArrowUpRight size={13} />
                            </a>
                        )}
                    </div>
                </section>

                <footer className="mt-16 text-[11px] font-mono text-github-text-secondary/70">
                    <Prompt>$</Prompt> exit 0
                </footer>
            </div>
        </div>
    );
};

export default HomePage;
