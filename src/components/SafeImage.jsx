import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SafeImage = ({ 
    src, 
    alt, 
    className = "", 
    style = {}, 
    loading = "lazy", 
    decoding = "async",
    fetchPriority = "auto",
    objectFit = "cover"
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);

    if (!src) {
        return (
            <div className={`relative overflow-hidden ${className}`} style={style}>
                <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                    <span className="text-xs">No Image</span>
                </div>
            </div>
        );
    }

    return (
        <div className={`relative overflow-hidden ${className}`} style={style}>
            <AnimatePresence>
                {!isLoaded && !error && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse z-10"
                    />
                )}
            </AnimatePresence>

            {error ? (
                <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                    <span className="text-xs">Image Error</span>
                </div>
            ) : (
                <motion.img
                    src={src}
                    alt={alt}
                    loading={loading}
                    decoding={decoding}
                    fetchPriority={fetchPriority}
                    onLoad={() => setIsLoaded(true)}
                    onError={() => setError(true)}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ 
                        opacity: isLoaded ? 1 : 0, 
                        scale: isLoaded ? 1 : 1.05 
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full h-full"
                    style={{ objectFit }}
                />
            )}
        </div>
    );
};

export default React.memo(SafeImage);
