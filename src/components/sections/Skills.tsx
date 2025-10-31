
import { useState, useEffect, useRef } from 'react';
import { Code, Database, Cloud, Palette, Wrench, Zap, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SkillCategory {
  name: string;
  icon: typeof Code;
  skills: string[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    icon: Code,
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Backend',
    icon: Database,
    skills: ['Node.js', 'Python', 'Django', 'FastAPI', 'Express.js'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Database',
    icon: Database,
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL'],
    color: 'from-green-500 to-emerald-500'
  },
  {
    name: 'Cloud & DevOps',
    icon: Cloud,
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'],
    color: 'from-orange-500 to-red-500'
  },
  {
    name: 'Tools & Design',
    icon: Palette,
    skills: ['Git', 'Figma', 'VS Code', 'Postman', 'Jira'],
    color: 'from-pink-500 to-rose-500'
  },
];

const allTechnologies = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Node.js', 
  'Python', 'Django', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis',
  'AWS', 'Docker', 'Kubernetes', 'Git', 'Figma', 'Tailwind CSS', 'Express.js'
];

const Skills = () => {
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

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
            A comprehensive toolkit for building modern, scalable web applications
          </p>
        </div>
        
        {/* Skills Categories Grid */}
        <div className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.name}
                className={cn(
                  "overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group",
                  isVisible && "animate-fade-in"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className={cn(
                  "bg-gradient-to-br text-white",
                  category.color
                )}>
                  <CardTitle className="flex items-center gap-3">
                    <Icon className="w-6 h-6" />
                    <span>{category.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="text-xs sm:text-sm px-3 py-1.5 hover:scale-105 transition-transform duration-200 cursor-default group-hover:bg-primary/10"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* All Technologies Tags */}
        <div className={cn(
          "text-center mb-6",
          isVisible && "animate-fade-in"
        )}>
          <h3 className="text-xl sm:text-2xl font-semibold mb-6 flex items-center justify-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            <span>Technologies I Work With</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
            {allTechnologies.map((tech, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className={cn(
                  "text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 font-medium transition-all duration-300",
                  "hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white hover:border-transparent",
                  "hover:scale-110 cursor-pointer",
                  isVisible && "animate-fade-in"
                )}
                style={{ animationDelay: `${(skillCategories.length * 100) + (idx * 30)}ms` }}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className={cn(
          "grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-12",
          isVisible && "animate-fade-in"
        )}>
          <Card className="text-center p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="flex flex-col items-center gap-2">
                <TrendingUp className="w-8 h-8 text-primary mb-2" />
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  5+
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">Years Experience</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="text-center p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="flex flex-col items-center gap-2">
                <Code className="w-8 h-8 text-primary mb-2" />
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  20+
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">Technologies</p>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="flex flex-col items-center gap-2">
                <Wrench className="w-8 h-8 text-primary mb-2" />
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  50+
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">Projects Completed</p>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="flex flex-col items-center gap-2">
                <Cloud className="w-8 h-8 text-primary mb-2" />
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  100%
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">Client Satisfaction</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Skills;
