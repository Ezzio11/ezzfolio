import React, { useState, Suspense } from 'react';
import Hero from './components/Hero';
import Clock from './components/Clock';
import { Sun, Moon } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

const Work = React.lazy(() => import('./components/Work'));

export default function App() {
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
        document.body.classList.toggle('light-mode');
    };

    return (
        <div style={{ minHeight: '100vh', position: 'relative', width: '100%' }}>
            <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100 }}>
                <button onClick={toggleTheme} className="theme-toggle" style={{ position: 'relative', bottom: 'auto', right: 'auto' }} aria-label="Toggle Light/Dark Mode">
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </div>
            <div className="main-container">
                <Hero />
                <main>
                    <Suspense fallback={<div style={{ height: '50vh' }} />}>
                        <Work />
                    </Suspense>
                </main>
                <footer className="footer-status">
                    <Clock />
                    <p>© 2026 Ezz Eldin Ahmed. All rights reserved.</p>
                </footer>
            </div>
            <Analytics />
        </div>
    );
}
