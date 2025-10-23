import React from 'react';
import Header from './Header';
import Footer from './Footer';
// REMOVED: import './TermsOfService.css'; - TEMPORARILY REMOVED FOR WORKING WEBSITE

const TermsOfService = () => {
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
          <h1 style={styles.heroTitle}>Terms of Service</h1>
          <p style={styles.heroText}>Our service terms and conditions</p>
        </section>

        {/* Content */}
        <div style={styles.content}>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>1. Service Agreement</h2>
            <p style={styles.text}>
              By using PrismBox 3D Services, you agree to these terms and conditions. We provide professional 3D printing services for personal, educational, and commercial use.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>2. Ordering Process</h2>
            <ul style={styles.list}>
              <li style={styles.listItem}>Customers submit 3D files (.STL, .3MF, .OBJ) via Messenger or email</li>
              <li style={styles.listItem}>We analyze files and provide detailed quotes within 24 hours</li>
              <li style={styles.listItem}>Payment is required before printing begins</li>
              <li style={styles.listItem}>We provide regular updates during the printing process</li>
            </ul>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>3. Pricing and Payment</h2>
            <p style={styles.text}>
              Pricing is calculated as: (Material Weight × Price per gram) + Service Fee (₱50) + Packaging (₱20). Volume discounts apply for larger orders. Student discounts require valid ID verification.
            </p>
            <p style={styles.text}>
              We accept GCash, bank transfers, and cash on delivery (Metro Manila only). Payment must be completed before printing begins.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>4. Quality Guarantee</h2>
            <p style={styles.text}>
              We guarantee the quality of our prints. If a print fails due to our error or equipment issues, we will reprint at no additional charge. We inspect all prints before delivery and provide quality check photos.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>5. Delivery and Shipping</h2>
            <ul style={styles.list}>
              <li style={styles.listItem}>We ship nationwide via LBC and J&T Express</li>
              <li style={styles.listItem}>Delivery fees vary by location and method</li>
              <li style={styles.listItem}>Tracking information is provided for all shipments</li>
              <li style={styles.listItem}>Free pickup available in Bulacan area</li>
            </ul>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>6. Intellectual Property</h2>
            <p style={styles.text}>
              Customers retain all rights to their designs. We will not reproduce, share, or distribute customer designs without explicit permission. We respect intellectual property and confidentiality.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>7. Limitations</h2>
            <p style={styles.text}>
              We reserve the right to refuse orders that violate laws, contain inappropriate content, or are impossible to print safely. We are not responsible for design flaws in customer files.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>8. Contact Information</h2>
            <p style={styles.text}>
              PrismBox 3D Services<br />
              Email: prismbox3dservice@gmail.com<br />
              Messenger: Teddy Tapiador<br />
              Business Hours: Monday-Sunday 9:00 AM - 8:00 PM (PHT)
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

export default TermsOfService;