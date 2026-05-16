export const companyProjects = [
    {
        name: 'Camera AI Surveillance System',
        company: 'FPT Software',
        duration: '06/2025 – 01/2026',
        position: { en: 'C++/AI Backend Engineer', vi: 'Kỹ sư C++/AI Backend' },
        description: {
            en: 'Developed a real-time AI camera system for face recognition, face embedding search, metadata streaming on NVIDIA GPU-based Linux servers.',
            vi: 'Phát triển hệ thống camera AI thời gian thực để nhận diện khuôn mặt, tìm kiếm embedding khuôn mặt, truyền phát metadata trên máy chủ Linux chạy NVIDIA GPU.',
        },
        responsibilities: {
            en: [
                'Built C++17 video processing modules using NVIDIA DeepStream and GStreamer to process continuous RTSP camera streams in real time.',
                'Integrated Triton Inference Server and local fallback recognition paths for GPU-accelerated face recognition workflows.',
                'Built event and metadata streaming pipelines using Kafka, Redis, and ZMQ for recognition results and runtime status updates.',
                'Implemented lightweight video analytics logic based on detection/tracking inputs for server-side and edge-oriented deployment paths.',
                'Used Qdrant to store face embeddings, perform similarity search, and support identity matching.',
                'Debugged and deployed services in Docker-based Linux environments on NVIDIA GPU servers.',
            ],
            vi: [
                'Xây dựng các module xử lý video C++17 sử dụng NVIDIA DeepStream và GStreamer để xử lý các luồng camera RTSP liên tục trong thời gian thực.',
                'Tích hợp Triton Inference Server và các luồng nhận diện dự phòng cục bộ cho quy trình nhận diện khuôn mặt tăng tốc bằng GPU.',
                'Xây dựng các đường ống truyền phát sự kiện và metadata sử dụng Kafka, Redis và ZMQ cho kết quả nhận diện và cập nhật trạng thái runtime.',
                'Triển khai logic phân tích video nhẹ dựa trên đầu vào phát hiện/theo dõi cho các lộ trình triển khai server-side và edge-oriented.',
                'Sử dụng Qdrant để lưu trữ embedding khuôn mặt, thực hiện tìm kiếm tương đồng và hỗ trợ so khớp danh tính.',
                'Gỡ lỗi và triển khai các dịch vụ trong môi trường Linux dựa trên Docker trên máy chủ NVIDIA GPU.',
            ],
        },
        technologies: ['C++17', 'NVIDIA DeepStream', 'Triton', 'GStreamer', 'Kafka', 'Redis', 'Qdrant', 'Docker', 'Golang', 'Linux'],
    },
    {
        name: 'Smart Connect',
        company: 'FPT Software – LG CNS Client Project',
        duration: '05/2024 – 01/2025',
        position: { en: 'Backend/Middleware Developer', vi: 'Lập trình viên Backend/Middleware' },
        description: {
            en: 'Built Java-based middleware services for integrating biometric authentication devices, including facial recognition, fingerprint recognition with enterprise platforms through real-time messaging.',
            vi: 'Xây dựng các dịch vụ middleware dựa trên Java để tích hợp các thiết bị xác thực sinh trắc học, bao gồm nhận diện khuôn mặt, nhận diện vân tay với các nền tảng doanh nghiệp thông qua tin nhắn thời gian thực.',
        },
        responsibilities: {
            en: [
                'Designed middleware modules using Java OSGi to integrate biometric devices with enterprise systems.',
                'Implemented ActiveMQ-based asynchronous messaging for device events, authentication results, and status updates.',
                'Integrated native C++ libraries with Java services for biometric processing workflows.',
                'Debugged message routing, device synchronization, and deployment in Docker/Linux environments.',
            ],
            vi: [
                'Thiết kế các module middleware sử dụng Java OSGi để tích hợp các thiết bị sinh trắc học với hệ thống doanh nghiệp.',
                'Triển khai tin nhắn bất đồng bộ dựa trên ActiveMQ cho các sự kiện thiết bị, kết quả xác thực và cập nhật trạng thái.',
                'Tích hợp các thư viện C++ native với các dịch vụ Java cho quy trình xử lý sinh trắc học.',
                'Gỡ lỗi định tuyến tin nhắn, đồng bộ hóa thiết bị và triển khai trong môi trường Docker/Linux.',
            ],
        },
        technologies: ['Java', 'OSGi', 'ActiveMQ', 'C++ Native Library Integration', 'Docker', 'Linux'],
    },
    {
        name: 'Telecommunications Core Routing System',
        company: 'FPT Software – Viettel High Tech (Onsite)',
        duration: '03/2026 – 05/2026',
        position: { en: 'Backend Developer', vi: 'Lập trình viên Backend' },
        description: {
            en: 'Worked on a high-concurrency telecom core routing system for real-time communication flows and routing business logic.',
            vi: 'Làm việc trên hệ thống định tuyến lõi viễn thông có độ đồng thời cao cho các luồng giao tiếp thời gian thực và logic nghiệp vụ định tuyến.',
        },
        responsibilities: {
            en: [
                'Implemented and optimized routing business logic using Erlang and Java Quarkus.',
                'Managed distributed runtime data with Mnesia and persistent business data with MySQL.',
                'Simulated Linux-based testing environments to validate routing scenarios and fault-tolerance behavior.',
            ],
            vi: [
                'Triển khai và tối ưu hóa logic nghiệp vụ định tuyến bằng Erlang và Java Quarkus.',
                'Quản lý dữ liệu runtime phân tán với Mnesia và dữ liệu nghiệp vụ bền vững với MySQL.',
                'Mô phỏng môi trường thử nghiệm dựa trên Linux để xác thực các kịch bản định tuyến và hành vi chịu lỗi.',
            ],
        },
        technologies: ['Erlang', 'Java', 'Quarkus', 'Mnesia', 'MySQL', 'Linux'],
    },
    {
        name: 'SecuxperDP',
        company: 'FPT Software – LG CNS Client Project',
        duration: '01/2025 – 06/2025',
        position: { en: 'Fullstack Developer', vi: 'Lập trình viên Fullstack' },
        description: {
            en: 'Contributed to a full-stack enterprise platform, focusing on backend services, frontend interfaces, and authentication.',
            vi: 'Đóng góp vào nền tảng doanh nghiệp full-stack, tập trung vào các dịch vụ backend, giao diện frontend và xác thực.',
        },
        responsibilities: {
            en: [
                'Developed Java Spring Boot backend services, including user management and JWT authentication.',
                'Built Next.js frontend features and integrated secured RESTful APIs with role-based access control.',
                'Worked with PostgreSQL and MongoDB for relational business data and configuration storage.',
                'Supported CI/CD workflows with Jenkins, Docker, and SonarLint.',
            ],
            vi: [
                'Phát triển các dịch vụ backend Java Spring Boot, bao gồm quản lý người dùng và xác thực JWT.',
                'Xây dựng các tính năng frontend Next.js và tích hợp các API RESTful bảo mật với kiểm soát truy cập dựa trên vai trò.',
                'Làm việc với PostgreSQL và MongoDB cho dữ liệu nghiệp vụ quan hệ và lưu trữ cấu hình.',
                'Hỗ trợ quy trình CI/CD với Jenkins, Docker và SonarLint.',
            ],
        },
        technologies: ['Java Spring Boot', 'Next.js', 'PostgreSQL', 'MongoDB', 'Jenkins', 'SonarLint', 'Docker', 'JWT'],
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
        name: 'IDP Plus',
        company: 'FPT Software – LG CNS Client Project',
        duration: '12/2023 – 05/2024',
        position: { en: 'Fullstack Developer', vi: 'Lập trình viên Fullstack' },
        description: {
            en: 'Built internal enterprise features for employee and department data management.',
            vi: 'Xây dựng các tính năng doanh nghiệp nội bộ để quản lý dữ liệu nhân viên và phòng ban.',
        },
        responsibilities: {
            en: [
                'Built internal enterprise features for employee and department data management.',
                'Developed Java Spring Boot APIs and AngularJS admin interfaces.',
            ],
            vi: [
                'Xây dựng các tính năng doanh nghiệp nội bộ để quản lý dữ liệu nhân viên và phòng ban.',
                'Phát triển các API Java Spring Boot và giao diện quản trị AngularJS.',
            ],
        },
        technologies: ['Java Spring Boot', 'AngularJS', 'PostgreSQL', 'MongoDB', 'Redis', 'Jenkins', 'SonarLint'],
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
];
