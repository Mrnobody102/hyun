import React from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap } from 'lucide-react';
import { educationExperience } from '@/data';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/utils';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import SpotlightCard from './SpotlightCard';
import SectionHeading from './SectionHeading';

const iconByType = {
    education: GraduationCap,
    internship: Award,
    work: Briefcase,
};

const EducationExperience = () => {
    const { language } = useLanguage();

    return (
        <section id="education-experience" className="py-16 px-4 overflow-hidden">
            <div className="container mx-auto max-w-6xl">
                <SectionHeading
                    kicker={language === 'vi' ? 'Hành trình' : 'Journey'}
                    title={language === 'vi' ? 'Đào tạo & Kinh nghiệm' : 'Education & Experience'}
                    subtitle={language === 'vi' ? 'Hành trình học tập và phát triển chuyên môn' : 'My academic journey and professional growth'}
                />

                <div className="relative">
                    <div className="hidden md:block absolute left-1/2 -translate-x-1/2 h-full w-px bg-gradient-to-b from-transparent via-amber-500/40 to-transparent" />

                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, margin: "-50px" }}
                        className="space-y-8"
                    >
                        {educationExperience.map((item, index) => {
                            const Icon = iconByType[item.type] || Briefcase;

                            return (
                                <motion.div
                                    key={`${item.type}-${item.title}-${item.period}`}
                                    variants={fadeInUp}
                                    className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                >
                                    <div className="w-full md:w-5/12">
                                        <motion.div
                                            whileHover={{ y: -5 }}
                                            className="group h-full"
                                        >
                                            <SpotlightCard className="p-6 h-full">
                                                <div className="flex items-start gap-4">
                                                    <div className="p-3 rounded-xl shrink-0 bg-amber-500/10 text-amber-600 dark:text-amber-400 transition-all duration-300 group-hover:bg-amber-500 group-hover:text-white group-hover:shadow-glow-sm">
                                                        <Icon size={22} />
                                                    </div>
                                                    <div className="flex-1 relative z-10">
                                                        <h3 className="font-display text-xl font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{item.title}</h3>
                                                        <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-2">{t(item.subtitle, language)}</p>
                                                        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">{t(item.description, language)}</p>
                                                        <span className="inline-block px-3 py-1 rounded-full font-mono text-[10px] font-semibold uppercase tracking-[0.15em] bg-slate-900/[0.04] dark:bg-white/[0.06] text-slate-600 dark:text-slate-300 border border-slate-900/10 dark:border-white/10">
                                                            {item.period}
                                                        </span>
                                                    </div>
                                                </div>
                                            </SpotlightCard>
                                        </motion.div>
                                    </div>

                                    <div className="hidden md:flex w-2/12 justify-center">
                                        <motion.div
                                            initial={{ scale: 0, rotate: 0 }}
                                            whileInView={{ scale: 1, rotate: 45 }}
                                            viewport={{ once: true }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.1 + 0.3 }}
                                            className="w-3.5 h-3.5 bg-amber-500 ring-4 ring-amber-500/20 border-2 border-[#f7f5f1] dark:border-[#080c16] z-10"
                                        />
                                    </div>

                                    <div className="hidden md:block w-5/12" />
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(EducationExperience);
