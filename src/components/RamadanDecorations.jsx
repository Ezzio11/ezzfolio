import React from 'react';

const RamadanDecorations = () => {
    // Shared color variables for consistency
    const goldColor = 'var(--ramadan-gold, #FFD700)';

    return (
        <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">

            {/* 1. TOP ISLAMIC FRIEZE 
               Replaces the simple border with a highly intricate laser-cut SVG pattern
            */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '40px', // Slightly taller for detail
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='40' viewBox='0 0 80 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='islamic-arch' x='0' y='0' width='80' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0,0 L80,0 L80,5 L0,5 Z' fill='%23DAA520' opacity='0.8'/%3E%3Cpath d='M0,5 L10,5 Q20,5 20,15 L20,25 Q20,35 40,35 Q60,35 60,25 L60,15 Q60,5 70,5 L80,5' fill='none' stroke='%23DAA520' stroke-width='2'/%3E%3Cpath d='M40,35 L40,40' stroke='%23DAA520' stroke-width='2'/%3E%3Ccircle cx='40' cy='32' r='3' fill='%23DAA520'/%3E%3Cpath d='M10,5 L10,15 L5,20 M70,5 L70,15 L75,20' stroke='%23DAA520' stroke-width='1.5' fill='none'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23islamic-arch)'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat-x',
                zIndex: 40,
                filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.3))'
            }} />

            {/* 2. BOTTOM MOSQUE SILHOUETTE 
               Anchors the page with a subtle skyline.
            */}
            <div style={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                height: '150px',
                zIndex: 0, // Behind content
                opacity: 0.1, // Very subtle
                pointerEvents: 'none',
                maskImage: 'linear-gradient(to top, black 20%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent 100%)'
            }}>
                {/* Right Side Dome Cluster */}
                <div style={{ position: 'absolute', bottom: 0, right: '5%', display: 'flex', alignItems: 'flex-end' }}>
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

                {/* Left Side Minaret (Balancing the composition) */}
                <div style={{ position: 'absolute', bottom: 0, left: '5%', display: 'flex', alignItems: 'flex-end' }}>
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