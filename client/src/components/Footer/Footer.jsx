import React from 'react';
import './Footer.css';

const Footer = React.forwardRef(({ scrollToSection }, ref) => {
  const currentYear = new Date().getFullYear();

  return (
    <section ref={ref} id="footer" className="footer-section">
      <div className="container">
        <div className="footer-content">
          {/* Main Footer Content */}
          <div className="footer-main">
            <div className="footer-brand">
              <div className="brand-info">
                <div className="brand-logo">
                  <span className="brand-icon">🍳</span>
                  <span className="brand-text">ChefGenie</span>
                </div>
                <p className="brand-description">
                  Transform your cooking journey with ChefGenie's revolutionary AI-powered recipe discovery. 
                  From traditional family recipes to innovative fusion dishes, unlock endless culinary possibilities 
                  and create memorable dining experiences that bring joy to every meal.
                </p>
                <div className="social-links">
                  <a href="https://www.linkedin.com/in/dhruv-sachdeva-3b5aa9264/" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="footer-links">
              <div className="link-group">
                <h4 className="link-title">Discover</h4>
                <ul className="link-list">
                  <li><a onClick={() => scrollToSection('home')} className="footer-link">Get Dish Suggestions</a></li>
                  <li><a onClick={() => scrollToSection('popularRecipes')} className="footer-link">Popular Recipes</a></li>
                  <li><a href="#" className="footer-link">AI Features</a></li>
                </ul>
              </div>

              <div className="link-group">
                <h4 className="link-title">Support</h4>
                <ul className="link-list">
                  <li><a href="#" className="footer-link">Help Center</a></li>
                  <li><a href="#" className="footer-link">Contact Us</a></li>
                  <li><a href="#" className="footer-link">Bug Report</a></li>
                  <li><a href="#" className="footer-link">Feature Request</a></li>
                </ul>
              </div>

              <div className="link-group">
                <h4 className="link-title">Company</h4>
                <ul className="link-list">
                  <li><a href="#" className="footer-link">About Us</a></li>
                  <li><a href="#" className="footer-link">Privacy Policy</a></li>
                  <li><a href="#" className="footer-link">Terms of Service</a></li>
                  <li><a href="#" className="footer-link">Cookies</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="newsletter-section">
            <div className="newsletter-content">
              <div className="newsletter-text">
                <h3>Stay Updated</h3>
                <p>Get the latest recipes and cooking tips delivered to your inbox.</p>
              </div>
              <div className="newsletter-form">
                <div className="input-group">
                  <input type="email" placeholder="Enter your email" className="newsletter-input" />
                  <button className="newsletter-button">
                    <span>Subscribe</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <div className="copyright">
                <p>&copy; {currentYear} ChefGenie. All rights reserved.</p>
              </div>
              <div className="footer-bottom-links">
                <a href="#" className="footer-bottom-link">Privacy</a>
                <a href="#" className="footer-bottom-link">Terms</a>
                <a href="#" className="footer-bottom-link">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Footer;
