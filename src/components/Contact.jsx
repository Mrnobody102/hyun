import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Facebook } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/utils';
import { contactInfo as contactInfoData, contactLabels, formspreeEndpoint } from '@/data';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || formspreeEndpoint;

const Contact = () => {
    const { toast } = useToast();
    const { language } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const contactItems = useMemo(() => {
        if (!contactInfoData || !contactLabels) return [];
        
        return [
            {
                icon: Mail,
                label: contactLabels.email,
                value: contactInfoData.email,
                href: contactInfoData.email ? `mailto:${contactInfoData.email}` : '#',
                color: 'from-amber-500 to-yellow-500'
            },
            {
                icon: Phone,
                label: contactLabels.phone,
                value: contactInfoData.phone,
                href: contactInfoData.phone ? `tel:${contactInfoData.phone}` : '#',
                color: 'from-slate-600 to-amber-500'
            },
            {
                icon: MapPin,
                label: contactLabels.location,
                value: contactInfoData.location,
                href: '#',
                color: 'from-yellow-500 to-amber-600'
            }
        ].filter(item => item.value);
    }, []);

    const socialLinks = useMemo(() => {
        if (!contactInfoData || !contactInfoData.social) return [];
        
        const links = [];
        if (contactInfoData.social.github) {
            links.push({ icon: Github, label: 'GitHub', href: contactInfoData.social.github, color: 'hover:text-slate-800' });
        }
        if (contactInfoData.social.linkedin) {
            links.push({ icon: Linkedin, label: 'LinkedIn', href: contactInfoData.social.linkedin, color: 'hover:text-blue-600' });
        }
        if (contactInfoData.social.facebook) {
            links.push({ icon: Facebook, label: 'Facebook', href: contactInfoData.social.facebook, color: 'hover:text-blue-500' });
        }
        return links;
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        if (!FORMSPREE_ENDPOINT || FORMSPREE_ENDPOINT.includes('your-id')) {
            toast({
                title: 'Form endpoint missing',
                description: 'Set VITE_FORMSPREE_ENDPOINT to your Formspree URL.',
                variant: 'destructive',
                duration: 4000,
            });
            return;
        }

        try {
            const res = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error('Formspree request failed');
            }

            toast({
                title: language === 'vi' ? 'Gửi thành công!' : 'Message sent!',
                description: language === 'vi' ? 'Cảm ơn bạn đã liên hệ. Mình sẽ phản hồi sớm nhất.' : 'Thank you for reaching out. I\'ll get back to you soon.',
                duration: 3000,
            });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            toast({
                title: language === 'vi' ? 'Gửi thất bại' : 'Failed to send',
                description: language === 'vi' ? 'Vui lòng thử lại hoặc liên hệ trực tiếp qua email.' : 'Please try again or contact me directly via email.',
                variant: 'destructive',
                duration: 4000,
            });
        }
    }, [formData, language, toast]);

    const handleChange = useCallback((e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }, []);

    const handleSocialClick = useCallback((href) => {
        if (href) {
            window.open(href, '_blank', 'noopener,noreferrer');
        }
    }, []);

    return (
        <section id="contact" className="pt-32 pb-20 md:pt-36 px-4 bg-gradient-to-br from-slate-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 overflow-hidden">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <h2 className="text-4xl md:text-5xl font-bold">
                            <span className="bg-gradient-to-r from-slate-800 via-amber-600 to-yellow-600 dark:from-amber-400 dark:via-yellow-400 dark:to-orange-400 bg-clip-text text-transparent">
                                {language === 'vi' ? 'Liên hệ' : 'Get In Touch'}
                            </span>
                        </h2>
                    </div>
                    <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 dark:from-amber-400 dark:to-yellow-400 mx-auto rounded-full"></div>
                    <p className="text-slate-600 dark:text-slate-300 mt-4 max-w-2xl mx-auto">
                        {language === 'vi' ? 'Hãy cùng hợp tác và biến ý tưởng của bạn thành hiện thực' : 'Let\'s collaborate and bring your ideas to life'}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            {contactItems.map((info) => (
                                <motion.a
                                    key={t(info.label, 'en')}
                                    href={info.href}
                                    variants={fadeInUp}
                                    whileHover={{ x: 10, scale: 1.02 }}
                                    className={`flex items-start gap-4 p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 bg-white dark:bg-slate-800 border-slate-400 dark:border-slate-600`}
                                >
                                    <div className={`p-3 bg-gradient-to-r ${info.color} rounded-lg`}>
                                        {info.icon && <info.icon className="text-white" size={24} />}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{t(info.label, language)}</p>
                                        <p className="text-base md:text-lg font-semibold text-slate-800 dark:text-slate-100 break-all sm:break-normal">{info.value}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {socialLinks.length > 0 && (
                            <motion.div
                                variants={fadeInUp}
                                className={`bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-slate-900 dark:to-slate-800 p-6 rounded-xl border-2 border-slate-400 dark:border-slate-600`}
                            >
                                <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">{t(contactLabels?.followMe, language)}</h3>
                                <div className="flex gap-4">
                                    {socialLinks.map((social) => (
                                        <motion.button
                                            key={social.label}
                                            onClick={() => handleSocialClick(social.href)}
                                            whileHover={{ scale: 1.1, y: -5 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`p-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-300 hover:border-amber-400 dark:hover:border-amber-400 ${social.color}`}
                                            title={social.label}
                                        >
                                            <social.icon size={24} />
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </motion.div>

                    <motion.div
                        variants={fadeInUp}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-4 p-8 rounded-xl shadow-xl border-2 bg-white dark:bg-slate-800 border-slate-400 dark:border-slate-600">
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    {language === 'vi' ? 'Tên của bạn' : 'Your Name'}
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors border-slate-300 dark:border-slate-500 dark:bg-slate-700 dark:text-slate-100 focus:border-amber-500 dark:focus:border-amber-400"
                                    placeholder={language === 'vi' ? 'Nguyễn Văn A' : 'John Doe'}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    {language === 'vi' ? 'Địa chỉ Email' : 'Email Address'}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors border-slate-300 dark:border-slate-500 dark:bg-slate-700 dark:text-slate-100 focus:border-amber-500 dark:focus:border-amber-400"
                                    placeholder={language === 'vi' ? 'email@example.com' : 'john@example.com'}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    {language === 'vi' ? 'Chủ đề' : 'Subject'}
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors border-slate-300 dark:border-slate-500 dark:bg-slate-700 dark:text-slate-100 focus:border-amber-500 dark:focus:border-amber-400"
                                    placeholder={language === 'vi' ? 'Yêu cầu dự án' : 'Project Inquiry'}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    {language === 'vi' ? 'Tin nhắn' : 'Message'}
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    className="w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors resize-none border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:border-amber-500 dark:focus:border-amber-400"
                                    placeholder={language === 'vi' ? 'Kể cho tôi về dự án của bạn...' : 'Tell me about your project...'}
                                    required
                                />
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <Send size={20} />
                                {language === 'vi' ? 'Gửi tin nhắn' : 'Send Message'}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(Contact);
