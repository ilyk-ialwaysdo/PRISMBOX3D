import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

// SVG Icons
const MessengerSocialIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.93 1.17 5.56 3 7.26V22l2.91-1.61c1.25.35 2.6.54 4.09.54 5.64 0 10.2-4.13 10.2-9.23S17.64 2 12 2zm1.13 12.44l-2.61-2.78-5.09 2.78L8.5 9.89l2.61 2.78 5.09-2.78-3.07 4.55z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-about">
              <h3>About PrismBox 3D</h3>
              <p>
                I'm a passionate student who turned his love for 3D printing into a service that helps bring digital ideas to life. 
                What started as a hobby has grown into a mission to make quality 3D printing accessible and affordable for everyone.
              </p>
              <div className="footer-location">
                <LocationIcon />
                <span>Based in Bulacan, Philippines</span>
              </div>
            </div>
            
            <div className="footer-contact">
              <h4>Get In Touch</h4>
              <div className="contact-item">
                <MessengerSocialIcon />
                <span>Messenger: Teddy Tapiador</span>
              </div>
              <div className="contact-item">
                <EmailIcon />
                <span>prismbox3dservice@gmail.com</span>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-copyright">
              <span>© 2025 PrismBox 3D Services. Beta Phase.</span>
            </div>
            
            <div className="footer-legal">
              <button 
                className="footer-link"
                onClick={() => navigate('/terms')}
              >
                Terms of Service
              </button>
              <span>•</span>
              <button 
                className="footer-link"
                onClick={() => navigate('/privacy')}
              >
                Privacy Policy
              </button>
            </div>
            
            <div className="footer-made-with">
              <span>Made with</span>
              <HeartIcon />
              <span>by a passionate student engineer</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
