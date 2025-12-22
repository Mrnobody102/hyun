import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Layers, Zap, Database, Smartphone } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { getTechIcon } from '@/lib/techIcons';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/utils';
import { personalProjects as personalProjectsData } from '@/data/portfolioData';

const Projects = ({ compact = false }) => {
    const { toast } = useToast();
    const { language } = useLanguage();

    const personalProjects = personalProjectsData.map((p, idx) => ({
        title: p.title,
        description: p.description,
        image: <img alt={p.imageAlt} src={p.imageUrl} />,
        tags: p.tags,
        color: ['from-amber-500 to-orange-500', 'from-blue-500 to-indigo-500', 'from-emerald-500 to-teal-500', 'from-purple-500 to-pink-500'][idx],
        githubLink: p.githubLink,
        liveLink: p.liveLink,
        icon: [<Zap size={20} key="z" />, <Layers size={20} key="l" />, <Database size={20} key="d" />, <Smartphone size={20} key="s" />][idx]
    }));

    const handleLinkClick = (link) => {
        if (!link || link === '#') {
            toast({
                title: "🚧 Link placeholder",
                description: "This is a demo project link.",
                duration: 3000,
            });
        } else {
            window.open(link, '_blank');
        }
    };

    const displayedProjects = compact ? personalProjects.slice(0, 2) : personalProjects;

    return (
        <section id="projects" className="py-20 px-4 bg-gradient-to-br from-white via-amber-50 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
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
                                {language === 'vi' ? 'Dự án cá nhân nổi bật' : 'Featured Personal Projects'}
                            </span>
                        </h2>
                    </div>
                    <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto rounded-full"></div>
                    <p className="text-slate-600 dark:text-slate-300 mt-4 max-w-2xl mx-auto">
                        {language === 'vi' ? 'Giới thiệu giải pháp sáng tạo và chuyên môn kỹ thuật' : 'Showcasing innovative solutions and technical expertise'}
                    </p>
                </motion.div>

                <div className={compact ? "grid md:grid-cols-2 gap-6" : "grid md:grid-cols-2 lg:grid-cols-2 gap-8"}>
                    {displayedProjects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className={`bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700 group flex flex-col h-full ${compact ? "p-4" : ""}`}
                        >
                            <div className={`relative overflow-hidden bg-slate-100 ${compact ? "h-44" : "h-64"}`}>
                                {project.image}
                                <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                                {/* Icon Badge */}
                                <div className="absolute top-4 right-4 bg-white/95 dark:bg-slate-900/80 backdrop-blur-sm p-2 rounded-full text-slate-700 dark:text-slate-100 shadow-md">
                                    {project.icon}
                                </div>
                            </div>

                            <div className={`${compact ? "p-4" : "p-6"} flex-1 flex flex-col`}>
                                <div className="mb-4">
                                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className={`text-slate-600 dark:text-slate-200 text-sm leading-relaxed ${compact ? "line-clamp-3" : ""}`}>
                                        {t(project.description, language)}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {(compact ? project.tags.slice(0, 6) : project.tags).map((tag) => (
                                        <span
                                            key={tag}
                                            className="flex items-center gap-2 px-2.5 py-1 bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-200 rounded-md text-xs font-semibold border border-slate-200 dark:border-slate-600"
                                        >
                                            <span aria-hidden>{getTechIcon(tag)}</span>
                                            <span>{tag}</span>
                                        </span>
                                    ))}
                                </div>

                                {!compact && (
                                    <div className="mt-auto flex gap-3">
                                        {project.githubLink && (
                                            <button
                                                onClick={() => handleLinkClick(project.githubLink)}
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 dark:bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-700 dark:hover:bg-slate-600 transition-all duration-300 text-sm"
                                            >
                                                <Github size={16} />
                                                {language === 'vi' ? 'Mã nguồn' : 'Code'}
                                            </button>
                                        )}
                                        {project.liveLink && (
                                            <button
                                                onClick={() => handleLinkClick(project.liveLink)}
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg font-medium hover:shadow-lg hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 text-sm"
                                            >
                                                <ExternalLink size={16} />
                                                {language === 'vi' ? 'Xem demo' : 'Live Demo'}
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;