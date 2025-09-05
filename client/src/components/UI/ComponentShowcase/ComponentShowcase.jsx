import React, { useState } from 'react';
import { 
  LoadingSpinner, 
  AnimatedButton, 
  FeatureCard, 
  GradientBackground, 
  StatsCounter 
} from '../index';
import './ComponentShowcase.css';

const ComponentShowcase = () => {
  const [loading, setLoading] = useState(false);
  const [showFullScreen, setShowFullScreen] = useState(false);

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  return (
    <GradientBackground variant="primary" animated={true} intensity="medium">
      <div className="component-showcase">
        <div className="container">
          <h1 className="showcase-title">UI Components Showcase</h1>
          
          {/* Loading Spinner Demo */}
          <section className="demo-section">
            <h2>Loading Spinner</h2>
            <div className="demo-grid">
              <LoadingSpinner size="small" color="primary" text="Small" />
              <LoadingSpinner size="medium" color="accent" text="Medium" />
              <LoadingSpinner size="large" color="secondary" text="Large" />
            </div>
            <AnimatedButton 
              variant="primary" 
              onClick={() => setShowFullScreen(true)}
            >
              Show Full Screen Loading
            </AnimatedButton>
          </section>

          {/* Animated Button Demo */}
          <section className="demo-section">
            <h2>Animated Buttons</h2>
            <div className="demo-grid">
              <AnimatedButton variant="primary" size="small">Primary Small</AnimatedButton>
              <AnimatedButton variant="secondary" size="medium">Secondary Medium</AnimatedButton>
              <AnimatedButton variant="accent" size="large">Accent Large</AnimatedButton>
              <AnimatedButton variant="ghost" icon="🚀" iconPosition="left">Ghost with Icon</AnimatedButton>
              <AnimatedButton 
                variant="primary" 
                loading={loading}
                onClick={handleLoadingDemo}
              >
                Loading Demo
              </AnimatedButton>
            </div>
          </section>

          {/* Feature Card Demo */}
          <section className="demo-section">
            <h2>Feature Cards</h2>
            <div className="demo-grid">
              <FeatureCard
                icon="🎨"
                title="Beautiful Design"
                description="Modern and elegant UI components"
                gradient="primary"
                size="small"
              />
              <FeatureCard
                icon="⚡"
                title="Fast Performance"
                description="Optimized for speed and efficiency"
                gradient="accent"
                size="medium"
              />
              <FeatureCard
                icon="🔧"
                title="Easy to Use"
                description="Simple and intuitive interface"
                gradient="secondary"
                size="large"
              />
            </div>
          </section>

          {/* Stats Counter Demo */}
          <section className="demo-section">
            <h2>Stats Counter</h2>
            <div className="demo-grid">
              <div className="stat-demo">
                <StatsCounter 
                  end={1234} 
                  suffix="+" 
                  className="stats-counter--gradient stats-counter--large"
                />
                <p>Users</p>
              </div>
              <div className="stat-demo">
                <StatsCounter 
                  end={99.9} 
                  suffix="%" 
                  decimals={1}
                  className="stats-counter--accent stats-counter--medium"
                />
                <p>Uptime</p>
              </div>
              <div className="stat-demo">
                <StatsCounter 
                  end={50000} 
                  suffix="+" 
                  className="stats-counter--primary stats-counter--xl"
                />
                <p>Recipes</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Full Screen Loading Demo */}
      {showFullScreen && (
        <LoadingSpinner 
          size="large" 
          color="primary" 
          text="Loading amazing content..." 
          fullScreen={true}
        />
      )}
    </GradientBackground>
  );
};

export default ComponentShowcase;
