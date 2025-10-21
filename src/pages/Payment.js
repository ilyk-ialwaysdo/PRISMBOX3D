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

  // Updated material pricing data from your Filaments page
  const materialPrices = [
    { name: 'PLA Matte', brand: 'Polymaker', price: '₱3.50', description: 'Professional matte finish, hides layer lines', inStock: true },
    { name: 'PLA+', brand: 'eSUN', price: '₱3.75', description: 'Enhanced strength, low warping', inStock: true },
    { name: 'ABS', brand: 'Bambu Lab', price: '₱4.00', description: 'Heat resistant, high impact strength', inStock: true },
    { name: 'PETG', brand: 'Overture', price: '₱4.00', description: 'Chemical resistant, durable', inStock: true },
    { name: 'PLA Pro', brand: 'Polymaker', price: '₱4.10', description: 'Exceptional toughness, ABS-like strength', inStock: false },
    { name: 'PLA Basic', brand: 'Bambu Lab', price: '₱5.20', description: 'High-speed optimized, RFID enabled', inStock: false },
    { name: 'ASA', brand: 'Bambu Lab', price: '₱6.00', description: 'UV resistant, weatherproof', inStock: false },
    { name: 'PETG-CF', brand: 'Bambu Lab', price: '₱7.70', description: 'Carbon fiber reinforced, premium finish', inStock: false }
  ];

  // Updated example calculations with real prices
  const examples = [
    { item: 'Small figurine (PLA Matte)', weight: '20g', material: 'PLA Matte', calculation: '20g × ₱3.50 + ₱50', total: '₱120' },
    { item: 'Phone case (PETG)', weight: '35g', material: 'PETG', calculation: '35g × ₱4.00 + ₱50', total: '₱190' },
    { item: 'Tool holder (ABS)', weight: '80g', material: 'ABS', calculation: '80g × ₱4.00 + ₱50', total: '₱370' },
    { item: 'Large model (PLA+)', weight: '150g', material: 'PLA+', calculation: '150g × ₱3.75 + ₱50', total: '₱612.50' }
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
            <p>Per gram pricing for different filament types and brands</p>
          </div>
          
          <motion.div 
            className="pricing-grid"
            initial="hidden"
            whileInView="visible"
            variants={stagger}
          >
            {materialPrices.map((material, index) => (
              <motion.div key={index} className={`pricing-card ${!material.inStock ? 'out-of-stock' : ''}`} variants={fadeInUp}>
                <div className="material-header">
                  <h3>{material.name}</h3>
                  <span className="brand-label">{material.brand}</span>
                </div>
                <div className="price">{material.price}/gram</div>
                <p>{material.description}</p>
                <div className={`stock-indicator ${material.inStock ? 'in-stock' : 'out-of-stock'}`}>
                  {material.inStock ? '✓ In Stock' : '⏳ Coming Soon'}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Service Fees */}
        <section className="service-fees">
          <div className="section-header">
            <h2>Service Fees</h2>
            <p>Additional costs for premium services</p>
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
              <p>Covers printing setup, quality check, and basic packaging for all orders</p>
            </motion.div>
            
            <motion.div className="fee-item" variants={fadeInUp}>
              <h4>Premium Packaging</h4>
              <div className="fee-amount">₱20</div>
              <p>Secure packaging with bubble wrap and protective materials for safe delivery</p>
            </motion.div>
            
            <motion.div className="fee-item" variants={fadeInUp}>
              <h4>Rush Processing</h4>
              <div className="fee-amount">+50%</div>
              <p>Priority printing for urgent orders with same-day or next-day completion</p>
            </motion.div>

            <motion.div className="fee-item" variants={fadeInUp}>
              <h4>Express Delivery</h4>
              <div className="fee-amount">₱150-250</div>
              <p>Same-day delivery via Lalamove for Metro Manila orders</p>
            </motion.div>
          </motion.div>
        </section>

        {/* Examples */}
        <section className="pricing-examples">
          <div className="section-header">
            <h2>Pricing Examples</h2>
            <p>Real examples with updated material prices</p>
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

        {/* Pricing Notes */}
        <section className="pricing-notes">
          <div className="container">
            <motion.div 
              className="notes-content"
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
            >
              <h3>Important Pricing Notes</h3>
              <div className="notes-grid">
                <div className="note-item">
                  <h4>📏 Weight Calculation</h4>
                  <p>Material weight is calculated automatically from your 3D file. We use industry-standard slicing software for accurate estimates.</p>
                </div>
                <div className="note-item">
                  <h4>🎓 Student Discount</h4>
                  <p>Students with valid ID get 10% off on all orders. Just mention you're a student when requesting a quote.</p>
                </div>
                <div className="note-item">
                  <h4>📦 Bulk Orders</h4>
                  <p>Orders over 500g of material may qualify for volume discounts. Contact us for custom pricing on large projects.</p>
                </div>
                <div className="note-item">
                  <h4>🔄 Reprints</h4>
                  <p>If we make an error during printing, we'll reprint your item for free. Quality guarantee on all our work.</p>
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
            <h2>Ready to Get Your Quote?</h2>
            <p>Send us your 3D model and get an exact quote based on this transparent pricing.</p>
            <div className="cta-buttons">
              <button className="btn btn-primary" onClick={handleContactMessenger}>
                <MessengerIcon />
                Get Quote via Messenger
              </button>
              <button className="btn btn-secondary" onClick={handleViewMaterials}>
                View All Materials & Details
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
