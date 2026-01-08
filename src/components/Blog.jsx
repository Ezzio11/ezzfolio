import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { useSearchParams } from 'react-router-dom';
import { Link as LinkIcon, Check } from 'lucide-react';

import { POSTS } from '../data/posts';

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
    const [selectedPost, setSelectedPost] = useState(null); // Stores the full post object now, not just slug
    const [content, setContent] = useState('');
    const [scrollProgress, setScrollProgress] = useState(0);
    const [copied, setCopied] = useState(false);
    const contentRef = useRef(null);

    const loadPostContent = async (slug) => {
        try {
            const response = await fetch(`/posts/${slug}.md`);
            if (!response.ok) throw new Error('Post not found');
            const text = await response.text();
            setContent(text);
        } catch (error) {
            setContent("# 404\n\nGhost in the machine. Post not found.");
        }
    };

    // Effect: Handle URL params on mount and change
    useEffect(() => {
        const postSlug = searchParams.get('post');
        if (postSlug) {
            const post = POSTS.find(p => p.slug === postSlug);
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
    }, [searchParams]);

    const openPost = (post) => {
        setSearchParams({ post: post.slug });
        // The useEffect will handle the loading
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
            <h2 className="section-title">
                Writing
            </h2>


            <ul style={{ listStyle: 'none', padding: 0 }}>
                {POSTS.map(post => (
                    <li key={post.slug} style={{ marginBottom: '1rem' }}>
                        <button
                            onClick={() => openPost(post)}
                            style={{
                                background: 'transparent',
                                border: `1px solid ${borderMain}`,
                                color: textMain,
                                padding: '1rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%',
                                textAlign: 'left',
                                transition: 'all 0.2s',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--neon-blue)';
                                e.currentTarget.style.background = isDark ? 'rgba(14, 181, 255, 0.1)' : 'rgba(14, 181, 255, 0.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = borderMain;
                                e.currentTarget.style.background = 'transparent';
                            }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <span style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1.2rem', color: textMain }}>{post.title}</span>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    {post.tags && post.tags.map(tag => (
                                        <span key={tag} style={{
                                            fontSize: '0.8rem',
                                            padding: '2px 8px',
                                            borderRadius: '12px',
                                            border: `1px solid ${TagColors[tag] || textDim}`,
                                            color: TagColors[tag] || textDim,
                                            fontFamily: 'Space Grotesk, sans-serif'
                                        }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
                                <span style={{ opacity: 0.8, fontFamily: 'Space Grotesk, sans-serif', color: textMain }}>{post.date}</span>
                                <span style={{ fontSize: '0.8rem', opacity: 0.6, fontFamily: 'Space Grotesk, sans-serif', color: textMain }}>{post.readTime}</span>
                            </div>
                        </button>
                    </li>
                ))}
            </ul>


            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: bgMain,
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
                        padding: '4rem 2rem',
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
                                    fontSize: '4rem',
                                    fontWeight: 800,
                                    marginBottom: '1rem',
                                    color: textMain,
                                    lineHeight: 1.1,
                                    letterSpacing: '-2px'
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
                                    h2: ({ node, ...props }) => <h2 style={{ fontFamily: 'Syne', fontSize: '2.5rem', fontWeight: 700, marginTop: '4rem', marginBottom: '1.5rem', color: textMain, letterSpacing: '-0.5px' }} {...props} />,
                                    h3: ({ node, ...props }) => <h3 style={{ fontFamily: 'Syne', fontSize: '2rem', fontWeight: 700, marginTop: '3rem', marginBottom: '1rem', color: textMain }} {...props} />,
                                    p: ({ node, ...props }) => <p style={{ fontFamily: 'Space Grotesk, sans-serif', lineHeight: '1.8', fontSize: '1.2rem', marginBottom: '2rem', color: textMain, maxWidth: '65ch', opacity: 0.9 }} {...props} />,
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
        </div>
    );
}
