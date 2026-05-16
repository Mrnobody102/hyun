import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, Facebook, Share2, X, Linkedin, Twitter } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const ShareModal = ({ isOpen, onClose, articleUrl, articleTitle }) => {
    const { language } = useLanguage();
    const [copied, setCopied] = useState(false);
    
    const resolvedTitle =
        articleTitle && typeof articleTitle === 'object'
            ? articleTitle[language] || articleTitle.en || articleTitle.vi || ''
            : articleTitle || '';

    const handleCopyLink = async () => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(articleUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } else {
                // Fallback for non-secure contexts or unsupported browsers
                const textArea = document.createElement("textarea");
                textArea.value = articleUrl;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                } catch (err) {
                    console.error('Fallback copy failed', err);
                }
                document.body.removeChild(textArea);
            }
        } catch (err) {
            console.error('Copy to clipboard failed', err);
        }
    };

    const shareOptions = [
        {
            id: 'facebook',
            label: 'Facebook',
            icon: Facebook,
            color: 'from-blue-600 to-blue-700',
            onClick: () => {
                const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`;
                window.open(url, '_blank', 'width=600,height=400,noopener,noreferrer');
            },
        },
        {
            id: 'linkedin',
            label: 'LinkedIn',
            icon: Linkedin,
            color: 'from-blue-700 to-blue-800',
            onClick: () => {
                const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
                window.open(url, '_blank', 'width=600,height=600,noopener,noreferrer');
            },
        },
        {
            id: 'twitter',
            label: 'X / Twitter',
            icon: Twitter,
            color: 'from-slate-800 to-black',
            onClick: () => {
                const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(resolvedTitle)}`;
                window.open(url, '_blank', 'width=600,height=400,noopener,noreferrer');
            },
        },
        {
            id: 'copy',
            label: language === 'vi' ? 'Sao chép' : 'Copy',
            icon: copied ? Check : Copy,
            color: 'from-slate-600 to-slate-700',
            onClick: handleCopyLink,
        },
    ];

    if (navigator.share) {
        shareOptions.splice(0, 0, {
            id: 'native-share',
            label: language === 'vi' ? 'Hệ thống' : 'System',
            icon: Share2,
            color: 'from-amber-500 to-yellow-600',
            onClick: async () => {
                try {
                    await navigator.share({ 
                        title: resolvedTitle, 
                        text: language === 'vi' ? `Xem bài viết: ${resolvedTitle}` : `Check out this article: ${resolvedTitle}`,
                        url: articleUrl 
                    });
                } catch (error) {
                    if (error.name !== 'AbortError') {
                        console.error('Error sharing:', error);
                    }
                }
            },
        });
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center px-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, y: 20, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 max-w-md w-full border border-slate-200 dark:border-slate-800"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex items-start justify-between mb-8">
                            <div>
                                <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">
                                    {language === 'vi' ? 'Chia sẻ bài viết' : 'Share Article'}
                                </h3>
                                {resolvedTitle && (
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 font-medium">
                                        {resolvedTitle}
                                    </p>
                                )}
                            </div>
                            <button 
                                onClick={onClose} 
                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {shareOptions.map((option) => {
                                const IconComponent = option.icon;
                                return (
                                    <motion.button
                                        key={option.id}
                                        onClick={option.onClick}
                                        whileHover={{ y: -4, shadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-br ${option.color} text-white shadow-lg transition-all duration-300 group`}
                                    >
                                        <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                                            <IconComponent size={20} />
                                        </div>
                                        <span className="text-sm font-bold">{option.label}</span>
                                    </motion.button>
                                );
                            })}
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                                <Copy size={16} />
                            </div>
                            <input 
                                type="text" 
                                readOnly 
                                value={articleUrl} 
                                className="w-full pl-11 pr-24 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm text-slate-600 dark:text-slate-300 focus:outline-none font-medium"
                            />
                            <button 
                                onClick={handleCopyLink}
                                className={`absolute right-2 top-2 bottom-2 px-4 rounded-xl font-bold text-xs transition-all ${
                                    copied 
                                    ? 'bg-green-500 text-white' 
                                    : 'bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-black dark:hover:bg-white'
                                }`}
                            >
                                {copied ? (language === 'vi' ? 'Đã chép' : 'Copied') : (language === 'vi' ? 'Sao chép' : 'Copy')}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ShareModal;

