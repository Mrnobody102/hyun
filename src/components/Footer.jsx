import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { language } = useLanguage();

    return (
        <footer className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white py-8 px-4">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="text-sm text-slate-300">{language === 'vi' ? 'Được tạo với' : 'Made with'}</span>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            <Heart className="text-amber-500" size={18} fill="currentColor" />
                        </motion.div>
                        <span className="text-sm text-slate-300">{language === 'vi' ? 'bởi' : 'by'}</span>
                        <span className="text-sm font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                            Hyun
                        </span>
                    </div>

                    <div className="w-16 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto mb-4"></div>

                    <p className="text-sm text-slate-400">
                        © {currentYear} {language === 'vi' ? 'Bảo lưu mọi quyền. Xây dựng với React, TailwindCSS & Framer Motion' : 'All rights reserved. Built with React, TailwindCSS & Framer Motion'}
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;