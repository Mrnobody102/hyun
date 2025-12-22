import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Award } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/utils';
import { educationExperience } from '@/data/portfolioData';

const EducationExperience = () => {
    const { language } = useLanguage();
    const timeline = educationExperience;

    const getIcon = (type) => {
        switch (type) {
            case 'education': return GraduationCap;
            case 'internship': return Award;
            case 'work': return Briefcase;
            default: return Briefcase;
        }
    };

    return (
        <section id="education-experience" className="py-20 px-4 bg-gradient-to-br from-white via-slate-50 to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
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
                            {language === 'vi' ? 'Đào tạo & Kinh nghiệm' : 'Education & Experience'}
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto rounded-full"></div>
                    <p className="text-slate-600 dark:text-slate-300 mt-4 max-w-2xl mx-auto">
                        {language === 'vi' ? 'Hành trình học tập và phát triển chuyên môn' : 'My academic journey and professional growth'}
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-amber-200 to-yellow-200 dark:from-amber-800 dark:to-yellow-800"></div>

                    <div className="space-y-12">
                        {timeline.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Content card */}
                                <div className="w-full md:w-5/12">
                                    <motion.div
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-2 border-slate-400 dark:border-slate-600"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`p-3 bg-gradient-to-r ${item.color} rounded-lg shrink-0`}>
                                                {React.createElement(getIcon(item.type), { className: "text-white", size: 24 })}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                                                    {item.title}
                                                </h3>
                                                <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-2">
                                                    {t(item.subtitle, language)}
                                                </p>
                                                <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">
                                                    {t(item.description, language)}
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <span className="px-3 py-1 bg-amber-50 dark:bg-slate-700 text-amber-700 dark:text-amber-300 rounded-full text-xs font-semibold border border-amber-100 dark:border-slate-600">
                                                        {item.period}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Timeline dot */}
                                <div className="hidden md:flex w-2/12 justify-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                                        className="w-6 h-6 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full border-4 border-white dark:border-slate-900 shadow-lg z-10"
                                    ></motion.div>
                                </div>

                                {/* Spacer for alternating layout */}
                                <div className="hidden md:block w-5/12"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default EducationExperience;
