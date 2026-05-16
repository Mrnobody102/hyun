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

const palette = ['from-amber-500 to-orange-500', 'from-blue-500 to-indigo-500', 'from-emerald-500 to-teal-500', 'from-purple-500 to-pink-500'];
const icons = [<Zap size={20} key="z" />, <Layers size={20} key="l" />, <Database size={20} key="d" />, <Smartphone size={20} key="s" />];

const Projects = ({ compact = false }) => {
    const { toast } = useToast();
    const { language } = useLanguage();
    const [selectedProject, setSelectedProject] = React.useState(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const personalProjects = useMemo(() => personalProjectsData.map((project, index) => ({
        ...project,
        color: palette[index % palette.length],
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
        <section id="projects" className="pt-32 pb-20 md:pt-36 px-4 bg-gradient-to-br from-white via-amber-50 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 overflow-hidden">
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
                                {language === 'vi' ? 'Dự án cá nhân nổi bật' : 'Featured Personal Projects'}
                            </span>
                        </h2>
                    </div>
                    <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto rounded-full" />
                    <p className="text-slate-600 dark:text-slate-300 mt-4 max-w-2xl mx-auto">
                        {language === 'vi' ? 'Nhấn vào dự án để xem chi tiết, tính năng và video demo' : 'Click on a project to view details, features, and video demos'}
                    </p>
                </motion.div>

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
                            whileHover={{ y: -5 }}
                            onClick={() => handleProjectClick(project)}
                            className={`bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700 group flex flex-col h-full cursor-pointer relative ${compact ? 'p-4' : ''}`}
                        >
                            <div className={`relative overflow-hidden bg-slate-100 ${compact ? 'h-44' : 'h-64'}`}>
                                <SafeImage 
                                    src={project.imageUrl} 
                                    alt={project.imageAlt} 
                                    className="w-full h-full"
                                />
                                {/* View Detail Overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 backdrop-blur-sm">
                                    <span className="px-6 py-2.5 bg-white text-slate-900 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        {language === 'vi' ? 'Xem chi tiết' : 'View Details'}
                                    </span>
                                </div>
                                <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                                <div className="absolute top-4 right-4 bg-white/95 dark:bg-slate-900/80 backdrop-blur-sm p-2 rounded-full text-slate-700 dark:text-slate-100 shadow-md z-20">
                                    {project.icon}
                                </div>
                            </div>

                            <div className={`${compact ? 'p-4' : 'p-6'} flex-1 flex flex-col`}>
                                <div className="mb-4">
                                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className={`text-slate-600 dark:text-slate-200 text-sm leading-relaxed ${compact ? 'line-clamp-3' : ''}`}>
                                        {t(project.description, language)}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {(compact ? project.tags.slice(0, 6) : project.tags).map((tag) => (
                                        <span
                                            key={tag}
                                            className="flex items-center gap-2 px-2.5 py-1 bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-200 rounded-md text-[10px] font-bold uppercase tracking-wider border border-slate-200 dark:border-slate-600"
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
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 dark:bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-700 dark:hover:bg-slate-600 transition-all duration-300 text-sm"
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
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg font-medium hover:shadow-lg hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 text-sm"
                                            >
                                                <ExternalLink size={16} />
                                                {language === 'vi' ? 'Xem demo' : 'Live Demo'}
                                            </motion.button>
                                        )}
                                    </div>
                                )}
                            </div>
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

