
import { ArrowDown, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { useCurrentTheme } from '@/hooks/use-theme';

const Hero = () => {
  const currentTheme = useCurrentTheme();

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient - adaptive to theme */}
      <div className={`absolute inset-0 ${
        currentTheme === 'dark' 
          ? 'bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20' 
          : 'bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10'
      }`}></div>
      
      {/* Animated background elements - adaptive to theme */}
      <div className="absolute inset-0">
        <div className={`absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl animate-pulse ${
          currentTheme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-500/20'
        }`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 ${
          currentTheme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-500/20'
        }`}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            {/* Avatar */}
            <div className="flex justify-center mb-8">
              <Avatar
                src="/avatar.png"
                alt="Tra Hoang Trong"
                size="2xl"
                fallback="HT"
                className="ring-4 ring-white/20 shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Tra Hoang Trong 
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-muted-foreground mb-8">
              Full Stack Developer
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Passionate about creating beautiful, functional web applications that solve real-world problems. 
              I blend creativity with technical expertise to build exceptional digital experiences.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
              <a href="#projects" className="flex items-center gap-2">
                View My Work
                <ArrowDown size={20} />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-3 border-2 hover:bg-muted/50 transition-all duration-300"
              asChild
            >
              <a 
                href="/cv/Hoang_Trong_Tra_CV.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                download="Hoang_Trong_Tra_CV.pdf"
                className="flex items-center gap-2"
              >
                <Download size={20} />
                Download CV
              </a>
            </Button>
          </div>

          {/* Tech stack preview */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground animate-fade-in">
            {['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'PostgreSQL'].map((tech) => (
              <span key={tech} className="px-3 py-1 bg-muted/50 backdrop-blur-sm rounded-full hover:bg-muted transition-all duration-300 border border-border/50">
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
};

export default Hero;
