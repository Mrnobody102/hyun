import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';
import ShareModal from './ShareModal';
import { useLanguage } from '@/context/LanguageContext';

const ShareSectionButton = ({ sectionName, sectionPath }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { language } = useLanguage();

    // Lấy domain hiện tại (http://localhost:3000 hoặc https://hand-somebody.vercel.app)
    const sectionUrl = `${window.location.origin}${sectionPath}`;

    return (
        <>
            <motion.button
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-500/30 transition-colors"
                title={language === 'vi' ? 'Chia sẻ' : 'Share'}
            >
                <Share2 size={18} />
            </motion.button>

            <ShareModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                articleUrl={sectionUrl}
                articleTitle={sectionName}
            />
        </>
    );
};

export default ShareSectionButton;
