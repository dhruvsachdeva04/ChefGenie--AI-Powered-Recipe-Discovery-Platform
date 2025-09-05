import React from 'react'
import './popRec.css';

const RepCard = ({recImage, dishName, prepTime, cookTime, difficulty, rating, category, recLink}) => {

  const handleCardClick = () => {
    window.open(recLink, '_blank');
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return '#43e97b';
      case 'medium':
        return '#f093fb';
      case 'hard':
        return '#f5576c';
      default:
        return '#667eea';
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }
    
    return stars;
  };

  return (
    <div className='recipe-card' onClick={handleCardClick}>
      <div className='card-image-container'>
        <img src={recImage} alt={dishName} className='card-image' />
        <div className='card-overlay'>
          <div className='category-badge'>{category}</div>
          <div className='difficulty-badge' style={{ backgroundColor: getDifficultyColor(difficulty) }}>
            {difficulty}
          </div>
        </div>
      </div>
      
      <div className='card-content'>
        <h3 className='dish-name'>{dishName}</h3>
        
        <div className='card-meta'>
          <div className='time-info'>
            <div className='time-item'>
              <span className='time-icon'>⏱️</span>
              <span className='time-label'>Prep</span>
              <span className='time-value'>{prepTime}</span>
            </div>
            <div className='time-item'>
              <span className='time-icon'>🔥</span>
              <span className='time-label'>Cook</span>
              <span className='time-value'>{cookTime}</span>
            </div>
          </div>
          
          <div className='rating-info'>
            <div className='stars'>{renderStars(rating)}</div>
            <span className='rating-value'>{rating}</span>
          </div>
        </div>
        
        <div className='card-footer'>
          <span className='view-recipe'>View Recipe</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default RepCard