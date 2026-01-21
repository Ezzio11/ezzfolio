import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { useSearchParams } from 'react-router-dom';
import { Link as LinkIcon, Check } from 'lucide-react';

const GIST_BASE_URL = 'https://gist.githubusercontent.com/Ezzio11/454a4a619287b03ae0fea1caa11a854d/raw/';

const TagColors = {
    'General': '#0eb5ff', // Bright Blue
    'Design': '#ff0055',  // Bright Pink
    'UI': '#e879f9',
    'Dev': '#00ff9d',     // Bright Green
    'Math': '#fbbf24'
};

export default function Blog({ theme }) {
    const isDark = theme === 'dark';
    const bgMain = isDark ? '#050505' : '#ffffff';
    const textMain = isDark ? '#ffffff' : '#111111';
    const textDim = isDark ? '#888' : '#666';
    const borderMain = isDark ? '#333' : '#e0e0e0';
    const codeBg = isDark ? '#0a0a0a' : '#f5f5f5';

    const [searchParams, setSearchParams] = useSearchParams();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState(null);
    const [content, setContent] = useState('');
    const [scrollProgress, setScrollProgress] = useState(0);
    const [copied, setCopied] = useState(false);
    const contentRef = useRef(null);

    // Responsive Mobile Hook
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Fetch Manifest on Mount
    useEffect(() => {
        const fetchManifest = async () => {
            if (GIST_BASE_URL.includes('YOUR_GIST')) {
                // Fallback for demo/dev if user hasn't set it up
                console.warn("Gist URL not set. Using empty list.");
                setIsLoading(false);
                return;
            }

            try {
                // We append a query param ?t=Date.now() to bypass caching for the manifest
                const res = await fetch(`${GIST_BASE_URL}manifest.json?t=${Date.now()}`);
                if (!res.ok) throw new Error('Failed to load manifest');
                const data = await res.json();
                // Sort by date descending
                const sortedData = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setPosts(sortedData);
            } catch (err) {
                console.error("Blog Error:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchManifest();
    }, []);

    const loadPostContent = async (slug) => {
        try {
            // First try fetching from Gist
            const gistResponse = await fetch(`${GIST_BASE_URL}${slug}.md`);
            if (gistResponse.ok) {
                const text = await gistResponse.text();
                setContent(text);
                return;
            }

            // Fallback to local if Gist fails (optional, good for migration)
            const localResponse = await fetch(`/posts/${slug}.md`);
            if (!localResponse.ok) throw new Error('Post not found');
            const text = await localResponse.text();
            setContent(text);
        } catch (error) {
            setContent("# 404\n\nGhost in the machine. Post not found.");
        }
    };

    // Effect: Handle URL params on mount and change
    useEffect(() => {
        const postSlug = searchParams.get('post');
        if (postSlug && posts.length > 0) {
            const post = posts.find(p => p.slug === postSlug);
            if (post) {
                if (selectedPost?.slug !== postSlug) {
                    setSelectedPost(post);
                    loadPostContent(postSlug);
                    setScrollProgress(0);
                }
            }
        } else {
            if (selectedPost) {
                setSelectedPost(null);
            }
        }
    }, [searchParams, posts]);

    const openPost = (post) => {
        setSearchParams({ post: post.slug });
    };

    const closePost = () => {
        setSearchParams({});
    };

    const handleShare = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (scrollHeight - clientHeight === 0) return;
        const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setScrollProgress(progress);
    };

    // Handle Escape Key
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && selectedPost) {
                closePost();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedPost]);

    return (
        <div style={{ position: 'relative' }}>
            <h2 className="section-title" style={{ fontSize: '2rem' }}>
                Writing
            </h2>


            {isLoading ? (
                <div style={{ color: textDim, fontFamily: 'Space Grotesk, sans-serif' }}>
                    Fetching latest writings...
                </div>
            ) : posts.length === 0 ? (
                <div style={{ color: textDim, fontFamily: 'Space Grotesk, sans-serif', padding: '1rem', border: `1px dashed ${borderMain}`, borderRadius: '8px' }}>
                    {GIST_BASE_URL.includes('YOUR_GIST')
                        ? "Waiting for connection... (Add your Gist URL in Blog.jsx)"
                        : "No posts found."}
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
                    {/* Hero / Featured Post - Modern Magazine Style */}
                    {posts.length > 0 && (() => {
                        const featured = posts[0];
                        return (
                            <div className="featured-post" style={{
                                marginBottom: '2rem',
                                position: 'relative'
                            }}>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '0.5rem 1rem',
                                    background: 'var(--neon-pink)',
                                    color: '#fff',
                                    fontFamily: 'Space Grotesk, sans-serif',
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    marginBottom: '1.5rem',
                                    borderRadius: '4px'
                                }}>
                                    Latest Issue
                                </div>

                                <button
                                    onClick={() => openPost(featured)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        padding: 0,
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        width: '100%',
                                        display: 'block'
                                    }}
                                    className="hover-trigger"
                                >
                                    <h3 style={{
                                        fontFamily: 'Syne, sans-serif',
                                        fontSize: 'clamp(2rem, 9vw, 6rem)',
                                        fontWeight: 800,
                                        color: textMain,
                                        lineHeight: 0.95,
                                        marginTop: 0,
                                        marginBottom: '1.5rem',
                                        letterSpacing: '-2px',
                                        textTransform: 'uppercase',
                                        transition: 'color 0.3s ease'
                                    }}
                                        onMouseEnter={e => e.currentTarget.style.color = 'var(--neon-blue)'}
                                        onMouseLeave={e => e.currentTarget.style.color = textMain}
                                    >
                                        {featured.title}
                                    </h3>

                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                        gap: '2rem',
                                        borderTop: `2px solid ${textMain}`,
                                        paddingTop: '1.5rem'
                                    }}>
                                        <p style={{
                                            fontFamily: 'Space Grotesk, sans-serif',
                                            fontSize: '1.2rem',
                                            color: textDim,
                                            lineHeight: 1.5,
                                            margin: 0,
                                            maxWidth: '50ch'
                                        }}>
                                            {featured.description || "Read the latest thoughts on engineering, design, and the spaces in between."}
                                        </p>

                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            alignItems: 'flex-start'
                                        }}>
                                            <span style={{
                                                fontFamily: 'IBM Plex Mono, monospace',
                                                fontSize: '0.9rem',
                                                color: textMain,
                                                background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                                                padding: '0.5rem 1rem',
                                                borderRadius: '4px'
                                            }}>
                                                READ STORY <span style={{ marginLeft: '10px' }}>→</span>
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        );
                    })()}

                    {/* Recent Posts Grid - Structured Rows */}
                    {posts.length > 1 && (
                        <div>
                            <h4 style={{
                                fontFamily: 'Space Grotesk, sans-serif',
                                textTransform: 'uppercase',
                                fontSize: '1rem',
                                fontWeight: 700,
                                letterSpacing: '1px',
                                color: textMain,
                                borderBottom: `4px solid ${textMain}`,
                                paddingBottom: '0.5rem',
                                marginBottom: '3rem'
                            }}>
                                More to read
                            </h4>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0'
                            }}>
                                {posts.slice(1).map((post, index) => (
                                    <div key={post.slug} className="recent-post" style={{
                                        borderTop: index === 0 ? 'none' : `1px solid ${borderMain}`,
                                        padding: '2rem 0',
                                        position: 'relative'
                                    }}>
                                        <button
                                            onClick={() => openPost(post)}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                padding: 0,
                                                textAlign: 'left',
                                                cursor: 'pointer',
                                                width: '100%',
                                                display: 'grid',
                                                gridTemplateColumns: isMobile ? '1fr' : '1fr 3fr auto',
                                                alignItems: 'baseline',
                                                gap: isMobile ? '0.5rem' : '2rem',
                                                transition: 'transform 0.2s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = 'translateX(10px)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'translateX(0)';
                                            }}
                                        >
                                            <div style={{
                                                fontFamily: 'IBM Plex Mono, monospace',
                                                fontSize: '0.8rem',
                                                color: textDim
                                            }}>
                                                {post.date}
                                            </div>

                                            <div>
                                                <h4 style={{
                                                    fontFamily: 'Syne, sans-serif',
                                                    fontSize: isMobile ? '1.5rem' : '2rem',
                                                    fontWeight: 700,
                                                    color: textMain,
                                                    margin: '0 0 0.5rem 0',
                                                    lineHeight: 1.1,
                                                    transition: 'color 0.2s'
                                                }}>
                                                    {post.title}
                                                </h4>
                                                <p style={{
                                                    fontFamily: 'Space Grotesk, sans-serif',
                                                    fontSize: '0.95rem',
                                                    color: textDim,
                                                    margin: 0,
                                                    maxWidth: '60ch',
                                                    display: 'none',
                                                }} className="desktop-only-desc">
                                                    {post.description}
                                                </p>
                                            </div>

                                            <div style={{
                                                fontFamily: 'Space Grotesk, sans-serif',
                                                fontSize: '1.5rem',
                                                color: textDim,
                                                fontWeight: 300
                                            }}>
                                                ↗
                                            </div>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}



            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: bgMain,
                border: 'none',
                boxSizing: 'border-box',
                zIndex: 99999,
                // Slide Entrace Logic
                transform: selectedPost ? 'translateX(0%)' : 'translateX(100%)',
                opacity: selectedPost ? 1 : 0,
                pointerEvents: selectedPost ? 'all' : 'none',
                transition: selectedPost
                    ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, visibility 0s linear 0s'
                    : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, visibility 0s linear 0.5s',
                visibility: selectedPost ? 'visible' : 'hidden', // Ensure hidden from screen readers/tabs
                backgroundImage: isDark
                    ? 'radial-gradient(#222 1px, transparent 1px)'
                    : 'radial-gradient(#e0e0e0 1px, transparent 1px)',
                backgroundSize: '30px 30px',
            }}
                ref={contentRef}
            >
                {/* Reading Progress Bar - Positioned Absolutely relative to the fixed container */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '4px',
                    background: 'var(--neon-pink)',
                    width: `${scrollProgress}%`,
                    zIndex: 100000,
                    transition: 'width 0.1s ease-out',
                    boxShadow: '0 0 15px var(--neon-pink)'
                }} />

                {/* Scrollable Content Container */}
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        overflowY: 'auto',
                        padding: isMobile ? '4rem 1rem' : '4rem 2rem',
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                    onScroll={handleScroll}
                >
                    <div style={{ width: '100%', maxWidth: '800px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                            <button
                                onClick={closePost}
                                style={{
                                    background: 'transparent',
                                    border: '1px solid var(--neon-pink)',
                                    color: 'var(--neon-pink)',
                                    padding: '0.5rem 1rem',
                                    cursor: 'pointer',
                                    fontFamily: 'Space Grotesk, sans-serif',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = 'var(--neon-pink)';
                                    e.currentTarget.style.color = '#fff';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = 'var(--neon-pink)';
                                }}
                            >
                                &lt; Return
                            </button>

                            <button
                                onClick={handleShare}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: copied ? 'var(--neon-green)' : textDim,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontFamily: 'Space Grotesk, sans-serif',
                                    fontSize: '0.9rem',
                                    transition: 'color 0.2s'
                                }}
                                title="Copy Link"
                            >
                                {copied ? <Check size={18} /> : <LinkIcon size={18} />}
                                {copied ? 'Copied!' : 'Share'}
                            </button>
                        </div>

                        {/* Post Metadata Header */}
                        {selectedPost && (
                            <div style={{ marginBottom: '4rem', textAlign: 'center', borderBottom: `1px solid ${borderMain}`, paddingBottom: '2rem' }}>
                                <h1 style={{
                                    fontFamily: 'Syne',
                                    fontSize: 'clamp(2rem, 8vw, 4rem)',
                                    fontWeight: 800,
                                    marginBottom: '1rem',
                                    color: textMain,
                                    lineHeight: 1.1,
                                    letterSpacing: '-2px',
                                    wordBreak: 'break-word',
                                    overflowWrap: 'break-word'
                                }}>
                                    {selectedPost.title}
                                </h1>
                                <div style={{
                                    display: 'flex',
                                    gap: '2rem',
                                    justifyContent: 'center',
                                    fontFamily: 'Space Grotesk, sans-serif',
                                    color: textDim,
                                    fontSize: '1.1rem'
                                }}>
                                    <span style={{ color: textMain }}>{selectedPost.date}</span>
                                    <span>•</span>
                                    <span style={{ color: textMain }}>{selectedPost.readTime}</span>
                                </div>
                            </div>
                        )}

                        <div className="markdown-content">
                            <ReactMarkdown
                                children={content}
                                remarkPlugins={[remarkMath, remarkGfm]}
                                rehypePlugins={[rehypeKatex]}
                                components={{
                                    h1: ({ node, ...props }) => <h1 style={{ display: 'none' }} {...props} />, // Hide markdown h1 since we render title manually
                                    h2: ({ node, ...props }) => <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 700, marginTop: '4rem', marginBottom: '1.5rem', color: textMain, letterSpacing: '-0.5px' }} {...props} />,
                                    h3: ({ node, ...props }) => <h3 style={{ fontFamily: 'Syne', fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700, marginTop: '3rem', marginBottom: '1rem', color: textMain }} {...props} />,
                                    p: ({ node, children, ...props }) => {
                                        // Check if children contains a figure element (our img wrapper)
                                        // If so, return children directly to avoid <p><figure> nesting
                                        const hasBlockElement = React.Children.toArray(children).some(
                                            child => child?.type === 'figure' || child?.props?.node?.tagName === 'img'
                                        );

                                        if (hasBlockElement) {
                                            return <>{children}</>;
                                        }

                                        return <p style={{ fontFamily: 'Space Grotesk, sans-serif', lineHeight: '1.8', fontSize: '1.2rem', marginBottom: '2rem', color: textMain, maxWidth: '65ch', opacity: 0.9 }} {...props}>{children}</p>;
                                    },
                                    li: ({ node, ...props }) => <li style={{ fontFamily: 'Space Grotesk, sans-serif', lineHeight: '1.6', marginBottom: '0.5rem', color: textMain, fontSize: '1.1rem', opacity: 0.9 }} {...props} />,
                                    strong: ({ node, ...props }) => <strong style={{ color: textMain, fontWeight: 700 }} {...props} />,
                                    blockquote: ({ node, ...props }) => (
                                        <blockquote style={{
                                            borderLeft: '4px solid var(--neon-yellow)',
                                            paddingLeft: '2rem',
                                            marginLeft: 0,
                                            marginTop: '3rem',
                                            marginBottom: '3rem',
                                            fontStyle: 'italic',
                                            color: textMain,
                                            background: isDark ? '#111' : '#f9f9f9',
                                            padding: '2rem',
                                            borderRadius: '0 8px 8px 0',
                                            fontSize: '1.2rem'
                                        }} {...props} />
                                    ),
                                    code: ({ node, inline, className, children, ...props }) => {
                                        const match = /language-(\w+)/.exec(className || '');
                                        return !inline ? (
                                            <pre style={{
                                                background: codeBg,
                                                padding: '2rem',
                                                borderRadius: '8px',
                                                overflowX: 'auto',
                                                border: `1px solid ${borderMain}`,
                                                margin: '2.5rem 0'
                                            }} {...props}>
                                                <code className={className} style={{ fontFamily: 'IBM Plex Mono', color: isDark ? '#0eb5ff' : '#0066cc', fontSize: '1rem' }}>
                                                    {children}
                                                </code>
                                            </pre>
                                        ) : (
                                            <code style={{
                                                background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                                                padding: '2px 6px',
                                                borderRadius: '4px',
                                                fontFamily: 'IBM Plex Mono',
                                                color: 'var(--neon-green)',
                                                fontSize: '0.9em'
                                            }} {...props}>
                                                {children}
                                            </code>
                                        );
                                    },
                                    img: ({ node, src, alt, ...props }) => {
                                        return (
                                            <figure style={{ margin: '3rem 0', width: '100%' }}>
                                                <img
                                                    src={src}
                                                    alt={alt}
                                                    style={{
                                                        maxWidth: '100%',
                                                        border: `1px solid ${borderMain}`,
                                                        borderRadius: '8px',
                                                        height: 'auto',
                                                        display: 'block',
                                                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                                                    }}
                                                    {...props}
                                                />
                                                {alt && <figcaption style={{
                                                    textAlign: 'center',
                                                    fontSize: '0.9rem',
                                                    color: textDim,
                                                    marginTop: '1rem',
                                                    fontFamily: 'Space Grotesk, sans-serif',
                                                    fontStyle: 'italic'
                                                }}>{alt}</figcaption>}
                                            </figure>
                                        );
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
