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
              Transparent Pricing
            </motion.h1>
            <motion.p 
              initial="hidden" 
              animate="visible" 
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
            >
              Simple, honest pricing with no hidden fees. Know exactly what you'll pay before you order.
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
            <h3>Pricing Formula</h3>
            <div className="formula">
              Material Weight × Price per gram + ₱50 Service Fee
            </div>
            <button className="calculator-btn" onClick={handleContactMessenger}>
              <MessengerIcon />
              Get Quote Now
            </button>
          </motion.div>
        </section>

        {/* Material Pricing */}
        <section className="material-pricing">
          <div className="section-header">
            <h2>Material Pricing</h2>
            <p>Per gram pricing for different filament types</p>
          </div>
          
          <motion.div 
            className="pricing-grid"
            initial="hidden"
            whileInView="visible"
            variants={stagger}
          >
            {materialPrices.map((material, index) => (
              <motion.div key={index} className="pricing-card" variants={fadeInUp}>
                <h3>{material.name}</h3>
                <div className="price">{material.price}/gram</div>
                <p>{material.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Service Fees */}
        <section className="service-fees">
          <div className="section-header">
            <h2>Service Fees</h2>
          </div>
          
          <motion.div 
            className="fees-grid"
            initial="hidden"
            whileInView="visible"
            variants={stagger}
          >
            <motion.div className="fee-item" variants={fadeInUp}>
              <h4>Setup & Processing</h4>
              <div className="fee-amount">₱50</div>
              <p>Covers printing setup, quality check, and basic packaging</p>
            </motion.div>
            
            <motion.div className="fee-item" variants={fadeInUp}>
              <h4>Rush Delivery</h4>
              <div className="fee-amount">₱150</div>
              <p>Same-day delivery via Lalamove once printing is complete</p>
            </motion.div>
            
            <motion.div className="fee-item" variants={fadeInUp}>
              <h4>Standard Shipping</h4>
              <div className="fee-amount">₱100-200</div>
              <p>1-3 days via LBC/2GO/J&T based on location and size</p>
            </motion.div>
          </motion.div>
        </section>

        {/* Examples */}
        <section className="pricing-examples">
          <div className="section-header">
            <h2>Pricing Examples</h2>
            <p>Real examples to help you estimate costs</p>
          </div>
          
          <motion.div 
            className="examples-grid"
            initial="hidden"
            whileInView="visible"
            variants={stagger}
          >
            {examples.map((example, index) => (
              <motion.div key={index} className="example-card" variants={fadeInUp}>
                <h4>{example.item}</h4>
                <div className="example-details">
                  <span>Weight: {example.weight}</span>
                  <span>Material: {example.material}</span>
                </div>
                <div className="calculation">{example.calculation}</div>
                <div className="total">{example.total}</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA */}
        <section className="pricing-cta">
          <motion.div 
            className="cta-content"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
          >
            <h2>Ready to Get Your Quote?</h2>
            <p>Send us your 3D model and get an exact quote based on this transparent pricing.</p>
            <div className="cta-buttons">
              <button className="btn btn-primary" onClick={handleContactMessenger}>
                <MessengerIcon />
                Get Quote via Messenger
              </button>
              <button className="btn btn-secondary" onClick={handleViewMaterials}>
                View All Materials
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
