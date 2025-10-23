import React from 'react';
import { useNavigate } from 'react-router-dom';
// REMOVED: import './Header.css'; - TEMPORARILY REMOVED FOR WORKING WEBSITE

// COMPLETE Professional PrismBox Logo Icon
const PrismBoxIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="prismGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B35" />
        <stop offset="50%" stopColor="#F7931E" />
        <stop offset="100%" stopColor="#FFB800" />
      </linearGradient>
    </defs>
    <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" fill="url(#prismGradient)" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 2V22M3 7L21 17M21 7L3 17" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
  </svg>
);

const Header = () => {
  const navigate = useNavigate();
  
  const isActive = (path) => window.location.pathname === path;

  return (
    <header style={{
      background: 'linear-gradient(135deg, #FF6B35, #F7931E)',
      padding: '1rem 2rem',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Logo Section - Left */}
        <div 
          onClick={() => navigate('/')} 
          style={{ 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: 'white'
          }}
        >
          <PrismBoxIcon />
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>PrismBox</div>
            <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>3D Services</div>
          </div>
        </div>
        
        {/* Navigation - Right */}
        <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button 
            onClick={() => navigate('/')}
            style={{
              background: isActive('/') ? 'rgba(255,255,255,0.2)' : 'transparent',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Home
          </button>
          <button 
            onClick={() => navigate('/pricing')}
            style={{
              background: isActive('/pricing') ? 'rgba(255,255,255,0.2)' : 'transparent',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Pricing
          </button>
          <button 
            onClick={() => navigate('/materials')}
            style={{
              background: (isActive('/materials') || isActive('/filaments')) ? 'rgba(255,255,255,0.2)' : 'transparent',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Materials
          </button>
          <button 
            onClick={() => navigate('/faq')}
            style={{
              background: isActive('/faq') ? 'rgba(255,255,255,0.2)' : 'transparent',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            FAQ
          </button>
          
          {/* Contact Button */}
          <a 
            href="https://m.me/teddytapiador" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: 'bold',
              border: '2px solid rgba(255,255,255,0.3)'
            }}
          >
            Get Quote
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;