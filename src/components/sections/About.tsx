
import { useState, useEffect, useRef } from 'react';
import { Code, Palette, Zap, MapPin, Calendar, Award, Heart, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const highlights = [
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable code with best practices and modern patterns.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Palette,
      title: 'Design Focused',
      description: 'Creating intuitive user experiences with attention to detail and aesthetics.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimizing applications for speed, efficiency, and exceptional user experience.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: '5+ Years',
      description: 'Experience in web development'
    },
    {
      icon: Code,
      title: '50+ Projects',
      description: 'Successfully delivered'
    },
    {
      icon: Heart,
      title: '100%',
      description: 'Client satisfaction rate'
    }
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-12 sm:py-16 lg:py-20 bg-muted/30"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className={cn(
            "text-center mb-12 sm:mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
              Passionate developer with a love for creating digital experiences that make a difference
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 mb-12">
            {/* Left: Text Content & Avatar */}
            <div className={cn(
              "space-y-6 transition-all duration-700",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            )}>
              {/* Avatar Section */}
              <div className="flex justify-center lg:justify-start mb-6">
                <div className="relative">
                  <Avatar
                    src="/avatar.png"
                    alt="Hoàng Trọng Trà"
                    size="2xl"
                    fallback="HT"
                    className="ring-4 ring-primary/20 shadow-2xl hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full shadow-lg">
                    <Code className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Introduction Text */}
              <div className="space-y-4">
                <p className="text-base sm:text-lg leading-relaxed text-foreground">
                  Hello! I'm <span className="font-semibold text-primary">Hoàng Trọng Trà</span>, a full-stack developer based in <span className="inline-flex items-center gap-1"><MapPin className="w-4 h-4" />Ho Chi Minh City, Vietnam</span>. I enjoy creating things that live on the internet, whether that be websites, applications, or anything in between.
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                  My goal is to always build products that provide <strong className="text-foreground">pixel-perfect, performant experiences</strong>. I have experience working with startups and established companies, helping them scale their applications and improve user experiences.
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                  When I'm not coding, you can find me exploring new technologies, contributing to open source projects, or sharing knowledge with the developer community.
                </p>
              </div>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Badge variant="outline" className="px-4 py-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  Available for work
                </Badge>
                <Badge variant="outline" className="px-4 py-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  Remote or On-site
                </Badge>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <Button 
                  asChild 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <a href="#contact" className="flex items-center gap-2">
                    Get In Touch
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Right: Highlight Cards */}
            <div className={cn(
              "grid gap-4 sm:gap-6 transition-all duration-700",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            )}>
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <Card 
                    key={index} 
                    className={cn(
                      "hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 group overflow-hidden",
                      isVisible && "animate-fade-in"
                    )}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={cn(
                          "bg-gradient-to-br p-3 rounded-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-110",
                          highlight.color
                        )}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                            {highlight.title}
                          </h3>
                          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                            {highlight.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Achievements Section */}
          <div className={cn(
            "grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <Card 
                  key={index}
                  className={cn(
                    "text-center hover:shadow-lg transition-all duration-300 hover:scale-105",
                    isVisible && "animate-fade-in"
                  )}
                  style={{ animationDelay: `${(highlights.length * 150) + (index * 100)}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center gap-3">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-full">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-1">
                          {achievement.title}
                        </div>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
