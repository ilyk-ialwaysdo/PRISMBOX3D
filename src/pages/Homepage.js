import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Homepage.css';

// Simple SVG Icons
const UploadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17,8 12,3 7,8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const MessageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const PrintIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6,9 6,2 18,2 18,9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
);

const DeliverIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16,8 20,8 23,11 23,16 16,16" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6,9 12,15 18,9" />
  </svg>
);

const QuestionIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const Homepage = () => {
  const navigate = useNavigate();
  const [faqs] = useState([
    {
      q: "How do I get a quote for my 3D print?",
      a: "Send us your .STL or .3MF file through Messenger or email us at prismbox3dservice@gmail.com. We'll calculate the material weight and send you an exact quote within 24 hours including material and service fees."
    },
    {
      q: "How long does printing and delivery take?",
      a: "Standard printing takes 2-4 business days. We offer rush service (24-hour) for an additional ₱100. Delivery within Metro Manila via Lalamove costs ₱50-150, provincial orders via courier take 1-3 additional days."
    },
    {
      q: "What materials and colors are available?",
      a: "We offer PLA Matte (₱1.50/g) in Beige/Red/Dark Blue, PLA+ (₱3.75/g) in Beige, ABS (₱4.00/g) in Silver, and PETG (₱4.00/g) in Silver. More colors and materials available upon request."
    }
  ]);

  const [activeFaq, setActiveFaq] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFaqToggle = useCallback((index) => {
    setActiveFaq(activeFaq === index ? null : index);
  }, [activeFaq]);

  const handleStartPrinting = useCallback(async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      window.open('https://m.me/tedtapiador', '_blank');
    } catch (error) {
      console.error('Navigation error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleViewMaterials = useCallback(() => {
    navigate('/filaments');
  }, [navigate]);

  const handleViewFAQ = useCallback(() => {
    navigate('/faq');
  }, [navigate]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const iconRotate = {
    closed: { rotate: 0 },
    open: { rotate: 180 }
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
          <motion.h1 variants={fadeInUp}>
            Affordable 3D Printing for <span className="gradient-text">Students</span>
          </motion.h1>
          
          <motion.p variants={fadeInUp}>
            Quality 3D printing services at student-friendly prices. From prototypes to projects, 
            we make 3D printing accessible with transparent pricing starting from just ₱1.50 per gram.
          </motion.p>
          
          <motion.div className="hero-buttons" variants={fadeInUp}>
            <button
              className="cta-button primary"
              onClick={handleStartPrinting}
              disabled={isLoading}
            >
              <span>{isLoading ? 'Opening...' : 'Get Quote Now'}</span>
              {!isLoading && <MessageIcon />}
            </button>
            <button
              className="cta-button secondary"
              onClick={handleViewMaterials}
            >
              <span>View Materials</span>
            </button>
          </motion.div>

          <motion.div className="hero-stats" variants={fadeInUp}>
            <div className="stat">
              <span className="stat-number">₱1.50</span>
              <span className="stat-label">Starting Price/gram</span>
            </div>
            <div className="stat">
              <span className="stat-number">24hr</span>
              <span className="stat-label">Rush Available</span>
            </div>
            <div className="stat">
              <span className="stat-number">₱170</span>
              <span className="stat-label">Minimum Order</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        className="how-it-works-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <div className="section-container">
          <motion.div className="section-header" variants={fadeInUp}>
            <h2>How We Work</h2>
            <p>Simple process from file to finished product</p>
          </motion.div>

          <div className="steps-container">
            <motion.div className="step" variants={fadeInUp}>
              <div className="step-icon">
                <MessageIcon />
              </div>
              <div className="step-content">
                <h3>1. Send Your File</h3>
                <p>
                  Message us via Messenger or email your .STL/.3MF file to prismbox3dservice@gmail.com. 
                  We'll calculate material weight and provide an exact quote including all fees.
                </p>
              </div>
            </motion.div>

            <motion.div className="step" variants={fadeInUp}>
              <div className="step-icon">
                <PrintIcon />
              </div>
              <div className="step-content">
                <h3>2. Choose & Pay</h3>
                <p>
                  Select your material (PLA Matte, PLA+, ABS, or PETG) and any add-ons like rush service or assembly. 
                  Pay via GCash/PayMaya and we'll start printing.
                </p>
              </div>
            </motion.div>

            <motion.div className="step" variants={fadeInUp}>
              <div className="step-icon">
                <DeliverIcon />
              </div>
              <div className="step-content">
                <h3>3. We Deliver</h3>
                <p>
                  Your print is carefully packaged (₱20 packaging fee) and delivered via Lalamove (Metro Manila) 
                  or nationwide courier with tracking.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Materials Section */}
      <motion.section
        className="featured-materials-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <div className="section-container">
          <motion.div className="section-header" variants={fadeInUp}>
            <h2>Student-Friendly Materials</h2>
            <p>Quality filaments at affordable prices</p>
          </motion.div>

          <div className="materials-grid">
            <motion.div className="material-card" variants={fadeInUp}>
              <div className="material-visual">
                <div className="material-sample pla-sample"></div>
              </div>
              <div className="material-info">
                <h3>PLA Matte</h3>
                <p>Most affordable option. Available in Beige, Red, and Dark Blue.</p>
                <div className="material-price">₱1.50/gram</div>
              </div>
            </motion.div>

            <motion.div className="material-card" variants={fadeInUp}>
              <div className="material-visual">
                <div className="material-sample pla-plus-sample"></div>
              </div>
              <div className="material-info">
                <h3>PLA+</h3>
                <p>Enhanced strength and durability. Available in Beige color.</p>
                <div className="material-price">₱3.75/gram</div>
              </div>
            </motion.div>

            <motion.div className="material-card" variants={fadeInUp}>
              <div className="material-visual">
                <div className="material-sample abs-sample"></div>
              </div>
              <div className="material-info">
                <h3>ABS & PETG</h3>
                <p>Professional grade materials in Silver. Heat resistant and durable.</p>
                <div className="material-price">₱4.00/gram</div>
              </div>
            </motion.div>
          </div>

          <motion.button
            className="cta-button cta-button-center"
            onClick={handleViewMaterials}
            variants={fadeInUp}
          >
            <span>See All Materials & Colors</span>
          </motion.button>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="faq-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <div className="section-container">
          <motion.div className="section-header" variants={fadeInUp}>
            <h2>Common Questions</h2>
            <p>Everything you need to know about our student-friendly pricing</p>
          </motion.div>

          <div className="faq-container">
            {faqs.map((faq, index) => (
              <motion.div key={index} className="faq-item" variants={fadeInUp}>
                <button
                  className="faq-question"
                  onClick={() => handleFaqToggle(index)}
                >
                  <span>{faq.q}</span>
                  <motion.div
                    className="faq-icon"
                    variants={iconRotate}
                    animate={activeFaq === index ? "open" : "closed"}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDownIcon />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <motion.button
            className="cta-button faq-cta-button"
            onClick={handleViewFAQ}
            variants={fadeInUp}
          >
            <QuestionIcon />
            <span>View All FAQs</span>
          </motion.button>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section
        className="pricing-preview-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="section-container">
          <div className="pricing-preview-content">
            <h2>Transparent Pricing</h2>
            <p>Simple formula: (Weight × Material Price) + Service Fee + Packaging</p>
            
            <div className="pricing-breakdown">
              <div className="pricing-row">
                <span className="pricing-label">Service Fee (Base)</span>
                <span className="pricing-value">₱150</span>
              </div>
              <div className="pricing-row">
                <span className="pricing-label">Packaging</span>
                <span className="pricing-value">₱20</span>
              </div>
              <div className="pricing-row optional">
                <span className="pricing-label">Rush Service (24hr)</span>
                <span className="pricing-value">+₱100</span>
              </div>
              <div className="pricing-row optional">
                <span className="pricing-label">Assembly/Gluing</span>
                <span className="pricing-value">+₱75</span>
              </div>
            </div>
            
            <div className="pricing-example">
              <h4>Example: Small figurine (20g PLA Matte)</h4>
              <div className="example-calculation">
                <span>(20g × ₱1.50) + ₱150 + ₱20 = <strong>₱200 total</strong></span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Homepage;
