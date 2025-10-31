
import { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, ChevronDown, Sun, Moon, Monitor, Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showThemeSection, setShowThemeSection] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const { setTheme, theme } = useTheme();

  // Handle scroll effect with debounce and active section tracking
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let rafId: number;

    const handleScroll = () => {
      // Clear existing timeout
      if (timeoutId) clearTimeout(timeoutId);
      
      // Use RAF for smooth scroll tracking
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        setIsScrolled(scrollY > 20);
        
        // Calculate scroll progress
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollableHeight = documentHeight - windowHeight;
        const progress = scrollableHeight > 0 
          ? Math.min(100, (scrollY / scrollableHeight) * 100) 
          : 0;
        setScrollProgress(progress);
        
        // Track active section
        const sections = ['about', 'skills', 'projects', 'contact'];
        const scrollPosition = scrollY + 150; // Offset for header height
        
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = document.getElementById(sections[i]);
          if (section) {
            const sectionTop = section.offsetTop;
            if (scrollPosition >= sectionTop) {
              setActiveSection(sections[i]);
              break;
            }
          }
        }
        
        // Reset if at top
        if (scrollY < 100) {
          setActiveSection('');
        }
      });
      
      // Debounce for other scroll effects
      timeoutId = setTimeout(() => {
        // Additional scroll-based logic can go here
      }, 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Close menu when clicking outside or pressing ESC
  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = 'unset';
      setShowThemeSection(false);
      return;
    }

    // Prevent background scroll
    document.body.style.overflow = 'hidden';
    
    // Show theme section after a delay
    const timer = setTimeout(() => {
      setShowThemeSection(true);
    }, 500);

    // Handle ESC key to close menu
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    // Handle click outside (backdrop click)
    const handleBackdropClick = (event: MouseEvent) => {
      const target = event.target as Element;
      // Only close if clicking directly on backdrop, not menu content
      if (target.classList.contains('mobile-menu-backdrop')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    document.addEventListener('click', handleBackdropClick);

    // Focus management - focus close button when menu opens
    const closeButton = document.querySelector('[aria-label="Close menu"]') as HTMLElement;
    if (closeButton) {
      setTimeout(() => closeButton.focus(), 100);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('click', handleBackdropClick);
      document.body.style.overflow = 'unset';
      clearTimeout(timer);
      setShowThemeSection(false);
    };
  }, [isMenuOpen]);

  const navigation = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/trahoangdev', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/trahoangdev', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto: trahoangdev@gmail.com', label: 'Email' },
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Simple theme toggle for mobile menu
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  const getCurrentThemeIcon = () => {
    if (theme === 'dark') return <Moon className="h-5 w-5" />;
    if (theme === 'light') return <Sun className="h-5 w-5" />;
    return <Monitor className="h-5 w-5" />;
  };

  const getCurrentThemeText = () => {
    if (theme === 'dark') return 'Dark';
    if (theme === 'light') return 'Light';
    return 'System';
  };

  return (
    <>
      <header 
        ref={headerRef}
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-500",
          isScrolled 
            ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-lg" 
            : "bg-background/80 backdrop-blur-md border-b border-border/50"
        )}
      >
        {/* Progress bar */}
        {isScrolled && (
          <div 
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left transition-all duration-300 ease-out"
            style={{
              width: `${scrollProgress}%`,
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
            }}
            aria-hidden="true"
          />
        )}
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <a 
                href="#" 
                className="flex items-center group"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                aria-label="Scroll to top"
              >
                <div className="relative">
                  <img 
                    src="/logo/logo.png" 
                    alt="trahoangdev logo" 
                    className="h-8 w-8 sm:h-10 sm:w-10 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                  />
                  {isScrolled && (
                    <div className="absolute -top-1 -right-1">
                      <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                    </div>
                  )}
                </div>
                <span className="ml-2 sm:ml-3 text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent hidden xs:block transition-all duration-300 group-hover:scale-105">
                  trahoangdev
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1" aria-label="Main navigation">
              {navigation.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;
                
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group",
                      isActive
                        ? "text-foreground bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    aria-label={`Navigate to ${item.name} section`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {/* Active indicator */}
                    {isActive && (
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-lg animate-pulse" />
                    )}
                    {/* Hover underline */}
                    <span 
                      className={cn(
                        "absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300",
                        isActive ? "w-3/4 -translate-x-1/2" : "w-0 group-hover:w-3/4 group-hover:-translate-x-1/2"
                      )}
                      aria-hidden="true"
                    />
                  </a>
                );
              })}
            </nav>

            {/* Desktop Social Links & Theme Toggle */}
            <div className="hidden lg:flex items-center space-x-3">
              <ThemeToggle />
              <div className="h-6 w-px bg-border mx-1" />
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "relative text-muted-foreground hover:text-foreground transition-all duration-300 p-2 rounded-lg hover:bg-muted/50 group",
                      "hover:scale-110 active:scale-95"
                    )}
                    aria-label={social.label}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <Icon size={20} className="relative z-10" />
                    {/* Glow effect on hover */}
                    <span className="absolute inset-0 bg-primary/20 rounded-lg opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
                  </a>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative p-2 rounded-lg hover:bg-muted/50 active:bg-muted transition-all duration-200 mobile-menu group"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
            >
              <div className="relative w-6 h-6">
                <span className={cn(
                  "absolute left-0 top-1/2 w-6 h-0.5 bg-foreground transition-all duration-300 origin-center",
                  isMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"
                )} />
                <span className={cn(
                  "absolute left-0 top-1/2 w-6 h-0.5 bg-foreground transition-all duration-300",
                  isMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                )} />
                <span className={cn(
                  "absolute left-0 top-1/2 w-6 h-0.5 bg-foreground transition-all duration-300 origin-center",
                  isMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"
                )} />
              </div>
              {/* Notification badge */}
              {!isMenuOpen && activeSection && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay - Moved outside header */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[9999]">
          {/* Backdrop with animation */}
          <div 
            className="mobile-menu-backdrop absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Menu Content with slide animation */}
          <div className="absolute top-0 right-0 h-full w-72 xs:w-80 max-w-[90vw] bg-card border-l border-border shadow-2xl transform transition-transform duration-300 ease-out animate-in slide-in-from-right">
            <div className="flex flex-col h-full bg-card">
              {/* Header with close button */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border bg-card">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <img 
                    src="/logo/logo.png" 
                    alt="trahoangdev logo" 
                    className="h-5 w-5 sm:h-6 sm:w-6 object-contain"
                  />
                  <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    trahoangdev
                  </span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-muted active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Close menu"
                  autoFocus
                >
                  <X size={20} className="text-foreground" />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
                  {/* Mobile Navigation Links */}
                  <nav className="space-y-2" id="mobile-navigation" aria-label="Mobile navigation">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Navigation</span>
                      {activeSection && (
                        <Badge variant="secondary" className="text-xs">
                          {activeSection}
                        </Badge>
                      )}
                    </div>
                    {navigation.map((item, index) => {
                      const sectionId = item.href.replace('#', '');
                      const isActive = activeSection === sectionId;
                      
                      return (
                        <a
                          key={item.name}
                          href={item.href}
                          className={cn(
                            "block text-base sm:text-lg font-medium transition-all duration-300 py-3 sm:py-4 px-3 sm:px-4 rounded-lg border active:scale-95 relative overflow-hidden group",
                            isActive
                              ? "text-primary bg-primary/10 border-primary/30"
                              : "text-foreground hover:text-primary hover:bg-muted/50 border-transparent hover:border-border"
                          )}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(item.href);
                          }}
                          aria-label={`Navigate to ${item.name} section`}
                          aria-current={isActive ? 'page' : undefined}
                          style={{
                            animationDelay: `${index * 50}ms`,
                          }}
                        >
                          <span className="relative z-10 flex items-center justify-between">
                            <span>{item.name}</span>
                            {isActive && (
                              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            )}
                          </span>
                          {/* Active background gradient */}
                          {isActive && (
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
                          )}
                        </a>
                      );
                    })}
                  </nav>

                  {/* Theme Toggle with delay */}
                  <div className={cn(
                    "space-y-3 transition-all duration-500",
                    showThemeSection ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}>
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Theme</span>
                    
                    {/* Current Theme Display */}
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
                      <div className="flex items-center space-x-3">
                        <span className="text-foreground font-medium">Current:</span>
                        <div className="flex items-center space-x-2">
                          {getCurrentThemeIcon()}
                          <span className="text-sm text-foreground">{getCurrentThemeText()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Theme Options */}
                    <div className="space-y-2">
                      <button
                        onClick={() => handleThemeChange('light')}
                        className={cn(
                          "w-full flex items-center justify-between p-4 rounded-lg border transition-all duration-200",
                          theme === 'light' 
                            ? "bg-primary/10 border-primary/30 text-primary" 
                            : "bg-muted/20 border-border hover:bg-muted/40"
                        )}
                        aria-label="Switch to light theme"
                        aria-pressed={theme === 'light'}
                      >
                        <div className="flex items-center space-x-3">
                          <Sun className="h-5 w-5" />
                          <span className="font-medium">Light</span>
                        </div>
                        {theme === 'light' && <div className="w-2 h-2 bg-primary rounded-full" />}
                      </button>

                      <button
                        onClick={() => handleThemeChange('dark')}
                        className={cn(
                          "w-full flex items-center justify-between p-4 rounded-lg border transition-all duration-200",
                          theme === 'dark' 
                            ? "bg-primary/10 border-primary/30 text-primary" 
                            : "bg-muted/20 border-border hover:bg-muted/40"
                        )}
                        aria-label="Switch to dark theme"
                        aria-pressed={theme === 'dark'}
                      >
                        <div className="flex items-center space-x-3">
                          <Moon className="h-5 w-5" />
                          <span className="font-medium">Dark</span>
                        </div>
                        {theme === 'dark' && <div className="w-2 h-2 bg-primary rounded-full" />}
                      </button>

                      <button
                        onClick={() => handleThemeChange('system')}
                        className={cn(
                          "w-full flex items-center justify-between p-4 rounded-lg border transition-all duration-200",
                          theme === 'system' 
                            ? "bg-primary/10 border-primary/30 text-primary" 
                            : "bg-muted/20 border-border hover:bg-muted/40"
                        )}
                        aria-label="Switch to system theme"
                        aria-pressed={theme === 'system'}
                      >
                        <div className="flex items-center space-x-3">
                          <Monitor className="h-5 w-5" />
                          <span className="font-medium">System</span>
                        </div>
                        {theme === 'system' && <div className="w-2 h-2 bg-primary rounded-full" />}
                      </button>
                    </div>
                    
                    {/* Theme description */}
                    <div className="p-3 bg-muted/20 rounded-lg border border-border/50">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Choose your preferred theme. System follows your device settings.
                      </p>
                    </div>
                  </div>
                  
                  {/* Social Links */}
                  <div className="space-y-3">
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Connect</span>
                    <div className="space-y-3">
                      {socialLinks.map((social, index) => (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-4 p-4 rounded-lg hover:bg-muted/50 active:scale-95 transition-all duration-300 border border-border"
                          aria-label={`Visit ${social.label} profile`}
                          style={{
                            animationDelay: `${(navigation.length + 2) * 50 + index * 50}ms`,
                          }}
                        >
                          <div className="p-2 rounded-lg bg-primary/10">
                            <social.icon size={18} className="text-primary" aria-hidden="true" />
                          </div>
                          <span className="font-medium text-foreground">{social.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Fixed bottom section */}
              <div className="p-4 sm:p-6 border-t border-border bg-card">
                {/* Quick Actions */}
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300"
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleNavClick('#contact');
                    }}
                    aria-label="Navigate to contact section"
                  >
                    Get In Touch
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-2 hover:bg-muted/50 active:scale-95 font-medium transition-all duration-300"
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleNavClick('#projects');
                    }}
                    aria-label="Navigate to projects section"
                  >
                    View Projects
                  </Button>
                </div>

                {/* Additional Info */}
                <div className="mt-4 p-4 bg-muted/30 rounded-lg border border-border">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Available for freelance opportunities and exciting projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
