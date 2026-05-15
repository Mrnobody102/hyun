import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { certifications } from '@/data';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const Certifications = () => {
    const { language } = useLanguage();

    return (
        <section id="certifications" className="py-20 px-4 bg-white dark:bg-slate-950 overflow-hidden">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            <span className="bg-gradient-to-r from-slate-800 via-amber-600 to-yellow-600 dark:from-amber-300 dark:via-yellow-300 dark:to-amber-200 bg-clip-text text-transparent">
                                {language === 'vi' ? 'Chứng chỉ & Học bổng' : 'Certifications & Scholarships'}
                            </span>
                        </h2>
                    </div>
                    <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto rounded-full" />
                    <p className="text-slate-600 dark:text-slate-300 mt-4 font-medium">
                        {language === 'vi' ? 'Thể hiện năng lực chuyên môn và quá trình học tập liên tục' : 'Proof of skills and continuous learning'}
                    </p>
                </motion.div>

                <motion.div 
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
                >
                    {certifications.map((cert) => (
                        <motion.div
                            key={cert.title}
                            variants={fadeInUp}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-300 relative group"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-4 bg-amber-500 text-white rounded-xl shadow-lg shadow-amber-500/20">
                                    <Award size={28} />
                                </div>
                                {cert.link && (
                                    <motion.a
                                        href={cert.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ rotate: 15, scale: 1.2 }}
                                        className="text-slate-400 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors p-2"
                                        title={language === 'vi' ? 'Xem chứng chỉ' : 'View Certificate'}
                                    >
                                        <ExternalLink size={20} />
                                    </motion.a>
                                )}
                            </div>

                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3 leading-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                {cert.title}
                            </h3>
                            
                            <div className="flex flex-col gap-4 mt-auto">
                                <div>
                                    <p className="text-slate-600 dark:text-slate-300 font-bold text-sm">{cert.issuer}</p>
                                    {cert.code && <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 font-mono uppercase tracking-tighter">ID: {cert.code}</p>}
                                </div>
                                {cert.date && (
                                    <span className="w-fit text-[10px] font-black uppercase tracking-widest bg-amber-500/10 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3 py-1.5 rounded-lg border border-amber-500/20">
                                        {cert.date}
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default memo(Certifications);
