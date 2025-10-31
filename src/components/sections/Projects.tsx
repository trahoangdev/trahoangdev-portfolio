
import { useState, useEffect, useRef, useMemo } from 'react';
import { ExternalLink, Github, Filter, Eye, Sparkles, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { OptimizedImage } from '@/components/ui/optimized-image';
import ProjectDetailModal from '@/components/ui/project-detail-modal';
import { getProjectDetail, projectDetails } from '@/data/projects';
import { ProjectDetail, Project } from '@/types/project';
import { cn } from '@/lib/utils';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const previousFilterRef = useRef<string>(filter);
  const isInitializedRef = useRef<boolean>(false);

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

  // Convert project details to simple project format for the grid view
  const projects = useMemo<Project[]>(() => {
    return projectDetails.map(detail => ({
      id: detail.id,
      title: detail.title,
      description: detail.shortDescription,
      image: detail.image,
      technologies: detail.technologies,
      category: detail.category,
      github: detail.github,
      live: detail.live
    }));
  }, []); // projectDetails is static, only compute once

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'fullstack', name: 'Full Stack' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'mobile', name: 'Mobile' }
  ];

  const filteredProjects = useMemo(() => {
    return filter === 'all' 
      ? projects 
      : projects.filter(project => project.category === filter);
  }, [filter, projects]);

  // Initialize displayed projects on first mount
  useEffect(() => {
    if (isVisible && !isInitializedRef.current && filteredProjects.length > 0) {
      isInitializedRef.current = true;
      setDisplayedProjects(filteredProjects);
    }
  }, [isVisible, filteredProjects]);

  // Animate project cards when filter changes
  useEffect(() => {
    if (!isVisible || !isInitializedRef.current) return;
    
    // Only animate if filter actually changed
    if (previousFilterRef.current !== filter) {
      previousFilterRef.current = filter;
      setDisplayedProjects([]);
      const timer = setTimeout(() => {
        setDisplayedProjects(filteredProjects);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [filter, isVisible, filteredProjects]);

  const handleProjectClick = (projectId: number) => {
    const projectDetail = getProjectDetail(projectId);
    if (projectDetail) {
      setSelectedProject(projectDetail);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-12 sm:py-16 lg:py-20 bg-muted/30"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className={cn(
            "text-center mb-12 sm:mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Featured Projects
              </h2>
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            </div>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
              A showcase of my recent work and contributions
            </p>
            
            {/* Project Count */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <Badge variant="outline" className="px-4 py-1.5">
                <TrendingUp className="w-3 h-3 mr-2" />
                {filteredProjects.length} {filteredProjects.length === 1 ? 'Project' : 'Projects'}
              </Badge>
            </div>
          </div>

          {/* Filter buttons */}
          <div 
            className={cn(
              "flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-4 sm:px-0 transition-all duration-500",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            )}
            role="group"
            aria-label="Filter projects by category"
          >
            {categories.map((category) => {
              const count = category.id === 'all' 
                ? projects.length 
                : projects.filter(p => p.category === category.id).length;
              
              return (
                <Button
                  key={category.id}
                  variant={filter === category.id ? 'default' : 'outline'}
                  onClick={() => setFilter(category.id)}
                  className={cn(
                    "flex items-center gap-2 text-xs sm:text-sm px-3 sm:px-4 py-2 transition-all duration-200",
                    filter === category.id 
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg" 
                      : "hover:scale-105",
                    isVisible && "animate-fade-in"
                  )}
                  style={{ animationDelay: `${categories.indexOf(category) * 50}ms` }}
                  aria-pressed={filter === category.id}
                  aria-label={`Filter by ${category.name}`}
                >
                  <Filter size={14} className="sm:w-4 sm:h-4" aria-hidden="true" />
                  <span className="hidden xs:inline">{category.name}</span>
                  <span className="xs:hidden">{category.name.split(' ')[0]}</span>
                  {count > 0 && (
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "ml-1 text-xs px-1.5 py-0",
                        filter === category.id && "bg-white/20 text-white"
                      )}
                    >
                      {count}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>

          {/* Projects grid */}
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
            role="list"
            aria-label="Project showcase"
          >
            {displayedProjects.map((project, index) => (
              <Card 
                key={project.id} 
                className={cn(
                  "overflow-hidden border-2 hover:border-primary/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl group",
                  "animate-fade-in",
                  isVisible && "opacity-100 translate-y-0"
                )}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
                role="listitem"
              >
                <CardHeader className="p-0 relative overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 relative overflow-hidden group/image">
                    <OptimizedImage
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-110"
                      width={600}
                      height={400}
                      fallback="/placeholder.svg"
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge 
                        variant="secondary" 
                        className="bg-black/70 text-white backdrop-blur-sm border-0 capitalize"
                      >
                        {project.category}
                      </Badge>
                    </div>
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <div className="text-white text-center space-y-3">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleProjectClick(project.id)}
                          className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm active:scale-95 transition-all"
                          aria-label={`View details of ${project.title}`}
                        >
                          <Eye size={16} className="mr-2" aria-hidden="true" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors flex items-center gap-2">
                    <span>{project.title}</span>
                    {project.live && (
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    )}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="text-xs hover:bg-primary/10 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 4} more
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex flex-wrap gap-2 sm:gap-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleProjectClick(project.id)}
                    className="flex-1 sm:flex-initial flex items-center gap-2 active:scale-95 transition-all hover:bg-primary/10"
                    aria-label={`View details of ${project.title}`}
                  >
                    <Eye size={16} aria-hidden="true" />
                    <span className="hidden sm:inline">Details</span>
                    <span className="sm:hidden">View</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild
                    className="flex-1 sm:flex-initial active:scale-95 transition-all hover:bg-primary/10"
                  >
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2"
                      aria-label={`View ${project.title} source code on GitHub`}
                    >
                      <Github size={16} aria-hidden="true" />
                      <span className="hidden sm:inline">Code</span>
                      <span className="sm:hidden">GitHub</span>
                    </a>
                  </Button>
                  {project.live && (
                    <Button 
                      size="sm" 
                      asChild
                      className="flex-1 sm:flex-initial bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 active:scale-95 transition-all"
                    >
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-2"
                        aria-label={`View ${project.title} live demo`}
                      >
                        <ExternalLink size={16} aria-hidden="true" />
                        <span>Live</span>
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* No projects message */}
          {filteredProjects.length === 0 && (
            <Card className="text-center py-12 animate-fade-in" role="status" aria-live="polite">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="bg-muted/50 p-4 rounded-full">
                    <Filter className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-foreground text-lg font-medium mb-2">
                      No projects found in this category.
                    </p>
                    <p className="text-muted-foreground text-sm mb-6">
                      Try selecting a different category or view all projects.
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setFilter('all')}
                    className="active:scale-95 transition-all"
                    aria-label="Reset filter to view all projects"
                  >
                    View All Projects
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default Projects;
