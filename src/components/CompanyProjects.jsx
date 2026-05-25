import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Building2, Briefcase, Calendar, CheckCircle, Code, Users } from 'lucide-react';
import { getTechIcon } from '@/lib/techIcons';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/utils';
import { companyProjects, ui } from '@/data';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import SpotlightCard from './SpotlightCard';

const CompanyProjects = ({ compact = false }) => {
    const { language } = useLanguage();
    
    const displayedProjects = useMemo(() => {
        const projects = companyProjects;
        return compact ? projects.slice(0, 2) : projects;
    }, [compact]);

    return (
        <section id="company-projects" className="pt-32 pb-20 md:pt-36 px-4 bg-white dark:bg-slate-950 overflow-hidden">
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
                                {language === 'vi' ? 'Dự án chính' : 'Main Projects'}
                            </span>
                        </h2>
                    </div>
                    <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto rounded-full" />
                    <p className="text-slate-600 dark:text-slate-300 mt-4 max-w-2xl mx-auto">
                        {language === 'vi' ? 'Kinh nghiệm chuyên nghiệp qua các dự án web, phân tích dữ liệu và hệ thống AI thời gian thực.' : 'Professional experience delivering high-impact solutions'}
                    </p>
                </motion.div>

                {compact ? (
                    <motion.div 
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 gap-6"
                    >
                        {displayedProjects.map((project) => {
                            const positionLabel = t(project.position, language);

                            return (
                                <motion.div
                                    key={`${project.name}-${project.duration}`}
                                    variants={fadeInUp}
                                    whileHover={{ y: -6, scale: 1.01 }}
                                    className="group h-full"
                                >
                                    <SpotlightCard className="p-6 h-full flex flex-col bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 border-2 border-slate-400 dark:border-slate-600">
                                        <div className="flex items-start justify-between gap-3 mb-3">
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{project.name}</h3>
                                                {project.company && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{project.company}</p>}
                                                {positionLabel && <p className="text-sm text-amber-600 dark:text-amber-300 mt-1 font-medium">{positionLabel}</p>}
                                            </div>
                                            <span className="text-xs font-semibold px-3 py-1 bg-amber-50 dark:bg-slate-800 text-amber-700 dark:text-amber-200 rounded-full border border-amber-100 dark:border-slate-700 whitespace-nowrap">
                                                {project.duration}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed mb-4 line-clamp-4 relative z-10">{t(project.description, language)}</p>
                                        <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                                            {project.technologies.slice(0, 6).map((tech) => (
                                                <span key={tech} className="flex items-center gap-2 px-2.5 py-1 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-100 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm">
                                                    <span aria-hidden className="text-xs">{getTechIcon(tech)}</span>
                                                    <span>{tech}</span>
                                                </span>
                                            ))}
                                        </div>
                                    </SpotlightCard>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                ) : (
                    <motion.div 
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, margin: '-50px' }}
                        className="space-y-12"
                    >
                        {displayedProjects.map((project) => {
                            const positionLabel = t(project.position, language);
                            const responsibilities = t(project.responsibilities, language);
                            const hasResponsibilities = Array.isArray(responsibilities) && responsibilities.length > 0;

                            return (
                                <motion.div
                                    key={`${project.name}-${project.duration}`}
                                    variants={fadeInUp}
                                >
                                    <SpotlightCard className="p-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 border-2 border-slate-400 dark:border-slate-600 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100 dark:bg-amber-500/30 rounded-full blur-3xl opacity-20 -mr-32 -mt-32 pointer-events-none" />

                                        <div className="grid lg:grid-cols-3 gap-8 relative z-10">
                                            <div className="lg:col-span-1 space-y-4">
                                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{project.name}</h3>

                                                <div className="space-y-3 pt-2">
                                                    {project.company && (
                                                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                                            <div className="p-2 bg-amber-50 dark:bg-amber-500/10 rounded-lg">
                                                                <Building2 size={18} className="text-amber-600" />
                                                            </div>
                                                            <span className="text-sm font-medium">{project.company}</span>
                                                        </div>
                                                    )}
                                                    {positionLabel && (
                                                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                                            <div className="p-2 bg-amber-50 dark:bg-amber-500/10 rounded-lg">
                                                                <Briefcase size={18} className="text-amber-600" />
                                                            </div>
                                                            <span className="text-sm font-medium">{positionLabel}</span>
                                                        </div>
                                                    )}
                                                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                                        <div className="p-2 bg-amber-50 dark:bg-amber-500/10 rounded-lg">
                                                            <Calendar size={18} className="text-amber-600" />
                                                        </div>
                                                        <span className="text-sm font-medium">{project.duration}</span>
                                                    </div>
                                                    {project.teamSize && (
                                                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                                            <div className="p-2 bg-amber-50 dark:bg-amber-500/10 rounded-lg">
                                                                <Users size={18} className="text-amber-600" />
                                                            </div>
                                                            <span className="text-sm font-medium">{t(ui.teamSize, language)}: {project.teamSize}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="lg:col-span-2 space-y-6">
                                                <div>
                                                    <h4 className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold mb-2">{language === 'vi' ? 'Mô tả' : 'Description'}</h4>
                                                    <p className="text-slate-700 dark:text-slate-200 leading-relaxed">{t(project.description, language)}</p>
                                                </div>

                                                {hasResponsibilities && (
                                                    <div>
                                                        <h4 className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold mb-3">{language === 'vi' ? 'Trách nhiệm chính' : 'Key Responsibilities'}</h4>
                                                        <ul className="space-y-2">
                                                            {responsibilities.map((resp, itemIndex) => (
                                                                <li key={itemIndex} className="flex items-start gap-2 text-slate-700 dark:text-slate-200">
                                                                    <CheckCircle size={16} className="text-amber-500 mt-1 flex-shrink-0" />
                                                                    <span className="text-sm leading-relaxed">{resp}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                <div>
                                                    <h4 className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold mb-3 flex items-center gap-2">
                                                        <Code size={16} className="text-amber-500" /> {language === 'vi' ? 'Công nghệ' : 'Technologies'}
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.technologies.map((tech) => (
                                                            <span
                                                                key={tech}
                                                                className="flex items-center gap-2 px-3 py-1 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-100 rounded-lg text-xs font-semibold shadow-sm hover:border-amber-500 transition-colors backdrop-blur-sm"
                                                            >
                                                                <span aria-hidden>{getTechIcon(tech)}</span>
                                                                <span>{tech}</span>
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default React.memo(CompanyProjects);

