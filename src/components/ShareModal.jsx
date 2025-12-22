import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Facebook, MessageCircle, Copy, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const ShareModal = ({ isOpen, onClose, articleUrl, articleTitle }) => {
    const { language } = useLanguage();
    const [copied, setCopied] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(articleUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareOptions = [
        {
            id: 'facebook',
            label: language === 'vi' ? 'Facebook' : 'Facebook',
            icon: Facebook,
            color: 'from-blue-500 to-blue-600',
            onClick: () => {
                const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`;
                window.open(url, '_blank', 'width=600,height=400');
            }
        },
        {
            id: 'messenger',
            label: language === 'vi' ? 'Messenger' : 'Messenger',
            icon: MessageCircle,
            color: 'from-blue-400 to-blue-500',
            onClick: () => {
                const url = `https://www.facebook.com/dialog/send?app_id=YOUR_APP_ID&link=${encodeURIComponent(articleUrl)}&redirect_uri=${encodeURIComponent(articleUrl)}`;
                window.open(url, '_blank', 'width=600,height=400');
            }
        },
        {
            id: 'copy',
            label: language === 'vi' ? 'Sao chép link' : 'Copy Link',
            icon: copied ? Check : Copy,
            color: 'from-green-500 to-emerald-600',
            onClick: handleCopyLink
        }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-700"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                                {language === 'vi' ? 'Chia sẻ bài viết' : 'Share Article'}
                            </h3>
                            <button
                                onClick={onClose}
                                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            >
                                <X size={24} className="text-slate-600 dark:text-slate-400" />
                            </button>
                        </div>

                        {/* Share Options Grid */}
                        <div className="grid grid-cols-3 gap-3 mb-6">
                            {shareOptions.map((option) => {
                                const IconComponent = option.icon;
                                return (
                                    <motion.button
                                        key={option.id}
                                        onClick={option.onClick}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-r ${option.color} text-white hover:shadow-lg transition-all duration-300`}
                                    >
                                        <IconComponent size={24} />
                                        <span className="text-xs font-semibold text-center">{option.label}</span>
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* Copied Feedback */}
                        {copied && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-center text-green-600 dark:text-green-400 text-sm font-semibold"
                            >
                                {language === 'vi' ? '✓ Đã sao chép link' : '✓ Link copied!'}
                            </motion.div>
                        )}

                        {/* Close Button */}
                        {!copied && (
                            <button
                                onClick={onClose}
                                className="w-full py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                {language === 'vi' ? 'Đóng' : 'Close'}
                            </button>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ShareModal;
