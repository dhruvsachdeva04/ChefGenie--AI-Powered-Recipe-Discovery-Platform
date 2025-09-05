import React from 'react'
import './testimonials.css';

const TestCard = ({profilep, profileName, role, rating, revieww}) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<span key={i} className="star">★</span>);
    }
    return stars;
  };

  return (
    <div className='testimonial-card'>
      <div className='card-header'>
        <div className='profile-info'>
          <div className='profile-image-container'>
            <img src={profilep} alt={profileName} className='profile-image' />
            <div className='profile-status'></div>
          </div>
          <div className='profile-details'>
            <h4 className='profile-name'>{profileName}</h4>
            <p className='profile-role'>{role}</p>
          </div>
        </div>
        <div className='rating'>
          {renderStars(rating)}
        </div>
      </div>
      
      <div className='card-content'>
        <div className='quote-icon'>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
          </svg>
        </div>
        <p className='review-text'>{revieww}</p>
      </div>
      
      <div className='card-footer'>
        <div className='review-date'>2 days ago</div>
        <div className='verified-badge'>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12l2 2 4-4"></path>
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
          <span>Verified</span>
        </div>
      </div>
    </div>
  )
}

export default TestCard