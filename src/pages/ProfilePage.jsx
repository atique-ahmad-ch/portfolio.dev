import React, { useState, useRef, useEffect } from 'react';
import {
    Search,
    ChevronDown,
    LayoutGrid,
    List,
    CheckCircle2,
    Clock,
    XCircle,
    Scale,
    GitPullRequest,
} from 'lucide-react';

const CATEGORIES = {
    PULL_REQUESTS: 'Pull Requests',
    ISSUES: 'Issues',
    DISCUSSIONS: 'Discussions',
};

const STATUS_OPTIONS = {
    OPEN: { label: 'Open', color: 'text-github-status-open' },
    CLOSED: { label: 'Closed', color: 'text-github-status-closed' },
    MERGED: { label: 'Merged', color: 'text-github-status-merged' },
};

const ProfilePage = ({ data }) => {
    const [activeTab, setActiveTab] = useState('PULL_REQUESTS');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [activeFilters, setActiveFilters] = useState([]);
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsFilterDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleFilter = (filterKey) => {
        setActiveFilters((prev) =>
            prev.includes(filterKey) ? prev.filter((k) => k !== filterKey) : [...prev, filterKey]
        );
    };

    const filterItems = (nodes) => {
        if (!nodes) return [];
        let filtered = nodes;
        const q = searchQuery.toLowerCase().trim();
        if (q) {
            filtered = filtered.filter(
                (item) =>
                    item.title.toLowerCase().includes(q) ||
                    item.repository.nameWithOwner.toLowerCase().includes(q)
            );
        }
        if (activeFilters.length > 0 && activeTab !== 'DISCUSSIONS') {
            filtered = filtered.filter((item) => activeFilters.includes(item.state));
        }
        return filtered;
    };

    const renderCard = (item, type) => {
        const isPR = type === 'PR';
        const date = new Date(item.createdAt).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
        const lang = item.repository.primaryLanguage;
        const license = item.repository.licenseInfo;

        return (
            <div
                key={item.url}
                className="bg-github-bg-secondary border border-github-border rounded-md hover:border-github-text-secondary/30 transition-all flex flex-col group p-4"
            >
                {/* Header */}
                <div className="flex justify-between items-start mb-2">
                    <div className="flex flex-col gap-1 min-w-0">
                        <span className="text-xs font-medium text-github-text-secondary">
                            {item.repository.nameWithOwner}
                        </span>
                        <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[15px] font-semibold text-github-text-link hover:underline leading-tight truncate"
                        >
                            {item.title}
                        </a>
                    </div>
                    {item.state && (
                        <span
                            className={`flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full border shrink-0 ml-3 ${item.state === 'MERGED'
                                ? 'bg-github-status-merged/10 text-github-status-merged border-github-status-merged/20'
                                : item.state === 'OPEN'
                                    ? 'bg-github-status-open/10 text-github-status-open border-github-status-open/20'
                                    : 'bg-github-status-closed/10 text-github-status-closed border-github-status-closed/20'
                                }`}
                        >
                            {item.state === 'MERGED' ? (
                                <CheckCircle2 size={12} />
                            ) : item.state === 'OPEN' ? (
                                <Clock size={12} />
                            ) : (
                                <XCircle size={12} />
                            )}
                            {item.state.charAt(0) + item.state.slice(1).toLowerCase()}
                        </span>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-auto pt-3 flex items-center justify-between text-[12px] text-github-text-secondary border-t border-github-border/50">
                    <div className="flex items-center gap-4">
                        {lang && (
                            <div className="flex items-center gap-1.5">
                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: lang.color || '#8b949e' }} />
                                <span>{lang.name}</span>
                            </div>
                        )}
                        {license && (
                            <div className="flex items-center gap-1">
                                <Scale size={13} />
                                <span>{license.spdxId || license.name}</span>
                            </div>
                        )}
                    </div>
                    <span className="text-[11px] opacity-70">{date}</span>
                </div>
            </div>
        );
    };

    if (!data) return null;

    const getItems = () => {
        if (activeTab === 'PULL_REQUESTS') return filterItems(data.pullRequests?.nodes);
        if (activeTab === 'ISSUES') return filterItems(data.issues?.nodes);
        return filterItems(data.repositoryDiscussions?.nodes);
    };

    const items = getItems();

    return (
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
            {/* Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 border-b border-github-border pb-4">
                {/* Tabs */}
                <div className="flex items-center">
                    {Object.entries(CATEGORIES).map(([key, label]) => (
                        <button
                            key={key}
                            onClick={() => {
                                setActiveTab(key);
                                setActiveFilters([]);
                            }}
                            className={`px-4 py-2 text-sm font-medium transition-all relative ${activeTab === key
                                ? 'text-github-text border-b-2 border-github-status-closed'
                                : 'text-github-text-secondary hover:text-github-text'
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Search + Filter + View */}
                <div className="flex flex-1 items-center gap-3 max-w-xl">
                    <div className="relative flex-1 flex items-center bg-github-bg-tertiary border border-github-border rounded-md focus-within:border-github-accent focus-within:ring-1 focus-within:ring-github-accent transition-all">
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-github-text-secondary border-r border-github-border hover:bg-github-border/20 transition-all rounded-l-md"
                            >
                                <span>Status</span>
                                <ChevronDown size={14} />
                            </button>
                            {isFilterDropdownOpen && (
                                <div className="absolute top-full left-0 mt-1 w-44 bg-github-bg-secondary border border-github-border rounded-md shadow-2xl z-20 py-1">
                                    <div className="px-3 py-2 border-b border-github-border">
                                        <span className="text-[11px] font-bold text-github-text-secondary">Filter by state</span>
                                    </div>
                                    {Object.entries(STATUS_OPTIONS).map(([key, { label, color }]) => {
                                        if (key === 'MERGED' && activeTab !== 'PULL_REQUESTS') return null;
                                        if (activeTab === 'DISCUSSIONS') return null;
                                        const isActive = activeFilters.includes(key);
                                        return (
                                            <button
                                                key={key}
                                                onClick={() => toggleFilter(key)}
                                                className={`w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-github-accent/10 transition-colors ${isActive ? 'bg-github-accent/5' : ''
                                                    }`}
                                            >
                                                <span className={isActive ? 'font-bold text-github-text' : color}>{label}</span>
                                                {isActive && <CheckCircle2 size={12} className="text-github-accent" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                        <div className="flex items-center flex-1 px-3 gap-2">
                            <Search className="text-github-text-secondary shrink-0" size={14} />
                            <input
                                type="text"
                                placeholder="Filter results..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 py-1.5 bg-transparent outline-none text-[13px] text-github-text placeholder:text-github-text-secondary/50"
                            />
                        </div>
                    </div>

                    <div className="flex items-center border border-github-border rounded-md overflow-hidden bg-github-bg-tertiary">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 transition-all ${viewMode === 'grid' ? 'bg-github-border/30 text-github-text' : 'text-github-text-secondary hover:bg-github-border/10'
                                }`}
                        >
                            <LayoutGrid size={16} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-1.5 transition-all border-l border-github-border ${viewMode === 'list' ? 'bg-github-border/30 text-github-text' : 'text-github-text-secondary hover:bg-github-border/10'
                                }`}
                        >
                            <List size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Results */}
            {items.length > 0 ? (
                <div
                    className={
                        viewMode === 'grid'
                            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                            : 'flex flex-col gap-3'
                    }
                >
                    {activeTab === 'PULL_REQUESTS' && items.map((pr) => renderCard(pr, 'PR'))}
                    {activeTab === 'ISSUES' && items.map((issue) => renderCard(issue, 'ISSUE'))}
                    {activeTab === 'DISCUSSIONS' && items.map((disc) => renderCard(disc, 'DISCUSSION'))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 border border-github-border border-dashed rounded-lg bg-github-bg-secondary/30">
                    <GitPullRequest size={48} className="text-github-text-secondary opacity-20 mb-4" />
                    <p className="text-github-text-secondary font-medium">No results found.</p>
                </div>
            )}

            <div className="mt-8 text-[12px] text-github-text-secondary border-t border-github-border pt-4">
                Showing <strong className="text-github-text">{items.length}</strong> results
            </div>
        </div>
    );
};

export default ProfilePage;
