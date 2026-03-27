import React, { useState, useEffect } from 'react';
import { Package } from 'lucide-react';

export default function FreeLoot() {
    const [loot, setLoot] = useState(null);
    const [loading, setLoading] = useState(true);
    const [platform, setPlatform] = useState('epic-games-store'); // default to epic

    const platforms = [
        { id: 'epic-games-store', label: 'EPIC', color: '#f43f5e' },
        { id: 'steam', label: 'STEAM', color: '#10b981' },
        { id: 'gog-com', label: 'GOG', color: '#6366f1' },
    ];

    const cyclePlatform = () => {
        setPlatform(prev => {
            const index = platforms.findIndex(p => p.id === prev);
            return platforms[(index + 1) % platforms.length].id;
        });
    };

    useEffect(() => {
        const fetchLoot = async () => {
            const CACHE_KEY = `ezz_loot_cache_${platform}`;
            const CACHE_TIME = 21600000; // 6 hours

            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                const { loot: cachedLoot, timestamp } = JSON.parse(cached);
                if (Date.now() - timestamp < CACHE_TIME) {
                    setLoot(cachedLoot);
                    setLoading(false);
                    return;
                }
            }

            setLoading(true);
            try {
                const proxyUrl = `/api/loot?platform=${platform}`;

                const response = await fetch(proxyUrl);
                const data = await response.json();

                if (data.loot) {
                    setLoot(data.loot);
                    // Cache the result
                    localStorage.setItem(CACHE_KEY, JSON.stringify({
                        loot: data.loot,
                        timestamp: Date.now()
                    }));
                } else {
                    setLoot(null);
                }
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch free loot:", error);
                setLoading(false);
            }

        };


        fetchLoot();
        const interval = setInterval(fetchLoot, 3600000 * 6);
        return () => clearInterval(interval);
    }, [platform]);

    if (loading && !loot) return null;

    const currentPlatform = platforms.find(p => p.id === platform);

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
            height: 'fit-content',
            cursor: 'pointer'
        }}
            onClick={cyclePlatform}
            title={`Showing ${currentPlatform.label} deals - Click to cycle`}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.7, color: currentPlatform.color }}>
                <Package size={14} />
                <span style={{ textTransform: 'uppercase', color: 'var(--text-main)' }}>
                    SCANNING: {currentPlatform.label}
                </span>
            </div>

            <div style={{ width: '1px', height: '12px', background: 'var(--grid-line)' }}></div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {loot ? (
                    <>
                        <a
                            href={loot.open_giveaway_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                fontWeight: 'bold',
                                color: 'var(--neon-blue)',
                                textDecoration: 'none',
                                borderBottom: '1px solid var(--neon-blue)'
                            }}
                        >
                            {loot.title}
                        </a>
                        <span style={{ opacity: 0.6, fontSize: '0.65rem' }}>on {loot.platforms}</span>
                    </>
                ) : (
                    <span style={{ opacity: 0.6 }}>No deals found</span>
                )}
            </div>

        </div>
    );
}

