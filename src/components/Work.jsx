import React, { useState, useEffect, Suspense } from 'react';
import work from '../data/work.json';

const Lightbox = React.lazy(() => import('./Lightbox'));
const Book = React.lazy(() => import('./Book'));
const { series, singles } = work;

const projects = [
    { title: 'Roman Reigns — Tribal Chief', note: 'A cinematic tribute site to the Tribal Chief.', link: 'https://romanfolio.ezzio.me', img: '/assets/romanfolio/hero.webp' },
    { title: 'FlickBall', note: 'A comic-book tribute to Barça under Hansi Flick.', link: 'https://flickball.ezzio.me', img: '/assets/flickball/gallery-1.webp' },
];
const pad = (n) => String(n).padStart(2, '0');
const all = [...series, ...singles];

export default function Work() {
    const [open, setOpen] = useState(null);
    const [book, setBook] = useState(null);

    // Fade rooms in on scroll; shows everything if IntersectionObserver is missing.
    useEffect(() => {
        const els = document.querySelectorAll('.fade');
        if (!('IntersectionObserver' in window)) return els.forEach((e) => e.classList.add('in'));
        const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))), { threshold: 0.05 });
        els.forEach((e) => io.observe(e));
        return () => io.disconnect();
    }, []);

    const Wall = ({ items, grid }) => (
        <div className={grid ? 'wall grid' : 'wall'}>
            {items.map((it) => (
                <button key={it.src} className="piece" onClick={() => setOpen(it)} aria-label={`View ${it.title}`}>
                    <img src={it.thumb} alt={it.title} loading="lazy" />
                    <span>{it.title}</span>
                </button>
            ))}
        </div>
    );

    return (
        <>
            <nav className="index" aria-label="Sections">
                {all.map((s) => <a key={s.id} href={`#${s.id}`}>{s.title}<sup>{s.items.length}</sup></a>)}
                <a href="#built">Built</a>
            </nav>

            {all.map((s, i) => (
                <section key={s.id} id={s.id} className="room fade">
                    <div className="room-head">
                        <span className="no">{pad(i + 1)}</span>
                        <h2>{s.title}</h2>
                        <span className="n">{s.kind === 'book' ? `${s.items.length} pages` : `${s.items.length} works`}</span>
                    </div>
                    {s.blurb && <p className="blurb">{s.blurb}</p>}
                    {s.kind === 'book' ? (
                        <button className="cover" onClick={() => setBook(s)} aria-label={`Open ${s.title}`}>
                            <img src={s.items[0].src} alt={`${s.title} cover`} loading="lazy" />
                            <span>Open the file →</span>
                        </button>
                    ) : <Wall items={s.items} grid={s.kind === 'grid'} />}
                </section>
            ))}

            <section id="built" className="room fade">
                <div className="room-head">
                    <span className="no">{pad(all.length + 1)}</span>
                    <h2>Built for fun</h2>
                </div>
                <div className="projects">
                    {projects.map((p) => (
                        <a key={p.link} className="project" href={p.link} target="_blank" rel="noopener noreferrer">
                            <div className="frame"><img src={p.img} alt={p.title} loading="lazy" /></div>
                            <h3>{p.title}</h3>
                            <p>{p.note}</p>
                        </a>
                    ))}
                </div>
            </section>

            <Suspense fallback={null}>
                {open && <Lightbox src={open.src} title={open.title} onClose={() => setOpen(null)} />}
                {book && <Book title={book.title} pages={book.items} onClose={() => setBook(null)} />}
            </Suspense>
        </>
    );
}
