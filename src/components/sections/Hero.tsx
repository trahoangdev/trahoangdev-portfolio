
import { ArrowDown, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { useCurrentTheme } from '@/hooks/use-theme';
import { useState, useEffect, useMemo, memo } from 'react';

const TEXTS = [
  'Full Stack Developer',
  'React Specialist',
  'TypeScript Expert',
  'UI/UX Enthusiast',
  'Problem Solver'
] as const;

const Hero = memo(() => {
  const currentTheme = useCurrentTheme();
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentText = useMemo(() => TEXTS[currentIndex], [currentIndex]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentText.length) {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 3000);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % TEXTS.length);
        }
      }
    }, isDeleting ? 30 : 80);

    return () => clearTimeout(timeout);
  }, [displayedText, currentText, isDeleting]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            {/* Avatar */}
            <div className="flex justify-center mb-8 p-2">
              <Avatar
                src="/avatar.png"
                alt="Hoàng Trọng Trà"
                size="2xl"
                fallback="HT"
                className="ring-4 ring-white/20 shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Hoàng Trọng Trà 
              </span>
            </h1>
            <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-6 sm:mb-8 min-h-[2.5rem] sm:min-h-[3rem] flex items-center justify-center">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-medium">
                {displayedText}
              </span>
              <span className="animate-pulse text-blue-500 ml-1 font-bold text-lg xs:text-xl sm:text-2xl md:text-3xl opacity-80">|</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
              Passionate about creating beautiful, functional web applications that solve real-world problems. 
              I blend creativity with technical expertise to build exceptional digital experiences.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-16 animate-fade-in px-4 sm:px-0">
            <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 sm:px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
              <a href="#projects" className="flex items-center justify-center gap-2">
                View My Work
                <ArrowDown size={18} className="sm:w-5 sm:h-5" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto px-6 sm:px-8 py-3 border-2 hover:bg-muted/50 transition-all duration-300"
              asChild
            >
              <a 
                href="/cv/Hoang_Trong_Tra_CV.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                download="Hoang_Trong_Tra_CV.pdf"
                className="flex items-center justify-center gap-2"
              >
                <Download size={18} className="sm:w-5 sm:h-5" />
                Download CV
              </a>
            </Button>
          </div>

          {/* Tech stack preview */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground animate-fade-in px-4 sm:px-0">
            {['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'PostgreSQL'].map((tech) => (
              <span key={tech} className="px-2 sm:px-3 py-1 bg-muted/50 backdrop-blur-sm rounded-full hover:bg-muted transition-all duration-300 border border-border/50">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown size={24} className="text-muted-foreground" />
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
