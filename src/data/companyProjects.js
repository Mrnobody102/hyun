export const companyProjects = [
    {
        name: 'Telecommunications Core Routing System',
        company: 'Viettel Hightech',
        duration: '03/2026 - 05/2026',
        position: { en: 'Onsite Developer', vi: 'Lập trình viên onsite' },
        description: {
            en: 'Optimized real-time communication flows and core business logic for a high-concurrency telecom system using Erlang and Java. Managed distributed data with Mnesia and MySQL, and simulated Linux environments to verify routing logic and fault tolerance.',
            vi: 'Tối ưu luồng giao tiếp thời gian thực và logic nghiệp vụ cốt lõi cho hệ thống viễn thông chịu tải cao bằng Erlang và Java. Quản lý dữ liệu phân tán với Mnesia và MySQL, đồng thời mô phỏng môi trường Linux để kiểm thử logic định tuyến và khả năng chịu lỗi.',
        },
        technologies: ['Erlang', 'Java', 'Quarkus', 'Mnesia', 'MySQL', 'Linux'],
    },
    {
        name: 'Honda Digital User Manual Redesign',
        company: 'FPT Software',
        duration: '02/2026 - 03/2026',
        position: { en: 'Developer', vi: 'Lập trình viên' },
        description: {
            en: "Modernized Honda's digital documentation platform with React.js, turning legacy manuals into a responsive and intuitive web experience that improves discoverability and usability.",
            vi: 'Hiện đại hóa nền tảng tài liệu số của Honda bằng React.js, chuyển các manual cũ sang trải nghiệm web trực quan, responsive và dễ tra cứu hơn.',
        },
        technologies: ['React.js', 'JavaScript', 'Tailwind CSS'],
    },
    {
        name: 'Project KPI Analytics Platform',
        company: 'FPT Software',
        duration: '01/2026 - 02/2026',
        position: { en: 'Developer', vi: 'Lập trình viên' },
        description: {
            en: 'Designed interactive Power BI dashboards and semantic models to monitor departmental KPIs in real time, with data preparation and transformation handled through Power Query and Data Lake integration.',
            vi: 'Thiết kế dashboard Power BI tương tác và semantic model để theo dõi KPI dự án theo thời gian thực, kết hợp Power Query và tích hợp Data Lake cho luồng dữ liệu.',
        },
        technologies: ['Power BI', 'DAX', 'Power Query', 'Data Lake Integration'],
    },
    {
        name: 'SecuxperDP',
        company: 'LG CNS',
        duration: '09/2025 - 12/2025',
        position: { en: 'Full-stack Developer', vi: 'Lập trình viên full-stack' },
        description: {
            en: 'Led the full-stack architecture for the LGCNS ecosystem, building core backend modules with Spring Boot and high-performance frontend interfaces with Next.js. Delivered user management, dynamic localization, and strong CI/CD quality gates.',
            vi: 'Dẫn dắt kiến trúc full-stack cho hệ sinh thái LGCNS, xây dựng các module backend cốt lõi bằng Spring Boot và giao diện hiệu năng cao với Next.js. Triển khai quản lý người dùng, đa ngôn ngữ động và quy trình kiểm soát chất lượng qua CI/CD.',
        },
        technologies: ['Java', 'Spring Boot', 'Next.js', 'PostgreSQL', 'MongoDB', 'Jenkins', 'SonarLint', 'Docker'],
    },
    {
        name: 'Smart Connect',
        company: 'LG CNS',
        duration: '04/2024 - 09/2025',
        position: { en: 'Developer', vi: 'Lập trình viên' },
        description: {
            en: 'Built a resilient middleware layer using Java and ActiveMQ to bridge web platforms with biometric authentication devices, enabling reliable real-time, bi-directional synchronization.',
            vi: 'Xây dựng middleware ổn định bằng Java và ActiveMQ để kết nối nền tảng web với thiết bị xác thực sinh trắc học, hỗ trợ đồng bộ hai chiều theo thời gian thực.',
        },
        technologies: ['Java', 'OSGi', 'ActiveMQ', 'Docker', 'Linux'],
    },
    {
        name: 'IDP Plus',
        company: 'LG CNS',
        duration: '12/2023 - 03/2024',
        position: { en: 'Developer', vi: 'Lập trình viên' },
        description: {
            en: "Developed scalable REST APIs with Spring Boot to manage LG Group's organizational data, including employee records and global facility information.",
            vi: 'Phát triển REST API có khả năng mở rộng bằng Spring Boot để quản lý dữ liệu tổ chức của LG Group, bao gồm hồ sơ nhân sự và cơ sở vật chất toàn cầu.',
        },
        technologies: ['Java', 'Spring Boot', 'Angular.js', 'PostgreSQL', 'MongoDB', 'Redis', 'Jenkins', 'SonarLint'],
    },
    {
        name: 'Camera AI Surveillance System',
        duration: '06/2025 - 05/2026',
        description: {
            en: 'Engineered a high-performance, real-time face recognition system for IP cameras using C++17, NVIDIA DeepStream, and Triton. Built a scalable RTSP processing pipeline with Kafka for event streaming, Qdrant for vector search, and Kubernetes for orchestration.',
            vi: 'Xây dựng hệ thống nhận diện khuôn mặt thời gian thực hiệu năng cao cho camera IP bằng C++17, NVIDIA DeepStream và Triton. Thiết kế pipeline xử lý RTSP có khả năng mở rộng với Kafka cho event streaming, Qdrant cho vector search và Kubernetes cho orchestration.',
        },
        technologies: ['C++17', 'NVIDIA DeepStream', 'Triton', 'Kafka', 'Qdrant', 'Docker', 'Kubernetes', 'Golang'],
    },
];
