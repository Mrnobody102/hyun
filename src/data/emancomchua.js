// Nội dung trang "bí mật" /emancomchua — CV ứng tuyển vị trí Trợ lý Giám đốc.
// Toàn bộ chữ nghĩa của trang nằm ở đây, sửa thoải mái không cần đụng vào component.

export const profile = {
    name: 'Phạm Quang Huy',
    nickname: 'Hyun',
    position: 'TRỢ LÝ GIÁM ĐỐC',
    positionNote: 'Full-time · Không ngại OT cuối tuần',
    tagline: 'Em ăn cơm chưa? Đọc xong hồ sơ này mà vẫn chưa ăn thì anh mời.',
    facts: [
        { icon: '🎂', label: '25 tuổi' },
        { icon: '🏠', label: 'Quê Hải Phòng*' },
        { icon: '📍', label: 'Vinhomes Ocean Park' },
        { icon: '💼', label: 'Vingroup' },
    ],
    factNote: '*Nhưng đặc sản là bánh đậu xanh.',
};

// Thêm ảnh: bỏ file vào public/images/ rồi khai báo ở đây.
export const photos = [
    { src: '/images/emancomchua.jpg', caption: 'Ảnh hồ sơ ứng viên' },
];

export const reasons = [
    {
        icon: '⏰',
        title: 'Đúng giờ',
        desc: 'Hẹn mấy giờ có mặt giờ đấy, thói quen nghề nghiệp rồi.',
    },
    {
        icon: '💬',
        title: 'Nhắn tin có trước có sau',
        desc: 'Bận thì báo trước, xong việc nhắn lại, không có kiểu lặn mất tăm.',
    },
    {
        icon: '👂',
        title: 'Chịu khó lắng nghe',
        desc: 'Chuyện vui hay chuyện không đâu cũng nghe được, miễn là em kể.',
    },
    {
        icon: '🧘',
        title: 'Sống ổn định',
        desc: 'Công việc rõ ràng, sinh hoạt điều độ, cuối tuần vẫn còn sức đi chơi.',
    },
    {
        icon: '🏸',
        title: 'Kèo vui đều đặn',
        desc: 'Cầu lông mỗi tuần, du lịch mỗi quý, đi một mình mãi cũng chán.',
    },
    {
        icon: '🍵',
        title: 'Đặc sản tận nguồn',
        desc: 'Bánh đậu xanh quê anh, ăn thoải mái không giới hạn.',
    },
];

export const experiences = [
    {
        period: '2022 – nay',
        title: 'FPT · Viettel · Vingroup',
        role: 'Kỹ sư phần mềm',
        desc: 'Bốn năm đi làm nghiêm túc, chưa bỏ ngang chỗ nào.',
        color: '#FFD335',
    },
    {
        period: 'SẮP TỚI',
        title: 'Công ty của em',
        role: 'Trợ lý Giám đốc',
        desc: 'Vị trí duy nhất anh phải chủ động nộp hồ sơ. Hẹn phỏng vấn lúc nào cũng được.',
        color: '#FF6B9D',
    },
];

export const skills = [
    { name: 'Cầu lông', level: 90, note: 'Đánh đơn ổn, nhưng thích đánh đôi hơn.' },
    { name: 'Đọc sách', level: 85, note: 'Đọc tạp đủ thứ, lâu lâu vớ được chuyện hay để kể.' },
    { name: 'Nghe nhạc', level: 95, note: 'Playlist nghe là biết có gu, mà lên xe vẫn nhường em chọn nhạc.' },
    { name: 'Du lịch', level: 88, note: 'Thích lên kế hoạch đi đây đi đó, có người đi cùng thì càng vui.' },
    { name: 'Nấu cơm', level: 80, note: 'Hỏi "em ăn cơm chưa" xong là nấu thật chứ không hỏi chơi.' },
    { name: 'Trả lời tin nhắn', level: 99, note: 'Rep còn nhanh hơn rep sếp.' },
];

export const faqs = [
    {
        q: 'Quê Hải Phòng mà đặc sản là bánh đậu xanh?',
        a: 'Quê gốc anh Hải Dương, giờ sáp nhập về Hải Phòng rồi. Nên bánh đậu xanh vẫn là đặc sản quê, không sai được.',
    },
    {
        q: 'Làm Vingroup, ở Vinhomes, fan cứng à?',
        a: 'Không, chỉ là người có gu nhất quán. Chọn gì là gắn bó với cái đó, em cứ yên tâm.',
    },
    {
        q: 'Đang làm ổn định, sao còn đi nộp CV?',
        a: 'Thấy chỗ ưng thì nộp thôi, ngồi chờ được mời chắc đến Tết.',
    },
    {
        q: 'Facebook tên "antimarkzuckerberg" là sao?',
        a: 'Cạnh tranh lành mạnh với đối thủ cùng ngành thôi. Chuyện nhỏ.',
    },
];

export const contact = {
    instagram: 'https://www.instagram.com/hyun.k_102/',
    facebook: 'https://www.facebook.com/antimarkzuckerberg/',
};

export const marqueeText = 'EM ĂN CƠM CHƯA? 🍚 CHƯA THÌ ĐI ĂN VỚI ANH NHÉ · ';
