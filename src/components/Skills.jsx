import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Cloud, Code2, Database, Layers, Server, Zap } from 'lucide-react';
import { skills as skillsData } from '@/data';
import { useLanguage } from '@/context/LanguageContext';
import { getTechIcon } from '@/lib/techIcons';
import { t } from '@/lib/utils';

const Skills = () => {
    const sectionRef = useRef(null);
    const { language } = useLanguage();

    const skillCategories = [
        { title: skillsData.programmingLanguages.title, icon: Code2, color: 'from-amber-500 to-yellow-500', skills: skillsData.programmingLanguages.skills },
        { title: skillsData.backendMiddleware.title, icon: Server, color: 'from-slate-600 to-slate-800', skills: skillsData.backendMiddleware.skills },
        { title: skillsData.frontendUi.title, icon: Layers, color: 'from-yellow-500 to-amber-600', skills: skillsData.frontendUi.skills },
        { title: skillsData.databasesCaching.title, icon: Database, color: 'from-amber-400 to-yellow-400', skills: skillsData.databasesCaching.skills },
        { title: skillsData.cloudDevOps.title, icon: Cloud, color: 'from-slate-500 to-amber-500', skills: skillsData.cloudDevOps.skills },
        { title: skillsData.toolsEnvironments.title, icon: Zap, color: 'from-yellow-600 to-amber-700', skills: skillsData.toolsEnvironments.skills },
    ].filter((category) => Array.isArray(category.skills) && category.skills.length > 0);

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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
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

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={t(category.title, 'en')}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.08 }}
                            whileHover={{ y: -6 }}
                            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-2 border-slate-400 dark:border-slate-600"
                        >
                            <div className={`inline-flex p-4 bg-gradient-to-r ${category.color} rounded-lg mb-4`}>
                                <category.icon className="text-white" size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">{t(category.title, language)}</h3>
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
                </div>
            </div>

            <button onClick={scrollToCertifications} className="mt-10 mx-auto flex items-center justify-center text-amber-600 hover:text-amber-700 transition-colors" aria-label="Scroll to Certifications">
                <ChevronDown size={32} />
            </button>
        </section>
    );
};

export default Skills;
