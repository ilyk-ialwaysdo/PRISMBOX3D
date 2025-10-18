import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import PrismBackground from '../components/PrismBackground';
import './Homepage.css';

const Homepage = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [email, setEmail] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  
  const yHero = useTransform(scrollYProgress, [0, 0.3], ['0%', '15%']);
  const scaleProgress = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  
  // Smooth spring animations
  const springConfig = { damping: 25, stiffness: 120 };
  const springY = useSpring(yHero, springConfig);
  const springScale = useSpring(scaleProgress, springConfig);
  const springOpacity = useSpring(opacityProgress, springConfig);

  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 50;
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled);
    }
  }, [isScrolled]);

  const handleMouseMove = useCallback((e) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    });
  }, []);

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
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleScroll, handleMouseMove]);

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
    },
    float: {
      animate: {
        y: [0, -10, 0],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },
    pulse: {
      animate: {
        scale: [1, 1.05, 1],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
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
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="loader-text"
        >
          Loading amazing 3D printing experience...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="homepage raycast-theme">
      <PrismBackground />
      
      {/* Floating elements for visual appeal */}
      <div className="floating-elements">
        <motion.div
          className="float-cube float-1"
          variants={variants.float}
          animate="animate"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <motion.div
          className="float-cube float-2"
          variants={variants.float}
          animate="animate"
          transition={{ delay: 0.5 }}
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`
          }}
        />
        <motion.div
          className="float-cube float-3"
          variants={variants.float}
          animate="animate"
          transition={{ delay: 1 }}
          style={{
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`
          }}
        />
      </div>
      
      <motion.header 
        className={`raycast-header ${isScrolled ? 'scrolled' : ''}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="header-container">
          <motion.div 
            className="logo-group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div className="logo-icon">
              <div className="cube-3d rotating-cube">
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
                <motion.span 
                  className="beta-badge"
                  variants={variants.pulse}
                  animate="animate"
                >
                  BETA
                </motion.span>
              </div>
              <span className="logo-subtitle">3D Printing Service</span>
            </div>
          </motion.div>

          <nav className="nav-links">
            {[
              { label: 'Process', target: 'process' },
              { label: 'About', target: 'about' },
              { label: 'Materials', target: 'materials' },
              { label: 'FAQ', target: 'faq' },
              { label: 'Start', target: 'start' }
            ].map((item, index) => (
              <motion.button
                key={item.target}
                className="nav-link"
                onClick={() => smoothScrollTo(item.target)}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: 'rgba(0, 122, 255, 0.1)' 
                }}
                whileTap={{ scale: 0.95 }}
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

      {/* ===== ENHANCED HERO SECTION ===== */}
      <motion.section 
        className="hero-section"
        style={{ 
          y: springY,
          scale: springScale,
          opacity: springOpacity
        }}
      >
        <div className="hero-container">
          <motion.div 
            className="hero-content"
            variants={variants.container}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="status-badge" 
              variants={variants.item}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="status-dot"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>Quality Guaranteed</span>
            </motion.div>

            <motion.h1 className="hero-title" variants={variants.item}>
              Your 3D files, 
              <motion.span 
                className="highlight-text"
                initial={{ backgroundSize: '0% 100%' }}
                animate={{ backgroundSize: '100% 100%' }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                printed & delivered
              </motion.span>
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
                  whileHover={{ x: 5 }}
                >
                  <motion.div 
                    className="feature-icon"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                  <span>{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="hero-actions" variants={variants.item}>
              <motion.button
                className="primary-button large glow-button"
                onClick={() => navigate('/configure')}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 25px rgba(0, 122, 255, 0.4)'
                }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  boxShadow: [
                    '0 0 0px rgba(0, 122, 255, 0)',
                    '0 0 20px rgba(0, 122, 255, 0.3)',
                    '0 0 0px rgba(0, 122, 255, 0)'
                  ]
                }}
                transition={{
                  boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <motion.span>Upload File & Get Quote</motion.span>
                <motion.svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ 
              y: -8,
              transition: { duration: 0.3 }
            }}
          >
            <motion.div 
              className="info-card"
              animate={{ 
                y: [0, -5, 0],
                rotateY: [0, 1, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <div className="card-header">
                <motion.div 
                  className="card-badge"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.svg 
                    width="14" 
                    height="14" 
                    viewBox="0 0 14 14" 
                    fill="none"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <path d="M9 2L13 6L9 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 6H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </motion.svg>
                  <span>Quality First</span>
                </motion.div>
              </div>
              
              <div className="card-content">
                <h3>Professional 3D Printing Service</h3>
                <p>Modern startup focused on quality prints with competitive rates, reliable delivery, and comprehensive service guarantee.</p>
                
                <div className="stats-grid">
                  <motion.div 
                    className="stat"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div 
                      className="stat-value"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                    >
                      99.8%
                    </motion.div>
                    <div className="stat-label">Print Success</div>
                  </motion.div>
                  <motion.div 
                    className="stat"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div 
                      className="stat-value"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    >
                      24h
                    </motion.div>
                    <div className="stat-label">Avg Turnaround</div>
                  </motion.div>
                </div>
                
                <div className="features-list">
                  {['Quality guarantee', 'Modern equipment', 'Fair pricing'].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="feature-tag"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + (index * 0.1) }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ===== ENHANCED VISUAL BREAK 1: ANIMATED DIVIDER ===== */}
      <motion.div 
        className="section-divider"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="divider-content">
          <motion.div 
            className="divider-line"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          />
          <motion.div 
            className="divider-icon"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ 
              rotate: 180,
              scale: 1.1
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 22V12" stroke="currentColor" strokeWidth="2"/>
              <path d="M2 7L12 12L22 7" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </motion.div>
          <motion.div 
            className="divider-line"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.7 }}
          />
        </div>
      </motion.div>

      {/* ===== ENHANCED PROCESS SECTION ===== */}
      <RaycastSection id="process" className="process-section">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Simple 4-Step Process
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
              className="process-card enhanced-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.2,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ 
                y: -8, 
                rotateY: 5,
                transition: { duration: 0.3 } 
              }}
            >
              <motion.div 
                className="card-step"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {item.step}
              </motion.div>
              <motion.div 
                className="card-icon"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                {item.icon}
              </motion.div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <motion.div
                className="card-glow"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </RaycastSection>

      {/* ===== ENHANCED STATS BREAK ===== */}
      <motion.div 
        className="stats-break"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="stats-container">
          {[
            { value: '99.8%', label: 'Print Success Rate' },
            { value: '24h', label: 'Average Turnaround' },
            { value: '₱5/g', label: 'Material Cost' },
            { value: '3', label: 'Premium Materials' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="stat-item"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.6,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ 
                scale: 1.1,
                y: -5
              }}
            >
              <motion.div 
                className="stat-value"
                animate={{ 
                  textShadow: [
                    '0 0 5px rgba(255,255,255,0.8)',
                    '0 0 20px rgba(255,255,255,0.5)',
                    '0 0 5px rgba(255,255,255,0.8)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {stat.value}
              </motion.div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Continue with remaining sections... */}
      {/* I'll provide the rest in parts due to length */}

      {/* ===== ABOUT & SERVICES SECTION (Enhanced) ===== */}
      <RaycastSection id="about" className="about-services-section">
        <div className="about-services-container">
          <motion.div 
            className="about-content"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              About Prism Box 3D
            </motion.h2>
            <motion.div 
              className="about-story enhanced-card"
              whileHover={{ 
                scale: 1.02,
                rotateY: 2
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                We're a modern 3D printing startup based in San Jose del Monte, Bulacan. Our mission is simple: make professional 3D printing accessible to everyone - from students working on thesis projects to entrepreneurs creating prototypes.
              </motion.p>
              
              <div className="about-values">
                {[
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    ),
                    text: 'Quality First'
                  },
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 1L12.5 6.5L19 7L14.5 11L16 18L10 15L4 18L5.5 11L1 7L7.5 6.5L10 1Z" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    ),
                    text: 'Fair Pricing'
                  },
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ),
                    text: 'Fast Service'
                  }
                ].map((value, index) => (
                  <motion.div
                    key={index}
                    className="value-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                    whileHover={{ x: 5, scale: 1.05 }}
                  >
                    <motion.div 
                      className="value-icon"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {value.icon}
                    </motion.div>
                    <span>{value.text}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className="beta-callout"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div 
                  className="beta-icon"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L13.09 8.26L22 9L17 14L18.18 22L12 18.77L5.82 22L7 14L2 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </motion.div>
                <div className="beta-content">
                  <h4>Join Our BETA Launch!</h4>
                  <p>Early customers get special pricing and direct input on our service improvements.</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="services-content"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2>What We Print</h2>
            <div className="services-grid">
              {[
                {
                  title: 'Student Projects',
                  description: 'Educational models, thesis projects, assignments. Special student pricing available.',
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M22 10V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v4" stroke="currentColor" strokeWidth="2"/>
                      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-2" stroke="currentColor" strokeWidth="2"/>
                      <rect x="6" y="10" width="12" height="4" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  )
                },
                {
                  title: 'Personal Items',
                  description: 'Home organizers, replacement parts, hobby projects, custom designs.',
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M3 9L12 2L21 9V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                },
                {
                  title: 'Business Prototypes',
                  description: 'Product samples, marketing materials, professional prototypes.',
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                      <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2"/>
                      <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  )
                },
                {
                  title: 'Creative Projects',
                  description: 'Art pieces, miniatures, decorative items, unique designs.',
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                  )
                },
                {
                  title: 'Gaming & Hobbies',
                  description: 'Gaming accessories, board game pieces, model parts, drone components.',
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="3" width="20" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="8" cy="9" r="1" stroke="currentColor" strokeWidth="2"/>
                      <path d="M16 8L18 10L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="12" y1="17" x2="12" y2="22" stroke="currentColor" strokeWidth="2"/>
                      <line x1="8" y1="22" x2="16" y2="22" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  )
                },
                {
                  title: 'Replacement Parts',
                  description: 'Appliance parts, tool components, toy parts, household items.',
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  )
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  className="service-card enhanced-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ 
                    y: -5, 
                    scale: 1.03,
                    rotateX: 5
                  }}
                >
                  <motion.div 
                    className="service-icon"
                    whileHover={{ 
                      rotate: [0, -10, 10, 0],
                      scale: 1.1
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {service.icon}
                  </motion.div>
                  <h4>{service.title}</h4>
                  <p>{service.description}</p>
                  <motion.div
                    className="card-glow"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="newsletter-signup enhanced-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <h4>Stay Updated</h4>
              <p>Be the first to know about new materials and special BETA offers.</p>
              <form className="signup-form" onSubmit={handleNewsletterSubmit}>
                <motion.input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="email-input"
                  required
                  whileFocus={{ scale: 1.02 }}
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
            </motion.div>
          </motion.div>
        </div>
      </RaycastSection>

      {/* Continue with remaining sections in next part... */}

      {/* ===== MATERIALS & PRICING SECTION ===== */}
      <RaycastSection id="materials" className="materials-pricing-section">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Materials & Pricing
        </motion.h2>
        
        <div className="materials-pricing-container">
          <motion.div 
            className="materials-content"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3>Premium Materials</h3>
            <div className="materials-grid">
              {[
                {
                  name: 'PLA',
                  description: 'Easy to print, biodegradable, perfect for beginners and decorative items.',
                  properties: ['Eco-friendly', 'Low odor', 'Good surface finish'],
                  colors: ['White', 'Black', 'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple']
                },
                {
                  name: 'PETG',
                  description: 'Strong, chemical resistant, crystal clear. Great for functional parts.',
                  properties: ['Chemical resistant', 'Impact resistant', 'Crystal clear'],
                  colors: ['Clear', 'White', 'Black', 'Red', 'Blue', 'Green']
                },
                {
                  name: 'ABS',
                  description: 'Durable, heat resistant, perfect for mechanical parts.',
                  properties: ['Heat resistant', 'Strong & durable', 'Post-processable'],
                  colors: ['White', 'Black', 'Red', 'Blue', 'Gray']
                }
              ].map((material, index) => (
                <motion.div
                  key={index}
                  className="material-card enhanced-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ 
                    scale: 1.03,
                    rotateY: 5
                  }}
                >
                  <motion.h4
                    animate={{ 
                      color: ['#1C1C1E', '#007AFF', '#1C1C1E'] 
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {material.name}
                  </motion.h4>
                  <p>{material.description}</p>
                  <div className="properties">
                    {material.properties.map((prop, idx) => (
                      <motion.span 
                        key={idx} 
                        className="property-tag"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: (index * 0.2) + (idx * 0.1) }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {prop}
                      </motion.span>
                    ))}
                  </div>
                  <div className="colors">
                    <span>Colors:</span> {material.colors.join(', ')}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="file-requirements enhanced-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <h4>File Requirements</h4>
              <div className="requirements-grid">
                {[
                  { label: 'Formats:', value: 'STL, OBJ, 3MF, PLY' },
                  { label: 'Max Size:', value: '100MB per file' },
                  { label: 'Units:', value: 'Millimeters (mm)' },
                  { label: 'Model:', value: 'Watertight & manifold' }
                ].map((req, index) => (
                  <motion.div 
                    key={index}
                    className="req-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + (index * 0.1) }}
                    whileHover={{ x: 5 }}
                  >
                    <span className="req-label">{req.label}</span>
                    <span>{req.value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="pricing-content enhanced-card"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3>Transparent Pricing</h3>
            <motion.div 
              className="pricing-formula"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              {[
                { label: 'Material', value: '₱5.00/gram' },
                { label: 'Setup & Labor', value: '₱150.00' },
                { label: 'Service Fee', value: '₱50.00' }
              ].map((part, index) => (
                <React.Fragment key={index}>
                  <motion.div 
                    className="formula-part"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <span className="label">{part.label}</span>
                    <motion.span 
                      className="value"
                      animate={{ 
                        textShadow: [
                          '0 0 5px rgba(0,122,255,0.5)',
                          '0 0 15px rgba(0,122,255,0.3)',
                          '0 0 5px rgba(0,122,255,0.5)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {part.value}
                    </motion.span>
                  </motion.div>
                  {index < 2 && <span className="plus">+</span>}
                </React.Fragment>
              ))}
              <span className="equals">=</span>
              <motion.div 
                className="formula-result"
                whileHover={{ scale: 1.1 }}
                animate={{ 
                  boxShadow: [
                    '0 0 10px rgba(0,122,255,0.3)',
                    '0 0 20px rgba(0,122,255,0.2)',
                    '0 0 10px rgba(0,122,255,0.3)'
                  ]
                }}
                transition={{ 
                  boxShadow: { duration: 2, repeat: Infinity }
                }}
              >
                <span className="label">Total Price</span>
                <span className="example">50g print = ₱450</span>
              </motion.div>
            </motion.div>

            <div className="pricing-includes">
              <h4>What's Included</h4>
              <div className="includes-list">
                {[
                  'Premium filament materials',
                  'File processing & printer setup',
                  'Quality checks & testing',
                  'Professional packaging',
                  'Manufacturing defect guarantee'
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="include-item"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + (index * 0.1) }}
                    whileHover={{ x: 5, scale: 1.02 }}
                  >
                    <motion.svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 16 16" 
                      fill="none"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </motion.svg>
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div 
              className="delivery-info"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
            >
              <h4>Delivery</h4>
              <p><strong>₱200-400 via Lalamove</strong> (paid directly to rider)</p>
              <p>Secure packaging with damage protection guarantee.</p>
            </motion.div>
          </motion.div>
        </div>
      </RaycastSection>

      {/* Continue in next message due to length... */}
      
      {/* ===== FAQ SECTION ===== */}
      <RaycastSection id="faq" className="faq-section">
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
              question: 'What file formats do you accept?',
              answer: 'We accept STL, OBJ, 3MF, and PLY files. STL is the most common format. Make sure files are under 100MB and models are watertight.'
            },
            {
              question: 'How do you calculate pricing?',
              answer: 'Simple formula: ₱5/gram material + ₱150 setup/labor + ₱50 service fee. Upload your file for instant weight calculation and exact pricing.'
            },
            {
              question: 'What is your turnaround time?',
              answer: 'Small items (under 50g): 1-2 days. Medium (50-200g): 2-3 days. Large (200g+): 3-5 days. We provide exact timing after file analysis.'
            },
            {
              question: 'Do you offer student discounts?',
              answer: 'Yes! Students get special pricing for educational projects. Contact us with your student ID and project details for a custom quote.'
            },
            {
              question: 'What if something goes wrong?',
              answer: 'We offer comprehensive guarantee. Print failures due to our equipment get free reprint or 60% refund. Delivery damage with video proof gets same coverage.'
            },
            {
              question: 'Can you print multiple colors?',
              answer: 'Each print is single-color, but we offer wide color selection. For multi-color designs, split your model into separate files for each color.'
            }
          ].map((faq, index) => (
            <motion.div
              key={index}
              className={`faq-item enhanced-card ${openFAQ === index ? 'open' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              <motion.button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                whileHover={{ backgroundColor: 'rgba(0, 122, 255, 0.03)' }}
              >
                <span>{faq.question}</span>
                <motion.svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 20 20" 
                  fill="none" 
                  className="faq-icon"
                  animate={{ rotate: openFAQ === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
              </motion.button>
              <motion.div 
                className="faq-answer"
                initial={false}
                animate={{
                  height: openFAQ === index ? 'auto' : 0,
                  opacity: openFAQ === index ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div style={{ padding: openFAQ === index ? '0 24px 20px' : '0 24px 0' }}>
                  <p>{faq.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </RaycastSection>

      {/* ===== ENHANCED CTA SECTION ===== */}
      <RaycastSection id="start" className="start-section">
        <div className="start-container">
          <motion.div 
            className="start-content"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Ready to Start Printing?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Upload your 3D file, get instant pricing, and place your order. Professional quality with service guarantee.
            </motion.p>
            
            <div className="start-features">
              {[
                { 
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 1L12.5 6.5L19 7L14.5 11L16 18L10 15L4 18L5.5 11L1 7L7.5 6.5L10 1Z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  ), 
                  text: 'Instant file analysis' 
                },
                { 
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="1" y="3" width="18" height="12" rx="2" ry="2" stroke="currentColor" strokeWidth="1.5"/>
                      <line x1="1" y1="7" x2="19" y2="7" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  ), 
                  text: 'Transparent pricing' 
                },
                { 
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 1L18 5V10C18 14 14 16 10 17C6 16 2 14 2 10V5L10 1Z" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ), 
                  text: 'Quality guarantee' 
                },
                { 
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="1" y="3" width="13" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M14 5L17 7V11L14 13" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      <circle cx="4" cy="14.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="14" cy="14.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  ), 
                  text: 'Secure delivery' 
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="start-feature"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + (index * 0.1) }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <motion.div 
                    className="feature-icon-wrapper"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <span>{feature.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              className="primary-button xl glow-button"
              onClick={() => navigate('/configure')}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 30px rgba(255,255,255,0.5)'
              }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                boxShadow: [
                  '0 0 0px rgba(255,255,255,0)',
                  '0 0 25px rgba(255,255,255,0.3)',
                  '0 0 0px rgba(255,255,255,0)'
                ]
              }}
              transition={{
                boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <span>Upload Your 3D File</span>
              <motion.svg 
                width="20" 
                height="20" 
                viewBox="0 0 20 20" 
                fill="none"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <path d="M10 1V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 9L10 14L15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 17H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </motion.svg>
            </motion.button>

            <div className="contact-info">
              {[
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M14 6.66667C14 11.3333 8 15.3333 8 15.3333C8 15.3333 2 11.3333 2 6.66667C2 5.07536 2.63214 3.54925 3.75736 2.42403C4.88258 1.29881 6.40869 0.666672 8 0.666672C9.59131 0.666672 11.1174 1.29881 12.2426 2.42403C13.3679 3.54925 14 5.07536 14 6.66667Z" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M8 8.66667C9.10457 8.66667 10 7.77124 10 6.66667C10 5.5621 9.10457 4.66667 8 4.66667C6.89543 4.66667 6 5.5621 6 6.66667C6 7.77124 6.89543 8.66667 8 8.66667Z" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  ),
                  text: 'San Jose del Monte, Bulacan'
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                      <line x1="1" y1="7" x2="15" y2="7" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  ),
                  text: 'GCash & Bank Transfer'
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="contact-item"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 + (index * 0.1) }}
                  whileHover={{ x: 5 }}
                >
                  {item.icon}
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="start-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className="guarantee-badge"
              animate={{ 
                y: [0, -10, 0],
                rotateY: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <motion.div 
                className="badge-icon"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 2L28 8V16C28 22 22 26 16 28C10 26 4 22 4 16V8L16 2Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 16L16 20L24 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
              <div className="badge-content">
                <h4>Service Guarantee</h4>
                <p>Quality prints or your money back</p>
                <div className="guarantee-stats">
                  {[
                    { number: '99.8%', text: 'Success Rate' },
                    { number: '24h', text: 'Avg Delivery' }
                  ].map((stat, index) => (
                    <motion.div 
                      key={index}
                      className="guarantee-stat"
                      whileHover={{ scale: 1.1 }}
                    >
                      <motion.span 
                        className="stat-number"
                        animate={{ 
                          textShadow: [
                            '0 0 5px rgba(255,255,255,0.8)',
                            '0 0 15px rgba(255,255,255,0.5)',
                            '0 0 5px rgba(255,255,255,0.8)'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {stat.number}
                      </motion.span>
                      <span className="stat-text">{stat.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </RaycastSection>

      {/* ===== ENHANCED FOOTER ===== */}
      <motion.footer 
        className="site-footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="footer-container">
          <div className="footer-content">
            <motion.div 
              className="footer-brand"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="footer-logo">
                <div className="logo-icon">
                  <div className="cube-3d rotating-cube">
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
              <p>Professional 3D printing service in San Jose del Monte, Bulacan. Quality prints with transparent pricing and service guarantee.</p>
            </motion.div>

            <div className="footer-links">
              <motion.div 
                className="footer-section"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h4>Service</h4>
                <ul>
                  {[
                    { label: 'How It Works', target: 'process' },
                    { label: 'Materials & Pricing', target: 'materials' },
                    { label: 'FAQ', target: 'faq' },
                    { label: 'About Us', target: 'about' }
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      whileHover={{ x: 5 }}
                    >
                      <button onClick={() => smoothScrollTo(item.target)}>
                        {item.label}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div 
                className="footer-section"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h4>Contact</h4>
                <ul>
                  {[
                    'San Jose del Monte, Bulacan',
                    'GCash & Bank Transfer',
                    'Quality Guaranteed',
                    'BETA Service'
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + (index * 0.1) }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          <motion.div 
            className="footer-bottom"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="footer-bottom-content">
              <p>&copy; 2025 Prism Box 3D. All rights reserved.</p>
              <div className="footer-status">
                <motion.span 
                  className="status-badge"
                  animate={{ 
                    boxShadow: [
                      '0 0 5px rgba(255, 149, 0, 0.3)',
                      '0 0 15px rgba(255, 149, 0, 0.5)',
                      '0 0 5px rgba(255, 149, 0, 0.3)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div 
                    className="status-dot"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  BETA Launch
                </motion.span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.footer>
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
