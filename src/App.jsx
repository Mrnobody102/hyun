import { lazy, Suspense, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import EducationExperience from '@/components/EducationExperience';
import About from '@/components/About';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { Toaster } from '@/components/ui/toaster';
import { DarkModeProvider } from '@/context/DarkModeContext';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import { getArticleById, getArticleBySlug, getArticlePath } from '@/lib/articles';
import { getRouteByTab, routesByTab } from '@/lib/routes';
import { pageTransition } from '@/lib/animations';

import { ArticleSkeleton, ProjectSkeleton, ArticleDetailSkeleton } from '@/components/Skeletons';

const Certifications = lazy(() => import('@/components/Certifications'));
const Skills = lazy(() => import('@/components/Skills'));
const CompanyProjects = lazy(() => import('@/components/CompanyProjects'));
const Projects = lazy(() => import('@/components/Projects'));
const Articles = lazy(() => import('@/components/Articles'));
const ArticleDetail = lazy(() => import('@/components/ArticleDetail'));
const Contact = lazy(() => import('@/components/Contact'));


const HomePage = memo(function HomePage() {
    const navigate = useNavigate();
    const { language } = useLanguage();

    const titles = {
        en: 'Hyun - Home',
        vi: 'Hyun - Trang chủ',
    };

    const handleNavigate = useCallback((tab) => navigate(getRouteByTab(tab)), [navigate]);

    return (
        <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
            <Helmet>
                <title>{titles[language]}</title>
            </Helmet>
            <Hero onNavigate={handleNavigate} />
            <About />
            <EducationExperience />
        </motion.div>
    );
});

const SkillsPage = memo(function SkillsPage() {
    const { language } = useLanguage();

    const titles = {
        en: 'Skills & Certifications | Hyun',
        vi: 'Kỹ năng & Chứng chỉ | Hyun',
    };

    return (
        <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
            <Helmet>
                <title>{titles[language]}</title>
            </Helmet>
            <Suspense fallback={<ArticleSkeleton />}>

                <Skills />
                <Certifications />
            </Suspense>
        </motion.div>
    );
});

const ArticlesPage = memo(function ArticlesPage() {
    const navigate = useNavigate();
    const { language } = useLanguage();

    const titles = {
        en: 'Articles | Hyun',
        vi: 'Bài viết | Hyun',
    };

    const handleArticleClick = useCallback((articleId) => {
        const article = getArticleById(articleId);
        if (article) {
            navigate(getArticlePath(article));
        }
    }, [navigate]);

    return (
        <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
            <Helmet>
                <title>{titles[language]}</title>
            </Helmet>
            <Suspense fallback={<ArticleSkeleton />}>
                <Articles onArticleClick={handleArticleClick} />
            </Suspense>
        </motion.div>

    );
});

const ArticleDetailPage = memo(function ArticleDetailPage() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const { language } = useLanguage();
    const article = getArticleBySlug(slug);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, [slug]);

    const handleBack = useCallback((nextArticleId = null) => {
        if (nextArticleId !== null && nextArticleId !== undefined) {
            const nextArticle = getArticleById(nextArticleId);
            if (nextArticle) {
                navigate(getArticlePath(nextArticle));
                return;
            }
        }

        navigate(routesByTab.articles);
    }, [navigate]);

    if (!article) {
        return <Navigate to={routesByTab.articles} replace />;
    }

    const titles = {
        en: `${article.title.en} - Articles | Hyun`,
        vi: `${article.title.vi} - Bài viết | Hyun`,
    };

    return (
        <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
            <Helmet>
                <title>{titles[language]}</title>
            </Helmet>
            <Suspense fallback={<ArticleDetailSkeleton />}>
                <ArticleDetail
                    articleId={article.id}
                    slug={article.slug}
                    onBack={handleBack}
                />
            </Suspense>
        </motion.div>

    );
});

const CompanyProjectsPage = memo(function CompanyProjectsPage() {
    const { language } = useLanguage();

    const titles = {
        en: 'Main Projects | Hyun',
        vi: 'Dự án chính | Hyun',
    };

    return (
        <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
            <Helmet>
                <title>{titles[language]}</title>
            </Helmet>
            <Suspense fallback={<ProjectSkeleton />}>
                <CompanyProjects />
            </Suspense>
        </motion.div>

    );
});

const ProjectsPage = memo(function ProjectsPage() {
    const { language } = useLanguage();

    const titles = {
        en: 'Personal Projects | Hyun',
        vi: 'Dự án cá nhân | Hyun',
    };

    return (
        <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
            <Helmet>
                <title>{titles[language]}</title>
            </Helmet>
            <Suspense fallback={<ProjectSkeleton />}>
                <Projects />
            </Suspense>
        </motion.div>

    );
});

const ContactPage = memo(function ContactPage() {
    const { language } = useLanguage();

    const titles = {
        en: 'Contact | Hyun',
        vi: 'Liên hệ | Hyun',
    };

    return (
        <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
            <Helmet>
                <title>{titles[language]}</title>
            </Helmet>
            <Suspense fallback={<ArticleDetailSkeleton />}>

                <Contact />
            </Suspense>
        </motion.div>
    );
});

function AnimatedRoutes() {
    const location = useLocation();
    
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path={routesByTab.home} element={<HomePage />} />
                <Route path={routesByTab.skills} element={<SkillsPage />} />
                <Route path={routesByTab.projects} element={<CompanyProjectsPage />} />
                <Route path={routesByTab['personal-projects']} element={<ProjectsPage />} />
                <Route path={routesByTab.articles} element={<ArticlesPage />} />
                <Route path="/articles/:slug" element={<ArticleDetailPage />} />
                <Route path={routesByTab.contact} element={<ContactPage />} />
                <Route path="*" element={<Navigate to={routesByTab.home} replace />} />
            </Routes>
        </AnimatePresence>
    );
}

function Layout({ children }) {
    const location = useLocation();
    const navigate = useNavigate();
    const scrollPositions = useRef({});
    const previousPathRef = useRef(location.pathname);

    useEffect(() => {
        const previousPath = previousPathRef.current;
        scrollPositions.current[previousPath] = window.scrollY;

        // Reset scroll for new routes or restore for back navigation
        const savedPosition = scrollPositions.current[location.pathname];
        
        // Use requestAnimationFrame to restore scroll after DOM is painted
        const rafId = window.requestAnimationFrame(() => {
            window.scrollTo({ top: savedPosition ?? 0, behavior: 'auto' });
            // Move focus to main for accessibility
            document.querySelector('main')?.focus();
        });

        previousPathRef.current = location.pathname;
        return () => window.cancelAnimationFrame(rafId);
    }, [location.pathname]);


    const activeTab = useMemo(() => {
        if (location.pathname === routesByTab.home) return 'home';
        if (location.pathname.startsWith('/articles')) return 'articles';
        if (location.pathname === routesByTab.skills) return 'skills';
        if (location.pathname === routesByTab.projects) return 'projects';
        if (location.pathname === routesByTab['personal-projects']) return 'personal-projects';
        if (location.pathname === routesByTab.contact) return 'contact';
        return 'home';
    }, [location.pathname]);

    const isArticleDetail = location.pathname.startsWith('/articles/') && location.pathname !== routesByTab.articles;

    const handleHeaderNavigate = useCallback((tab) => navigate(getRouteByTab(tab)), [navigate]);
    const handleArticleSelect = useCallback((articleId) => {
        const article = getArticleById(articleId);
        if (article) {
            navigate(getArticlePath(article));
        }
    }, [navigate]);

    return (
        <>
            <Helmet>
                <title>Phạm Quang Huy - Full Stack Developer Portfolio</title>
                <meta
                    name="description"
                    content="Portfolio website of Phạm Quang Huy, a Full Stack Developer focused on maintainable systems, modern web experiences, and scalable solutions."
                />
            </Helmet>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
                <Header
                    activeTab={activeTab}
                    onNavigate={handleHeaderNavigate}
                    onArticleSelect={handleArticleSelect}
                />
                <main tabIndex="-1" className="outline-none">{children}</main>
                {!isArticleDetail && <Footer />}
                <ChatBot />
                <Toaster />
            </div>
        </>
    );
}

function App() {
    return (
        <HelmetProvider>
            <BrowserRouter>
                <LanguageProvider>
                    <DarkModeProvider>
                        <Layout>
                            <AnimatedRoutes />
                        </Layout>
                    </DarkModeProvider>
                </LanguageProvider>
            </BrowserRouter>
        </HelmetProvider>
    );
}

export default App;
