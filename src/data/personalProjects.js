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
        liveLink: '',
        details: {
            features: [
                { en: 'Multi-tenant Architecture', vi: 'Kiến trúc đa khách thuê' },
                { en: 'Custom Domain & White-labeling', vi: 'Tên miền tùy chỉnh & White-label' },
                { en: 'Course Authoring Tools', vi: 'Công cụ soạn thảo khóa học' },
                { en: 'Student Progress Tracking', vi: 'Theo dõi tiến độ học sinh' }
            ],
            projectDetail: [
                { 
                    type: 'text', 
                    en: 'This system is built to handle multiple independent schools on a single infrastructure. Each school can customize its own brand and domain.',
                    vi: 'Hệ thống được xây dựng để xử lý nhiều trường học độc lập trên một hạ tầng duy nhất. Mỗi trường có thể tùy chỉnh thương hiệu và tên miền riêng.'
                },
                { type: 'image', url: lmsImage },
                { 
                    type: 'text', 
                    en: 'We implemented a robust multi-tenant routing logic using Next.js middleware and PostgreSQL row-level security.',
                    vi: 'Chúng tôi đã triển khai logic định tuyến đa khách thuê mạnh mẽ bằng cách sử dụng middleware của Next.js và bảo mật cấp hàng (RLS) của PostgreSQL.'
                }
            ],
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
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
        tags: ['React 18', 'TypeScript', 'Tailwind CSS', 'Markdown', 'Mermaid.js', 'Vite'],
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
                    en: 'The app aims to bridge the knowledge gap for Vietnamese students in technical interviews at top tier companies.',
                    vi: 'Ứng dụng nhằm mục đích thu hẹp khoảng cách kiến thức cho sinh viên Việt Nam trong các buổi phỏng vấn kỹ thuật tại các công ty hàng đầu.'
                },
                { type: 'image', url: itInterviewImage },
                { 
                    type: 'text', 
                    en: 'It features a custom-built Markdown renderer that supports Mermaid diagrams and syntax highlighting for better technical visualization.',
                    vi: 'Nó tích hợp một trình dựng Markdown tùy chỉnh hỗ trợ biểu đồ Mermaid và highlight cú pháp để hình ảnh hóa kỹ thuật tốt hơn.'
                }
            ],
            videoUrl: '',
            gallery: [itInterviewImage, lmsImage]
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
        id: 'godaz-shop',
        title: 'goDaz shop',
        description: {
            en: 'A high-performance e-commerce platform built with microservices, secure transactions, and real-time search capabilities.',
            vi: 'Nền tảng thương mại điện tử hiệu năng cao với kiến trúc microservices, giao dịch an toàn và tìm kiếm thời gian thực.',
        },
        imageUrl: godazImage,
        imageAlt: 'Modern e-commerce dashboard interface',
        tags: ['NextJS', 'Spring Boot', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Kafka', 'Elasticsearch', 'AWS', 'Docker'],
        githubLink: 'https://github.com/Mrnobody102/godaz-client-nextjs',
        liveLink: 'https://godaz.shop/',
        details: {
            features: [
                { en: 'Microservices Architecture', vi: 'Kiến trúc Microservices' },
                { en: 'Real-time Order Sync', vi: 'Đồng bộ đơn hàng thời gian thực' },
                { en: 'Secure Payment Integration', vi: 'Tích hợp thanh toán an toàn' }
            ],
            projectDetail: [
                { 
                    type: 'text', 
                    en: 'Focused on scalability and reliability, the shop uses a distributed architecture to handle traffic spikes during sales events.',
                    vi: 'Tập trung vào khả năng mở rộng và độ tin cậy, cửa hàng sử dụng kiến trúc phân tán để xử lý lưu lượng truy cập đột biến.'
                },
                { type: 'image', url: godazImage }
            ],
            videoUrl: '',
            gallery: [godazImage]
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
