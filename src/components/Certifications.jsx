import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ShareSectionButton from './ShareSectionButton';

const Certifications = () => {
    const { language } = useLanguage();
    const certifications = [
        {
            title: 'OCP Java SE 17 Developer',
            issuer: 'Oracle',
            code: '1Z0-829',
            date: '10/2025',
            link: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=6A1439665DEE5D9CD26E3D91EC8EE76427DD9A8533DE42D411750B087B48C344'
        },
        {
            title: 'TOPIK II - Level 4',
            issuer: 'NIIED',
            code: 'Korean Proficiency',
            date: '08/2024',
            link: null // No link needed
        }
    ];

    return (
        <section id="certifications" className="py-20 px-4 bg-white dark:bg-slate-950">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            <span className="bg-gradient-to-r from-slate-800 via-amber-600 to-yellow-600 dark:from-amber-300 dark:via-yellow-300 dark:to-amber-200 bg-clip-text text-transparent">
                                {language === 'vi' ? 'Chứng chỉ' : 'Certifications'}
                            </span>
                        </h2>
                        <ShareSectionButton
                            sectionName={language === 'vi' ? 'Chứng chỉ' : 'Certifications'}
                            sectionPath="/certifications"
                        />
                    </div>
                    <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto rounded-full"></div>
                    <p className="text-slate-600 dark:text-slate-300 mt-4">{language === 'vi' ? 'Chứng minh kỹ năng và học tập liên tục' : 'Proof of skills and continuous learning'}</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={cert.title}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 p-6 rounded-xl border-2 border-slate-400 dark:border-slate-600 shadow-lg hover:shadow-xl transition-all duration-300 relative group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-amber-100 dark:bg-amber-500/20 rounded-lg text-amber-600 dark:text-amber-200">
                                    <Award size={28} />
                                </div>
                                {cert.link && (
                                    <a
                                        href={cert.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-400 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
                                        title={language === 'vi' ? 'Xem chứng chỉ' : 'View Certificate'}
                                    >
                                        <ExternalLink size={20} />
                                    </a>
                                )}
                            </div>

                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{cert.title}</h3>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-slate-600 dark:text-slate-300 font-medium">{cert.issuer}</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Code: {cert.code}</p>
                                </div>
                                <span className="text-sm font-semibold bg-amber-50 dark:bg-slate-800 text-amber-700 dark:text-amber-200 px-3 py-1 rounded-full border border-amber-100 dark:border-slate-700">
                                    {cert.date}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;