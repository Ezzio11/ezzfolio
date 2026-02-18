import React, { useEffect, useRef } from "react";

class HangingDecoration {
    constructor(canvas, type, x) {
        this.reset(canvas, type, x);
    }

    reset(canvas, type, x) {
        // If x is provided, use it. Otherwise, calculate a safe valid position (Fallback)
        if (x !== undefined) {
            this.x = x;
        } else {
            // Fallback logic (should rarely be hit if initDecorations is smart)
            const edgePadding = 45;
            const safeZoneStart = Math.max(edgePadding + 10, canvas.width * 0.2);
            const safeZoneEnd = Math.min(canvas.width - edgePadding - 10, canvas.width * 0.8);

            const side = Math.random() < 0.5 ? 'left' : 'right';
            if (side === 'left') {
                this.x = edgePadding + Math.random() * (safeZoneStart - edgePadding);
            } else {
                this.x = safeZoneEnd + Math.random() * ((canvas.width - edgePadding) - safeZoneEnd);
            }
        }

        this.y = 0;

        // Randomize length for visual variety (shorter near center, longer near edges looks nice)
        this.length = 80 + Math.random() * 200;

        this.type = type || this.getRandomType();

        // Physics State
        this.angle = 0;
        this.angularVelocity = 0;
        this.angularAcceleration = 0;

        // Physical Properties
        this.damping = 0.985; // Slight friction
        this.invMass = 0.8 + Math.random() * 0.4;

        this.size = 18 + Math.random() * 12; // Slightly larger

        // Base color tone (Gold or Silver)
        this.isSilver = Math.random() > 0.7;
    }

    getRandomType() {
        const r = Math.random();
        if (r < 0.5) return 'lantern';
        if (r < 0.8) return 'crescent';
        return 'star';
    }

    // --- LATTICE PATTERN GENERATOR (Wireframe Style) ---
    getLatticePattern(ctx) {
        if (this.latticePattern) return this.latticePattern;

        // Create a small off-screen canvas for the pattern tile
        const patternCanvas = document.createElement('canvas');
        const pSize = 16; // Larger pattern for cleaner look
        patternCanvas.width = pSize;
        patternCanvas.height = pSize;
        const pCtx = patternCanvas.getContext('2d');

        // Draw Gold Wireframe (Flower of Life style)
        // We use lines instead of fills to avoid "black bits"

        const strokeColor = this.isSilver ? '#C0C0C0' : '#DAA520'; // Match wire color
        pCtx.strokeStyle = strokeColor;
        pCtx.lineWidth = 1.2;

        // 1. Center Circle (Full)
        pCtx.beginPath();
        pCtx.arc(pSize / 2, pSize / 2, pSize * 0.4, 0, Math.PI * 2);
        pCtx.stroke();

        // 2. Corner Arcs (Quarter circles to tile)
        pCtx.beginPath();
        pCtx.arc(0, 0, pSize * 0.4, 0, Math.PI * 2); // Top-Left
        pCtx.moveTo(pSize + pSize * 0.4, 0);
        pCtx.arc(pSize, 0, pSize * 0.4, 0, Math.PI * 2); // Top-Right
        pCtx.moveTo(0 + pSize * 0.4, pSize);
        pCtx.arc(0, pSize, pSize * 0.4, 0, Math.PI * 2); // Bottom-Left
        pCtx.moveTo(pSize + pSize * 0.4, pSize);
        pCtx.arc(pSize, pSize, pSize * 0.4, 0, Math.PI * 2); // Bottom-Right
        pCtx.stroke();

        this.latticePattern = ctx.createPattern(patternCanvas, 'repeat');
        return this.latticePattern;
    }

    // --- THE SECRET SAUCE: METALLIC SHADER ---
    getMetallicGradient(ctx, width, angle) {
        // Gradient runs perpendicular to the sway angle to simulate light source staying fixed
        // Simple version: just linear gradient across the width
        const gradient = ctx.createLinearGradient(-width / 2, 0, width / 2, 0);

        if (this.isSilver) {
            gradient.addColorStop(0, '#707070');   // Dark Grey
            gradient.addColorStop(0.2, '#E0E0E0'); // Bright Silver Highlight
            gradient.addColorStop(0.5, '#A0A0A0'); // Mid Silver
            gradient.addColorStop(0.8, '#D0D0D0'); // Specular
            gradient.addColorStop(1, '#505050');   // Dark Edge
        } else {
            // Gold Palette
            gradient.addColorStop(0, '#B8860B');   // Dark Goldenrod
            gradient.addColorStop(0.2, '#FFD700'); // Gold Highlight
            gradient.addColorStop(0.5, '#DAA520'); // Muted Gold
            gradient.addColorStop(0.8, '#FFFACD'); // Lemon Chiffon (Shine)
            gradient.addColorStop(1, '#8B4513');   // Saddle Brown (Deep Shadow)
        }
        return gradient;
    }

    update(mouseX, mouseY) {
        // --- PENDULUM PHYSICS SIMULATION ---

        // 1. Calculate actual Bob position (The hanging object)
        // Origin is (this.x, 0)
        // Bob is at (this.x + sin(angle)*length, length*cos(angle))
        const bobX = this.x + Math.sin(this.angle) * this.length;
        const bobY = this.length * Math.cos(this.angle); // y is down

        // 2. Interaction Force (Mouse Repulsion)
        let force = 0;

        // Distance check
        const dx = mouseX - bobX;
        const dy = mouseY - bobY;
        const distSq = dx * dx + dy * dy;
        const threshold = 15000; // ~120px radius squared

        if (distSq < threshold) {
            // Push away interactively
            // Closer = Stronger push
            // Direction: if mouse is to the right (dx > 0), force should reduce angle (swing left)
            // if mouse is to the left (dx < 0), force should increase angle (swing right)

            // Normalize force
            const dist = Math.sqrt(distSq);
            const pushStrength = 0.002 * (1 - dist / 120) * this.invMass;

            if (dx > 0) force -= pushStrength;
            else force += pushStrength;

            // Add a bit of "wind turbulence" if directly hit
            if (dist < 40) force += (Math.random() - 0.5) * 0.005;
        }

        // 3. Restoring Force (Gravity)
        // Torque = -m * g * L * sin(theta)
        // Angular Accel = Torque / I = - (g/L) * sin(theta)
        // We approximate g/L as a constant factor
        const gravity = 0.005;
        const restoring = -gravity * Math.sin(this.angle);

        // 4. Integrate Physics
        this.angularAcceleration = restoring + force;
        this.angularVelocity += this.angularAcceleration;
        this.angularVelocity *= this.damping; // Apply friction
        this.angle += this.angularVelocity;

        // Clamp to avoid crazy spinning if hit too hard (rare but possible)
        if (this.angle > 1.5) { this.angle = 1.5; this.angularVelocity *= -0.5; }
        if (this.angle < -1.5) { this.angle = -1.5; this.angularVelocity *= -0.5; }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // 1. Draw The String
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, this.length);
        // Golden chain look instead of white string
        ctx.strokeStyle = this.isSilver ? 'rgba(192,192,192, 0.6)' : 'rgba(218,165,32, 0.6)';
        ctx.lineWidth = 1.5;
        // Dashed line to look like links/chain
        ctx.setLineDash([3, 2]);
        ctx.stroke();
        ctx.setLineDash([]); // Reset

        // Move to end of string
        ctx.translate(0, this.length);

        // 2. Draw The Object
        if (this.type === 'lantern') {
            this.drawLantern(ctx);
        } else if (this.type === 'crescent') {
            this.drawCrescent(ctx);
        } else if (this.type === 'star') {
            this.drawStar(ctx);
        }

        ctx.restore();
    }

    drawWithLattice(ctx, drawPathFn) {
        ctx.save();

        // 1. Define the CLIPPING path (The Outline)
        drawPathFn();
        ctx.clip(); // Restricts all subsequent drawing to inside the shape

        // 2. Fill Background (Very faint glass/tint to give body)
        // Helps visibility without being solid
        ctx.fillStyle = this.isSilver ? 'rgba(200, 200, 200, 0.1)' : 'rgba(255, 215, 0, 0.1)';
        ctx.fill();

        // 3. Draw The Lattice (Additive Wireframe)
        // We fill the entire shape area with the pattern stroke
        ctx.fillStyle = this.getLatticePattern(ctx);
        // Fill a large enough rect to cover the shape
        ctx.fillRect(-this.size * 2, -this.size * 2, this.size * 4, this.size * 4);

        ctx.restore(); // Removes clip

        // 4. Draw the Solid Outline (Metallic Rim)
        ctx.save();
        drawPathFn(); // Re-create path for stroking
        ctx.lineWidth = 2; // Thicker rim for definition
        ctx.strokeStyle = this.getMetallicGradient(ctx, this.size * 2, 0);
        ctx.stroke();
        ctx.restore();
    }

    drawLantern(ctx) {
        const w = this.size * 1.0;
        const h = this.size * 1.6;
        const isOnion = this.size % 2 > 1;

        if (isOnion) {
            // -- ONION STYLE --

            // 1. Solid Top Cap
            ctx.fillStyle = this.getMetallicGradient(ctx, w, 0);
            ctx.beginPath();
            ctx.moveTo(-w / 2, -h / 3);
            ctx.quadraticCurveTo(0, -h / 2, w / 2, -h / 3);
            ctx.lineTo(w / 2, -h / 4);
            ctx.lineTo(-w / 2, -h / 4);
            ctx.fill();

            // 2. Solid Bottom Point
            ctx.beginPath();
            ctx.moveTo(0, h / 2 + h / 4);
            ctx.lineTo(-w / 4, h / 2);
            ctx.lineTo(w / 4, h / 2);
            ctx.fill();

            // 3. Latticed Body
            this.drawWithLattice(ctx, () => {
                ctx.beginPath();
                ctx.moveTo(-w / 2, -h / 4);
                // Bulbous body curve
                ctx.bezierCurveTo(-w, 0, -w / 2, h / 2, 0, h / 2);
                ctx.bezierCurveTo(w / 2, h / 2, w, 0, w / 2, -h / 4);
                ctx.closePath();
            });

        } else {
            // -- HEXAGON STYLE --

            // 1. Solid Top Cap
            ctx.fillStyle = this.getMetallicGradient(ctx, w, 0);
            ctx.beginPath();
            ctx.moveTo(-w / 2, -h / 3);
            ctx.lineTo(w / 2, -h / 3);
            ctx.lineTo(0, -h / 2);
            ctx.fill();

            // 2. Solid Bottom Cap
            ctx.beginPath();
            ctx.moveTo(-w / 3, h / 3);
            ctx.lineTo(w / 3, h / 3);
            ctx.lineTo(0, h / 2);
            ctx.fill();

            // 3. Latticed Body (Rectangle representing hex face)
            this.drawWithLattice(ctx, () => {
                ctx.beginPath();
                ctx.rect(-w / 2, -h / 3, w, h * 0.66);
            });
        }
    }

    drawCrescent(ctx) {
        const r = this.size;

        // Define clean crescent path
        const drawCrescentPath = () => {
            ctx.beginPath();
            ctx.arc(0, 0, r, 0, Math.PI * 2); // Outer
            ctx.moveTo(r * 0.3, -r * 0.2); // Move to inner start?
            // Actually, context arc doesn't automatically subtract in a single path unless structured right.
            // But we can use the clip rule: A path with sub-paths.
            // Simpler: Just clip to Outer, then subtract Intersect of Inner?
            // No, the path function must define the SHAPE.
            // Let's use two arcs in opposite directions to create a single shape path.

            ctx.arc(0, 0, r, 0, Math.PI * 2);
            // This is just a circle though.
        };

        // Let's use the robust clipping method:
        ctx.save();

        // 1. Define Outer Crescent Shape via Clip
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.clip(); // Restrict to circle

        // 2. Punch "Hole" for Crescent Inner
        // We CANNOT clip "out". We must rely on painting only where we want.
        // Or simpler: Draw the decorations ON THE WHOLE CIRCLE, then Destination-Out the shadow circle.
        // This is safe because we are drawing ADDITIVELY now (wires), not subtracting from background.

        // A. Draw Wires on Whole Circle
        ctx.fillStyle = this.getLatticePattern(ctx);
        ctx.fillRect(-r, -r, r * 2, r * 2);

        // B. Clear the Inner Circle (The "Shadow" part of crescent)
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(r * 0.3, -r * 0.2, r * 0.9, 0, Math.PI * 2);
        ctx.fill();

        // 3. Draw Outline
        ctx.globalCompositeOperation = 'source-over';
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.getMetallicGradient(ctx, r * 2, 0);

        // Clip to ring? No.
        // We need to stroke the crescent shape specifically.
        // Since we can't easily path it, we'll cheat: 
        // Stroke outer circle, stroke inner circle.
        // Then clear the inner circle area again to remove the "inner part of outer stroke"?
        // It's fine if it overlaps transparency.

        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();

        // Inner Stroke
        ctx.beginPath();
        ctx.arc(r * 0.3, -r * 0.2, r * 0.9, 0, Math.PI * 2);
        ctx.stroke();

        // 4. Clean up the "Inner Stroke" spilling into the Shadow?
        // Yes, the inner stroke draws on both sides of the line.
        // We want to clear the INSIDE of the inner circle.
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(r * 0.3, -r * 0.2, r * 0.9 - 1, 0, Math.PI * 2); // Slightly smaller to keep the stroke
        ctx.fill();

        ctx.restore();
    }

    drawStar(ctx) {
        const r = this.size;
        // 5-Point Star
        this.drawWithLattice(ctx, () => {
            ctx.beginPath();
            const points = 5;
            const outerR = r;
            const innerR = r * 0.45; // Sharper star

            for (let i = 0; i < points * 2; i++) {
                const radius = i % 2 === 0 ? outerR : innerR;
                const angle = (Math.PI / points) * i - Math.PI / 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
        });
    }
}

export default React.memo(function RamadanOverlay() {
    const canvasRef = useRef(null);
    const animationFrameId = useRef(0);
    const decorations = useRef([]);
    const mouseX = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initDecorations(); // Re-init on resize to fix positions
        };

        const initDecorations = () => {
            decorations.current = [];
            const isMobile = window.innerWidth < 768;
            const count = isMobile ? 6 : 14; // A few more since we space them well

            // Safety bands
            const edgePadding = 45;
            const safeZoneStart = Math.max(edgePadding + 10, canvas.width * 0.2);
            const safeZoneEnd = Math.min(canvas.width - edgePadding - 10, canvas.width * 0.8);

            const existingX = [];
            const minDistance = 50; // Minimum px spacing between anchors

            for (let i = 0; i < count; i++) {
                let x = 0;
                let valid = false;
                let attempts = 0;

                while (!valid && attempts < 50) {
                    // Pick side
                    const side = Math.random() < 0.5 ? 'left' : 'right';
                    if (side === 'left') {
                        const width = safeZoneStart - edgePadding;
                        x = edgePadding + Math.random() * width;
                    } else {
                        const width = (canvas.width - edgePadding) - safeZoneEnd;
                        x = safeZoneEnd + Math.random() * width;
                    }

                    // Check distance vs others
                    let overlap = false;
                    for (const otherX of existingX) {
                        if (Math.abs(x - otherX) < minDistance) {
                            overlap = true;
                            break;
                        }
                    }
                    if (!overlap) valid = true;
                    attempts++;
                }

                if (valid) {
                    existingX.push(x);
                    decorations.current.push(new HangingDecoration(canvas, null, x));
                }
            }
        };

        const handleMouseMove = (e) => {
            // Store exact pixel coordinates for physics interaction
            mouseX.current = { x: e.clientX, y: e.clientY };
        };

        const animate = (time) => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Default to off-screen if undefined (start)
            const mousePos = mouseX.current || { x: -1000, y: -1000 };

            decorations.current.forEach((d) => {
                d.update(mousePos.x, mousePos.y);
                d.draw(ctx);
            });

            animationFrameId.current = requestAnimationFrame(animate);
        };

        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("mousemove", handleMouseMove);

        resizeCanvas();
        // initDecorations is called by resizeCanvas, so we don't need to call it twice here?
        // Actually resize event might not fire immediately.
        // But we called resizeCanvas(); above.

        animationFrameId.current = requestAnimationFrame(animate);

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
            style={{
                position: 'fixed',
                top: 0, left: 0,
                pointerEvents: 'none',
                zIndex: 51 // Ensure it's above the border
            }}
        />
    );
});