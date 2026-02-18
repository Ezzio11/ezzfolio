import React, { useState, useEffect } from 'react';
import RamadanCountdown from './RamadanCountdown';

export default function Hero({ currentTheme }) {
    const [activeSocial, setActiveSocial] = useState(null);
    const [text, setText] = useState('');
    const fullText = "Ezz Eldin Ahmed";

    // Typewriter Effect
    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 50); // Speed of typing
        return () => clearInterval(interval);
    }, []);

    const socialItems = [
        { id: 'gh', url: 'https://github.com/Ezzio11', label: 'GitHub', icon: <><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></> },
        { id: 'li', url: 'https://www.linkedin.com/in/ezzeldinahmed', label: 'LinkedIn', icon: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></> },
        { id: 'em', url: 'mailto:ezzeldinahmad96@gmail.com', label: 'Email', icon: <><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></> },
        { id: 'cv', url: '/assets/docs/resume.pdf', label: 'Resume', icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></> }
    ];

    return (
        <div style={{ marginBottom: '3rem', textAlign: 'left' }}>
            <h1 className="glitch-text hero-title">
                {text}
            </h1>
            <div
                className="animate-fade-up"
                style={{
                    color: 'var(--text-dim)', // Base color
                    fontSize: '1.1rem', // Slightly larger
                    maxWidth: '540px', // More breathing room
                    lineHeight: '1.6',
                    animationDelay: '0.8s',
                    fontWeight: 400 // Normal weight for better legibility
                }}
            >
                <div style={{ marginBottom: '2rem' }}>
                    <p style={{ margin: 0, marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>Statistics Major</span> turned <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>Full-Stack Systems Developer</span>.
                    </p>
                    <p style={{ margin: 0 }}>
                        I love all things design, development, or analysis. Always up for a challenge or a collaboration (or a challenging collaboration..?)
                    </p>
                    <p style={{ marginTop: '1rem', fontSize: '0.95rem', fontStyle: 'italic' }}>
                        PSA: If you enjoy creative engineering and interactive data, bookmark this site. I ship new experiments frequently. :D
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    {socialItems.map((social, index) => (
                        <a
                            key={social.id}
                            href={social.url}
                            target={social.id === 'em' ? undefined : "_blank"}
                            rel={social.id === 'em' ? undefined : "noopener noreferrer"}
                            className={`social-link ${activeSocial === social.id ? 'is-active' : ''} animate-pop-in`}
                            aria-label={social.label}
                            style={{ animationDelay: `${1 + (index * 0.1)}s` }}
                            onClick={(e) => {
                                if (activeSocial !== social.id) {
                                    e.preventDefault();
                                    setActiveSocial(social.id);
                                }
                            }}
                            onMouseLeave={() => setActiveSocial(null)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                {social.icon}
                            </svg>
                        </a>
                    ))}

                    {/* Ramadan Widget (Inline) */}
                    {currentTheme === 'ramadan' && <RamadanCountdown />}
                </div>
            </div>
        </div>
    );
}
