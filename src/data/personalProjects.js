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
            en: 'A SaaS-style multi-portal LMS built with Turborepo, offering student, admin, course creator, super portal, and sales experiences on a shared, tenant-aware platform.',
            vi: 'Nền tảng LMS SaaS đa cổng, xây dựng bằng Turborepo, cung cấp trải nghiệm Học viên, Quản trị, Người tạo khóa, Super Portal và Sales trên cùng một hệ thống đa người thuê.',
        },
        imageUrl: lmsImage,
        imageAlt: 'LMS Platform dashboards and learning experience',
        tags: ['Turborepo', 'Next.js 16', 'NestJS', 'Prisma', 'PostgreSQL', 'Docker', 'Multi-tenancy', 'SaaS'],
        githubLink: 'https://github.com/Mrnobody102/lms',
        liveLink: 'https://student.studywithsudo.com/',
        demoLinks: [
            { name: { en: 'Student Web App', vi: 'Web Học Viên' }, url: 'https://student.studywithsudo.com/' },
            { name: { en: 'Admin / Course Creator Dashboard', vi: 'Dashboard Admin / Course Creator' }, url: 'http://admin.studywithsudo.com/' },
            { name: { en: 'Super Portal Dashboard', vi: 'Dashboard Super Portal' }, url: 'https://portal.studywithsudo.com/' },
            { name: { en: 'Sales Portal', vi: 'Portal Sales' }, url: 'https://sales.studywithsudo.com/' }
        ],
        details: {
            features: [
                { en: 'Four Next.js client portals with centralized NestJS API', vi: '4 cổng Next.js với API NestJS tập trung' },
                { en: 'Shared database multi-tenancy with tenant-aware access control', vi: 'Multi-tenancy dùng chung database với kiểm soát truy cập theo tenant' },
                { en: 'AI-powered tutor, mistake analysis, and roleplay learning flows', vi: 'Tích hợp AI trợ giảng, phân tích lỗi và mô phỏng nhập vai' },
                { en: 'Curriculum management, timed exams, and student dashboards', vi: 'Quản lý chương trình, thi theo giờ và dashboard học viên' }
            ],
            projectDetail: [
                {
                    type: 'text',
                    en: 'Built and deployed a SaaS-style LMS ecosystem using Turborepo, with 4 Next.js client portals backed by a centralized NestJS REST API.',
                    vi: 'Xây dựng và triển khai hệ sinh thái LMS theo kiểu SaaS bằng Turborepo, gồm 4 cổng Next.js do một API NestJS tập trung hỗ trợ.'
                },
                {
                    type: 'text',
                    en: 'Designed a shared-database multi-tenancy model using PostgreSQL and Prisma, with role-based access control and tenant-aware data access across student, admin, course creator, super portal, and sales domains.',
                    vi: 'Thiết kế mô hình multi-tenancy dùng chung database với PostgreSQL và Prisma, hỗ trợ phân quyền role-based và truy cập dữ liệu theo tenant cho học viên, quản trị, người tạo khóa, super portal và sales.'
                },
                { type: 'image', url: lmsImage },
                {
                    type: 'text',
                    en: 'Implemented core e-learning features such as curriculum management, timed exams, student dashboards, and spaced repetition learning flows.',
                    vi: 'Triển khai các tính năng e-learning cốt lõi như quản lý chương trình, thi theo giờ, bảng điều khiển học viên và lộ trình ôn tập cách quãng.'
                },
                {
                    type: 'text',
                    en: 'Integrated AI-powered learning features, including an in-context AI tutor for mistake analysis and AI conversation roleplay for student practice.',
                    vi: 'Tích hợp các tính năng học tập hỗ trợ AI, bao gồm trợ giảng AI phân tích lỗi và nhập vai đối thoại AI cho học viên thực hành.'
                },
                {
                    type: 'text',
                    en: 'Demo accounts are available for Student, Admin, Course Creator, and Super Portal users to validate workflows across each portal.',
                    vi: 'Cung cấp tài khoản demo cho Học viên, Admin, Course Creator và Super Portal để kiểm tra luồng nghiệp vụ của từng cổng.'
                },
                {
                    type: 'text',
                    en: '🚀 Tech Stack: Turborepo, Next.js 16, NestJS, Prisma, PostgreSQL, Tailwind CSS, Docker.',
                    vi: '🚀 Công nghệ: Turborepo, Next.js 16, NestJS, Prisma, PostgreSQL, Tailwind CSS, Docker.'
                }
            ],
            gallery: [lmsImage]
        }
    },

    {
        id: 'it-interview-prep',
        title: 'IT Interview Preparation App',
        description: {
            en: 'A responsive web app for software engineers to browse, organize, and review technical interview questions with AI-powered support.',
            vi: 'Ứng dụng web phản hồi cao cho kỹ sư phần mềm duyệt, sắp xếp và ôn luyện câu hỏi phỏng vấn kỹ thuật với trợ giúp AI.',
        },
        imageUrl: itInterviewImage,
        imageAlt: 'IT Interview Preparation App Interface',
        tags: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'LLM API'],
        githubLink: 'https://github.com/Mrnobody102/it-interview-prep',
        liveLink: 'https://it-interview-prep.vercel.app/',
        details: {
            features: [
                { en: 'Bilingual Content (EN/VI)', vi: 'Nội dung song ngữ (Anh/Việt)' },
                { en: 'AI-powered chat assistant for context-aware explanations', vi: 'Trợ lý chat AI giải thích theo ngữ cảnh' },
                { en: 'Interactive Markdown and system design review tools', vi: 'Công cụ Markdown và đánh giá thiết kế hệ thống tương tác' },
                { en: 'Responsive UI optimized for fast study sessions', vi: 'Giao diện responsive tối ưu cho học nhanh' }
            ],
            projectDetail: [
                {
                    type: 'text',
                    en: 'Developed a responsive web app for software engineers to browse, organize, and review technical interview questions.',
                    vi: 'Phát triển ứng dụng web responsive cho kỹ sư phần mềm duyệt, sắp xếp và ôn luyện câu hỏi phỏng vấn kỹ thuật.'
                },
                {
                    type: 'text',
                    en: 'Integrated an AI chatbot using LLM APIs to answer context-specific questions and provide instant explanations.',
                    vi: 'Tích hợp chatbot AI sử dụng API LLM để trả lời câu hỏi theo ngữ cảnh và cung cấp giải thích ngay lập tức.'
                },
                { type: 'image', url: itInterviewImage },
                {
                    type: 'text',
                    en: '🚀 Tech Stack: React 18, TypeScript, Vite, Tailwind CSS, LLM API.',
                    vi: '🚀 Công nghệ: React 18, TypeScript, Vite, Tailwind CSS, LLM API.'
                }
            ],
            gallery: [itInterviewImage, lmsImage]
        }
    },
    {
        id: 'godaz-shop',
        title: 'Godaz Shop',
        description: {
            en: 'An e-commerce MVP with a responsive Next.js storefront and a Spring Boot backend for secure orders, search, and asynchronous processing.',
            vi: 'MVP thương mại điện tử với giao diện Next.js responsive và backend Spring Boot cho đơn hàng an toàn, tìm kiếm và xử lý bất đồng bộ.',
        },
        imageUrl: godazImage,
        imageAlt: 'Modern e-commerce dashboard interface',
        tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Spring Boot', 'PostgreSQL', 'MongoDB', 'Redis', 'Kafka', 'Elasticsearch'],
        githubLink: 'https://github.com/Mrnobody102/godaz-client-nextjs',
        liveLink: 'https://godaz.shop/',
        details: {
            features: [
                { en: 'Responsive storefront with cart and checkout flows', vi: 'Giao diện responsive với giỏ hàng và quy trình thanh toán' },
                { en: 'Spring Boot API with secure authentication', vi: 'API Spring Boot với xác thực an toàn' },
                { en: 'Elasticsearch product search and Redis session support', vi: 'Tìm kiếm sản phẩm bằng Elasticsearch và hỗ trợ session Redis' },
                { en: 'Asynchronous order tracking using Kafka', vi: 'Theo dõi đơn hàng bất đồng bộ bằng Kafka' }
            ],
            projectDetail: [
                {
                    type: 'text',
                    en: 'Built and deployed an e-commerce MVP with authentication, product catalog, cart management, checkout, and order processing.',
                    vi: 'Xây dựng và triển khai MVP thương mại điện tử với xác thực, danh mục sản phẩm, quản lý giỏ hàng, thanh toán và xử lý đơn hàng.'
                },
                {
                    type: 'text',
                    en: 'Developed a secure RESTful API with Spring Boot and integrated it with a responsive Next.js frontend.',
                    vi: 'Phát triển API RESTful bảo mật với Spring Boot và tích hợp cùng frontend Next.js responsive.'
                },
                { type: 'image', url: godazImage },
                {
                    type: 'text',
                    en: 'Implemented product search with Elasticsearch, cart/session support with Redis, and asynchronous order tracking with Kafka.',
                    vi: 'Triển khai tìm kiếm sản phẩm với Elasticsearch, hỗ trợ giỏ hàng/session qua Redis và theo dõi đơn hàng bất đồng bộ với Kafka.'
                }
            ],
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
