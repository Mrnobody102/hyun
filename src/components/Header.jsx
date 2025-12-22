import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import kimImage from '@/assets/kim.jpg';
import { useDarkMode } from '@/context/DarkModeContext';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleToggleDarkMode = () => {
        toggleDarkMode();
    };

    const navItems = [
        { name: 'Home', href: '#hero' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Experience', href: '#company-projects' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' }
    ];

    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
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
                                onClick={() => scrollToSection(item.href)}
                                className="text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 font-medium transition-colors relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-yellow-500 group-hover:w-full transition-all duration-300"></span>
                            </motion.button>
                        ))}
                        <motion.button
                            onClick={handleToggleDarkMode}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 rounded-lg transition-all bg-amber-100 dark:bg-slate-700 text-slate-700 dark:text-yellow-400"
                            title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
                        >
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </motion.button>
                    </div>

                    {/* Mobile Menu Button and Dark Mode Toggle */}
                    <div className="md:hidden flex items-center gap-4">
                        <motion.button
                            onClick={handleToggleDarkMode}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 rounded-lg transition-all bg-amber-100 dark:bg-slate-700 text-slate-700 dark:text-yellow-400"
                            title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
                        >
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
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
                                onClick={() => scrollToSection(item.href)}
                                className="block w-full text-left py-3 px-4 transition-all border-b last:border-0 text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-700 border-slate-100 dark:border-slate-700"
                            >
                                {item.name}
                            </button>
                        ))}
                    </motion.div>
                )}
            </nav>
        </motion.header>
    );
};

export default Header;