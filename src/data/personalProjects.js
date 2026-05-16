import godazImage from '../assets/projects/godaz-shop.png';
import zengImage from '../assets/projects/zeng-sell.png';
import fuImage from '../assets/projects/fu-eresources.png';
import lmsImage from '../assets/projects/lms-platform.png';
import itInterviewImage from '../assets/projects/it-interview-prep.png';

export const personalProjects = [
    {
        title: 'LMS Platform',
        description: {
            en: 'A multi-tenant SaaS learning management platform designed for schools and training centers with white-label support.',
            vi: 'Nền tảng quản lý học tập đa người thuê (SaaS) hỗ trợ white-label, cho phép triển khai hàng loạt website đào tạo.',
        },
        imageUrl: lmsImage,
        imageAlt: 'LMS Platform Multi-tenant SaaS Dashboard',
        tags: ['Next.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'Monorepo', 'SaaS'],
        githubLink: 'https://github.com/Mrnobody102/lms',
        liveLink: '',
    },
    {
        title: 'IT Interview Preparation App',
        description: {
            en: 'A bilingual platform for IT interview prep, covering core concepts, system design, and DevOps with interactive content.',
            vi: 'Nền tảng phỏng vấn IT song ngữ, bao gồm kiến thức cốt lõi, thiết kế hệ thống và DevOps với nội dung tương tác.',
        },
        imageUrl: itInterviewImage,
        imageAlt: 'IT Interview Preparation App Interface',
        tags: ['React 18', 'TypeScript', 'Tailwind CSS', 'Markdown', 'Mermaid.js', 'Vite'],
        githubLink: 'https://github.com/Mrnobody102/it-interview-prep',
        liveLink: 'https://it-interview-prep.vercel.app/',
    },
    {
        title: 'FPT University E-resources',
        description: {
            en: 'A centralized digital resource management system optimized for search, secure storage, and content delivery.',
            vi: 'Hệ thống quản lý tài nguyên số tập trung, tối ưu cho tìm kiếm nhanh, lưu trữ an toàn và phân phối nội dung.',
        },
        imageUrl: fuImage,
        imageAlt: 'Digital library search interface',
        tags: ['Spring Boot', 'MongoDB', 'Elasticsearch', 'Thymeleaf', 'AWS S3', 'Heroku', 'JavaScript'],
        githubLink: 'https://github.com/Mrnobody102/FU_E-resources',
        liveLink: '',
    },
    {
        title: 'goDaz shop',
        description: {
            en: 'A high-performance e-commerce platform built with microservices, secure transactions, and real-time search capabilities.',
            vi: 'Nền tảng thương mại điện tử hiệu năng cao với kiến trúc microservices, giao dịch an toàn và tìm kiếm thời gian thực.',
        },
        imageUrl: godazImage,
        imageAlt: 'Modern e-commerce dashboard interface',
        tags: ['NextJS', 'Spring Boot', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Kafka', 'Elasticsearch', 'AWS', 'Docker'],
        githubLink: '',
        liveLink: 'https://godaz.shop/',
    },
    {
        title: 'ZenG Sell Omnichannel Lite',
        description: {
            en: 'An AI-powered omnichannel sales solution with inventory management, analytics, and real-time synchronization.',
            vi: 'Giải pháp bán hàng đa kênh tích hợp AI, quản lý kho, phân tích và đồng bộ theo thời gian thực.',
        },
        imageUrl: zengImage,
        imageAlt: 'Omnichannel sales analytics dashboard',
        tags: ['Spring Boot', 'ReactJS', 'OpenAI', 'Kafka', 'Websocket', 'Kubernetes', 'AWS', 'Docker', 'PostgreSQL'],
        githubLink: 'https://github.com/Mrnobody102/zeng',
        liveLink: 'https://zengsell.com',
    },
];
