import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Certifications from '@/components/Certifications';
import Skills from '@/components/Skills';
import CompanyProjects from '@/components/CompanyProjects';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { DarkModeProvider } from '@/context/DarkModeContext';

function App() {
  return (
    <DarkModeProvider>
      <Helmet>
        <title>Phạm Quang Huy - Full Stack Developer Portfolio</title>
        <meta name="description" content="Portfolio website of Phạm Quang Huy, a professional Full Stack Developer specializing in modern web technologies and innovative solutions." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
        <Header />
        <main>
          <Hero />
          <About />
          <Certifications />
          <Skills />
          <CompanyProjects />
          <Projects />
          <Contact />
        </main>
        <Footer />
        <Toaster />
      </div>
    </DarkModeProvider>
  );
}

export default App;