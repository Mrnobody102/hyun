import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
    profile,
    photos,
    reasons,
    experiences,
    skills,
    faqs,
    contact,
    marqueeText,
} from '@/data/emancomchua';

const FONT_STACK = "'Be Vietnam Pro', 'Inter', system-ui, sans-serif";

const cardBase = 'border-[3px] border-black bg-white shadow-[6px_6px_0_0_#000]';

const fadeUp = {
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.5, ease: 'easeOut' },
};

function Sticker({ children, className = '', rotate = -3 }) {
    return (
        <motion.span
            whileHover={{ rotate: rotate * -1.5, scale: 1.06 }}
            style={{ rotate }}
            className={`inline-block border-[3px] border-black px-3 py-1 text-xs font-extrabold uppercase tracking-widest shadow-[3px_3px_0_0_#000] ${className}`}
        >
            {children}
        </motion.span>
    );
}

function SectionTitle({ sticker, stickerColor, title }) {
    return (
        <motion.div {...fadeUp} className="mb-8 text-center">
            <Sticker className={stickerColor}>{sticker}</Sticker>
            <h2 className="mt-4 text-3xl font-black uppercase leading-tight sm:text-4xl">{title}</h2>
        </motion.div>
    );
}

function Marquee() {
    const strip = marqueeText.repeat(4);
    return (
        <div className="-rotate-1 overflow-hidden border-y-[3px] border-black bg-black py-2">
            <div className="ecc-marquee flex whitespace-nowrap">
                <span className="text-sm font-extrabold uppercase tracking-widest text-[#FFD335]">{strip}</span>
                <span className="text-sm font-extrabold uppercase tracking-widest text-[#FFD335]" aria-hidden="true">{strip}</span>
            </div>
        </div>
    );
}

function PhotoWall() {
    if (photos.length === 0) {
        return (
            <motion.div
                {...fadeUp}
                whileHover={{ rotate: 0 }}
                style={{ rotate: 3 }}
                className={`${cardBase} mx-auto w-64 rounded-sm p-3 pb-5 sm:w-72`}
            >
                <div className="flex aspect-[3/4] items-center justify-center border-[3px] border-dashed border-black bg-[#FFF3E4]">
                    <p className="px-4 text-center text-sm font-bold leading-snug">Ảnh hồ sơ đang được cập nhật</p>
                </div>
                <p className="mt-3 text-center text-sm font-bold">Hyun, 25</p>
            </motion.div>
        );
    }

    return (
        <div className="flex flex-wrap items-start justify-center gap-6">
            {photos.map((photo, i) => (
                <motion.figure
                    key={photo.src}
                    {...fadeUp}
                    whileHover={{ rotate: 0, scale: 1.03 }}
                    style={{ rotate: i % 2 === 0 ? 3 : -3 }}
                    className={`${cardBase} w-56 rounded-sm p-3 pb-4 sm:w-64`}
                >
                    <img src={photo.src} alt={photo.caption || 'Ảnh chính chủ'} className="aspect-[3/4] w-full border-[3px] border-black object-cover" />
                    {photo.caption && <figcaption className="mt-3 text-center text-sm font-bold">{photo.caption}</figcaption>}
                </motion.figure>
            ))}
        </div>
    );
}

function RejectButton() {
    const btnRef = useRef(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const lastDodgeAt = useRef(0);

    // Nút để pointer-events-none nên không thể bấm trúng; thay vào đó theo dõi
    // tọa độ con trỏ toàn trang và né ngay khi con trỏ đến gần mép nút.
    useEffect(() => {
        const onPointer = (e) => {
            const box = btnRef.current?.getBoundingClientRect();
            if (!box) return;
            const dx = Math.max(box.left - e.clientX, 0, e.clientX - box.right);
            const dy = Math.max(box.top - e.clientY, 0, e.clientY - box.bottom);
            if (Math.hypot(dx, dy) > 30) return;

            const now = Date.now();
            if (now - lastDodgeAt.current < 150) return;
            lastDodgeAt.current = now;

            setOffset((prev) => {
                const rangeX = window.innerWidth < 640 ? 90 : 170;
                const rangeY = 50;
                // Vị trí mới phải cách vị trí cũ đủ xa để thoát hẳn khỏi vùng con trỏ
                let next;
                let attempts = 0;
                do {
                    next = {
                        x: (Math.random() - 0.5) * 2 * rangeX,
                        y: (Math.random() - 0.5) * 2 * rangeY,
                    };
                    attempts += 1;
                } while (Math.hypot(next.x - prev.x, next.y - prev.y) < 140 && attempts < 30);
                return next;
            });
        };

        window.addEventListener('pointermove', onPointer);
        window.addEventListener('pointerdown', onPointer);
        return () => {
            window.removeEventListener('pointermove', onPointer);
            window.removeEventListener('pointerdown', onPointer);
        };
    }, []);

    return (
        <div className="relative flex min-h-[110px] flex-col items-center justify-center">
            <motion.button
                ref={btnRef}
                type="button"
                tabIndex={-1}
                animate={{ x: offset.x, y: offset.y }}
                transition={{ type: 'spring', stiffness: 900, damping: 30 }}
                className="pointer-events-none border-[3px] border-black bg-white px-6 py-3 text-sm font-extrabold uppercase tracking-wider text-black shadow-[4px_4px_0_0_#FFD335]"
            >
                Từ chối hồ sơ
            </motion.button>
        </div>
    );
}

export default function EmAnComChua() {
    return (
        <div
            className="min-h-screen overflow-x-hidden bg-[#FFF3E4] text-black selection:bg-[#FF6B9D] selection:text-white"
            style={{
                fontFamily: FONT_STACK,
                backgroundImage: 'radial-gradient(rgba(0,0,0,0.08) 1.5px, transparent 1.5px)',
                backgroundSize: '24px 24px',
            }}
        >
            <Helmet>
                <title>Em ăn cơm chưa? 🍚 | Hồ sơ đặc biệt</title>
                <meta name="robots" content="noindex, nofollow" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700;800;900&display=swap"
                    rel="stylesheet"
                />
            </Helmet>

            <style>{`
                @keyframes ecc-marquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .ecc-marquee { animation: ecc-marquee 30s linear infinite; }
            `}</style>

            {/* Top strip */}
            <div className="border-b-[3px] border-black bg-[#FF6B9D] py-2 text-center text-xs font-extrabold uppercase tracking-[0.2em] text-white">
                Hồ sơ ứng tuyển · Vị trí: Trợ lý Giám đốc
            </div>

            {/* ===== HERO ===== */}
            <header className="mx-auto max-w-5xl px-5 pb-12 pt-10 sm:pt-14">
                <div className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr]">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: -16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-wrap gap-3"
                        >
                            <Sticker className="bg-[#FFD335]">Hồ sơ ứng tuyển #001</Sticker>
                            <Sticker className="bg-[#7DE2D1]" rotate={2}>Open to love</Sticker>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="mt-6 text-5xl font-black uppercase leading-none sm:text-6xl"
                        >
                            {profile.nickname}
                            <span className="block text-xl font-extrabold normal-case tracking-wide text-black/60 sm:text-2xl">
                                ({profile.name})
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mt-5 text-lg font-bold sm:text-xl"
                        >
                            Vị trí ứng tuyển:{' '}
                            <mark className="bg-[#FF6B9D] px-2 py-0.5 text-white">{profile.position}</mark>
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-2 text-sm font-semibold text-black/60"
                        >
                            {profile.positionNote}
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.35 }}
                            className={`${cardBase} mt-6 inline-block rounded-xl bg-[#FFD335] px-5 py-4 text-base font-bold sm:text-lg`}
                        >
                            “{profile.tagline}”
                        </motion.p>

                        <motion.ul
                            initial="hidden"
                            animate="show"
                            variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.45 } } }}
                            className="mt-7 flex flex-wrap gap-2.5"
                        >
                            {profile.facts.map((fact) => (
                                <motion.li
                                    key={fact.label}
                                    variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}
                                    className="border-2 border-black bg-white px-3 py-1.5 text-sm font-bold shadow-[3px_3px_0_0_#000]"
                                >
                                    {fact.icon} {fact.label}
                                </motion.li>
                            ))}
                        </motion.ul>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className="mt-3 text-xs font-semibold italic text-black/50"
                        >
                            {profile.factNote}
                        </motion.p>
                    </div>

                    <PhotoWall />
                </div>
            </header>

            <Marquee />

            {/* ===== LÝ DO NÊN DUYỆT ===== */}
            <section className="mx-auto max-w-5xl px-5 py-12">
                <SectionTitle sticker="Đãi ngộ ngược" stickerColor="bg-[#7DE2D1]" title="Vì sao nên tuyển ứng viên này?" />
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {reasons.map((reason, i) => (
                        <motion.article
                            key={reason.title}
                            {...fadeUp}
                            transition={{ ...fadeUp.transition, delay: (i % 3) * 0.08 }}
                            whileHover={{ y: -6, rotate: i % 2 === 0 ? -1 : 1 }}
                            className={`${cardBase} rounded-2xl p-6`}
                        >
                            <div className="text-4xl">{reason.icon}</div>
                            <h3 className="mt-3 text-lg font-extrabold">{reason.title}</h3>
                            <p className="mt-2 text-sm font-medium leading-relaxed text-black/70">{reason.desc}</p>
                        </motion.article>
                    ))}
                </div>
            </section>

            {/* ===== KINH NGHIỆM ===== */}
            <section className="border-y-[3px] border-black bg-[#B388EB]/20 py-12">
                <div className="mx-auto max-w-4xl px-5">
                    <SectionTitle sticker="Track record" stickerColor="bg-[#FF9F1C]" title="Kinh nghiệm làm việc" />
                    <div className="space-y-6">
                        {experiences.map((exp, i) => (
                            <motion.article
                                key={exp.title}
                                {...fadeUp}
                                transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                                className={`${cardBase} flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-start`}
                            >
                                <span
                                    className="inline-block shrink-0 border-2 border-black px-3 py-1 text-xs font-extrabold uppercase tracking-wider shadow-[3px_3px_0_0_#000]"
                                    style={{ backgroundColor: exp.color }}
                                >
                                    {exp.period}
                                </span>
                                <div>
                                    <h3 className="text-xl font-extrabold">{exp.title}</h3>
                                    <p className="text-sm font-bold text-black/60">{exp.role}</p>
                                    <p className="mt-2 text-sm font-medium leading-relaxed text-black/75">{exp.desc}</p>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== KỸ NĂNG ===== */}
            <section className="border-y-[3px] border-black bg-[#7DE2D1]/25 py-12">
                <div className="mx-auto max-w-4xl px-5">
                <SectionTitle sticker="Đã kiểm định" stickerColor="bg-[#FF6B9D] text-white" title="Bộ kỹ năng đi kèm" />
                <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                    {skills.map((skill, i) => (
                        <motion.div key={skill.name} {...fadeUp} transition={{ ...fadeUp.transition, delay: (i % 2) * 0.08 }}>
                            <div className="flex items-end justify-between">
                                <span className="text-base font-extrabold">{skill.name}</span>
                                <span className="text-sm font-black">{skill.level}%</span>
                            </div>
                            <div className="mt-2 h-5 border-[3px] border-black bg-white shadow-[3px_3px_0_0_#000]">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
                                    className="h-full bg-[#FF6B9D]"
                                />
                            </div>
                            <p className="mt-1.5 text-xs font-semibold text-black/60">{skill.note}</p>
                        </motion.div>
                    ))}
                </div>
                </div>
            </section>

            {/* ===== FAQ ===== */}
            <section className="mx-auto max-w-3xl px-5 py-12">
                <SectionTitle sticker="Hỏi xoáy đáp xoay" stickerColor="bg-[#B388EB]" title="Câu hỏi thường gặp" />
                <div className="space-y-5">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={faq.q}
                            {...fadeUp}
                            transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                            className={`${cardBase} rounded-2xl p-6`}
                        >
                            <p className="font-extrabold">{faq.q}</p>
                            <p className="mt-2 text-sm font-medium leading-relaxed text-black/70">{faq.a}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="px-5 pb-20">
                <motion.div
                    {...fadeUp}
                    className="mx-auto max-w-3xl rounded-3xl border-[3px] border-black bg-black p-8 text-center text-white shadow-[8px_8px_0_0_#FF6B9D] sm:p-12"
                >
                    <Sticker className="bg-[#FF6B9D] text-white" rotate={2}>Vị trí mở đến khi tìm được người phù hợp</Sticker>
                    <h2 className="mt-5 text-3xl font-black uppercase leading-tight sm:text-4xl">
                        Duyệt hồ sơ ngay
                        <span className="block text-lg font-bold normal-case text-white/60">Ứng viên sẵn sàng phỏng vấn mọi khung giờ, kể cả giờ cơm</span>
                    </h2>
                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <motion.a
                            href={contact.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05, rotate: -1 }}
                            whileTap={{ scale: 0.97 }}
                            className="border-[3px] border-white bg-[#FF6B9D] px-7 py-3.5 text-sm font-extrabold uppercase tracking-wider shadow-[4px_4px_0_0_#fff]"
                        >
                            Mời phỏng vấn qua Instagram
                        </motion.a>
                        <motion.a
                            href={contact.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05, rotate: 1 }}
                            whileTap={{ scale: 0.97 }}
                            className="border-[3px] border-white bg-[#7DE2D1] px-7 py-3.5 text-sm font-extrabold uppercase tracking-wider text-black shadow-[4px_4px_0_0_#fff]"
                        >
                            Mời phỏng vấn qua Facebook
                        </motion.a>
                    </div>

                    <RejectButton />

                    <a href="/" className="mt-2 inline-block text-sm font-bold text-white/60 underline underline-offset-4 hover:text-white">
                        Xem bản CV nghiêm túc
                    </a>
                </motion.div>
            </section>

            <footer className="border-t-[3px] border-black bg-[#FFD335] py-5 text-center">
                <p className="px-5 text-xs font-extrabold uppercase tracking-widest">
                    Hồ sơ nộp với thiện chí làm quen
                </p>
                <p className="mt-1 text-[11px] font-semibold text-black/60">
                    Thông tin do ứng viên tự khai, muốn check var thì mời phỏng vấn.
                </p>
            </footer>
        </div>
    );
}
