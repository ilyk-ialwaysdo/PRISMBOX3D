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
          staggerChildren: 0.1,
          delayChildren: 0.2
        }
      }
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    }
  }), []);

  // SIMPLIFIED LOGO COMPONENT - Subtle animation
  const PrismLogo = ({ size = 24 }) => (
    <motion.div
      className="prism-logo"
      style={{ width: size, height: size }}
      animate={{ 
        rotateY: [0, 360]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className="prism-svg"
      >
        <path
          d="M4 8L12 4L20 8V16L12 20L4 16V8Z"
          stroke="url(#prismGradient)"
          strokeWidth="2"
          fill="rgba(0, 122, 255, 0.1)"
        />
        <path
          d="M12 4V20M4 8L20 16M4 16L20 8"
          stroke="url(#prismGradient)"
          strokeWidth="1"
          opacity="0.6"
        />
        <defs>
          <linearGradient id="prismGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#007AFF" />
            <stop offset="100%" stopColor="#34C759" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
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
      
      <motion.header 
        className={`raycast-header ${isScrolled ? 'scrolled' : ''}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-container">
          <div className="logo-group">
            <PrismLogo size={24} />
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
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 + (index * 0.05) }}
              >
                {item.label}
              </motion.button>
            ))}
          </nav>
        </div>
      </motion.header>

      {/* ===== HERO SECTION ===== */}
      <motion.section 
        className="hero-section"
        style={{ y: yHero }}
      >
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
              Your 3D files, 
              <span className="highlight-text">printed & delivered</span>
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
                <div key={index} className="feature-item">
                  <div className="feature-icon">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </motion.div>

            <motion.div className="hero-actions" variants={variants.item}>
              <motion.button
                className="primary-button large"
                onClick={() => navigate('/configure')}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Upload File & Get Quote</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, x: 40 }}
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

      {/* ===== VISUAL BREAK 1 ===== */}
      <div className="section-divider">
        <div className="divider-content">
          <div className="divider-line"></div>
          <div className="divider-icon">
            <PrismLogo size={24} />
          </div>
          <div className="divider-line"></div>
        </div>
      </div>

      {/* ===== PROCESS SECTION ===== */}
      <RaycastSection id="process" className="process-section">
        <h2 className="section-title">Simple 4-Step Process</h2>
        
        <div className="process-grid">
          {[
            {
              step: '01',
              title: 'Upload Your File',
              description: 'Upload STL, OBJ, or 3MF files. Automatic weight calculation and material analysis.',
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )
            },
            {
              step: '02',
              title: 'Choose Material & Color',
              description: 'Select from PLA, PETG, ABS filaments in various colors. Real-time price updates.',
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="1" fill="currentColor"/>
                  <path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" stroke="currentColor" strokeWidth="2"/>
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
              whileHover={{ y: -4 }}
            >
              <div className="card-step">{item.step}</div>
              <div className="card-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </RaycastSection>

      {/* ===== STATS BREAK ===== */}
      <div className="stats-break">
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -3 }}
            >
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ===== ABOUT & SERVICES SECTION ===== */}
      <RaycastSection id="about" className="about-services-section">
        <div className="about-services-container">
          <motion.div 
            className="about-content"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2>About Prism Box 3D</h2>
            <div className="about-story">
              <p>We're a modern 3D printing startup based in San Jose del Monte, Bulacan. Our mission is simple: make professional 3D printing accessible to everyone - from students working on thesis projects to entrepreneurs creating prototypes.</p>
              
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
                  <div key={index} className="value-item">
                    <div className="value-icon">{value.icon}</div>
                    <span>{value.text}</span>
                  </div>
                ))}
              </div>

              <div className="beta-callout">
                <div className="beta-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L13.09 8.26L22 9L17 14L18.18 22L12 18.77L5.82 22L7 14L2 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="beta-content">
                  <h4>Join Our BETA Launch!</h4>
                  <p>Early customers get special pricing and direct input on our service improvements.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="services-content"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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
                      <path d="M3 9L12 2L21 9V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" stroke="currentColor" strokeWidth="2"/>
                      <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2"/>
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
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="2"/>
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
                  whileHover={{ y: -3 }}
                >
                  <div className="service-icon">{service.icon}</div>
                  <h4>{service.title}</h4>
                  <p>{service.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="newsletter-signup"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h4>Stay Updated</h4>
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
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Join BETA
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </RaycastSection>

      {/* ===== MATERIALS & PRICING SECTION ===== */}
      <RaycastSection id="materials" className="materials-pricing-section">
        <h2 className="section-title">Materials & Pricing</h2>
        
        <div className="materials-pricing-container">
          <div className="materials-content">
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
                  className="material-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -3 }}
                >
                  <h4>{material.name}</h4>
                  <p>{material.description}</p>
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

            <div className="file-requirements">
              <h4>File Requirements</h4>
              <div className="requirements-grid">
                {[
                  { label: 'Formats:', value: 'STL, OBJ, 3MF, PLY' },
                  { label: 'Max Size:', value: '100MB per file' },
                  { label: 'Units:', value: 'Millimeters (mm)' },
                  { label: 'Model:', value: 'Watertight & manifold' }
                ].map((req, index) => (
                  <div key={index} className="req-item">
                    <span className="req-label">{req.label}</span>
                    <span>{req.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pricing-content">
            <h3>Transparent Pricing</h3>
            <div className="pricing-formula">
              {[
                { label: 'Material', value: '₱5.00/gram' },
                { label: 'Setup & Labor', value: '₱150.00' },
                { label: 'Service Fee', value: '₱50.00' }
              ].map((part, index) => (
                <React.Fragment key={index}>
                  <div className="formula-part">
                    <span className="label">{part.label}</span>
                    <span className="value">{part.value}</span>
                  </div>
                  {index < 2 && <span className="plus">+</span>}
                </React.Fragment>
              ))}
              <span className="equals">=</span>
              <div className="formula-result">
                <span className="label">Total Price</span>
                <span className="example">50g print = ₱450</span>
              </div>
            </div>

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
              <h4>Delivery</h4>
              <p><strong>₱200-400 via Lalamove</strong> (paid directly to rider)</p>
              <p>Secure packaging with damage protection guarantee.</p>
            </div>
          </div>
        </div>
      </RaycastSection>

      {/* ===== FAQ SECTION ===== */}
      <RaycastSection id="faq" className="faq-section">
        <h2 className="section-title">Frequently Asked Questions</h2>
        
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
                <motion.svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 20 20" 
                  fill="none" 
                  className="faq-icon"
                  animate={{ rotate: openFAQ === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </RaycastSection>

      {/* ===== CTA SECTION ===== */}
      <RaycastSection id="start" className="start-section">
        <div className="start-container">
          <motion.div 
            className="start-content"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Start Printing?</h2>
            <p>Upload your 3D file, get instant pricing, and place your order. Professional quality with service guarantee.</p>
            
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
                <div key={index} className="start-feature">
                  <div className="feature-icon-wrapper">{feature.icon}</div>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            <motion.button
              className="primary-button xl"
              onClick={() => navigate('/configure')}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Upload Your 3D File</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 1V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 9L10 14L15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 17H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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
                <div key={index} className="contact-item">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="start-visual"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="guarantee-badge">
              <div className="badge-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 2L28 8V16C28 22 22 26 16 28C10 26 4 22 4 16V8L16 2Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 16L16 20L24 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="badge-content">
                <h4>Service Guarantee</h4>
                <p>Quality prints or your money back</p>
                <div className="guarantee-stats">
                  <div className="guarantee-stat">
                    <span className="stat-number">99.8%</span>
                    <span className="stat-text">Success Rate</span>
                  </div>
                  <div className="guarantee-stat">
                    <span className="stat-number">24h</span>
                    <span className="stat-text">Avg Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </RaycastSection>

      {/* ===== FOOTER ===== */}
      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <PrismLogo size={32} />
                <span>Prism Box 3D</span>
              </div>
              <p>Professional 3D printing service in San Jose del Monte, Bulacan. Quality prints with transparent pricing and service guarantee.</p>
            </div>

            <div className="footer-links">
              <div className="footer-section">
                <h4>Service</h4>
                <ul>
                  {[
                    { label: 'How It Works', target: 'process' },
                    { label: 'Materials & Pricing', target: 'materials' },
                    { label: 'FAQ', target: 'faq' },
                    { label: 'About Us', target: 'about' }
                  ].map((item, index) => (
                    <li key={index}>
                      <button onClick={() => smoothScrollTo(item.target)}>
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer-section">
                <h4>Contact</h4>
                <ul>
                  <li>San Jose del Monte, Bulacan</li>
                  <li>GCash & Bank Transfer</li>
                  <li>Quality Guaranteed</li>
                  <li>BETA Service</li>
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
                  BETA Launch
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
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6 }}
  >
    {children}
  </motion.section>
);

export default Homepage;
