import React, { forwardRef } from 'react'
import { AnimatedButton } from '../UI';
import './popRec.css';
import RepCard from './RepCard'
import image1 from '../../assets/Chicken-Biryani-Recipe.jpg'
import image2 from '../../assets/rava-upma.jpeg'
import image3 from '../../assets/aloo-paratha.jpeg'

const popularRecipes = [
  {
    id: 1,
    recImage: image1,
    dishName: 'Chicken Biryani',
    prepTime: '30 min',
    cookTime: '45 min',
    difficulty: 'Medium',
    rating: 4.9,
    category: 'Mughlai',
    recLink: "https://www.indianhealthyrecipes.com/chicken-biryani-recipe/"
  },
  {
    id: 2,
    recImage: image2,
    dishName: 'Rava Upma',
    prepTime: '5 min',
    cookTime: '15 min',
    difficulty: 'Easy',
    rating: 4.6,
    category: 'South Indian',
    recLink: "https://www.indianhealthyrecipes.com/upma-recipe-how-to-make-upma/"
  },
  {
    id: 3,
    recImage: image3,
    dishName: 'Aloo Paratha',
    prepTime: '20 min',
    cookTime: '25 min',
    difficulty: 'Medium',
    rating: 4.8,
    category: 'North Indian',
    recLink: "https://www.indianhealthyrecipes.com/aloo-paratha/"
  },
]

const PopularRecipes = forwardRef((props, ref) => {
  return (
    <section ref={ref} id="popular-recipes" className="popular-recipes-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <span className="badge-icon">🔥</span>
            <span>Trending Now</span>
          </div>
          
          <h2 className="section-title">
            Popular <span className="gradient-text">Recipes</span>
          </h2>
          
          <p className="section-description">
            From over thousands of Indian recipes, these are the crowd-pleasers 
            that everyone loves to cook and enjoy.
          </p>
        </div>

        <div className="recipes-grid">
          {popularRecipes.map((recipe) => (
            <RepCard
              key={recipe.id}
              recImage={recipe.recImage}
              dishName={recipe.dishName}
              prepTime={recipe.prepTime}
              cookTime={recipe.cookTime}
              difficulty={recipe.difficulty}
              rating={recipe.rating}
              category={recipe.category}
              recLink={recipe.recLink}
            />
          ))}
        </div>

        <div className="section-footer">
          <AnimatedButton 
            variant="secondary" 
            size="medium"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            }
            iconPosition="right"
          >
            View All Recipes
          </AnimatedButton>
        </div>
      </div>
    </section>
  )
});

export default PopularRecipes