import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Building2, Briefcase, Calendar, CheckCircle, Code, Users } from 'lucide-react';
import { getTechIcon } from '@/lib/techIcons';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/utils';
import { companyProjects, ui } from '@/data';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import SpotlightCard from './SpotlightCard';
import SectionHeading from './SectionHeading';

const CompanyProjects = ({ compact = false }) => {
    const { language } = useLanguage();

    const displayedProjects = useMemo(() => {
        const projects = companyProjects;
        return compact ? projects.slice(0, 2) : projects;
    }, [compact]);

    return (
        <section id="company-projects" className="pt-32 pb-20 md:pt-36 px-4 overflow-hidden">
            <div className="container mx-auto max-w-6xl">
                <SectionHeading
                    kicker={language === 'vi' ? 'Kinh nghiệm thực chiến' : 'Professional Work'}
                    title={language === 'vi' ? 'Dự án chính' : 'Main Projects'}
                    subtitle={language === 'vi' ? 'Kinh nghiệm chuyên nghiệp qua các dự án web, phân tích dữ liệu và hệ thống AI thời gian thực.' : 'Professional experience delivering high-impact solutions'}
                />

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
                                    whileHover={{ y: -6 }}
                                    className="group h-full"
                                >
                                    <SpotlightCard className="p-6 h-full flex flex-col">
                                        <div className="flex items-start justify-between gap-3 mb-3">
                                            <div>
                                                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{project.name}</h3>
                                                {project.company && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{project.company}</p>}
                                                {positionLabel && <p className="text-sm text-amber-600 dark:text-amber-300 mt-1 font-medium">{positionLabel}</p>}
                                            </div>
                                            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] px-3 py-1.5 bg-amber-500/10 text-amber-700 dark:text-amber-300 rounded-full border border-amber-500/25 whitespace-nowrap">
                                                {project.duration}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-4 relative z-10">{t(project.description, language)}</p>
                                        <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                                            {project.technologies.slice(0, 6).map((tech) => (
                                                <span key={tech} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-900/[0.03] dark:bg-white/[0.05] text-slate-700 dark:text-slate-200 border border-slate-900/10 dark:border-white/10">
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
                        className="space-y-10"
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
                                    <SpotlightCard className="p-8 md:p-10">
                                        <div className="grid lg:grid-cols-3 gap-8 relative z-10">
                                            <div className="lg:col-span-1 space-y-5">
                                                <h3 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{project.name}</h3>

                                                <div className="space-y-3 pt-1">
                                                    {project.company && (
                                                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                                            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                                                                <Building2 size={17} />
                                                            </div>
                                                            <span className="text-sm font-medium">{project.company}</span>
                                                        </div>
                                                    )}
                                                    {positionLabel && (
                                                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                                            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                                                                <Briefcase size={17} />
                                                            </div>
                                                            <span className="text-sm font-medium">{positionLabel}</span>
                                                        </div>
                                                    )}
                                                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                                        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                                                            <Calendar size={17} />
                                                        </div>
                                                        <span className="text-sm font-medium">{project.duration}</span>
                                                    </div>
                                                    {project.teamSize && (
                                                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                                            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                                                                <Users size={17} />
                                                            </div>
                                                            <span className="text-sm font-medium">{t(ui.teamSize, language)}: {project.teamSize}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="lg:col-span-2 space-y-7 lg:border-l lg:border-slate-900/10 lg:dark:border-white/10 lg:pl-8">
                                                <div>
                                                    <h4 className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400 mb-2.5">{language === 'vi' ? 'Mô tả' : 'Description'}</h4>
                                                    <p className="text-slate-700 dark:text-slate-200 leading-relaxed">{t(project.description, language)}</p>
                                                </div>

                                                {hasResponsibilities && (
                                                    <div>
                                                        <h4 className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400 mb-3">{language === 'vi' ? 'Trách nhiệm chính' : 'Key Responsibilities'}</h4>
                                                        <ul className="space-y-2.5">
                                                            {responsibilities.map((resp, itemIndex) => (
                                                                <li key={itemIndex} className="flex items-start gap-2.5 text-slate-700 dark:text-slate-200">
                                                                    <CheckCircle size={15} className="text-amber-500 mt-1 flex-shrink-0" />
                                                                    <span className="text-sm leading-relaxed">{resp}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                <div>
                                                    <h4 className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-2">
                                                        <Code size={14} /> {language === 'vi' ? 'Công nghệ' : 'Technologies'}
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.technologies.map((tech) => (
                                                            <span
                                                                key={tech}
                                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900/[0.03] dark:bg-white/[0.05] text-slate-700 dark:text-slate-200 border border-slate-900/10 dark:border-white/10 hover:border-amber-500/50 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
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
