import React, { useState, useEffect } from 'react';
import { Database } from 'lucide-react';

export default function GoldPrice() {
    const [price, setPrice] = useState(null);
    const [delta, setDelta] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGoldPrice = async () => {
            const CACHE_KEY = 'ezz_gold_data';
            const CACHE_TIME = 3600000; // 1 hour
            
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                const { price: cachedPrice, delta: cachedDelta, timestamp } = JSON.parse(cached);
                if (Date.now() - timestamp < CACHE_TIME) {
                    setPrice(cachedPrice);
                    setDelta(cachedDelta);
                    setLoading(false);
                    return;
                }
            }

            try {
                const response = await fetch('/api/gold');
                const data = await response.json();
                
                if (data.error) throw new Error(data.error);

                const pricePerGram21kEGP = data.price21k;
                setPrice(pricePerGram21kEGP);

                // Simple delta tracking via localStorage
                let currentDelta = null;
                const lastPrice = localStorage.getItem('last_gold_price');
                if (lastPrice) {
                    currentDelta = pricePerGram21kEGP - parseFloat(lastPrice);
                    setDelta(currentDelta);
                }
                localStorage.setItem('last_gold_price', pricePerGram21kEGP.toString());

                // Cache the full result
                localStorage.setItem(CACHE_KEY, JSON.stringify({
                    price: pricePerGram21kEGP,
                    delta: currentDelta,
                    timestamp: Date.now()
                }));
                
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch gold price:", error);
                setLoading(false);
            }

        };


        fetchGoldPrice();
        const interval = setInterval(fetchGoldPrice, 3600000); // Hourly
        return () => clearInterval(interval);
    }, []);

    if (loading || !price) return null;

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
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.7, color: '#fbbf24' }}>
                <Database size={14} />
                <span style={{ textTransform: 'uppercase', color: 'var(--text-main)' }}>GOLD 21K</span>
            </div>

            <div style={{ width: '1px', height: '12px', background: 'var(--grid-line)' }}></div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 'bold' }}>{Math.round(price).toLocaleString()}</span>
                <span style={{ opacity: 0.6, fontSize: '0.65rem' }}>EGP/g</span>
                {delta !== null && (
                    <span style={{ 
                        color: delta >= 0 ? '#10b981' : '#ef4444',
                        fontSize: '0.65rem',
                        fontWeight: 'bold'
                    }}>
                        {delta >= 0 ? '▲' : '▼'}{Math.abs(Math.round(delta))}
                    </span>
                )}
            </div>
        </div>
    );
}
