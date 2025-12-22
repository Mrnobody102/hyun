import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Briefcase, Code, CheckCircle } from 'lucide-react';
import { getTechIcon } from '@/lib/techIcons';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/utils';
import { companyProjects } from '@/data/companyProjects';

const CompanyProjects = ({ compact = false }) => {
    const { language } = useLanguage();
    const projects = companyProjects;
    const displayedProjects = compact ? projects.slice(0, 2) : projects;

    return (
        <section id="company-projects" className="py-20 px-4 bg-white dark:bg-slate-950">
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
                                {language === 'vi' ? 'Dự án chính' : 'Main Projects'}
                            </span>
                        </h2>
                    </div>
                    <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto rounded-full"></div>
                    <p className="text-slate-600 dark:text-slate-300 mt-4 max-w-2xl mx-auto">
                        {language === 'vi' ? 'Kinh nghiệm chuyên nghiệp cung cấp giải pháp tác động cao' : 'Professional experience delivering high-impact solutions'}
                    </p>
                </motion.div>

                {compact ? (
                    <div className="grid md:grid-cols-2 gap-6">
                        {displayedProjects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-xl p-6 shadow-md border-2 border-slate-400 dark:border-slate-600 h-full flex flex-col"
                            >
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{project.name}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{project.position}</p>
                                    </div>
                                    <span className="text-xs font-semibold px-3 py-1 bg-amber-50 dark:bg-slate-800 text-amber-700 dark:text-amber-200 rounded-full border border-amber-100 dark:border-slate-700">
                                        {project.duration}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed mb-4 line-clamp-3">{t(project.description, language)}</p>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.technologies.slice(0, 6).map((tech) => (
                                        <span key={tech} className="flex items-center gap-2 px-2.5 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-100 rounded-lg text-xs font-semibold shadow-sm">
                                            <span aria-hidden>{getTechIcon(tech)}</span>
                                            <span>{tech}</span>
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-12">
                        {displayedProjects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-2xl p-8 shadow-lg border-2 border-slate-400 dark:border-slate-600 relative overflow-hidden"
                            >
                                {/* Decorative background element */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100 dark:bg-amber-500/30 rounded-full blur-3xl opacity-20 -mr-32 -mt-32 pointer-events-none"></div>

                                <div className="grid lg:grid-cols-3 gap-8">
                                    {/* Header Info */}
                                    <div className="lg:col-span-1 space-y-4">
                                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{project.name}</h3>

                                        <div className="space-y-3 pt-2">
                                            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                                <Calendar size={18} className="text-amber-600" />
                                                <span className="text-sm font-medium">{project.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                                <Users size={18} className="text-amber-600" />
                                                <span className="text-sm font-medium">Team Size: {project.teamSize}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                                <Briefcase size={18} className="text-amber-600" />
                                                <span className="text-sm font-medium">{project.position}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="lg:col-span-2 space-y-6">
                                        <div>
                                            <h4 className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold mb-2">{language === 'vi' ? 'Mô tả' : 'Description'}</h4>
                                            <p className="text-slate-700 dark:text-slate-200 leading-relaxed">{t(project.description, language)}</p>
                                        </div>

                                        <div>
                                            <h4 className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold mb-3">{language === 'vi' ? 'Trách nhiệm chính' : 'Key Responsibilities'}</h4>
                                            <ul className="space-y-2">
                                                {(t(project.responsibilities, language) || []).map((resp, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-200">
                                                        <CheckCircle size={16} className="text-amber-500 mt-1 flex-shrink-0" />
                                                        <span className="text-sm leading-relaxed">{resp}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold mb-3 flex items-center gap-2">
                                                <Code size={16} /> {language === 'vi' ? 'Công nghệ' : 'Technologies'}
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.map(tech => (
                                                    <span
                                                        key={tech}
                                                        className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-100 rounded-lg text-xs font-semibold shadow-sm"
                                                    >
                                                        <span aria-hidden>{getTechIcon(tech)}</span>
                                                        <span>{tech}</span>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default CompanyProjects;