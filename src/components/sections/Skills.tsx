
import React from "react";

const technologies = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Node.js', 
  'Python', 'Django', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis',
  'AWS', 'Docker', 'Kubernetes', 'Git', 'Figma', 'Tailwind CSS'
];

const Skills = () => {
  return (
    <div id="skills" className="flex flex-col items-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-violet-600 mb-2 text-center">Skills & Technologies</h2>
      <p className="text-gray-500 mb-8 text-center text-sm sm:text-base">A comprehensive toolkit for building modern web applications</p>
      
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto mb-8 w-full">
        <table className="min-w-[600px] border border-border rounded-2xl shadow-lg bg-card mx-auto">
          <thead>
            <tr>
              <th className="px-8 py-4 text-lg font-bold text-violet-700 dark:text-violet-300 text-center">Frontend</th>
              <th className="px-8 py-4 text-lg font-bold text-violet-700 dark:text-violet-300 text-center">Backend</th>
              <th className="px-8 py-4 text-lg font-bold text-violet-700 dark:text-violet-300 text-center">Tools & Others</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-8 py-3 text-center text-foreground transition-colors duration-200 cursor-pointer hover:bg-violet-500 hover:text-white">React/Next.js</td>
              <td className="px-8 py-3 text-center text-foreground transition-colors duration-200 cursor-pointer hover:bg-violet-500 hover:text-white">Node.js</td>
              <td className="px-8 py-3 text-center text-foreground transition-colors duration-200 cursor-pointer hover:bg-violet-500 hover:text-white">AWS/Cloud</td>
            </tr>
            <tr>
              <td className="px-8 py-3 text-center text-foreground transition-colors duration-200 cursor-pointer hover:bg-violet-500 hover:text-white">TypeScript</td>
              <td className="px-8 py-3 text-center text-foreground transition-colors duration-200 cursor-pointer hover:bg-violet-500 hover:text-white">Python</td>
              <td className="px-8 py-3 text-center text-foreground transition-colors duration-200 cursor-pointer hover:bg-violet-500 hover:text-white">Docker</td>
            </tr>
            <tr>
              <td className="px-8 py-3 text-center text-foreground transition-colors duration-200 cursor-pointer hover:bg-violet-500 hover:text-white">Tailwind CSS</td>
              <td className="px-8 py-3 text-center text-foreground transition-colors duration-200 cursor-pointer hover:bg-violet-500 hover:text-white">PostgreSQL</td>
              <td className="px-8 py-3 text-center text-foreground transition-colors duration-200 cursor-pointer hover:bg-violet-500 hover:text-white">Git/GitHub</td>
            </tr>
            <tr>
              <td className="px-8 py-3 text-center text-foreground transition-colors duration-200 cursor-pointer hover:bg-violet-500 hover:text-white">Vue.js</td>
              <td className="px-8 py-3 text-center text-foreground transition-colors duration-200 cursor-pointer hover:bg-violet-500 hover:text-white">MongoDB</td>
              <td className="px-8 py-3 text-center text-foreground transition-colors duration-200 cursor-pointer hover:bg-violet-500 hover:text-white">Figma</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Cards */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 w-full max-w-2xl">
        <div className="bg-card border border-border rounded-2xl shadow-lg p-4">
          <h3 className="text-lg font-bold text-violet-700 dark:text-violet-300 text-center mb-4">Frontend</h3>
          <div className="space-y-2">
            <div className="text-center text-foreground transition-colors duration-200 cursor-pointer hover:bg-violet-500 hover:text-white py-2 rounded">React/Next.js</div>
            <div className="text-center text-foreground transition-colors duration-200 cursor-pointer hover:bg-violet-500 hover:text-white py-2 rounded">TypeScript</div>
            <div className="text-center text-foreground transition-colors duration-200 cursor-pointer hover:bg-violet-500 hover:text-white py-2 rounded">Tailwind CSS</div>
            <div className="text-center text-foreground transition-colors duration-200 cursor-pointer hover:bg-violet-500 hover:text-white py-2 rounded">Vue.js</div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl shadow-lg p-4">
          <h3 className="text-lg font-bold text-violet-700 dark:text-violet-300 text-center mb-4">Backend</h3>
          <div className="space-y-2">
            <div className="text-center text-foreground transition-colors duration-200 cursor-pointer hover:bg-violet-500 hover:text-white py-2 rounded">Node.js</div>
            <div className="text-center text-foreground transition-colors duration-200 cursor-pointer hover:bg-violet-500 hover:text-white py-2 rounded">Python</div>
            <div className="text-center text-foreground transition-colors duration-200 cursor-pointer hover:bg-violet-500 hover:text-white py-2 rounded">PostgreSQL</div>
            <div className="text-center text-foreground transition-colors duration-200 cursor-pointer hover:bg-violet-500 hover:text-white py-2 rounded">MongoDB</div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl shadow-lg p-4 sm:col-span-2">
          <h3 className="text-lg font-bold text-violet-700 dark:text-violet-300 text-center mb-4">Tools & Others</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center text-foreground transition-colors duration-200 cursor-pointer hover:bg-violet-500 hover:text-white py-2 rounded">AWS/Cloud</div>
            <div className="text-center text-foreground transition-colors duration-200 cursor-pointer hover:bg-violet-500 hover:text-white py-2 rounded">Docker</div>
            <div className="text-center text-foreground transition-colors duration-200 cursor-pointer hover:bg-violet-500 hover:text-white py-2 rounded">Git/GitHub</div>
            <div className="text-center text-foreground transition-colors duration-200 cursor-pointer hover:bg-violet-500 hover:text-white py-2 rounded">Figma</div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-4xl">
        {technologies.map((tech, idx) => (
          <span
            key={idx}
            className="bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-200 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-sm hover:bg-violet-500 hover:text-white transition-colors duration-200 cursor-pointer"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Skills;
