import React, { useState, useEffect } from 'react';

export default function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDate = (date) => {
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).toUpperCase();
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour12: false });
    };

    return (
        <div style={{
            fontSize: '0.9rem',
            color: 'var(--text-dim)',
            fontFamily: 'IBM Plex Mono, monospace',
            display: 'flex',
            gap: '1rem'
        }}>
            <span>{formatDate(time)}</span>
            <span>{formatTime(time)}</span>
        </div>
    );
}
