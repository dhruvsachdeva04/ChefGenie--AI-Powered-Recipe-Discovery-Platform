import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { AnimatedButton, StatsCounter } from '../UI';
import './Home.css'

const Home = React.forwardRef(({ scrollToSection }, ref) => {
  const [ingredients, setIngredients] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setIngredients(event.target.value);
  };

  const handleIngredientClick = (ingredient) => {
    setIngredients(ingredient);
    navigate('/search', { state: { ingredients: ingredient } });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (ingredients.trim()) {
      navigate('/search', { state: { ingredients: ingredients.trim() } });
    }
  };

  const popularIngredients = [
    { name: 'Tomato', emoji: '🍅' },
    { name: 'Mushroom', emoji: '🍄' },
    { name: 'Potato', emoji: '🥔' },
    { name: 'Carrot', emoji: '🥕' },
    { name: 'Yoghurt', emoji: '🥛' },
    { name: 'Onion', emoji: '🧅' },
    { name: 'Garlic', emoji: '🧄' },
    { name: 'Chicken', emoji: '🍗' }
  ];

  return (
    <section ref={ref} id="home" className="hero-section">
      <div className="container">
        <div className="hero-content">
          {/* Hero Text */}
          <div className="hero-text">
            <div className="hero-badge">
              <span className="badge-icon">✨</span>
              <span>AI-Powered Recipe Discovery</span>
            </div>
            
            <h1 className="hero-title">
              Transform Your
              <span className="gradient-text"> Ingredients</span>
              <br />
              Into Amazing
              <span className="gradient-text"> Dishes</span>
            </h1>
            
            <p className="hero-description">
              Stuck in a cooking rut? Enter your ingredients and let our AI suggest 
              delicious dishes instantly. Get step-by-step recipes and cook with confidence.
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearchSubmit} className="search-form">
              <div className={`search-container ${isSearchFocused ? 'focused' : ''}`}>
                <div className="search-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  value={ingredients}
                  onChange={handleInputChange}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Enter ingredients (e.g., tomato, onion, chicken)"
                  className="search-input"
                />
                <AnimatedButton 
                  type="submit" 
                  variant="primary" 
                  size="medium"
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  }
                  iconPosition="right"
                  className="search-button"
                >
                  Discover
                </AnimatedButton>
              </div>
            </form>

            {/* Popular Ingredients */}
            <div className="popular-ingredients">
              <p className="ingredients-label">Popular ingredients:</p>
              <div className="ingredients-grid">
                {popularIngredients.map((ingredient, index) => (
                  <button
                    key={index}
                    onClick={() => handleIngredientClick(ingredient.name)}
                    className="ingredient-tag"
                  >
                    <span className="ingredient-emoji">{ingredient.emoji}</span>
                    <span className="ingredient-name">{ingredient.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="hero-visual">
            <div className="floating-cards">
              <div className="floating-card card-1">
                <div className="card-icon">🍕</div>
                <div className="card-text">Pizza</div>
              </div>
              <div className="floating-card card-2">
                <div className="card-icon">🍜</div>
                <div className="card-text">Pasta</div>
              </div>
              <div className="floating-card card-3">
                <div className="card-icon">🍛</div>
                <div className="card-text">Curry</div>
              </div>
              <div className="floating-card card-4">
                <div className="card-icon">🥗</div>
                <div className="card-text">Salad</div>
              </div>
            </div>
            
            <div className="hero-image-container">
              <div className="hero-image">
                <img src="src/components/Home/pizz.png" alt="Delicious Food" />
              </div>
              <div className="image-glow"></div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-number">
              <StatsCounter 
                end={10000} 
                suffix="+" 
                duration={2000}
                className="stats-counter--gradient stats-counter--large"
              />
            </div>
            <div className="stat-label">Recipes</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              <StatsCounter 
                end={50000} 
                suffix="+" 
                duration={2500}
                className="stats-counter--gradient stats-counter--large"
              />
            </div>
            <div className="stat-label">Happy Cooks</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              <StatsCounter 
                end={4.9} 
                suffix="★" 
                duration={1500}
                decimals={1}
                className="stats-counter--gradient stats-counter--large"
              />
            </div>
            <div className="stat-label">Rating</div>
          </div>
        </div>
      </div>
    </section>
  )
});

export default Home
