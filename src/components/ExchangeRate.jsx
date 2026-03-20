import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign } from 'lucide-react';

export default function ExchangeRate() {
    const [rate, setRate] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRate = async () => {
            try {
                const response = await fetch('/api/gold');
                const data = await response.json();
                if (data.rate) {
                    setRate(data.rate);
                }
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch exchange rate:", error);
                setLoading(false);
            }

        };

        fetchRate();

        // Refresh every hour
        const interval = setInterval(fetchRate, 3600000);
        return () => clearInterval(interval);
    }, []);

    if (loading) return null;
    if (!rate) return null;

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
            {/* Icon */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.7, color: '#10b981' }}>
                <TrendingUp size={14} />
                <span style={{ textTransform: 'uppercase', color: 'var(--text-main)' }}>USD/EGP</span>
            </div>

            {/* Vertical Separator */}
            <div style={{ width: '1px', height: '12px', background: 'var(--grid-line)' }}></div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                    fontWeight: 'bold',
                    color: 'var(--text-main)',
                    letterSpacing: '0.5px'
                }}>
                    {rate.toFixed(2)}
                </span>
                <span style={{ opacity: 0.6, fontSize: '0.65rem' }}>LE</span>
            </div>
        </div>
    );
}
