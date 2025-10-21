import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Pricing.css';

const CalculatorIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="8" y1="10" x2="16" y2="10" />
    <line x1="8" y1="14" x2="16" y2="14" />
    <line x1="8" y1="18" x2="12" y2="18" />
  </svg>
);

const MessengerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.93 1.17 5.56 3 7.26V22l2.91-1.61c1.25.35 2.6.54 4.09.54 5.64 0 10.2-4.13 10.2-9.23S17.64 2 12 2zm1.13 12.44l-2.61-2.78-5.09 2.78L8.5 9.89l2.61 2.78 5.09-2.78-3.07 4.55z" />
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

  // Material pricing data
  const materialPrices = [
    { name: 'PLA+', price: '₱8', description: 'Standard, easy to print' },
    { name: 'PETG', price: '₱12', description: 'Chemical resistant, durable' },
    { name: 'ABS', price: '₱10', description: 'Strong, heat resistant' },
  ];

  // Example calculations
  const examples = [
    { item: 'Small figurine', weight: '20g', material: 'PLA+', calculation: '20g × ₱8 + ₱50', total: '₱210' },
    { item: 'Phone case', weight: '35g', material: 'PETG', calculation: '35g × ₱12 + ₱50', total: '₱470' },
    { item: 'Tool holder', weight: '80g', material: 'ABS', calculation: '80g × ₱10 + ₱50', total: '₱850' },
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
    <div className="pricing-page">
      {/* Hero Section */}
      <motion.section 
        className="pricing-hero"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="pricing-hero-content">
          <h1>Transparent Pricing</h1>
          <p>Simple, honest pricing with no hidden fees. Know exactly what you'll pay before you order.</p>
        </div>
      </motion.section>

      {/* Pricing Formula */}
      <motion.section 
        className="pricing-formula-section"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <div className="section-container">
          <motion.div className="formula-main" variants={fadeInUp}>
            <div className="formula-icon">
              <CalculatorIcon />
            </div>
            <h2>Our Pricing Formula</h2>
            <div className="formula-card">
              <div className="formula-breakdown">
                <div className="formula-part">
                  <span className="formula-label">Material Weight</span>
                  <span className="formula-unit">(grams)</span>
                </div>
                <div className="formula-operator">×</div>
                <div className="formula-part">
                  <span className="formula-label">Material Price</span>
                  <span className="formula-unit">(per gram)</span>
                </div>
                <div className="formula-operator">+</div>
                <div className="formula-part">
                  <span className="formula-label">Service Fee</span>
                  <span className="formula-value">₱50</span>
                </div>
                <div className="formula-equals">=</div>
                <div className="formula-result">
                  <span className="formula-label">Total Price</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Material Prices */}
          <motion.div className="material-prices" variants={fadeInUp}>
            <h3>Material Prices per Gram</h3>
            <div className="materials-grid">
              {materialPrices.map((material, index) => (
                <div key={index} className="material-price-card">
                  <h4>{material.name}</h4>
                  <div className="price">{material.price}/gram</div>
                  <p>{material.description}</p>
                </div>
              ))}
            </div>
            <button className="cta-button secondary" onClick={handleViewMaterials}>
              View All Materials & Colors
            </button>
          </motion.div>

          {/* Examples */}
          <motion.div className="pricing-examples" variants={fadeInUp}>
            <h3>Pricing Examples</h3>
            <div className="examples-grid">
              {examples.map((example, index) => (
                <div key={index} className="example-card">
                  <h4>{example.item}</h4>
                  <div className="example-details">
                    <span className="example-weight">{example.weight} {example.material}</span>
                  </div>
                  <div className="example-calculation">
                    {example.calculation}
                  </div>
                  <div className="example-total">
                    <strong>{example.total}</strong>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Additional Fees */}
          <motion.div className="additional-info" variants={fadeInUp}>
            <div className="info-grid">
              <div className="info-card">
                <h4>Service Fee</h4>
                <div className="info-price">₱50</div>
                <p>Covers printing setup, quality check, and basic packaging</p>
              </div>
              <div className="info-card">
                <h4>Delivery (Metro Manila)</h4>
                <div className="info-price">₱50-150</div>
                <p>Same-day delivery via Lalamove once printing is complete</p>
              </div>
              <div className="info-card">
                <h4>Provincial Delivery</h4>
                <div className="info-price">Varies</div>
                <p>1-3 days via LBC/2GO/J&T based on location and size</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="pricing-cta"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="section-container">
          <div className="cta-content">
            <h3>Ready for Your Quote?</h3>
            <p>Send us your 3D model and get an exact quote based on this transparent pricing.</p>
            <button className="cta-button primary" onClick={handleContactMessenger}>
              <MessengerIcon />
              <span>Get Your Quote</span>
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Pricing;
