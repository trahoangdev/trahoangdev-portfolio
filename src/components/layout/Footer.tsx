
import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Heart, ArrowUp, Sparkles, MapPin, Clock, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

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

    const currentRef = footerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const socialLinks = [
    { 
      icon: Github, 
      href: 'https://github.com/trahoangdev', 
      label: 'GitHub',
      color: 'hover:from-gray-700 hover:to-gray-900'
    },
    { 
      icon: Linkedin, 
      href: 'https://linkedin.com/in/trahoangdev', 
      label: 'LinkedIn',
      color: 'hover:from-blue-600 hover:to-blue-800'
    },
    { 
      icon: Mail, 
      href: 'mailto:trahoangdev@gmail.com', 
      label: 'Email',
      color: 'hover:from-blue-500 hover:to-cyan-500'
    }
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      ref={footerRef}
      className="relative bg-gradient-to-b from-muted/50 to-muted/80 border-t border-border"
    >
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-4">
                <div className="relative">
                  <img 
                    src="/logo/logo.png" 
                    alt="trahoangdev logo" 
                    className="h-8 w-8 sm:h-10 sm:w-10 object-contain mr-2 sm:mr-3 transition-transform duration-300 hover:scale-110 hover:rotate-6"
                  />
                  <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-primary animate-pulse" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  trahoangdev
                </h3>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Building digital experiences with passion and precision. Turning ideas into reality, one line of code at a time.
              </p>
              
              {/* Quick Info */}
              <div className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Ho Chi Minh City, Vietnam</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Available for new opportunities</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">Quick Links</h4>
              <nav className="space-y-3">
                {quickLinks.map((link, index) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={cn(
                      "block text-sm text-muted-foreground hover:text-primary transition-all duration-300 relative group",
                      isVisible && "animate-fade-in"
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                    aria-label={`Navigate to ${link.name} section`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Code className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300" />
                  </a>
                ))}
              </nav>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">Services</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {['Web Development', 'UI/UX Design', 'Full Stack Solutions', 'Technical Consulting'].map((service, index) => (
                  <li 
                    key={service}
                    className={cn(
                      "flex items-center gap-2 transition-colors duration-300 hover:text-primary",
                      isVisible && "animate-fade-in"
                    )}
                    style={{ animationDelay: `${(quickLinks.length + index) * 50}ms` }}
                  >
                    <div className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social & Contact */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">Connect</h4>
              <div className="space-y-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 border border-transparent hover:border-primary/30 transition-all duration-300 group",
                        "hover:scale-105 active:scale-95",
                        isVisible && "animate-fade-in"
                      )}
                      style={{ animationDelay: `${(quickLinks.length + 4 + index) * 50}ms` }}
                      aria-label={`Visit ${social.label} profile`}
                    >
                      <div className={cn(
                        "p-2 rounded-lg bg-gradient-to-br transition-all duration-300",
                        social.color
                      )}>
                        <Icon size={18} className="text-white" />
                      </div>
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {social.label}
                      </span>
                    </a>
                  );
                })}
              </div>
              
              {/* CTA Button */}
              <Button
                onClick={() => handleNavClick('#contact')}
                className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300"
                aria-label="Get in touch"
              >
                Get In Touch
              </Button>
            </div>
          </div>

          {/* Bottom Section */}
          <div className={cn(
            "border-t border-border pt-8 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          )}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <p className="text-xs sm:text-sm text-muted-foreground flex items-center justify-center gap-1 flex-wrap">
                © {currentYear} trahoangdev. Made with{' '}
                <Heart className="inline w-4 h-4 text-red-500 animate-pulse" />{' '}
                and lots of <span className="font-semibold text-foreground">coffee</span>.
              </p>

              {/* Back to Top Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={scrollToTop}
                className="flex items-center gap-2 border-2 hover:bg-muted/50 active:scale-95 transition-all duration-300"
                aria-label="Scroll to top"
              >
                <ArrowUp size={16} />
                <span className="hidden sm:inline">Back to Top</span>
                <span className="sm:hidden">Top</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
