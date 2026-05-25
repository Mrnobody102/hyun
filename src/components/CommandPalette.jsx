import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Home, Folder, FileText, Wrench, Mail, Moon, Sun, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useDarkMode } from '@/context/DarkModeContext';
import { routesByTab } from '@/lib/routes';

const CommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const { language, toggleLanguage } = useLanguage();
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    // Toggle Palette on Cmd+K or Ctrl+K
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen((prev) => !prev);
                setSearch('');
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Actions list
    const actions = [
        { id: 'home', title: language === 'vi' ? 'Trang chủ' : 'Home', icon: <Home size={18} />, action: () => navigate(routesByTab.home) },
        { id: 'projects', title: language === 'vi' ? 'Dự án chính' : 'Main Projects', icon: <Folder size={18} />, action: () => navigate(routesByTab.projects) },
        { id: 'personal', title: language === 'vi' ? 'Dự án cá nhân' : 'Personal Projects', icon: <Folder size={18} />, action: () => navigate(routesByTab['personal-projects']) },
        { id: 'skills', title: language === 'vi' ? 'Kỹ năng' : 'Skills', icon: <Wrench size={18} />, action: () => navigate(routesByTab.skills) },
        { id: 'articles', title: language === 'vi' ? 'Bài viết' : 'Articles', icon: <FileText size={18} />, action: () => navigate(routesByTab.articles) },
        { id: 'contact', title: language === 'vi' ? 'Liên hệ' : 'Contact', icon: <Mail size={18} />, action: () => navigate(routesByTab.contact) },
        { id: 'theme', title: language === 'vi' ? 'Đổi Giao diện (Sáng/Tối)' : 'Toggle Theme', icon: isDarkMode ? <Sun size={18} /> : <Moon size={18} />, action: () => toggleDarkMode() },
        { id: 'lang', title: language === 'vi' ? 'Switch to English' : 'Đổi sang Tiếng Việt', icon: <Globe size={18} />, action: () => toggleLanguage() }
    ];

    const filteredActions = actions.filter((action) =>
        action.title.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        setSelectedIndex(0);
    }, [search]);

    const handleActionSelect = (action) => {
        action.action();
        setIsOpen(false);
    };

    const handleKeyDown = (e) => {
        if (!isOpen) return;
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev + 1) % filteredActions.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % filteredActions.length);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredActions[selectedIndex]) {
                handleActionSelect(filteredActions[selectedIndex]);
            }
        }
    };

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen, selectedIndex, filteredActions]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 100);
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh] px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
                    >
                        <div className="flex items-center px-4 border-b border-slate-100 dark:border-slate-800">
                            <Search className="text-slate-400" size={20} />
                            <input
                                ref={inputRef}
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={language === 'vi' ? 'Tìm kiếm chức năng...' : 'Search command...'}
                                className="w-full bg-transparent border-none focus:outline-none focus:ring-0 px-4 py-4 text-slate-800 dark:text-slate-100 text-lg placeholder:text-slate-400"
                            />
                            <span className="text-xs font-bold px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-md shrink-0">ESC</span>
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto p-2">
                            {filteredActions.length === 0 ? (
                                <div className="p-4 text-center text-slate-500">
                                    {language === 'vi' ? 'Không tìm thấy chức năng' : 'No commands found'}
                                </div>
                            ) : (
                                filteredActions.map((action, index) => (
                                    <button
                                        key={action.id}
                                        onClick={() => handleActionSelect(action)}
                                        onMouseEnter={() => setSelectedIndex(index)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${
                                            index === selectedIndex
                                                ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400'
                                                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                                        }`}
                                    >
                                        <div className={`p-2 rounded-lg ${
                                            index === selectedIndex
                                                ? 'bg-amber-100 dark:bg-amber-500/20'
                                                : 'bg-slate-100 dark:bg-slate-800'
                                        }`}>
                                            {action.icon}
                                        </div>
                                        <span className="font-medium text-sm md:text-base">{action.title}</span>
                                        {index === selectedIndex && (
                                            <span className="ml-auto text-xs opacity-60 flex gap-1">
                                                <span className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded">↵</span>
                                            </span>
                                        )}
                                    </button>
                                ))
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CommandPalette;
