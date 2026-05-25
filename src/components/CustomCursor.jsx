import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Direct motion values for 60/120fps tracking without React re-renders
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Spring configuration for the trailing aura
    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const updateMousePosition = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            const isClickable = 
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-pointer');
            
            setIsHovered(!!isClickable);
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [isMobile, cursorX, cursorY]);

    if (isMobile) return null;

    return (
        <>
            {/* Tiny dot (instant tracking) */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-amber-500 rounded-full pointer-events-none z-[100000] mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    opacity: isHovered ? 0 : 1,
                    scale: isHovered ? 0 : 1
                }}
                transition={{ duration: 0.2 }}
            />
            
            {/* Aura ring (spring tracking) */}
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999] border-[1.5px] border-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.4)]"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    width: isHovered ? 56 : 32,
                    height: isHovered ? 56 : 32,
                    backgroundColor: isHovered ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                    scale: isHovered ? 1.1 : 1,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            />
        </>
    );
};

export default CustomCursor;
