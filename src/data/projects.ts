import { ProjectDetail } from '@/types/project';

export const projectDetails: ProjectDetail[] = [
  /*{
    id: 1,
    title: 'E-Commerce Platform',
    shortDescription: 'A full-stack e-commerce platform with React, Node.js, and Stripe integration.',
    longDescription: 'This comprehensive e-commerce platform was built from scratch to provide a complete online shopping experience. The platform features a modern, responsive design with advanced functionality including real-time inventory management, secure payment processing, and comprehensive admin dashboard. The system handles thousands of concurrent users and processes thousands of orders daily with high reliability and performance.',
    image: '/images/project-1.png',
    screenshots: [
      '/images/project-1.png',
      '/images/project-2.jpg',
      '/images/project-3.png'
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS', 'Redis', 'Docker', 'TypeScript'],
    category: 'fullstack',
    github: 'https://github.com/trahoangdev/ecommerce-platform',
    live: 'https://ecommerce-demo.trahoangdev.com',
    features: [
      'User authentication and authorization with JWT',
      'Product catalog with advanced filtering and search',
      'Shopping cart and wishlist functionality',
      'Secure payment processing with Stripe',
      'Real-time order tracking and notifications',
      'Admin dashboard for inventory management',
      'Responsive design for all devices',
      'Performance optimization with caching'
    ],
    challenges: [
      'Handling high traffic during peak shopping seasons',
      'Ensuring data consistency across distributed systems',
      'Implementing secure payment processing',
      'Optimizing database queries for large product catalogs'
    ],
    solutions: [
      'Implemented Redis caching for frequently accessed data',
      'Used database transactions and proper indexing',
      'Integrated Stripe with proper security measures',
      'Optimized queries and implemented pagination'
    ],
    duration: '6 months',
    teamSize: 4,
    role: 'Full Stack Developer & Team Lead',
    status: 'completed',
    startDate: '2023-01-15',
    endDate: '2023-07-15'
  },
  {
    id: 2,
    title: 'Task Management App',
    shortDescription: 'A collaborative task management application with real-time updates and drag-and-drop functionality.',
    longDescription: 'A modern task management application designed for teams to collaborate effectively. The app features real-time synchronization, intuitive drag-and-drop interface, and comprehensive project tracking capabilities. Built with Vue.js and real-time WebSocket connections, it provides instant updates across all connected clients.',
    image: '/images/project-2.jpg',
    screenshots: [
      '/images/project-2.jpg',
      '/images/project-3.png',
      '/images/project-4.png'
    ],
    technologies: ['Vue.js', 'Express', 'Socket.io', 'MongoDB', 'Vuetify', 'JWT'],
    category: 'frontend',
    github: 'https://github.com/trahoangdev/task-manager',
    live: 'https://taskmanager-demo.trahoangdev.com',
    features: [
      'Real-time collaboration with WebSocket',
      'Drag-and-drop task management',
      'Project boards with customizable columns',
      'Team member assignment and notifications',
      'File attachments and comments',
      'Time tracking and reporting',
      'Mobile-responsive design',
      'Dark/Light theme support'
    ],
    challenges: [
      'Implementing real-time synchronization without conflicts',
      'Managing complex state across multiple components',
      'Ensuring smooth drag-and-drop performance',
      'Handling offline scenarios gracefully'
    ],
    solutions: [
      'Implemented conflict resolution algorithms',
      'Used Vuex for centralized state management',
      'Optimized drag-and-drop with virtual scrolling',
      'Added offline support with local storage sync'
    ],
    duration: '4 months',
    teamSize: 3,
    role: 'Frontend Developer',
    status: 'completed',
    startDate: '2023-03-01',
    endDate: '2023-06-30'
  },
  {
    id: 3,
    title: 'Weather Analytics API',
    shortDescription: 'RESTful API service that aggregates weather data from multiple sources with analytics insights.',
    longDescription: 'A high-performance RESTful API service that aggregates weather data from multiple sources and provides comprehensive analytics insights. The system processes millions of data points daily and serves thousands of API requests with sub-second response times. Features include intelligent caching, rate limiting, and comprehensive data visualization endpoints.',
    image: '/images/project-3.png',
    screenshots: [
      '/images/project-3.png',
      '/images/project-4.png'
    ],
    technologies: ['Python', 'FastAPI', 'Redis', 'Docker', 'PostgreSQL', 'Celery', 'Prometheus'],
    category: 'backend',
    github: 'https://github.com/trahoangdev/weather-api',
    live: null,
    features: [
      'Multi-source weather data aggregation',
      'Real-time data processing and caching',
      'Advanced analytics and forecasting',
      'RESTful API with comprehensive documentation',
      'Rate limiting and authentication',
      'Monitoring and alerting system',
      'Docker containerization',
      'Horizontal scaling capabilities'
    ],
    challenges: [
      'Handling large volumes of real-time data',
      'Ensuring API performance under high load',
      'Managing data consistency across sources',
      'Implementing effective caching strategies'
    ],
    solutions: [
      'Used async processing with Celery workers',
      'Implemented Redis caching with smart invalidation',
      'Created data validation and normalization pipeline',
      'Optimized database queries and indexing'
    ],
    duration: '5 months',
    teamSize: 2,
    role: 'Backend Developer & DevOps',
    status: 'completed',
    startDate: '2023-02-01',
    endDate: '2023-06-30'
  },*/
  {
    id: 4,
    title: 'Portfolio Website',
    shortDescription: 'A responsive portfolio website built with React.js and Tailwind CSS, featuring dark mode and animations.',
    longDescription: 'A modern, responsive portfolio website showcasing my work and skills. Built with React, TypeScript, and Tailwind CSS, it features a sophisticated theme system, smooth animations, and optimized performance. The site includes interactive project showcases, contact forms, and a mobile-first design approach.',
    image: '/images/project-4.png',
    screenshots: [
      '/images/project-4.png',
      '/images/project-1.png'
    ],
    technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite', 'shadcn/ui'],
    category: 'frontend',
    github: 'https://github.com/trahoangdev/trahoangdev-portfolio',
    live: 'https://trahoangdev-portfolio.netlify.app/',
    features: [
      'Responsive design for all devices',
      'Dark/Light/System theme modes',
      'Smooth animations and transitions',
      'Interactive project showcase',
      'Contact form with validation',
      'SEO optimization',
      'Performance optimization',
      'Accessibility compliance'
    ],
    challenges: [
      'Creating smooth theme transitions',
      'Optimizing performance for mobile devices',
      'Implementing complex animations',
      'Ensuring accessibility compliance'
    ],
    solutions: [
      'Used CSS custom properties for theme switching',
      'Implemented lazy loading and code splitting',
      'Leveraged Framer Motion for smooth animations',
      'Followed WCAG guidelines and ARIA standards'
    ],
    duration: '2 months',
    teamSize: 1,
    role: 'Frontend Developer',
    status: 'completed',
    startDate: '2025-04-22',
    endDate: '2025-06-25'
  }
];

// Helper function to get project detail by ID
export const getProjectDetail = (id: number): ProjectDetail | undefined => {
  return projectDetails.find(project => project.id === id);
};

// Helper function to get projects by category
export const getProjectsByCategory = (category: string): ProjectDetail[] => {
  if (category === 'all') return projectDetails;
  return projectDetails.filter(project => project.category === category);
};
