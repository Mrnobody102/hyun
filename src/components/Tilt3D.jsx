import React, { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

/**
 * Mouse-tracking 3D tilt with a moving light glare.
 * Children can opt into extra depth with `style={{ transform: 'translateZ(...)' }}`
 * because the inner card preserves 3d.
 */
const Tilt3D = ({
    children,
    className = '',
    max = 10,
    scale = 1.015,
    glare = true,
    glareOpacity = 0.16,
    disabled = false,
}) => {
    const ref = useRef(null);
    const px = useMotionValue(0.5);
    const py = useMotionValue(0.5);

    const spring = { stiffness: 160, damping: 20, mass: 0.6 };
    const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
    const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);

    const glareX = useTransform(px, [0, 1], ['20%', '80%']);
    const glareY = useTransform(py, [0, 1], ['20%', '80%']);
    const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgb(255 255 255 / ${glareOpacity}), transparent 55%)`;

    const handleMouseMove = useCallback((e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        px.set((e.clientX - rect.left) / rect.width);
        py.set((e.clientY - rect.top) / rect.height);
    }, [px, py]);

    const handleMouseLeave = useCallback(() => {
        px.set(0.5);
        py.set(0.5);
    }, [px, py]);

    if (disabled) {
        return <div className={className}>{children}</div>;
    }

    return (
        <div className="perspective-1000 h-full group/tilt" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <motion.div
                ref={ref}
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                whileHover={{ scale }}
                transition={{ type: 'spring', ...spring }}
                className={`relative h-full ${className}`}
            >
                {children}
                {glare && (
                    <motion.div
                        aria-hidden
                        style={{ background: glareBackground, transform: 'translateZ(1px)' }}
                        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
                    />
                )}
            </motion.div>
        </div>
    );
};

export default Tilt3D;
