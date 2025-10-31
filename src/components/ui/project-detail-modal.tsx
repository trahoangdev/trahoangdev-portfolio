import { useState, useEffect } from 'react';
import { X, ExternalLink, Github, Calendar, Users, Clock, CheckCircle, AlertTriangle, Lightbulb, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Separator } from '@/components/ui/separator';
import { ProjectDetail } from '@/types/project';
import { cn } from '@/lib/utils';

interface ProjectDetailModalProps {
  project: ProjectDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailModal = ({ project, isOpen, onClose }: ProjectDetailModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Reset image index when modal opens or project changes
  useEffect(() => {
    if (isOpen && project) {
      setCurrentImageIndex(0);
      setIsZoomed(false);
    }
  }, [isOpen, project]);

  // Keyboard navigation for image gallery
  useEffect(() => {
    if (!isOpen || !project) return;

    const images = project.screenshots ? [project.image, ...project.screenshots] : [project.image];
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'Escape' && isZoomed) {
        setIsZoomed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, project, isZoomed]);

  if (!project) return null;

  const images = project.screenshots ? [project.image, ...project.screenshots] : [project.image];

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'planned':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'planned':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-6xl max-h-[90vh] overflow-y-auto p-4 sm:p-6"
        aria-label={`Project details: ${project.title}`}
      > 
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-3xl font-bold mb-2">
            {project.title}
          </DialogTitle>
          <div className="flex items-center gap-4 mb-4">
            <Badge className={cn("flex items-center gap-1", getStatusColor(project.status))}>
              {getStatusIcon(project.status)}
              {project.status.replace('-', ' ').toUpperCase()}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {project.category}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 sm:space-y-8">
          {/* Project Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg overflow-hidden group">
              <OptimizedImage
                src={images[currentImageIndex]}
                alt={`${project.title} - Screenshot ${currentImageIndex + 1}`}
                className={cn(
                  "w-full h-full object-cover transition-transform duration-300 cursor-pointer",
                  isZoomed && "scale-150 cursor-zoom-out"
                )}
                width={800}
                height={450}
                fallback="/placeholder.svg"
                onClick={() => setIsZoomed(!isZoomed)}
              />
              
              {/* Navigation Arrows - Show when multiple images */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePreviousImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </>
              )}

              {/* Zoom Indicator */}
              {images.length === 1 && (
                <div className="absolute top-2 right-2 bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ZoomIn className="w-4 h-4" />
                </div>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      "flex-shrink-0 w-20 h-12 rounded-md overflow-hidden border-2 transition-all active:scale-95",
                      currentImageIndex === index
                        ? "border-primary ring-2 ring-primary/20 scale-105"
                        : "border-border hover:border-primary/50 hover:scale-102"
                    )}
                    aria-label={`View image ${index + 1} of ${images.length}`}
                    aria-pressed={currentImageIndex === index}
                  >
                    <OptimizedImage
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      width={80}
                      height={48}
                      fallback="/placeholder.svg"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Overview */}
          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Project Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.longDescription}
                  </p>
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Challenges & Solutions */}
              {(project.challenges.length > 0 || project.solutions.length > 0) && (
                <Card>
                  <CardHeader>
                    <CardTitle>Challenges & Solutions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {project.challenges.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2 text-orange-600 dark:text-orange-400">
                          Challenges
                        </h4>
                        <ul className="space-y-1">
                          {project.challenges.map((challenge, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {project.solutions.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2 text-green-600 dark:text-green-400">
                          Solutions
                        </h4>
                        <ul className="space-y-1">
                          {project.solutions.map((solution, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{solution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              {/* Project Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium">Duration</p>
                      <p className="text-sm text-muted-foreground">{project.duration}</p>
                      {project.startDate && project.endDate && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {new Date(project.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start gap-3">
                    <Users className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium">Role</p>
                      <p className="text-sm text-muted-foreground">{project.role}</p>
                    </div>
                  </div>

                  {project.teamSize && (
                    <>
                      <Separator />
                      <div className="flex items-start gap-3">
                        <Users className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <div>
                          <p className="text-sm font-medium">Team Size</p>
                          <p className="text-sm text-muted-foreground">{project.teamSize} {project.teamSize === 1 ? 'member' : 'members'}</p>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Technologies */}
              <Card>
                <CardHeader>
                  <CardTitle>Technologies Used</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <Button 
                      asChild 
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 active:scale-95 transition-all"
                    >
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center justify-center gap-2"
                        aria-label={`View ${project.title} source code on GitHub`}
                      >
                        <Github size={16} aria-hidden="true" />
                        View Code
                      </a>
                    </Button>
                    
                    {project.live && (
                      <Button 
                        variant="outline" 
                        asChild 
                        className="w-full active:scale-95 transition-all"
                      >
                        <a 
                          href={project.live} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center justify-center gap-2"
                          aria-label={`View ${project.title} live demo`}
                        >
                          <ExternalLink size={16} aria-hidden="true" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailModal;
