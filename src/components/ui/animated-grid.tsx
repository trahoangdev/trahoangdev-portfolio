import { memo } from 'react';
import { useCurrentTheme } from '@/hooks/use-theme';

export const AnimatedGrid = memo(() => {
  const currentTheme = useCurrentTheme();
  
  const gridColor = currentTheme === 'dark' 
    ? 'rgba(59, 130, 246, 0.15)' 
    : 'rgba(59, 130, 246, 0.08)';
  const gridColorSecondary = currentTheme === 'dark' 
    ? 'rgba(147, 51, 234, 0.1)' 
    : 'rgba(147, 51, 234, 0.05)';
  const diagonalColor = currentTheme === 'dark' 
    ? 'rgba(236, 72, 153, 0.06)' 
    : 'rgba(236, 72, 153, 0.03)';

  // Glowing dots positions and sizes
  const glowingDots = [
    { top: '10%', left: '15%', size: 120, delay: 0, duration: 20 },
    { top: '20%', left: '80%', size: 150, delay: 2, duration: 25 },
    { top: '60%', left: '10%', size: 100, delay: 4, duration: 22 },
    { top: '70%', left: '75%', size: 130, delay: 6, duration: 28 },
    { top: '40%', left: '50%', size: 110, delay: 1, duration: 24 },
    { top: '85%', left: '30%', size: 140, delay: 3, duration: 26 },
    { top: '30%', left: '60%', size: 90, delay: 5, duration: 23 },
    { top: '55%', left: '90%', size: 120, delay: 7, duration: 27 },
  ];

  const dotGlowColor = currentTheme === 'dark' 
    ? 'rgba(59, 130, 246, 0.4)' 
    : 'rgba(59, 130, 246, 0.2)';
  const dotGlowColor2 = currentTheme === 'dark' 
    ? 'rgba(147, 51, 234, 0.3)' 
    : 'rgba(147, 51, 234, 0.15)';
  const dotGlowColor3 = currentTheme === 'dark' 
    ? 'rgba(236, 72, 153, 0.35)' 
    : 'rgba(236, 72, 153, 0.18)';

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base grid background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${gridColor} 1px, transparent 1px),
            linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          willChange: 'transform',
        }}
      />
      
      {/* Animated grid overlay - moves diagonally */}
      <div 
        className="absolute inset-0 animate-grid-move"
        style={{
          backgroundImage: `
            linear-gradient(${gridColorSecondary} 1px, transparent 1px),
            linear-gradient(90deg, ${gridColorSecondary} 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          willChange: 'transform',
        }}
      />
      
      {/* Additional animated diagonal grid for depth - moves in opposite direction */}
      <div 
        className="absolute inset-0 animate-grid-move-slow opacity-60"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 40px,
              ${diagonalColor} 40px,
              ${diagonalColor} 41px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 40px,
              ${diagonalColor} 40px,
              ${diagonalColor} 41px
            )
          `,
          willChange: 'transform',
        }}
      />

      {/* Glowing dots - Blue */}
      {glowingDots.slice(0, 3).map((dot, index) => (
        <div
          key={`blue-${index}`}
          className="absolute rounded-full animate-glow-dot"
          style={{
            top: dot.top,
            left: dot.left,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            background: `radial-gradient(circle, ${dotGlowColor} 0%, transparent 70%)`,
            filter: 'blur(40px)',
            animationDelay: `${dot.delay}s`,
            animationDuration: `${dot.duration}s`,
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* Glowing dots - Purple */}
      {glowingDots.slice(3, 6).map((dot, index) => (
        <div
          key={`purple-${index}`}
          className="absolute rounded-full animate-glow-dot"
          style={{
            top: dot.top,
            left: dot.left,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            background: `radial-gradient(circle, ${dotGlowColor2} 0%, transparent 70%)`,
            filter: 'blur(50px)',
            animationDelay: `${dot.delay}s`,
            animationDuration: `${dot.duration}s`,
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* Glowing dots - Pink */}
      {glowingDots.slice(6).map((dot, index) => (
        <div
          key={`pink-${index}`}
          className="absolute rounded-full animate-glow-dot"
          style={{
            top: dot.top,
            left: dot.left,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            background: `radial-gradient(circle, ${dotGlowColor3} 0%, transparent 70%)`,
            filter: 'blur(45px)',
            animationDelay: `${dot.delay}s`,
            animationDuration: `${dot.duration}s`,
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  );
});

AnimatedGrid.displayName = 'AnimatedGrid';

