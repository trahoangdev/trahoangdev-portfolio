
import { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle, AlertCircle, Github, Linkedin, MessageSquare, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
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

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange',
  });

  const watchedFields = watch();

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'trahoangdev@gmail.com',
      href: 'mailto:trahoangdev@gmail.com',
      description: 'Send me an email anytime',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '(+84) 123 456 789',
      href: 'tel:+84906888888',
      description: 'Call or WhatsApp me',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Ho Chi Minh City, Vietnam',
      href: null,
      description: 'Available for remote work',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/trahoangdev',
      color: 'hover:from-gray-700 hover:to-gray-900'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/trahoangdev',
      color: 'hover:from-blue-600 hover:to-blue-800'
    }
  ];

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your backend
      console.log('Form data:', data);
      
      setSubmitStatus('success');
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you within 24 hours.",
      });
      
      reset();
    } catch (error) {
      setSubmitStatus('error');
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldStatus = (fieldName: keyof ContactFormData) => {
    const hasError = errors[fieldName];
    const hasValue = watchedFields[fieldName];
    
    if (hasError) return 'error';
    if (hasValue) return 'success';
    return 'idle';
  };

  const getStatusIcon = (status: 'idle' | 'success' | 'error') => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <section 
      id="contact" 
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
              Get In Touch
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
              Let's discuss your next project or just say hello. I'm always open to new opportunities!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Information */}
            <div className={cn(
              "space-y-6 sm:space-y-8 transition-all duration-700",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            )}>
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-primary" />
                  Let's talk about your project
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                  I'm always interested in new opportunities and exciting projects. 
                  Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-4 sm:space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <Card
                      key={index}
                      className={cn(
                        "hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 group cursor-pointer",
                        info.href && "hover:scale-105",
                        isVisible && "animate-fade-in"
                      )}
                      style={{ animationDelay: `${index * 100}ms` }}
                      onClick={() => info.href && window.open(info.href)}
                    >
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-start space-x-4">
                          <div className={cn(
                            "bg-gradient-to-br p-3 rounded-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-110",
                            info.color
                          )}>
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm sm:text-base mb-1 group-hover:text-primary transition-colors">
                              {info.title}
                            </h4>
                            {info.href ? (
                              <a 
                                href={info.href} 
                                className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors break-all block"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {info.value}
                              </a>
                            ) : (
                              <p className="text-xs sm:text-sm text-muted-foreground">{info.value}</p>
                            )}
                            <p className="text-xs text-muted-foreground mt-1">{info.description}</p>
                          </div>
                          {info.href && (
                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <span>Connect on social media</span>
                </h4>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        asChild
                        className={cn(
                          "flex-1 transition-all duration-300 hover:scale-105",
                          social.color
                        )}
                      >
                        <a 
                          href={social.href} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <Icon className="w-4 h-4" />
                          {social.label}
                        </a>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Additional Info */}
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">What I can help you with:</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Full-stack web development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>UI/UX design and implementation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Performance optimization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Technical consulting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Code review and mentoring</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Response Time */}
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg border border-border">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Response Time</p>
                  <p className="text-xs text-muted-foreground">Usually responds within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card 
              className={cn(
                "relative transition-all duration-700",
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              )}
            >
              <CardHeader className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-b">
                <CardTitle className="flex items-center gap-2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <span>Send me a message</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Fill out the form below and I'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Name *
                    </Label>
                    <div className="relative">
                      <Input
                        id="name"
                        {...register('name')}
                        placeholder="Your full name"
                        className={cn(
                          "pr-10",
                          getFieldStatus('name') === 'error' && "border-red-500 focus:border-red-500",
                          getFieldStatus('name') === 'success' && "border-green-500 focus:border-green-500"
                        )}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {getStatusIcon(getFieldStatus('name'))}
                      </div>
                    </div>
                    {errors.name && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email *
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        placeholder="your.email@example.com"
                        className={cn(
                          "pr-10",
                          getFieldStatus('email') === 'error' && "border-red-500 focus:border-red-500",
                          getFieldStatus('email') === 'success' && "border-green-500 focus:border-green-500"
                        )}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {getStatusIcon(getFieldStatus('email'))}
                      </div>
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-medium">
                      Subject *
                    </Label>
                    <div className="relative">
                      <Input
                        id="subject"
                        {...register('subject')}
                        placeholder="What's this about?"
                        className={cn(
                          "pr-10",
                          getFieldStatus('subject') === 'error' && "border-red-500 focus:border-red-500",
                          getFieldStatus('subject') === 'success' && "border-green-500 focus:border-green-500"
                        )}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {getStatusIcon(getFieldStatus('subject'))}
                      </div>
                    </div>
                    {errors.subject && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">
                      Message *
                    </Label>
                    <div className="relative">
                      <Textarea
                        id="message"
                        {...register('message')}
                        placeholder="Tell me about your project..."
                        rows={5}
                        className={cn(
                          "pr-10 resize-none",
                          getFieldStatus('message') === 'error' && "border-red-500 focus:border-red-500",
                          getFieldStatus('message') === 'success' && "border-green-500 focus:border-green-500"
                        )}
                      />
                      <div className="absolute right-3 top-3">
                        {getStatusIcon(getFieldStatus('message'))}
                      </div>
                    </div>
                    {errors.message && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.message.message}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {watchedFields.message?.length || 0}/1000 characters
                    </p>
                  </div>

                  {/* Submit Status */}
                  {submitStatus === 'success' && (
                    <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <AlertDescription className="text-green-700 dark:text-green-300">
                        Message sent successfully! I'll get back to you soon.
                      </AlertDescription>
                    </Alert>
                  )}

                  {submitStatus === 'error' && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Failed to send message. Please try again or contact me directly.
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || !isDirty || !isValid}
                    className={cn(
                      "w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
                      "disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all duration-200",
                      "shadow-lg hover:shadow-xl"
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} className="mr-2" aria-hidden="true" />
                        <span>Send Message</span>
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
