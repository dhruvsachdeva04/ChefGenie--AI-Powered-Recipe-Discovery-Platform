import React, { useEffect, useState } from 'react';
import './GradientBackground.css';

const GradientBackground = ({
  variant = 'primary',
  animated = true,
  intensity = 'medium',
  children,
  className = '',
  ...props
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!animated) return;

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [animated]);

  const backgroundClasses = `
    gradient-background 
    gradient-background--${variant} 
    gradient-background--${intensity} 
    ${animated ? 'gradient-background--animated' : ''} 
    ${className}
  `.trim();

  const dynamicStyle = animated ? {
    '--mouse-x': `${mousePosition.x}%`,
    '--mouse-y': `${mousePosition.y}%`,
  } : {};

  return (
    <div
      className={backgroundClasses}
      style={dynamicStyle}
      {...props}
    >
      <div className="gradient-background__content">
        {children}
      </div>
      
      {/* Animated gradient orbs */}
      {animated && (
        <>
          <div className="gradient-orb gradient-orb--1"></div>
          <div className="gradient-orb gradient-orb--2"></div>
          <div className="gradient-orb gradient-orb--3"></div>
        </>
      )}
    </div>
  );
};

export default GradientBackground;
