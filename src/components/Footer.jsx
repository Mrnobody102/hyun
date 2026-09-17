import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/utils';
import { footerData } from '@/data';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { language } = useLanguage();

    return (
        <footer className="relative overflow-hidden border-t border-slate-900/10 dark:border-white/10 bg-[#0b101c] text-slate-400 py-12 px-4">
            <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_100%_at_50%_0%,black,transparent)]" style={{ '--grid-color': 'rgb(148 163 184 / 0.08)' }} />
                <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[36rem] h-[14rem] rounded-full bg-amber-500/[0.07] blur-[90px]" />
            </div>
            <div className="container mx-auto max-w-6xl relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <p className="font-display text-2xl font-bold tracking-tight text-white">
                        {footerData.author}
                        <span className="text-amber-500">.</span>
                    </p>

                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-400">
                        <span>{t(footerData.madeWith, language)}</span>
                        <Heart className="text-amber-500" size={15} fill="currentColor" />
                        <span>{t(footerData.by, language)}</span>
                        <span className="font-semibold text-amber-400">{footerData.author}</span>
                    </div>

                    <div aria-hidden className="mx-auto my-5 h-px w-24 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />

                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">© {currentYear} {t(footerData.copyright, language)}</p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
