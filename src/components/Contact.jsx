import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Facebook } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/mzdpjqby';

const Contact = () => {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const contactInfo = [
        {
            icon: Mail,
            label: 'Email',
            value: 'huypq1801@gmail.com',
            href: 'mailto:huypq1801@gmail.com',
            color: 'from-amber-500 to-yellow-500'
        },
        {
            icon: Phone,
            label: 'Phone',
            value: '0986865089',
            href: 'tel:0986865089',
            color: 'from-slate-600 to-amber-500'
        },
        {
            icon: MapPin,
            label: 'Location',
            value: 'Hanoi, Vietnam',
            href: '#',
            color: 'from-yellow-500 to-amber-600'
        }
    ];

    const socialLinks = [
        {
            icon: Github,
            label: 'GitHub',
            href: 'https://github.com/Mrnobody102',
            color: 'hover:text-slate-800'
        },
        {
            icon: Linkedin,
            label: 'LinkedIn',
            href: 'https://www.linkedin.com/in/huypham102',
            color: 'hover:text-blue-600'
        },
        {
            icon: Facebook,
            label: 'Facebook',
            href: 'https://www.facebook.com/antimarkzuckerberg/',
            color: 'hover:text-blue-500'
        }
    ];

    const handleSubmit = async (e) => {
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
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                }),
            });

            if (!res.ok) {
                throw new Error('Formspree request failed');
            }

            toast({
                title: 'Message sent!',
                description: 'Cảm ơn bạn đã liên hệ. Mình sẽ phản hồi sớm nhất.',
                duration: 3000,
            });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            toast({
                title: 'Gửi thất bại',
                description: 'Vui lòng thử lại hoặc kiểm tra cấu hình Formspree.',
                variant: 'destructive',
                duration: 4000,
            });
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSocialClick = (href) => {
        if (href) {
            window.open(href, '_blank');
        }
    };

    return (
        <section id="contact" className="py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-slate-800 via-amber-600 to-yellow-600 dark:from-amber-400 dark:via-yellow-400 dark:to-orange-400 bg-clip-text text-transparent">
                            Get In Touch
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 dark:from-amber-400 dark:to-yellow-400 mx-auto rounded-full"></div>
                    <p className="text-slate-600 dark:text-slate-300 mt-4 max-w-2xl mx-auto">
                        Let's collaborate and bring your ideas to life
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            {contactInfo.map((info, index) => (
                                <motion.a
                                    key={info.label}
                                    href={info.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    whileHover={{ x: 10, scale: 1.02 }}
                                    className={`flex items-center gap-4 p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700`}
                                >
                                    <div className={`p-3 bg-gradient-to-r ${info.color} rounded-lg`}>
                                        <info.icon className="text-white" size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{info.label}</p>
                                        <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">{info.value}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className={`bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-slate-900 dark:to-slate-800 border-amber-200 dark:border-slate-700 p-6 rounded-xl border`}
                        >
                            <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">Follow Me</h3>
                            <div className="flex gap-4">
                                {socialLinks.map((social) => (
                                    <motion.button
                                        key={social.label}
                                        onClick={() => handleSocialClick(social.href)}
                                        whileHover={{ scale: 1.1, y: -5 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`p-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-300 ${social.color}`}
                                        title={social.label}
                                    >
                                        <social.icon size={24} />
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-4 p-8 rounded-xl shadow-xl border bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 focus:border-amber-500 dark:focus:border-amber-400"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 focus:border-amber-500 dark:focus:border-amber-400"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 focus:border-amber-500 dark:focus:border-amber-400"
                                    placeholder="Project Inquiry"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors resize-none border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:border-amber-500 dark:focus:border-amber-400"
                                    placeholder="Tell me about your project..."
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
                                Send Message
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;