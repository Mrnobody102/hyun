import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { certifications } from '@/data';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import SectionHeading from './SectionHeading';
import SpotlightCard from './SpotlightCard';

const Certifications = () => {
    const { language } = useLanguage();

    return (
        <section id="certifications" className="py-24 px-4 overflow-hidden">
            <div className="container mx-auto max-w-5xl">
                <SectionHeading
                    kicker={language === 'vi' ? 'Ghi nhận' : 'Recognition'}
                    title={language === 'vi' ? 'Chứng chỉ & Học bổng' : 'Certifications & Scholarships'}
                    subtitle={language === 'vi' ? 'Thể hiện năng lực chuyên môn và quá trình học tập liên tục' : 'Proof of skills and continuous learning'}
                />

                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                    {certifications.map((cert) => (
                        <motion.div
                            key={cert.title}
                            variants={fadeInUp}
                            whileHover={{ y: -7 }}
                            className="group h-full"
                        >
                            <SpotlightCard className="p-6 h-full flex flex-col">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 transition-all duration-300 group-hover:bg-amber-500 group-hover:text-white group-hover:shadow-glow-sm">
                                        <Award size={26} />
                                    </div>
                                    {cert.link && (
                                        <motion.a
                                            href={cert.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ rotate: 12, scale: 1.15 }}
                                            className="text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors p-2"
                                            title={language === 'vi' ? 'Xem chứng chỉ' : 'View Certificate'}
                                        >
                                            <ExternalLink size={19} />
                                        </motion.a>
                                    )}
                                </div>

                                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                    {cert.title}
                                </h3>

                                <div className="flex flex-col gap-3 mt-auto">
                                    <div>
                                        <p className="text-slate-600 dark:text-slate-300 font-semibold text-sm">{cert.issuer}</p>
                                        {cert.code && <p className="font-mono text-[10px] text-slate-500 mt-1 uppercase tracking-wide">ID: {cert.code}</p>}
                                    </div>
                                    {cert.date && (
                                        <span className="w-fit font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/25">
                                            {cert.date}
                                        </span>
                                    )}
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default memo(Certifications);
