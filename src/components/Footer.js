import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

// Footer Icons - Using UNIQUE gradient ID to avoid conflicts
const PrismBoxIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="footerPrismGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B35" />
        <stop offset="50%" stopColor="#F7931E" />
        <stop offset="100%" stopColor="#FFB800" />
      </linearGradient>
    </defs>
    <path 
      d="M12 2L3 7V17L12 22L21 17V7L12 2Z" 
      fill="url(#footerPrismGradient)" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
    <path 
      d="M12 2V22M3 7L21 17M21 7L3 17" 
      stroke="rgba(255,255,255,0.3)" 
      strokeWidth="1"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const MessengerIcon = () => (
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
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className="footer">
            <div className="footer-container">
                
                {/* Main Footer Content */}
                <div className="footer-main">
                    
                    {/* About Section */}
                    <div className="footer-section about-section">
                        <div className="footer-logo">
                            <PrismBoxIcon />
                            <div>
                                <h3>PrismBox</h3>
                                <span>3D Services</span>
                            </div>
                        </div>
                        <p className="footer-description">
                            I'm a passionate student who loves bringing digital designs to life through 3D printing. 
                            What started as a hobby has grown into a service focused on quality, affordability, 
                            and helping fellow creators realize their projects.
                        </p>
                        <div className="footer-stats">
                            <div className="stat">
                                <strong>Beta Phase</strong>
                                <span>Currently in beta testing</span>
                            </div>
                            <div className="stat">
                                <strong>Student-Owned</strong>
                                <span>Supporting education</span>
                            </div>
                        </div>
                    </div>

                    {/* Services Section */}
                    <div className="footer-section">
                        <h4>Services</h4>
                        <ul className="footer-links">
                            <li>
                                <button onClick={() => navigate('/pricing')}>
                                    3D Printing Quote
                                </button>
                            </li>
                            <li>
                                <button onClick={() => navigate('/materials')}>
                                    Material Selection
                                </button>
                            </li>
                            <li>
                                <button onClick={() => navigate('/faq')}>
                                    Support & FAQ
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="footer-section">
                        <h4>Get In Touch</h4>
                        <div className="contact-info">
                            <a 
                                href="https://m.me/teddytapiador" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="contact-item"
                            >
                                <MessengerIcon />
                                <div>
                                    <strong>Messenger</strong>
                                    <span>Teddy Tapiador</span>
                                </div>
                            </a>
                            <a 
                                href="mailto:prismbox3dservice@gmail.com"
                                className="contact-item"
                            >
                                <EmailIcon />
                                <div>
                                    <strong>Email</strong>
                                    <span>prismbox3dservice@gmail.com</span>
                                </div>
                            </a>
                            <div className="contact-item">
                                <LocationIcon />
                                <div>
                                    <strong>Location</strong>
                                    <span>Bulacan, Philippines</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <div className="footer-bottom-left">
                        <p className="copyright">
                            © 2025 PrismBox 3D Services. All rights reserved.
                        </p>
                        <p className="made-with-love">
                            Made with <HeartIcon /> by Teddy Tapiador
                        </p>
                    </div>
                    
                    <div className="footer-bottom-center">
                        <div className="footer-links-legal">
                            <button onClick={() => navigate('/privacy')}>
                                Privacy Policy
                            </button>
                            <button onClick={() => navigate('/terms')}>
                                Terms of Service
                            </button>
                        </div>
                    </div>

                    <div className="footer-bottom-right">
                        <div className="social-links">
                            <a 
                                href="https://facebook.com/teddytapiador" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                            >
                                <FacebookIcon />
                            </a>
                            <a 
                                href="https://m.me/teddytapiador" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                aria-label="Messenger"
                            >
                                <MessengerIcon />
                            </a>
                            <a 
                                href="mailto:prismbox3dservice@gmail.com"
                                aria-label="Email"
                            >
                                <EmailIcon />
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
