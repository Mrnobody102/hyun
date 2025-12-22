import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Share2 } from 'lucide-react';
import { articles } from '@/data/portfolioData';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/utils';
import ShareModal from './ShareModal';

const Articles = ({ onArticleClick }) => {
    const { language } = useLanguage();
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);

    const handleOpenShareModal = (article) => {
        // Construct dynamic article URL using current domain
        const slug = article.link.split('/articles/')[1];
        const dynamicUrl = `${window.location.origin}/articles/${slug}`;
        setSelectedArticle({ ...article, link: dynamicUrl });
        setShareModalOpen(true);
    };

    const handleCloseShareModal = () => {
        setShareModalOpen(false);
        setSelectedArticle(null);
    };
    return (
        <section id="articles" className="py-20 px-4 bg-gradient-to-br from-white via-amber-50 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-slate-800 via-amber-600 to-yellow-600 dark:from-amber-300 dark:via-yellow-300 dark:to-amber-200 bg-clip-text text-transparent">
                            {language === 'vi' ? 'Bài viết & Blog' : 'Articles & Blog'}
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto rounded-full"></div>
                    <p className="text-slate-600 dark:text-slate-300 mt-4 max-w-2xl mx-auto">
                        {language === 'vi'
                            ? 'Chia sẻ kinh nghiệm, kiến thức và hành trình phát triển của mình'
                            : 'Sharing insights, knowledge, and experiences from my development journey'}
                    </p>
                </motion.div>

                {/* Vertical list */}
                <div className="grid gap-6">
                    {articles.map((article, index) => (
                        <motion.article
                            key={article.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.05 }}
                            whileHover={{ y: -6 }}
                            className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row h-full group"
                        >
                            {/* Image */}
                            <button
                                onClick={() => onArticleClick(article.id)}
                                className="relative w-full md:w-64 h-48 md:h-auto overflow-hidden bg-gradient-to-br from-amber-200 to-yellow-200 dark:from-amber-900 dark:to-yellow-900 flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
                            >
                                <img
                                    src={article.imageUrl}
                                    alt={article.title.en}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 md:bottom-4 md:right-4 md:top-auto">
                                    <span className="px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-semibold">
                                        {t(article.category, language)}
                                    </span>
                                </div>
                            </button>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-1 justify-between">
                                <div>
                                    <button
                                        onClick={() => onArticleClick(article.id)}
                                        className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors text-left hover:underline cursor-pointer"
                                    >
                                        {article.title.en}
                                    </button>

                                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
                                        {article.excerpt.en}
                                    </p>
                                </div>

                                {/* Meta Info & Share */}
                                <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4 pb-4 border-b border-slate-200 dark:border-slate-700 items-center justify-between">
                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex items-center gap-1">
                                            <User size={14} />
                                            {t(article.author, language)}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            {t(article.date, language)}
                                        </div>
                                    </div>
                                    <motion.button
                                        onClick={() => handleOpenShareModal(article)}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-2 rounded-lg bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-500/30 transition-colors"
                                        title={language === 'vi' ? 'Chia sẻ' : 'Share'}
                                    >
                                        <Share2 size={16} />
                                    </motion.button>
                                </div>

                                {/* Read More */}
                                <button
                                    onClick={() => onArticleClick(article.id)}
                                    className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold hover:gap-3 transition-all duration-300 text-sm cursor-pointer w-fit"
                                >
                                    {language === 'vi' ? 'Xem bài viết' : 'Read Article'}
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>

            {/* Share Modal */}
            <ShareModal
                isOpen={shareModalOpen}
                onClose={handleCloseShareModal}
                articleUrl={selectedArticle?.link || ''}
                articleTitle={selectedArticle?.title || ''}
            />
        </section>
    );
};

export default Articles;
