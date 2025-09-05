import React, { forwardRef } from 'react'
import './testimonials.css';
import TestCard from './TestCard';
import image1 from '../../assets/cat.png'
import image2 from '../../assets/cat2.png'
import image3 from '../../assets/cat3.png'

const testimonials = [
  {
    id: 1,
    profilep: image1,
    profileName: 'Ayush Gupta',
    role: 'Food Blogger',
    rating: 5,
    revieww: 'Recipify is my go-to for meal inspiration. The app makes it so easy to find new and exciting dishes to try. The AI suggestions are spot-on and the recipes are always delicious!'
  },
  {
    id: 2,
    profilep: image2,
    profileName: 'Sanket Trivedi',
    role: 'Home Chef',
    rating: 5,
    revieww: 'Fantastic app! Recipify helps me make the most of what I have in the kitchen. The recipe suggestions and easy navigation make meal planning so much easier. Love it!'
  },
  {
    id: 3,
    profilep: image3,
    profileName: 'Aditya Gahukar',
    role: 'Cooking Enthusiast',
    rating: 5,
    revieww: 'I love how Recipify simplifies meal planning. Input your ingredients, get dish ideas, and view recipes all in one place. It\'s like having a personal chef in my pocket!'
  },
]

const Testimonials = forwardRef((props, ref) => {
  return (
    <section ref={ref} id="testimonials" className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <span className="badge-icon">💬</span>
            <span>User Reviews</span>
          </div>
          
          <h2 className="section-title">
            What Our <span className="gradient-text">Users Say</span>
          </h2>
          
          <p className="section-description">
            Don't just take our word for it. Here's what our amazing community 
            of home cooks and food lovers have to say about Recipify.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <TestCard
              key={testimonial.id}
              profilep={testimonial.profilep}
              profileName={testimonial.profileName}
              role={testimonial.role}
              rating={testimonial.rating}
              revieww={testimonial.revieww}
            />
          ))}
        </div>

        <div className="testimonials-stats">
          <div className="stat-item">
            <div className="stat-number">4.9★</div>
            <div className="stat-label">Average Rating</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">10K+</div>
            <div className="stat-label">Happy Users</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50K+</div>
            <div className="stat-label">Recipes Discovered</div>
          </div>
        </div>
      </div>
    </section>
  )
});

export default Testimonials
