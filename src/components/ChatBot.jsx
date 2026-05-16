import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { marked } from 'marked';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import { CHATBOT_CONFIG } from '@/config/chatbot';

// Cosine similarity for client-side fallback
function cosineSimilarity(vecA, vecB) {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

const ChatBot = () => {
    const { language } = useLanguage();
    
    const translations = {
        en: {
            placeholder: 'Ask me anything about Huy...',
            greeting: "Hi! I'm Huy's AI assistant. How can I help you today?",
            error: 'Sorry, something went wrong. Please try again.',
            title: 'Hyun AI Assistant',
            suggested: ['Show me projects', 'What are Huy\'s skills?', 'Tell me about the AI Camera system']
        },
        vi: {
            placeholder: 'Hỏi tôi bất cứ điều gì về Huy...',
            greeting: 'Chào bạn! Tôi là trợ lý AI của Huy. Tôi có thể giúp gì cho bạn?',
            error: 'Rất tiếc, đã có lỗi xảy ra. Vui lòng thử lại.',
            title: 'Trợ lý AI Hyun',
            suggested: ['Xem các dự án', 'Kỹ năng của Huy là gì?', 'Hệ thống AI Camera hoạt động thế nào?']
        }
    };

    const t = translations[language];

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([{ role: 'bot', content: translations[language].greeting }]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const { toast } = useToast();
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messages.length === 1 && messages[0].role === 'bot') {
            setMessages([{ role: 'bot', content: t.greeting }]);
        }
    }, [language, t.greeting]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (text = input) => {
        if (!text || !text.trim() || isLoading) return;

        const userMessage = { role: 'user', content: text };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            let data;
            let usedFallback = false;

            // 1. Try to call the real backend (for Production)
            // Skip if we are on localhost and want to use direct API for speed/reliability
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            
            if (!isLocal) {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message: text,
                        history: messages,
                        language: language
                    })
                });

                if (response.ok) {
                    data = await response.json();
                } else {
                    usedFallback = true;
                }
            } else {
                usedFallback = true;
            }
            
            if (usedFallback) {
                console.log('Using client-side AI fallback...');
                const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
                if (!apiKey) throw new Error('VITE_GEMINI_API_KEY is missing in .env');

                // Get embedding for query
                const embedResp = await fetch(`https://generativelanguage.googleapis.com/${CHATBOT_CONFIG.apiVersion}/models/${CHATBOT_CONFIG.embeddingModel}:embedContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content: { parts: [{ text }] } })
                });
                const embedData = await embedResp.json();
                if (embedData.error) throw new Error(`Embedding Error: ${embedData.error.message}`);
                
                const userVector = embedData.embedding.values;

                // Load knowledge base
                const kbResp = await fetch('/chatbot/knowledge-base.json');
                const kbData = await kbResp.json();

                // Find context
                const context = kbData
                    .map(item => ({ ...item, sim: cosineSimilarity(userVector, item.embedding) }))
                    .sort((a, b) => b.sim - a.sim)
                    .slice(0, 5)
                    .map(item => item.text)
                    .join('\n\n');

                // Generate answer
                const prompt = `Context about Huy: ${context}\n\nUser Question: ${text}\n\nAnswer concisely in ${language === 'vi' ? 'Vietnamese' : 'English'}:`;
                const genResp = await fetch(`https://generativelanguage.googleapis.com/${CHATBOT_CONFIG.apiVersion}/models/${CHATBOT_CONFIG.chatModel}:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                        system_instruction: { parts: [{ text: "You are Huy's professional AI assistant. Use the provided context to answer questions about Huy (Pham Quang Huy/Hyun)." }] }
                    })
                });
                data = await genResp.json();
                if (data.error) throw new Error(`Generation Error: ${data.error.message}`);
                
                const botText = data.candidates?.[0]?.content?.parts?.[0]?.text;
                if (!botText) throw new Error('No response generated by AI');
                
                setMessages(prev => [...prev, { role: 'bot', content: botText }]);
            } else if (data) {
                setMessages(prev => [...prev, { role: 'bot', content: data.response || '' }]);
            }

        } catch (error) {
            toast({
                variant: "destructive",
                title: t.error,
                description: error.message
            });
            console.error('Chat Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const renderContent = (content) => {
        try { return { __html: marked.parse(content || '') }; }
        catch (e) { return { __html: content || '' }; }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="pointer-events-auto mb-4 w-[90vw] sm:w-[400px] h-[550px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-blue-600/10 to-purple-600/10 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20">
                                    <Bot size={20} className="text-white" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5">
                                        <h3 className="font-bold text-slate-800 dark:text-white text-sm">{t.title}</h3>
                                        <Sparkles size={12} className="text-amber-500 fill-amber-500" />
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
                            {messages.map((msg, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-blue-600'}`}>
                                            {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                                        </div>
                                        <div className={`p-3 rounded-2xl text-sm shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'}`}>
                                            {msg.role === 'bot' ? <div className="prose prose-sm dark:prose-invert max-w-none break-words" dangerouslySetInnerHTML={renderContent(msg.content)} /> : <p className="whitespace-pre-wrap">{msg.content}</p>}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="flex gap-2 max-w-[85%]">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-blue-600">
                                            <Loader2 size={16} className="animate-spin" />
                                        </div>
                                        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-none">
                                            <div className="flex gap-1">
                                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
                            {messages.length < 3 && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {t.suggested.map((s, i) => (
                                        <button key={i} onClick={() => handleSend(s)} className="text-[10px] px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full border border-blue-100 dark:border-blue-800/50 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all font-medium">
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            )}
                            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.placeholder} className="flex-1 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-white transition-all" />
                                <button type="submit" disabled={isLoading || !input.trim()} className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center shrink-0">
                                    <Send size={18} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`pointer-events-auto p-4 rounded-full shadow-2xl transition-all duration-500 flex items-center justify-center relative group ${isOpen ? 'bg-slate-800 dark:bg-slate-700 text-white rotate-90' : 'bg-blue-600 text-white'}`}
            >
                {!isOpen && <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-20 group-hover:opacity-40"></div>}
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </motion.button>
        </div>
    );
};

export default ChatBot;
