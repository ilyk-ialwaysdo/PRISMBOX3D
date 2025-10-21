import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Pricing.css';

const CalculatorIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="2" width="16" height="20" rx="2"/>
    <line x1="8" y1="6" x2="16" y2="6"/>
    <line x1="8" y1="10" x2="16" y2="10"/>
    <line x1="8" y1="14" x2="16" y2="14"/>
    <line x1="8" y1="18" x2="12" y2="18"/>
  </svg>
);

const MessengerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.93 1.17 5.56 3 7.26V22l2.91-1.61c1.25.35 2.6.54 4.09.54 5.64 0 10.2-4.13 10.2-9.23S17.64 2 12 2zm1.13 12.44l-2.61-2.78-5.09 2.78L8.5 9.89l2.61 2.78 5.09-2.78-3.07 4.55z"/>
  </svg>
);

// SVG Icons for info section
const StudentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

const PackageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const Pricing = () => {
  const navigate = useNavigate();

  const handleContactMessenger = () => {
    window.open('https://m.me/tedtapiador', '_blank');
  };

  const handleViewMaterials = () => {
    navigate('/filaments');
  };

  // Simplified material pricing data - only in stock materials
  const materialPrices = [
    { name: 'PLA Matte', brand: 'Polymaker', price: '₱3.50', description: 'Easy to print with beautiful matte finish' },
    { name: 'PLA+', brand: 'eSUN', price: '₱3.75', description: 'Stronger than regular PLA, great for functional parts' },
    { name: 'ABS', brand: 'Bambu Lab', price: '₱4.00', description: 'Heat resistant and durable for mechanical parts' },
    { name: 'PETG', brand: 'Overture', price: '₱4.00', description: 'Chemical resistant with excellent durability' }
  ];

  // Updated examples with correct pricing (₱150 + ₱20)
  const examples = [
    { 
      item: 'Small Item', 
      example: 'Phone case, small figurine', 
      weight: '30g', 
      material: 'PLA+', 
      calculation: '30g × ₱3.75 + ₱150 + ₱20', 
      total: '₱282.50' 
    },
    { 
      item: 'Large Item', 
      example: 'Tool holder, large prototype', 
      weight: '100g', 
      material: 'ABS', 
      calculation: '100g × ₱4.00 + ₱150 + ₱20', 
      total: '₱570' 
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <>
      <Header />
      <div className="pricing-page">
        {/* Hero Section */}
        <section className="pricing-hero">
          <div className="pricing-hero-content">
            <motion.h1 
              initial="hidden" 
              animate="visible" 
              variants={fadeInUp}
            >
              Simple Pricing
            </motion.h1>
            <motion.p 
              initial="hidden" 
              animate="visible" 
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
            >
              No hidden fees. Just material cost plus our service fees.
            </motion.p>
          </div>
        </section>

        {/* Calculator Preview */}
        <section className="calculator-preview">
          <motion.div 
            className="calculator-card"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <div className="calculator-icon">
              <CalculatorIcon />
            </div>
            <h3>How We Calculate</h3>
            <div className="formula">
              Material Weight × Price per gram + ₱150 + ₱20
            </div>
            <p className="formula-note">Simple formula, exact pricing</p>
            <button className="calculator-btn" onClick={handleContactMessenger}>
              <MessengerIcon />
              Get Your Quote
            </button>
          </motion.div>
        </section>

        {/* Material Pricing */}
        <section className="material-pricing">
          <div className="section-header">
            <h2>Material Prices</h2>
            <p>Per gram pricing for available materials</p>
          </div>
          
          <motion.div 
            className="pricing-grid"
            initial="hidden"
            whileInView="visible"
            variants={stagger}
          >
            {materialPrices.map((material, index) => (
              <motion.div key={index} className="pricing-card" variants={fadeInUp}>
                <div className="material-header">
                  <h3>{material.name}</h3>
                  <span className="brand-label">{material.brand}</span>
                </div>
                <div className="price">{material.price}/g</div>
                <p className="material-description">{material.description}</p>
                <div className="stock-indicator in-stock">✓ Available</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Service Fees */}
        <section className="service-fees">
          <div className="section-header">
            <h2>Service Fees</h2>
            <p>Additional fees for every order</p>
          </div>
          
          <motion.div 
            className="fees-grid"
            initial="hidden"
            whileInView="visible"
            variants={stagger}
          >
            <motion.div className="fee-item" variants={fadeInUp}>
              <h4>Setup & Quality Check</h4>
              <div className="fee-amount">₱150</div>
              <p>Includes printing setup, quality inspection, and processing</p>
            </motion.div>
            
            <motion.div className="fee-item" variants={fadeInUp}>
              <h4>Packaging & Handling</h4>
              <div className="fee-amount">₱20</div>
              <p>Secure packaging with protective materials for safe delivery</p>
            </motion.div>
            
            <motion.div className="fee-item" variants={fadeInUp}>
              <h4>Rush Order</h4>
              <div className="fee-amount">+50%</div>
              <p>Priority printing for urgent projects with faster delivery</p>
            </motion.div>
          </motion.div>
        </section>

        {/* Examples - Only 2 */}
        <section className="pricing-examples">
          <div className="section-header">
            <h2>Price Examples</h2>
            <p>See how our pricing works</p>
          </div>
          
          <motion.div 
            className="examples-container"
            initial="hidden"
            whileInView="visible"
            variants={stagger}
          >
            {examples.map((example, index) => (
              <motion.div key={index} className="example-card" variants={fadeInUp}>
                <div className="example-header">
                  <h4>{example.item}</h4>
                  <span className="example-note">({example.example})</span>
                </div>
                <div className="example-details">
                  <div className="detail-row">
                    <span>Weight:</span>
                    <span>{example.weight}</span>
                  </div>
                  <div className="detail-row">
                    <span>Material:</span>
                    <span>{example.material}</span>
                  </div>
                </div>
                <div className="calculation">{example.calculation}</div>
                <div className="total">{example.total}</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Simple Info */}
        <section className="pricing-info">
          <div className="container">
            <motion.div 
              className="info-content"
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
            >
              <h3>Good to Know</h3>
              <div className="info-grid">
                <div className="info-item">
                  <div className="info-icon">
                    <StudentIcon />
                  </div>
                  <h4>Student Discount</h4>
                  <p>10% off with valid student ID</p>
                </div>
                <div className="info-item">
                  <div className="info-icon">
                    <PackageIcon />
                  </div>
                  <h4>Secure Packaging</h4>
                  <p>All orders include protective packaging</p>
                </div>
                <div className="info-item">
                  <div className="info-icon">
                    <ShieldIcon />
                  </div>
                  <h4>Quality Guarantee</h4>
                  <p>Free reprint if we make an error</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="pricing-cta">
          <motion.div 
            className="cta-content"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
          >
            <h2>Ready for Your Quote?</h2>
            <p>Send us your file and get exact pricing in 24 hours</p>
            <div className="cta-buttons">
              <button className="btn btn-primary" onClick={handleContactMessenger}>
                <MessengerIcon />
                Get Quote Now
              </button>
              <button className="btn btn-secondary" onClick={handleViewMaterials}>
                View Materials
              </button>
            </div>
          </motion.div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
