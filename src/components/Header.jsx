import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, Briefcase, Home, Mail, Menu, Moon, Search, Sun, X, Zap } from 'lucide-react';
import kimAvatar from '@/assets/kim-avatar.jpg';
import { useDarkMode } from '@/context/DarkModeContext';
import { useLanguage } from '@/context/LanguageContext';
import { aboutMe, articles, homeSnippet, navItems, searchCopy } from '@/data';
import { t } from '@/lib/utils';

const iconMap = { Home, Zap, Briefcase, BookOpen, Mail };

function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

const Header = ({ activeTab = 'home', onNavigate = () => {}, onArticleSelect = null }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showEmptyHint, setShowEmptyHint] = useState(false);
    const inputRef = useRef(null);
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const { language, toggleLanguage } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            const nextIsScrolled = window.scrollY > 50;
            setIsScrolled((prev) => (prev === nextIsScrolled ? prev : nextIsScrolled));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault();
                setIsSearchOpen(true);
                setShowEmptyHint(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (isSearchOpen) {
            window.setTimeout(() => inputRef.current?.focus(), 0);
        }
    }, [isSearchOpen]);

    const normalizedQuery = searchQuery.trim().toLowerCase();

    const suggestions = useMemo(() => {
        if (!normalizedQuery) {
            return [];
        }

        const results = [];
        const addSuggestion = (section, snippet, onClick, articleId = null) => {
            results.push({ section, snippet, onClick, articleId });
        };

        const translatedHomeSnippet = t(homeSnippet, language);
        if (translatedHomeSnippet.toLowerCase().includes(normalizedQuery)) {
            addSuggestion(language === 'vi' ? 'Trang chá»§' : 'Home', translatedHomeSnippet, () => onNavigate('home'));
        }

        [aboutMe.paragraph1, aboutMe.paragraph2, aboutMe.paragraph3].forEach((paragraph) => {
            const text = t(paragraph, language);
            if (text.toLowerCase().includes(normalizedQuery)) {
                addSuggestion(language === 'vi' ? 'Giá»›i thiá»‡u' : 'About', text, () => onNavigate('home'));
            }
        });

        articles.forEach((article) => {
            const title = t(article.title, language);
            const excerpt = t(article.excerpt, language);

            if (title.toLowerCase().includes(normalizedQuery) || excerpt.toLowerCase().includes(normalizedQuery)) {
                addSuggestion(
                    language === 'vi' ? 'BĂ i viáº¿t' : 'Articles',
                    title.toLowerCase().includes(normalizedQuery) ? title : excerpt,
                    () => onArticleSelect?.(article.id),
                    article.id,
                );
            }
        });

        return results.slice(0, 10);
    }, [language, normalizedQuery, onArticleSelect, onNavigate]);

    const closeSearch = () => {
        setIsSearchOpen(false);
        setShowEmptyHint(false);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();

        if (!normalizedQuery) {
            setShowEmptyHint(true);
            return;
        }

        const firstSuggestion = suggestions[0];
        firstSuggestion?.onClick?.();
        closeSearch();
    };

    const highlightText = (text) => {
        if (!normalizedQuery) {
            return text;
        }

        const startIndex = text.toLowerCase().indexOf(normalizedQuery);
        if (startIndex < 0) {
            return text;
        }

        const endIndex = startIndex + normalizedQuery.length;
        return (
            <>
                {text.slice(0, startIndex)}
                <span className="font-bold text-amber-600 dark:text-amber-400">{text.slice(startIndex, endIndex)}</span>
                {text.slice(endIndex)}
            </>
        );
    };

    const handleNavigate = (key) => {
        onNavigate(key);
        setIsMobileMenuOpen(false);
        closeSearch();
    };

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.35 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent dark:bg-slate-900/50'
                }`}
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
                                    {item.icon ? React.createElement(iconMap[item.icon], { size: 18 }) : <span className="text-lg">{item.emoji || 'â€¢'}</span>}
                                    <span className="hidden xl:inline">{t(item.name, language)}</span>
                                    <span
                                        className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-amber-600 to-yellow-500 transition-all duration-300 ${
                                            activeTab === item.key ? 'w-full' : 'w-0 group-hover:w-full'
                                        }`}
                                    />
                                </motion.button>
                            ))}

                            <motion.button
                                onClick={() => {
                                    setIsSearchOpen(true);
                                    setShowEmptyHint(false);
                                }}
                                whileHover={{ scale: 1.06 }}
                                whileTap={{ scale: 0.97 }}
                                className="p-2 rounded-lg transition-all bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg"
                                title={language === 'vi' ? 'TĂ¬m kiáº¿m (Ctrl+K)' : 'Search (Ctrl+K)'}
                            >
                                <Search size={20} />
                            </motion.button>

                            <motion.button
                                onClick={toggleDarkMode}
                                whileHover={{ scale: 1.06 }}
                                whileTap={{ scale: 0.97 }}
                                className="p-2 rounded-lg transition-all bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:shadow-lg"
                                title={isDarkMode ? 'Light mode' : 'Dark mode'}
                            >
                                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </motion.button>

                            <motion.button
                                onClick={toggleLanguage}
                                whileHover={{ scale: 1.06 }}
                                whileTap={{ scale: 0.97 }}
                                className="p-1.5 rounded-lg transition-all bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:shadow-lg font-semibold text-base flex items-center justify-center min-w-[2.5rem]"
                                title={language === 'vi' ? 'Chuyá»ƒn sang English' : 'Switch to Vietnamese'}
                            >
                                {language.toUpperCase()}
                            </motion.button>
                        </div>

                        <div className="md:hidden flex items-center gap-4">
                            <motion.button
                                onClick={() => {
                                    setIsSearchOpen(true);
                                    setShowEmptyHint(false);
                                }}
                                whileHover={{ scale: 1.06 }}
                                whileTap={{ scale: 0.97 }}
                                className="p-2 rounded-lg transition-all bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg"
                                title={language === 'vi' ? 'TĂ¬m kiáº¿m (Ctrl+K)' : 'Search (Ctrl+K)'}
                            >
                                <Search size={20} />
                            </motion.button>
                            <motion.button
                                onClick={toggleDarkMode}
                                whileHover={{ scale: 1.06 }}
                                whileTap={{ scale: 0.97 }}
                                className="p-2 rounded-lg transition-all bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:shadow-lg"
                                title={isDarkMode ? 'Light mode' : 'Dark mode'}
                            >
                                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </motion.button>
                            <motion.button
                                onClick={toggleLanguage}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className={`rounded-lg transition-all bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:shadow-lg font-semibold text-sm ${
                                    language === 'en' ? 'px-2 py-2' : 'px-3 py-2'
                                }`}
                                title={language === 'vi' ? 'Chuyá»ƒn sang English' : 'Switch to Vietnamese'}
                            >
                                {language.toUpperCase()}
                            </motion.button>
                            <button
                                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                                className="text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                                aria-label="Toggle mobile menu"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>

                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden mt-4 pb-4 rounded-lg shadow-lg bg-white/95 dark:bg-slate-800/95"
                        >
                            {navItems.map((item) => (
                                <button
                                    key={item.key}
                                    onClick={() => handleNavigate(item.key)}
                                    className="flex items-center gap-3 w-full text-left py-3 px-4 transition-all border-b last:border-0 text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-700 border-slate-100 dark:border-slate-700"
                                >
                                    <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                                        {item.icon ? React.createElement(iconMap[item.icon], { size: 18 }) : <span className="text-lg leading-none">{item.emoji || 'â€¢'}</span>}
                                    </span>
                                    {t(item.name, language)}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </nav>
            </motion.header>

            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center pt-16 px-4"
                        onClick={closeSearch}
                    >
                        <motion.div
                            initial={{ y: -16, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -16, opacity: 0 }}
                            className="w-full max-w-2xl bg-white/95 dark:bg-slate-900/95 rounded-2xl shadow-2xl p-6 border border-white/50 dark:border-slate-800"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <form onSubmit={handleSearchSubmit} className="flex flex-col gap-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{t(searchCopy.title, language)}</p>
                                        <p className="text-xs text-slate-500">{t(searchCopy.hint, language)}</p>
                                    </div>
                                    <button type="button" onClick={closeSearch} className="text-slate-500 hover:text-amber-600" aria-label="Close search">
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="flex items-center gap-3 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 focus-within:ring-2 focus-within:ring-amber-400">
                                    <Search size={20} className="text-amber-600" />
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        placeholder={t(searchCopy.placeholder, language)}
                                        value={searchQuery}
                                        onChange={(event) => {
                                            setSearchQuery(event.target.value.slice(0, 50));
                                            setShowEmptyHint(false);
                                        }}
                                        className="flex-1 bg-transparent text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
                                    />
                                    {searchQuery && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSearchQuery('');
                                                setShowEmptyHint(false);
                                                inputRef.current?.focus();
                                            }}
                                            className="text-xs font-medium text-slate-500 hover:text-amber-600"
                                        >
                                            {t(searchCopy.clear, language)}
                                        </button>
                                    )}
                                </div>

                                {showEmptyHint && !normalizedQuery && <div className="text-sm text-amber-600">{t(searchCopy.empty, language)}</div>}
                                {normalizedQuery && suggestions.length === 0 && <div className="text-sm text-slate-500">{t(searchCopy.noResults, language)}</div>}

                                {suggestions.length > 0 && (
                                    <div className="max-h-64 overflow-y-auto border border-slate-200 dark:border-slate-700 rounded-xl divide-y divide-slate-200 dark:divide-slate-700">
                                        {suggestions.map((suggestion, index) => (
                                            <button
                                                key={`${suggestion.section}-${index}`}
                                                onClick={() => {
                                                    suggestion.onClick?.();
                                                    closeSearch();
                                                }}
                                                className="w-full text-left px-4 py-3 bg-white/80 dark:bg-slate-900/80 hover:bg-amber-50 dark:hover:bg-slate-800 transition-colors"
                                            >
                                                <div className="text-xs font-semibold text-amber-600 mb-1">{suggestion.section}</div>
                                                <div className="text-sm text-slate-700 dark:text-slate-200">
                                                    {highlightText(suggestion.snippet.length > 120 ? `${suggestion.snippet.slice(0, 117)}...` : suggestion.snippet)}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
