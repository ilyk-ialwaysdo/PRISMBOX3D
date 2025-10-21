import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

// SVG Icons
const BetaIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
  </svg>
);

const MessengerSocialIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.93 1.17 5.56 3 7.26V22l2.91-1.61c1.25.35 2.6.54 4.09.54 5.64 0 10.2-4.13 10.2-9.23S17.64 2 12 2zm1.13 12.44l-2.61-2.78-5.09 2.78L8.5 9.89l2.61 2.78 5.09-2.78-3.07 4.55z"/>
  </svg>
);

const PrismLogo = () => (
  <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="prismGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#007AFF"/>
        <stop offset="100%" stopColor="#34C759"/>
      </linearGradient>
    </defs>
    <polygon points="50,10 20,35 50,60 80,35" fill="url(#prismGrad)" opacity="0.8"/>
    <polygon points="50,60 20,85 50,90 80,85" fill="url(#prismGrad)" opacity="0.6"/>
    <polygon points="20,35 50,60 20,85 10,60" fill="url(#prismGrad)" opacity="0.4"/>
    <polygon points="80,35 50,60 80,85 90,60" fill="url(#prismGrad)" opacity="0.4"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleStartPrinting = () => {
    window.open('https://m.me/tedtapiador', '_blank');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Beta Banner */}
      <div className="beta-banner">
        <div className="beta-container">
          <BetaIcon />
          <span>We're in Beta! Send us your files for professional 3D printing services via Messenger & Email.</span>
        </div>
      </div>

      {/* Header Navigation */}
      <header className="app-header">
        <div className="header-container">
          {/* Logo Section */}
          <div className="logo-group" onClick={() => handleNavClick('/')}>
            <div className="prism-logo">
              <PrismLogo />
            </div>
            <div className="logo-text">
              <span className="logo-title">PrismBox</span>
              <span className="logo-subtitle">3D Services</span>
            </div>
            <div className="beta-badge">
              <BetaIcon />
              <span>Beta</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="nav-links">
            <button className="nav-link" onClick={() => handleNavClick('/pricing')}>
              Pricing
            </button>
            <button className="nav-link" onClick={() => handleNavClick('/filaments')}>
              Materials
            </button>
            <button className="nav-link" onClick={() => handleNavClick('/faq')}>
              FAQ
            </button>
          </nav>

          {/* Header Actions */}
          <div className="header-actions">
            <button className="contact-btn" onClick={handleStartPrinting}>
              <MessengerSocialIcon />
              Contact Us
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-btn"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-nav">
            <div className="mobile-nav-content">
              <button className="mobile-nav-link" onClick={() => handleNavClick('/pricing')}>
                Pricing
              </button>
              <button className="mobile-nav-link" onClick={() => handleNavClick('/filaments')}>
                Materials
              </button>
              <button className="mobile-nav-link" onClick={() => handleNavClick('/faq')}>
                FAQ
              </button>
              <div className="mobile-nav-divider"></div>
              <button className="mobile-contact-btn" onClick={handleStartPrinting}>
                <MessengerSocialIcon />
                Contact Us
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
