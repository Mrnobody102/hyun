import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Database, ExternalLink, Github, Layers, Smartphone, Zap } from 'lucide-react';
import { personalProjects as personalProjectsData } from '@/data';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import { getTechIcon } from '@/lib/techIcons';
import { t } from '@/lib/utils';
import SafeImage from './SafeImage';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import ProjectDetailModal from './ProjectDetailModal';
import SpotlightCard from './SpotlightCard';
import SectionHeading from './SectionHeading';
import Tilt3D from './Tilt3D';

const icons = [<Zap size={20} key="z" />, <Layers size={20} key="l" />, <Database size={20} key="d" />, <Smartphone size={20} key="s" />];

const Projects = ({ compact = false }) => {
    const { toast } = useToast();
    const { language } = useLanguage();
    const [selectedProject, setSelectedProject] = React.useState(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const personalProjects = useMemo(() => personalProjectsData.map((project, index) => ({
        ...project,
        icon: icons[index % icons.length],
    })), []);

    const displayedProjects = useMemo(() =>
        compact ? personalProjects.slice(0, 2) : personalProjects
    , [compact, personalProjects]);

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleLinkClick = useCallback((e, link) => {
        e.stopPropagation();
        if (!link || link === '#') {
            toast({
                title: language === 'vi' ? 'Link chưa được cấu hình' : 'Link not configured',
                description: language === 'vi' ? 'Hãy cập nhật link dự án trong file dữ liệu.' : 'Update the project URL in the data file.',
                duration: 3000,
            });
            return;
        }

        window.open(link, '_blank', 'noopener,noreferrer');
    }, [language, toast]);

    return (
        <section id="projects" className="pt-32 pb-20 md:pt-36 px-4 overflow-hidden">
            <div className="container mx-auto max-w-6xl">
                <SectionHeading
                    kicker={language === 'vi' ? 'Sản phẩm cá nhân' : 'Side Projects'}
                    title={language === 'vi' ? 'Side Projects nổi bật' : 'Featured Personal Projects'}
                    subtitle={language === 'vi' ? 'Nhấn vào dự án để xem chi tiết, tính năng và video demo' : 'Click on a project to view details, features, and video demos'}
                />

                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: "-50px" }}
                    className={compact ? 'grid md:grid-cols-2 gap-6' : 'grid md:grid-cols-2 gap-8'}
                >
                    {displayedProjects.map((project) => (
                        <motion.div
                            key={project.title}
                            variants={fadeInUp}
                            onClick={() => handleProjectClick(project)}
                            className="group h-full cursor-pointer"
                        >
                            <Tilt3D max={6} scale={1.01} glareOpacity={0.1}>
                                <SpotlightCard className={`flex flex-col h-full ${compact ? 'p-4' : ''}`}>
                                    <div className={`relative overflow-hidden bg-slate-100 dark:bg-slate-800 ${compact ? 'h-44 rounded-xl' : 'h-64'}`}>
                                        <SafeImage
                                            src={project.imageUrl}
                                            alt={project.imageAlt}
                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                        {/* View Detail Overlay */}
                                        <div className="absolute inset-0 bg-slate-950/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 backdrop-blur-[2px]">
                                            <span className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-slate-900 rounded-full font-semibold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-card-hover">
                                                {language === 'vi' ? 'Xem chi tiết' : 'View Details'}
                                            </span>
                                        </div>
                                        <div className="absolute top-4 right-4 bg-white/95 dark:bg-slate-900/85 backdrop-blur-sm p-2.5 rounded-xl text-amber-600 dark:text-amber-400 shadow-card ring-1 ring-slate-900/5 dark:ring-white/10 z-20">
                                            {project.icon}
                                        </div>
                                    </div>

                                    <div className={`${compact ? 'p-4' : 'p-6'} flex-1 flex flex-col z-10`}>
                                        <div className="mb-4">
                                            <h3 className="font-display text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className={`text-slate-600 dark:text-slate-300 text-sm leading-relaxed ${compact ? 'line-clamp-3' : ''}`}>
                                                {t(project.description, language)}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {(compact ? project.tags.slice(0, 6) : project.tags).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-900/[0.03] dark:bg-white/[0.05] text-slate-700 dark:text-slate-200 border border-slate-900/10 dark:border-white/10"
                                                >
                                                    <span aria-hidden className="text-xs">{getTechIcon(tag)}</span>
                                                    <span>{tag}</span>
                                                </span>
                                            ))}
                                        </div>

                                        {!compact && (
                                            <div
                                                className="mt-auto flex gap-3 relative z-30"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {project.githubLink && (
                                                    <motion.button
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleLinkClick(e, project.githubLink);
                                                        }}
                                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 dark:bg-white/10 text-white ring-1 ring-transparent dark:ring-white/15 font-semibold hover:bg-slate-800 dark:hover:bg-white/15 transition-all duration-300 text-sm"
                                                    >
                                                        <Github size={16} />
                                                        {language === 'vi' ? 'Mã nguồn' : 'Code'}
                                                    </motion.button>
                                                )}
                                                {project.liveLink && (
                                                    <motion.button
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleLinkClick(e, project.liveLink);
                                                        }}
                                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold shadow-glow-sm hover:shadow-glow transition-all duration-300 text-sm"
                                                    >
                                                        <ExternalLink size={16} />
                                                        {language === 'vi' ? 'Xem demo' : 'Live Demo'}
                                                    </motion.button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </SpotlightCard>
                            </Tilt3D>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Project Detail Modal */}
            <ProjectDetailModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
};

export default React.memo(Projects);
