import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Homepage.css';

// Custom, Lightweight SVG Icons
const UploadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 8l-5-5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 3v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PrintIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9V2h12v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 14h12v8H6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DeliverIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 3h5v5l-5-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 3H3v18l7-7 7 7V11l-9-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="15.5" cy="17.5" r="2.5" stroke="currentColor" strokeWidth="2"/>
    <circle cx="8.5" cy="17.5" r="2.5" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Homepage = () => {
  const navigate = useNavigate();
  
  // FAQ Data - Only show first 3 on homepage (as in your original design)
  const [faqs] = useState([
    {
      q: "What file formats do you accept?",
      a: "We primarily work with .STL and .3MF files, which are the most common formats for 3D printing. If you have another file type, such as .OBJ or .STEP, please contact us and we will see if we can convert it for you."
    },
    {
      q: "How long does it take to get my order?",
      a: "Standard orders are typically printed and ready for dispatch within 2-4 business days. Complex or large volume orders may take longer. We'll give you a time estimate when you place your order."
    },
    {
      q: "What materials do you offer?",
      a: "We offer a wide range of materials including various types of PLA, PETG, ABS, and flexible filaments. Check out our Materials page for a full list and their properties."
    }
  ]);

  const [activeFaq, setActiveFaq] = useState(0);

  // FAQ toggle handler
  const handleFaqToggle = useCallback((index) => {
    setActiveFaq(activeFaq === index ? null : index);
  }, [activeFaq]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="hero-content">
          <h1>Professional 3D Printing Services</h1>
          <p>
            Transform your ideas into reality with our high-quality 3D printing services. 
            From prototypes to final products, we deliver precision and excellence every time.
          </p>
          <div className="hero-buttons">
            <button 
              className="cta-button primary"
              onClick={() => navigate('/configuration')}
            >
              Start Your Order
            </button>
            <button 
              className="cta-button secondary"
              onClick={() => navigate('/filaments')}
            >
              Explore Materials
            </button>
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section 
        className="how-it-works-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
      >
        <h2>How It Works</h2>
        <div className="steps-container">
          <motion.div className="step" variants={fadeInUp}>
            <div className="step-icon">
              <UploadIcon />
            </div>
            <h3>Upload Your Design</h3>
            <p>
              Submit your 3D model in .STL, .3MF, or .OBJ format through our secure portal.
            </p>
          </motion.div>
          
          <motion.div className="step" variants={fadeInUp}>
            <div className="step-icon">
              <PrintIcon />
            </div>
            <h3>We Print With Precision</h3>
            <p>
              We print your design using state-of-the-art printers and your chosen material.
            </p>
          </motion.div>
          
          <motion.div className="step" variants={fadeInUp}>
            <div className="step-icon">
              <DeliverIcon />
            </div>
            <h3>Fast Delivery</h3>
            <p>
              Receive your high-quality 3D print delivered straight to your doorstep.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Materials Section */}
      <motion.section 
        className="featured-filaments-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
      >
        <h2>Featured Materials</h2>
        <div className="filaments-grid">
          <motion.div className="filament-card" variants={fadeInUp}>
            <div className="filament-card-image pla"></div>
            <h3>PLA+</h3>
            <p>Strong, easy to print, and perfect for a wide range of applications.</p>
          </motion.div>
          
          <motion.div className="filament-card" variants={fadeInUp}>
            <div className="filament-card-image petg"></div>
            <h3>PETG</h3>
            <p>Durable, chemical-resistant, and great for mechanical parts.</p>
          </motion.div>
          
          <motion.div className="filament-card" variants={fadeInUp}>
            <div className="filament-card-image abs"></div>
            <h3>ABS</h3>
            <p>Tough, heat-resistant, and ideal for functional prototypes.</p>
          </motion.div>
        </div>
        
        <button 
          className="cta-button cta-button-center"
          onClick={() => navigate('/filaments')}
        >
          View All Materials
        </button>
      </motion.section>

      {/* Homepage FAQ Preview Section */}
      <motion.section 
        className="faq-preview-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button 
                className="faq-question"
                onClick={() => handleFaqToggle(index)}
                aria-expanded={activeFaq === index}
              >
                <span>{faq.q}</span>
                <motion.span 
                  className="faq-icon"
                  animate={{ rotate: activeFaq === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDownIcon />
                </motion.span>
              </button>
              <AnimatePresence>
                {activeFaq === index && (
                  <motion.div 
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        
        {/* FAQ Page Navigation Button */}
        <div className="faq-cta">
          <button 
            className="cta-button cta-button-center faq-button"
            onClick={() => navigate('/faq')}
          >
            View All FAQs
          </button>
        </div>
      </motion.section>
    </div>
  );
};

export default Homepage;
