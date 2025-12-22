import { article1 } from './article-1';
import { article2 } from './article-2';
import { article3 } from './article-3';
import { article4 } from './article-4';
import { article5 } from './article-5';

export const allArticles = {
    1: article1,
    2: article2,
    3: article3,
    4: article4,
    5: article5,
};

export function getArticleById(id) {
    return allArticles[id] || null;
}
