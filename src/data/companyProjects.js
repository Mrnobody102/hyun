export const companyProjects = [
    {
        name: 'Camera AI Surveillance System',
        company: 'FPT Software',
        duration: '03/2025 – 02/2026',
        position: { en: 'C++/AI Backend Engineer', vi: 'Kỹ sư C++/AI Backend' },
        description: {
            en: 'Developed backend and real-time data components for an AI camera system involving face recognition, embedding-backed retrieval, and metadata streaming on NVIDIA GPU-based Linux servers.',
            vi: 'Phát triển backend và các thành phần dữ liệu thời gian thực cho hệ thống camera AI bao gồm nhận diện khuôn mặt, tìm kiếm embedding và truyền phát metadata trên máy chủ Linux chạy NVIDIA GPU.',
        },
        responsibilities: {
            en: [
                'Built real-time metadata ingestion and streaming pipelines using Kafka, Redis, and ZMQ to deliver recognition results and runtime status updates.',
                'Architected and deployed Qdrant vector database to store face embeddings, optimizing similarity search workflows for low-latency retrieval.',
                'Integrated Triton Inference Server and local fallback recognition paths for GPU-accelerated inference and retrieval flows.',
                'Developed C++17 video processing modules using NVIDIA DeepStream for continuous RTSP streams.',
                'Leveraged Claude with structured context to accelerate C++/Go development and debugging workflows.',
                'Debugged and deployed Docker-based services in Linux environments, focusing on reliability, runtime stability, and low-latency data flow.',
            ],
            vi: [
                'Xây dựng các pipeline thu thập và truyền phát metadata thời gian thực sử dụng Kafka, Redis và ZMQ để gửi kết quả nhận diện và cập nhật trạng thái runtime.',
                'Thiết kế và triển khai cơ sở dữ liệu vector Qdrant để lưu trữ embedding khuôn mặt, tối ưu hóa quy trình tìm kiếm tương đồng cho truy xuất độ trễ thấp.',
                'Tích hợp Triton Inference Server và các luồng nhận diện dự phòng cục bộ cho quy trình suy luận và truy xuất tăng tốc bằng GPU.',
                'Phát triển các module xử lý video C++17 sử dụng NVIDIA DeepStream cho các luồng RTSP liên tục.',
                'Tận dụng Claude với ngữ cảnh có cấu trúc để tăng tốc quy trình phát triển và gỡ lỗi C++/Go.',
                'Gỡ lỗi và triển khai các dịch vụ dựa trên Docker trong môi trường Linux, tập trung vào độ tin cậy, tính ổn định runtime và luồng dữ liệu độ trễ thấp.',
            ],
        },
        technologies: ['C++17', 'NVIDIA DeepStream', 'Triton', 'Kafka', 'Redis', 'Qdrant', 'Docker', 'Golang', 'ZMQ', 'Linux'],
    },
    {
        name: 'SecuxperDP',
        company: 'FPT Software – LG CNS Client Project',
        duration: '03/2023 – 05/2024',
        position: { en: 'Fullstack Developer', vi: 'Lập trình viên Fullstack' },
        description: {
            en: 'Contributed to an enterprise web platform, focusing on backend services, secured APIs, authentication, database integration, and frontend-backend workflows.',
            vi: 'Đóng góp vào một nền tảng web doanh nghiệp, tập trung vào các dịch vụ backend, API bảo mật, xác thực, tích hợp cơ sở dữ liệu và quy trình frontend-backend.',
        },
        responsibilities: {
            en: [
                'Developed Java Spring Boot services for user management, authentication, and secured RESTful APIs, supporting an enterprise platform with over 10,000 internal users.',
                'Designed JWT-based authentication and authorization flows.',
                'Worked with PostgreSQL and MongoDB for relational business data and configuration storage.',
                'Built NextJS frontend features and integrated them with backend APIs.',
            ],
            vi: [
                'Phát triển các dịch vụ Java Spring Boot để quản lý người dùng, xác thực và API RESTful bảo mật, hỗ trợ một nền tảng doanh nghiệp với hơn 10.000 người dùng nội bộ.',
                'Thiết kế các luồng xác thực và phân quyền dựa trên JWT.',
                'Làm việc với PostgreSQL và MongoDB cho dữ liệu nghiệp vụ quan hệ và lưu trữ cấu hình.',
                'Xây dựng các tính năng frontend NextJS và tích hợp với backend API.',
            ],
        },
        technologies: ['Java Spring Boot', 'NextJS', 'PostgreSQL', 'MongoDB', 'Jenkins', 'SonarLint', 'Docker', 'JWT'],
    },
    {
        name: 'Honda Digital User Manual',
        company: 'FPT Software – Honda Client Project',
        duration: '02/2026 – 03/2026',
        position: { en: 'Frontend Developer', vi: 'Lập trình viên Frontend' },
        description: {
            en: 'Rebuilt legacy digital manual pages into a responsive React-based interface. Developed NestJS APIs to serve structured documentation content and support frontend integration.',
            vi: 'Tái xây dựng các trang hướng dẫn sử dụng kỹ thuật số cũ thành giao diện dựa trên React responsive. Phát triển các API NestJS để cung cấp nội dung tài liệu có cấu trúc và hỗ trợ tích hợp frontend.',
        },
        responsibilities: {
            en: [
                'Rebuilt legacy digital manual pages into a responsive React-based interface.',
                'Developed NestJS APIs to serve structured documentation content and support frontend integration.',
            ],
            vi: [
                'Tái xây dựng các trang hướng dẫn sử dụng kỹ thuật số cũ thành giao diện dựa trên React responsive.',
                'Phát triển các API NestJS để cung cấp nội dung tài liệu có cấu trúc và hỗ trợ tích hợp frontend.',
            ],
        },
        technologies: ['ReactJS', 'NestJS', 'Tailwind CSS'],
    },
    {
        name: 'Project KPI Analytics Platform',
        company: 'FPT Software',
        duration: '01/2026 – 02/2026',
        position: { en: 'Data Analyst / BI Developer', vi: 'Nhà phân tích dữ liệu / Lập trình viên BI' },
        description: {
            en: 'Built Power BI dashboards, semantic models, and DAX measures to monitor departmental project KPIs.',
            vi: 'Xây dựng dashboard Power BI, mô hình ngữ nghĩa (semantic models) và các thước đo DAX để theo dõi KPI dự án của bộ phận.',
        },
        responsibilities: {
            en: [
                'Built Power BI dashboards, semantic models, and DAX measures to monitor departmental project KPIs.',
                'Integrated and transformed Data Lake sources with Power Query to support real-time reporting and performance analysis.',
            ],
            vi: [
                'Xây dựng dashboard Power BI, mô hình ngữ nghĩa và các thước đo DAX để theo dõi KPI dự án của bộ phận.',
                'Tích hợp và chuyển đổi các nguồn Data Lake với Power Query để hỗ trợ báo cáo thời gian thực và phân tích hiệu suất.',
            ],
        },
        technologies: ['Power BI', 'DAX', 'Power Query', 'Data Lake Integration'],
    },
    {
        name: 'Smart Connect',
        company: 'FPT Software – LG CNS Client Project',
        duration: '05/2024 – 03/2025',
        position: { en: 'Backend/Middleware Developer', vi: 'Lập trình viên Backend/Middleware' },
        description: {
            en: 'Built Java-based middleware services for integrating biometric authentication devices with enterprise platforms through asynchronous messaging and device event processing.',
            vi: 'Xây dựng các dịch vụ middleware dựa trên Java để tích hợp các thiết bị xác thực sinh trắc học với các nền tảng doanh nghiệp thông qua tin nhắn bất đồng bộ và xử lý sự kiện thiết bị.',
        },
        responsibilities: {
            en: [
                'Designed Java OSGi middleware modules to collect, normalize, and route biometric device events to enterprise systems.',
                'Implemented ActiveMQ-based asynchronous messaging flows, successfully handling 10,000+ daily authentication events across 50+ distributed biometric devices.',
                'Integrated native C++ libraries with Java services for biometric processing workflows.',
                'Debugged message routing, device synchronization, and deployment in Docker/Linux environments.',
            ],
            vi: [
                'Thiết kế các module middleware Java OSGi để thu thập, chuẩn hóa và định tuyến các sự kiện thiết bị sinh trắc học đến hệ thống doanh nghiệp.',
                'Triển khai các luồng tin nhắn bất đồng bộ dựa trên ActiveMQ, xử lý thành công hơn 10.000 sự kiện xác thực mỗi ngày trên hơn 50 thiết bị sinh trắc học phân tán.',
                'Tích hợp các thư viện C++ native với các dịch vụ Java cho quy trình xử lý sinh trắc học.',
                'Gỡ lỗi định tuyến tin nhắn, đồng bộ hóa thiết bị và triển khai trong môi trường Docker/Linux.',
            ],
        },
        technologies: ['Java', 'OSGi', 'ActiveMQ', 'C++ Native Library Integration', 'Docker', 'Linux'],
    },
    {
        name: 'Telecommunications Core Routing System',
        company: 'FPT Software – Viettel High Tech (Onsite)',
        duration: '02/2026 – 05/2026',
        position: { en: 'Backend Developer', vi: 'Lập trình viên Backend' },
        description: {
            en: 'Worked on a high-concurrency telecom core routing system for real-time communication flows and routing business logic.',
            vi: 'Làm việc trên hệ thống định tuyến lõi viễn thông có độ đồng thời cao cho các luồng giao tiếp thời gian thực và logic nghiệp vụ định tuyến.',
        },
        responsibilities: {
            en: [
                'Implemented and optimized routing business logic for real-time communication flows using Erlang and Java Quarkus.',
                'Managed distributed runtime data with Mnesia and persistent business data with MySQL.',
                'Simulated Linux-based testing environments to validate routing scenarios and fault-tolerance behavior.',
            ],
            vi: [
                'Triển khai và tối ưu hóa logic nghiệp vụ định tuyến cho các luồng giao tiếp thời gian thực bằng Erlang và Java Quarkus.',
                'Quản lý dữ liệu runtime phân tán với Mnesia và dữ liệu nghiệp vụ bền vững với MySQL.',
                'Mô phỏng môi trường thử nghiệm dựa trên Linux để xác thực các kịch bản định tuyến và hành vi chịu lỗi.',
            ],
        },
        technologies: ['Erlang', 'Java', 'Quarkus', 'Mnesia', 'MySQL', 'Linux'],
    },
];
