import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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
              <span>Last Updated: January 21, 2025</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="terms-content"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="terms-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By using PrismBox 3D Services ("Service"), you agree to be bound by these Terms of Service ("Terms"). 
              If you do not agree to these Terms, please do not use our Service. These Terms apply to all users, 
              including browsers, customers, and contributors.
            </p>
          </div>

          <div className="terms-section">
            <h2>2. Service Description</h2>
            <p>
              PrismBox 3D Services provides custom 3D printing services based in Bulacan, Philippines. 
              We offer 3D printing using various materials including PLA, PLA+, ABS, and PETG. 
              Our services are currently in beta phase with limited capacity.
            </p>
          </div>

          <div className="terms-section">
            <h2>3. Orders and Payments</h2>
            <h3>3.1 Order Process</h3>
            <ul>
              <li>All orders must be initiated through Messenger or email</li>
              <li>Customers must provide .STL or .3MF files for printing</li>
              <li>Quotes are valid for 7 days from issuance</li>
              <li>Orders are confirmed only upon payment receipt</li>
            </ul>
            
            <h3>3.2 Pricing</h3>
            <ul>
              <li>Pricing is calculated based on material weight, service fees, and packaging costs</li>
              <li>All prices are in Philippine Peso (₱) and include applicable taxes</li>
              <li>Prices may change without notice but will not affect confirmed orders</li>
            </ul>

            <h3>3.3 Payment Terms</h3>
            <ul>
              <li>Payment must be made in full before printing begins</li>
              <li>Accepted payment methods: GCash, Bank Transfer</li>
              <li>Refunds are subject to our refund policy (Section 7)</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>4. File Requirements and Intellectual Property</h2>
            <h3>4.1 Customer Files</h3>
            <ul>
              <li>Customers must own or have rights to all submitted 3D files</li>
              <li>Files must be in .STL or .3MF format and printable</li>
              <li>We reserve the right to refuse printing of inappropriate or illegal content</li>
              <li>Customer files are deleted within 30 days after order completion</li>
            </ul>

            <h3>4.2 Prohibited Content</h3>
            <p>We will not print:</p>
            <ul>
              <li>Weapons, weapon parts, or items intended to cause harm</li>
              <li>Copyrighted materials without proper authorization</li>
              <li>Items that violate Philippine laws or regulations</li>
              <li>Adult content or inappropriate materials</li>
              <li>Items that could be used for illegal activities</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>5. Production and Delivery</h2>
            <h3>5.1 Production Times</h3>
            <ul>
              <li>Production times vary based on complexity, quantity, and queue</li>
              <li>Estimated completion times are provided with quotes but not guaranteed</li>
              <li>Delays may occur due to equipment issues, material availability, or other factors</li>
            </ul>

            <h3>5.2 Quality Standards</h3>
            <ul>
              <li>We strive for high-quality prints but cannot guarantee perfection</li>
              <li>Minor imperfections inherent to 3D printing are not grounds for refund</li>
              <li>We will remake prints with significant defects at no additional cost</li>
            </ul>

            <h3>5.3 Shipping and Delivery</h3>
            <ul>
              <li>Items are shipped via reliable courier services within the Philippines</li>
              <li>Shipping costs are included in the total quote</li>
              <li>Risk of loss transfers to customer upon delivery confirmation</li>
              <li>We are not liable for courier delays or damages during transit</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>6. Liability and Warranties</h2>
            <h3>6.1 Disclaimer of Warranties</h3>
            <p>
              Our services are provided "AS IS" without warranties of any kind, either express or implied. 
              We disclaim all warranties, including but not limited to merchantability, fitness for a 
              particular purpose, and non-infringement.
            </p>

            <h3>6.2 Limitation of Liability</h3>
            <ul>
              <li>Our total liability shall not exceed the amount paid for the specific order</li>
              <li>We are not liable for indirect, incidental, or consequential damages</li>
              <li>We are not responsible for the use or misuse of printed items</li>
              <li>Customers assume all risks associated with their printed items</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>7. Refunds and Cancellations</h2>
            <h3>7.1 Cancellation Policy</h3>
            <ul>
              <li>Orders can be cancelled before printing begins for a full refund</li>
              <li>Orders cannot be cancelled once printing has started</li>
              <li>Cancellation requests must be made via the same channel as the order</li>
            </ul>

            <h3>7.2 Refund Policy</h3>
            <ul>
              <li>Refunds are issued for cancelled orders or significant print defects</li>
              <li>No refunds for customer design errors or changed requirements</li>
              <li>Refunds are processed within 5-10 business days</li>
              <li>Shipping costs are non-refundable unless the error is ours</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>8. Privacy and Data Protection</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy to understand 
              how we collect, use, and protect your information. By using our Service, you also 
              agree to our Privacy Policy.
            </p>
          </div>

          <div className="terms-section">
            <h2>9. Beta Service Disclaimer</h2>
            <p>
              Our service is currently in beta phase. This means:
            </p>
            <ul>
              <li>Service availability may be limited or interrupted</li>
              <li>Features and pricing may change with minimal notice</li>
              <li>Technical issues may occur more frequently</li>
              <li>We appreciate your patience and feedback during this phase</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>10. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the Republic of the Philippines. 
              Any disputes will be resolved in the appropriate courts of Bulacan, Philippines.
            </p>
          </div>

          <div className="terms-section">
            <h2>11. Contact Information</h2>
            <p>
              For questions about these Terms, please contact us:
            </p>
            <ul>
              <li>Email: prismbox3dservice@gmail.com</li>
              <li>Messenger: Teddy Tapiador</li>
              <li>Location: Bulacan, Philippines</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>12. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective 
              immediately upon posting on our website. Continued use of our Service after changes 
              constitutes acceptance of the modified Terms.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
