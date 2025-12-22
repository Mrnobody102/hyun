import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Layers, Zap, Globe, Server, Cloud } from 'lucide-react';

const Skills = () => {
    const skillCategories = [
        {
            title: 'Programming Languages',
            icon: Code2,
            color: 'from-amber-500 to-yellow-500',
            skills: ['Java', 'JavaScript', 'TypeScript', 'HTML/CSS']
        },
        {
            title: 'Frameworks',
            icon: Layers,
            color: 'from-slate-600 to-slate-800',
            skills: ['Spring Boot', 'Java OSGi', 'ReactJS', 'NextJS', 'Angular']
        },
        {
            title: 'Database',
            icon: Database,
            color: 'from-yellow-500 to-amber-600',
            skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'MSSQL']
        },
        {
            title: 'Cloud Services',
            icon: Cloud,
            color: 'from-amber-400 to-yellow-400',
            skills: ['AWS Services']
        },
        {
            title: 'Tools & DevOps',
            icon: Zap,
            color: 'from-slate-500 to-amber-500',
            skills: ['Git', 'Docker', 'Jenkins', 'Kubernetes', 'SVN']
        },
        {
            title: 'API & OS',
            icon: Server,
            color: 'from-yellow-600 to-amber-700',
            skills: ['RESTful', 'GraphQL', 'Linux (Ubuntu/Rocky)', 'Windows']
        }
    ];

    return (
        <section id="skills" className="py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
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
                            Skills & Expertise
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto rounded-full"></div>
                    <p className="text-slate-600 dark:text-slate-300 mt-4 max-w-2xl mx-auto">
                        A comprehensive toolkit for building modern, scalable applications
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-slate-100 dark:border-slate-700"
                        >
                            <div className={`inline-flex p-4 bg-gradient-to-r ${category.color} rounded-lg mb-4`}>
                                <category.icon className="text-white" size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">{category.title}</h3>
                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill, skillIndex) => (
                                    <motion.span
                                        key={skill}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: index * 0.1 + skillIndex * 0.05 }}
                                        whileHover={{ scale: 1.1 }}
                                        className="px-3 py-1.5 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-slate-700 dark:to-slate-600 text-amber-700 dark:text-amber-200 rounded-full text-sm font-medium hover:from-amber-100 hover:to-yellow-100 dark:hover:from-slate-600 dark:hover:to-slate-500 transition-all cursor-default"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;