import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
const Hero = () => {
    const scrollToAbout = () => {
        const element = document.querySelector('#about');
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth'
            });
        }
    };
    return <section id="hero" className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
            <motion.div animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
            }} transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
            }} className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-amber-200/20 to-yellow-200/20 dark:from-amber-500/10 dark:to-yellow-500/10 rounded-full blur-3xl" />
            <motion.div animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0]
            }} transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
            }} className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-slate-200/20 to-amber-100/20 dark:from-slate-800/30 dark:to-amber-600/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div initial={{
                    opacity: 0,
                    x: -50
                }} animate={{
                    opacity: 1,
                    x: 0
                }} transition={{
                    duration: 0.8
                }} className="space-y-6">
                    <motion.div initial={{
                        opacity: 0,
                        y: 20
                    }} animate={{
                        opacity: 1,
                        y: 0
                    }} transition={{
                        delay: 0.2,
                        duration: 0.8
                    }}>
                        <span className="inline-block px-4 py-2 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 rounded-full text-sm font-semibold mb-4">Hi, I am Hyun!</span>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 dark:from-amber-200 dark:via-yellow-200 dark:to-amber-300 bg-clip-text text-transparent">
                                Phạm Quang Huy
                            </span>
                        </h1>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 dark:from-amber-300 dark:via-yellow-300 dark:to-amber-200 bg-clip-text text-transparent">
                            Full Stack Developer
                        </h2>
                    </motion.div>

                    <motion.p initial={{
                        opacity: 0,
                        y: 20
                    }} animate={{
                        opacity: 1,
                        y: 0
                    }} transition={{
                        delay: 0.4,
                        duration: 0.8
                    }} className="text-lg text-slate-600 dark:text-slate-200 leading-relaxed">
                        Crafting innovative digital solutions with modern technologies.
                        Passionate about creating seamless user experiences and scalable applications.
                    </motion.p>

                    <motion.div initial={{
                        opacity: 0,
                        y: 20
                    }} animate={{
                        opacity: 1,
                        y: 0
                    }} transition={{
                        delay: 0.6,
                        duration: 0.8
                    }} className="flex gap-4">
                        <button onClick={() => document.querySelector('#contact').scrollIntoView({
                            behavior: 'smooth'
                        })} className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
                            Get In Touch
                        </button>
                        <button onClick={() => document.querySelector('#projects').scrollIntoView({
                            behavior: 'smooth'
                        })} className="px-8 py-4 border-2 border-slate-300 text-slate-700 dark:border-slate-600 dark:text-slate-100 rounded-lg font-semibold hover:border-amber-500 hover:text-amber-600 dark:hover:border-amber-400 dark:hover:text-amber-300 hover:shadow-lg transition-all duration-300">
                            View Projects
                        </button>
                    </motion.div>
                </motion.div>

                <motion.div initial={{
                    opacity: 0,
                    x: 50
                }} animate={{
                    opacity: 1,
                    x: 0
                }} transition={{
                    duration: 0.8,
                    delay: 0.3
                }} className="relative">
                    <div className="relative w-full aspect-square max-w-md mx-auto">
                        <motion.div animate={{
                            rotate: [0, 360]
                        }} transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }} className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full blur-2xl opacity-20" />
                        <img src="https://horizons-cdn.hostinger.com/0840079b-7f92-4535-b740-5fb19b216fc9/img_3010-SQxak.JPG" alt="Phạm Quang Huy - Full Stack Developer" className="relative z-10 w-full h-full object-cover rounded-2xl shadow-2xl" />
                        <motion.div animate={{
                            scale: [1, 1.05, 1]
                        }} transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }} className="absolute inset-0 border-4 border-gradient-to-r from-amber-400 to-yellow-400 rounded-2xl" />
                    </div>
                </motion.div>
            </div>
        </div>

        <motion.button onClick={scrollToAbout} animate={{
            y: [0, 10, 0]
        }} transition={{
            duration: 1.5,
            repeat: Infinity
        }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-amber-600 hover:text-amber-700 transition-colors">
            <ChevronDown size={32} />
        </motion.button>
    </section>;
};
export default Hero;