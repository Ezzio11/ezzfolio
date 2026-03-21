
import React, { useState, useRef, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

const Lightbox = ({ src, title, description, onClose }) => {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const imgRef = useRef(null);

    // Metadata Overlay Visibility (Hide when zoomed in significantly)
    const showMetadata = scale < 1.5;

    // Prevent default browser zoom actions
    useEffect(() => {
        const preventDefault = (e) => e.preventDefault();
        document.addEventListener('gesturestart', preventDefault);
        document.addEventListener('gesturechange', preventDefault);
        return () => {
            document.removeEventListener('gesturestart', preventDefault);
            document.removeEventListener('gesturechange', preventDefault);
        };
    }, []);

    const handleWheel = (e) => {
        e.stopPropagation(); // Stop page scroll
        const delta = e.deltaY * -0.01;
        const newScale = Math.min(Math.max(1, scale + delta), 4);
        setScale(newScale);

        // Reset position if zoomed out to 1
        if (newScale === 1) setPosition({ x: 0, y: 0 });
    };

    const handleMouseDown = (e) => {
        if (scale > 1) {
            setIsDragging(true);
            setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
        }
    };

    const handleMouseMove = (e) => {
        if (isDragging && scale > 1) {
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const zoomIn = (e) => { e.stopPropagation(); setScale(Math.min(scale + 0.5, 4)); };
    const zoomOut = (e) => {
        e.stopPropagation();
        const newScale = Math.max(1, scale - 0.5);
        setScale(newScale);
        if (newScale === 1) setPosition({ x: 0, y: 0 });
    };
    const reset = (e) => { e.stopPropagation(); setScale(1); setPosition({ x: 0, y: 0 }); };

    return (
        <div
            className="lightbox-overlay"
            onClick={onClose}
            onWheel={handleWheel}
            style={{
                position: 'fixed', inset: 0, zIndex: 10000,
                background: 'rgba(0,0,0,0.95)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
                cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-out'
            }}
        >
            {/* Metadata Text (Top Left) */}
            {title && (
                <div style={{
                    position: 'absolute', top: '2rem', left: '2rem',
                    maxWidth: '400px', zIndex: 10002,
                    opacity: showMetadata ? 1 : 0,
                    transform: showMetadata ? 'translateY(0)' : 'translateY(-20px)',
                    transition: 'all 0.3s ease',
                    pointerEvents: 'none'
                }}>
                    <h2 style={{
                        color: 'white', fontSize: '1.5rem', margin: '0 0 0.5rem 0',
                        fontFamily: 'Syne, sans-serif', fontWeight: 800,
                        textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                    }}>{title}</h2>
                    {description && (
                        <p style={{
                            color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', margin: 0,
                            lineHeight: 1.5, fontFamily: 'Space Grotesk, sans-serif',
                            background: 'rgba(0,0,0,0.3)', padding: '0.75rem',
                            borderRadius: '8px', backdropFilter: 'blur(5px)'
                        }}>{description}</p>
                    )}
                </div>
            )}

            <div
                style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                    transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '100%', height: '100%'
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onClick={(e) => e.stopPropagation()} // Prevent clicking image from closing
            >
                <img
                    ref={imgRef}
                    src={src}
                    alt={title || "Lightbox"}
                    draggable={false}
                    style={{
                        maxWidth: '90vw', maxHeight: '90vh',
                        objectFit: 'contain',
                        borderRadius: '4px',
                        boxShadow: '0 0 50px rgba(0,0,0,0.5)',
                        pointerEvents: 'auto',
                        userSelect: 'none'
                    }}
                />
            </div>

            {/* Controls */}
            <div style={{
                position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
                display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.1)',
                padding: '0.5rem 1rem', borderRadius: '50px', backdropFilter: 'blur(10px)',
                zIndex: 10001
            }} onClick={(e) => e.stopPropagation()}>
                <button onClick={zoomOut} className="icon-btn" disabled={scale <= 1} aria-label="Zoom Out"><ZoomOut size={20} color="white" /></button>
                <div style={{ color: 'white', fontFamily: 'monospace', alignSelf: 'center' }} aria-live="polite">{Math.round(scale * 100)}%</div>
                <button onClick={zoomIn} className="icon-btn" disabled={scale >= 4} aria-label="Zoom In"><ZoomIn size={20} color="white" /></button>
                <button onClick={reset} className="icon-btn" style={{ marginLeft: '10px', borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '1rem' }} aria-label="Reset Zoom"><RotateCcw size={20} color="white" /></button>
                <button onClick={reset} className="icon-btn" style={{ display: 'none' }}></button> {/* Ghost button for spacing check if needed */}
                <button onClick={onClose} className="icon-btn" style={{ marginLeft: '10px', borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '1rem' }} aria-label="Close Lightbox"><X size={20} color="#ff4444" /></button>
            </div>

            <style>{`
                .icon-btn { background: none; border: none; cursor: pointer; padding: 5px; display: flex; align-items: center; justify-content: center; transition: transform 0.2s; }
                .icon-btn:hover:not(:disabled) { transform: scale(1.1); background: rgba(255,255,255,0.1); borderRadius: 50%; }
                .icon-btn:disabled { opacity: 0.3; cursor: not-allowed; }
            `}</style>
        </div>
    );
};

export default Lightbox;
