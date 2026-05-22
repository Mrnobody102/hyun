import React, { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        if (typeof window === 'undefined') return 'en';
        const saved = localStorage.getItem('language');
        return saved === 'vi' ? 'vi' : 'en';
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;
        localStorage.setItem('language', language);
        document.documentElement.lang = language;
    }, [language]);

    const toggleLanguage = React.useCallback(() => {
        setLanguage((prev) => (prev === 'en' ? 'vi' : 'en'));
    }, []);

    const value = React.useMemo(() => ({ 
        language, 
        setLanguage, 
        toggleLanguage 
    }), [language, toggleLanguage]);

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
    return ctx;
}
