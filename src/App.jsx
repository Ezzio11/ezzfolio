import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import ProjectList from './components/ProjectList';
import Blog from './components/Blog';
import Background from './components/Background';
import Clock from './components/Clock';
import { Sun, Moon } from 'lucide-react';
import SnowOverlay from './components/SnowOverlay';

export default function App() {
    const [theme, setTheme] = useState('dark');
    const location = useLocation();

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.body.classList.toggle('light-mode');
    };

    return (
        <div style={{
            minHeight: '100vh',
            position: 'relative',
            width: '100%'
        }}>
            <button
                onClick={toggleTheme}
                className="theme-toggle"
                aria-label="Toggle Theme"
            >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Background />
            <SnowOverlay />


            <div className="main-container">
                <Hero />

                <main>
                    <ProjectList theme={theme} />
                    <Blog theme={theme} />
                </main>

                <footer className="footer-status">
                    <Clock />
                    <p>© 2026 Ezz Eldin Ahmed. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}
