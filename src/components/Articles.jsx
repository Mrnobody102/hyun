import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Share2, User } from 'lucide-react';
import { articles } from '@/data';
import { useLanguage } from '@/context/LanguageContext';
import { getArticleUrl } from '@/lib/articles';
import { t } from '@/lib/utils';
import ShareModal from './ShareModal';
import SafeImage from './SafeImage';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import SectionHeading from './SectionHeading';

const ArticleCard = React.memo(function ArticleCard({ article, language, onArticleClick, onOpenShareModal }) {
    return (
        <motion.article
            variants={fadeInUp}
            whileHover={{ y: -5 }}
            className="rounded-2xl overflow-hidden border border-slate-200/90 dark:border-white/10 bg-white/85 dark:bg-white/[0.04] backdrop-blur-sm shadow-card hover:shadow-card-hover hover:border-amber-400/40 dark:hover:border-amber-400/30 transition-all duration-300 flex flex-col md:flex-row h-full group"
        >
            <button
                onClick={() => onArticleClick?.(article.id)}
                className="relative w-full md:w-64 h-48 md:h-auto overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0 cursor-pointer"
            >
                <SafeImage
                    src={article.imageUrl}
                    alt={t(article.title, language)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 md:bottom-4 md:right-4 md:top-auto">
                    <span className="px-3 py-1 rounded-full font-mono text-[10px] font-semibold uppercase tracking-[0.12em] bg-amber-500 text-slate-950 shadow-glow-sm">{t(article.category, language)}</span>
                </div>
            </button>

            <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                    <button
                        onClick={() => onArticleClick?.(article.id)}
                        className="font-display text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors text-left cursor-pointer"
                    >
                        {t(article.title, language)}
                    </button>

                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">{t(article.excerpt, language)}</p>
                </div>

                <div className="flex flex-wrap gap-4 font-mono text-[11px] text-slate-500 dark:text-slate-400 mb-4 pb-4 border-b border-slate-200/80 dark:border-white/10 items-center justify-between">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-1.5">
                            <User size={13} />
                            {t(article.author, language)}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar size={13} />
                            {t(article.date, language)}
                        </div>
                    </div>
                    <motion.button
                        onClick={() => onOpenShareModal(article)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-white transition-colors"
                        title={language === 'vi' ? 'Chia sẻ' : 'Share'}
                    >
                        <Share2 size={15} />
                    </motion.button>
                </div>

                <button
                    onClick={() => onArticleClick?.(article.id)}
                    className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold hover:gap-3.5 transition-all duration-300 text-sm cursor-pointer w-fit"
                >
                    {language === 'vi' ? 'Xem bài viết' : 'Read Article'}
                    <ArrowRight size={16} />
                </button>
            </div>
        </motion.article>
    );
});

const Articles = ({ onArticleClick }) => {
    const { language } = useLanguage();
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);

    const handleOpenShareModal = useCallback((article) => {
        setSelectedArticle({ ...article, link: getArticleUrl(article) });
        setShareModalOpen(true);
    }, []);

    const handleCloseShareModal = useCallback(() => {
        setShareModalOpen(false);
        setSelectedArticle(null);
    }, []);

    return (
        <section id="articles" className="pt-32 pb-20 md:pt-36 px-4">
            <div className="container mx-auto max-w-6xl">
                <SectionHeading
                    kicker={language === 'vi' ? 'Chia sẻ' : 'Writing'}
                    title={language === 'vi' ? 'Bài viết & Blog' : 'Articles & Blog'}
                    subtitle={language === 'vi'
                        ? 'Chia sẻ kinh nghiệm, kiến thức và góc nhìn từ quá trình làm sản phẩm'
                        : 'Sharing insights, technical notes, and lessons from building products'}
                />

                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid gap-6"
                >
                    {articles.map((article) => (
                        <ArticleCard
                            key={article.id}
                            article={article}
                            language={language}
                            onArticleClick={onArticleClick}
                            onOpenShareModal={handleOpenShareModal}
                        />
                    ))}
                </motion.div>
            </div>

            <ShareModal isOpen={shareModalOpen} onClose={handleCloseShareModal} articleUrl={selectedArticle?.link || ''} articleTitle={selectedArticle?.title || ''} />
        </section>
    );
};

export default React.memo(Articles);
