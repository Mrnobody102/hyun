// ============================================
// FILE CẤU HÌNH THÔNG TIN CÁ NHÂN
// ============================================

// ============================================
// THÔNG TIN CÁ NHÂN
// ============================================
export const personalInfo = {
    fullName: {
        en: 'Phạm Quang Huy',
        vi: 'Phạm Quang Huy'
    },
    nickname: {
        en: 'Hyun',
        vi: 'Hyun'
    },
    title: {
        en: 'Full Stack Developer',
        vi: 'Lập trình viên Full Stack'
    },
    birthDate: {
        en: 'February 10, 2001',
        vi: '10/02/2001'
    },
    location: {
        en: 'Hanoi, Vietnam',
        vi: 'Hà Nội, Việt Nam'
    },
    experience: {
        en: '3+ Years',
        vi: 'Hơn 3 năm'
    },
    passion: {
        en: 'Oddly cute things 🤖 👻',
        vi: 'Những thứ kỳ quặc dễ thương 🤖 👻'
    },
    shortDescription: {
        en: 'Crafting innovative digital solutions with modern technologies. Passionate about creating seamless user experiences and scalable applications.',
        vi: 'Tạo ra các giải pháp số hiện đại với công nghệ mới. Đam mê xây dựng trải nghiệm mượt mà và hệ thống có thể mở rộng.'
    }
};

// ============================================
// THÔNG TIN LIÊN HỆ
// ============================================
export const contactInfo = {
    // Email chính
    email: 'huypq1801@gmail.com',
    
    // Số điện thoại
    phone: '0986865089',
    
    // Địa chỉ
    location: 'Hanoi, Vietnam',
    
    // Link các mạng xã hội
    social: {
        github: 'https://github.com/Mrnobody102',
        linkedin: 'https://www.linkedin.com/in/huypham102',
        facebook: 'https://www.facebook.com/antimarkzuckerberg/',
    }
};

// ============================================
// GIỚI THIỆU CHI TIẾT (About Section)
// ============================================
export const aboutMe = {
    paragraph1: {
        en: `Hi! I'm Phạm Quang Huy, a passionate Full Stack Developer with a love for creating elegant solutions to complex problems. I've dedicated myself to mastering the art of web development.`,
        vi: `Xin chào! Mình là Phạm Quang Huy, một lập trình viên Full Stack đam mê tạo ra những giải pháp tinh gọn cho bài toán phức tạp. Mình dành nhiều năm để trau dồi kỹ năng phát triển web.`
    },
    paragraph2: {
        en: `With expertise in both backend and frontend technologies, I specialize in building responsive, user-friendly applications that make a difference. My approach combines clean code, modern design principles, and a focus on performance.`,
        vi: `Thành thạo cả backend và frontend, mình tập trung xây dựng ứng dụng thân thiện, phản hồi nhanh và hữu ích. Phong cách làm việc là code sạch, thiết kế hiện đại và ưu tiên hiệu năng.`
    },
    paragraph3: {
        en: `When I’m not coding, I’m usually learning new technologies — because in this industry, stopping learning is basically choosing extinction.`,
        vi: `Khi không code, mình thường học công nghệ mới — vì trong ngành này, ngừng học nghĩa là tự loại mình ra cuộc chơi.`
    }
};

// ============================================
// KỸ NĂNG (Skills Section)
// ============================================
export const skills = {
    programmingLanguages: {
        title: { en: 'Programming Languages', vi: 'Ngôn ngữ lập trình' },
        skills: ['Java', 'JavaScript', 'TypeScript', 'HTML/CSS']
    },
    frameworks: {
        title: { en: 'Frameworks & Libraries', vi: 'Framework & Thư viện' },
        skills: ['Spring Boot', 'Java OSGi', 'ReactJS', 'NextJS', 'Angular']
    },
    database: {
        title: { en: 'Database', vi: 'Cơ sở dữ liệu' },
        skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'MSSQL']
    },
    cloudServices: {
        title: { en: 'Cloud Services', vi: 'Dịch vụ đám mây' },
        skills: ['AWS Services']
    },
    toolsDevOps: {
        title: { en: 'Tools & DevOps', vi: 'Công cụ & DevOps' },
        skills: ['Git', 'Docker', 'Jenkins', 'Kubernetes', 'SVN']
    },
    apiOS: {
        title: { en: 'API & OS', vi: 'API & Hệ điều hành' },
        skills: ['RESTful', 'GraphQL', 'Linux (Ubuntu/Rocky)', 'Windows']
    }
};

// ============================================
// DỰ ÁN CÁ NHÂN (Personal Projects)
// ============================================
export const personalProjects = [
    {
        title: 'goDaz shop',
        description: {
            en: 'A high-performance e-commerce platform built with a microservices architecture. Features comprehensive product management, secure transactions, and real-time search capabilities.',
            vi: 'Nền tảng thương mại điện tử hiệu năng cao với kiến trúc microservices. Quản lý sản phẩm toàn diện, giao dịch an toàn và tìm kiếm thời gian thực.'
        },
        
        // Link ảnh đại diện (có thể dùng URL từ Unsplash hoặc link ảnh của bạn)
        imageUrl: 'https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b',
        
        // Alt text cho ảnh
        imageAlt: 'Modern e-commerce dashboard interface',
        
        // Các công nghệ sử dụng
        tags: ['NextJS', 'Spring Boot', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Kafka', 'Elasticsearch', 'AWS', 'Docker'],
        
        // Link GitHub (để trống '' nếu không có)
        githubLink: '',
        
        // Link demo trực tiếp (để trống '' nếu không có)
        liveLink: 'https://godaz.shop/',
    },
    {
        title: 'ZenG Sell Omnichannel Lite',
        description: {
            en: 'An AI-powered omnichannel sales solution integrating inventory management, intelligent analytics, and real-time synchronization across multiple platforms.',
            vi: 'Giải pháp bán hàng đa kênh tích hợp AI, quản lý kho, phân tích thông minh và đồng bộ thời gian thực trên nhiều nền tảng.'
        },
        imageUrl: 'https://images.unsplash.com/photo-1686061594225-3e92c0cd51b0',
        imageAlt: 'Omnichannel sales analytics dashboard',
        tags: ['Spring Boot', 'ReactJS', 'OpenAI', 'Kafka', 'Websocket', 'Kubernetes', 'AWS', 'Docker', 'PostgreSQL'],
        githubLink: 'https://github.com/Mrnobody102/zeng',
        liveLink: 'https://zengsell.com',
    },
    {
        title: 'FPT University E-resources',
        description: {
            en: 'A centralized digital resource management system for university materials, optimized for fast search, secure storage, and efficient content delivery.',
            vi: 'Hệ thống quản lý tài nguyên số tập trung cho tài liệu đại học, tối ưu tìm kiếm nhanh, lưu trữ an toàn và phân phối hiệu quả.'
        },
        imageUrl: 'https://images.unsplash.com/photo-1701783645499-ff34730f6f91',
        imageAlt: 'Digital library search interface',
        tags: ['Spring Boot', 'MongoDB', 'Elasticsearch', 'Thymeleaf', 'AWS S3', 'Heroku', 'JavaScript'],
        githubLink: 'https://github.com/Mrnobody102/FU_E-resources',
        liveLink: '',
    },
    {
        title: 'Snapify AI',
        description: {
            en: 'A smart mobile application leveraging on-device machine learning for real-time image recognition, processing, and intelligent analysis.',
            vi: 'Ứng dụng di động thông minh sử dụng machine learning trên thiết bị để nhận diện hình ảnh, xử lý và phân tích thời gian thực.'
        },
        imageUrl: 'https://images.unsplash.com/photo-1675408944119-00e5e33aeb6a',
        imageAlt: 'AI mobile app interface scanning objects',
        tags: ['Kotlin', 'Flutter', 'Dart', 'TensorFlow Lite', 'OpenCV', 'Google ML Kit', 'SQLite'],
        githubLink: 'https://github.com/Mrnobody102/snapify',
        liveLink: '',
    }
];

// ============================================
// HỌC TẬP & KINH NGHIỆM (Education & Experience)
// ============================================
export const educationExperience = [
    {
        type: 'education',
        title: 'FPT University',
        subtitle: 'GPA 3.5/4',
        period: '09/2019 - 12/2023',
        color: 'from-amber-500 to-yellow-500',
        description: {
            en: 'Bachelor of Software Engineering',
            vi: 'Cử nhân Kỹ thuật Phần mềm'
        }
    },
    {
        type: 'internship',
        title: 'FPT Software Internship',
        subtitle: {
            en: '100% scholarship for Korean Bridge SE program',
            vi: 'Học bổng 100% chương trình Korean Bridge SE'
        },
        period: '09/2022 - 12/2022',
        color: 'from-slate-600 to-amber-500',
        description: {
            en: 'Selected for prestigious Korean language training program',
            vi: 'Được chọn tham gia chương trình đào tạo tiếng Hàn uy tín'
        }
    },
    {
        type: 'work',
        title: 'FPT Software',
        subtitle: 'Fresher + Fullstack Developer',
        period: '12/2022 - 02/2026',
        color: 'from-yellow-500 to-amber-600',
        description: {
            en: 'Full-stack development with modern technologies',
            vi: 'Phát triển full-stack với công nghệ hiện đại'
        }
    }
];

// ============================================
// BÀI VIẾT (Articles)
// ============================================
export const articles = [
    {
        id: 1,
        title: {
            en: 'Building Scalable Microservices with Spring Boot and Kafka',
            vi: 'Xây microservices mở rộng với Spring Boot và Kafka'
        },
        excerpt: {
            en: 'A comprehensive guide on designing and implementing microservices architecture using Spring Boot, with event-driven communication via Kafka for high-volume data processing.',
            vi: 'Hướng dẫn thiết kế và triển khai kiến trúc microservices với Spring Boot, giao tiếp sự kiện qua Kafka cho khối lượng dữ liệu lớn.'
        },
        author: {
            en: 'Phạm Quang Huy',
            vi: 'Phạm Quang Huy'
        },
        date: {
            en: 'Dec 15, 2024',
            vi: '15 Tháng 12, 2024'
        },
        category: {
            en: 'Backend',
            vi: 'Backend'
        },
        imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
        link: 'https://hand-somebody.vercel.app/articles/building-scalable-microservices-with-spring-boot-and-kafka'
    },
    {
        id: 2,
        title: {
            en: 'React Performance Optimization: From 5s to 1s Load Time',
            vi: 'Tối ưu hiệu năng React: tải từ 5s xuống 1s'
        },
        excerpt: {
            en: 'Practical techniques to optimize React applications including code splitting, lazy loading, memoization, and leveraging modern bundling tools for better performance.',
            vi: 'Các kỹ thuật tối ưu ứng dụng React: tách code, lazy load, memoization và tận dụng công cụ bundler hiện đại.'
        },
        author: {
            en: 'Phạm Quang Huy',
            vi: 'Phạm Quang Huy'
        },
        date: {
            en: 'Dec 10, 2024',
            vi: '10 Tháng 12, 2024'
        },
        category: {
            en: 'Frontend',
            vi: 'Frontend'
        },
        imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
        link: 'https://hand-somebody.vercel.app/articles/react-performance-optimization-from-5s-to-1s-load-time'
    },
    {
        id: 3,
        title: {
            en: 'Mastering PostgreSQL Indexing Strategies for Large Databases',
            vi: 'Làm chủ chiến lược index PostgreSQL cho CSDL lớn'
        },
        excerpt: {
            en: 'Deep dive into PostgreSQL indexing techniques, query optimization, and performance tuning strategies for handling millions of records efficiently.',
            vi: 'Đào sâu kỹ thuật index PostgreSQL, tối ưu truy vấn và tinh chỉnh hiệu năng cho hàng triệu bản ghi.'
        },
        author: {
            en: 'Phạm Quang Huy',
            vi: 'Phạm Quang Huy'
        },
        date: {
            en: 'Dec 5, 2024',
            vi: '05 Tháng 12, 2024'
        },
        category: {
            en: 'Database',
            vi: 'Cơ sở dữ liệu'
        },
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
        link: 'https://hand-somebody.vercel.app/articles/mastering-postgresql-indexing-strategies-for-large-databases'
    },
    {
        id: 4,
        title: {
            en: 'Docker & Kubernetes: Container Orchestration Best Practices',
            vi: 'Docker & Kubernetes: thực hành điều phối container'
        },
        excerpt: {
            en: 'Essential Docker and Kubernetes concepts, deployment strategies, and best practices for production-grade containerized applications and microservices.',
            vi: 'Những khái niệm cốt lõi và best practice triển khai Docker/Kubernetes cho ứng dụng và microservices production.'
        },
        author: {
            en: 'Phạm Quang Huy',
            vi: 'Phạm Quang Huy'
        },
        date: {
            en: 'Nov 28, 2024',
            vi: '28 Tháng 11, 2024'
        },
        category: {
            en: 'DevOps',
            vi: 'DevOps'
        },
        imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
        link: 'https://hand-somebody.vercel.app/articles/docker-and-kubernetes-container-orchestration-best-practices'
    },
    {
        id: 5,
        title: {
            en: 'Full Stack Development: Bridging Frontend and Backend Technologies',
            vi: 'Full Stack: kết nối Frontend và Backend'
        },
        excerpt: {
            en: 'Insights on becoming a proficient full-stack developer, understanding the entire application lifecycle, and best practices for seamless integration between frontend and backend.',
            vi: 'Góc nhìn để trở thành lập trình viên full-stack, hiểu vòng đời ứng dụng và tích hợp mượt mà giữa frontend/backend.'
        },
        author: {
            en: 'Phạm Quang Huy',
            vi: 'Phạm Quang Huy'
        },
        date: {
            en: 'Nov 20, 2024',
            vi: '20 Tháng 11, 2024'
        },
        category: {
            en: 'Full Stack',
            vi: 'Full Stack'
        },
        imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
        link: 'https://hand-somebody.vercel.app/articles/full-stack-development-bridging-frontend-and-backend-technologies'
    }
];

// ============================================
// CHỨNG CHỈ (Certifications)
// ============================================
export const certifications = [
    {
        // Tên chứng chỉ
        title: 'OCP Java SE 17 Developer',
        
        // Tổ chức cấp chứng chỉ
        issuer: 'Oracle',
        
        // Mã chứng chỉ
        code: '1Z0-829',
        
        // Ngày cấp (MM/YYYY)
        date: '10/2025',
        
        // Link xác thực chứng chỉ (để null nếu không có)
        link: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=6A1439665DEE5D9CD26E3D91EC8EE76427DD9A8533DE42D411750B087B48C344'
    },
    {
        title: 'TOPIK II - Level 4',
        issuer: 'NIIED',
        code: 'Korean Proficiency',
        date: '08/2024',
        link: null // Không có link xác thực
    }
];

// ============================================
// CẤU HÌNH FORMSPREE (Contact Form)
// ============================================
// Endpoint để gửi form liên hệ
export const formspreeEndpoint = 'https://formspree.io/f/mzdpjqby';
