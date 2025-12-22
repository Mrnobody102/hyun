import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Layers, Zap, Database, Smartphone } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Projects = () => {
    const { toast } = useToast();

    const personalProjects = [
        {
            title: 'goDaz shop',
            description: 'A high-performance e-commerce platform built with a microservices architecture. Features comprehensive product management, secure transactions, and real-time search capabilities.',
            image: <img alt="Modern e-commerce dashboard interface" src="https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b" />,
            tags: ['NextJS', 'Spring Boot', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Kafka', 'Elasticsearch', 'AWS', 'Docker'],
            color: 'from-amber-500 to-orange-500',
            githubLink: '',
            liveLink: 'https://godaz.shop/',
            icon: <Zap size={20} />
        },
        {
            title: 'ZenG Sell Omnichannel Lite',
            description: 'An AI-powered omnichannel sales solution integrating inventory management, intelligent analytics, and real-time synchronization across multiple platforms.',
            image: <img alt="Omnichannel sales analytics dashboard" src="https://images.unsplash.com/photo-1686061594225-3e92c0cd51b0" />,
            tags: ['Spring Boot', 'ReactJS', 'OpenAI', 'Kafka', 'Websocket', 'Kubernetes', 'AWS', 'Docker', 'PostgreSQL'],
            color: 'from-blue-500 to-indigo-500',
            githubLink: 'https://github.com/Mrnobody102/zeng',
            liveLink: 'https://zengsell.com',
            icon: <Layers size={20} />
        },
        {
            title: 'FPT University E-resources',
            description: 'A centralized digital resource management system for university materials, optimized for fast search, secure storage, and efficient content delivery.',
            image: <img alt="Digital library search interface" src="https://images.unsplash.com/photo-1701783645499-ff34730f6f91" />,
            tags: ['Spring Boot', 'MongoDB', 'Elasticsearch', 'Thymeleaf', 'AWS S3', 'Heroku', 'JavaScript'],
            color: 'from-emerald-500 to-teal-500',
            githubLink: 'https://github.com/Mrnobody102/FU_E-resources',
            liveLink: '',
            icon: <Database size={20} />
        },
        {
            title: 'Snapify AI',
            description: 'A smart mobile application leveraging on-device machine learning for real-time image recognition, processing, and intelligent analysis.',
            image: <img alt="AI mobile app interface scanning objects" src="https://images.unsplash.com/photo-1675408944119-00e5e33aeb6a" />,
            tags: ['Kotlin', 'Flutter', 'Dart', 'TensorFlow Lite', 'OpenCV', 'Google ML Kit', 'SQLite'],
            color: 'from-purple-500 to-pink-500',
            githubLink: 'https://github.com/Mrnobody102/snapify',
            liveLink: '',
            icon: <Smartphone size={20} />
        }
    ];

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
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-slate-800 via-amber-600 to-yellow-600 dark:from-amber-300 dark:via-yellow-300 dark:to-amber-200 bg-clip-text text-transparent">
                            Featured Personal Projects
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto rounded-full"></div>
                    <p className="text-slate-600 dark:text-slate-300 mt-4 max-w-2xl mx-auto">
                        Showcasing innovative solutions and technical expertise
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {personalProjects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700 group flex flex-col h-full"
                        >
                            <div className="relative h-64 overflow-hidden bg-slate-100">
                                {project.image}
                                <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                                {/* Icon Badge */}
                                <div className="absolute top-4 right-4 bg-white/95 dark:bg-slate-900/80 backdrop-blur-sm p-2 rounded-full text-slate-700 dark:text-slate-100 shadow-md">
                                    {project.icon}
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <div className="mb-4">
                                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-200 text-sm leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2.5 py-1 bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-200 rounded-md text-xs font-semibold border border-slate-200 dark:border-slate-600"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto flex gap-3">
                                    {project.githubLink && (
                                        <button
                                            onClick={() => handleLinkClick(project.githubLink)}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition-all duration-300 text-sm"
                                        >
                                            <Github size={16} />
                                            Code
                                        </button>
                                    )}
                                    {project.liveLink && (
                                        <button
                                            onClick={() => handleLinkClick(project.liveLink)}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg font-medium hover:shadow-lg hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 text-sm"
                                        >
                                            <ExternalLink size={16} />
                                            Live Demo
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;