import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Homepage.css'; // We will create this file next

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="homepage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="hero-section">
        <div className="hero-content">
          <motion.h1 
            className="hero-title"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            PRISM PRINT SERVICES
          </motion.h1>
          <motion.p 
            className="hero-subtitle"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Bringing Your Digital Designs to Life with Precision & Speed
          </motion.p>
          <motion.p 
            className="hero-description"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            High-quality 3D printing for schools, hobbyists, and professionals. Upload your file, choose your material, and get an instant quote.
          </motion.p>
        </div>

        <motion.div 
          className="service-highlights"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="highlight-card">
            <span className="highlight-icon">🚀</span>
            <h3>Fast Turnaround</h3>
            <p>Optimized printing process for rapid delivery without compromising quality.</p>
          </div>
          <div className="highlight-card">
            <span className="highlight-icon">💎</span>
            <h3>Premium Materials</h3>
            <p>Choose from a wide range of durable and vibrant filaments like PLA, PETG, and ABS.</p>
          </div>
          <div className="highlight-card">
            <span className="highlight-icon">🎨</span>
            <h3>Vivid Colors</h3>
            <p>A rich palette of colors available to make your creations stand out.</p>
          </div>
        </motion.div>
        
        <motion.button 
          className="cta-button"
          onClick={() => navigate('/configure')}
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34, 197, 94, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          Start Your Print
          <span className="button-arrow">→</span>
        </motion.button>
      </section>
    </motion.div>
  );
};

export default Homepage;
