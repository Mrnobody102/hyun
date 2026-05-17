export const allArticles = {
    1: () => import('./article-1'),
    2: () => import('./article-2'),
    3: () => import('./article-3'),
    4: () => import('./article-4'),
    5: () => import('./article-5'),
    6: () => import('./article-6'),
};

export async function getArticleById(id) {
    const loader = allArticles[id];
    if (!loader) return null;
    const module = await loader();
    // Assuming each article file has a named export like 'article1', 'article2' etc.
    // or we can standardize them to 'default' or a specific name.
    // Based on original code, they were imported as { article1 } etc.
    const key = `article${id}`;
    return module[key] || module.default || null;
}

