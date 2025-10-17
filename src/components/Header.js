import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getProgressStep = () => {
    switch (location.pathname) {
      case '/': return 1;
      case '/configure': return 2;
      case '/payment': return 3;
      default: return 1;
    }
  };

  return (
    <motion.header 
      className="header glass-panel"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="header-content">
        {/* Logo/Brand */}
        <div className="brand" onClick={() => navigate('/')}>
          <div className="brand-icon">
            <div className="prism-logo">
              <div className="prism-mini"></div>
            </div>
          </div>
          <div className="brand-text">
            <h1>PRISM</h1>
            <span>PRINT SERVICES</span>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="progress-indicator">
          <div className="progress-steps">
            <div className={`progress-step ${getProgressStep() >= 1 ? 'active' : ''} ${getProgressStep() > 1 ? 'completed' : ''}`}>
              <div className="step-number">1</div>
              <span>Home</span>
            </div>
            <div className="progress-line">
              <div 
                className="progress-fill" 
                style={{ width: getProgressStep() > 1 ? '100%' : '0%' }}
              ></div>
            </div>
            <div className={`progress-step ${getProgressStep() >= 2 ? 'active' : ''} ${getProgressStep() > 2 ? 'completed' : ''}`}>
              <div className="step-number">2</div>
              <span>Configure</span>
            </div>
            <div className="progress-line">
              <div 
                className="progress-fill" 
                style={{ width: getProgressStep() > 2 ? '100%' : '0%' }}
              ></div>
            </div>
            <div className={`progress-step ${getProgressStep() >= 3 ? 'active' : ''}`}>
              <div className="step-number">3</div>
              <span>Payment</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="navigation">
          <button 
            className={`nav-button ${location.pathname === '/' ? 'active' : ''}`}
            onClick={() => navigate('/')}
          >
            Home
          </button>
          <button 
            className={`nav-button ${location.pathname === '/configure' ? 'active' : ''}`}
            onClick={() => navigate('/configure')}
          >
            Configure
          </button>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
