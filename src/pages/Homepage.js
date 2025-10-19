import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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
          staggerChildren: 0.15,
          delayChildren: 0.3
        }
      }
    },
    item: {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    },
    cardHover: {
      rest: { scale: 1, y: 0 },
      hover: {
        scale: 1.02,
        y: -4,
        transition: {
          duration: 0.2,
          ease: "easeOut"
        }
      }
    }
  }), []);

  // FIXED Logo Component - no rotation
  const PrismLogo = ({ size = 32 }) => (
    <div className="logo-icon" style={{ width: size, height: size }}>
      <div className="cube-3d">
        <div className="cube-face front"></div>
        <div className="cube-face back"></div>
        <div className="cube-face right"></div>
        <div className="cube-face left"></div>
        <div className="cube-face top"></div>
        <div className="cube-face bottom"></div>
      </div>
    </div>
  );

  if (!isLoaded) {
    return (
      <div className="raycast-loader">
        <div className="loader-icon">
          <div className="loader-cube"></div>
        </div>
        <p className="loader-text">Loading...</p>
      </div>
    );
  }

  return (
    <div className="homepage raycast-theme">
      <PrismBackground />
      
      {/* FIXED Header with Working Navigation */}
      <motion.header 
        className={`raycast-header ${isScrolled ? 'scrolled' : ''}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-container">
          <div className="logo-group" onClick={() => smoothScrollTo('hero')}>
            <PrismLogo size={32} />
            <div className="logo-content">
              <div className="logo-title-row">
                <h1 className="logo-title">Prism Box 3D</h1>
                <span className="beta-badge">BETA</span>
              </div>
              <span className="logo-subtitle">3D Printing Service</span>
            </div>
          </div>

          {/* FIXED Navigation - Mixed scroll and routing */}
          <nav className="nav-links">
            {[
              { label: 'How It Works', target: 'process', type: 'scroll' },
              { label: 'About Us', target: 'about', type: 'scroll' },
              { label: 'Materials Catalog', target: '/filaments', type: 'navigate' },
              { label: 'FAQ', target: 'faq', type: 'scroll' }
            ].map((item, index) => (
              <motion.button
                key={item.target}
                className="nav-link"
                onClick={() => {
                  if (item.type === 'navigate') {
                    navigate(item.target);
                  } else {
                    smoothScrollTo(item.target);
                  }
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + (index * 0.1) }}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.label}
              </motion.button>
            ))}
            
            <motion.button
              className="nav-link primary-button"
              onClick={() => navigate('/configuration')}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="hero-section">
        <motion.div 
          className="hero-container"
          style={{ y: yHero }}
        >
          <motion.div 
            className="hero-content"
            variants={variants.container}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="status-badge" variants={variants.item}>
              <div className="status-dot"></div>
              <span>Now Live in Bulacan - BETA Launch</span>
            </motion.div>

            <motion.h1 className="hero-title" variants={variants.item}>
              Quality <span className="highlight-text">3D Printing</span><br />
              Made Accessible
            </motion.h1>

            <motion.p className="hero-description" variants={variants.item}>
              From concept to reality in days, not weeks. Upload your design, 
              choose materials, and get high-quality prints delivered to your door.
            </motion.p>

            <motion.div className="feature-list" variants={variants.item}>
              {[
                'Student discounts available with valid ID',
                'Multiple materials and finishes available',
                '24-hour rush service for urgent projects',
                'Quality guarantee or your money back'
              ].map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="feature-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + (index * 0.1) }}
                  whileHover={{ x: 4, scale: 1.02 }}
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
                className="primary-button large glow-button"
                onClick={() => navigate('/configuration')}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Start Your Print</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
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
                <p>Modern startup focused on quality prints with competitive rates, reliable delivery, and comprehensive service guarantee. Student-friendly pricing available.</p>
                
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
                  {['Student discounts', 'Quality guarantee', 'Fair pricing'].map((item, index) => (
                    <div key={index} className="feature-tag">
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Break */}
      <div className="stats-break">
        <div className="stats-container">
          {[
            { value: '99.8%', label: 'Print Success Rate' },
            { value: '24hr', label: 'Rush Available' },
            { value: '30%', label: 'Student Savings' },
            { value: '₱345', label: 'Starting From' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="stat-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.05 }}
            >
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Process Section */}
      <section id="process" className="process-section">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          How It Works
        </motion.h2>
        
        <div className="process-grid">
          {[
            {
              step: 1,
              title: 'Upload Your Design',
              description: 'Drag and drop your 3D files (STL, OBJ, 3MF). Our system automatically validates and estimates print time and material usage.',
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              )
            },
            {
              step: 2,
              title: 'Configure & Price',
              description: 'Select materials, colors, and services. See real-time pricing with student discounts automatically applied with valid ID.',
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )
            },
            {
              step: 3,
              title: 'Print & Deliver',
              description: 'We print with quality monitoring and deliver via Lalamove. Track your order status through our system.',
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              )
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="process-card enhanced-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover="hover"
              variants={variants.cardHover}
            >
              <div className="card-step">{item.step}</div>
              <div className="card-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About & Services Section */}
      <section id="about" className="about-services-section">
        <div className="about-services-container">
          <motion.div 
            className="about-content"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2>About Prism Box 3D</h2>
            <div className="about-story">
              <p>
                We're a modern 3D printing startup based in San Jose del Monte, Bulacan. 
                Our mission is simple: make quality 3D printing accessible to everyone - 
                from students working on thesis projects to entrepreneurs creating prototypes.
              </p>
              
              <div className="about-values">
                {[
                  { 
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ), 
                    text: 'Quality guarantee' 
                  },
                  { 
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    ), 
                    text: '24-hour rush service' 
                  },
                  { 
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    ), 
                    text: 'Student-friendly pricing' 
                  },
                  { 
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    ), 
                    text: 'Transparent pricing' 
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="value-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 8 }}
                  >
                    <div className="value-icon">{item.icon}</div>
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="beta-callout">
                <div className="beta-icon">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="beta-content">
                  <h4>BETA Launch Benefits</h4>
                  <p>Early customers get special pricing and direct input on our service improvements.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="services-content"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2>Our Services</h2>
            <div className="services-grid">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  ),
                  title: 'Student Projects',
                  description: 'Thesis models, prototypes, and academic projects with special student pricing and fast turnaround.'
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  ),
                  title: 'Business Prototypes',
                  description: 'Professional prototypes and small-batch production for entrepreneurs and startups.'
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h4" />
                    </svg>
                  ),
                  title: 'Personal Items',
                  description: 'Custom designs, replacement parts, and creative projects for hobbyists and makers.'
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: 'Rush Service',
                  description: '24-hour turnaround available for urgent projects and last-minute deadlines.'
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  className="service-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover="hover"
                  variants={variants.cardHover}
                >
                  <div className="service-icon">{service.icon}</div>
                  <h4>{service.title}</h4>
                  <p>{service.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="newsletter-signup">
              <h4>Join Our BETA Community</h4>
              <p>Be the first to know about new materials and special BETA offers.</p>
              <form className="signup-form" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="email-input"
                  required
                />
                <motion.button
                  type="submit"
                  className="signup-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join BETA
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Materials & Pricing Section */}
      <section id="materials" className="materials-pricing-section">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Materials & Pricing
        </motion.h2>
        
        <div className="materials-pricing-container">
          <div className="materials-content">
            <h3>Available Materials</h3>
            <div className="materials-grid">
              {[
                {
                  name: 'PLA Matte',
                  description: 'Non-reflective matte finish perfect for professional applications',
                  properties: ['Matte finish', 'No fingerprints', 'Professional appearance'],
                  colors: ['Beige', 'Red', 'Dark Blue'],
                  studentPrice: '₱3.50/g',
                  regularPrice: '₱5.00/g'
                },
                {
                  name: 'PLA+',
                  description: 'Enhanced PLA with improved strength and temperature resistance',
                  properties: ['Higher strength', 'Better heat resistance', 'Enhanced durability'],
                  colors: ['Beige'],
                  studentPrice: '₱3.75/g',
                  regularPrice: '₱5.50/g'
                },
                {
                  name: 'ABS',
                  description: 'Industrial-grade material with excellent heat and impact resistance',
                  properties: ['Heat resistant', 'Impact resistant', 'Chemical resistance'],
                  colors: ['Silver'],
                  studentPrice: '₱4.00/g',
                  regularPrice: '₱6.00/g'
                },
                {
                  name: 'PETG',
                  description: 'Crystal clear with excellent chemical resistance and strength',
                  properties: ['Chemical resistant', 'Crystal clear', 'Food safe'],
                  colors: ['Silver'],
                  studentPrice: '₱4.00/g',
                  regularPrice: '₱6.00/g'
                }
              ].map((material, index) => (
                <motion.div
                  key={index}
                  className="material-card"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover="hover"
                  variants={variants.cardHover}
                >
                  <h4>{material.name}</h4>
                  <p>{material.description}</p>
                  <div className="pricing-display">
                    <div className="price-tier student">
                      <span className="tier-label">🎓 Student</span>
                      <span className="price">{material.studentPrice}</span>
                    </div>
                    <div className="price-tier regular">
                      <span className="tier-label">💼 Regular</span>
                      <span className="price">{material.regularPrice}</span>
                    </div>
                  </div>
                  <div className="properties">
                    {material.properties.map((prop, idx) => (
                      <span key={idx} className="property-tag">{prop}</span>
                    ))}
                  </div>
                  <div className="colors">
                    <span>Colors:</span> {material.colors.join(', ')}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View Full Catalog Button */}
            <motion.div 
              className="catalog-cta"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="catalog-button"
                onClick={() => navigate('/filaments')}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View Complete Materials Catalog</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </motion.div>
          </div>

          <div className="pricing-content">
            <h3>Transparent Pricing</h3>
            
            <div className="pricing-formula">
              <div className="formula-header">
                <h4>How We Calculate Your Total</h4>
                <p>No hidden fees, everything is clearly broken down:</p>
              </div>
              
              <div className="formula-breakdown">
                <div className="formula-part">
                  <div className="part-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 2L3 7V18H8V13H12V18H17V7L10 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="part-content">
                    <span className="label">Material Cost</span>
                    <div className="price-range">
                      <span className="student-price">₱3.50-4.00/g</span>
                      <span className="regular-price">₱5.00-6.00/g</span>
                    </div>
                    <small>Student vs Regular pricing</small>
                  </div>
                </div>
                
                <div className="plus-symbol">+</div>
                
                <div className="formula-part">
                  <div className="part-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2Z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M10 6V14M6 10H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="part-content">
                    <span className="label">Setup & Labor</span>
                    <div className="price-range">
                      <span className="student-price">₱150</span>
                      <span className="regular-price">₱220</span>
                    </div>
                    <small>Setup, monitoring, post-processing</small>
                  </div>
                </div>
                
                <div className="plus-symbol">+</div>
                
                <div className="formula-part">
                  <div className="part-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3 3H17C17.5523 3 18 3.44772 18 4V16C18 16.5523 17.5523 17 17 17H3C2.44772 17 2 16.5523 2 16V4C2 3.44772 2.44772 3 3 3Z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M7 7H13M7 11H13M7 15H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="part-content">
                    <span className="label">Packaging</span>
                    <div className="price-range">
                      <span className="student-price">₱20</span>
                      <span className="regular-price">₱26</span>
                    </div>
                    <small>Box, bubble wrap, protection</small>
                  </div>
                </div>
              </div>
              
              <div className="formula-result">
                <div className="equals-symbol">=</div>
                <div className="result-content">
                  <span className="label">Your Total Price</span>
                  <div className="example-pricing">
                    <div className="example">
                      <span className="tier">🎓 Student Example (50g PLA Matte):</span>
                      <span className="calculation">₱175 + ₱150 + ₱20 = <strong>₱345</strong></span>
                    </div>
                    <div className="example">
                      <span className="tier">💼 Regular Example (50g PLA Matte):</span>
                      <span className="calculation">₱250 + ₱220 + ₱26 = <strong>₱496</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="additional-services">
              <h4>Optional Add-on Services</h4>
              <div className="services-list">
                {[
                  { name: 'Rush Service (24hr)', student: '+ ₱100', regular: '+ ₱150' },
                  { name: 'Assembly/Gluing', student: '+ ₱75', regular: '+ ₱100' },
                  { name: 'Multiple Color Changes', student: '+ ₱50', regular: '+ ₱75' }
                ].map((service, index) => (
                  <div key={index} className="service-item">
                    <span className="service-name">{service.name}</span>
                    <div className="service-pricing">
                      <span className="student-add-on">{service.student}</span>
                      <span className="regular-add-on">{service.regular}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="student-discount-info">
              <div className="discount-badge">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L13.09 8.26L22 9L17 14L18.18 22L12 18.77L5.82 22L7 14L2 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <div className="badge-content">
                  <h4>🎓 Student Discount Available</h4>
                  <p>Save up to 30% with valid student ID verification</p>
                </div>
              </div>
            </div>

            <div className="pricing-includes">
              <h4>What's Included in Every Order</h4>
              <div className="includes-list">
                {[
                  'Premium filament materials',
                  'File processing & validation',
                  'Professional printer setup',
                  'Quality monitoring during print',
                  'Post-processing (if needed)',
                  'Professional packaging',
                  'Manufacturing defect guarantee'
                ].map((item, index) => (
                  <div key={index} className="include-item">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="delivery-info">
              <h4>Delivery Information</h4>
              <p><strong>₱200-400 via Lalamove</strong> (paid directly to rider)</p>
              <p>Secure packaging with damage protection guarantee.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq-section">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Frequently Asked Questions
        </motion.h2>
        
        <div className="faq-container">
          {[
            {
              question: 'Do you offer student discounts?',
              answer: 'Yes! Students get up to 30% off with a valid student ID. The discount applies to materials, services, and add-ons.'
            },
            {
              question: 'What file formats do you accept?',
              answer: 'We accept STL, OBJ, 3MF, and PLY files up to 100MB each. Our system automatically validates and estimates costs.'
            },
            {
              question: 'How long does printing take?',
              answer: 'Standard orders take 2-3 days. Rush service (24-hour turnaround) is available for urgent projects.'
            },
            {
              question: 'What materials do you offer?',
              answer: 'We offer PLA Matte, PLA+, ABS, and PETG in multiple colors. Each material has different properties for different applications.'
            },
            {
              question: 'How does delivery work?',
              answer: 'We use Lalamove for delivery throughout Bulacan and NCR. Costs ₱200-400 paid directly to rider. All prints are professionally packaged.'
            },
            {
              question: 'What if my print has defects?',
              answer: 'We guarantee quality or your money back. Manufacturing defects get free reprints or 60% refunds with quality photos.'
            }
          ].map((faq, index) => (
            <motion.div
              key={index}
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <svg 
                  className={`faq-chevron ${openFAQ === index ? 'open' : ''}`}
                  width="20" 
                  height="20" 
                  viewBox="0 0 20 20" 
                  fill="none"
                >
                  <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <AnimatePresence>
                {openFAQ === index && (
                  <motion.div
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Start Section */}
      <section className="start-section">
        <div className="start-container">
          <motion.div
            className="start-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Start Printing?</h2>
            <p>Upload your 3D file, get instant pricing, and place your order. Quality guaranteed.</p>
            <div className="start-actions">
              <motion.button 
                className="primary-button large glow-button"
                onClick={() => navigate('/configuration')}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get Started Now</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
              <motion.button 
                className="secondary-button" 
                onClick={() => navigate('/filaments')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Materials
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="raycast-footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-logo">
              <PrismLogo size={32} />
              <div className="logo-content">
                <h3 className="footer-title">Prism Box 3D</h3>
                <p className="footer-subtitle">Quality prints or your money back</p>
              </div>
            </div>
            
            <div className="footer-info">
              <h4>Contact Information</h4>
              <p>San Jose del Monte, Bulacan</p>
              <p>🚀 BETA Launch - Limited Time Offers</p>
              <div className="footer-social">
                <span className="social-badge">Join our BETA community</span>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 Prism Box 3D. All rights reserved. | BETA Launch</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
