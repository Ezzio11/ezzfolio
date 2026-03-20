import React, { useState, useEffect } from 'react';
import { Target } from 'lucide-react';

export default function FootballMatch() {
    const [match, setMatch] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMatch = async () => {
            const CACHE_KEY = 'ezz_football_cache';
            const CACHE_TIME = 10800000; // 3 hours
            
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                const { match: cachedMatch, timestamp } = JSON.parse(cached);
                if (Date.now() - timestamp < CACHE_TIME) {
                    setMatch(cachedMatch);
                    setLoading(false);
                    return;
                }
            }

            try {
                const today = new Date().toISOString().split('T')[0];
                const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                const proxyUrl = `/api/football?dateFrom=${today}&dateTo=${nextWeek}`;
                
                const response = await fetch(proxyUrl);
                const data = await response.json();

                if (data.match) {
                    setMatch(data.match);

                    // Cache the result
                    localStorage.setItem(CACHE_KEY, JSON.stringify({
                        match: data.match,
                        timestamp: Date.now()
                    }));
                } else {
                    setMatch(null);
                }
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch football match:", error);
                setLoading(false);
            }

        };

        fetchMatch();
        // Since it's a "today's match" widget, refresh every few hours or on mount
        const interval = setInterval(fetchMatch, 3600000 * 3); 
        return () => clearInterval(interval);
    }, []);

    if (loading || !match) return null;

    const matchDate = new Date(match.utcDate);
    const isToday = new Date().toDateString() === matchDate.toDateString();
    const matchTime = matchDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const matchDay = matchDate.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

    return (
        <div className="animate-fade-up" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: 'var(--terminal-bg)',
            border: '1px solid var(--grid-line)',
            borderRadius: '50px',
            padding: '6px 14px',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
            color: 'var(--text-main)',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.75rem',
            width: 'fit-content',
            height: 'fit-content'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.7, color: '#3b82f6' }}>
                <Target size={14} />
                <span style={{ textTransform: 'uppercase', color: 'var(--text-main)' }}>
                    {isToday ? 'TARGET ACQUIRED' : 'NEXT MATCH'}: {match.competition.code}
                </span>
            </div>

            <div style={{ width: '1px', height: '12px', background: 'var(--grid-line)' }}></div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 'bold' }}>
                    {match.homeTeam.shortName || match.homeTeam.name} vs {match.awayTeam.shortName || match.awayTeam.name}
                </span>
                <span style={{ opacity: 0.6, fontSize: '0.65rem' }}>
                    {isToday ? matchTime : `${matchDay} ${matchTime}`}
                </span>
            </div>
        </div>
    );
}

