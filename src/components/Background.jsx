import React, { useEffect, useRef } from 'react';
import './Background.css';

/**
 * Background Component
 * Renders the background in two layers (Grid, Shapes) and applies
 * differential 3D parallax to create depth.
 */
export default React.memo(function Background() {
    const gridRef = useRef(null);
    const shapesRef = useRef(null);

    // Track mouse movement
    useEffect(() => {
        const handleMouseMove = (e) => {
            const { innerWidth: width, innerHeight: height } = window;

            // Normalized coordinates (-1 to 1 approx)
            const x = (e.clientX - width / 2) / 20;
            const y = (e.clientY - height / 2) / 20;

            if (gridRef.current) {
                gridRef.current.style.transform = `
                    perspective(1000px)
                    translate3d(${x * 0.5}px, ${y * 0.5}px, 0)
                    rotateX(${y * 0.05}deg) 
                    rotateY(${x * 0.05}deg)
                    scale(1.1)
                `;
            }

            if (shapesRef.current) {
                shapesRef.current.style.transform = `
                    perspective(1000px)
                    translate3d(${x * 1.5}px, ${y * 1.5}px, 50px)
                    rotateX(${y * 0.15}deg) 
                    rotateY(${x * 0.15}deg)
                    scale(1.1)
                `;
            }
        };

        // Only enable parallax on devices that support hover (desktop)
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="background-container">
            {/* Layer 1: The Grid (Background) */}
            <div
                ref={gridRef}
                className="parallax-layer layer-grid"
                style={{
                    willChange: 'transform',
                    transition: 'transform 0.1s ease-out' // Smooth out pure JS updates
                }}
            />

            {/* Layer 2: The Shapes (Foreground) */}
            <div
                ref={shapesRef}
                className="parallax-layer layer-shapes"
                style={{
                    willChange: 'transform',
                    transition: 'transform 0.1s ease-out'
                }}
            />

            {/* Layer 3: Editorial Accents (Registration Marks) */}
            <div className="parallax-layer layer-accents">
                {/* Crosshairs */}
                <div className="accent-mark crosshair" style={{ top: '20%', left: '15%' }}>+</div>
                <div className="accent-mark crosshair" style={{ top: '80%', left: '85%' }}>+</div>
                <div className="accent-mark crosshair" style={{ top: '15%', left: '90%' }}>+</div>

                {/* Lines */}
                <div className="accent-mark v-line" style={{ top: '40%', left: '5%', height: '100px' }}></div>
                <div className="accent-mark h-line" style={{ bottom: '10%', right: '20%', width: '100px' }}></div>
            </div>
        </div>
    );
});
