import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import PrismBackground from '../components/PrismBackground';
import './Homepage.css';

const Homepage = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const yHero = useTransform(scrollYProgress, [0, 0.3], ['0%', '10%']);

  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 50;
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled);
    }
  }, [isScrolled]);

  const smoothScrollTo = useCallback((elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const variants = useMemo(() => ({
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.06,
          delayChildren: 0.1
        }
      }
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    }
  }), []);

  if (!isLoaded) {
    return (
      <div className="raycast-loader">
        <div className="loader-icon">
          <div className="loader-cube"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="homepage raycast-theme">
      <PrismBackground />
      
      <motion.header 
        className={`raycast-header ${isScrolled ? 'scrolled' : ''}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="header-container">
          <div className="logo-group">
            <div className="logo-icon">
              <div className="cube-3d">
                <div className="cube-face front"></div>
                <div className="cube-face back"></div>
                <div className="cube-face right"></div>
                <div className="cube-face left"></div>
                <div className="cube-face top"></div>
                <div className="cube-face bottom"></div>
              </div>
            </div>
            <div className="logo-content">
              <h1 className="logo-title">Prism Box 3D</h1>
              <span className="logo-subtitle">3D Printing Service</span>
            </div>
          </div>

          <nav className="nav-links">
            {[
              { label: 'How It Works', target: 'process' },
              { label: 'Services', target: 'services' },
              { label: 'Pricing', target: 'pricing' },
              { label: 'Guarantee', target: 'guarantee' },
              { label: 'Contact', target: 'contact' }
            ].map((item, index) => (
              <motion.button
                key={item.target}
                className="nav-link"
                onClick={() => smoothScrollTo(item.target)}
                whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (index * 0.1) }}
              >
                {item.label}
              </motion.button>
            ))}
          </nav>
        </div>
      </motion.header>

      <motion.section className="hero-section" style={{ y: yHero }}>
        <div className="hero-container">
          <motion.div 
            className="hero-content"
            variants={variants.container}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="status-badge" variants={variants.item}>
              <div className="status-dot"></div>
              <span>Quality Guaranteed</span>
            </motion.div>

            <motion.h1 className="hero-title" variants={variants.item}>
              Your 3D files, printed & delivered
            </motion.h1>

            <motion.p className="hero-description" variants={variants.item}>
              Upload your STL file, choose materials and colors, get instant pricing. 
              Professional 3D printing service with quality guarantee and local delivery in San Jose del Monte, Bulacan.
            </motion.p>

            <motion.div className="feature-list" variants={variants.item}>
              {[
                'Instant file analysis & weight calculation',
                'Real-time pricing with material selection',
                'Professional quality with service guarantee',
                'Fast local delivery with damage protection'
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="feature-item"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + (index * 0.1) }}
                >
                  <div className="feature-icon">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="hero-actions" variants={variants.item}>
              <motion.button
                className="primary-button"
                onClick={() => navigate('/configure')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Upload File & Get Quote
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="info-card">
              <div className="card-header">
                <div className="card-badge">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M9 2L13 6L9 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 6H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Quality First</span>
                </div>
              </div>
              
              <div className="card-content">
                <h3>Professional 3D Printing Service</h3>
                <p>Modern startup focused on quality prints with competitive rates, reliable delivery, and comprehensive service guarantee.</p>
                
                <div className="stats-grid">
                  <div className="stat">
                    <div className="stat-value">99.8%</div>
                    <div className="stat-label">Print Success</div>
                  </div>
                  <div className="stat">
                    <div className="stat-value">24h</div>
                    <div className="stat-label">Avg Turnaround</div>
                  </div>
                </div>
                
                <div className="features-list">
                  {['Quality guarantee', 'Modern equipment', 'Fair pricing'].map((item, index) => (
                    <div key={index} className="feature-tag">
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <RaycastSection id="process" className="process-section">
        <motion.h2 className="section-title">
          Simple Process
        </motion.h2>
        
        <div className="process-grid">
          {[
            {
              step: '01',
              title: 'Upload Your File',
              description: 'Upload STL, OBJ, or 3MF files. Automatic weight calculation and material analysis.',
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )
            },
            {
              step: '02',
              title: 'Choose Material & Color',
              description: 'Select from PLA, PETG, ABS filaments in various colors. Real-time price updates.',
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )
            },
            {
              step: '03',
              title: 'Payment & Order',
              description: 'Secure payment via GCash or bank transfer. Order confirmation and tracking.',
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                  <line x1="1" y1="10" x2="23" y2="10" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )
            },
            {
              step: '04',
              title: 'Print & Delivery',
              description: 'Professional printing with progress updates. Secure packaging and delivery via Lalamove.',
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="1" y="3" width="15" height="13" stroke="currentColor" strokeWidth="2"/>
                  <polygon points="16,3 19,7 19,13 16,13" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <circle cx="5.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="18.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )
            }
          ].map((item, index) => (
            <motion.div
              key={item.step}
              className="process-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="card-step">{item.step}</div>
              <div className="card-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </RaycastSection>

      <RaycastSection id="services" className="services-section">
        <motion.h2 className="section-title">
          Our Services
        </motion.h2>
        
        <div className="services-grid">
          {[
            {
              title: 'Rapid Prototyping',
              description: 'Quick iterations for product development and testing',
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              )
            },
            {
              title: 'Custom Parts',
              description: 'Replacement parts, tools, and custom mechanical components',
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )
            },
            {
              title: 'Student Projects',
              description: 'Educational models and assignments with special discounts',
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22 10V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-2" stroke="currentColor" strokeWidth="2"/>
                  <rect x="6" y="10" width="12" height="4" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )
            },
            {
              title: 'Creative Projects',
              description: 'Art pieces, miniatures, decorative items and complex geometries',
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              )
            }
          ].map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </RaycastSection>

      <RaycastSection id="pricing" className="pricing-section">
        <motion.h2 className="section-title">
          Transparent Pricing
        </motion.h2>
        
        <motion.div 
          className="pricing-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="pricing-formula">
            <div className="formula-part">
              <span className="formula-label">Material Cost</span>
              <span className="formula-value">₱5.00/gram</span>
            </div>
            <span className="formula-operator">+</span>
            <div className="formula-part">
              <span className="formula-label">Setup & Labor</span>
              <span className="formula-value">₱150.00</span>
            </div>
            <span className="formula-operator">+</span>
            <div className="formula-part">
              <span className="formula-label">Service Fee</span>
              <span className="formula-value">₱50.00</span>
            </div>
            <span className="formula-operator">=</span>
            <div className="formula-result">
              <span className="formula-label">Total Price</span>
              <span className="formula-example">50g print = ₱450</span>
            </div>
          </div>

          <div className="pricing-details">
            <h4>What's Included</h4>
            {[
              'Material cost: Premium PLA, PETG, or ABS filament',
              'Setup & labor: File processing, printer setup, and quality checks',
              'Service fee: Electricity, equipment usage, and maintenance',
              'Quality guarantee: Free reprint for manufacturing defects',
              'Delivery: ₱200-400 via Lalamove (paid directly to rider)'
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="detail-item"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="2" fill="currentColor"/>
                </svg>
                <span>{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </RaycastSection>

      <RaycastSection id="guarantee" className="guarantee-section">
        <motion.h2 className="section-title">
          Service Guarantee
        </motion.h2>
        
        <div className="guarantee-grid">
          <motion.div 
            className="guarantee-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="guarantee-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 2L20 6H26C27.1 6 28 6.9 28 8V14L32 18L28 22V28C28 29.1 27.1 30 26 30H20L16 34L12 30H6C4.9 30 4 29.1 4 28V22L0 18L4 14V8C4 6.9 4.9 6 6 6H12L16 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M12 16L16 20L24 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Print Quality Promise</h3>
            <p>If your print fails due to our equipment issues (nozzle problems, filament defects, etc.), we'll notify you immediately and offer:</p>
            <ul className="guarantee-list">
              <li><strong>Option 1:</strong> Wait for reprint (no extra cost)</li>
              <li><strong>Option 2:</strong> 60% refund of total payment</li>
            </ul>
          </motion.div>

          <motion.div 
            className="guarantee-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="guarantee-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="2" y="6" width="28" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M2 12H30" stroke="currentColor" strokeWidth="2"/>
                <rect x="6" y="16" width="4" height="2" rx="1" fill="currentColor"/>
                <rect x="12" y="16" width="8" height="2" rx="1" fill="currentColor"/>
              </svg>
            </div>
            <h3>Delivery Protection</h3>
            <p>Items damaged during delivery are fully covered. Requirements for claims:</p>
            <ul className="guarantee-list">
              <li><strong>Video proof:</strong> Record unboxing before opening</li>
              <li><strong>Quick report:</strong> Contact us within 24 hours</li>
              <li><strong>Resolution:</strong> Free reprint or 60% refund</li>
            </ul>
          </motion.div>
        </div>

        <motion.div 
          className="guarantee-note"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="note-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2"/>
              <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div className="note-content">
            <h4>Why 60% Refund?</h4>
            <p>This covers material costs and protects against fraudulent claims while ensuring you're fairly compensated. It's the industry standard for small 3D printing services.</p>
          </div>
        </motion.div>
      </RaycastSection>

      <RaycastSection id="contact" className="contact-section">
        <motion.h2 className="section-title">
          Get Started
        </motion.h2>
        
        <div className="contact-grid">
          <div className="contact-info">
            {[
              { 
                title: 'Location', 
                content: 'San Jose del Monte, Bulacan',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M17.5 8.33334C17.5 14.1667 10 19.1667 10 19.1667C10 19.1667 2.5 14.1667 2.5 8.33334C2.5 6.34423 3.29018 4.43656 4.6967 3.03 6.10322 1.62345 8.01088 0.833344 10 0.833344C11.9891 0.833344 13.8968 1.62345 15.3033 3.03 16.7098 4.43656 17.5 6.34423 17.5 8.33334Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10 10.8333C11.3807 10.8333 12.5 9.71404 12.5 8.33334C12.5 6.95263 11.3807 5.83334 10 5.83334C8.61929 5.83334 7.5 6.95263 7.5 8.33334C7.5 9.71404 8.61929 10.8333 10 10.8333Z" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                )
              },
              { 
                title: 'Turnaround Time', 
                content: 'Variable - depends on size and complexity',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/>
                    <polyline points="10,5 10,10 13,13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )
              },
              { 
                title: 'Payment Methods', 
                content: 'GCash, Bank Transfer',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <line x1="2" y1="8" x2="18" y2="8" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                )
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="contact-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="contact-icon">{item.icon}</div>
                <div className="contact-content">
                  <h4>{item.title}</h4>
                  <p>{item.content}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="contact-action"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="primary-button large"
              onClick={() => navigate('/configure')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Upload Your 3D File
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 7L8 11L12 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 13H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
            <p className="action-subtitle">Instant analysis and pricing with quality guarantee</p>
          </motion.div>
        </div>
      </RaycastSection>
    </div>
  );
};

const RaycastSection = ({ children, className, id }) => (
  <motion.section
    id={id}
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
      }
    }}
  >
    {children}
  </motion.section>
);

export default Homepage;
