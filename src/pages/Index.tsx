
import { Suspense, lazy } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BackToTop } from '@/components/ui/back-to-top';
import { AnimatedGrid } from '@/components/ui/animated-grid';
import { SkipLink } from '@/components/ui/skip-link';
import { StructuredData } from '@/components/StructuredData';
import { Loader2 } from 'lucide-react';

// Lazy load sections - Hero loads immediately, others on scroll
const Hero = lazy(() => import('@/components/sections/Hero'));
const About = lazy(() => import('@/components/sections/About'));
const Skills = lazy(() => import('@/components/sections/Skills'));
const Projects = lazy(() => import('@/components/sections/Projects'));
const Contact = lazy(() => import('@/components/sections/Contact'));

// Loading fallback component
const SectionLoader = () => (
  <div className="flex items-center justify-center min-h-[400px]" role="status" aria-label="Loading content">
    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" aria-hidden="true" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <StructuredData />
      <SkipLink />
      <AnimatedGrid />
      <Header />
      
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<SectionLoader />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>
      
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
