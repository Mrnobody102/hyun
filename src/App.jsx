import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import EducationExperience from '@/components/EducationExperience';
import About from '@/components/About';
import Certifications from '@/components/Certifications';
import Skills from '@/components/Skills';
import CompanyProjects from '@/components/CompanyProjects';
import Projects from '@/components/Projects';
import Articles from '@/components/Articles';
import ArticleDetail from '@/components/ArticleDetail';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { DarkModeProvider } from '@/context/DarkModeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { articles } from '@/data/portfolioData';

// Home page component
function HomePage() {
  const navigate = useNavigate();
  const handleNavigate = (tab) => {
    const routes = {
      'home': '/',
      'skills': '/skills',
      'projects': '/projects',
      'personal-projects': '/personal-projects',
      'articles': '/articles',
      'contact': '/contact'
    };
    navigate(routes[tab] || '/');
  };

  return (
    <>
      <Hero onNavigate={handleNavigate} />
      <About />
      <EducationExperience />
    </>
  );
}

// Skills page component
function SkillsPage() {
  return (
    <>
      <Skills />
      <Certifications />
    </>
  );
}

// Articles page component
function ArticlesPage() {
  const navigate = useNavigate();
  const handleArticleClick = (articleId) => {
    const article = articles.find(a => a.id === articleId);
    if (article) {
      const slug = article.link.split('/articles/')[1];
      navigate(`/articles/${slug}`);
    }
  };

  return <Articles onArticleClick={handleArticleClick} />;
}

// Article detail page component
function ArticleDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get slug from URL and find article
  const slug = location.pathname.split('/articles/')[1];
  const article = articles.find(a => a.link.includes(slug));

  const handleBackToArticles = (nextArticleId = null) => {
    if (nextArticleId !== null && nextArticleId !== undefined) {
      const nextArticle = articles.find(a => a.id === nextArticleId);
      if (nextArticle) {
        const nextSlug = nextArticle.link.split('/articles/')[1];
        navigate(`/articles/${nextSlug}`);
      }
    } else {
      navigate('/articles');
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  if (!article) {
    navigate('/articles');
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{article.title.en} - Phạm Quang Huy</title>
      </Helmet>
      <ArticleDetail articleId={article.id} onBack={handleBackToArticles} />
    </>
  );
}

// Main layout wrapper
function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab from URL
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.startsWith('/articles')) return 'articles';
    if (path === '/skills') return 'skills';
    if (path === '/projects') return 'projects';
    if (path === '/personal-projects') return 'personal-projects';
    if (path === '/contact') return 'contact';
    return 'home';
  };

  const handleNavigate = (tab) => {
    const routes = {
      'home': '/',
      'skills': '/skills',
      'projects': '/projects',
      'personal-projects': '/personal-projects',
      'articles': '/articles',
      'contact': '/contact'
    };
    navigate(routes[tab] || '/');
  };

  const handleArticleSelect = (articleId) => {
    const article = articles.find(a => a.id === articleId);
    if (article) {
      const slug = article.link.split('/articles/')[1];
      navigate(`/articles/${slug}`);
    }
  };

  const activeTab = getActiveTab();
  const isArticleDetail = location.pathname.startsWith('/articles/') && location.pathname !== '/articles';

  return (
    <>
      <Helmet>
        <title>Phạm Quang Huy - Full Stack Developer Portfolio</title>
        <meta name="description" content="Portfolio website of Phạm Quang Huy, a professional Full Stack Developer specializing in modern web technologies and innovative solutions." />
      </Helmet>
      <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 ${isArticleDetail ? '' : ''}`}>
        <Header activeTab={activeTab} onNavigate={handleNavigate} onArticleSelect={handleArticleSelect} />
        <main>
          {children}
        </main>
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
              <Route path="/" element={<HomePage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/projects" element={<CompanyProjects />} />
              <Route path="/personal-projects" element={<Projects />} />
              <Route path="/articles" element={<ArticlesPage />} />
              <Route path="/articles/:slug" element={<ArticleDetailPage />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Layout>
        </DarkModeProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;