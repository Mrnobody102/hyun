// Company projects data with bilingual descriptions
export const companyProjects = [
    {
        name: 'Internal Management System',
        duration: '01/2023 - 11/2023',
        teamSize: 10,
        position: 'Fullstack Developer',
        description: {
            en: 'Korean client internal management system featuring comprehensive user, language, settings, zone, and time management capabilities.',
            vi: 'Hệ thống quản lý nội bộ khách hàng Hàn Quốc với quản lý người dùng, ngôn ngữ, cài đặt, múi giờ toàn diện.'
        },
        responsibilities: {
            en: [
                'Developed React components and designed RESTful APIs.',
                'Implemented OAuth2/JWT authentication for secure access.',
                'Integrated caching, mail services, and file compression features.'
            ],
            vi: [
                'Phát triển React component và thiết kế RESTful API.',
                'Triển khai xác thực OAuth2/JWT cho truy cập an toàn.',
                'Tích hợp cache, dịch vụ email và nén file.'
            ]
        },
        technologies: ['Spring Boot', 'PostgreSQL', 'MongoDB', 'Redis', 'JavaScript', 'TypeScript', 'ReactJS', 'Jenkins', 'Docker', 'Git', 'ActiveMQ']
    },
    {
        name: 'Device-Web Server Bridge',
        duration: '11/2023 - 08/2024',
        teamSize: 4,
        position: 'Developer',
        description: {
            en: 'A critical bridge system connecting timekeeping devices with the web server, ensuring seamless data synchronization and device management.',
            vi: 'Hệ thống cầu nối quan trọng kết nối thiết bị chấm công với web server, đảm bảo đồng bộ dữ liệu và quản lý thiết bị liền mạch.'
        },
        responsibilities: {
            en: [
                'Designed project structure and handled network configuration.',
                'Implemented facial recognition module and C++ interface via JNA.',
                'Managed Ubuntu setup, user management, data sync, and error analysis.'
            ],
            vi: [
                'Thiết kế cấu trúc dự án và cấu hình mạng.',
                'Triển khai module nhận diện khuôn mặt và giao tiếp C++ qua JNA.',
                'Quản lý Ubuntu, người dùng, đồng bộ dữ liệu và phân tích lỗi.'
            ]
        },
        technologies: ['Java OSGi', 'MySQL', 'ActiveMQ', 'Linux', 'Docker', 'SVN', 'AWS', 'C++']
    },
    {
        name: 'Employee Management & Timekeeping Server',
        duration: '08/2024 - 04/2025',
        teamSize: 7,
        position: 'Full Stack Developer',
        description: {
            en: 'Web server component for the timekeeping system, managing employee authentication, working time, holidays, and connected devices.',
            vi: 'Thành phần web server cho hệ thống chấm công, quản lý xác thực nhân viên, giờ làm việc, ngày lễ và thiết bị kết nối.'
        },
        responsibilities: {
            en: [
                'Developed and integrated facial recognition module and error detection systems.',
                'Modified and optimized core business logic.',
                'Performed Angular framework upgrades and maintenance.'
            ],
            vi: [
                'Phát triển và tích hợp module nhận diện khuôn mặt và hệ thống phát hiện lỗi.',
                'Sửa đổi và tối ưu logic nghiệp vụ cốt lõi.',
                'Nâng cấp và bảo trì Angular framework.'
            ]
        },
        technologies: ['Spring Boot', 'PostgreSQL', 'MongoDB', 'Redis', 'JavaScript', 'TypeScript', 'Angular', 'Git', 'Jenkins', 'ActiveMQ']
    },
    {
        name: 'Document Management System',
        duration: '04/2025 - 11/2025',
        teamSize: 7,
        position: 'Frontend Developer',
        description: {
            en: 'Enterprise document management system facilitating efficient search, file management, uploading, and downloading of company documents.',
            vi: 'Hệ thống quản lý tài liệu doanh nghiệp hỗ trợ tìm kiếm, quản lý file, tải lên/xuống tài liệu công ty hiệu quả.'
        },
        responsibilities: {
            en: [
                'Provided critical feedback on UI design and user experience.',
                'Coded and optimized ReactJS components for the interface.',
                'Implemented Excel file processing and optimization features.'
            ],
            vi: [
                'Góp ý quan trọng về thiết kế UI và trải nghiệm người dùng.',
                'Lập trình và tối ưu ReactJS component cho giao diện.',
                'Triển khai xử lý file Excel và tính năng tối ưu hóa.'
            ]
        },
        technologies: ['Spring Boot', 'PostgreSQL', 'MongoDB', 'Redis', 'JavaScript', 'TypeScript', 'ReactJS', 'Jenkins', 'Docker', 'Git', 'Elasticsearch']
    },
    {
        name: 'Building Access Control System',
        duration: '04/2025 - 11/2025',
        teamSize: 7,
        position: 'Full Stack Developer',
        description: {
            en: 'Comprehensive building access control system managing entry permissions for people, objects, and vehicles.',
            vi: 'Hệ thống kiểm soát ra vào tòa nhà toàn diện quản lý quyền truy cập cho người, đồ vật và phương tiện.'
        },
        responsibilities: {
            en: [
                'Developed the vehicle access control interface and screens.',
                'Created technical documentation in English.',
                'Modified business logic and UI components; performed rigorous bug testing.'
            ],
            vi: [
                'Phát triển giao diện kiểm soát phương tiện và màn hình.',
                'Soạn tài liệu kỹ thuật bằng tiếng Anh.',
                'Sửa đổi logic nghiệp vụ và UI component; kiểm thử lỗi nghiêm ngặt.'
            ]
        },
        technologies: ['Spring Boot', 'PostgreSQL', 'MongoDB', 'Redis', 'JavaScript', 'TypeScript', 'ReactJS', 'Jenkins', 'Docker', 'Git']
    }
];
