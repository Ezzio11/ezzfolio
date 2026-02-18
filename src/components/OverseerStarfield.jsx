
import React, { useEffect, useRef } from 'react';

export default function OverseerStarfield() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Resize function using parent container Dimensions
        const resize = () => {
            // Check if parent node exists
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
            } else {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        };

        // Initial resize
        resize();

        // Listen to window resize (still good as backup)
        window.addEventListener('resize', resize);

        // If ResizeObserver is supported, observe the parent
        let resizeObserver;
        if (typeof ResizeObserver !== 'undefined' && canvas.parentElement) {
            resizeObserver = new ResizeObserver(() => resize());
            resizeObserver.observe(canvas.parentElement);
        }

        // Generate stars
        const stars = [];
        // Density: roughly 1 star per 2000px^2
        const density = (canvas.width * canvas.height) / 2000;
        const starCount = Math.max(50, Math.min(300, density)); // Clamp between 50 and 300

        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.8 + 0.2,
                speed: Math.random() * 0.02 + 0.01,
            });
        }

        // Animation loop
        let animationId;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            stars.forEach((star) => {
                // Twinkle effect
                star.opacity += (Math.random() - 0.5) * 0.02;
                star.opacity = Math.max(0.1, Math.min(1, star.opacity));

                // Move stars slowly? (Optional, let's keep them static-ish with just twinkle for now to save perf on cards)
                // Optional: slow drift
                // star.x = (star.x + star.speed) % canvas.width;

                // Draw star
                ctx.fillStyle = `rgba(200, 220, 255, ${star.opacity})`;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            if (resizeObserver) resizeObserver.disconnect();
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0, // Behind content
                opacity: 0.6,
                pointerEvents: 'none'
            }}
        />
    );
}
