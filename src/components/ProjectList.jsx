import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, X, Globe, Languages } from 'lucide-react';
import { projects, techIcons, getCategoryIcon } from '../data/projects';
const Lightbox = React.lazy(() => import('./Lightbox')); // Lazy load modal
const CodeViewer = React.lazy(() => import('./CodeViewer')); // Lazy load syntax highlighter

import { useSpring, useTransition, animated, config } from '@react-spring/web';


export default function ProjectList({ theme }) {

    const [selectedId, setSelectedId] = useState(null);
    const [originRect, setOriginRect] = useState(null);
    const [expandedImg, setExpandedImg] = useState(null);

    const overlayRef = useRef(null);

    // Responsive Mobile Hook
    const [isMobile, setIsMobile] = useState(false); // Default to desktop to avoid hydration mismatch if SSR (though this is Vite client-side)
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile(); // Check on mount
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const transitions = useTransition(selectedId, {
        from: () => ({
            top: originRect ? originRect.top : 0,
            left: originRect ? originRect.left : 0,
            width: originRect ? originRect.width : 0,
            height: originRect ? originRect.height : 0,
            opacity: 0
        }),
        enter: {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
            opacity: 1
        },
        leave: () => ({
            top: originRect ? originRect.top : 0,
            left: originRect ? originRect.left : 0,
            width: originRect ? originRect.width : 0,
            height: originRect ? originRect.height : 0,
            opacity: 0
        }),
        config: { mass: 1, tension: 180, friction: 22 },
        onRest: (result) => {
            if (selectedId === null && result.finished) {
                setOriginRect(null);
                document.body.style.overflow = '';
            }
        }
    });

    const handleSelect = (id, e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setOriginRect(rect);
        setSelectedId(id);
        document.body.style.overflow = 'hidden';
    };

    const handleClose = (e) => {
        if (e) e.stopPropagation();
        setSelectedId(null);
        // Overflow reset handled in onRest
    };

    // Handle Escape Key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                if (expandedImg) {
                    setExpandedImg(null);
                    return;
                }
                if (selectedId !== null) {
                    handleClose();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedId, expandedImg]);



    const selectedProject = projects.find(p => p.id === selectedId);



    return (
        <div style={{ position: 'relative', marginBottom: '3rem' }}>
            <h2 className="section-title">
                Selected Works
            </h2>


            {/* --- GRID VIEW --- */}
            <div className="project-grid">
                {projects.map((project, index) => {
                    // Hide the card that is currently expanded to prevent double-rendering visuals
                    // but keep it in DOM for layout stability (visibility: hidden)
                    const isExpanded = selectedId === project.id;

                    return (
                        <button
                            key={project.id}
                            data-id={project.id}
                            onClick={(e) => handleSelect(project.id, e)}
                            className={`project-card animate-fade-up`}
                            type="button"
                            aria-label={`View details for ${project.title}`}
                            style={{
                                animationDelay: `${1.2 + (index * 0.1)}s`, // Staggered delay
                                background: 'var(--terminal-bg)',
                                border: '1px solid var(--grid-line)',
                                padding: '1.5rem',
                                minHeight: '260px',
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden',
                                visibility: isExpanded ? 'hidden' : 'visible', // Hide original when expanded
                                transition: 'opacity 0.3s ease'
                            }}>
                            <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease'
                            }}>
                                {project.id === 1 && (
                                    <div className="bloody-gradient" style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        height: '60%',
                                        background: 'linear-gradient(to top, rgba(208, 0, 0, 0.4), transparent)',
                                        zIndex: 1,
                                        pointerEvents: 'none'
                                    }} />
                                )}

                                {/* --- INHERITED GRID VISUALS --- */}

                                {/* SSC2 (ID 0) Visuals */}
                                {project.id === 0 && (
                                    <>
                                        {/* Light Mode Tint */}
                                        {theme !== 'dark' && (
                                            <div style={{
                                                position: 'absolute', inset: 0,
                                                background: '#f0f9ff', // AliceBlue
                                                zIndex: 0, pointerEvents: 'none'
                                            }} />
                                        )}
                                        <div style={{
                                            position: 'absolute', top: '-20%', left: '-20%', width: '140%', height: '140%',
                                            background: 'rgba(34, 211, 238, 0.2)', // Boosted
                                            borderRadius: '9999px', filter: 'blur(60px)',
                                            zIndex: 0, pointerEvents: 'none'
                                        }} />
                                        <div style={{
                                            position: 'absolute', bottom: '-20%', right: '-20%', width: '140%', height: '140%',
                                            background: 'rgba(6, 182, 212, 0.2)', // Boosted
                                            borderRadius: '9999px', filter: 'blur(60px)',
                                            zIndex: 0, pointerEvents: 'none'
                                        }} />
                                        <div style={{
                                            position: 'absolute', inset: 0,
                                            backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
                                            backgroundSize: '16px 16px',
                                            opacity: theme === 'dark' ? 0.15 : 0.3, // Significantly boosted for Light
                                            zIndex: 1, pointerEvents: 'none'
                                        }} />
                                    </>
                                )}

                                {/* Null Hypothesis (ID 3) Visuals */}
                                {project.id === 3 && (
                                    <>
                                        {/* Light Mode Paper Tint */}
                                        {theme !== 'dark' && (
                                            <div style={{
                                                position: 'absolute', inset: 0,
                                                background: '#F5F5F0', // Warm darker paper tone
                                                zIndex: 0, pointerEvents: 'none'
                                            }} />
                                        )}
                                        <div style={{
                                            position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
                                            opacity: theme === 'dark' ? 0.08 : 0.15, // Boosted noise
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                                            mixBlendMode: 'overlay'
                                        }} />
                                        <div style={{
                                            position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
                                            opacity: 0.1, // Boosted grid
                                            backgroundImage: `linear-gradient(${theme === 'dark' ? '#E0DCD3' : '#1F1D1B'} 1px, transparent 1px), linear-gradient(90deg, ${theme === 'dark' ? '#E0DCD3' : '#1F1D1B'} 1px, transparent 1px)`,
                                            backgroundSize: '20px 20px'
                                        }} />
                                        <div style={{
                                            position: 'absolute', bottom: 0, left: 0, right: 0, height: '70%',
                                            background: `linear-gradient(to top, ${project.color}33, transparent)`,
                                            zIndex: 0, pointerEvents: 'none'
                                        }} />
                                    </>
                                )}

                                {/* Emam Research System (ID 4) Visuals */}
                                {project.id === 4 && (
                                    <>
                                        {/* Light Mode Tint */}
                                        {theme !== 'dark' && (
                                            <div style={{
                                                position: 'absolute', inset: 0,
                                                background: '#f0fdf4', // Green-50
                                                zIndex: 0, pointerEvents: 'none'
                                            }} />
                                        )}
                                        <div style={{
                                            position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
                                            background: theme === 'dark'
                                                ? 'linear-gradient(to bottom right, rgba(48, 124, 60, 0.4), transparent)'
                                                : 'linear-gradient(to bottom right, rgba(48, 124, 60, 0.2), transparent)' // Boosted
                                        }} />
                                        <div style={{
                                            position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
                                            opacity: 0.2,
                                            color: theme === 'dark' ? '#307c3c' : '#166534' // Darker green for light mode visibility
                                        }}>
                                            <svg width="100%" height="100%">
                                                <defs>
                                                    <pattern id={`erc-grid-mini-${project.id}`} width="16" height="16" patternUnits="userSpaceOnUse">
                                                        <path d="M 16 0 L 0 0 0 16" fill="none" stroke="currentColor" strokeWidth="1" />
                                                    </pattern>
                                                </defs>
                                                <rect width="100%" height="100%" fill={`url(#erc-grid-mini-${project.id})`} />
                                            </svg>
                                        </div>
                                    </>
                                )}

                                {/* Graphic Designs (ID 6) - Added Visuals */}
                                {project.id === 6 && (
                                    <>
                                        {/* Light Mode Tint */}
                                        {theme !== 'dark' && (
                                            <div style={{
                                                position: 'absolute', inset: 0,
                                                background: '#fff1f2', // Rose-50
                                                zIndex: 0, pointerEvents: 'none'
                                            }} />
                                        )}
                                        {/* Blueprint Dotted Grid */}
                                        <div style={{
                                            position: 'absolute', inset: 0,
                                            backgroundImage: 'radial-gradient(#e11d48 1px, transparent 1px)',
                                            backgroundSize: '20px 20px',
                                            opacity: theme === 'dark' ? 0.15 : 0.1,
                                            zIndex: 0, pointerEvents: 'none'
                                        }} />
                                        <div style={{
                                            position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
                                            background: `linear-gradient(to top, ${project.color}22, transparent)`,
                                            zIndex: 0, pointerEvents: 'none'
                                        }} />
                                    </>
                                )}

                                {/* SharkPy (ID 8) - Added Visuals */}
                                {project.id === 8 && (
                                    <>
                                        {/* Light Mode Tint */}
                                        {theme !== 'dark' && (
                                            <div style={{
                                                position: 'absolute', inset: 0,
                                                background: '#eff6ff', // Blue-50
                                                zIndex: 0, pointerEvents: 'none'
                                            }} />
                                        )}
                                        {/* Ocean Wave Gradient */}
                                        <div style={{
                                            position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
                                            background: `linear-gradient(135deg, ${theme === 'dark' ? 'rgba(0,119,190,0.1)' : 'rgba(0,119,190,0.05)'} 0%, transparent 100%)`
                                        }} />
                                        {/* Subtle Scale Pattern (CSS only) */}
                                        <div style={{
                                            position: 'absolute', inset: 0,
                                            backgroundImage: `repeating-radial-gradient(circle at 0 0, transparent 0, transparent 10px, ${project.color}11 11px)`,
                                            opacity: 0.3,
                                            zIndex: 0, pointerEvents: 'none',
                                            mixBlendMode: 'overlay'
                                        }} />
                                    </>
                                )}

                                {/* MSTAG (ID 5) Visuals - Default Lush Gradient */}
                                {project.id === 5 && (
                                    <div className="jumbo" style={{
                                        position: 'absolute',
                                        inset: 0,
                                        zIndex: 0,
                                        opacity: 0.5 // Slightly increased from 0.3 as per user request
                                    }}>
                                        <div className="jumbo-slider" />
                                    </div>
                                )}

                                {/* Polymath (ID 7) - Parchment (Light) / Deep Brown (Dark) Background */}
                                {project.id === 7 && (
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        zIndex: 0,
                                        background: theme === 'dark' ? '#3A2D23' : '#f5f0e6', // Deep Brown vs Parchment
                                        pointerEvents: 'none',
                                        transition: 'background-color 0.3s ease'
                                    }} />
                                )}


                                {/* UPDATED Logo Stamp (Bottom Right, -45 deg) */}
                                {project.stamp && (
                                    (() => {
                                        const Stamp = project.stamp;
                                        const isComponent = typeof Stamp !== 'string';
                                        return (
                                            <div style={{
                                                position: 'absolute',
                                                bottom: '-10px',  // Bottom
                                                right: '-10px',   // Right
                                                width: '100px',
                                                height: '100px',
                                                zIndex: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                transform: 'rotate(-45deg)', // -45 degrees
                                                opacity: theme === 'dark' ? 0.3 : 0.5,
                                                fill: theme === 'dark' ? 'white' : 'black',
                                                stroke: theme === 'dark' ? 'white' : 'black',

                                                pointerEvents: 'none',
                                                color: project.color
                                            }}>
                                                {isComponent ? (
                                                    <Stamp size={80} strokeWidth={1.5} />
                                                ) : (
                                                    <img
                                                        src={Stamp}
                                                        alt="Project Stamp"
                                                        loading="lazy"
                                                        width="80"
                                                        height="80"
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'contain',
                                                            filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.3))'
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        );
                                    })()
                                )}

                                {project.bgImage && (
                                    <div className="bg-pattern" style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundImage: `url(${project.bgImage})`,
                                        backgroundSize: '300px',
                                        opacity: project.id === 7 ? 0.4 : (project.darkPattern ? 0.6 : 0.2), // Increase opacity for Rice Paper
                                        zIndex: 0,
                                        mixBlendMode: project.id === 7 ? 'multiply' : (project.darkPattern ? 'multiply' : 'normal') // Multiply for Parchment effect
                                    }} />
                                )}

                                {project.overlayImage && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '-15px',
                                        right: '-45px',
                                        width: '200px',
                                        height: '200px',
                                        zIndex: 2,
                                        backgroundImage: `url(${project.overlayImage})`,
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat',
                                        transform: 'rotate(15deg)',
                                        filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.5))',
                                        pointerEvents: 'none'
                                    }} className="card-overlay" />
                                )}

                                <div style={{
                                    zIndex: 10,
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    gap: '0.75rem'
                                }}>
                                    <h3 style={{
                                        fontSize: '1.4rem',
                                        color: project.color,
                                        margin: 0,
                                        fontFamily: 'Syne, sans-serif' // Enforce Syne explicitly
                                    }}>
                                        {project.title}
                                    </h3>
                                    <span className="card-category" style={{
                                        fontSize: '0.8rem',
                                        color: 'var(--text-dim)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        {(() => {
                                            const Icon = getCategoryIcon(project.category);
                                            return <Icon size={14} strokeWidth={3} />;
                                        })()}
                                        {project.category}
                                    </span>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* --- EXPANDED OVERLAY --- */}
            {/* --- EXPANDED OVERLAY --- */}
            {/* --- EXPANDED OVERLAY --- */}
            {/* --- EXPANDED PROJECT OVERLAY (FLIP ANIMATION) --- */}
            {transitions((style, item) => {
                if (item === null) return null;
                const project = projects.find(p => p.id === item);
                if (!project) return null;

                // Unique Colors for specific projects
                let overlayBg = 'var(--bg-primary)';
                let variableOverrides = {};

                if (item === 4) { // Emam
                    const isDark = theme === 'dark';
                    overlayBg = isDark ? '#1a1a1a' : '#ffffff';
                    // STRICT MONOCHROME: No overrides
                } else if (item === 3) { // Null Hyp
                    const isDark = theme === 'dark';
                    overlayBg = isDark ? '#141311' : '#ffffff';
                    // STRICT MONOCHROME: No overrides
                } else if (item === 7) { // Polymath
                    const isDark = theme === 'dark';
                    overlayBg = isDark ? '#3A2D23' : '#ffffff';
                    // STRICT MONOCHROME: No overrides
                } else if (item === 1) { // Roman Reigns
                    overlayBg = 'var(--roman-overlay-bg)';
                } else if (item === 0) { // SSC2
                    const isDark = theme === 'dark';
                    overlayBg = isDark ? '#0f172a' : '#ffffff'; // Adaptive background
                    // STRICT MONOCHROME: No overrides
                } else {
                    overlayBg = 'var(--terminal-bg)';
                }

                const isClosing = selectedId !== item;

                return (
                    <animated.div
                        ref={overlayRef}
                        style={{
                            position: 'fixed',
                            zIndex: 9999,
                            background: overlayBg,
                            border: `1px solid ${project.color}`,
                            overflow: isMobile ? 'auto' : 'hidden', // Allow scrolling on mobile
                            display: isMobile ? 'block' : 'grid', // specific fix: block on mobile lets child grow
                            gridTemplateColumns: isMobile ? 'none' : '40% 60%', // Full width on mobile
                            gridTemplateRows: isMobile ? 'none' : '1fr', // Stack vertically on mobile
                            boxShadow: '0 0 50px rgba(0,0,0,0.5)',
                            transition: 'background-color 0.3s ease, border-color 0.3s ease', // Smooth Theme Transition
                            ...style, // Apply Spring Values (top, left, width, height)
                            ...variableOverrides
                        }}
                        className="project-overlay"
                    >

                        {/* --- EXPANDED VISUALS --- */}
                        {/* Elements inside fade in/out slightly delayed to let the box expand first */}
                        <div style={{
                            height: isMobile ? 'auto' : '100%', // Allow growing on mobile
                            minHeight: '100%', // Ensure it fills at least the screen
                            position: isMobile ? 'relative' : 'absolute', // Relative flow on mobile
                            top: 0,
                            left: 0,
                            width: '100%', // Explicit width
                            opacity: isClosing ? 0 : 1,
                            transform: isClosing ? 'translateY(20px)' : 'translateY(0)',
                            transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                            transitionDelay: isClosing ? '0s' : '0.3s', // Wait slightly longer for box to expand
                            display: isMobile ? 'flex' : 'grid', // Flex for vertical stacking on mobile
                            flexDirection: isMobile ? 'column' : undefined,
                            gridTemplateColumns: isMobile ? 'none' : '40% 60%', // Split Screen Desktop
                            gridTemplateRows: isMobile ? 'none' : '1fr',
                            overflow: isMobile ? 'visible' : 'hidden' // Visible overflow for inner content on mobile scroll
                        }}>
                            {/* BACKGROUND PATTERNS (Global) */}
                            {project.bgImage && (
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundImage: `url(${project.bgImage})`,
                                    backgroundSize: '500px', // Larger pattern for full screen
                                    opacity: project.darkPattern ? 0.08 : 0.05, // Drastically reduced for subtlety
                                    zIndex: -1,
                                    mixBlendMode: 'normal', // Simplify blend mode to avoid light mode mess
                                    pointerEvents: 'none'
                                }} className="bg-pattern" />
                            )}

                            {/* Standardized Dynamic Gradient (Everyone gets this now except 1316 which has its own custom one) */}
                            {project.id !== 1 && project.id !== 5 && (
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: '60%',
                                    background: `linear-gradient(to top, ${project.color}40, transparent)`, // ~25% opacity
                                    zIndex: -1,
                                    pointerEvents: 'none'
                                }} />
                            )}

                            {/* MSTAG (ID 5) - Full Screen Aurora */}
                            {project.id === 5 && (
                                <div className="jumbo" style={{
                                    position: 'absolute',
                                    inset: 0,
                                    zIndex: -1,
                                    opacity: 0.5 // Slightly increased from 0.3 as per user request
                                }}>
                                    <div className="jumbo-slider" />
                                </div>
                            )}

                            {/* Logo stamps removed from here - now in left column above title */}

                            {/* Original 1316 Logic (PRESERVED) */}
                            {project.id === 1 && (
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: '100%',
                                    background: 'radial-gradient(circle at bottom, rgba(208, 0, 0, 0.15), transparent 60%)', // More subtle glow
                                    zIndex: -1,
                                    pointerEvents: 'none'
                                }} />
                            )}

                            {project.id === 0 && (
                                <>
                                    {/* Light Mode Tint */}
                                    {theme !== 'dark' && (
                                        <div style={{
                                            position: 'absolute', inset: 0,
                                            background: '#f0f9ff', // AliceBlue tint
                                            zIndex: -2, pointerEvents: 'none'
                                        }} />
                                    )}

                                    {/* SSC2 Source Ambience: Top-Left Blob */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '-10%',
                                        left: '-10%',
                                        width: '500px',
                                        height: '500px',
                                        background: theme === 'dark' ? 'rgba(34, 211, 238, 0.1)' : 'rgba(34, 211, 238, 0.25)', // Boosted for Light
                                        borderRadius: '9999px',
                                        filter: 'blur(100px)',
                                        zIndex: -1,
                                        pointerEvents: 'none'
                                    }} />

                                    {/* SSC2 Source Ambience: Bottom-Right Blob */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '-10%',
                                        right: '-10%',
                                        width: '500px',
                                        height: '500px',
                                        background: theme === 'dark' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(6, 182, 212, 0.25)', // Boosted for Light
                                        borderRadius: '9999px',
                                        filter: 'blur(100px)',
                                        zIndex: -1,
                                        pointerEvents: 'none'
                                    }} />

                                    {/* SSC2 Source Ambience: Dot Grid */}
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', // Slate-400
                                        backgroundSize: '24px 24px',
                                        opacity: theme === 'dark' ? 0.1 : 0.25, // Boosted for Light
                                        zIndex: -1,
                                        pointerEvents: 'none'
                                    }} />
                                </>
                            )}


                            {project.id === 4 && (
                                (() => {
                                    const isDark = theme === 'dark'; // Inherited from parent prop
                                    const gridColor = isDark ? '#307c3c' : 'rgba(15, 23, 42, 0.4)'; // Green in Dark, Slate in Light
                                    const gridOpacity = isDark ? 0.15 : 0.08;

                                    return (
                                        <>
                                            {/* Emam Research (ID: 4) - Adaptive Source Replication */}

                                            {/* SVG Data Grid */}
                                            <div style={{
                                                position: 'absolute', inset: 0, zIndex: -1, pointerEvents: 'none',
                                                opacity: gridOpacity,
                                                color: gridColor
                                            }}>
                                                <svg width="100%" height="100%">
                                                    <defs>
                                                        <pattern id="erc-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                                                            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="2.5" />
                                                        </pattern>
                                                    </defs>
                                                    <rect width="100%" height="100%" fill="url(#erc-grid)" />
                                                </svg>
                                            </div>

                                            {/* Gradient Overlay */}
                                            <div style={{
                                                position: 'absolute', inset: 0, zIndex: -1, pointerEvents: 'none',
                                                background: isDark
                                                    ? 'linear-gradient(to bottom right, rgba(48, 124, 60, 0.1), transparent, transparent)' // Green tint for Dark
                                                    : 'linear-gradient(to bottom right, white, transparent, transparent)', // White tint for Light
                                                opacity: 0.2
                                            }} />

                                            {/* Floating Elements (Source based) */}
                                            {/* 1. Top-Left: Solid Green Square */}
                                            <div style={{
                                                position: 'absolute', top: '20%', left: '5%',
                                                width: '96px', height: '96px',
                                                background: '#307c3c',
                                                borderRadius: '8px',
                                                opacity: isDark ? 0.1 : 0.05,
                                                animation: 'float-around 15s ease-in-out infinite'
                                            }} />

                                            {/* 2. Bottom-Right: Accent Border Circle */}
                                            <div style={{
                                                position: 'absolute', bottom: '10%', right: '5%',
                                                width: '128px', height: '128px',
                                                border: '2px solid #55D226',
                                                borderRadius: '50%',
                                                opacity: isDark ? 0.1 : 0.05,
                                                animation: 'float-around 12s ease-in-out infinite'
                                            }} />

                                            {/* 3. Bottom-Left: Green Border Square */}
                                            <div style={{
                                                position: 'absolute', bottom: '25%', left: '15%',
                                                width: '192px', height: '192px',
                                                border: '4px solid #307c3c',
                                                borderRadius: '12px',
                                                opacity: isDark ? 0.1 : 0.05,
                                                animation: 'float-around 18s ease-in-out infinite'
                                            }} />

                                            {/* 4. Top-Right: Solid Accent Circle */}
                                            <div style={{
                                                position: 'absolute', top: '15%', right: '10%',
                                                width: '80px', height: '80px',
                                                background: '#55D226',
                                                borderRadius: '50%',
                                                opacity: isDark ? 0.1 : 0.05,
                                                animation: 'float-around 15s ease-in-out infinite'
                                            }} />

                                            <style>{`
                                                    @keyframes float-around {
                                                        0%, 100% { transform: translate(0, 0); }
                                                        25% { transform: translate(20px, 40px); }
                                                        50% { transform: translate(-30px, -10px); }
                                                        75% { transform: translate(10px, -30px); }
                                                    }
                                                `}</style>
                                        </>
                                    );
                                })()
                            )}

                            {project.id === 3 && (
                                <>
                                    {/* Null Hypothesis Texture System */}
                                    {/* 1. Noise Layer */}
                                    <div style={{
                                        position: 'absolute', inset: 0, zIndex: -1, pointerEvents: 'none',
                                        opacity: theme === 'dark' ? 0.08 : 0.05,
                                        // CSS-only Grain Texture (0 GPU cost compared to SVG feTurbulence)
                                        backgroundImage: `repeating-linear-gradient(45deg, rgba(0,0,0,0.05) 0px, transparent 1px, transparent 2px), repeating-linear-gradient(135deg, rgba(0,0,0,0.05) 0px, transparent 1px, transparent 2px)`,
                                        backgroundSize: '4px 4px',
                                        mixBlendMode: 'overlay'
                                    }} />

                                    {/* 2. Vignette Layer */}
                                    <div style={{
                                        position: 'absolute', inset: 0, zIndex: -1, pointerEvents: 'none',
                                        background: theme === 'dark'
                                            ? 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 60%, rgba(0, 0, 0, 0.4) 100%)'
                                            : 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0.2) 100%)'
                                    }} />

                                    {/* 3. Graph Paper Grid */}
                                    <div style={{
                                        position: 'absolute', inset: 0, zIndex: -1, pointerEvents: 'none',
                                        opacity: 0.03,
                                        backgroundImage: `linear-gradient(${theme === 'dark' ? '#E0DCD3' : '#1F1D1B'} 1px, transparent 1px), linear-gradient(90deg, ${theme === 'dark' ? '#E0DCD3' : '#1F1D1B'} 1px, transparent 1px)`,
                                        backgroundSize: '40px 40px'
                                    }} />
                                </>
                            )}

                            {/* Close Button / Back */}
                            <button
                                onClick={handleClose}
                                aria-label="Close Project Details"
                                style={{
                                    position: 'absolute',
                                    top: '2rem',
                                    right: '2rem',
                                    background: theme === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.8)',
                                    border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                                    borderRadius: '50%',
                                    width: '44px',
                                    height: '44px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    zIndex: 100,
                                    backdropFilter: 'blur(10px)',
                                    transition: 'all 0.2s ease',
                                    color: 'var(--text-dim)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'rotate(90deg)';
                                    e.currentTarget.style.backgroundColor = 'rgba(255, 68, 68, 0.1)';
                                    e.currentTarget.style.borderColor = '#ff4444';
                                    e.currentTarget.style.color = '#ff4444';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'rotate(0deg)';
                                    e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.8)';
                                    e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
                                    e.currentTarget.style.color = 'var(--text-dim)';
                                }}
                            >
                                <X size={20} strokeWidth={2} style={{ color: 'inherit' }} />
                            </button>


                            {/* --- LEFT COLUMN: INFO --- */}
                            <div style={{
                                padding: isMobile ? '4rem 1.5rem 2rem 1.5rem' : '3rem 3rem 6rem 3rem', // Responsive Padding
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                                textAlign: 'left',
                                position: 'relative',
                                zIndex: 10,
                                height: 'auto', // Auto height to fit content
                                minHeight: isMobile ? 'auto' : '100%',
                                overflowY: isMobile ? 'visible' : 'auto',  // Disable internal scroll on mobile, use main container
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none'
                            }}>
                                <style>{`
                                        div::-webkit-scrollbar {
                                            display: none;
                                        }
                                    `}</style>

                                {/* PROJECT LOGO (Above Title) */}
                                {project.stamp && (() => {
                                    const Stamp = project.stamp;
                                    const isComponent = typeof Stamp !== 'string';

                                    return (
                                        <div style={{
                                            marginBottom: '2rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-start'
                                        }}>
                                            {isComponent ? (
                                                <Stamp
                                                    size={160}
                                                    strokeWidth={2}
                                                    style={{
                                                        color: project.color,
                                                        filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))'
                                                    }}
                                                />
                                            ) : (
                                                <img
                                                    src={Stamp}
                                                    alt={`${project.title} logo`}
                                                    loading="lazy"
                                                    width="160"
                                                    height="160"
                                                    style={{
                                                        width: '160px',
                                                        height: '160px',
                                                        objectFit: 'contain',
                                                        filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))'
                                                    }}
                                                />
                                            )}
                                        </div>
                                    );
                                })()}

                                <h1 style={{
                                    fontSize: isMobile ? '2rem' : '3rem', // Smaller title on mobile
                                    color: project.color,
                                    marginBottom: '0.5rem',
                                    lineHeight: 1,
                                    fontWeight: 800,
                                    fontFamily: 'Syne, sans-serif',
                                    transition: 'color 0.3s ease' // Smooth transition
                                }}>
                                    {project.link && project.link !== '#' ? (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                // DISPLAY: INLINE to allow text wrapping with icon at end
                                                display: 'inline',
                                                width: 'auto',
                                                // gap doesn't work on inline, use margin on child
                                            }}
                                            onMouseEnter={(e) => {
                                                // Force override of ALL global hover styles
                                                e.currentTarget.style.setProperty('text-decoration', 'underline', 'important');

                                                // Use adaptive color for Polymath (Gold in Dark Mode), otherwise Project Color
                                                const hoverColor = project.id === 7 ? 'var(--text-main)' : project.color;

                                                e.currentTarget.style.setProperty('text-decoration-color', hoverColor, 'important');
                                                e.currentTarget.style.setProperty('color', hoverColor, 'important');
                                                e.currentTarget.style.setProperty('text-shadow', 'none', 'important'); // KILL THE BLUE SHADOW
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.textDecoration = 'none';
                                                e.currentTarget.style.color = project.id === 7 ? 'var(--text-main)' : project.color;
                                                e.currentTarget.style.textShadow = 'none';
                                            }}
                                        >
                                            {project.title}
                                            <ExternalLink
                                                size={28}
                                                strokeWidth={3}
                                                style={{
                                                    display: 'inline-block',
                                                    marginLeft: '6px', // Gap replacement
                                                    verticalAlign: 'middle', // Align with text
                                                    position: 'relative',
                                                    top: '-4px' // Optical adjustment for baseline
                                                }}
                                            />
                                        </a>
                                    ) : (
                                        project.title
                                    )}
                                </h1>
                                <span style={{
                                    fontSize: '1rem',
                                    color: 'var(--text-dim)',
                                    display: 'block',
                                    marginBottom: '2rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    transition: 'color 0.3s ease' // Smooth transition
                                }}>
                                    {project.category}
                                </span>

                                <p style={{
                                    fontSize: '1rem',
                                    lineHeight: '1.6',
                                    maxWidth: '90%',
                                    marginBottom: '2rem',
                                    color: 'var(--text-main)',
                                    transition: 'color 0.3s ease' // Smooth transition
                                }}>
                                    {project.description}
                                </p>

                                {/* TECH STACK ICONS */}
                                <div style={{ marginBottom: '2rem' }}>
                                    <h4 style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '0.75rem', textTransform: 'uppercase', transition: 'color 0.3s ease' }}>Technologies Used</h4>
                                    <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                        {project.techStack && project.techStack.map(tech => {
                                            const techName = typeof tech === 'string' ? tech : tech.name;
                                            const iconData = techIcons[techName] || techIcons[tech];
                                            const key = techName;

                                            // Handle Simple Icons (Object with path)
                                            if (iconData && iconData.path) {
                                                return (
                                                    <div
                                                        key={key}
                                                        title={techName}
                                                        style={{
                                                            cursor: 'help',
                                                            transition: 'all 0.3s ease',
                                                            color: 'var(--text-dim)', // Monochrome default
                                                            display: 'flex',
                                                            alignItems: 'center'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.transform = 'scale(1.1)';
                                                            e.currentTarget.style.color = `#${iconData.hex}`;
                                                            e.currentTarget.style.filter = 'drop-shadow(0 0 5px rgba(0,0,0,0.5))';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.transform = 'scale(1)';
                                                            e.currentTarget.style.color = 'var(--text-dim)';
                                                            e.currentTarget.style.filter = 'none';
                                                        }}
                                                    >
                                                        <svg
                                                            viewBox="0 0 24 24"
                                                            width="24"
                                                            height="24"
                                                            fill="currentColor"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path d={iconData.path} />
                                                        </svg>
                                                    </div>
                                                );
                                            }

                                            // Handle Custom/Lucide Fallbacks
                                            const Icon = (techName === 'Translation' ? Languages : (techName === 'Stats' ? Globe : Globe));

                                            return (
                                                <div
                                                    key={key}
                                                    title={techName}
                                                    style={{
                                                        cursor: 'help',
                                                        transition: 'all 0.3s ease',
                                                        color: 'var(--text-dim)', // Monochrome default
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.transform = 'scale(1.1)';
                                                        e.currentTarget.style.color = 'var(--text-main)'; // Highlight white
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.transform = 'scale(1)';
                                                        e.currentTarget.style.color = 'var(--text-dim)';
                                                    }}
                                                >
                                                    <Icon size={24} strokeWidth={1.5} />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div style={{ position: 'relative', marginTop: '1rem' }}>
                                    {/* Stamp Removed per user request */}
                                    {/* Link Removed - Moved to Title */}

                                    {/* Project-Specific Visual Context */}
                                    {/* Removed Roman Hand to standardize layout with other cards */}
                                    {(() => {
                                        return null;
                                    })()}
                                </div>
                            </div>

                            {/* --- RIGHT COLUMN: GALLERY --- */}
                            <div style={{
                                height: isMobile ? 'auto' : '100%', // Auto height on mobile to push wrapper
                                minHeight: isMobile ? '300px' : '100%', // Ensure visibility on mobile
                                overflowY: isMobile ? 'visible' : 'auto', // Disable internal scroll on mobile
                                width: '100%', // Full width
                                display: 'flex',
                                flexDirection: 'column',
                                scrollbarWidth: 'none', // Hide scrollbar for cleaner look
                                msOverflowStyle: 'none',
                                flexShrink: 0
                            }}>
                                <div style={{
                                    padding: isMobile ? '2rem 1.5rem 4rem 1.5rem' : '6rem 2rem 3rem 2rem', // Responsive Padding
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '2rem'
                                }}>

                                    <style>{`
                                        div::-webkit-scrollbar {
                                            display: none; /* Chrome/Safari/Opera */
                                        }
                                    `}</style>

                                    {/* Ulafala / Decor (Moved to Right Column background or top) */}
                                    {(project.id === 1 || project.id === 0) && project.overlayImage && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '-150px',
                                            right: '-90px',
                                            width: '500px',
                                            height: '500px',
                                            backgroundImage: `url(${project.overlayImage})`,
                                            backgroundSize: 'contain',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center',
                                            pointerEvents: 'none',
                                            zIndex: 1,
                                            opacity: 0.8,
                                            transform: 'rotate(15deg)',
                                            filter: 'drop-shadow(-10px 10px 20px rgba(0,0,0,0.2))',
                                            // Make it float behind the content
                                        }} />
                                    )}

                                    {/* VISUALS: NOTEBOOK CELLS (SharkPy) */}
                                    {project.notebookCells && project.notebookCells.length > 0 ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '0 2rem 2rem 0' }}>
                                            {project.notebookCells.map((cell, i) => {
                                                const isDark = theme === 'dark';

                                                // Markdown cells
                                                if (cell.type === 'markdown') {
                                                    return (
                                                        <div key={i} style={{
                                                            padding: '0.75rem 1rem',
                                                            color: 'var(--text-main)',
                                                            fontSize: '0.938rem',
                                                            lineHeight: '1.6'
                                                        }}>
                                                            {cell.content.split('\n').map((line, idx) => {
                                                                if (line.startsWith('# ')) {
                                                                    return <h1 key={idx} style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{line.substring(2)}</h1>;
                                                                } else if (line.startsWith('## ')) {
                                                                    return <h2 key={idx} style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{line.substring(3)}</h2>;
                                                                } else if (line.startsWith('### ')) {
                                                                    return <h3 key={idx} style={{ fontSize: '1.1rem', fontWeight: '600', marginTop: '0.75rem', marginBottom: '0.5rem', color: 'var(--text-dim)' }}>{line.substring(4)}</h3>;
                                                                } else if (line) {
                                                                    return <p key={idx} style={{ margin: '0.25rem 0' }}>{line}</p>;
                                                                }
                                                                return null;
                                                            })}
                                                        </div>
                                                    );
                                                }

                                                // Code cells (input/output)

                                                // Custom Jupyter Themes (Matches official Jupyter colors)
                                                // Light Mode (Classic Notebook)
                                                const jupyterLight = {
                                                    'hljs': {
                                                        display: 'block',
                                                        overflowX: 'auto',
                                                        padding: '0.5em',
                                                        color: '#212121', // Official Black/Dark Gray
                                                        background: 'transparent'
                                                    },
                                                    'hljs-keyword': { color: '#008000', fontWeight: 'bold' }, // Green Bold
                                                    'hljs-string': { color: '#BA2121' }, // Red
                                                    'hljs-number': { color: '#008000' }, // Green
                                                    'hljs-comment': { color: '#408080', fontStyle: 'italic' }, // Teal Italic
                                                    'hljs-meta': { color: '#AA22FF' }, // Purple (Decorators/magics)
                                                    'hljs-doc">keyword': { color: '#008000', fontWeight: 'bold' } // Docstrings
                                                };

                                                // Dark Mode (JupyterLab Dark) - basing on atomOneDark but ensuring clean fit
                                                // JupyterLab Dark uses similar One Dark-ish colors
                                                const jupyterDark = {
                                                    ...atomOneDark,
                                                    'hljs': {
                                                        ...atomOneDark['hljs'],
                                                        background: 'transparent',
                                                        color: '#ffffff' // Pure white text for contrast
                                                    },
                                                    // Ensure keywords pop
                                                    'hljs-keyword': { color: '#C678DD', fontWeight: 'bold' },
                                                    'hljs-string': { color: '#98c379' },
                                                };

                                                const activeTheme = isDark ? jupyterDark : jupyterLight;
                                                const isInput = cell.type === 'input';
                                                const count = cell.count || 1;

                                                // Label Styles
                                                const labelColor = isInput
                                                    ? (isDark ? '#4F92D2' : '#306998') // Jupyter Blue
                                                    : (isDark ? '#FF6B6B' : '#D43A3A'); // Jupyter Red

                                                const labelText = isInput ? `In [${count}]:` : `Out[${count}]:`;

                                                return (
                                                    <div key={i} style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        gap: '10px',
                                                        margin: '1rem 0',
                                                        alignItems: 'flex-start'
                                                    }}>
                                                        {/* GUTTER LABEL */}
                                                        <div style={{
                                                            flexShrink: 0,
                                                            minWidth: '4.5em',
                                                            textAlign: 'right',
                                                            paddingTop: '0.4em',
                                                            fontFamily: 'monospace',
                                                            fontSize: '0.75rem',
                                                            color: labelColor,
                                                            userSelect: 'none'
                                                        }}>
                                                            {labelText}
                                                        </div>

                                                        {/* CONTENT AREA */}
                                                        <div style={{
                                                            flexGrow: 1,
                                                            borderRadius: '4px',
                                                            background: isDark ? 'rgba(0,0,0,0.3)' : '#f5f5f5',
                                                            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#e0e0e0'}`,
                                                            overflow: 'hidden',
                                                            maxWidth: '100%'
                                                        }}>
                                                            <React.Suspense fallback={<div style={{ padding: '1rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>Loading code...</div>}>
                                                                <CodeViewer
                                                                    code={cell.content}
                                                                    isDark={isDark}
                                                                    isInput={isInput}
                                                                    count={count}
                                                                />
                                                            </React.Suspense>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : project.gallery && project.gallery.length > 0 ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '0 2rem 2rem 0' }}>
                                            {project.gallery.map((item, i) => {
                                                const isObject = typeof item === 'object';
                                                let imgPath;
                                                if (isObject) {
                                                    imgPath = item.src;
                                                } else {
                                                    const hasExtension = item.endsWith('.png') || item.endsWith('.jpg');
                                                    imgPath = hasExtension ? item : `${item}-${theme === 'dark' ? 'dark' : 'light'}.png`;
                                                }

                                                return (
                                                    <div key={i} style={{
                                                        display: isObject ? 'grid' : 'flex',
                                                        gridTemplateColumns: isObject ? '1fr 1fr' : undefined,
                                                        flexDirection: 'column',
                                                        gap: isObject ? '1.5rem' : '1rem',
                                                        marginBottom: '1rem'
                                                    }}>
                                                        <div
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setExpandedImg(imgPath);
                                                            }}
                                                            style={{
                                                                width: '100%',
                                                                borderRadius: '12px',
                                                                overflow: 'hidden',
                                                                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                                                                border: '1px solid var(--grid-line)',
                                                                cursor: 'zoom-in',
                                                                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                e.currentTarget.style.transform = 'scale(1.02)';
                                                                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,255,159,0.1)';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.currentTarget.style.transform = 'scale(1)';
                                                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                                                            }}
                                                        >
                                                            <img
                                                                src={imgPath}
                                                                alt={isObject ? item.title : "Project screenshot"}
                                                                style={{
                                                                    width: isObject ? 'auto' : '100%',
                                                                    maxWidth: '100%',
                                                                    height: 'auto',
                                                                    display: 'block',
                                                                    margin: '0 auto'
                                                                }}
                                                                loading="lazy"
                                                            />
                                                        </div>
                                                        {isObject && (
                                                            <div style={{
                                                                padding: '2rem',
                                                                background: 'rgba(0,0,0,0.2)',
                                                                border: `1px solid ${project.color}33`,
                                                                borderRadius: '4px',
                                                                height: 'fit-content'
                                                            }}>
                                                                <h3 style={{
                                                                    fontSize: '1.8rem', // Increased size
                                                                    marginBottom: '1rem',
                                                                    color: project.color,
                                                                    fontFamily: 'Syne, sans-serif'
                                                                }}>
                                                                    {item.title}
                                                                </h3>
                                                                <p style={{
                                                                    fontSize: '1.1rem', // Increased size
                                                                    lineHeight: '1.6',
                                                                    color: 'var(--text-main)' // Strict black/white
                                                                }}>
                                                                    {item.description}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div style={{
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'var(--text-dim)',
                                            fontStyle: 'italic'
                                        }}>
                                            No visuals available.
                                        </div>
                                    )}

                                    {/* --- LIGHTBOX MODAL --- */}
                                    {expandedImg && (
                                        <React.Suspense fallback={null}>
                                            <Lightbox
                                                src={expandedImg}
                                                onClose={() => setExpandedImg(null)}
                                            />
                                        </React.Suspense>
                                    )}

                                </div>

                            </div>
                            {/* OLD ROMAN HAND (Maybe remove or minimize?) */}

                            {
                                project.id === 1 && (
                                    /* Removed hand for now as it conflicts with the gallery layout */
                                    null
                                )
                            }

                        </div>
                    </animated.div>
                );
            })
            }

            {/* --- LIGHTBOX MODAL --- */}
            {
                expandedImg && (
                    <React.Suspense fallback={null}>
                        <Lightbox
                            src={expandedImg}
                            onClose={() => setExpandedImg(null)}
                        />
                    </React.Suspense>
                )
            }

        </div >
    );
}
