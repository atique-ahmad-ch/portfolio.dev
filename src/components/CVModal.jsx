import React from 'react';
import { X, FileText, ExternalLink, Download } from 'lucide-react';

const CVModal = ({ isOpen, onClose, username }) => {
    if (!isOpen) return null;

    // Use absolute path relative to the site base
    const cvUrl = `${import.meta.env.BASE_URL}cv/${username}.pdf`;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="bg-github-bg border border-github-border rounded-lg shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-github-border bg-github-bg-secondary">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-github-accent/10 rounded-md text-github-accent">
                            <FileText size={18} />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-github-text">Curriculum Vitae</h3>
                            <p className="text-[11px] text-github-text-secondary leading-none mt-0.5">{username}.pdf</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <a
                            href={cvUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-github-text-secondary hover:text-github-text hover:bg-github-border/40 rounded-md transition-colors"
                            title="Open in new tab"
                        >
                            <ExternalLink size={16} />
                        </a>
                        <a
                            href={cvUrl}
                            download
                            className="p-2 text-github-text-secondary hover:text-github-text hover:bg-github-border/40 rounded-md transition-colors"
                            title="Download CV"
                        >
                            <Download size={16} />
                        </a>
                        <div className="w-[1px] h-4 bg-github-border mx-1" />
                        <button
                            onClick={onClose}
                            className="p-2 text-github-text-secondary hover:text-github-status-closed hover:bg-github-accent-danger/10 rounded-md transition-colors"
                            title="Close"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-github-bg-tertiary relative overflow-hidden group">
                    <iframe
                        src={`${cvUrl}#toolbar=1`}
                        className="w-full h-full border-none bg-github-bg-tertiary"
                        title={`${username}'s CV`}
                    />
                </div>

                {/* Footer */}
                <div className="px-4 py-2 bg-github-bg-secondary border-t border-github-border flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-3 py-1.5 text-xs font-semibold text-github-text bg-github-bg border border-github-border rounded-md hover:bg-github-border/20 transition-all focus:outline-none focus:ring-2 focus:ring-github-accent focus:ring-offset-2 focus:ring-offset-github-bg"
                    >
                        Done
                    </button>
                </div>
            </div>
            {/* Background click listener */}
            <div className="absolute inset-0 -z-10 cursor-default" onClick={onClose} />
        </div>
    );
};

export default CVModal;
