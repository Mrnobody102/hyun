import React, { useEffect, useMemo, useState, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, Share2, User, ArrowRight } from 'lucide-react';
import { articles as articleMeta } from '@/data';
import { getArticleUrl } from '@/lib/articles';
import { getArticleById as fetchArticleById } from '@/articles/index';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/utils';
import ShareModal from './ShareModal';
import SafeImage from './SafeImage';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const ContentBlock = memo(({ block }) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    // Heading 2
    if (trimmed.startsWith('## ')) {
        return (
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-12 mb-6 border-b pb-3 border-slate-100 dark:border-slate-800">
                {trimmed.replace('## ', '')}
            </h2>
        );
    }

    // Heading 3
    if (trimmed.startsWith('### ')) {
        return (
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4">
                {trimmed.replace('### ', '')}
            </h3>
        );
    }

    // Code Blocks
    if (trimmed.startsWith('```')) {
        const lines = trimmed.split('\n');
        const codeLines = lines.slice(1, -1); // Remove backticks lines
        return (
            <div className="relative group my-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <pre className="relative bg-slate-900 text-slate-100 p-6 rounded-xl overflow-x-auto text-sm leading-relaxed shadow-2xl font-mono">
                    <code>{codeLines.join('\n')}</code>
                </pre>
            </div>
        );
    }

    // Lists
    if (trimmed.includes('\n- ') || trimmed.startsWith('- ')) {
        const items = trimmed.split('\n').map(line => line.trim()).filter(line => line.startsWith('- '));
        if (items.length > 0) {
            return (
                <ul className="grid gap-4 my-8 ml-2">
                    {items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                            <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                            <span className="leading-relaxed">{item.replace('- ', '')}</span>
                        </li>
                    ))}
                </ul>
            );
        }
    }

    // Numbered Lists
    if (trimmed.match(/^\d+\.\s/)) {
        const items = trimmed.split('\n').map(line => line.trim()).filter(line => line.match(/^\d+\.\s/));
        if (items.length > 0) {
            return (
                <ol className="grid gap-4 my-8 ml-2">
                    {items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                            <span className="font-black text-amber-500 min-w-[1.5rem]">{i + 1}.</span>
                            <span className="leading-relaxed">{item.replace(/^\d+\.\s/, '')}</span>
                        </li>
                    ))}
                </ol>
            );
        }
    }

    // Default Paragraph
    return (
        <p className="leading-relaxed text-lg text-slate-700 dark:text-slate-300 mb-6 font-medium opacity-90">
            {trimmed}
        </p>
    );
});


const ArticleDetail = ({ articleId, slug, onBack }) => {
    const { language } = useLanguage();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shareModalOpen, setShareModalOpen] = useState(false);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        
        fetchArticleById(articleId).then(data => {
            if (isMounted) {
                setArticle(data);
                setLoading(false);
            }
        });

        return () => { isMounted = false; };
    }, [articleId]);

    const relatedArticles = useMemo(() => 
        articleMeta.filter((item) => item.id !== articleId).slice(0, 2),
    [articleId]);

    const contentBlocks = useMemo(() => {
        if (!article?.content) return [];
        return article.content.split('\n\n').filter(Boolean);
    }, [article?.content]);

    const handleShare = useCallback(() => setShareModalOpen(true), []);
    const handleCloseShare = useCallback(() => setShareModalOpen(false), []);

    if (loading) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <div className="flex flex-col items-center gap-6">
                    <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin shadow-lg" />
                    <p className="text-slate-500 font-bold text-lg animate-pulse">Loading amazing content...</p>
                </div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
                <motion.div variants={fadeInUp} initial="initial" animate="animate" className="text-center p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700">
                    <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-6">Article Not Found</h1>
                    <button onClick={() => onBack()} className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl font-bold hover:shadow-2xl transition-all active:scale-95 flex items-center gap-2 mx-auto">
                        <ChevronLeft size={20} />
                        Back to Articles
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 pt-24">
            <motion.button
                onClick={() => onBack()}
                whileHover={{ x: -6, backgroundColor: 'rgba(245, 158, 11, 0.1)' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="fixed top-32 left-8 hidden lg:flex items-center gap-2 px-5 py-2.5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-2 border-amber-500 text-amber-600 dark:text-amber-400 rounded-xl shadow-xl hover:shadow-2xl transition-all z-40 font-bold"
            >
                <ChevronLeft size={20} />
                <span>Back</span>
            </motion.button>

            <div className="container mx-auto max-w-4xl px-4 py-12">
                <motion.div variants={staggerContainer} initial="initial" animate="animate" className="mb-10 text-center md:text-left">
                    <motion.div variants={fadeInUp} className="flex justify-center md:justify-start items-center gap-2 mb-6">
                        <span className="px-4 py-1.5 bg-amber-500 text-white rounded-full text-sm font-bold shadow-md">{t(article.category, language)}</span>
                    </motion.div>
                    <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-black mb-8 leading-tight bg-gradient-to-r from-slate-800 via-amber-700 to-yellow-600 dark:from-amber-300 dark:via-yellow-300 dark:to-amber-100 bg-clip-text text-transparent">
                        {t(article.title, language)}
                    </motion.h1>
                    <motion.div variants={fadeInUp} className="flex flex-wrap justify-center md:justify-start items-center gap-8 text-slate-500 dark:text-slate-400 mb-8 font-medium">
                        <div className="flex items-center gap-2.5">
                            <User size={20} className="text-amber-500" />
                            <span>{t(article.author, language)}</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <Calendar size={20} className="text-amber-500" />
                            <span>{t(article.date, language)}</span>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 0.2 }}
                    className="mb-16 rounded-2xl overflow-hidden shadow-2xl h-64 md:h-[450px] border-4 border-white dark:border-slate-800"
                >
                    <SafeImage src={article.imageUrl} alt={t(article.title, language)} className="w-full h-full object-cover" />
                </motion.div>

                <motion.article
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-16 shadow-2xl border border-slate-100 dark:border-slate-700 mb-16 relative"
                >
                    <div className="max-w-none">
                        {contentBlocks.map((block, index) => (
                            <ContentBlock key={index} block={block} />
                        ))}
                    </div>
                </motion.article>

                <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-amber-500 to-yellow-500 rounded-3xl p-12 text-center text-white mb-20 shadow-2xl"
                >
                    <h3 className="text-3xl font-black mb-6">Enjoyed this article?</h3>
                    <p className="mb-8 text-white/90 text-lg font-medium">Share it with your network and help others learn!</p>
                    <button onClick={handleShare} className="px-10 py-4 bg-white text-amber-600 rounded-2xl font-black hover:bg-slate-50 transition-all shadow-xl hover:shadow-white/20 active:scale-95 flex items-center gap-3 mx-auto">
                        <Share2 size={24} />
                        Share Now
                    </button>
                </motion.div>

                <ShareModal isOpen={shareModalOpen} onClose={handleCloseShare} articleUrl={getArticleUrl(slug)} articleTitle={article.title} />

                <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer} className="border-t pt-16 border-slate-200 dark:border-slate-800">
                    <motion.h3 variants={fadeInUp} className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-10 text-center md:text-left">Continue Reading</motion.h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        {relatedArticles.map((relatedArticle) => (
                            <motion.div
                                key={relatedArticle.id}
                                variants={fadeInUp}
                                whileHover={{ y: -8 }}
                                onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'auto' });
                                    onBack(relatedArticle.id);
                                }}
                                className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-slate-100 dark:border-slate-700 group flex flex-col h-full"
                            >
                                <div className="h-52 overflow-hidden relative">
                                    <SafeImage src={relatedArticle.imageUrl} alt={t(relatedArticle.title, language)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute top-4 right-4">
                                        <span className="px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-bold shadow-lg">{t(relatedArticle.category, language)}</span>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col justify-between flex-1">
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 line-clamp-2 mb-3 group-hover:text-amber-600 transition-colors">{t(relatedArticle.title, language)}</h4>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{t(relatedArticle.date, language)}</p>
                                    </div>
                                    <div className="mt-6 flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
                                        Read more <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default memo(ArticleDetail);
