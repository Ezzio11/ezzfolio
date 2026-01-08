export default async (request, context) => {
    const url = new URL(request.url);
    const postSlug = url.searchParams.get("post");

    // 1. If no post param, return original response (index.html)
    if (!postSlug) {
        return context.next();
    }

    // 2. Define metadata for known posts
    // In a real app, this could fetch from an API or a JSON file
    const POST_DATA = {
        "welcome": {
            title: "Welcome to the New Portfolio | Ezzio",
            description: "A 2-minute read on how I built this platform using React, Vite, and sheer willpower.",
            image: "/assets/og-image.png" // Using the same image for now, but can be customized
        }
    };

    const post = POST_DATA[postSlug];

    // 3. Get the original response (the SPA HTML)
    const response = await context.next();
    const page = await response.text();

    // 4. If post found, inject metadata
    if (post) {
        // Regex-based replacement is simple and effective for this specific use case
        // ensuring we replace the default tags
        const updatedPage = page
            .replace(
                /<title>.*?<\/title>/,
                `<title>${post.title}</title>`
            )
            .replace(
                /content="[^"]*Ezz Eldin Ahmed \| Full-Stack Systems Developer[^"]*"/g,
                `content="${post.title}"`
            )
            .replace(
                /property="og:title" content="[^"]*"/,
                `property="og:title" content="${post.title}"`
            )
            .replace(
                /property="twitter:title" content="[^"]*"/,
                `property="twitter:title" content="${post.title}"`
            )
            .replace(
                /name="description" content="[^"]*"/,
                `name="description" content="${post.description}"`
            )
            .replace(
                /property="og:description" content="[^"]*"/,
                `property="og:description" content="${post.description}"`
            )
            .replace(
                /property="twitter:description" content="[^"]*"/,
                `property="twitter:description" content="${post.description}"`
            );

        // Note: Image replacement would follow the same pattern if we had distinct images per post

        return new Response(updatedPage, response);
    }

    return response;
};

export const config = {
    path: "/*",
    excludedPath: ["/assets/*", "/*.ico", "/*.js", "/*.css"] // Don't run on assets
};
