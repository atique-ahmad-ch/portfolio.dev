import React from 'react';
import GithubLogo from './GithubLogo';
import { Heart } from 'lucide-react';
import userConfig from '../../userConfig';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-github-border bg-github-bg-secondary py-6 mt-auto">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                        <GithubLogo size={18} className="text-github-text-secondary opacity-40 hover:opacity-100 transition-opacity cursor-pointer" />
                        <div className="flex flex-col leading-tight">
                            <p className="text-[12px] text-github-text-secondary/70">
                                &copy; {currentYear}{' '}
                                <span className="text-github-text-secondary font-semibold">
                                    {userConfig.name}
                                </span>
                            </p>
                            <p className="text-[10px] text-github-text-secondary/50">
                                Built on{' '}
                                <span className="text-github-text-secondary/70 font-semibold">
                                    GitMe
                                </span>
                                . Engineered for impact.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4 text-[11px] font-medium text-github-text-secondary/60">
                            <a
                                href={userConfig.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-github-text-link transition-colors"
                            >
                                GitHub
                            </a>
                            <a
                                href={userConfig.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-github-text-link transition-colors"
                            >
                                LinkedIn
                            </a>
                            <a
                                href={`mailto:${userConfig.email}`}
                                className="hover:text-github-text-link transition-colors"
                            >
                                Contact
                            </a>
                        </div>

                        <a
                            href={userConfig.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-github-bg border border-github-border rounded-full text-[10px] text-github-text-secondary hover:border-github-text-secondary/50 hover:bg-github-border/10 transition-all cursor-pointer select-none"
                        >
                            <span>Made with</span>
                            <Heart size={10} className="text-github-status-closed fill-github-status-closed" />
                            <span>by</span>
                            <span className="text-github-text font-bold">{userConfig.name}</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
