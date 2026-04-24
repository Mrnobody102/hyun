import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/utils';
import { footerData } from '@/data';

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
                        <span className="text-sm text-slate-300">{t(footerData.madeWith, language)}</span>
                        <div>
                            <Heart className="text-amber-500" size={18} fill="currentColor" />
                        </div>
                        <span className="text-sm text-slate-300">{t(footerData.by, language)}</span>
                        <span className="text-sm font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                            {footerData.author}
                        </span>
                    </div>

                    <div className="w-16 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto mb-4" />

                    <p className="text-sm text-slate-400">© {currentYear} {t(footerData.copyright, language)}</p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
