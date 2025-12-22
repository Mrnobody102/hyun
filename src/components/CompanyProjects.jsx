import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Briefcase, Code, CheckCircle } from 'lucide-react';

const CompanyProjects = () => {
    const projects = [
        {
            name: 'Internal Management System',
            duration: '01/2023 - 11/2023',
            teamSize: 10,
            position: 'Fullstack Developer',
            description: 'Korean client internal management system featuring comprehensive user, language, settings, zone, and time management capabilities.',
            responsibilities: [
                'Developed React components and designed RESTful APIs.',
                'Implemented OAuth2/JWT authentication for secure access.',
                'Integrated caching, mail services, and file compression features.'
            ],
            technologies: ['Spring Boot', 'PostgreSQL', 'MongoDB', 'Redis', 'JavaScript', 'TypeScript', 'ReactJS', 'Jenkins', 'Docker', 'Git', 'ActiveMQ']
        },
        {
            name: 'Device-Web Server Bridge',
            duration: '11/2023 - 08/2024',
            teamSize: 4,
            position: 'Developer',
            description: 'A critical bridge system connecting timekeeping devices with the web server, ensuring seamless data synchronization and device management.',
            responsibilities: [
                'Designed project structure and handled network configuration.',
                'Implemented facial recognition module and C++ interface via JNA.',
                'Managed Ubuntu setup, user management, data sync, and error analysis.'
            ],
            technologies: ['Java OSGi', 'MySQL', 'ActiveMQ', 'Linux', 'Docker', 'SVN', 'AWS', 'C++']
        },
        {
            name: 'Employee Management & Timekeeping Server',
            duration: '08/2024 - 04/2025',
            teamSize: 7,
            position: 'Full Stack Developer',
            description: 'Web server component for the timekeeping system, managing employee authentication, working time, holidays, and connected devices.',
            responsibilities: [
                'Developed and integrated facial recognition module and error detection systems.',
                'Modified and optimized core business logic.',
                'Performed Angular framework upgrades and maintenance.'
            ],
            technologies: ['Spring Boot', 'PostgreSQL', 'MongoDB', 'Redis', 'JavaScript', 'TypeScript', 'Angular', 'Git', 'Jenkins', 'ActiveMQ']
        },
        {
            name: 'Document Management System',
            duration: '04/2025 - 11/2025',
            teamSize: 7,
            position: 'Frontend Developer',
            description: 'Enterprise document management system facilitating efficient search, file management, uploading, and downloading of company documents.',
            responsibilities: [
                'Provided critical feedback on UI design and user experience.',
                'Coded and optimized ReactJS components for the interface.',
                'Implemented Excel file processing and optimization features.'
            ],
            technologies: ['Spring Boot', 'PostgreSQL', 'MongoDB', 'Redis', 'JavaScript', 'TypeScript', 'ReactJS', 'Jenkins', 'Docker', 'Git', 'Elasticsearch']
        },
        {
            name: 'Building Access Control System',
            duration: '04/2025 - 11/2025',
            teamSize: 7,
            position: 'Full Stack Developer',
            description: 'Comprehensive building access control system managing entry permissions for people, objects, and vehicles.',
            responsibilities: [
                'Developed the vehicle access control interface and screens.',
                'Created technical documentation in English.',
                'Modified business logic and UI components; performed rigorous bug testing.'
            ],
            technologies: ['Spring Boot', 'PostgreSQL', 'MongoDB', 'Redis', 'JavaScript', 'TypeScript', 'ReactJS', 'Jenkins', 'Docker', 'Git']
        }
    ];

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
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-slate-800 via-amber-600 to-yellow-600 dark:from-amber-300 dark:via-yellow-300 dark:to-amber-200 bg-clip-text text-transparent">
                            Company Projects
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto rounded-full"></div>
                    <p className="text-slate-600 dark:text-slate-300 mt-4 max-w-2xl mx-auto">
                        Professional experience delivering high-impact solutions
                    </p>
                </motion.div>

                <div className="space-y-12">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-2xl p-8 shadow-lg border border-slate-100 dark:border-slate-700 relative overflow-hidden"
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
                                        <h4 className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold mb-2">Description</h4>
                                        <p className="text-slate-700 dark:text-slate-200 leading-relaxed">{project.description}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold mb-3">Key Responsibilities</h4>
                                        <ul className="space-y-2">
                                            {project.responsibilities.map((resp, i) => (
                                                <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-200">
                                                    <CheckCircle size={16} className="text-amber-500 mt-1 flex-shrink-0" />
                                                    <span className="text-sm leading-relaxed">{resp}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold mb-3 flex items-center gap-2">
                                            <Code size={16} /> Technologies
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map(tech => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-100 rounded-lg text-xs font-semibold shadow-sm"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CompanyProjects;