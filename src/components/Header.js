import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import PrismBackground from '../components/PrismBackground';
import './Homepage.css';

const Homepage = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [email, setEmail] = useState('');
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

  const toggleFAQ = useCallback((index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  }, [openFAQ]);

  const handleNewsletterSubmit = useCallback((e) => {
    e.preventDefault();
    alert(`Thanks for joining our BETA community, ${email}! We'll keep you updated.`);
    setEmail('');
  }, [email]);

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
              <div className="logo-title-row">
                <h1 className="logo-title">Prism Box 3D</h1>
                <span className="beta-badge">BETA</span>
              </div>
              <span className="logo-subtitle">3D Printing Service</span>
            </div>
          </div>

          <nav className="nav-links">
            {[
              { label: 'How It Works', target: 'process' },
              { label: 'Services', target: 'services' },
              { label: 'About', target: 'about' },
              { label: 'Materials', target: 'materials' },
              { label: 'Pricing', target: 'pricing' },
              { label: 'FAQ', target: 'faq' },
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
              title: 'Personal Projects',
              description: 'Upload your STL files for personal items, home organizers, replacement parts, and hobby projects.',
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )
            },
            {
              title: 'Student Projects',
              description: 'Educational models, school assignments, and thesis projects. We offer special pricing for students.',
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
              description: 'Art pieces, miniatures, decorative items, figurines, and unique creative designs from your files.',
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              )
            },
            {
              title: 'Business Projects',
              description: 'Prototypes, product samples, marketing materials, and professional items for businesses and entrepreneurs.',
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                  <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2"/>
                  <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )
            },
            {
              title: 'Replacement Parts',
              description: 'Print replacement parts for appliances, tools, toys, and household items from your STL files.',
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )
            },
            {
              title: 'Gaming & Hobbies',
              description: 'Gaming accessories, board game pieces, model parts, drone components, and hobby-related items.',
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="3" width="20" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="8" cy="9" r="1" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 8L18 10L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="12" y1="17" x2="12" y2="22" stroke="currentColor" strokeWidth="2"/>
                  <line x1="8" y1="22" x2="16" y2="22" stroke="currentColor" strokeWidth="2"/>
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

      <RaycastSection id="about" className="about-section">
        <motion.h2 className="section-title">
          About Prism Box 3D
        </motion.h2>
        
        <div className="about-container">
          <motion.div 
            className="about-story"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="story-content">
              <div className="story-header">
                <div className="founder-avatar">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="24" cy="20" r="6" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 42c0-8 7-14 16-14s16 6 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="founder-info">
                  <h3>Founded by Innovators</h3>
                  <p>Passionate about making 3D printing accessible</p>
                </div>
              </div>

              <div className="story-text">
                <h4>Our Mission</h4>
                <p>We believe everyone should have access to professional 3D printing services without the complexity. Whether you're a student working on a thesis project, an entrepreneur creating prototypes, or a hobbyist bringing ideas to life, we're here to turn your digital designs into physical reality.</p>
                
                <h4>Why Choose Us</h4>
                <div className="values-grid">
                  {[
                    {
                      icon: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      ),
                      title: 'Quality First',
                      description: 'Every print meets our high standards before shipping'
                    },
                    {
                      icon: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ),
                      title: 'Fast Turnaround',
                      description: 'Most orders completed within 24-72 hours'
                    },
                    {
                      icon: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2L13.09 8.26L22 9L17 14L18.18 22L12 18.77L5.82 22L7 14L2 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      ),
                      title: 'Fair Pricing',
                      description: 'Transparent costs with no hidden fees'
                    },
                    {
                      icon: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ),
                      title: 'Local Service',
                      description: 'Based in San Jose del Monte, Bulacan'
                    }
                  ].map((value, index) => (
                    <motion.div
                      key={index}
                      className="value-card"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="value-icon">{value.icon}</div>
                      <h5>{value.title}</h5>
                      <p>{value.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="about-stats"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="stats-card">
              <h4>BETA Launch Stats</h4>
              <div className="beta-stats">
                {[
                  { label: 'Launch Date', value: 'October 2025' },
                  { label: 'Target Customers', value: 'Students & Makers' },
                  { label: 'Service Area', value: 'Bulacan & NCR' },
                  { label: 'Materials', value: 'PLA, PETG, ABS' }
                ].map((stat, index) => (
                  <div key={index} className="beta-stat">
                    <span className="stat-label">{stat.label}</span>
                    <span className="stat-value">{stat.value}</span>
                  </div>
                ))}
              </div>
              
              <div className="beta-message">
                <div className="message-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 1L12.5 6.5L19 7L14.5 11L16 18L10 15L4 18L5.5 11L1 7L7.5 6.5L10 1Z" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
                <p><strong>Join our BETA!</strong> Early customers get special pricing and direct input on our service improvements.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </RaycastSection>

      <RaycastSection id="portfolio" className="portfolio-section">
        <motion.h2 className="section-title">
          Sample Prints Gallery
        </motion.h2>
        
        <motion.div 
          className="portfolio-placeholder"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="placeholder-content">
            <div className="placeholder-icon">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <path d="M32 8L8 16V32C8 44 20 52 32 56C44 52 56 44 56 32V16L32 8Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M24 32L28 36L40 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Quality Prints Coming Soon</h3>
            <p>We're in BETA mode! Our first customer prints will be showcased here. Every project we complete becomes part of our growing portfolio.</p>
            
            <div className="preview-categories">
              <div className="category-tag">Educational Models</div>
              <div className="category-tag">Prototypes</div>
              <div className="category-tag">Art & Design</div>
              <div className="category-tag">Replacement Parts</div>
              <div className="category-tag">Custom Projects</div>
            </div>
            
            <motion.button
              className="primary-button"
              onClick={() => navigate('/configure')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Be Our First Customer
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </RaycastSection>
      <RaycastSection id="community" className="community-section">
        <motion.h2 className="section-title">
          Join Our BETA Community
        </motion.h2>
        
        <div className="community-container">
          <motion.div 
            className="community-content"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="community-benefits">
              <h3>Early Adopter Benefits</h3>
              <div className="benefits-list">
                {[
                  {
                    icon: (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                        <path d="M12 1V3" stroke="currentColor" strokeWidth="2"/>
                        <path d="M12 21V23" stroke="currentColor" strokeWidth="2"/>
                        <path d="M4.22 4.22L5.64 5.64" stroke="currentColor" strokeWidth="2"/>
                        <path d="M18.36 18.36L19.78 19.78" stroke="currentColor" strokeWidth="2"/>
                        <path d="M1 12H3" stroke="currentColor" strokeWidth="2"/>
                        <path d="M21 12H23" stroke="currentColor" strokeWidth="2"/>
                        <path d="M4.22 19.78L5.64 18.36" stroke="currentColor" strokeWidth="2"/>
                        <path d="M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    ),
                    title: 'Special BETA Pricing',
                    description: 'Early customers get discounted rates during our launch phase'
                  },
                  {
                    icon: (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M21 15a2 2 0 0 1-2 2H7L4 20V8a2 2 0 0 1 2-2H19a2 2 0 0 1 2 2V15Z" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    ),
                    title: 'Direct Feedback Channel',
                    description: 'Your input shapes our service improvements and new features'
                  },
                  {
                    icon: (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M16 21V19a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4V21" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="8.5" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                        <path d="M20 8v6" stroke="currentColor" strokeWidth="2"/>
                        <path d="M23 11h-6" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    ),
                    title: 'Priority Support',
                    description: 'Direct communication with founders for any questions or issues'
                  },
                  {
                    icon: (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L13.09 8.26L22 9L17 14L18.18 22L12 18.77L5.82 22L7 14L2 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    ),
                    title: 'Exclusive Updates',
                    description: 'First to know about new materials, services, and improvements'
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="benefit-item"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="benefit-icon">{benefit.icon}</div>
                    <div className="benefit-content">
                      <h4>{benefit.title}</h4>
                      <p>{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="newsletter-signup"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="signup-card">
              <div className="signup-header">
                <div className="signup-icon">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M16 2L28 8V16C28 22 22 26 16 28C10 26 4 22 4 16V8L16 2Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 16L16 20L24 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Stay Updated</h3>
                <p>Be the first to know when we launch new features, materials, and special offers.</p>
              </div>

              <form className="signup-form" onSubmit={handleNewsletterSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="email-input"
                    required
                  />
                  <motion.button
                    type="submit"
                    className="signup-button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Join BETA
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.button>
                </div>
                <p className="signup-note">
                  No spam, just updates on our 3D printing service progress.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </RaycastSection>

      <RaycastSection id="materials" className="materials-section">
        <motion.h2 className="section-title">
          Materials & Colors
        </motion.h2>
        
        <div className="materials-grid">
          {[
            {
              name: 'PLA',
              description: 'Easy to print, biodegradable, perfect for beginners and decorative items.',
              properties: ['Eco-friendly', 'Low odor', 'Good surface finish', 'Not heat resistant'],
              colors: ['White', 'Black', 'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple'],
              icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 4L4 10V22C4 26 10 28 16 28C22 28 28 26 28 22V10L16 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 4V28" stroke="currentColor" strokeWidth="2"/>
                  <path d="M4 10L28 10" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )
            },
            {
              name: 'PETG',
              description: 'Strong, chemical resistant, crystal clear. Great for functional parts and containers.',
              properties: ['Chemical resistant', 'Impact resistant', 'Crystal clear', 'Food safe'],
              colors: ['Clear', 'White', 'Black', 'Red', 'Blue', 'Green'],
              icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="4" y="4" width="24" height="24" rx="3" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 4V28" stroke="currentColor" strokeWidth="2"/>
                  <path d="M4 16H28" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )
            },
            {
              name: 'ABS',
              description: 'Durable, heat resistant, perfect for mechanical parts and automotive applications.',
              properties: ['Heat resistant', 'Strong & durable', 'Post-processable', 'Chemical resistant'],
              colors: ['White', 'Black', 'Red', 'Blue', 'Gray'],
              icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 8V24" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 16H24" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )
            }
          ].map((material, index) => (
            <motion.div
              key={index}
              className="material-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="material-header">
                <div className="material-icon">{material.icon}</div>
                <h3>{material.name}</h3>
              </div>
              <p className="material-description">{material.description}</p>
              
              <div className="material-properties">
                <h4>Properties</h4>
                <div className="properties-list">
                  {material.properties.map((prop, idx) => (
                    <span key={idx} className="property-tag">{prop}</span>
                  ))}
                </div>
              </div>

              <div className="material-colors">
                <h4>Available Colors</h4>
                <div className="colors-grid">
                  {material.colors.map((color, idx) => (
                    <span key={idx} className="color-tag">{color}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="file-requirements"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3>File Requirements</h3>
          <div className="requirements-grid">
            <div className="requirement-card">
              <div className="req-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4>Supported Formats</h4>
              <p>STL, OBJ, 3MF, PLY files accepted</p>
            </div>

            <div className="requirement-card">
              <div className="req-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4>File Size</h4>
              <p>Maximum 100MB per file</p>
            </div>

            <div className="requirement-card">
              <div className="req-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22V12" stroke="currentColor" strokeWidth="2"/>
                  <path d="M2 7L12 12L22 7" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h4>Model Integrity</h4>
              <p>Ensure your model is watertight and manifold</p>
            </div>

            <div className="requirement-card">
              <div className="req-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M21 16V8C21 6.9 20.1 6 19 6H5C3.9 6 3 6.9 3 8V16C3 17.1 3.9 18 5 18H19C20.1 18 21 17.1 21 16Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M7 10H17" stroke="currentColor" strokeWidth="2"/>
                  <path d="M7 14H13" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h4>Scale & Units</h4>
              <p>Files should be in millimeters (mm)</p>
            </div>
          </div>
        </motion.div>
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

      <RaycastSection id="faq" className="faq-section">
        <motion.h2 className="section-title">
          Frequently Asked Questions
        </motion.h2>
        
        <div className="faq-container">
          {[
            {
              question: 'What file formats do you accept?',
              answer: 'We accept STL, OBJ, 3MF, and PLY files. STL is the most common format for 3D printing. Make sure your files are under 100MB and your models are watertight (manifold).'
            },
            {
              question: 'How do you calculate the price?',
              answer: 'Our pricing is transparent: ₱5/gram for material + ₱150 setup & labor + ₱50 service fee. Upload your file to get instant weight calculation and exact pricing before ordering.'
            },
            {
              question: 'What is your turnaround time?',
              answer: 'Turnaround varies based on size and complexity. Small items (under 50g): 1-2 days. Medium items (50-200g): 2-3 days. Large items (200g+): 3-5 days. We\'ll provide exact timing after file analysis.'
            },
            {
              question: 'Do you offer student discounts?',
              answer: 'Yes! Students get special pricing for educational projects. Contact us with your student ID and project details for a custom quote.'
            },
            {
              question: 'What if my print fails or gets damaged during delivery?',
              answer: 'We offer a comprehensive guarantee. Print failures due to our equipment issues get a free reprint or 60% refund. Delivery damage is covered with video proof - we\'ll reprint or refund 60%.'
            },
            {
              question: 'Can you print in multiple colors?',
              answer: 'Each print is single-color, but we offer a wide range of colors for PLA, PETG, and ABS. For multi-color designs, you\'ll need to split your model into separate files for each color.'
            },
            {
              question: 'Do you provide design services?',
              answer: 'No, we\'re a printing service only. You need to provide ready-to-print 3D files. If you need design help, consider using online platforms like Fiverr or Upwork to find 3D designers.'
            },
            {
              question: 'How do I pay and place an order?',
              answer: 'Upload your file, choose materials, and get instant pricing. Payment via GCash or bank transfer. Once paid, we\'ll start printing and provide progress updates until delivery.'
            }
          ].map((faq, index) => (
            <motion.div
              key={index}
              className={`faq-item ${openFAQ === index ? 'open' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={`faq-icon ${openFAQ === index ? 'open' : ''}`}>
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
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

      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
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
                <span>Prism Box 3D</span>
              </div>
              <p className="footer-description">
                Professional 3D printing service in San Jose del Monte, Bulacan. Quality prints with transparent pricing and service guarantee.
              </p>
            </div>

            <div className="footer-links">
              <div className="footer-section">
                <h4>Services</h4>
                <ul>
                  <li><button onClick={() => smoothScrollTo('services')}>Personal Projects</button></li>
                  <li><button onClick={() => smoothScrollTo('services')}>Student Projects</button></li>
                  <li><button onClick={() => smoothScrollTo('services')}>Business Prints</button></li>
                  <li><button onClick={() => smoothScrollTo('materials')}>Materials</button></li>
                </ul>
              </div>

              <div className="footer-section">
                <h4>Information</h4>
                <ul>
                  <li><button onClick={() => smoothScrollTo('pricing')}>Pricing</button></li>
                  <li><button onClick={() => smoothScrollTo('faq')}>FAQ</button></li>
                  <li><button onClick={() => smoothScrollTo('guarantee')}>Guarantee</button></li>
                  <li><button onClick={() => smoothScrollTo('about')}>About Us</button></li>
                </ul>
              </div>

              <div className="footer-section">
                <h4>Contact</h4>
                <ul>
                  <li>San Jose del Monte, Bulacan</li>
                  <li>GCash & Bank Transfer</li>
                  <li>24-72h Turnaround</li>
                  <li>Quality Guaranteed</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p>&copy; 2025 Prism Box 3D. All rights reserved.</p>
              <div className="footer-status">
                <span className="status-badge">
                  <div className="status-dot"></div>
                  BETA Service
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
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
