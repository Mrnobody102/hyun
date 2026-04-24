import { lazy, Suspense, useEffect, useRef } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import EducationExperience from '@/components/EducationExperience';
import About from '@/components/About';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { DarkModeProvider } from '@/context/DarkModeContext';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import { getArticleById, getArticleBySlug, getArticlePath } from '@/lib/articles';
import { getRouteByTab, routesByTab } from '@/lib/routes';

const Certifications = lazy(() => import('@/components/Certifications'));
const Skills = lazy(() => import('@/components/Skills'));
const CompanyProjects = lazy(() => import('@/components/CompanyProjects'));
const Projects = lazy(() => import('@/components/Projects'));
const Articles = lazy(() => import('@/components/Articles'));
const ArticleDetail = lazy(() => import('@/components/ArticleDetail'));
const Contact = lazy(() => import('@/components/Contact'));

function PageFallback() {
    return <div className="min-h-[40vh]" aria-hidden="true" />;
}

function HomePage() {
    const navigate = useNavigate();
    const { language } = useLanguage();

    const titles = {
        en: 'Hyun - Home',
        vi: 'Hyun - Trang chủ',
    };

    return (
        <>
            <Helmet>
                <title>{titles[language]}</title>
            </Helmet>
            <Hero onNavigate={(tab) => navigate(getRouteByTab(tab))} />
            <About />
            <EducationExperience />
        </>
    );
}

function SkillsPage() {
    const { language } = useLanguage();

    const titles = {
        en: 'Skills & Certifications | Hyun',
        vi: 'Kỹ năng & Chứng chỉ | Hyun',
    };

    return (
        <>
            <Helmet>
                <title>{titles[language]}</title>
            </Helmet>
            <Suspense fallback={<PageFallback />}>
                <Skills />
                <Certifications />
            </Suspense>
        </>
    );
}

function ArticlesPage() {
    const navigate = useNavigate();
    const { language } = useLanguage();

    const titles = {
        en: 'Articles | Hyun',
        vi: 'Bài viết | Hyun',
    };

    return (
        <>
            <Helmet>
                <title>{titles[language]}</title>
            </Helmet>
            <Suspense fallback={<PageFallback />}>
                <Articles
                    onArticleClick={(articleId) => {
                        const article = getArticleById(articleId);
                        if (article) {
                            navigate(getArticlePath(article));
                        }
                    }}
                />
            </Suspense>
        </>
    );
}

function ArticleDetailPage() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const { language } = useLanguage();
    const article = getArticleBySlug(slug);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, [slug]);

    if (!article) {
        return <Navigate to={routesByTab.articles} replace />;
    }

    const titles = {
        en: `${article.title.en} - Articles | Hyun`,
        vi: `${article.title.vi} - Bài viết | Hyun`,
    };

    return (
        <>
            <Helmet>
                <title>{titles[language]}</title>
            </Helmet>
            <Suspense fallback={<PageFallback />}>
                <ArticleDetail
                    articleId={article.id}
                    slug={article.slug}
                    onBack={(nextArticleId = null) => {
                        if (nextArticleId !== null && nextArticleId !== undefined) {
                            const nextArticle = getArticleById(nextArticleId);
                            if (nextArticle) {
                                navigate(getArticlePath(nextArticle));
                                return;
                            }
                        }

                        navigate(routesByTab.articles);
                    }}
                />
            </Suspense>
        </>
    );
}

function CompanyProjectsPage() {
    const { language } = useLanguage();

    const titles = {
        en: 'Main Projects | Hyun',
        vi: 'Dự án chính | Hyun',
    };

    return (
        <>
            <Helmet>
                <title>{titles[language]}</title>
            </Helmet>
            <Suspense fallback={<PageFallback />}>
                <CompanyProjects />
            </Suspense>
        </>
    );
}

function ProjectsPage() {
    const { language } = useLanguage();

    const titles = {
        en: 'Personal Projects | Hyun',
        vi: 'Dự án cá nhân | Hyun',
    };

    return (
        <>
            <Helmet>
                <title>{titles[language]}</title>
            </Helmet>
            <Suspense fallback={<PageFallback />}>
                <Projects />
            </Suspense>
        </>
    );
}

function ContactPage() {
    const { language } = useLanguage();

    const titles = {
        en: 'Contact | Hyun',
        vi: 'Liên hệ | Hyun',
    };

    return (
        <>
            <Helmet>
                <title>{titles[language]}</title>
            </Helmet>
            <Suspense fallback={<PageFallback />}>
                <Contact />
            </Suspense>
        </>
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

        const savedPosition = scrollPositions.current[location.pathname];
        window.scrollTo({ top: savedPosition ?? 0, behavior: 'auto' });

        previousPathRef.current = location.pathname;
    }, [location.pathname]);

    const activeTab = (() => {
        if (location.pathname === routesByTab.home) return 'home';
        if (location.pathname.startsWith('/articles')) return 'articles';
        if (location.pathname === routesByTab.skills) return 'skills';
        if (location.pathname === routesByTab.projects) return 'projects';
        if (location.pathname === routesByTab['personal-projects']) return 'personal-projects';
        if (location.pathname === routesByTab.contact) return 'contact';
        return 'home';
    })();

    const isArticleDetail = location.pathname.startsWith('/articles/') && location.pathname !== routesByTab.articles;

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
                    onNavigate={(tab) => navigate(getRouteByTab(tab))}
                    onArticleSelect={(articleId) => {
                        const article = getArticleById(articleId);
                        if (article) {
                            navigate(getArticlePath(article));
                        }
                    }}
                />
                <main>{children}</main>
                {!isArticleDetail && <Footer />}
                <Toaster />
            </div>
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <LanguageProvider>
                <DarkModeProvider>
                    <Layout>
                        <Routes>
                            <Route path={routesByTab.home} element={<HomePage />} />
                            <Route path={routesByTab.skills} element={<SkillsPage />} />
                            <Route path={routesByTab.projects} element={<CompanyProjectsPage />} />
                            <Route path={routesByTab['personal-projects']} element={<ProjectsPage />} />
                            <Route path={routesByTab.articles} element={<ArticlesPage />} />
                            <Route path="/articles/:slug" element={<ArticleDetailPage />} />
                            <Route path={routesByTab.contact} element={<ContactPage />} />
                            <Route path="*" element={<Navigate to={routesByTab.home} replace />} />
                        </Routes>
                    </Layout>
                </DarkModeProvider>
            </LanguageProvider>
        </BrowserRouter>
    );
}

export default App;
