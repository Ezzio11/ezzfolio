const links = [
    ['Instagram', 'https://www.instagram.com/theonlyezzio'],
    ['GitHub', 'https://github.com/Ezzio11'],
    ['LinkedIn', 'https://www.linkedin.com/in/ezzeldinahmed'],
    ['Email', 'mailto:ezzeldinahmad96@gmail.com'],
];

export default function Hero() {
    return (
        <header className="hero">
            <h1>Ezz Eldin<br /><em>makes things.</em></h1>
            <p>
                Posters, jackets, zines, and the occasional website, made for the love of it.
                Mostly wrestling, football, and Arabic type. By day I'm a cofounder at{' '}
                <a href="https://mzfortech.com" target="_blank" rel="noopener noreferrer">MZ</a>.
            </p>
            <nav className="socials">
                {links.map(([l, u]) => (
                    <a key={l} href={u} {...(l === 'Email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}>{l}</a>
                ))}
            </nav>
        </header>
    );
}
