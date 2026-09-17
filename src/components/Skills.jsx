import React, { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Cloud, Code2, Database, Layers, Server, Zap, Video, Languages as LanguagesIcon } from 'lucide-react';
import { skills as skillsData } from '@/data';
import { useLanguage } from '@/context/LanguageContext';
import { getTechIcon } from '@/lib/techIcons';
import { t } from '@/lib/utils';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import SectionHeading from './SectionHeading';
import SpotlightCard from './SpotlightCard';

const Skills = () => {
    const sectionRef = useRef(null);
    const { language } = useLanguage();

    const skillCategories = useMemo(() => {
        if (!skillsData) return [];

        const categories = [];

        if (skillsData.programmingLanguages) {
            categories.push({ title: skillsData.programmingLanguages.title, icon: Code2, skills: skillsData.programmingLanguages.skills });
        }
        if (skillsData.aiVideoStreaming) {
            categories.push({ title: skillsData.aiVideoStreaming.title, icon: Video, skills: skillsData.aiVideoStreaming.skills });
        }
        if (skillsData.backendMiddleware) {
            categories.push({ title: skillsData.backendMiddleware.title, icon: Server, skills: skillsData.backendMiddleware.skills });
        }
        if (skillsData.databasesVectorSearch) {
            categories.push({ title: skillsData.databasesVectorSearch.title, icon: Database, skills: skillsData.databasesVectorSearch.skills });
        }
        if (skillsData.frontendUi) {
            categories.push({ title: skillsData.frontendUi.title, icon: Layers, skills: skillsData.frontendUi.skills });
        }
        if (skillsData.devOpsSystems) {
            categories.push({ title: skillsData.devOpsSystems.title, icon: Cloud, skills: skillsData.devOpsSystems.skills });
        }
        if (skillsData.tools) {
            categories.push({ title: skillsData.tools.title, icon: Zap, skills: skillsData.tools.skills });
        }
        if (skillsData.languages) {
            categories.push({ title: skillsData.languages.title, icon: LanguagesIcon, skills: skillsData.languages.skills });
        }

        return categories.filter((category) => category && category.skills && Array.isArray(category.skills) && category.skills.length > 0);
    }, []);

    const scrollToCertifications = () => {
        const element = document.querySelector('#certifications');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="pt-32 pb-20 md:pt-36 px-4"
        >
            <div className="container mx-auto max-w-6xl">
                <SectionHeading
                    kicker={language === 'vi' ? 'Năng lực' : 'Capabilities'}
                    title={language === 'vi' ? 'Kỹ năng & Chuyên môn' : 'Skills & Expertise'}
                    subtitle={language === 'vi'
                        ? 'Bộ kỹ năng phục vụ cả nền tảng web quy mô lớn lẫn các hệ thống AI thời gian thực.'
                        : 'A comprehensive toolkit for building modern, scalable applications'}
                />

                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                    {skillCategories.map((category) => (
                        <motion.div
                            key={t(category.title, 'en')}
                            variants={fadeInUp}
                            whileHover={{ y: -6 }}
                            className="group h-full"
                        >
                            <SpotlightCard className="p-7 h-full flex flex-col">
                                <div className="flex items-center gap-3.5 mb-6">
                                    <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 transition-all duration-300 group-hover:bg-amber-500 group-hover:text-white group-hover:shadow-glow-sm">
                                        {category.icon && <category.icon size={20} />}
                                    </div>
                                    <h3 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">{t(category.title, language)}</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium bg-slate-900/[0.03] dark:bg-white/[0.05] text-slate-700 dark:text-slate-200 border border-slate-900/10 dark:border-white/10 hover:border-amber-500/50 hover:text-amber-700 dark:hover:text-amber-300 hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                                        >
                                            <span aria-hidden className="text-sm">
                                                {getTechIcon(skill)}
                                            </span>
                                            <span>{skill}</span>
                                        </span>
                                    ))}
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <button onClick={scrollToCertifications} className="mt-12 mx-auto flex items-center justify-center text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors animate-bounce z-20 relative p-3 cursor-pointer" aria-label="Scroll to Certifications">
                <ChevronDown size={28} />
            </button>
        </section>
    );
};

export default React.memo(Skills);
