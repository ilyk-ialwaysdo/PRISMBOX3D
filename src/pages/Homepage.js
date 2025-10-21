import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Homepage.css';

// Clean SVG Icons - All Fixed
const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
  </svg>
);

const MessageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const PrinterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6,9 6,2 18,2 18,9"></polyline>
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
    <rect x="6" y="14" width="12" height="8"></rect>
  </svg>
);

const PaymentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
    <line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>
);

const TruckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13"></rect>
    <polygon points="16,8 20,8 23,11 23,16 16,16"></polygon>
    <circle cx="5.5" cy="18.5" r="2.5"></circle>
    <circle cx="18.5" cy="18.5" r="2.5"></circle>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6,9 12,15 18,9"></polyline>
  </svg>
);

const QuestionIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
    <circle cx="12" cy="17" r="0.5"></circle>
  </svg>
);

const BetaIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
  </svg>
);

const MessengerSocialIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.93 1.17 5.56 3 7.26V22l2.91-1.61c1.25.35 2.6.54 4.09.54 5.64 0 10.2-4.13 10.2-9.23S17.64 2 12 2zm1.13 12.44l-2.61-2.78-5.09 2.78L8.5 9.89l2.61 2.78 5.09-2.78-3.07 4.55z"></path>
  </svg>
);

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const Homepage = () => {
  const navigate = useNavigate();

  const [faqs] = useState([
    {
      q: "How do I get a quote for my 3D print?",
      a: "Send us your .STL or .3MF file through Messenger or email us at prismbox3dservice@gmail.com. We'll calculate the material weight and send you an exact quote within 24 hours with all costs included."
    },
    {
      q: "How long does printing and delivery take?",
      a: "Printing time varies based on model size, complexity, and quantity. Simple models may take 1-2 days while complex or multiple items may take longer. We'll give you an accurate timeline with your quote."
    },
    {
      q: "What materials do you offer?",
      a: "We offer PLA Matte, PLA+, ABS, and PETG in various colors. Each material has different properties suitable for different applications. Check our Materials page for detailed specifications."
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

  const handleViewPricing = useCallback(() => {
    navigate('/pricing');
  }, [navigate]);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="homepage">
      {/* Beta Banner */}
      <div className="beta-banner">
        <div className="beta-container">
          <BetaIcon />
          <span>We're in Beta! Send us your files for professional 3D printing services via Messenger & Email.</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <motion.div 
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1>
              3D Printing <span className="highlight">Services</span>
            </h1>
            
            <p className="hero-description">
              We bring your digital designs to life with precision and care. 
              From prototypes to final products, we print the 3D models you desire with quality materials and transparent pricing.
            </p>
            
            <div className="hero-buttons">
              <button
                className="btn btn-primary"
                onClick={handleStartPrinting}
                disabled={isLoading}
              >
                {isLoading ? 'Opening...' : 'Get Quote Now'}
                <SendIcon />
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleViewMaterials}
              >
                View Materials
              </button>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-value">Custom</div>
                <div className="stat-label">Timeline per Project</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">24hr</div>
                <div className="stat-label">Quote Response</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">Beta</div>
                <div className="stat-label">Service Phase</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="section-separator"></div>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2>How We Work</h2>
            <p>Simple process from file to finished product</p>
          </motion.div>

          <motion.div 
            className="steps-responsive"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div className="step-item" variants={fadeIn}>
              <div className="step-number">1</div>
              <div className="step-icon">
                <MessageIcon />
              </div>
              <div className="step-content">
                <h3>Send Your File</h3>
                <p>
                  Message us via Messenger or email your .STL/.3MF file. 
                  We'll analyze your model and provide a detailed quote within 24 hours.
                </p>
              </div>
            </motion.div>

            <motion.div className="step-item" variants={fadeIn}>
              <div className="step-number">2</div>
              <div className="step-icon">
                <PrinterIcon />
              </div>
              <div className="step-content">
                <h3>Select Material</h3>
                <p>
                  Choose your preferred filament type and color from our available options. 
                  We'll guide you to the best material for your specific application.
                </p>
              </div>
            </motion.div>

            <motion.div className="step-item" variants={fadeIn}>
              <div className="step-number">3</div>
              <div className="step-icon">
                <PaymentIcon />
              </div>
              <div className="step-content">
                <h3>Payment</h3>
                <p>
                  Pay securely via GCash or bank transfer. Once payment is confirmed, 
                  we immediately start the printing process for your order.
                </p>
              </div>
            </motion.div>

            <motion.div className="step-item" variants={fadeIn}>
              <div className="step-number">4</div>
              <div className="step-icon">
                <TruckIcon />
              </div>
              <div className="step-content">
                <h3>Delivery</h3>
                <p>
                  Your print is carefully quality-checked, packaged securely, and shipped 
                  via reliable courier services with tracking information provided.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="section-separator"></div>

      {/* Variable Materials Section */}
      <section className="materials-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2>Variable Materials</h2>
            <p>Professional grade filaments for every application</p>
          </motion.div>

          <motion.div 
            className="materials-responsive"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div className="material-item" variants={fadeIn}>
              <h3>PLA Matte</h3>
              <p>Perfect for prototypes and decorative items with a professional matte finish</p>
            </motion.div>

            <motion.div className="material-item" variants={fadeIn}>
              <h3>PLA+</h3>
              <p>Enhanced strength and durability for functional parts and mechanical components</p>
            </motion.div>

            <motion.div className="material-item" variants={fadeIn}>
              <h3>ABS</h3>
              <p>High-temperature resistance ideal for automotive parts and industrial applications</p>
            </motion.div>

            <motion.div className="material-item" variants={fadeIn}>
              <h3>PETG</h3>
              <p>Chemical resistance and clarity perfect for containers and food-safe applications</p>
            </motion.div>
          </motion.div>

          <motion.div 
            className="section-cta"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <button className="btn btn-outline" onClick={handleViewMaterials}>
              View All Materials & Specifications
            </button>
          </motion.div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="section-separator"></div>

      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="container">
          <motion.div 
            className="section-header-pricing"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="pricing-header-content">
              <h2>Transparent Pricing</h2>
              <div className="pricing-subtitle">
                <span>Simple formula with no hidden fees</span>
                <span className="pricing-update">- Updated 2025 Pricing</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="pricing-formula-responsive"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="formula-item">
              <span className="formula-label">Material Weight (grams)</span>
            </div>
            <div className="formula-operator">×</div>
            <div className="formula-item">
              <span className="formula-label">Price per gram</span>
            </div>
            <div className="formula-operator">+</div>
            <div className="formula-item">
              <span className="formula-label">Service Fee</span>
              <span className="formula-value">₱150</span>
            </div>
            <div className="formula-operator">+</div>
            <div className="formula-item">
              <span className="formula-label">Packaging</span>
              <span className="formula-value">₱20</span>
            </div>
            <div className="formula-equals">=</div>
            <div className="formula-item total">
              <span className="formula-label">Total Cost</span>
            </div>
          </motion.div>

          <motion.div 
            className="pricing-cta"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <button className="btn btn-primary" onClick={handleViewPricing}>
              View Detailed Pricing & Services
            </button>
          </motion.div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="section-separator"></div>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2>Frequently Asked Questions</h2>
            <p>Common questions about our 3D printing services</p>
          </motion.div>

          <motion.div 
            className="faq-list"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {faqs.map((faq, index) => (
              <motion.div key={index} className="faq-item" variants={fadeIn}>
                <button
                  className="faq-question"
                  onClick={() => handleFaqToggle(index)}
                  aria-expanded={activeFaq === index}
                >
                  <span>{faq.q}</span>
                  <motion.div
                    className="faq-icon"
                    animate={{ rotate: activeFaq === index ? 180 : 0 }}
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
          </motion.div>

          <motion.div 
            className="section-cta"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <button className="btn btn-outline" onClick={handleViewFAQ}>
              <QuestionIcon />
              View All FAQs
            </button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2>Ready to Start Your Project?</h2>
            <p>Get your free quote today and bring your designs to life with quality 3D printing.</p>
            
            <div className="cta-buttons">
              <button
                className="btn btn-primary"
                onClick={handleStartPrinting}
                disabled={isLoading}
              >
                <MessengerSocialIcon />
                <span>Message Us</span>
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => window.location.href = 'mailto:prismbox3dservice@gmail.com?subject=3D%20Print%20Quote%20Request'}
              >
                <EmailIcon />
                <span>Email Your Files</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Section - UPDATED WITH TERMS LINKS */}
      <footer className="footer-section">
        <div className="container">
          <motion.div 
            className="footer-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="footer-main">
              <div className="footer-about">
                <h3>About PrismBox 3D</h3>
                <p>
                  I'm a passionate student who turned his love for 3D printing 
                  into a service that helps bring digital ideas to life. What started as a hobby has grown 
                  into a mission to make quality 3D printing accessible and affordable for everyone.
                </p>
                <div className="footer-location">
                  <LocationIcon />
                  <span>Based in Bulacan, Philippines</span>
                </div>
              </div>
              
              <div className="footer-contact">
                <h4>Get In Touch</h4>
                <div className="contact-item">
                  <MessengerSocialIcon />
                  <span>Messenger: Teddy Tapiador</span>
                </div>
                <div className="contact-item">
                  <EmailIcon />
                  <span>prismbox3dservice@gmail.com</span>
                </div>
              </div>
            </div>
            
            <div className="footer-bottom">
              <div className="footer-made-with">
                <span>Made with</span>
                <HeartIcon />
                <span>by a passionate student engineer</span>
              </div>
              
              {/* ADDED: Legal Links */}
              <div className="footer-legal">
                <button 
                  className="footer-link"
                  onClick={() => navigate('/terms')}
                >
                  Terms of Service
                </button>
                <span>•</span>
                <button 
                  className="footer-link"
                  onClick={() => navigate('/privacy')}
                >
                  Privacy Policy
                </button>
              </div>
              
              <div className="footer-copyright">
                <span>© 2025 PrismBox 3D Services. Beta Phase.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
