import React from 'react';
import Header from './Header';
import Footer from './Footer';
// REMOVED: import './PrivacyPolicy.css'; - TEMPORARILY REMOVED FOR WORKING WEBSITE

const PrivacyPolicy = () => {
  const styles = {
    page: {
      fontFamily: 'Arial, sans-serif',
      lineHeight: 1.6,
      color: '#333',
      minHeight: '100vh',
      background: '#f8f9fa'
    },
    hero: {
      background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
      color: 'white',
      padding: '80px 2rem',
      textAlign: 'center'
    },
    heroTitle: {
      fontSize: '3rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
    },
    heroText: {
      fontSize: '1.2rem',
      opacity: 0.9
    },
    content: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '60px 2rem',
      background: 'white',
      marginTop: '-40px',
      marginBottom: '40px',
      borderRadius: '15px',
      boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
    },
    section: {
      marginBottom: '2.5rem'
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#FF6B35',
      marginBottom: '1rem'
    },
    text: {
      color: '#666',
      lineHeight: 1.7,
      marginBottom: '1rem'
    },
    list: {
      paddingLeft: '20px',
      color: '#666'
    },
    listItem: {
      marginBottom: '8px'
    },
    lastUpdated: {
      fontSize: '0.9rem',
      color: '#999',
      fontStyle: 'italic',
      textAlign: 'center',
      marginTop: '3rem'
    }
  };

  return (
    <>
      <Header />
      <div style={styles.page}>
        {/* Hero Section */}
        <section style={styles.hero}>
          <h1 style={styles.heroTitle}>Privacy Policy</h1>
          <p style={styles.heroText}>How we protect and handle your information</p>
        </section>

        {/* Content */}
        <div style={styles.content}>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>1. Information We Collect</h2>
            <p style={styles.text}>
              We collect information necessary to provide our 3D printing services, including contact details, 3D model files, and payment information.
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>Name and contact information</li>
              <li style={styles.listItem}>Email address and messenger details</li>
              <li style={styles.listItem}>3D model files and specifications</li>
              <li style={styles.listItem}>Delivery address and preferences</li>
              <li style={styles.listItem}>Payment information (processed securely)</li>
            </ul>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>2. How We Use Your Information</h2>
            <p style={styles.text}>Your information is used solely to provide our 3D printing services:</p>
            <ul style={styles.list}>
              <li style={styles.listItem}>Processing and fulfilling your orders</li>
              <li style={styles.listItem}>Communicating about your projects</li>
              <li style={styles.listItem}>Providing customer support</li>
              <li style={styles.listItem}>Improving our services</li>
              <li style={styles.listItem}>Sending important service updates</li>
            </ul>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>3. Information Security</h2>
            <p style={styles.text}>
              We take your privacy seriously and implement appropriate security measures to protect your personal information and 3D model files.
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>Secure file storage with access controls</li>
              <li style={styles.listItem}>Encrypted data transmission</li>
              <li style={styles.listItem}>Limited access to authorized personnel only</li>
              <li style={styles.listItem}>Regular security reviews and updates</li>
            </ul>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>4. Your 3D Model Files</h2>
            <p style={styles.text}>
              Your intellectual property rights are fully respected. We will never share, distribute, or reproduce your designs without explicit permission.
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>Files are used only for your specific order</li>
              <li style={styles.listItem}>Files are deleted after project completion (unless requested otherwise)</li>
              <li style={styles.listItem}>No sharing or distribution of your designs</li>
              <li style={styles.listItem}>Strict confidentiality maintained</li>
            </ul>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>5. Third-Party Services</h2>
            <p style={styles.text}>
              We use trusted third-party services for payment processing and delivery. These services have their own privacy policies and security measures.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>6. Contact Us</h2>
            <p style={styles.text}>
              If you have questions about this Privacy Policy or how we handle your information, please contact us:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>Email: prismbox3dservice@gmail.com</li>
              <li style={styles.listItem}>Messenger: Teddy Tapiador</li>
              <li style={styles.listItem}>Business Hours: Monday-Sunday 9:00 AM - 8:00 PM (PHT)</li>
            </ul>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>7. Policy Updates</h2>
            <p style={styles.text}>
              We may update this Privacy Policy from time to time. We will notify customers of any significant changes via email or messenger.
            </p>
          </div>

          <p style={styles.lastUpdated}>
            Last Updated: October 2025
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;