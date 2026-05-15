import React, { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Cloud, Code2, Database, Layers, Server, Zap, Video, Languages as LanguagesIcon } from 'lucide-react';
import { skills as skillsData } from '@/data';
import { useLanguage } from '@/context/LanguageContext';
import { getTechIcon } from '@/lib/techIcons';
import { t } from '@/lib/utils';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const Skills = () => {
    const sectionRef = useRef(null);
    const { language } = useLanguage();

    const skillCategories = useMemo(() => {
        if (!skillsData) return [];
        
        const categories = [];
        
        if (skillsData.programmingLanguages) {
            categories.push({ title: skillsData.programmingLanguages.title, icon: Code2, color: 'from-amber-500 to-yellow-500', skills: skillsData.programmingLanguages.skills });
        }
        if (skillsData.aiVideoStreaming) {
            categories.push({ title: skillsData.aiVideoStreaming.title, icon: Video, color: 'from-blue-500 to-cyan-500', skills: skillsData.aiVideoStreaming.skills });
        }
        if (skillsData.backendMiddleware) {
            categories.push({ title: skillsData.backendMiddleware.title, icon: Server, color: 'from-slate-600 to-slate-800', skills: skillsData.backendMiddleware.skills });
        }
        if (skillsData.databasesVectorSearch) {
            categories.push({ title: skillsData.databasesVectorSearch.title, icon: Database, color: 'from-amber-400 to-yellow-400', skills: skillsData.databasesVectorSearch.skills });
        }
        if (skillsData.frontendUi) {
            categories.push({ title: skillsData.frontendUi.title, icon: Layers, color: 'from-yellow-500 to-amber-600', skills: skillsData.frontendUi.skills });
        }
        if (skillsData.devOpsSystems) {
            categories.push({ title: skillsData.devOpsSystems.title, icon: Cloud, color: 'from-slate-500 to-amber-500', skills: skillsData.devOpsSystems.skills });
        }
        if (skillsData.tools) {
            categories.push({ title: skillsData.tools.title, icon: Zap, color: 'from-yellow-600 to-amber-700', skills: skillsData.tools.skills });
        }
        if (skillsData.languages) {
            categories.push({ title: skillsData.languages.title, icon: LanguagesIcon, color: 'from-emerald-500 to-teal-500', skills: skillsData.languages.skills });
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
            className="pt-32 pb-20 md:pt-36 px-4 bg-gradient-to-br from-slate-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900"
        >
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <h2 className="text-4xl md:text-5xl font-bold">
                            <span className="bg-gradient-to-r from-slate-800 via-amber-600 to-yellow-600 dark:from-amber-300 dark:via-yellow-300 dark:to-amber-200 bg-clip-text text-transparent">
                                {language === 'vi' ? 'Kỹ năng & Chuyên môn' : 'Skills & Expertise'}
                            </span>
                        </h2>
                    </div>
                    <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto rounded-full" />
                    <p className="text-slate-600 dark:text-slate-300 mt-4 max-w-2xl mx-auto">
                        {language === 'vi'
                            ? 'Bộ kỹ năng phục vụ cả nền tảng web quy mô lớn lẫn các hệ thống AI thời gian thực.'
                            : 'A comprehensive toolkit for building modern, scalable applications'}
                    </p>
                </motion.div>

                <motion.div 
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    {skillCategories.map((category) => (
                        <motion.div
                            key={t(category.title, 'en')}
                            variants={fadeInUp}
                            whileHover={{ y: -6 }}
                            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-slate-100 dark:border-slate-700 h-full flex flex-col"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`p-2.5 bg-gradient-to-r ${category.color} rounded-xl shadow-lg shadow-amber-500/10`}>
                                    {category.icon && <category.icon className="text-white" size={20} />}
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 leading-tight">{t(category.title, language)}</h3>
                            </div>
                            <div className="flex flex-wrap gap-2 md:max-w-md">
                                {category.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-slate-700 dark:to-slate-600 text-amber-700 dark:text-amber-200 rounded-full text-sm font-medium transition-all cursor-default"
                                    >
                                        <span aria-hidden className="text-base">
                                            {getTechIcon(skill)}
                                        </span>
                                        <span>{skill}</span>
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <button onClick={scrollToCertifications} className="mt-10 mx-auto flex items-center justify-center text-amber-600 hover:text-amber-700 transition-colors" aria-label="Scroll to Certifications">
                <ChevronDown size={32} />
            </button>
        </section>
    );
};

export default React.memo(Skills);
