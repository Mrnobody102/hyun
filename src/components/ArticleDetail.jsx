import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Calendar, User, Share2 } from 'lucide-react';
import { getArticleById, allArticles } from '@/articles/index';
import ShareModal from './ShareModal';

const ArticleDetail = ({ articleId, slug, onBack }) => {
    const article = getArticleById(articleId);
    const articlesList = Object.values(allArticles);
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [backButtonVisible, setBackButtonVisible] = useState(true);
    const hideTimeoutRef = useRef(null);
    const lastTapTimeRef = useRef(0);

    const handleBack = () => {
        onBack();
    };

    const handleOpenShare = () => {
        setShareModalOpen(true);
    };

    const handleCloseShare = () => {
        setShareModalOpen(false);
    };

    // Auto-hide back button on idle
    const scheduleHideButton = () => {
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        setBackButtonVisible(true);
        hideTimeoutRef.current = setTimeout(() => {
            setBackButtonVisible(false);
        }, 3000);
    };

    // Handle click/interaction to show button
    const handleInteraction = () => {
        scheduleHideButton();
    };

    // Handle double tap on mobile
    const handleTouchStart = () => {
        const now = Date.now();
        if (now - lastTapTimeRef.current < 300) {
            // Double tap detected
            handleInteraction();
        }
        lastTapTimeRef.current = now;
    };

    useEffect(() => {
        scheduleHideButton();

        document.addEventListener('click', handleInteraction);
        document.addEventListener('touchstart', handleTouchStart);

        return () => {
            document.removeEventListener('click', handleInteraction);
            document.removeEventListener('touchstart', handleTouchStart);
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        };
    }, []);

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
                        Article Not Found
                    </h1>
                    <button
                        onClick={handleBack}
                        className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                        Back to Articles
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 pt-24">
            {/* Back Button */}
            <motion.button
                onClick={handleBack}
                whileHover={{ x: -2 }}
                animate={{ opacity: backButtonVisible ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="fixed top-32 left-6 flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border-2 border-amber-500 text-amber-600 dark:text-amber-400 rounded-lg shadow-md hover:shadow-lg transition-all z-40 font-semibold pointer-events-auto"
            >
                <ChevronLeft size={20} />
                <span className="hidden xl:inline">Back</span>
            </motion.button>

            <div className="container mx-auto max-w-4xl px-4 py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 rounded-full text-sm font-semibold">
                            {article.category}
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-amber-600 to-yellow-600 dark:from-amber-300 dark:via-yellow-300 dark:to-amber-200 bg-clip-text text-transparent">
                        {article.title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-6 text-slate-600 dark:text-slate-400 mb-6">
                        <div className="flex items-center gap-2">
                            <User size={18} />
                            <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={18} />
                            <span>{article.date}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Featured Image */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-12 rounded-xl overflow-hidden shadow-2xl h-96"
                >
                    <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Article Content */}
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white dark:bg-slate-800 rounded-xl p-8 md:p-12 shadow-lg border border-slate-100 dark:border-slate-700 mb-12"
                >
                    <div className="max-w-none text-slate-700 dark:text-slate-300 space-y-4">
                        {article.content && article.content.split('\n\n').map((block, index) => {
                            const trimmed = block.trim();

                            if (!trimmed) return null;

                            if (trimmed.startsWith('## ')) {
                                return (
                                    <h2 key={index} className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-8 mb-4">
                                        {trimmed.replace('## ', '')}
                                    </h2>
                                );
                            }
                            if (trimmed.startsWith('### ')) {
                                return (
                                    <h3 key={index} className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-6 mb-3">
                                        {trimmed.replace('### ', '')}
                                    </h3>
                                );
                            }
                            if (trimmed.startsWith('```')) {
                                const codeContent = trimmed.replace(/```[\w]*\n/g, '').replace(/```/g, '');
                                return (
                                    <pre key={index} className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto mb-4">
                                        <code>{codeContent}</code>
                                    </pre>
                                );
                            }
                            if (trimmed.includes('- ')) {
                                const items = trimmed.split('\n').filter(item => item.trim().startsWith('- '));
                                return (
                                    <ul key={index} className="list-disc list-inside space-y-2 mb-4 ml-4">
                                        {items.map((item, i) => (
                                            <li key={i}>{item.replace('- ', '')}</li>
                                        ))}
                                    </ul>
                                );
                            }

                            return (
                                <p key={index} className="leading-relaxed">
                                    {trimmed}
                                </p>
                            );
                        })}
                    </div>
                </motion.article>

                {/* Share Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-8 text-center mb-12"
                >
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
                        Share This Article
                    </h3>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={handleOpenShare}
                            className="p-3 bg-white dark:bg-slate-600 rounded-lg hover:bg-amber-100 dark:hover:bg-slate-500 transition-all"
                        >
                            <Share2 size={20} className="text-slate-700 dark:text-slate-200" />
                        </button>
                    </div>
                </motion.div>

                <ShareModal
                    isOpen={shareModalOpen}
                    onClose={handleCloseShare}
                    articleUrl={`${window.location.origin}/articles/${slug || ''}`}
                    articleTitle={article.title}
                />

                {/* Related Articles */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">
                        More Articles
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {articlesList
                            .filter(a => a.id !== article.id)
                            .slice(0, 2)
                            .map(relatedArticle => (
                                <motion.div
                                    key={relatedArticle.id}
                                    whileHover={{ y: -5 }}
                                    onClick={() => {
                                        window.scrollTo(0, 0);
                                        onBack(relatedArticle.id);
                                    }}
                                    className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer border border-slate-100 dark:border-slate-700"
                                >
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={relatedArticle.imageUrl}
                                            alt={relatedArticle.title}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-bold text-slate-800 dark:text-slate-100 line-clamp-2 mb-2">
                                            {relatedArticle.title}
                                        </h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            {relatedArticle.date}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ArticleDetail;
