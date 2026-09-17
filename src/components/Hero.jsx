import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Briefcase, Download, Zap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/utils';
import { heroData, personalInfo } from '@/data';
import SafeImage from './SafeImage';
import Tilt3D from './Tilt3D';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const Hero = ({ onNavigate = () => {} }) => {
    const { language } = useLanguage();
    const { greetings, role, lead, imageUrl, imageAlt, imagePosition, ctaContact, ctaProjects, ctaDownload } = heroData;
    const sectionRef = useRef(null);
    const greetingOptions = useMemo(
        () => [greetings.text1, greetings.text2].map((g) => t(g, language)).filter(Boolean),
        [greetings.text1, greetings.text2, language]
    );
    const [greetingText, setGreetingText] = useState(() => greetingOptions[0] || '');

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

    const scrollToAbout = useCallback(() => {
        const element = document.querySelector('#about');
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
            });
        }
    }, []);

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, 180]);

    // "Software Engineer | AI Platform & Distributed Systems" → plain part + serif-italic accent part
    const [rolePrimary, roleAccent] = useMemo(() => {
        const parts = t(role, language).split('|').map((part) => part.trim());
        return [parts[0] || '', parts.slice(1).join(' · ')];
    }, [role, language]);

    return (
        <section id="hero" ref={sectionRef} className="min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div style={{ y: y1 }} className="absolute -top-24 right-[8%] w-[32rem] h-[32rem] rounded-full bg-amber-400/15 dark:bg-amber-500/10 blur-[120px]" />
            </div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-10 items-center">
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                        className="space-y-6"
                    >
                        <motion.div variants={fadeInUp}>
                            <span className="inline-flex items-center gap-2.5 rounded-full border border-amber-500/30 bg-amber-500/[0.07] dark:bg-amber-400/[0.06] px-4 py-2 font-mono text-xs font-medium text-amber-700 dark:text-amber-300">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                                </span>
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={greetingText}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.35 }}
                                        className="inline-block"
                                    >
                                        {greetingText}
                                    </motion.span>
                                </AnimatePresence>
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={fadeInUp}
                            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.05]"
                        >
                            {t(personalInfo.fullName, language)}
                            <span className="text-amber-500">.</span>
                        </motion.h1>

                        <motion.div variants={fadeInUp} className="space-y-1">
                            <p className="font-display text-2xl md:text-3xl font-semibold text-slate-700 dark:text-slate-200 tracking-tight">
                                {rolePrimary}
                            </p>
                            {roleAccent && (
                                <p className="font-serif italic text-2xl md:text-3xl text-amber-600 dark:text-amber-400 leading-snug">
                                    {roleAccent}
                                </p>
                            )}
                        </motion.div>

                        <motion.p variants={fadeInUp} className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                            {t(lead, language)}
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.03, y: -1 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => onNavigate('contact')}
                                className="group inline-flex items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-400 px-7 py-3.5 font-semibold text-slate-950 shadow-glow-sm hover:shadow-glow transition-all duration-300"
                            >
                                {t(ctaContact, language)}
                                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.03, y: -1 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => onNavigate('projects')}
                                className="inline-flex items-center gap-2 rounded-full border border-slate-900/15 dark:border-white/15 bg-white/60 dark:bg-white/5 px-7 py-3.5 font-semibold text-slate-800 dark:text-slate-100 hover:border-amber-500/60 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-300"
                            >
                                {t(ctaProjects, language)}
                            </motion.button>
                            <motion.a
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                href="/Resume.pdf"
                                download="Pham_Quang_Huy_Resume.pdf"
                                className="inline-flex items-center gap-2 px-2 py-3.5 font-semibold text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300 cursor-pointer underline decoration-slate-300 dark:decoration-slate-600 decoration-1 underline-offset-8 hover:decoration-amber-500"
                            >
                                <Download size={17} />
                                {t(ctaDownload, language)}
                            </motion.a>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 32, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                        className="relative"
                    >
                        <Tilt3D max={8} scale={1.01} className="group">
                            <div className="relative w-full aspect-[4/5] max-w-sm mx-auto preserve-3d">
                                {/* depth layers behind the portrait */}
                                <div
                                    aria-hidden
                                    style={{ transform: 'translateZ(-60px) rotate(4deg)' }}
                                    className="absolute -inset-3 rounded-[2rem] border border-amber-500/40 dark:border-amber-400/30"
                                />
                                <div
                                    aria-hidden
                                    style={{ transform: 'translateZ(-80px)' }}
                                    className="absolute -inset-8 rounded-full bg-amber-400/20 dark:bg-amber-500/10 blur-3xl"
                                />

                                <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] ring-1 ring-slate-900/10 dark:ring-white/15 shadow-card-hover">
                                    <SafeImage
                                        src={imageUrl}
                                        alt={imageAlt}
                                        loading="eager"
                                        fetchPriority="high"
                                        className="h-full w-full object-cover"
                                        style={{ objectPosition: imagePosition || 'center center' }}
                                    />
                                    <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950/45 to-transparent" />
                                </div>

                                {/* floating badges at different depths */}
                                <div
                                    style={{ transform: 'translateZ(55px)' }}
                                    className="absolute -left-4 md:-left-8 top-10"
                                >
                                    <div className="animate-float flex items-center gap-3 rounded-2xl border border-white/50 dark:border-white/15 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md px-4 py-3 shadow-card">
                                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                                            <Zap size={17} />
                                        </span>
                                        <div>
                                            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Focus</p>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{language === 'vi' ? 'AI thời gian thực' : 'Real-time AI'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    style={{ transform: 'translateZ(45px)' }}
                                    className="absolute -right-3 md:-right-7 bottom-12"
                                >
                                    <div className="animate-float-delayed flex items-center gap-3 rounded-2xl border border-white/50 dark:border-white/15 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md px-4 py-3 shadow-card">
                                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                                            <Briefcase size={17} />
                                        </span>
                                        <div>
                                            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Backend · Web</p>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{t(personalInfo.experience, language)} {language === 'vi' ? 'kinh nghiệm' : 'experience'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tilt3D>
                    </motion.div>
                </div>
            </div>

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                onClick={scrollToAbout}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2.5 text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
                aria-label="Scroll to about section"
            >
                <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.35em]">Scroll</span>
                <span className="flex h-10 w-6 justify-center rounded-full border border-slate-400/60 dark:border-slate-500/60 pt-2">
                    <span className="h-2 w-1 rounded-full bg-amber-500 animate-scroll-dot" />
                </span>
            </motion.button>
        </section>
    );
};

export default React.memo(Hero);
