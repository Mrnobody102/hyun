import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, Home, Zap, Briefcase, BookOpen, Mail, Search } from 'lucide-react';
import kimImage from '@/assets/kim.jpg';
import { useDarkMode } from '@/context/DarkModeContext';
import { useLanguage } from '@/context/LanguageContext';
import { aboutMe, articles as articlesData } from '@/data/portfolioData';
import { t } from '@/lib/utils';

const Header = ({ activeTab = 'home', onNavigate = () => { }, onArticleSelect = null }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSelectHint, setShowSelectHint] = useState(false);
    const inputRef = useRef(null);
    const backdropRef = useRef(null);
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const { language, toggleLanguage } = useLanguage();

    const searchCopy = {
        title: { en: 'Quick search', vi: 'Tìm kiếm nhanh' },
        hint: { en: 'Up to 50 characters, press Enter to search', vi: 'Tối đa 50 ký tự, nhấn Enter để tìm' },
        placeholder: { en: 'Search across the site...', vi: 'Tìm kiếm trên trang...' },
        empty: { en: 'Type something to search', vi: 'Hãy nhập nội dung cần tìm' },
        noResults: { en: 'No matching suggestions.', vi: 'Không tìm thấy gợi ý phù hợp.' },
        clear: { en: 'Clear', vi: 'Xóa' }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Keyboard shortcut: Ctrl+K to open search
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(true);
                // Focus input after a brief delay to ensure modal is rendered
                setTimeout(() => {
                    inputRef.current?.focus();
                }, 0);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleToggleDarkMode = () => {
        toggleDarkMode();
    };

    const normalizedQuery = searchQuery.trim().toLowerCase();

    const highlightText = (text, query) => {
        if (!query) return text;
        const idx = text.toLowerCase().indexOf(query.toLowerCase());
        if (idx === -1) return text;
        const before = text.slice(0, idx);
        const match = text.slice(idx, idx + query.length);
        const after = text.slice(idx + query.length);
        return (
            <>
                {before}
                <span className="font-bold text-amber-600 dark:text-amber-400">{match}</span>
                {after}
            </>
        );
    };

    const suggestions = useMemo(() => {
        if (!normalizedQuery) return [];

        const results = [];

        const homeSnippet = {
            en: 'Crafting innovative digital solutions with modern technologies.',
            vi: 'Tạo ra giải pháp số hiện đại với công nghệ mới.'
        };
        const homeText = t(homeSnippet, language).toLowerCase();
        if (homeText.includes(normalizedQuery)) {
            results.push({
                section: language === 'vi' ? 'Trang chủ' : 'Home',
                snippet: t(homeSnippet, language),
                onClick: () => onNavigate('home')
            });
        }

        [aboutMe.paragraph1, aboutMe.paragraph2, aboutMe.paragraph3].forEach((p) => {
            const text = t(p, language);
            if (text.toLowerCase().includes(normalizedQuery)) {
                results.push({
                    section: language === 'vi' ? 'Giới thiệu' : 'About Me',
                    snippet: text,
                    onClick: () => onNavigate('home')
                });
            }
        });

        articlesData.forEach((article) => {
            const titleText = t(article.title, language);
            const excerptText = t(article.excerpt, language);
            const titleMatch = titleText.toLowerCase().includes(normalizedQuery);
            const excerptMatch = excerptText.toLowerCase().includes(normalizedQuery);
            if (titleMatch || excerptMatch) {
                results.push({
                    section: language === 'vi' ? 'Bài viết' : 'Articles',
                    snippet: titleMatch ? titleText : excerptText,
                    articleId: article.id,
                    onClick: () => onArticleSelect && onArticleSelect(article.id)
                });
            }
        });

        return results.slice(0, 5);
    }, [aboutMe.paragraph1, aboutMe.paragraph2, aboutMe.paragraph3, articlesData, language, normalizedQuery, onArticleSelect, onNavigate]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!normalizedQuery) {
            setShowSelectHint(true);
            return;
        }
        const first = suggestions[0];
        if (first && first.articleId && onArticleSelect) {
            first.onClick?.();
            setIsSearchOpen(false);
            setShowSelectHint(false);
            return;
        }
        const articlesSection = document.querySelector('#articles');
        if (articlesSection) {
            articlesSection.scrollIntoView({ behavior: 'smooth' });
        }
        setIsSearchOpen(false);
        setShowSelectHint(false);
    };

    useEffect(() => {
        if (isSearchOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSearchOpen]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!isSearchOpen) return;
            const clickedBackdrop = backdropRef.current && backdropRef.current.contains(e.target);
            const clickedInput = inputRef.current && inputRef.current.contains(e.target);

            if (clickedInput) return;

            if (!normalizedQuery) {
                setIsSearchOpen(false);
                setShowSelectHint(false);
                return;
            }

            if (inputRef.current) {
                inputRef.current.select();
            }

            // If already highlighted once, close on next click
            if (showSelectHint) {
                setIsSearchOpen(false);
                setShowSelectHint(false);
            } else {
                setShowSelectHint(true);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isSearchOpen, normalizedQuery, showSelectHint]);

    const navItems = useMemo(() => ([
        { name: { en: 'Home', vi: 'Trang chủ' }, key: 'home', icon: Home },
        { name: { en: 'Skills & Expertise', vi: 'Kỹ năng & Chuyên môn' }, key: 'skills', icon: Zap },
        { name: { en: 'Projects', vi: 'Dự án' }, key: 'projects', icon: Briefcase },
        { name: { en: '🐧 My Little Startup', vi: '🐧 Startup nhỏ của tôi' }, key: 'personal-projects', icon: null },
        { name: { en: 'Articles', vi: 'Bài viết' }, key: 'articles', icon: BookOpen },
        { name: { en: 'Contact', vi: 'Liên hệ' }, key: 'contact', icon: Mail }
    ]), []);

    const handleNavigate = (key) => {
        onNavigate(key);
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg'
                    : 'bg-transparent dark:bg-slate-900/50'
                    }`}
            >
                <nav className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="w-12 h-12 relative cursor-pointer overflow-hidden rounded-full border-2 border-amber-500 shadow-md bg-white"
                            onClick={() => scrollToSection('#hero')}
                        >
                            <img alt="Cute 3D developer character coding" className="w-full h-full object-cover" src={kimImage} />
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            {navItems.map((item, index) => (
                                <motion.button
                                    key={item.name}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    onClick={() => handleNavigate(item.key)}
                                    className={`flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 font-medium transition-colors relative group ${activeTab === item.key ? 'text-amber-600 dark:text-amber-400' : ''}`}
                                >
                                    {item.icon && <item.icon size={18} />}
                                    {t(item.name, language)}
                                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-amber-600 to-yellow-500 transition-all duration-300 ${activeTab === item.key ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                                </motion.button>
                            ))}

                            <motion.button
                                onClick={() => {
                                    setIsSearchOpen(true);
                                    setShowSelectHint(false);
                                }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 rounded-lg transition-all bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg"
                                title={language === 'vi' ? 'Tìm kiếm (Ctrl+K)' : 'Search (Ctrl+K)'}
                            >
                                <Search size={20} />
                            </motion.button>

                            <motion.button
                                onClick={handleToggleDarkMode}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 rounded-lg transition-all bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:shadow-lg"
                                title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
                            >
                                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </motion.button>

                            <motion.button
                                onClick={toggleLanguage}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-1.5 rounded-lg transition-all bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:shadow-lg font-semibold text-base flex items-center justify-center min-w-[2.5rem]"
                                title={language === 'vi' ? 'Chuyển sang English' : 'Switch to Vietnamese'}
                            >
                                {language.toUpperCase()}
                            </motion.button>
                        </div>

                        {/* Mobile Menu Button and Dark Mode Toggle */}
                        <div className="md:hidden flex items-center gap-4">
                            <motion.button
                                onClick={() => {
                                    setIsSearchOpen(true);
                                    setShowSelectHint(false);
                                }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 rounded-lg transition-all bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg"
                                title={language === 'vi' ? 'Tìm kiếm (Ctrl+K)' : 'Search (Ctrl+K)'}
                            >
                                <Search size={20} />
                            </motion.button>
                            <motion.button
                                onClick={handleToggleDarkMode}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 rounded-lg transition-all bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:shadow-lg"
                                title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
                            >
                                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </motion.button>
                            <motion.button
                                onClick={toggleLanguage}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`rounded-lg transition-all bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:shadow-lg font-semibold text-sm ${language === 'en' ? 'px-2 py-2' : 'px-3 py-2'
                                    }`}
                                title={language === 'vi' ? 'Chuyển sang English' : 'Switch to Vietnamese'}
                            >
                                {language.toUpperCase()}
                            </motion.button>
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>


                    {/* Mobile Navigation */}
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden mt-4 pb-4 rounded-lg shadow-lg bg-white/95 dark:bg-slate-800/95"
                        >
                            {navItems.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => handleNavigate(item.key)}
                                    className="flex items-center gap-3 w-full text-left py-3 px-4 transition-all border-b last:border-0 text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-700 border-slate-100 dark:border-slate-700"
                                >
                                    {item.icon && <item.icon size={18} />}
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
                        ref={backdropRef}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center pt-16 px-4"
                    >
                        <motion.div
                            initial={{ y: -16, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -16, opacity: 0 }}
                            className="w-full max-w-2xl bg-white/95 dark:bg-slate-900/95 rounded-2xl shadow-2xl p-6 border border-white/50 dark:border-slate-800"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <form onSubmit={handleSearch} className="flex flex-col gap-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{t(searchCopy.title, language)}</p>
                                        <p className="text-xs text-slate-500">{t(searchCopy.hint, language)}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsSearchOpen(false);
                                            setShowSelectHint(false);
                                        }}
                                        className="text-slate-500 hover:text-amber-600"
                                        aria-label="Đóng tìm kiếm"
                                    >
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
                                        onChange={(e) => {
                                            const val = e.target.value.slice(0, 50);
                                            setSearchQuery(val);
                                            setShowSelectHint(false);
                                        }}
                                        className="flex-1 bg-transparent text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
                                    />
                                    {searchQuery && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSearchQuery('');
                                                inputRef.current?.focus();
                                            }}
                                            className="text-xs font-medium text-slate-500 hover:text-amber-600"
                                        >
                                            {t(searchCopy.clear, language)}
                                        </button>
                                    )}
                                </div>

                                {showSelectHint && !normalizedQuery && (
                                    <div className="text-sm text-amber-600">{t(searchCopy.empty, language)}</div>
                                )}

                                {normalizedQuery && suggestions.length === 0 && (
                                    <div className="text-sm text-slate-500">{t(searchCopy.noResults, language)}</div>
                                )}

                                {suggestions.length > 0 && (
                                    <div className="max-h-64 overflow-y-auto border border-slate-200 dark:border-slate-700 rounded-xl divide-y divide-slate-200 dark:divide-slate-700">
                                        {suggestions.map((s, idx) => (
                                            <button
                                                key={`${s.section}-${idx}`}
                                                onClick={() => {
                                                    if (s.onClick) s.onClick();
                                                    setIsSearchOpen(false);
                                                    setShowSelectHint(false);
                                                }}
                                                className="w-full text-left px-4 py-3 bg-white/80 dark:bg-slate-900/80 hover:bg-amber-50 dark:hover:bg-slate-800 transition-colors"
                                            >
                                                <div className="text-xs font-semibold text-amber-600 mb-1">{s.section}</div>
                                                <div className="text-sm text-slate-700 dark:text-slate-200">
                                                    {highlightText(s.snippet.length > 120 ? `${s.snippet.slice(0, 117)}...` : s.snippet, normalizedQuery)}
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