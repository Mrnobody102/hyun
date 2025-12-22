import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase, Heart, ChevronDown } from 'lucide-react';
import { aboutMe, personalInfo } from '@/data/portfolioData';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/utils';

const About = () => {
    const sectionRef = useRef(null);
    const { language } = useLanguage();

    useEffect(() => {
        // No longer needed
    }, []);

    const stats = [
        { icon: Calendar, label: { en: 'Born', vi: 'Ngày sinh' }, value: personalInfo.birthDate },
        { icon: MapPin, label: { en: 'Location', vi: 'Địa điểm' }, value: personalInfo.location },
        { icon: Briefcase, label: { en: 'Experience', vi: 'Kinh nghiệm' }, value: personalInfo.experience },
        { icon: Heart, label: { en: 'Passion', vi: 'Sở thích' }, value: personalInfo.passion }
    ];

    const scrollToNext = () => {
        const el = document.querySelector('#education-experience');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="about" ref={sectionRef} className="py-20 px-4 bg-gradient-to-br from-white via-slate-50 to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-slate-800 via-amber-600 to-yellow-600 dark:from-amber-300 dark:via-yellow-300 dark:to-amber-200 bg-clip-text text-transparent">
                            {language === 'vi' ? 'Về tôi' : 'About Me'}
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
                            {t(aboutMe.paragraph1, language)}
                        </p>
                        <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
                            {t(aboutMe.paragraph2, language)}
                        </p>
                        <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
                            {t(aboutMe.paragraph3, language)}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-slate-400 dark:border-slate-600"
                            >
                                <div className="inline-flex p-3 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg mb-4">
                                    <stat.icon className="text-amber-600" size={24} />
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{t(stat.label, language)}</p>
                                <p className="text-lg font-bold text-slate-800 dark:text-slate-100">{t(stat.value, language)}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            <motion.button
                onClick={scrollToNext}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mt-10 mx-auto flex items-center justify-center text-amber-600 hover:text-amber-700 transition-colors"
                aria-label="Scroll to Education & Experience"
            >
                <ChevronDown size={32} />
            </motion.button>
        </section>
    );
};

export default About;