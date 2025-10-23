import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
// REMOVED: import './Homepage.css'; - TEMPORARILY REMOVED FOR WORKING WEBSITE

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
    <polygon points="16,8 20,8 23,11 23,16 16,16 16,8"></polygon>
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
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const MessengerSocialIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.93 1.17 5.56 3 7.26V22l2.91-1.61c1.25.35 2.6.54 4.09.54 5.64 0 10.2-4.13 10.2-9.23S17.64 2 12 2zm1.13 12.44l-2.61-2.78-5.09 2.78L8.5 9.89l2.61 2.78 5.09-2.78-3.07 4.55z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
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
      window.open('https://m.me/teddytapiador', '_blank');
    } catch (error) {
      console.error('Navigation error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleViewMaterials = useCallback(() => {
    navigate('/materials');
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

  // Inline Styles (Professional Homepage CSS)
  const styles = {
    homepage: {
      fontFamily: 'Arial, sans-serif',
      lineHeight: 1.6,
      color: '#333'
    },
    heroSection: {
      background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
      color: 'white',
      padding: '100px 2rem 80px',
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center'
    },
    heroContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%'
    },
    heroContent: {
      marginBottom: '40px'
    },
    heroTitle: {
      fontSize: '4rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
    },
    highlight: {
      color: '#FFE082'
    },
    heroDescription: {
      fontSize: '1.4rem',
      marginBottom: '2.5rem',
      opacity: 0.95,
      lineHeight: 1.6,
      maxWidth: '800px',
      margin: '0 auto 2.5rem'
    },
    heroButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginBottom: '3rem'
    },
    btnPrimary: {
      background: 'rgba(255,255,255,0.2)',
      color: 'white',
      border: '2px solid rgba(255,255,255,0.3)',
      padding: '15px 30px',
      borderRadius: '8px',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      textDecoration: 'none',
      transition: 'all 0.3s ease'
    },
    btnSecondary: {
      background: 'transparent',
      color: 'white',
      border: '2px solid white',
      padding: '15px 30px',
      borderRadius: '8px',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      cursor: 'pointer'
    },
    heroStats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '2rem',
      maxWidth: '600px',
      margin: '0 auto'
    },
    statItem: {
      textAlign: 'center'
    },
    statValue: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '5px'
    },
    statLabel: {
      fontSize: '0.9rem',
      opacity: 0.9
    },
    sectionSeparator: {
      height: '2px',
      background: 'linear-gradient(90deg, transparent, #FF6B35, transparent)',
      margin: '0'
    },
    section: {
      padding: '80px 2rem',
      backgroundColor: 'white'
    },
    sectionAlt: {
      padding: '80px 2rem',
      backgroundColor: '#f8f9fa'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    sectionHeader: {
      textAlign: 'center',
      marginBottom: '4rem'
    },
    sectionTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '1rem'
    },
    sectionSubtitle: {
      fontSize: '1.2rem',
      color: '#666',
      maxWidth: '600px',
      margin: '0 auto'
    },
    stepsResponsive: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '3rem'
    },
    stepItem: {
      textAlign: 'center',
      padding: '30px',
      background: 'white',
      borderRadius: '15px',
      boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
      position: 'relative'
    },
    stepNumber: {
      position: 'absolute',
      top: '-15px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'linear-gradient(135deg, #FF6B35, #F7931E)',
      color: 'white',
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1rem',
      fontWeight: 'bold'
    },
    stepIcon: {
      background: '#f8f9fa',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '20px auto',
      color: '#FF6B35'
    },
    stepTitle: {
      fontSize: '1.3rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '15px'
    },
    stepText: {
      color: '#666',
      lineHeight: 1.6
    },
    materialsResponsive: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem'
    },
    materialItem: {
      padding: '25px',
      background: 'white',
      borderRadius: '10px',
      border: '2px solid #FF6B35',
      textAlign: 'center'
    },
    materialTitle: {
      fontSize: '1.3rem',
      fontWeight: 'bold',
      color: '#FF6B35',
      marginBottom: '15px'
    },
    pricingFormulaResponsive: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '1rem',
      background: 'white',
      padding: '40px',
      borderRadius: '15px',
      boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
      marginBottom: '3rem'
    },
    formulaItem: {
      textAlign: 'center',
      padding: '15px',
      background: '#f8f9fa',
      borderRadius: '8px',
      minWidth: '120px'
    },
    formulaLabel: {
      fontSize: '0.9rem',
      color: '#666',
      display: 'block',
      marginBottom: '5px'
    },
    formulaValue: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: '#FF6B35'
    },
    formulaOperator: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#FF6B35'
    },
    formulaEquals: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#28a745'
    },
    formulaTotal: {
      background: 'linear-gradient(135deg, #FF6B35, #F7931E)',
      color: 'white'
    },
    faqList: {
      maxWidth: '800px',
      margin: '0 auto'
    },
    faqItem: {
      marginBottom: '1rem',
      background: 'white',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
    },
    faqQuestion: {
      width: '100%',
      padding: '20px',
      background: 'white',
      border: 'none',
      textAlign: 'left',
      fontSize: '1.1rem',
      fontWeight: '500',
      color: '#333',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    faqAnswer: {
      padding: '0 20px 20px',
      color: '#666',
      lineHeight: 1.6
    },
    faqIcon: {
      color: '#FF6B35'
    },
    sectionCta: {
      textAlign: 'center',
      marginTop: '3rem'
    },
    btnOutline: {
      background: 'transparent',
      color: '#FF6B35',
      border: '2px solid #FF6B35',
      padding: '12px 25px',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      textDecoration: 'none'
    },
    ctaSection: {
      background: 'linear-gradient(135deg, #333 0%, #555 100%)',
      color: 'white',
      padding: '80px 2rem',
      textAlign: 'center'
    },
    ctaContent: {
      maxWidth: '600px',
      margin: '0 auto'
    },
    ctaTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem'
    },
    ctaText: {
      fontSize: '1.2rem',
      marginBottom: '2rem',
      opacity: 0.9
    },
    ctaButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    ctaButton: {
      background: 'linear-gradient(135deg, #FF6B35, #F7931E)',
      color: 'white',
      border: 'none',
      padding: '15px 25px',
      borderRadius: '8px',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      textDecoration: 'none',
      boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)'
    },
    ctaButtonSecondary: {
      background: 'transparent',
      color: 'white',
      border: '2px solid white',
      padding: '15px 25px',
      borderRadius: '8px',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      textDecoration: 'none'
    }
  };

  return (
    <>
      <Header />
      <div style={styles.homepage}>
        {/* Hero Section */}
        <section style={styles.heroSection}>
          <div style={styles.heroContainer}>
            <motion.div 
              style={styles.heroContent}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h1 style={styles.heroTitle}>
                3D Printing <span style={styles.highlight}>Services</span>
              </h1>
              <p style={styles.heroDescription}>
                We bring your digital designs to life with precision and care. From prototypes to final products, we print the 3D models you desire with quality materials and transparent pricing.
              </p>
              <div style={styles.heroButtons}>
                <button 
                  style={styles.btnPrimary} 
                  onClick={handleStartPrinting}
                  disabled={isLoading}
                >
                  {isLoading ? 'Opening...' : 'Get Quote Now'}
                  <SendIcon />
                </button>
                <button 
                  style={styles.btnSecondary} 
                  onClick={handleViewMaterials}
                >
                  View Materials
                </button>
              </div>
            </motion.div>
            
            <div style={styles.heroStats}>
              <div style={styles.statItem}>
                <div style={styles.statValue}>Custom</div>
                <div style={styles.statLabel}>Timeline per Project</div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statValue}>24hr</div>
                <div style={styles.statLabel}>Quote Response</div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statValue}>Beta</div>
                <div style={styles.statLabel}>Service Phase</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div style={styles.sectionSeparator}></div>

        {/* How It Works Section */}
        <section style={styles.sectionAlt}>
          <div style={styles.container}>
            <motion.div 
              style={styles.sectionHeader}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 style={styles.sectionTitle}>How We Work</h2>
              <p style={styles.sectionSubtitle}>Simple process from file to finished product</p>
            </motion.div>

            <motion.div 
              style={styles.stepsResponsive}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div style={styles.stepItem} variants={fadeIn}>
                <div style={styles.stepNumber}>1</div>
                <div style={styles.stepIcon}>
                  <MessageIcon />
                </div>
                <div>
                  <h3 style={styles.stepTitle}>Send Your File</h3>
                  <p style={styles.stepText}>Message us via Messenger or email your .STL/.3MF file. We'll analyze your model and provide a detailed quote within 24 hours.</p>
                </div>
              </motion.div>

              <motion.div style={styles.stepItem} variants={fadeIn}>
                <div style={styles.stepNumber}>2</div>
                <div style={styles.stepIcon}>
                  <PrinterIcon />
                </div>
                <div>
                  <h3 style={styles.stepTitle}>Select Material</h3>
                  <p style={styles.stepText}>Choose your preferred filament type and color from our available options. We'll guide you to the best material for your specific application.</p>
                </div>
              </motion.div>

              <motion.div style={styles.stepItem} variants={fadeIn}>
                <div style={styles.stepNumber}>3</div>
                <div style={styles.stepIcon}>
                  <PaymentIcon />
                </div>
                <div>
                  <h3 style={styles.stepTitle}>Payment</h3>
                  <p style={styles.stepText}>Pay securely via GCash or bank transfer. Once payment is confirmed, we immediately start the printing process for your order.</p>
                </div>
              </motion.div>

              <motion.div style={styles.stepItem} variants={fadeIn}>
                <div style={styles.stepNumber}>4</div>
                <div style={styles.stepIcon}>
                  <TruckIcon />
                </div>
                <div>
                  <h3 style={styles.stepTitle}>Delivery</h3>
                  <p style={styles.stepText}>Your print is carefully quality-checked, packaged securely, and shipped via reliable courier services with tracking information provided.</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Section Separator */}
        <div style={styles.sectionSeparator}></div>

        {/* Materials Section */}
        <section style={styles.section}>
          <div style={styles.container}>
            <motion.div 
              style={styles.sectionHeader}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 style={styles.sectionTitle}>Variable Materials</h2>
              <p style={styles.sectionSubtitle}>Professional grade filaments for every application</p>
            </motion.div>

            <motion.div 
              style={styles.materialsResponsive}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div style={styles.materialItem} variants={fadeIn}>
                <h3 style={styles.materialTitle}>PLA Matte</h3>
                <p style={styles.stepText}>Perfect for prototypes and decorative items with a professional matte finish</p>
              </motion.div>

              <motion.div style={styles.materialItem} variants={fadeIn}>
                <h3 style={styles.materialTitle}>PLA+</h3>
                <p style={styles.stepText}>Enhanced strength and durability for functional parts and mechanical components</p>
              </motion.div>

              <motion.div style={styles.materialItem} variants={fadeIn}>
                <h3 style={styles.materialTitle}>ABS</h3>
                <p style={styles.stepText}>High-temperature resistance ideal for automotive parts and industrial applications</p>
              </motion.div>

              <motion.div style={styles.materialItem} variants={fadeIn}>
                <h3 style={styles.materialTitle}>PETG</h3>
                <p style={styles.stepText}>Chemical resistance and clarity perfect for containers and food-safe applications</p>
              </motion.div>
            </motion.div>

            <motion.div 
              style={styles.sectionCta}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <button style={styles.btnOutline} onClick={handleViewMaterials}>
                View All Materials & Specifications
              </button>
            </motion.div>
          </div>
        </section>

        {/* Section Separator */}
        <div style={styles.sectionSeparator}></div>

        {/* Pricing Section */}
        <section style={styles.sectionAlt}>
          <div style={styles.container}>
            <motion.div 
              style={styles.sectionHeader}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 style={styles.sectionTitle}>Transparent Pricing</h2>
              <p style={styles.sectionSubtitle}>Simple formula with no hidden fees • ✓ Updated 2025 Pricing</p>
            </motion.div>

            <motion.div 
              style={styles.pricingFormulaResponsive}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div style={styles.formulaItem}>
                <span style={styles.formulaLabel}>Material Weight (grams)</span>
              </div>
              <div style={styles.formulaOperator}>×</div>
              <div style={styles.formulaItem}>
                <span style={styles.formulaLabel}>Price per gram</span>
              </div>
              <div style={styles.formulaOperator}>+</div>
              <div style={styles.formulaItem}>
                <span style={styles.formulaLabel}>Service Fee</span>
                <span style={styles.formulaValue}>₱50</span>
              </div>
              <div style={styles.formulaOperator}>+</div>
              <div style={styles.formulaItem}>
                <span style={styles.formulaLabel}>Packaging</span>
                <span style={styles.formulaValue}>₱20</span>
              </div>
              <div style={styles.formulaEquals}>=</div>
              <div style={{...styles.formulaItem, ...styles.formulaTotal}}>
                <span style={styles.formulaLabel}>Total Cost</span>
              </div>
            </motion.div>

            <motion.div 
              style={styles.sectionCta}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <button style={styles.btnPrimary} onClick={handleViewPricing}>
                View Detailed Pricing & Services
              </button>
            </motion.div>
          </div>
        </section>

        {/* Section Separator */}
        <div style={styles.sectionSeparator}></div>

        {/* FAQ Section */}
        <section style={styles.section}>
          <div style={styles.container}>
            <motion.div 
              style={styles.sectionHeader}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
              <p style={styles.sectionSubtitle}>Common questions about our 3D printing services</p>
            </motion.div>

            <motion.div 
              style={styles.faqList}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              {faqs.map((faq, index) => (
                <motion.div key={index} style={styles.faqItem} variants={fadeIn}>
                  <button 
                    style={styles.faqQuestion}
                    onClick={() => handleFaqToggle(index)}
                    aria-expanded={activeFaq === index}
                  >
                    <span>{faq.q}</span>
                    <motion.div 
                      style={styles.faqIcon}
                      animate={{ rotate: activeFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDownIcon />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {activeFaq === index && (
                      <motion.div 
                        style={styles.faqAnswer}
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
              style={styles.sectionCta}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <button style={styles.btnOutline} onClick={handleViewFAQ}>
                <QuestionIcon />
                View All FAQs
              </button>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={styles.ctaSection}>
          <div style={styles.container}>
            <motion.div 
              style={styles.ctaContent}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 style={styles.ctaTitle}>Ready to Start Your Project?</h2>
              <p style={styles.ctaText}>Get your free quote today and bring your designs to life with quality 3D printing.</p>
              <div style={styles.ctaButtons}>
                <button 
                  style={styles.ctaButton}
                  onClick={handleStartPrinting}
                  disabled={isLoading}
                >
                  <MessengerSocialIcon />
                  <span>Message Us</span>
                </button>
                <button 
                  style={styles.ctaButtonSecondary}
                  onClick={() => window.location.href = 'mailto:prismbox3dservice@gmail.com?subject=3D%20Print%20Quote%20Request'}
                >
                  <EmailIcon />
                  <span>Email Your Files</span>
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Homepage;