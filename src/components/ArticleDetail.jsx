import React, { useEffect, useMemo, useState, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Check, ChevronLeft, Copy, Share2, User, ArrowRight } from 'lucide-react';
import { articles as articleMeta, ui } from '@/data';
import { getArticleUrl } from '@/lib/articles';
import { getArticleById as fetchArticleById } from '@/articles/index';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/utils';
import ShareModal from './ShareModal';
import SafeImage from './SafeImage';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const CopyCode = ({ children, className }) => {
    const [copied, setCopied] = useState(false);
    const code = (Array.isArray(children) ? children.join('') : String(children ?? '')).replace(/\n$/, '');

    const handleCopy = () => {
        navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="relative group my-8">
            <pre className="relative bg-slate-950 text-slate-100 p-6 rounded-xl overflow-x-auto text-sm leading-relaxed font-mono ring-1 ring-white/10 shadow-card">
                <button
                    type="button"
                    onClick={handleCopy}
                    aria-label={copied ? 'Copied!' : 'Copy code'}
                    className="absolute top-3 right-3 p-1.5 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                >
                    {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                </button>
                <code className={className}>{code}</code>
            </pre>
        </div>
    );
};

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

    const handleShare = useCallback(() => setShareModalOpen(true), []);
    const handleCloseShare = useCallback(() => setShareModalOpen(false), []);

    if (loading) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <div className="flex flex-col items-center gap-6">
                    <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin shadow-lg" />
                    <p className="text-slate-500 font-bold text-lg animate-pulse">{t(ui.loading, language)}</p>
                </div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <motion.div variants={fadeInUp} initial="initial" animate="animate" className="text-center p-8 rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white/85 dark:bg-white/[0.04] backdrop-blur-sm shadow-card">
                    <h1 className="font-display text-4xl font-bold text-slate-900 dark:text-slate-100 mb-6">{t(ui.articleNotFound, language)}</h1>
                    <button onClick={() => onBack()} className="px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold shadow-glow-sm hover:shadow-glow transition-all active:scale-95 flex items-center gap-2 mx-auto">
                        <ChevronLeft size={20} />
                        {t(ui.backToArticles, language)}
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24">
            <motion.button
                onClick={() => onBack()}
                whileHover={{ x: -6 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="fixed top-32 left-8 hidden lg:flex items-center gap-2 px-5 py-2.5 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border border-slate-200/90 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-500/50 rounded-full shadow-card transition-all z-40 font-semibold"
            >
                <ChevronLeft size={20} />
                <span>{t(ui.back, language)}</span>
            </motion.button>

            <div className="container mx-auto max-w-4xl px-4 py-12">
                <motion.div variants={staggerContainer} initial="initial" animate="animate" className="mb-10 text-center md:text-left">
                    <motion.div variants={fadeInUp} className="flex justify-center md:justify-start items-center gap-2 mb-6">
                        <span className="px-4 py-1.5 rounded-full font-mono text-[11px] font-semibold uppercase tracking-[0.15em] bg-amber-500 text-slate-950 shadow-glow-sm">{t(article.category, language)}</span>
                    </motion.div>
                    <motion.h1 variants={fadeInUp} className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-[1.1] text-slate-900 dark:text-white text-balance">
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
                    className="mb-16 rounded-2xl overflow-hidden shadow-card-hover h-64 md:h-[450px] ring-1 ring-slate-900/10 dark:ring-white/10"
                >
                    <SafeImage src={article.imageUrl} alt={t(article.title, language)} className="w-full h-full object-cover" />
                </motion.div>

                <motion.article
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 0.3 }}
                    className="rounded-3xl p-8 md:p-16 border border-slate-200/90 dark:border-white/10 bg-white/85 dark:bg-white/[0.04] backdrop-blur-sm shadow-card mb-16 relative"
                >
                    <div className="max-w-none">
                        <div className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
                            <ReactMarkdown 
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h2: ({children, ...props}) => (
                                        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-12 mb-6 border-b pb-3 border-slate-100 dark:border-slate-800" {...props}>
                                            {children}
                                        </h2>
                                    ),
                                    h3: ({children, ...props}) => (
                                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4" {...props}>
                                            {children}
                                        </h3>
                                    ),
                                    h4: ({children, ...props}) => (
                                        <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-8 mb-3" {...props}>
                                            {children}
                                        </h4>
                                    ),
                                    p: ({children, ...props}) => (
                                        <p className="leading-relaxed text-lg text-slate-700 dark:text-slate-300 mb-6 font-medium opacity-90" {...props}>
                                            {children}
                                        </p>
                                    ),
                                    ul: ({children, ...props}) => (
                                        <ul className="my-6 pl-5 space-y-2.5 list-disc marker:text-amber-500" {...props}>
                                            {children}
                                        </ul>
                                    ),
                                    ol: ({children, ...props}) => (
                                        <ol className="my-6 pl-5 space-y-2.5 list-decimal marker:text-amber-500 marker:font-semibold" {...props}>
                                            {children}
                                        </ol>
                                    ),
                                    li: ({children, ...props}) => (
                                        <li className="leading-relaxed text-slate-700 dark:text-slate-300 pl-1" {...props}>
                                            {children}
                                        </li>
                                    ),
                                    // react-markdown v9+ removed the `inline` prop: block code arrives
                                    // wrapped in <pre>, so the copyable block renders here and <code>
                                    // stays inline-only (fixes <pre>-inside-<p> DOM nesting).
                                    pre: ({children, ...props}) => {
                                        const codeEl = React.Children.toArray(children)[0];
                                        if (React.isValidElement(codeEl)) {
                                            return <CopyCode className={codeEl.props.className}>{codeEl.props.children}</CopyCode>;
                                        }
                                        return <pre {...props}>{children}</pre>;
                                    },
                                    code: ({children, ...props}) => (
                                        <code className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-amber-600 dark:text-amber-400 rounded font-mono text-sm font-semibold" {...props}>
                                            {children}
                                        </code>
                                    ),
                                    // No typography plugin installed, so anchor/quote/table need explicit styles
                                    a: ({children, ...props}) => (
                                        <a className="text-amber-600 dark:text-amber-400 font-semibold underline decoration-amber-500/40 underline-offset-4 hover:decoration-amber-500 transition-colors" target="_blank" rel="noopener noreferrer" {...props}>
                                            {children}
                                        </a>
                                    ),
                                    blockquote: ({children, ...props}) => (
                                        <blockquote className="my-6 border-l-2 border-amber-500 pl-5 italic text-slate-600 dark:text-slate-400" {...props}>
                                            {children}
                                        </blockquote>
                                    ),
                                    table: ({children, ...props}) => (
                                        <div className="my-8 overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10">
                                            <table className="w-full text-sm text-left" {...props}>{children}</table>
                                        </div>
                                    ),
                                    th: ({children, ...props}) => (
                                        <th className="px-4 py-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-slate-50 dark:bg-white/[0.04] border-b border-slate-200 dark:border-white/10" {...props}>
                                            {children}
                                        </th>
                                    ),
                                    td: ({children, ...props}) => (
                                        <td className="px-4 py-3 text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-white/5" {...props}>
                                            {children}
                                        </td>
                                    )
                                }}
                            >
                                {t(article?.content, language)}
                            </ReactMarkdown>
                        </div>
                    </div>
                </motion.article>

                <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-3xl p-12 text-center text-white mb-20 bg-slate-900 dark:bg-slate-950 ring-1 ring-white/10 shadow-card-hover"
                >
                    <div aria-hidden className="pointer-events-none absolute inset-0">
                        <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_70%_90%_at_50%_0%,black,transparent)]" style={{ '--grid-color': 'rgb(148 163 184 / 0.08)' }} />
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[26rem] h-[12rem] rounded-full bg-amber-500/20 blur-[80px]" />
                    </div>
                    <h3 className="relative font-display text-3xl font-bold mb-4">{t(ui.enjoyedArticle, language)}</h3>
                    <p className="relative mb-8 text-slate-300 text-lg">{t(ui.sharePrompt, language)}</p>
                    <button onClick={handleShare} className="relative px-9 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold shadow-glow-sm hover:shadow-glow transition-all active:scale-95 flex items-center gap-3 mx-auto">
                        <Share2 size={24} />
                        {t(ui.shareNow, language)}
                    </button>
                </motion.div>

                <ShareModal isOpen={shareModalOpen} onClose={handleCloseShare} articleUrl={getArticleUrl(slug)} articleTitle={article.title} />

                <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer} className="border-t pt-16 border-slate-200 dark:border-slate-800">
                    <motion.h3 variants={fadeInUp} className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-10 text-center md:text-left">{t(ui.continueReading, language)}</motion.h3>
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
                                className="rounded-2xl overflow-hidden border border-slate-200/90 dark:border-white/10 bg-white/85 dark:bg-white/[0.04] backdrop-blur-sm shadow-card hover:shadow-card-hover hover:border-amber-400/40 dark:hover:border-amber-400/30 transition-all cursor-pointer group flex flex-col h-full"
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
                                        {language === 'vi' ? 'Đọc thêm' : 'Read more'} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
