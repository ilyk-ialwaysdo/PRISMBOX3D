import React from 'react';
import { useNavigate } from 'react-router-dom';
// REMOVED: import './Footer.css'; - TEMPORARILY REMOVED FOR WORKING WEBSITE

// Footer Icons - Using UNIQUE gradient ID to avoid conflicts
const PrismBoxIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="footerPrismGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B35" />
        <stop offset="50%" stopColor="#F7931E" />
        <stop offset="100%" stopColor="#FFB800" />
      </linearGradient>
    </defs>
    <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" fill="url(#footerPrismGradient)" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 2V22M3 7L21 17M21 7L3 17" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
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
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const LocationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const Footer = () => {
  const navigate = useNavigate();

  // Inline Styles for Professional Footer
  const styles = {
    footer: {
      background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
      color: 'white',
      marginTop: 'auto'
    },
    footerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '60px 2rem 40px'
    },
    footerGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '3rem',
      marginBottom: '3rem'
    },
    brandSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    brandHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '1rem'
    },
    brandName: {
      fontSize: '1.5rem',
      fontWeight: 'bold'
    },
    brandTagline: {
      fontSize: '0.9rem',
      opacity: 0.8
    },
    brandDescription: {
      color: 'rgba(255,255,255,0.8)',
      lineHeight: 1.6,
      fontSize: '0.95rem'
    },
    section: {
      display: 'flex',
      flexDirection: 'column'
    },
    sectionTitle: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: '#FF6B35'
    },
    linksList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    link: {
      color: 'rgba(255,255,255,0.8)',
      textDecoration: 'none',
      fontSize: '0.95rem',
      cursor: 'pointer',
      transition: 'color 0.3s ease'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '12px',
      color: 'rgba(255,255,255,0.8)',
      fontSize: '0.95rem'
    },
    socialSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    socialLinks: {
      display: 'flex',
      gap: '15px'
    },
    socialLink: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      background: 'rgba(255,255,255,0.1)',
      borderRadius: '50%',
      color: 'white',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    businessHours: {
      background: 'rgba(255,255,255,0.05)',
      padding: '15px',
      borderRadius: '8px',
      fontSize: '0.9rem'
    },
    footerBottom: {
      borderTop: '1px solid rgba(255,255,255,0.1)',
      paddingTop: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    copyright: {
      fontSize: '0.9rem',
      color: 'rgba(255,255,255,0.7)'
    },
    madeWith: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      fontSize: '0.9rem',
      color: 'rgba(255,255,255,0.7)'
    },
    heartRed: {
      color: '#e74c3c'
    }
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        {/* Main Footer Content */}
        <div style={styles.footerGrid}>
          {/* Brand Section */}
          <div style={styles.brandSection}>
            <div style={styles.brandHeader}>
              <PrismBoxIcon />
              <div>
                <div style={styles.brandName}>PrismBox</div>
                <div style={styles.brandTagline}>3D Services</div>
              </div>
            </div>
            <p style={styles.brandDescription}>
              Professional 3D printing services bringing your digital designs to life with precision, quality materials, and transparent pricing.
            </p>
            <div style={styles.businessHours}>
              <strong>Business Hours:</strong><br />
              Monday - Sunday: 9:00 AM - 8:00 PM (PHT)
            </div>
          </div>

          {/* Quick Links */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Quick Links</h3>
            <div style={styles.linksList}>
              <span style={styles.link} onClick={() => navigate('/')}>Home</span>
              <span style={styles.link} onClick={() => navigate('/pricing')}>Pricing</span>
              <span style={styles.link} onClick={() => navigate('/materials')}>Materials</span>
              <span style={styles.link} onClick={() => navigate('/faq')}>FAQ</span>
              <span style={styles.link} onClick={() => navigate('/privacy-policy')}>Privacy Policy</span>
              <span style={styles.link} onClick={() => navigate('/terms-of-service')}>Terms of Service</span>
            </div>
          </div>

          {/* Contact Info */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Contact Us</h3>
            <div style={styles.contactItem}>
              <EmailIcon />
              <span>prismbox3dservice@gmail.com</span>
            </div>
            <div style={styles.contactItem}>
              <MessengerIcon />
              <span>Teddy Tapiador (Messenger)</span>
            </div>
            <div style={styles.contactItem}>
              <LocationIcon />
              <span>Bulacan, Philippines</span>
            </div>
          </div>

          {/* Social & Connect */}
          <div style={styles.socialSection}>
            <h3 style={styles.sectionTitle}>Connect With Us</h3>
            <div style={styles.socialLinks}>
              <a 
                href="https://m.me/teddytapiador" 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.socialLink}
                title="Message us on Messenger"
              >
                <MessengerIcon />
              </a>
              <a 
                href="mailto:prismbox3dservice@gmail.com" 
                style={styles.socialLink}
                title="Email us"
              >
                <EmailIcon />
              </a>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Get instant quotes and updates via Messenger, or send detailed requests via email.
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div style={styles.footerBottom}>
          <div style={styles.copyright}>
            © {new Date().getFullYear()} PrismBox 3D Services. All rights reserved.
          </div>
          <div style={styles.madeWith}>
            Made with <span style={styles.heartRed}><HeartIcon /></span> by a student entrepreneur
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;