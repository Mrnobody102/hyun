import React, { useCallback, useEffect, useRef, useState, useTransition } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, Briefcase, Home, Mail, Menu, Moon, Search, Sun, X, Zap } from 'lucide-react';
import kimAvatar from '@/assets/kim-avatar.jpg';
import { useDarkMode } from '@/context/DarkModeContext';
import { useLanguage } from '@/context/LanguageContext';
import { aboutMe, articles, homeSnippet, navItems, searchCopy } from '@/data';
import { t } from '@/lib/utils';
import { fadeIn, fadeInUp } from '@/lib/animations';

const iconMap = { Home, Zap, Briefcase, BookOpen, Mail };

function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

const Header = ({ activeTab = 'home', onNavigate = () => {}, onArticleSelect = null }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [isPending, startTransition] = useTransition();
    const inputRef = useRef(null);
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const { language, toggleLanguage } = useLanguage();

    const { scrollY } = useScroll();
    const headerBg = useTransform(
        scrollY,
        [0, 50],
        ['rgba(255, 255, 255, 0)', isDarkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)']
    );
    const headerShadow = useTransform(
        scrollY,
        [0, 50],
        ['none', '0 10px 15px -3px rgb(0 0 0 / 0.1)']
    );

    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault();
                setIsSearchOpen(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (isSearchOpen) {
            setActiveIndex(-1);
            window.setTimeout(() => inputRef.current?.focus(), 0);
        }
    }, [isSearchOpen]);

    const normalizedQuery = searchQuery.trim().toLowerCase();

    useEffect(() => {
        setActiveIndex(-1);
    }, [normalizedQuery]);

    useEffect(() => {
        if (!normalizedQuery) {
            setFilteredSuggestions([]);
            return;
        }

        startTransition(() => {
            const results = [];
            const addSuggestion = (section, snippet, onClick, articleId = null) => {
                results.push({ section, snippet, onClick, articleId });
            };

            const translatedHomeSnippet = t(homeSnippet, language);
            if (translatedHomeSnippet.toLowerCase().includes(normalizedQuery)) {
                addSuggestion(language === 'vi' ? 'Trang chủ' : 'Home', translatedHomeSnippet, () => onNavigate('home'));
            }

            [aboutMe.paragraph1, aboutMe.paragraph2, aboutMe.paragraph3].forEach((paragraph) => {
                const text = t(paragraph, language);
                if (text.toLowerCase().includes(normalizedQuery)) {
                    addSuggestion(language === 'vi' ? 'Giới thiệu' : 'About', text, () => onNavigate('home'));
                }
            });

            articles.forEach((article) => {
                const title = t(article.title, language);
                const excerpt = t(article.excerpt, language);

                if (title.toLowerCase().includes(normalizedQuery) || excerpt.toLowerCase().includes(normalizedQuery)) {
                    addSuggestion(
                        language === 'vi' ? 'Bài viết' : 'Articles',
                        title.toLowerCase().includes(normalizedQuery) ? title : excerpt,
                        () => onArticleSelect?.(article.id),
                        article.id,
                    );
                }
            });

            setFilteredSuggestions(results.slice(0, 10));
        });
    }, [language, normalizedQuery, onArticleSelect, onNavigate]);

    const closeSearch = useCallback(() => {
        setIsSearchOpen(false);
        setActiveIndex(-1);
    }, []);

    const handleSearchSubmit = useCallback((event) => {
        event.preventDefault();
        if (!normalizedQuery) return;

        const target = activeIndex >= 0 ? filteredSuggestions[activeIndex] : filteredSuggestions[0];
        target?.onClick?.();
        closeSearch();
    }, [normalizedQuery, activeIndex, filteredSuggestions, closeSearch]);

    const handleInputKeyDown = useCallback((event) => {
        if (!filteredSuggestions.length) return;
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setActiveIndex(prev => Math.min(prev + 1, filteredSuggestions.length - 1));
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setActiveIndex(prev => Math.max(prev - 1, -1));
        } else if (event.key === 'Escape') {
            closeSearch();
        }
    }, [filteredSuggestions, closeSearch]);

    const highlightText = useCallback((text) => {
        if (!normalizedQuery) return text;

        const startIndex = text.toLowerCase().indexOf(normalizedQuery);
        if (startIndex < 0) return text;

        const endIndex = startIndex + normalizedQuery.length;
        return (
            <>
                {text.slice(0, startIndex)}
                <span className="font-bold text-amber-600 dark:text-amber-400">{text.slice(startIndex, endIndex)}</span>
                {text.slice(endIndex)}
            </>
        );
    }, [normalizedQuery]);

    const handleNavigate = useCallback((key) => {
        onNavigate(key);
        setIsMobileMenuOpen(false);
        closeSearch();
    }, [onNavigate, closeSearch]);

    return (
        <>
            <motion.header
                style={{ backgroundColor: headerBg, boxShadow: headerShadow }}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.35 }}
                className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-colors duration-300"
            >
                <nav className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            className="w-12 h-12 relative overflow-hidden rounded-full border-2 border-amber-500 shadow-md bg-white"
                            onClick={() => {
                                if (activeTab === 'home') {
                                    scrollToSection('#hero');
                                } else {
                                    handleNavigate('home');
                                }
                            }}
                            aria-label="Go to home"
                        >
                            <img alt="Profile avatar" className="w-full h-full object-cover object-center" src={kimAvatar} loading="eager" decoding="async" width="48" height="48" />
                        </motion.button>

                        <div className="hidden md:flex items-center gap-8">
                            {navItems.map((item, index) => (
                                <motion.button
                                    key={item.key}
                                    initial={{ opacity: 0, y: -16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.35, delay: index * 0.05 }}
                                    onClick={() => handleNavigate(item.key)}
                                    className={`flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 font-medium transition-colors relative group ${
                                        activeTab === item.key ? 'text-amber-600 dark:text-amber-400' : ''
                                    }`}
                                    title={t(item.name, language)}
                                >
                                    {item.icon ? React.createElement(iconMap[item.icon], { size: 18 }) : <span className="text-lg">{item.emoji || '•'}</span>}
                                    <span className="hidden xl:inline">{t(item.name, language)}</span>
                                    <span
                                        className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-amber-600 to-yellow-500 transition-all duration-300 ${
                                            activeTab === item.key ? 'w-full' : 'w-0 group-hover:w-full'
                                        }`}
                                    />
                                </motion.button>
                            ))}

                            <div className="flex items-center gap-3">
                                <motion.button
                                    onClick={() => {
                                        setIsSearchOpen(true);
                                    }}
                                    whileHover={{ scale: 1.06 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="p-2 rounded-lg transition-all bg-blue-500/10 hover:bg-blue-500 text-blue-600 hover:text-white dark:text-blue-400 border border-blue-500/20"
                                    title={language === 'vi' ? 'Tìm kiếm (Ctrl+K)' : 'Search (Ctrl+K)'}
                                >
                                    <Search size={20} />
                                </motion.button>

                                <motion.button
                                    onClick={toggleDarkMode}
                                    whileHover={{ scale: 1.06 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="p-2 rounded-lg transition-all bg-amber-500/10 hover:bg-amber-500 text-amber-600 hover:text-white dark:text-amber-400 border border-amber-500/20"
                                >
                                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                                </motion.button>

                                <motion.button
                                    onClick={toggleLanguage}
                                    whileHover={{ scale: 1.06 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="p-1.5 rounded-lg transition-all bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 hover:text-white dark:text-emerald-400 border border-emerald-500/20 font-bold min-w-[2.5rem]"
                                >
                                    {language.toUpperCase()}
                                </motion.button>
                            </div>
                        </div>

                        <div className="md:hidden flex items-center gap-3">
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="p-2 text-slate-700 dark:text-slate-200"
                            >
                                <Search size={20} />
                            </button>
                            <button
                                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                                className="p-2 text-slate-700 dark:text-slate-200"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>

                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="md:hidden mt-4 overflow-hidden rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700"
                            >
                                {navItems.map((item) => (
                                    <button
                                        key={item.key}
                                        onClick={() => handleNavigate(item.key)}
                                        className="flex items-center gap-3 w-full p-4 text-left border-b last:border-0 border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                    >
                                        {item.icon ? React.createElement(iconMap[item.icon], { size: 18 }) : <span>{item.emoji}</span>}
                                        {t(item.name, language)}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </nav>
            </motion.header>

            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        variants={fadeIn}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm flex items-start justify-center pt-16 md:pt-24 px-4"
                        onClick={closeSearch}
                        role="presentation"
                    >
                        <motion.div
                            variants={fadeInUp}
                            role="dialog"
                            aria-modal="true"
                            aria-label={language === 'vi' ? 'Tìm kiếm' : 'Search'}
                            className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <form onSubmit={handleSearchSubmit} className="p-4 md:p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <Search size={18} className="text-amber-500" />
                                        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t(searchCopy.title, language)}</span>
                                    </div>
                                    <button type="button" onClick={closeSearch} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                                        <X size={20} className="text-slate-500" />
                                    </button>
                                </div>

                                <div className="relative flex items-center">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        placeholder={t(searchCopy.placeholder, language)}
                                        value={searchQuery}
                                        onChange={(event) => setSearchQuery(event.target.value)}
                                        onKeyDown={handleInputKeyDown}
                                        aria-label={language === 'vi' ? 'Tìm kiếm' : 'Search'}
                                        aria-autocomplete="list"
                                        aria-activedescendant={activeIndex >= 0 ? `search-result-${activeIndex}` : undefined}
                                        className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                    />
                                    {isPending && (
                                        <div className="absolute right-4 w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                                    )}
                                </div>

                                <div className="mt-6 max-h-[60vh] overflow-y-auto" aria-live="polite">
                                    {normalizedQuery && filteredSuggestions.length === 0 && !isPending && (
                                        <p className="text-center py-8 text-slate-500">{t(searchCopy.noResults, language)}</p>
                                    )}
                                    
                                    <div className="grid gap-2 p-1" role="listbox">
                                        {filteredSuggestions.map((suggestion, index) => (
                                            <button
                                                key={index}
                                                id={`search-result-${index}`}
                                                type="button"
                                                role="option"
                                                aria-selected={index === activeIndex}
                                                onMouseDown={(e) => {
                                                    // Use onMouseDown to prevent focus issues and click swallowing during re-renders
                                                    e.preventDefault();
                                                    suggestion.onClick?.();
                                                    closeSearch();
                                                }}
                                                onMouseEnter={() => setActiveIndex(index)}
                                                className={`w-full text-left p-3 rounded-xl transition-colors group ${
                                                    index === activeIndex
                                                        ? 'bg-amber-50 dark:bg-amber-500/10 ring-1 ring-amber-400'
                                                        : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                                                }`}
                                            >
                                                <div className="text-xs font-bold text-amber-600 mb-1 uppercase tracking-wider">{suggestion.section}</div>
                                                <div className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2">
                                                    {highlightText(suggestion.snippet)}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                                    <span>{t(searchCopy.hint, language)}</span>
                                    <div className="flex gap-2">
                                        <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">ESC</span>
                                        <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">ENTER</span>
                                    </div>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default React.memo(Header);

