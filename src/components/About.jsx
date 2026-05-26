import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Terminal, ChevronDown, Heart, MapPin } from 'lucide-react';
import { aboutMe, personalInfo } from '@/data';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/utils';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const stats = [
    { icon: Terminal, label: { en: 'Job Title', vi: 'Vị trí' }, value: personalInfo.jobTitle },
    { icon: MapPin, label: { en: 'Location', vi: 'Địa điểm' }, value: personalInfo.location },
    { icon: Briefcase, label: { en: 'Experience', vi: 'Kinh nghiệm' }, value: personalInfo.experience },
    { icon: Heart, label: { en: 'Passion', vi: 'Sở thích' }, value: personalInfo.passion },
];

const About = () => {
    const sectionRef = useRef(null);
    const { language } = useLanguage();

    const scrollToNext = useCallback(() => {
        const element = document.querySelector('#education-experience');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="py-20 px-4 bg-gradient-to-br from-white via-slate-50 to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 overflow-hidden"
        >
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-slate-800 via-amber-600 to-yellow-600 dark:from-amber-300 dark:via-yellow-300 dark:to-amber-200 bg-clip-text text-transparent">
                            {language === 'vi' ? 'Về tôi' : 'About Me'}
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        variants={fadeInUp}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed">{t(aboutMe.paragraph1, language)}</p>
                        <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed">{t(aboutMe.paragraph2, language)}</p>
                        <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed">{t(aboutMe.paragraph3, language)}</p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {stats.map((stat) => (
                            <motion.div
                                key={t(stat.label, 'en')}
                                variants={fadeInUp}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-slate-400 dark:border-slate-600 group"
                            >
                                <div className="inline-flex p-3 bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-500/10 dark:to-yellow-500/10 rounded-lg mb-4 group-hover:from-amber-500 group-hover:to-yellow-500 transition-all duration-300">
                                    <stat.icon className="text-amber-600 dark:text-amber-400 group-hover:text-white transition-colors" size={24} />
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{t(stat.label, language)}</p>
                                <p className="text-lg font-bold text-slate-800 dark:text-slate-100">{t(stat.value, language)}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            <button onClick={scrollToNext} className="mt-10 mx-auto flex items-center justify-center text-amber-600 hover:text-amber-700 transition-colors animate-bounce z-20 relative p-3 cursor-pointer" aria-label="Scroll to Education & Experience">
                <ChevronDown size={32} />
            </button>
        </section>
    );
};

export default React.memo(About);

