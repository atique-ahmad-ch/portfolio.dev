import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle } from 'lucide-react';
import GithubLogo from '../components/GithubLogo';
import ThemeToggle from '../components/ThemeToggle';

const LoginPage = ({ onLogin, autoLoggingIn }) => {
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    if (autoLoggingIn) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-github-bg-tertiary p-6 animate-pulse">
                <GithubLogo size={48} className="text-github-text-secondary opacity-50 mb-4" />
                <p className="text-sm text-github-text-secondary font-medium tracking-wide">
                    Authenticating automatically...
                </p>
            </div>
        );
    }

    const handleSubmit = async () => {
        if (!token || !username) {
            setError('Please provide both a GitHub username and access token.');
            return;
        }
        setLoading(true);
        setError(null);

        try {
            await onLogin(username, token);
            navigate('/home');
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-github-bg-tertiary p-6">
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>
            <div className="w-full max-w-sm">
                <div className="flex justify-center mb-8">
                    <GithubLogo size={48} className="text-github-text" />
                </div>
                <h1 className="text-2xl font-light text-center text-github-text mb-6">
                    Sign in to <span className="font-bold">GitMe</span>
                </h1>
                <div className="bg-github-bg-secondary border border-github-border rounded-lg p-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-github-text mb-1.5">
                                GitHub Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                placeholder="e.g. torvalds"
                                className="w-full h-8 px-3 text-sm rounded-md border border-github-border bg-github-bg focus:border-github-accent focus:ring-1 focus:ring-github-accent outline-none transition-all text-github-text placeholder:text-github-text-secondary/50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-github-text mb-1.5">
                                Personal Access Token
                            </label>
                            <input
                                type="password"
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                placeholder="ghp_..."
                                className="w-full h-8 px-3 text-sm rounded-md border border-github-border bg-github-bg focus:border-github-accent focus:ring-1 focus:ring-github-accent outline-none transition-all text-github-text placeholder:text-github-text-secondary/50"
                            />
                        </div>
                        {error && (
                            <div className="flex items-start gap-2 text-github-status-closed text-xs bg-github-status-closed/10 p-3 rounded-md border border-github-status-closed/20">
                                <AlertCircle size={14} className="mt-0.5 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full h-8 bg-github-accent-success hover:brightness-110 text-white font-semibold text-sm rounded-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={14} />
                                    Fetching Profile...
                                </>
                            ) : (
                                'Sign in'
                            )}
                        </button>
                    </div>
                </div>
                <p className="mt-4 text-[11px] text-github-text-secondary text-center leading-relaxed">
                    Your token is used only in your browser to query the GitHub GraphQL API,
                    kept in React state, and discarded when you sign out or close the tab.<br />
                    It is never persisted, never sent to any server run by this site,
                    and never included in a build published to GitHub Pages.
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
