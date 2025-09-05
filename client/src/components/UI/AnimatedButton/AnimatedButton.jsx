import React, { useState } from 'react';
import './AnimatedButton.css';

const AnimatedButton = ({
  children,
  variant = 'primary',
  size = 'medium',
  icon = null,
  iconPosition = 'right',
  loading = false,
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);
  const handleMouseLeave = () => setIsPressed(false);

  const buttonClasses = `
    animated-button 
    animated-button--${variant} 
    animated-button--${size} 
    ${loading ? 'animated-button--loading' : ''} 
    ${disabled ? 'animated-button--disabled' : ''} 
    ${isPressed ? 'animated-button--pressed' : ''} 
    ${className}
  `.trim();

  const renderIcon = () => {
    if (!icon) return null;
    
    const iconElement = typeof icon === 'string' ? (
      <span className="button-icon">{icon}</span>
    ) : (
      icon
    );

    return (
      <span className={`button-icon-container ${iconPosition === 'left' ? 'icon-left' : 'icon-right'}`}>
        {iconElement}
      </span>
    );
  };

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      disabled={disabled || loading}
      {...props}
    >
      <span className="button-content">
        {icon && iconPosition === 'left' && renderIcon()}
        <span className="button-text">{children}</span>
        {icon && iconPosition === 'right' && renderIcon()}
        {loading && (
          <span className="button-loading">
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </span>
        )}
      </span>
      <span className="button-ripple"></span>
    </button>
  );
};

export default AnimatedButton;
