import React, { useEffect, useRef } from "react";

class Snowflake {
    constructor(canvas, initial = false) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.radius = 0;
        this.speed = 0;
        this.alpha = 0;
        this.angle = 0;
        this.angleStep = 0;
        this.swayStrength = 0;

        this.reset(canvas, initial);
    }

    reset(canvas, initial = false) {
        this.x = Math.random() * canvas.width;
        this.y = initial ? Math.random() * canvas.height : -10;

        const randomBase = Math.random();
        this.z = Math.pow(randomBase, 3);

        this.radius = 0.5 + (this.z * 2);
        this.speed = 0.3 + (this.z * 2);
        this.alpha = 0.2 + (this.z * 0.6);

        this.angle = Math.random() * Math.PI * 2;
        this.angleStep = 0.005 + (this.z * 0.02);
        this.swayStrength = (Math.random() * 1) + 0.5;
    }

    update(canvas, wind) {
        this.y += this.speed;
        this.angle += this.angleStep;
        this.x += Math.sin(this.angle) * this.swayStrength + wind;

        if (this.y > canvas.height + 10) {
            this.reset(canvas, false);
        }

        if (this.x > canvas.width + 10) this.x = -10;
        if (this.x < -10) this.x = canvas.width + 10;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        if (this.radius > 3) {
            context.shadowBlur = this.radius / 2;
            context.shadowColor = `rgba(255, 255, 255, ${this.alpha * 0.5})`;
        } else {
            context.shadowBlur = 0;
        }

        context.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        context.fill();
    }
}

export default React.memo(function SnowOverlay() {
    const canvasRef = useRef(null);
    const animationFrameId = useRef(0);
    const particles = useRef([]);
    const mouseX = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Dynamic particle count based on screen width
        const isMobile = window.innerWidth < 768;
        const CONFIG = {
            particleCount: isMobile ? 400 : 800, // Reduced count for mobile
            windMultiplier: 0.02,
        };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Optional: Re-init particles on resize to adjust density if moving between breakpoints?
            // For now, keeping it simple to avoid jarring resets.
        };

        const handleMouseMove = (e) => {
            const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseX.current = normalizedX;
        };

        const initParticles = () => {
            particles.current = [];
            for (let i = 0; i < CONFIG.particleCount; i++) {
                particles.current.push(new Snowflake(canvas, true));
            }
        };

        const animate = () => {
            // Smart Pause: Stop rendering if tab is hidden
            if (document.hidden) {
                animationFrameId.current = requestAnimationFrame(animate);
                return;
            }

            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const currentWind = mouseX.current * 2 * CONFIG.windMultiplier * 10;

            particles.current.forEach((p) => {
                p.update(canvas, currentWind);
                p.draw(ctx);
            });

            animationFrameId.current = requestAnimationFrame(animate);
        };

        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("mousemove", handleMouseMove);

        resizeCanvas();
        initParticles();
        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-50 h-full w-full"
            aria-hidden="true"
            style={{
                position: 'fixed',
                top: 0, left: 0, width: '100vw', height: '100vh',
                pointerEvents: 'none',
                zIndex: 50, // On top of content
                opacity: 1,
                transition: "opacity 1000ms ease-in-out"
            }}
        />
    );
});
