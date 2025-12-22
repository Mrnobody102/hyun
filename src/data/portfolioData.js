// ============================================
// FILE CẤU HÌNH THÔNG TIN CÁ NHÂN
// ============================================

// ============================================
// THÔNG TIN CÁ NHÂN
// ============================================
export const personalInfo = {
    // Tên đầy đủ
    fullName: 'Phạm Quang Huy',
    
    // Tên thường dùng hoặc biệt danh
    nickname: 'Hyun',
    
    // Nghề nghiệp / Vị trí công việc
    title: 'Full Stack Developer',
    
    // Ngày sinh (định dạng: Month Day, Year)
    birthDate: 'February 10, 2001',
    
    // Địa điểm hiện tại
    location: 'Hanoi, Vietnam',
    
    // Số năm kinh nghiệm
    experience: '3+ Years',
    
    // Sở thích/đam mê
    passion: 'Oddly cute things 🤖 👻',
    
    // Mô tả ngắn về bản thân 
    shortDescription: 'Crafting innovative digital solutions with modern technologies. Passionate about creating seamless user experiences and scalable applications.',
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
    // Đoạn giới thiệu 1
    paragraph1: `Hi! I'm Phạm Quang Huy, a passionate Full Stack Developer with a love for creating elegant solutions to complex problems. I've dedicated myself to mastering the art of web development.`,
    
    // Đoạn giới thiệu 2
    paragraph2: `With expertise in both backend and frontend technologies, I specialize in building responsive, user-friendly applications that make a difference. My approach combines clean code, modern design principles, and a focus on performance.`,
    
    // Đoạn giới thiệu 3
    paragraph3: `When I’m not coding, I’m usually learning new technologies — because in this industry, stopping learning is basically choosing extinction.`,
};

// ============================================
// KỸ NĂNG (Skills Section)
// ============================================
export const skills = {
    programmingLanguages: {
        title: 'Programming Languages',
        skills: ['Java', 'JavaScript', 'TypeScript', 'HTML/CSS']
    },
    frameworks: {
        title: 'Frameworks',
        skills: ['Spring Boot', 'Java OSGi', 'ReactJS', 'NextJS', 'Angular']
    },
    database: {
        title: 'Database',
        skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'MSSQL']
    },
    cloudServices: {
        title: 'Cloud Services',
        skills: ['AWS Services']
    },
    toolsDevOps: {
        title: 'Tools & DevOps',
        skills: ['Git', 'Docker', 'Jenkins', 'Kubernetes', 'SVN']
    },
    apiOS: {
        title: 'API & OS',
        skills: ['RESTful', 'GraphQL', 'Linux (Ubuntu/Rocky)', 'Windows']
    }
};

// ============================================
// DỰ ÁN CÁ NHÂN (Personal Projects)
// ============================================
export const personalProjects = [
    {
        // Tên dự án
        title: 'goDaz shop',
        
        // Mô tả ngắn gọn về dự án
        description: 'A high-performance e-commerce platform built with a microservices architecture. Features comprehensive product management, secure transactions, and real-time search capabilities.',
        
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
        description: 'An AI-powered omnichannel sales solution integrating inventory management, intelligent analytics, and real-time synchronization across multiple platforms.',
        imageUrl: 'https://images.unsplash.com/photo-1686061594225-3e92c0cd51b0',
        imageAlt: 'Omnichannel sales analytics dashboard',
        tags: ['Spring Boot', 'ReactJS', 'OpenAI', 'Kafka', 'Websocket', 'Kubernetes', 'AWS', 'Docker', 'PostgreSQL'],
        githubLink: 'https://github.com/Mrnobody102/zeng',
        liveLink: 'https://zengsell.com',
    },
    {
        title: 'FPT University E-resources',
        description: 'A centralized digital resource management system for university materials, optimized for fast search, secure storage, and efficient content delivery.',
        imageUrl: 'https://images.unsplash.com/photo-1701783645499-ff34730f6f91',
        imageAlt: 'Digital library search interface',
        tags: ['Spring Boot', 'MongoDB', 'Elasticsearch', 'Thymeleaf', 'AWS S3', 'Heroku', 'JavaScript'],
        githubLink: 'https://github.com/Mrnobody102/FU_E-resources',
        liveLink: '',
    },
    {
        title: 'Snapify AI',
        description: 'A smart mobile application leveraging on-device machine learning for real-time image recognition, processing, and intelligent analysis.',
        imageUrl: 'https://images.unsplash.com/photo-1675408944119-00e5e33aeb6a',
        imageAlt: 'AI mobile app interface scanning objects',
        tags: ['Kotlin', 'Flutter', 'Dart', 'TensorFlow Lite', 'OpenCV', 'Google ML Kit', 'SQLite'],
        githubLink: 'https://github.com/Mrnobody102/snapify',
        liveLink: '',
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
// Tạo tài khoản miễn phí tại https://formspree.io/ và lấy endpoint
export const formspreeEndpoint = 'https://formspree.io/f/mzdpjqby';
