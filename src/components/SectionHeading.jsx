import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

/**
 * Unified section header: mono kicker between hairlines,
 * solid-ink display title, muted subtitle.
 */
const SectionHeading = ({ kicker, title, subtitle, className = '' }) => (
    <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className={`text-center mb-12 ${className}`}
    >
        {kicker && (
            <span className="inline-flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-600 dark:text-amber-400">
                <span aria-hidden className="h-px w-8 bg-gradient-to-r from-transparent to-amber-500/70" />
                {kicker}
                <span aria-hidden className="h-px w-8 bg-gradient-to-l from-transparent to-amber-500/70" />
            </span>
        )}
        <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white text-balance">
            {title}
        </h2>
        {subtitle && (
            <p className="mt-5 max-w-2xl mx-auto text-slate-600 dark:text-slate-400 leading-relaxed">
                {subtitle}
            </p>
        )}
    </motion.div>
);

export default SectionHeading;
