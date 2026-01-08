import { POSTS } from '../../src/data/posts.js';

export default async (request, context) => {
    const url = new URL(request.url);
    const postSlug = url.searchParams.get("post");

    // 1. If no post param, return original response
    if (!postSlug) {
        return context.next();
    }

    // 2. Find post in shared data
    const post = POSTS.find(p => p.slug === postSlug);

    // 3. Get the original response (the SPA HTML)
    const response = await context.next();
    const page = await response.text();

    // 4. If post found, inject metadata
    if (post) {
        const title = `${post.title} | Ezzio`;
        // Fallback description or specific one
        const description = post.description || `Read "${post.title}" on Ezzio's Portfolio.`;

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
            );

        return new Response(updatedPage, response);
    }

    return response;
};

export const config = {
    path: "/*",
    excludedPath: ["/assets/*", "/*.ico", "/*.js", "/*.css"]
};
