import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase, Heart } from 'lucide-react';

const About = () => {
    const stats = [
        { icon: Calendar, label: 'Born', value: 'February 10, 2001' },
        { icon: MapPin, label: 'Location', value: 'Hanoi, Vietnam' },
        { icon: Briefcase, label: 'Experience', value: '3+ Years' },
        { icon: Heart, label: 'Passion', value: 'Coding' }
    ];

    return (
        <section id="about" className="py-20 px-4 bg-gradient-to-br from-white via-slate-50 to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
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
                            About Me
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
                            Hi! I'm <span className="font-bold text-amber-600 dark:text-amber-300">Phạm Quang Huy</span>, a passionate Full Stack Developer
                            with a love for creating elegant solutions to complex problems. Born on February 10, 2001,
                            I've dedicated myself to mastering the art of web development.
                        </p>
                        <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
                            With expertise in both frontend and backend technologies, I specialize in building
                            responsive, user-friendly applications that make a difference. My approach combines
                            clean code, modern design principles, and a focus on performance.
                        </p>
                        <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
                            When I'm not coding, you'll find me exploring new technologies, contributing to
                            open-source projects, or sharing knowledge with the developer community.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700"
                            >
                                <div className="inline-flex p-3 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg mb-4">
                                    <stat.icon className="text-amber-600" size={24} />
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{stat.label}</p>
                                <p className="text-lg font-bold text-slate-800 dark:text-slate-100">{stat.value}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;