import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatedButton, LoadingSpinner } from '../UI';
import './SearchScreen.css'
import { getDishSuggestions } from '../../geminiService'
import { fetchRecipe } from '../../apiService'

const SearchScreen = () => {
  const [ingredients, setIngredients] = useState('');
  const [dishes, setDishes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.ingredients) {
      setIngredients(location.state.ingredients);
      handleCook(location.state.ingredients);
    }
  }, [location.state?.ingredients]);

  const handleInputChange = (event) => {
    setIngredients(event.target.value);
  };

  const handleIngredientClick = (ingredient) => {
    setIngredients(ingredient);
    handleCook(ingredient);
  };

  const handleCook = async (ingredientsToUse) => {
    setLoading(true);
    setSelectedRecipe(null);
    try {
      const suggestedDishes = await getDishSuggestions(ingredientsToUse || ingredients);
      setDishes(suggestedDishes);
    } catch (error) {
      console.error('Error getting dish suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDishClick = async (dish) => {
    setLoading(true);
    try {
      const recipeData = await fetchRecipe(dish);
      setSelectedRecipe({
        ...recipeData,
        dishName: dish
      });
    } catch (error) {
      console.error('Error fetching recipe:', error);
      alert('Failed to fetch the recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (ingredients.trim()) {
      handleCook(ingredients.trim());
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
    <div className="search-screen">
      <div className="container">
        {/* Header */}
        <div className="search-header">
          <AnimatedButton 
            variant="ghost" 
            size="medium"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"></path>
              </svg>
            }
            iconPosition="left"
            onClick={handleBackClick}
            className="back-button"
          >
            Back to Home
          </AnimatedButton>
          
          <div className="search-title">
            <h1>Discover Amazing Recipes</h1>
            <p>Enter your ingredients and let AI suggest delicious dishes for you</p>
          </div>
        </div>

        {/* Search Section */}
        <div className="search-section">
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
                loading={loading}
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                }
                iconPosition="right"
                className="search-button"
                disabled={loading}
              >
                Discover
              </AnimatedButton>
            </div>
          </form>

          {/* Popular Ingredients */}
          <div className="popular-ingredients">
            <p className="ingredients-label">Quick ingredients:</p>
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

        {/* Dishes Section */}
        {dishes.length > 0 && (
          <div className="dishes-section">
            <h2 className="section-title">Suggested Dishes</h2>
            <div className="dishes-grid">
              {dishes.map((dish, index) => (
                <button
                  key={index}
                  onClick={() => handleDishClick(dish)}
                  className="dish-card"
                >
                  <div className="dish-icon">🍽️</div>
                  <div className="dish-name">{dish}</div>
                  <div className="dish-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Recipe Section */}
        {selectedRecipe && (
          <div className="recipe-section">
            <div className="recipe-header">
              <h2 className="recipe-title">Recipe for {selectedRecipe.dishName}</h2>
              <div className="recipe-badge">
                <span className="badge-icon">👨‍🍳</span>
                <span>AI Generated Recipe</span>
              </div>
            </div>
            
            <div className="recipe-content">
              <div className="recipe-column">
                <div className="recipe-card">
                  <div className="card-header">
                    <div className="card-icon">🥘</div>
                    <h3>Ingredients</h3>
                  </div>
                  <div className="card-content">
                    <div className="ingredients-list">
                      {selectedRecipe.ingredients}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="recipe-column">
                <div className="recipe-card">
                  <div className="card-header">
                    <div className="card-icon">📝</div>
                    <h3>Instructions</h3>
                  </div>
                  <div className="card-content">
                    <div className="instructions-list">
                      {selectedRecipe.instructions}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && !selectedRecipe && (
          <div className="loading-section">
            <LoadingSpinner 
              size="large" 
              color="primary" 
              text="Discovering amazing recipes..." 
              fullScreen={false}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchScreen
