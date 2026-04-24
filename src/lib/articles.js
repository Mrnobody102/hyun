import { articles } from '@/data';

export function getArticleById(articleId) {
    return articles.find((article) => article.id === articleId) || null;
}

export function getArticleBySlug(slug) {
    return articles.find((article) => article.slug === slug) || null;
}

export function getArticlePath(articleOrSlug) {
    const slug = typeof articleOrSlug === 'string' ? articleOrSlug : articleOrSlug?.slug;
    return slug ? `/articles/${slug}` : '/articles';
}

export function getArticleUrl(articleOrSlug, origin = window.location.origin) {
    return `${origin}${getArticlePath(articleOrSlug)}`;
}
