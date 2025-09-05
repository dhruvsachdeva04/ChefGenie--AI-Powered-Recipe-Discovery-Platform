import React, { forwardRef } from 'react'
import { AnimatedButton } from '../UI';
import './popRec.css';
import RepCard from './RepCard'
import image1 from '../../assets/pavv.png'
import image2 from '../../assets/dosa.png'
import image3 from '../../assets/gulab.png'

const popularRecipes = [
  {
    id: 1,
    recImage: image1,
    dishName: 'Pav Bhaji',
    prepTime: '15 min',
    cookTime: '35 min',
    difficulty: 'Easy',
    rating: 4.9,
    category: 'Street Food',
    recLink: "https://www.indianhealthyrecipes.com/pav-bhaji-recipe-how-to-make-pav-bhaji-step-by-step-pictures/"
  },
  {
    id: 2,
    recImage: image2,
    dishName: 'Masala Dosa',
    prepTime: '10 min',
    cookTime: '60 min',
    difficulty: 'Medium',
    rating: 4.7,
    category: 'South Indian',
    recLink: "https://www.indianhealthyrecipes.com/masala-dosa-recipe/"
  },
  {
    id: 3,
    recImage: image3,
    dishName: 'Gulab Jamun',
    prepTime: '10 min',
    cookTime: '20 min',
    difficulty: 'Easy',
    rating: 4.8,
    category: 'Dessert',
    recLink: "https://www.indianhealthyrecipes.com/gulab-jamun-recipe-using-milk-powder/"
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