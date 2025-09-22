export interface ProjectDetail {
  id: number;
  title: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  screenshots?: string[];
  technologies: string[];
  category: 'fullstack' | 'frontend' | 'backend' | 'mobile';
  github: string;
  live?: string;
  features: string[];
  challenges: string[];
  solutions: string[];
  duration: string;
  teamSize?: number;
  role: string;
  status: 'completed' | 'in-progress' | 'planned';
  startDate: string;
  endDate?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: 'fullstack' | 'frontend' | 'backend' | 'mobile';
  github: string;
  live?: string;
}
