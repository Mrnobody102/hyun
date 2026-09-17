import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Terminal, Heart, MapPin } from 'lucide-react';
import { aboutMe, personalInfo } from '@/data';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/utils';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import SectionHeading from './SectionHeading';

const stats = [
    { icon: Terminal, label: { en: 'Job Title', vi: 'Vị trí' }, value: personalInfo.jobTitle },
    { icon: MapPin, label: { en: 'Location', vi: 'Địa điểm' }, value: personalInfo.location },
    { icon: Briefcase, label: { en: 'Experience', vi: 'Kinh nghiệm' }, value: personalInfo.experience },
    { icon: Heart, label: { en: 'Passion', vi: 'Sở thích' }, value: personalInfo.passion },
];

const About = () => {
    const sectionRef = useRef(null);
    const { language } = useLanguage();

    return (
        <section
            id="about"
            ref={sectionRef}
            className="py-16 px-4 overflow-hidden"
        >
            <div className="container mx-auto max-w-6xl">
                <SectionHeading
                    kicker={language === 'vi' ? 'Giới thiệu' : 'Introduction'}
                    title={language === 'vi' ? 'Về tôi' : 'About Me'}
                />

                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <motion.div
                        variants={fadeInUp}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed">{t(aboutMe.paragraph1, language)}</p>
                        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">{t(aboutMe.paragraph2, language)}</p>
                        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">{t(aboutMe.paragraph3, language)}</p>
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
                                whileHover={{ y: -5 }}
                                className="group rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white/85 dark:bg-white/[0.04] backdrop-blur-sm p-5 shadow-card hover:shadow-card-hover hover:border-amber-400/40 dark:hover:border-amber-400/30 transition-all duration-300"
                            >
                                <div className="inline-flex p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-3.5 transition-all duration-300 group-hover:bg-amber-500 group-hover:text-white group-hover:shadow-glow-sm">
                                    <stat.icon size={22} />
                                </div>
                                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mb-1.5">{t(stat.label, language)}</p>
                                <p className="font-display text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">{t(stat.value, language)}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(About);
