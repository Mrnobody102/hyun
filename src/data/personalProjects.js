import godazImage from '../assets/projects/godaz-shop.png';
import zengImage from '../assets/projects/zeng-sell.png';
import fuImage from '../assets/projects/fu-eresources.png';
import lmsImage from '../assets/projects/lms-platform.png';
import itInterviewImage from '../assets/projects/it-interview-prep.png';

export const personalProjects = [
    {
        id: 'lms-platform',
        title: 'LMS Platform',
        description: {
            en: 'A multi-tenant SaaS learning management platform designed for schools and training centers with white-label support.',
            vi: 'Nền tảng quản lý học tập đa người thuê (SaaS) hỗ trợ white-label, cho phép triển khai hàng loạt website đào tạo.',
        },
        imageUrl: lmsImage,
        imageAlt: 'LMS Platform Multi-tenant SaaS Dashboard',
        tags: ['Next.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'Monorepo', 'SaaS'],
        githubLink: 'https://github.com/Mrnobody102/lms',
        liveLink: 'https://lms-web-student.vercel.app/',
        demoLinks: [
            { name: { en: 'Demo: Student Portal', vi: 'Demo: Cổng Học Viên' }, url: 'https://lms-web-student.vercel.app/' },
            { name: { en: 'Demo: Admin Portal', vi: 'Demo: Quản Trị Trung Tâm' }, url: 'https://lms-web-admin-one.vercel.app/' },
            { name: { en: 'Demo: Super Portal', vi: 'Demo: Quản Trị Hệ Thống' }, url: 'https://lms-super-portal.vercel.app/' }
        ],
        details: {
            features: [
                { en: 'Monorepo Multi-tenant Architecture', vi: 'Kiến trúc Monorepo Multi-tenant' },
                { en: 'Hybrid AI-Enhanced Learning', vi: 'Học tập lai tích hợp AI' },
                { en: 'AI Roleplay & Simulations', vi: 'Nhập vai & Mô phỏng thực tế với AI' },
                { en: 'Adaptive Skill Tree & Micro-cards', vi: 'Lộ trình học tập thích ứng' }
            ],
            projectDetail: [
                { 
                    type: 'text', 
                    en: 'LMS Platform is an enterprise-grade learning management system designed with a Monorepo Multi-tenant architecture. It operates via three distinct portals (Student, Admin, Super Portal), utilizing a Stateless Backend and Cookie-First Browser Auth to ensure high security and horizontal scalability.',
                    vi: 'LMS Platform là một hệ thống quản lý học tập quy mô lớn được thiết kế theo kiến trúc Monorepo Multi-tenant. Hệ thống bao gồm 3 cổng thông tin độc lập (Student, Admin, Super Portal), sử dụng kiến trúc Stateless Backend và bảo mật Cookie-First Browser Auth giúp mở rộng dễ dàng và an toàn.'
                },
                { 
                    type: 'text', 
                    en: 'The platform revolutionizes traditional linear learning by introducing a Hybrid AI-Enhanced Learning model. It leverages an "Adaptive Skill Tree" combined with Micro-cards to deliver highly personalized learning paths.',
                    vi: 'Dự án mang tính đột phá khi chuyển từ mô hình học tập tuyến tính truyền thống sang "Adaptive Skill Tree" (Lộ trình học tập thích ứng) kết hợp các thẻ Micro-cards để mang lại trải nghiệm cá nhân hóa sâu sắc.'
                },
                { type: 'image', url: lmsImage },
                { 
                    type: 'text', 
                    en: '✨ AI Product Features: Includes a Contextual AI Tutor for instant grammar/vocabulary explanations, Experiential Simulations for real-time text/audio roleplay, and Multi-modal AI assignments (powered by Gemini) for automated pronunciation and feedback grading.',
                    vi: '✨ Tích hợp AI vào sản phẩm: Nổi bật với Contextual AI Tutor giúp giải thích ngữ pháp/từ vựng theo ngữ cảnh; tính năng Mô phỏng nhập vai (Roleplay) hỗ trợ âm thanh/văn bản; và Đánh giá đa phương thức bằng AI (Gemini) giúp chấm điểm tự động.'
                },
                { 
                    type: 'text', 
                    en: '🚀 Tech Stack: Turborepo, pnpm, TypeScript, NestJS, PostgreSQL, Prisma, Next.js (App Router), Tailwind CSS, Zustand, BullMQ.',
                    vi: '🚀 Công nghệ sử dụng: Turborepo, pnpm, TypeScript, NestJS, PostgreSQL, Prisma, Next.js (App Router), Tailwind CSS, Zustand, BullMQ.'
                },
                { 
                    type: 'text', 
                    en: '🤖 AI-Driven Development: Built end-to-end using AI Agents. Antigravity handled Architecture Planning & Documentation, Claude took charge of Core Coding Implementation, and Codex performed Code Review & Testing.',
                    vi: '🤖 Phát triển với AI (AI-Driven): Dự án được xây dựng dưới sự hỗ trợ của AI. Antigravity đảm nhiệm Lên kiến trúc & Tài liệu, Claude thực hiện Triển khai mã nguồn chính, và Codex phụ trách Review code & Kiểm thử.'
                }
            ],
            videoUrl: '',
            gallery: [lmsImage, itInterviewImage]
        }
    },
    {
        id: 'it-interview-prep',
        title: 'IT Interview Preparation App',
        description: {
            en: 'A bilingual platform for IT interview prep, covering core concepts, system design, and DevOps with interactive content.',
            vi: 'Nền tảng phỏng vấn IT song ngữ, bao gồm kiến thức cốt lõi, thiết kế hệ thống và DevOps với nội dung tương tác.',
        },
        imageUrl: itInterviewImage,
        imageAlt: 'IT Interview Preparation App Interface',
        tags: ['React 18', 'TypeScript', 'Tailwind CSS', 'ExpressJS', 'MongoDB', 'Markdown', 'Mermaid.js'],
        githubLink: 'https://github.com/Mrnobody102/it-interview-prep',
        liveLink: 'https://it-interview-prep.vercel.app/',
        details: {
            features: [
                { en: 'Bilingual Content (EN/VI)', vi: 'Nội dung song ngữ (Anh/Việt)' },
                { en: 'Interactive Mermaid Diagrams', vi: 'Biểu đồ Mermaid tương tác' },
                { en: 'Markdown Support', vi: 'Hỗ trợ Markdown' },
                { en: 'Dark Mode Optimization', vi: 'Tối ưu hóa chế độ tối' }
            ],
            projectDetail: [
                { 
                    type: 'text', 
                    en: 'IT Interview Preparation App is a comprehensive, bilingual platform designed to bridge the knowledge gap for software engineers preparing for technical interviews. It covers a wide range of topics including Core Concepts, Data Structures & Algorithms, System Design, and DevOps.',
                    vi: 'IT Interview Preparation App là nền tảng song ngữ toàn diện, thiết kế nhằm thu hẹp khoảng cách kiến thức cho các kỹ sư phần mềm khi chuẩn bị phỏng vấn kỹ thuật. Hệ thống bao phủ nhiều chủ đề từ Kiến thức cốt lõi, Cấu trúc dữ liệu & Giải thuật, Thiết kế hệ thống đến DevOps.'
                },
                { 
                    type: 'text', 
                    en: '🚀 Tech Stack: React 18, TypeScript, Tailwind CSS, ExpressJS, MongoDB, Vite, Markdown, Mermaid.js.',
                    vi: '🚀 Công nghệ: React 18, TypeScript, Tailwind CSS, ExpressJS, MongoDB, Vite, Markdown, Mermaid.js.'
                },
                { type: 'image', url: itInterviewImage },
                { 
                    type: 'text', 
                    en: 'The platform integrates a custom Markdown renderer with syntax highlighting and interactive Mermaid diagrams, allowing users to visualize complex system architectures effortlessly. The backend is powered by ExpressJS and MongoDB to manage user progress, content synchronization, and interactive quiz sessions.',
                    vi: 'Nền tảng tích hợp trình render Markdown tùy chỉnh, hỗ trợ highlight cú pháp và biểu đồ Mermaid tương tác, giúp dễ dàng hình dung các kiến trúc hệ thống phức tạp. Backend sử dụng ExpressJS và MongoDB để quản lý tiến độ học tập, đồng bộ nội dung và các phiên hỏi đáp trắc nghiệm.'
                }
            ],
            videoUrl: '',
            gallery: [itInterviewImage, lmsImage]
        }
    },
    {
        id: 'godaz-shop',
        title: 'goDaz shop',
        description: {
            en: 'A high-performance e-commerce platform built with microservices, secure transactions, and real-time search capabilities.',
            vi: 'Nền tảng thương mại điện tử hiệu năng cao với kiến trúc microservices, giao dịch an toàn và tìm kiếm thời gian thực.',
        },
        imageUrl: godazImage,
        imageAlt: 'Modern e-commerce dashboard interface',
        tags: ['Next.js', 'Spring Boot', 'TypeScript', 'Tailwind CSS', 'Zustand', 'PostgreSQL', 'Redis', 'Kafka', 'Elasticsearch'],
        githubLink: 'https://github.com/Mrnobody102/godaz-client-nextjs',
        liveLink: 'https://godaz.shop/',
        details: {
            features: [
                { en: 'Seamless i18n support', vi: 'Đa ngôn ngữ (i18n) mượt mà' },
                { en: 'Global Cart & Wishlist', vi: 'Giỏ hàng & Yêu thích toàn cục' },
                { en: 'Dynamic Product Filtering', vi: 'Lọc & Tìm kiếm động' },
                { en: 'Modern UI/UX with Toast', vi: 'Giao diện tương tác hiện đại' }
            ],
            projectDetail: [
                { 
                    type: 'text', 
                    en: 'Godaz is a modern e-commerce web application dedicated to showcasing and distributing traditional Vietnamese wooden handicrafts. It provides a seamless, intuitive, and fully responsive shopping experience.',
                    vi: 'Godaz là ứng dụng thương mại điện tử hiện đại, chuyên giới thiệu và phân phối các sản phẩm thủ công mỹ nghệ bằng gỗ truyền thống của Việt Nam. Hệ thống mang lại trải nghiệm mua sắm mượt mà, trực quan và tối ưu trên mọi thiết bị.'
                },
                { 
                    type: 'text', 
                    en: '🚀 Tech Stack: Next.js (App Router), TypeScript, Tailwind CSS, Zustand, Spring Boot 3, PostgreSQL, Redis, Elasticsearch, Kafka.',
                    vi: '🚀 Công nghệ chính: Next.js, TypeScript, Tailwind CSS, Zustand, Spring Boot 3, PostgreSQL, Redis, Elasticsearch, Kafka.'
                },
                { type: 'image', url: godazImage },
                { 
                    type: 'text', 
                    en: '🤖 AI Tools Used: Antigravity (Planning & Documentation), Claude (Frontend Coding & State Management), Codex (Code Review, Build Analysis & Debugging).',
                    vi: '🤖 Ứng dụng AI: Antigravity (Lên kiến trúc & Tài liệu), Claude (Code Frontend & Quản lý state), Codex (Review code, Phân tích lỗi & Kiểm thử).'
                }
            ],
            videoUrl: '',
            gallery: [godazImage]
        }
    },
    {
        id: 'fu-eresources',
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
        details: {
            features: [
                { en: 'Full-text Search with Elasticsearch', vi: 'Tìm kiếm toàn văn với Elasticsearch' },
                { en: 'Secure AWS S3 Storage', vi: 'Lưu trữ AWS S3 an toàn' },
                { en: 'User Permission Management', vi: 'Quản lý quyền người dùng' }
            ],
            projectDetail: [
                { 
                    type: 'text', 
                    en: 'Developed for FPT University to manage thousands of learning materials, including PDFs, videos, and source codes.',
                    vi: 'Được phát triển cho Đại học FPT để quản lý hàng ngàn tài liệu học tập, bao gồm PDF, video và mã nguồn.'
                },
                { type: 'image', url: fuImage }
            ],
            videoUrl: '',
            gallery: [fuImage]
        }
    },
    {
        id: 'zeng-sell',
        title: 'ZenG Sell Omnichannel Lite',
        description: {
            en: 'An AI-powered omnichannel sales solution with inventory management, analytics, and real-time synchronization.',
            vi: 'Giải pháp bán hàng đa kênh tích hợp AI, quản lý kho, phân tích và đồng bộ theo thời gian thực.',
        },
        imageUrl: zengImage,
        imageAlt: 'Omnichannel sales analytics dashboard',
        tags: ['Spring Boot', 'ReactJS', 'OpenAI', 'Kafka', 'Websocket', 'Kubernetes', 'AWS', 'Docker', 'PostgreSQL'],
        githubLink: 'https://github.com/Mrnobody102/zeng',
        liveLink: '',
        details: {
            features: [
                { en: 'AI Sales Analytics', vi: 'Phân tích bán hàng AI' },
                { en: 'Real-time Inventory Management', vi: 'Quản lý kho thời gian thực' },
                { en: 'Multi-platform Sync', vi: 'Đồng bộ đa nền tảng' }
            ],
            projectDetail: [
                { 
                    type: 'text', 
                    en: 'ZenG Sell leverages AI to predict inventory needs and suggests marketing strategies based on sales data.',
                    vi: 'ZenG Sell tận dụng AI để dự đoán nhu cầu tồn kho và đề xuất các chiến lược marketing dựa trên dữ liệu bán hàng.'
                },
                { type: 'image', url: zengImage }
            ],
            videoUrl: '',
            gallery: [zengImage]
        }
    },
];
