
import { Code, Palette, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const highlights = [
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable code with best practices and modern patterns.'
    },
    {
      icon: Palette,
      title: 'Design Focused',
      description: 'Creating intuitive user experiences with attention to detail and aesthetics.'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimizing applications for speed, efficiency, and exceptional user experience.'
    }
  ];

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
              Passionate developer with a love for creating digital experiences that make a difference
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                Hello! I'm Trà, a full-stack developer based in Ho Chi Minh City, Vietnam. I enjoy creating things that 
                live on the internet, whether that be websites, applications, or anything in between.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                My goal is to always build products that provide pixel-perfect, performant experiences. 
                I have experience working with startups and established companies, helping them scale 
                their applications and improve user experiences.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                When I'm not coding, you can find me exploring new technologies, contributing to open source 
                projects, or sharing knowledge with the developer community.
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6">
              {highlights.map((highlight, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 sm:p-3 rounded-lg flex-shrink-0">
                        <highlight.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-base sm:text-lg mb-2">{highlight.title}</h3>
                        <p className="text-sm sm:text-base text-muted-foreground">{highlight.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
