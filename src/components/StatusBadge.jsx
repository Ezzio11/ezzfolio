import React from 'react';

const StatusBadge = ({ theme }) => {
    const isRamadan = theme === 'ramadan';
    const accentColor = isRamadan ? 'var(--ramadan-gold)' : 'var(--neon-green)';
    
    return (
        <div className="status-badge animate-fade-in">
            <span className="status-dot-wrapper">
                <span className="status-dot" style={{ backgroundColor: accentColor }}></span>
                <span className="status-dot-ping" style={{ backgroundColor: accentColor }}></span>
            </span>
            <span className="status-text">Available for new projects</span>
            
            <style dangerouslySetInnerHTML={{ __html: `
                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 6px 14px;
                    background: rgba(0, 0, 0, 0.2);
                    border: 1px solid var(--grid-line);
                    border-radius: 50px;
                    margin-bottom: 2rem;
                    backdrop-filter: blur(4px);
                }

                .status-dot-wrapper {
                    position: relative;
                    display: flex;
                    height: 10px;
                    width: 10px;
                }

                .status-dot {
                    height: 10px;
                    width: 10px;
                    border-radius: 50%;
                }

                .status-dot-ping {
                    position: absolute;
                    height: 100%;
                    width: 100%;
                    border-radius: 50%;
                    animation: status-ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
                    opacity: 0.75;
                }

                .status-text {
                    font-family: 'IBM Plex Mono', monospace;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: var(--text-main);
                    opacity: 0.8;
                }

                @keyframes status-ping {
                    75%, 100% {
                        transform: scale(3.5);
                        opacity: 0;
                    }
                }
            `}} />
        </div>
    );
};

export default StatusBadge;
