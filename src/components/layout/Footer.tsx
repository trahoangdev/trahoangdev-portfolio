
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: Github, href: 'https://github.com/trahoangdev', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/trahoangdev', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:trahoangdev@gmail.com', label: 'Email' }
  ];

  return (
    <footer className="bg-muted/50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center mb-2">
                <img 
                  src="/logo/logo.png" 
                  alt="trahoangdev logo" 
                  className="h-8 w-8 object-contain mr-3"
                />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  trahoangdev
                </h3>
              </div>
              <p className="text-muted-foreground">
                Building digital experiences with passion and precision
              </p>
            </div>

            <div className="flex items-center space-x-6">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  aria-label={link.label}
                >
                  <link.icon size={24} />
                </a>
              ))}
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground flex items-center justify-center gap-1">
              © {currentYear} trahoangdev. Made with <Heart size={16} className="text-red-500" /> and lots of coffee.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
