import React from 'react';
import './RamadanDecorations.css';

const RamadanDecorations = () => {
    // Shared color variables for consistency
    const goldColor = 'var(--ramadan-gold, #FFD700)';

    return (
        <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">

            {/* 1. TOP ISLAMIC FRIEZE */}
            <div className="ramadan-frieze" />

            {/* 2. BOTTOM MOSQUE SILHOUETTE */}
            <div className="ramadan-mosque-skyline">
                {/* Right Side Dome Cluster */}
                <div className="mosque-right">
                    {/* Big Dome */}
                    <div style={{
                        width: '120px', height: '80px',
                        background: goldColor,
                        borderRadius: '60px 60px 0 0',
                        marginRight: '-20px'
                    }}>
                        <div style={{ width: '4px', height: '20px', background: goldColor, margin: '-20px auto 0', position: 'relative' }}>
                            <div style={{ width: '10px', height: '10px', borderRight: '2px solid ' + goldColor, borderBottom: '2px solid ' + goldColor, transform: 'rotate(45deg)', position: 'absolute', top: '-5px', left: '-3px' }}></div>
                        </div>
                    </div>
                    {/* Small Dome */}
                    <div style={{
                        width: '80px', height: '50px',
                        background: goldColor,
                        borderRadius: '40px 40px 0 0',
                        opacity: 0.8
                    }}></div>
                    {/* Minaret */}
                    <div style={{
                        width: '15px', height: '140px',
                        background: goldColor,
                        marginLeft: '-10px',
                        marginBottom: '0',
                        borderRadius: '2px 2px 0 0',
                        position: 'relative'
                    }}>
                        <div style={{ width: '20px', height: '6px', background: goldColor, position: 'absolute', top: '20px', left: '-2.5px', borderRadius: '2px' }}></div>
                    </div>
                </div>

                {/* Left Side Minaret */}
                <div className="mosque-left">
                    <div style={{
                        width: '12px', height: '100px',
                        background: goldColor,
                        borderRadius: '2px 2px 0 0',
                        opacity: 0.6
                    }}></div>
                </div>
            </div>

        </div>
    );
};

export default RamadanDecorations;