import React, { useState } from 'react';
import './FeatureCard.css';

const FeatureCard = ({
  icon,
  title,
  description,
  gradient = 'primary',
  size = 'medium',
  interactive = true,
  onClick,
  className = '',
  children,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const cardClasses = `
    feature-card 
    feature-card--${size} 
    feature-card--${gradient} 
    ${interactive ? 'feature-card--interactive' : ''} 
    ${isHovered ? 'feature-card--hovered' : ''} 
    ${className}
  `.trim();

  const renderIcon = () => {
    if (!icon) return null;
    
    if (typeof icon === 'string') {
      return <span className="feature-icon">{icon}</span>;
    }
    
    return <div className="feature-icon">{icon}</div>;
  };

  return (
    <div
      className={cardClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...props}
    >
      <div className="feature-card__content">
        {renderIcon()}
        <h3 className="feature-card__title">{title}</h3>
        <p className="feature-card__description">{description}</p>
        {children && <div className="feature-card__children">{children}</div>}
      </div>
      
      {/* Decorative elements */}
      <div className="feature-card__glow"></div>
      <div className="feature-card__border"></div>
    </div>
  );
};

export default FeatureCard;
