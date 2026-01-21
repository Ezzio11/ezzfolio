import { POSTS } from '../src/data/posts.js';

export default async function handler(req, res) {
    const { post } = req.query;

    // 1. If no post param, redirect to home (should cover edge cases)
    if (!post) {
        return res.redirect('/');
    }

    // 2. Find post in shared data
    const targetPost = POSTS.find(p => p.slug === post);

    if (!targetPost) {
        // If post not found, just redirect to home or serve basic index
        return res.redirect('/');
    }

    try {
        // 3. Update metadata
        const title = `${targetPost.title} | Ezzio`;
        const description = targetPost.description || `Read "${targetPost.title}" on Ezzio's Portfolio.`;
        const url = `https://ezzio.me/?post=${targetPost.slug}`;
        const image = `https://ezzio.me/assets/og-image.webp`; // Fallback or dynamic if available

        // 4. Fetch the original SPA shell (index.html)
        // We fetch from the current deployment URL
        const protocol = req.headers['x-forwarded-proto'] || 'https';
        const host = req.headers.host;
        const indexUrl = `${protocol}://${host}/index.html`;

        const response = await fetch(indexUrl);
        const page = await response.text();

        const updatedPage = page
            .replace(
                /<title>.*?<\/title>/,
                `<title>${title}</title>`
            )
            .replace(
                /content="[^"]*Ezz Eldin Ahmed \| Full-Stack Systems Developer[^"]*"/g,
                `content="${title}"`
            )
            .replace(
                /property="og:title" content="[^"]*"/,
                `property="og:title" content="${title}"`
            )
            .replace(
                /property="twitter:title" content="[^"]*"/,
                `property="twitter:title" content="${title}"`
            )
            .replace(
                /name="description" content="[^"]*"/,
                `name="description" content="${description}"`
            )
            .replace(
                /property="og:description" content="[^"]*"/,
                `property="og:description" content="${description}"`
            )
            .replace(
                /property="twitter:description" content="[^"]*"/,
                `property="twitter:description" content="${description}"`
            )
            .replace(
                /property="og:url" content="[^"]*"/,
                `property="og:url" content="${url}"`
            );

        res.setHeader('Content-Type', 'text/html');
        return res.status(200).send(updatedPage);

    } catch (error) {
        console.error('SEO Injection Error:', error);
        return res.status(500).send('Error generating preview');
    }
}
