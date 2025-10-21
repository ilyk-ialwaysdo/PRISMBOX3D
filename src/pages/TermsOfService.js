import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './TermsOfService.css';

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H6M12 5l-7 7 7 7"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const TermsOfService = () => {
  const navigate = useNavigate();

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <>
      <Header />
      <div className="terms-page">
        <div className="container">
          <motion.div 
            className="page-header"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <button className="back-btn" onClick={() => navigate('/')}>
              <BackIcon />
              <span>Back to Home</span>
            </button>
            
            <div className="header-content">
              <div className="header-icon">
                <ShieldIcon />
              </div>
              <h1>Terms of Service</h1>
              <p>Legal terms and conditions for PrismBox 3D Services</p>
              <div className="last-updated">
                <span>Last updated: October 21, 2025</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="content"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
          >
            <div className="section">
              <h2>
                <ShieldIcon className="section-icon" />
                Agreement to Terms
              </h2>
              <p>
                By using PrismBox 3D Services ("Service"), you agree to be bound by these Terms of Service ("Terms"). 
                If you do not agree to these Terms, please do not use our Service. These Terms apply to all users, 
                including browsers, customers, and contributors.
              </p>
            </div>

            <div className="section">
              <h2>Service Description</h2>
              <p>
                PrismBox 3D Services provides custom 3D printing services based in <span className="highlight">Bulacan, Philippines</span>. 
                We offer 3D printing using various materials including PLA, PLA+, ABS, and PETG. Our services are currently 
                in <span className="highlight">beta phase</span> with limited capacity.
              </p>
            </div>

            <div className="section">
              <h2>Prohibited Items</h2>
              <div className="prohibited-list">
                <h3>We will not print:</h3>
                <ul>
                  <li>Weapons or weapon components</li>
                  <li>Items that violate intellectual property rights</li>
                  <li>Adult or inappropriate content</li>
                  <li>Items intended for illegal activities</li>
                  <li>Medical devices or implants</li>
                  <li>Items that could cause harm or injury</li>
                </ul>
              </div>
            </div>

            <div className="section">
              <h2>Service Limitations</h2>
              <p>
                Our services are provided "AS IS" without warranties of any kind, either express or implied. 
                We disclaim all warranties, including but not limited to merchantability, fitness for a particular purpose, 
                and non-infringement.
              </p>
            </div>

            <div className="section">
              <h2>Privacy Policy</h2>
              <p>
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, 
                and protect your information. By using our Service, you also agree to our Privacy Policy.
              </p>
            </div>

            <div className="section">
              <h2>Beta Service Notice</h2>
              <p>Our service is currently in <span className="highlight">beta phase</span>. This means:</p>
              <ul>
                <li>Limited capacity and longer processing times</li>
                <li>Potential service interruptions</li>
                <li>Pricing and policies may change</li>
                <li>We appreciate your patience and feedback</li>
              </ul>
            </div>

            <div className="section">
              <h2>Governing Law</h2>
              <p>
                These Terms are governed by the laws of the Republic of the Philippines. Any disputes will be resolved 
                in the appropriate courts of Bulacan, Philippines.
              </p>
            </div>

            <div className="section">
              <h2>Contact Information</h2>
              <div className="contact-info">
                <h3>For questions about these Terms, please contact us:</h3>
                <p>Email: prismbox3dservice@gmail.com</p>
                <p>Messenger: Teddy Tapiador</p>
              </div>
            </div>

            <div className="section">
              <h2>Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting 
                on our website. Continued use of our Service after changes constitutes acceptance of the modified Terms.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsOfService;
