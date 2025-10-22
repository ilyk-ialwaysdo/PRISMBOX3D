import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

// Professional PrismBox Logo Icon
const PrismBoxIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="prismGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B35" />
        <stop offset="50%" stopColor="#F7931E" />
        <stop offset="100%" stopColor="#FFB800" />
      </linearGradient>
    </defs>
    <path 
      d="M12 2L3 7V17L12 22L21 17V7L12 2Z" 
      fill="url(#prismGradient)" 
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

// Beta Badge Component
const BetaBadge = () => (
  <div className="beta-badge">
    Beta
  </div>
);

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <header className="header">
            <div className="header-container">
                
                {/* Logo Section - Left */}
                <div className="header-logo" onClick={() => navigate('/')}>
                    <div className="logo-container">
                        <PrismBoxIcon />
                        <div className="logo-text">
                            <span className="brand-name">PrismBox</span>
                            <span className="brand-subtitle">3D Services</span>
                        </div>
                    </div>
                    <BetaBadge />
                </div>

                {/* Right Side - Navigation + Contact */}
                <div className="header-right">
                    
                    {/* Navigation Menu */}
                    <nav className="header-nav">
                        <button 
                            className={`nav-button ${isActive('/pricing') ? 'active' : ''}`}
                            onClick={() => navigate('/pricing')}
                        >
                            Get Quote
                        </button>
                        <button 
                            className={`nav-button ${isActive('/materials') || isActive('/filaments') ? 'active' : ''}`}
                            onClick={() => navigate('/materials')}
                        >
                            Filaments
                        </button>
                        <button 
                            className={`nav-button ${isActive('/faq') ? 'active' : ''}`}
                            onClick={() => navigate('/faq')}
                        >
                            Support
                        </button>
                    </nav>

                    {/* Contact Button */}
                    <div className="header-cta">
                        <button 
                            className="contact-button"
                            onClick={() => window.open('https://m.me/teddytapiador', '_blank')}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.93 1.17 5.56 3 7.26V22l2.91-1.61c1.25.35 2.6.54 4.09.54 5.64 0 10.2-4.13 10.2-9.23S17.64 2 12 2zm1.13 12.44l-2.61-2.78-5.09 2.78L8.5 9.89l2.61 2.78 5.09-2.78-3.07 4.55z"/>
                            </svg>
                            <span>Contact Us</span>
                        </button>
                    </div>

                </div>

            </div>
        </header>
    );
};

export default Header;
