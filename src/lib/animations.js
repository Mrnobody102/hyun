// Shared easing: a long ease-out curve that feels weighted, not floaty.
const easeOutQuint = [0.22, 1, 0.36, 1];

export const fadeInUp = {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOutQuint } },
    exit: { opacity: 0, y: 16, transition: { duration: 0.35, ease: 'easeIn' } }
};

export const staggerContainer = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.09,
            delayChildren: 0.08
        }
    }
};

export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6, ease: easeOutQuint } },
    exit: { opacity: 0, transition: { duration: 0.35 } }
};

export const scaleUp = {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.45, ease: easeOutQuint }
};

// NOTE: no `filter` here — a filter on the route wrapper turns it into a
// containing block, which breaks position:fixed for modals rendered inside pages.
export const pageTransition = {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOutQuint } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: 'easeIn' } }
};
