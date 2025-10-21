import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './PrivacyPolicy.css';

const BackIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M12 7C13.4 7 14.8 8.6 14.8 10V11C15.4 11 16 11.4 16 12V16C16 16.6 15.6 17 15 17H9C8.4 17 8 16.6 8 16V12C8 11.4 8.4 11 9 11V10C9 8.6 10.6 7 12 7M12 8.2C11.2 8.2 10.2 9 10.2 10V11H13.8V10C13.8 9 12.8 8.2 12 8.2Z"/>
  </svg>
);

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="privacy-page">
      <div className="container">
        <motion.div className="page-header" initial="hidden" animate="visible" variants={fadeIn}>
          <button className="back-btn" onClick={() => navigate('/')}>
            <BackIcon />
            Back to Home
          </button>
          
          <div className="header-content">
            <div className="header-icon">
              <ShieldIcon />
            </div>
            <h1>Privacy Policy</h1>
            <p>How we collect, use, and protect your information</p>
          </div>
        </motion.div>

        <motion.div className="content-section" initial="hidden" animate="visible" variants={fadeIn}>
          <div className="section">
            <h2>Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you request a quote, submit 3D files, or communicate with us via email or Messenger.</p>
          </div>

          <div className="section">
            <h2>How We Use Your Information</h2>
            <p>We use your information solely for providing our 3D printing services:</p>
            <ul>
              <li>Processing and fulfilling your 3D printing orders</li>
              <li>Calculating quotes and material requirements</li>
              <li>Communicating about your orders and delivery</li>
              <li>Providing customer support</li>
            </ul>
          </div>

          <div className="section">
            <h2>Information Sharing</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties except:</p>
            <ul>
              <li>To trusted courier services for delivery purposes</li>
              <li>When required by law or legal process</li>
              <li>To protect our rights and safety</li>
            </ul>
          </div>

          <div className="section">
            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </div>

          <div className="section">
            <h2>Communication Channels</h2>
            <p>Communications via Facebook Messenger are subject to Facebook's privacy policy in addition to ours.</p>
            <p>Email communications are secured and used only for order-related correspondence.</p>
          </div>

          <div className="section">
            <h2>Data Security</h2>
            <p>Our services are currently in beta phase. We implement reasonable security measures but cannot guarantee absolute security of transmitted information.</p>
          </div>

          <div className="section">
            <h2>Contact Us</h2>
            <p>For privacy-related questions, contact us at prismbox3dservice@gmail.com or through our Facebook Messenger.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
