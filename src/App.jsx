import React, { useState, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
// Lazy load heavy variants to split bundle
const ProjectList = React.lazy(() => import('./components/ProjectList'));
const Blog = React.lazy(() => import('./components/Blog'));
import Background from './components/Background';
import RamadanBackground from './components/RamadanBackground';
import Clock from './components/Clock';
import { Sun, Moon, Snowflake, Star, Zap } from 'lucide-react';
import RamadanOverlay from './components/RamadanOverlay';
import ComplexLantern from './components/ComplexLantern';
import RamadanDecorations from './components/RamadanDecorations';
import SnowOverlay from './components/SnowOverlay';
import RamadanCountdown from './components/RamadanCountdown';

import { Analytics } from "@vercel/analytics/react"

export default function App() {
    const [theme, setTheme] = useState('dark');
    const [currentTheme, setCurrentTheme] = useState('ramadan'); // 'ramadan' | 'winter' | 'normal'
    const location = useLocation();

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.body.classList.toggle('light-mode');
    };

    const toggleCurrentTheme = () => {
        setCurrentTheme(prev => {
            if (prev === 'ramadan') return 'winter';
            if (prev === 'winter') return 'normal';
            return 'ramadan';
        });
    };

    return (
        <div
            className={currentTheme === 'ramadan' ? 'ramadan-theme' : ''}
            style={{
                minHeight: '100vh',
                position: 'relative',
                width: '100%'
            }}
        >
            <div style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                zIndex: 100,
                display: 'flex',
                gap: '12px',
                alignItems: 'center'
            }}>
                {/* Light/Dark Toggle */}
                <button
                    onClick={toggleTheme}
                    className="theme-toggle"
                    style={{ position: 'relative', bottom: 'auto', right: 'auto' }}
                    aria-label="Toggle Light/Dark Mode"
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </div>

            {/* Render Background based on Theme */}
            {currentTheme === 'ramadan' ? (
                <>
                    <RamadanBackground />
                    <RamadanOverlay />
                    <ComplexLantern />
                    <RamadanDecorations />
                </>
            ) : (
                <>
                    {/* Normal & Winter share the default grid background */}
                    <Background />
                    {/* Only Winter gets snow */}
                    {currentTheme === 'winter' && <SnowOverlay />}
                </>
            )}


            <div className="main-container">
                <Hero currentTheme={currentTheme} />

                <main>
                    <Suspense fallback={<div style={{ height: '50vh' }} />}>
                        <ProjectList theme={theme} />
                        <Blog theme={theme} />
                    </Suspense>
                </main>

                <footer className="footer-status">
                    <Clock />
                    {currentTheme === 'ramadan' && (
                        <p style={{
                            fontFamily: "'Reem Kufi', sans-serif",
                            color: 'var(--ramadan-gold)',
                            fontSize: '1.2rem',
                            margin: '0.5rem 0'
                        }}>
                            Happy Ramadan Yall!
                        </p>
                    )}
                    <p>© 2026 Ezz Eldin Ahmed. All rights reserved.</p>
                </footer>
            </div>
            <Analytics />
        </div>
    );
}
