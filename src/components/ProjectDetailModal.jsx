import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, AlertCircle, Play, Image as ImageIcon, Code2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/utils';
import SafeImage from './SafeImage';

const ProjectDetailModal = ({ project, isOpen, onClose }) => {
    const { language } = useLanguage();

    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-5xl max-h-[85vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-white/20 dark:border-slate-800"
                    >
                        {/* Header Area */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 shrink-0 bg-slate-50/50 dark:bg-slate-800/50">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-2xl bg-gradient-to-br ${project.color || 'from-blue-500 to-indigo-500'} text-white shadow-lg`}>
                                    {project.icon || <Code2 size={24} />}
                                </div>
                                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
                                    {project.title}
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 rounded-full transition-all"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content Body */}
                        <div className="flex-1 overflow-y-auto p-5 md:p-10">
                            <div className="flex flex-col md:grid md:grid-cols-3 gap-8 md:gap-10">
                                {/* Left Column: Main Info */}
                                <div className="md:col-span-2 space-y-10 order-2 md:order-1">
                                    {/* Description */}
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                            {language === 'vi' ? 'Tổng quan dự án' : 'Project Overview'}
                                        </h4>
                                        <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                                            {t(project.description, language)}
                                        </p>
                                    </div>

                                    {/* Project Details (Rich Content) */}
                                    <div className="space-y-6">
                                        <h4 className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-100">
                                            <AlertCircle size={20} className="text-amber-500" />
                                            {language === 'vi' ? 'Chi tiết dự án' : 'Project Details'}
                                        </h4>
                                        <div className="space-y-6">
                                            {project.details?.projectDetail?.map((item, i) => (
                                                <div key={i} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                                    {item.type === 'text' ? (
                                                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base">
                                                            {language === 'vi' ? item.vi : item.en}
                                                        </p>
                                                    ) : (
                                                        <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg">
                                                            <SafeImage src={item.url} alt="Project detail screenshot" className="w-full h-auto" />
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="space-y-4">
                                        <h4 className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-100">
                                            <CheckCircle2 size={20} className="text-emerald-500" />
                                            {language === 'vi' ? 'Tính năng nổi bật' : 'Key Features'}
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                            {project.details?.features?.map((f, i) => (
                                                <div key={i} className="flex items-start gap-3 p-3 md:p-4 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                                    <span className="text-xs md:text-sm text-slate-700 dark:text-slate-300 font-semibold">{t(f, language)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Media & Sidebar */}
                                <div className="space-y-8 order-1 md:order-2">
                                    {/* Video / Main Image */}
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                            {language === 'vi' ? 'Minh họa' : 'Preview'}
                                        </h4>
                                        <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-inner">
                                            {project.details?.videoUrl ? (
                                                <iframe
                                                    src={project.details.videoUrl}
                                                    title={project.title}
                                                    className="w-full h-full border-0"
                                                    allowFullScreen
                                                />
                                            ) : (
                                                <SafeImage src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Links (Mobile Optimized) */}
                                    <div className="flex flex-row md:flex-col gap-3">
                                        {project.githubLink && (
                                            <a
                                                href={project.githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 flex items-center justify-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-3.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl font-bold hover:shadow-xl transition-all border border-transparent dark:border-white/10 text-xs md:text-base"
                                            >
                                                <Github size={18} />
                                                <span className="hidden sm:inline">{language === 'vi' ? 'Mã nguồn' : 'Source Code'}</span>
                                                <span className="sm:hidden">{language === 'vi' ? 'Code' : 'Code'}</span>
                                            </a>
                                        )}
                                        {project.liveLink && (
                                            <a
                                                href={project.liveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 flex items-center justify-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-2xl font-bold hover:shadow-xl transition-all text-xs md:text-base"
                                            >
                                                <ExternalLink size={18} />
                                                <span className="hidden sm:inline">{language === 'vi' ? 'Xem Demo' : 'Live Preview'}</span>
                                                <span className="sm:hidden">{language === 'vi' ? 'Demo' : 'Demo'}</span>
                                            </a>
                                        )}
                                    </div>

                                    {/* Technologies */}
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                            {language === 'vi' ? 'Công nghệ' : 'Stack'}
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl text-[10px] md:text-xs font-bold border border-slate-200/50 dark:border-slate-700/50"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProjectDetailModal;
