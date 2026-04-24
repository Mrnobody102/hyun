import { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/utils';
import { heroData } from '@/data';
import ResumeFile from '@/assets/Resume.pdf';

const Hero = ({ onNavigate = () => {} }) => {
    const { language } = useLanguage();
    const { greetings, name, role, lead, imageUrl, imageAlt, imagePosition, ctaContact, ctaProjects, ctaDownload, resumeFileName } = heroData;
    const [greetingText, setGreetingText] = useState(() => greetings.text1);
    const sectionRef = useRef(null);
    const greetingOptions = useMemo(() => [greetings.text1, greetings.text2].filter(Boolean), [greetings.text1, greetings.text2]);

    useEffect(() => {
        if (greetingOptions.length <= 1) {
            setGreetingText(greetingOptions[0] || '');
            return undefined;
        }

        setGreetingText(greetingOptions[0]);
        let currentIndex = 0;
        const intervalId = window.setInterval(() => {
            currentIndex = (currentIndex + 1) % greetingOptions.length;
            setGreetingText(greetingOptions[currentIndex]);
        }, 3200);

        return () => window.clearInterval(intervalId);
    }, [greetingOptions]);

    const handleDownloadResume = () => {
        const link = document.createElement('a');
        link.href = ResumeFile;
        link.download = resumeFileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const scrollToAbout = () => {
        const element = document.querySelector('#about');
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
            });
        }
    };

    return (
        <section id="hero" ref={sectionRef} className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-amber-200/20 to-yellow-200/20 dark:from-amber-500/10 dark:to-yellow-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-slate-200/20 to-amber-100/20 dark:from-slate-800/30 dark:to-amber-600/20 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }} className="space-y-6">
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.55 }}>
                            <span className="inline-block px-4 py-2 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 rounded-full text-sm font-semibold mb-4">{greetingText}</span>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
                                <span className="bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 dark:from-amber-200 dark:via-yellow-200 dark:to-amber-300 bg-clip-text text-transparent">
                                    {name}
                                </span>
                            </h1>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 dark:from-amber-300 dark:via-yellow-300 dark:to-amber-200 bg-clip-text text-transparent">
                                {t(role, language)}
                            </h2>
                        </motion.div>

                        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.55 }} className="text-lg text-slate-600 dark:text-slate-200 leading-relaxed">
                            {t(lead, language)}
                        </motion.p>

                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.55 }} className="flex flex-wrap gap-4">
                            <button onClick={() => onNavigate('contact')} className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                                {t(ctaContact, language)}
                            </button>
                            <button onClick={() => onNavigate('projects')} className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg font-semibold hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                                {t(ctaProjects, language)}
                            </button>
                            <button onClick={handleDownloadResume} className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg font-semibold hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center gap-2">
                                <Download size={18} />
                                {t(ctaDownload, language)}
                            </button>
                        </motion.div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.15 }} className="relative">
                        <div className="relative w-full aspect-square max-w-md mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full blur-2xl opacity-20" />
                            <img
                                src={imageUrl}
                                alt={imageAlt}
                                loading="eager"
                                fetchPriority="high"
                                decoding="async"
                                className="relative z-10 w-full h-full object-cover rounded-2xl shadow-2xl"
                                style={{ objectPosition: imagePosition || 'center center' }}
                            />
                            <div className="absolute inset-0 rounded-2xl ring-4 ring-amber-200/60 dark:ring-amber-300/20" />
                        </div>
                    </motion.div>
                </div>
            </div>

            <button onClick={scrollToAbout} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-amber-600 hover:text-amber-700 transition-colors">
                <ChevronDown size={32} />
            </button>
        </section>
    );
};

export default Hero;
