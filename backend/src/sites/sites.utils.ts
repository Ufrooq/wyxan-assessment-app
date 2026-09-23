import sanitizeHtml from 'sanitize-html';

export function sanitizeSiteHtml(html: string) {
    return sanitizeHtml(html, {
        allowedTags: [
            'h1',
            'h2',
            'h3',
            'p',
            'a',
            'ul',
            'ol',
            'li',
            'strong',
            'em',
            'blockquote',
            'code',
            'pre',
            'br',
        ],
        allowedAttributes: {
            a: ['href'],
        },
        allowedSchemes: [],
    });
}

export function extractTextContent(html: string) {
    return sanitizeHtml(html, {
        allowedTags: [],
        allowedAttributes: {},
    }).trim();
}