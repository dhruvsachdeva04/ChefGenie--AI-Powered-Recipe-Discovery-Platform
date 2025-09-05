import React, { useState, useEffect } from 'react'
import { Outlet, useLocation } from "react-router-dom";
import './Layout.css';

export const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="layout">
      <div className="background-pattern"></div>
      
      {/* Modern Navigation */}
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container">
          <div className="nav-content">
            <div className="nav-brand">
              <span className="brand-icon">🍳</span>
              <span className="brand-text">Recipify</span>
            </div>
            
            <div className="nav-links">
              <a href="#home" className="nav-link">Home</a>
              <a href="#popular-recipes" className="nav-link">Recipes</a>
              <a href="#testimonials" className="nav-link">Reviews</a>
              <a href="#footer" className="nav-link">Contact</a>
            </div>
            
            <div className="nav-actions">
              <button className="btn-secondary nav-btn">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}
