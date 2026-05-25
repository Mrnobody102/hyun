import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detect touch device
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
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        
        // Add cursor-none to body to hide default cursor
        document.body.classList.add('cursor-none');

        window.addEventListener('mousemove', updateMousePosition);

        const handleMouseOver = (e) => {
            // Check if hovering over a clickable element
            const target = e.target;
            const isClickable = 
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-pointer');
            
            setIsHovered(!!isClickable);
        };

        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
            document.body.classList.remove('cursor-none');
        };
    }, [isMobile]);

    if (isMobile) return null;

    const variants = {
        default: {
            x: mousePosition.x - 8,
            y: mousePosition.y - 8,
            scale: 1,
            backgroundColor: 'rgba(217, 119, 6, 1)', // Amber-600 equivalent
            mixBlendMode: 'normal'
        },
        hover: {
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            scale: 3,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            mixBlendMode: 'difference' // Inverts colors underneath
        }
    };

    return (
        <motion.div
            className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[99999]"
            variants={variants}
            animate={isHovered ? 'hover' : 'default'}
            transition={{
                type: 'spring',
                stiffness: 400,
                damping: 28,
                mass: 0.5
            }}
        />
    );
};

export default CustomCursor;
