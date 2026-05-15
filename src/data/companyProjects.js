export const companyProjects = [
    {
        name: 'Camera AI Surveillance System',
        company: 'FPT Software',
        duration: '09/2025 – 03/2026',
        position: { en: 'C++/AI Backend Engineer', vi: 'Kỹ sư C++/AI Backend' },
        description: {
            en: 'Built a real-time AI camera surveillance system for face recognition, metadata streaming, and people counting on NVIDIA GPU server environments.',
            vi: 'Xây dựng hệ thống giám sát camera AI thời gian thực để nhận diện khuôn mặt, truyền phát dữ liệu metadata và đếm người trên môi trường máy chủ NVIDIA GPU.',
        },
        responsibilities: {
            en: [
                'Developed C++17 video processing modules with NVIDIA DeepStream to process continuous RTSP camera streams in real time.',
                'Integrated Triton Inference Server and local fallback recognition paths for GPU-accelerated face recognition workflows.',
                'Designed event/metadata streaming with Kafka, Redis, and ZMQ for recognition events and runtime status updates.',
                'Implemented people-counting logic with runtime-independent tracking inputs for server and edge deployment paths.',
                'Used Qdrant for face embedding storage, similarity search, and identity matching.',
                'Deployed the system with Docker-first workflows on Linux-based NVIDIA server environments.',
            ],
            vi: [
                'Phát triển các module xử lý video C++17 với NVIDIA DeepStream để xử lý luồng camera RTSP liên tục trong thời gian thực.',
                'Tích hợp Triton Inference Server và các luồng nhận diện dự phòng cục bộ cho quy trình nhận diện khuôn mặt tăng tốc bằng GPU.',
                'Thiết kế luồng truyền phát sự kiện/metadata với Kafka, Redis và ZMQ cho các sự kiện nhận diện và cập nhật trạng thái runtime.',
                'Triển khai logic đếm người với đầu vào theo dõi độc lập môi trường chạy cho các lộ trình triển khai server và edge.',
                'Sử dụng Qdrant để lưu trữ embedding khuôn mặt, tìm kiếm tương đồng và so khớp danh tính.',
                'Triển khai hệ thống với quy trình ưu tiên Docker trên môi trường máy chủ NVIDIA chạy Linux.',
            ],
        },
        technologies: ['C++17', 'NVIDIA DeepStream', 'Triton Inference Server', 'GStreamer', 'Kafka', 'Redis', 'ZMQ', 'Qdrant', 'Docker', 'Golang', 'Linux'],
    },
    {
        name: 'Smart Connect',
        company: 'FPT Software – LG CNS Client Project',
        duration: '04/2024 – 09/2025',
        position: { en: 'Backend/Middleware Developer', vi: 'Lập trình viên Backend/Middleware' },
        description: {
            en: 'Worked on a middleware system connecting enterprise platforms with biometric authentication (facial recognition, fingerprint/iris authentication…) devices via real-time messaging.',
            vi: 'Phát triển hệ thống middleware kết nối các nền tảng doanh nghiệp với các thiết bị xác thực sinh trắc học (nhận diện khuôn mặt, vân tay/mống mắt...) qua tin nhắn thời gian thực.',
        },
        responsibilities: {
            en: [
                'Built Java-based middleware modules using OSGi Framework to manage device integration.',
                'Implemented ActiveMQ queues for real-time event delivery and asynchronous processing.',
                'Developed integration logic for biometric device results and status updates.',
                'Containerized services in Docker/Linux for consistent deployment.',
                'Resolved issues related to message routing and device synchronization reliability.',
            ],
            vi: [
                'Xây dựng các module middleware dựa trên Java sử dụng OSGi Framework để quản lý việc tích hợp thiết bị.',
                'Triển khai các hàng đợi ActiveMQ để truyền tải sự kiện thời gian thực và xử lý bất đồng bộ.',
                'Phát triển logic tích hợp cho kết quả thiết bị sinh trắc học và cập nhật trạng thái.',
                'Container hóa các dịch vụ bằng Docker/Linux để triển khai nhất quán.',
                'Giải quyết các vấn đề liên quan đến định tuyến tin nhắn và độ tin cậy đồng bộ hóa thiết bị.',
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
            vi: 'Phát triển hệ thống định tuyến lõi viễn thông có độ đồng thời cao cho các luồng giao tiếp thời gian thực và logic nghiệp vụ định tuyến.',
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
                'Mô phỏng môi trường thử nghiệm trên Linux để xác thực các kịch bản định tuyến và hành vi chịu lỗi.',
            ],
        },
        technologies: ['Erlang', 'Java', 'Quarkus', 'Mnesia', 'MySQL', 'Linux'],
    },
    {
        name: 'SecuxperDP',
        company: 'FPT Software – LG CNS Client Project',
        duration: '09/2025 – 12/2025',
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
                'Xây dựng các tính năng frontend Next.js và tích hợp các API RESTful bảo mật với quản lý quyền dựa trên vai trò.',
                'Làm việc với PostgreSQL và MongoDB để lưu trữ dữ liệu nghiệp vụ quan hệ và cấu hình.',
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
                'Developed modular UI components for documentation pages.',
                'Designed NestJS controllers and services to handle dynamic content retrieval.',
            ],
            vi: [
                'Phát triển các thành phần giao diện module cho các trang tài liệu.',
                'Thiết kế các controller và service NestJS để xử lý việc truy xuất nội dung động.',
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
                'Implemented complex DAX measures for real-time KPI tracking.',
                'Integrated and transformed Data Lake sources with Power Query to support reporting and performance analysis.',
            ],
            vi: [
                'Triển khai các thước đo DAX phức tạp để theo dõi KPI thời gian thực.',
                'Tích hợp và chuyển đổi các nguồn Data Lake bằng Power Query để hỗ trợ báo cáo và phân tích hiệu suất.',
            ],
        },
        technologies: ['Power BI', 'DAX', 'Power Query', 'Data Lake Integration'],
    },
    {
        name: 'IDP Plus',
        company: 'FPT Software – LG CNS Client Project',
        duration: '12/2023 – 03/2024',
        position: { en: 'Fullstack Developer', vi: 'Lập trình viên Fullstack' },
        description: {
            en: 'Built internal enterprise features for employee and department data management.',
            vi: 'Xây dựng các tính năng doanh nghiệp nội bộ để quản lý dữ liệu nhân viên và phòng ban.',
        },
        responsibilities: {
            en: [
                'Developed Java Spring Boot RESTful APIs for administrative operations.',
                'Enhanced AngularJS admin interfaces for better data visibility and user management.',
            ],
            vi: [
                'Phát triển các API RESTful Java Spring Boot cho các hoạt động quản trị.',
                'Nâng cấp giao diện quản trị AngularJS để hiển thị dữ liệu và quản lý người dùng tốt hơn.',
            ],
        },
        technologies: ['Java Spring Boot', 'AngularJS', 'PostgreSQL', 'MongoDB', 'Redis', 'Jenkins', 'SonarLint'],
    },
];
