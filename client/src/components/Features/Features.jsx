import React, { forwardRef } from 'react';
import { FeatureCard } from '../UI';
import './Features.css';

const Features = forwardRef((props, ref) => {
  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Suggestions',
      description: 'Get intelligent recipe recommendations based on your available ingredients and preferences.',
      gradient: 'primary'
    },
    {
      icon: '⚡',
      title: 'Instant Results',
      description: 'Find perfect recipes in seconds with our lightning-fast search and AI processing.',
      gradient: 'accent'
    },
    {
      icon: '🍽️',
      title: 'Diverse Cuisines',
      description: 'Explore recipes from around the world, from traditional Indian dishes to international favorites.',
      gradient: 'secondary'
    },
    {
      icon: '📱',
      title: 'Mobile Friendly',
      description: 'Access ChefGenie anywhere, anytime with our responsive design that works on all devices.',
      gradient: 'success'
    },
    {
      icon: '👨‍🍳',
      title: 'Step-by-Step Guide',
      description: 'Follow detailed cooking instructions with tips and tricks from professional chefs.',
      gradient: 'primary'
    },
    {
      icon: '⭐',
      title: 'Community Rated',
      description: 'Discover the most loved recipes based on ratings and reviews from our cooking community.',
      gradient: 'accent'
    }
  ];

  return (
    <section ref={ref} id="features" className="features-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <span className="badge-icon">✨</span>
            <span>Why Choose ChefGenie</span>
          </div>
          
          <h2 className="section-title">
            Powerful Features for <span className="gradient-text">Every Cook</span>
          </h2>
          
          <p className="section-description">
            Discover what makes ChefGenie the ultimate cooking companion for home chefs and food enthusiasts.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradient={feature.gradient}
              size="medium"
              interactive={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

export default Features;
