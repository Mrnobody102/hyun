import springBootKafkaImage from '../assets/articles/spring-boot-kafka.png';
import reactPerformanceImage from '../assets/articles/react-performance.png';
import postgresIndexingImage from '../assets/articles/postgres-indexing.png';
import dockerKubernetesImage from '../assets/articles/docker-kubernetes.png';
import fullstackBridgingImage from '../assets/articles/fullstack-bridging.png';
import cameraAiOptimizationImage from '../assets/articles/camera-ai-optimization.png';

export const articles = [
    {
        id: 6,
        slug: 'camera-ai-optimization-deepstream-nvbufsurface',
        title: {
            en: 'Real-Time Camera AI: Solving Streaming Thread Bottlenecks in Production',
            vi: 'Hệ Thống Camera AI Thời Gian Thực: Giải Quyết Nghẽn Luồng (Bottleneck) Trong Thực Tế',
        },
        excerpt: {
            en: 'How we optimized a real-time face recognition and people counting system using C++ DeepStream, GPU-accelerated cropping via NvBufSurface, and asynchronous thread pools to maintain 30 FPS.',
            vi: 'Cách tối ưu hệ thống nhận diện khuôn mặt và đếm người thời gian thực bằng C++ DeepStream, GPU crop (NvBufSurface) và Async Thread Pool để duy trì 30 FPS ổn định.',
        },
        author: {
            en: 'Phạm Quang Huy',
            vi: 'Phạm Quang Huy',
        },
        date: {
            en: 'May 18, 2026',
            vi: '18 Tháng 5, 2026',
        },
        category: {
            en: 'Computer Vision',
            vi: 'Computer Vision',
        },
        imageUrl: cameraAiOptimizationImage,
    },
    {
        id: 1,
        slug: 'building-scalable-microservices-with-spring-boot-and-kafka',
        title: {
            en: 'Building Scalable Microservices with Spring Boot and Kafka',
            vi: 'Xây dựng microservices mở rộng với Spring Boot và Kafka',
        },
        excerpt: {
            en: 'A practical guide to designing microservices with Spring Boot and event-driven communication through Kafka.',
            vi: 'Hướng dẫn thực tế để thiết kế microservices với Spring Boot và giao tiếp hướng sự kiện bằng Kafka.',
        },
        author: {
            en: 'Phạm Quang Huy',
            vi: 'Phạm Quang Huy',
        },
        date: {
            en: 'Dec 15, 2024',
            vi: '15 Tháng 12, 2024',
        },
        category: {
            en: 'Backend',
            vi: 'Backend',
        },
        imageUrl: springBootKafkaImage,
    },
    {
        id: 2,
        slug: 'react-performance-optimization-from-5s-to-1s-load-time',
        title: {
            en: 'React Performance Optimization: From 5s to 1s Load Time',
            vi: 'Tối ưu hiệu năng React: từ 5s xuống 1s',
        },
        excerpt: {
            en: 'Practical techniques to improve React performance with code splitting, lazy loading, and smarter rendering.',
            vi: 'Các kỹ thuật thực tế để tối ưu React bằng code splitting, lazy loading và giảm render thừa.',
        },
        author: {
            en: 'Phạm Quang Huy',
            vi: 'Phạm Quang Huy',
        },
        date: {
            en: 'Dec 10, 2024',
            vi: '10 Tháng 12, 2024',
        },
        category: {
            en: 'Frontend',
            vi: 'Frontend',
        },
        imageUrl: reactPerformanceImage,
    },
    {
        id: 3,
        slug: 'mastering-postgresql-indexing-strategies-for-large-databases',
        title: {
            en: 'Mastering PostgreSQL Indexing Strategies for Large Databases',
            vi: 'Làm chủ chiến lược index PostgreSQL cho dữ liệu lớn',
        },
        excerpt: {
            en: 'Indexing, query optimization, and tuning strategies for PostgreSQL systems handling millions of records.',
            vi: 'Indexing, tối ưu truy vấn và chiến lược tuning cho PostgreSQL xử lý hàng triệu bản ghi.',
        },
        author: {
            en: 'Phạm Quang Huy',
            vi: 'Phạm Quang Huy',
        },
        date: {
            en: 'Dec 5, 2024',
            vi: '05 Tháng 12, 2024',
        },
        category: {
            en: 'Database',
            vi: 'Cơ sở dữ liệu',
        },
        imageUrl: postgresIndexingImage,
    },
    {
        id: 4,
        slug: 'docker-and-kubernetes-container-orchestration-best-practices',
        title: {
            en: 'Docker & Kubernetes: Container Orchestration Best Practices',
            vi: 'Docker & Kubernetes: thực hành điều phối container hiệu quả',
        },
        excerpt: {
            en: 'Core concepts and production best practices for Docker and Kubernetes deployments.',
            vi: 'Các khái niệm cốt lõi và best practice production cho triển khai Docker và Kubernetes.',
        },
        author: {
            en: 'Phạm Quang Huy',
            vi: 'Phạm Quang Huy',
        },
        date: {
            en: 'Nov 28, 2024',
            vi: '28 Tháng 11, 2024',
        },
        category: {
            en: 'DevOps',
            vi: 'DevOps',
        },
        imageUrl: dockerKubernetesImage,
    },
    {
        id: 5,
        slug: 'full-stack-development-bridging-frontend-and-backend-technologies',
        title: {
            en: 'Full Stack Development: Bridging Frontend and Backend Technologies',
            vi: 'Full Stack: kết nối frontend và backend',
        },
        excerpt: {
            en: 'Thoughts on becoming a stronger full-stack developer and building smoother frontend-backend integration.',
            vi: 'Góc nhìn để trở thành full-stack developer tốt hơn và kết nối frontend-backend mượt hơn.',
        },
        author: {
            en: 'Phạm Quang Huy',
            vi: 'Phạm Quang Huy',
        },
        date: {
            en: 'Nov 20, 2024',
            vi: '20 Tháng 11, 2024',
        },
        category: {
            en: 'Full Stack',
            vi: 'Full Stack',
        },
        imageUrl: fullstackBridgingImage,
    },
];
