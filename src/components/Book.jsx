import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Page-turner: cover alone, then two-page spreads (one page at a time on narrow screens via CSS).
export default function Book({ title, pages, onClose }) {
    const [i, setI] = useState(0); // index of the left page of the current spread
    const step = () => (window.innerWidth < 800 ? 1 : i === 0 ? 1 : 2);
    const next = () => setI((n) => Math.min(n + step(), pages.length - 1));
    const prev = () => setI((n) => Math.max(n - (window.innerWidth < 800 ? 1 : n <= 1 ? n : 2), 0));

    useEffect(() => {
        const k = (e) => (e.key === 'ArrowRight' ? next() : e.key === 'ArrowLeft' ? prev() : e.key === 'Escape' && onClose());
        window.addEventListener('keydown', k);
        document.body.style.overflow = 'hidden';
        return () => { window.removeEventListener('keydown', k); document.body.style.overflow = ''; };
    });

    const spread = [pages[i], i > 0 && pages[i + 1]].filter(Boolean);
    return (
        <div className="book" role="dialog" aria-label={title}>
            <button className="book-x" onClick={onClose} aria-label="Close"><X size={22} /></button>
            <button className="book-nav" onClick={prev} disabled={i === 0} aria-label="Previous page"><ChevronLeft /></button>
            <div className="spread" onTouchStart={(e) => (e.currentTarget.x = e.touches[0].clientX)}
                onTouchEnd={(e) => { const d = e.changedTouches[0].clientX - e.currentTarget.x; if (Math.abs(d) > 50) d < 0 ? next() : prev(); }}>
                {spread.map((p, n) => <img key={p.src} src={p.src} alt={`${title}, page ${i + n + 1}`} className={n ? 'pg2' : ''} />)}
            </div>
            <button className="book-nav" onClick={next} disabled={i >= pages.length - 1} aria-label="Next page"><ChevronRight /></button>
            <div className="book-count">{title} · {i + 1}{spread.length > 1 ? `–${i + 2}` : ''} / {pages.length}</div>
        </div>
    );
}
