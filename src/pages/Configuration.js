import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PrismBackground from '../components/PrismBackground';
import './Configuration.css';

const Configuration = () => {
  const navigate = useNavigate();
  
  // Business constants
  const BUSINESS_CONFIG = {
    fees: { labor: 150, cleaning: 120, gluing: 100, rush: 200, serviceFee: 50 },
    electricity: { rate: 12.16, printerWatt: 160, markup: 2 },
    discounts: { student: 0.05 },
    validation: { minGrams: 1, maxGrams: 5000, minTime: 0.1, maxTime: 48 }
  };

  // Enhanced filament database
  const FILAMENTS = {
    'PLA Basic': {
      colors: ['White', 'Black', 'Blue', 'Green', 'Yellow', 'Red', 'Grey', 'Orange'],
      price: 5,
      density: 1.24,
      description: 'Perfect for beginners - easy to print, biodegradable',
      features: ['Eco-friendly', 'Low odor', 'Good surface finish']
    },
    'PLA Silk+': {
      colors: ['Sky Blue', 'Pink', 'Champagne Gold', 'Silver'],
      price: 8,
      density: 1.24,
      description: 'Premium silk finish with metallic shimmer',
      features: ['Metallic finish', 'Premium quality', 'Eye-catching']
    },
    'PLA Matte': {
      colors: ['Black', 'White', 'Pine Green', 'Space Navy'],
      price: 6,
      density: 1.24,
      description: 'Non-reflective matte finish for professional looks',
      features: ['Matte finish', 'Professional', 'No fingerprints']
    },
    'PETG': {
      colors: ['Clear', 'Black', 'White', 'Green', 'Blue'],
      price: 7,
      density: 1.27,
      description: 'Chemical resistant and crystal clear',
      features: ['Chemical resistant', 'Impact resistant', 'Crystal clear']
    },
    'ABS': {
      colors: ['Black', 'White', 'Grey', 'Red'],
      price: 7,
      density: 1.04,
      description: 'Durable and heat resistant for functional parts',
      features: ['Heat resistant', 'Strong & durable', 'Post-processable']
    }
  };

  const [config, setConfig] = useState({
    file: null,
    material: '',
    color: '',
    grams: '',
    printTime: '',
    services: { cleaning: false, gluing: false, rush: false },
    studentDiscount: false
  });

  const [errors, setErrors] = useState({});
  const [priceBreakdown, setPriceBreakdown] = useState(null);
  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showHelpTooltip, setShowHelpTooltip] = useState(null);

  // Same Prism Logo Component as Homepage
  const PrismLogo = ({ size = 24 }) => (
    <motion.div
      className="prism-logo"
      style={{ width: size, height: size }}
      animate={{ rotateY: [0, 360] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="prism-svg">
        <path d="M4 8L12 4L20 8V16L12 20L4 16V8Z" stroke="url(#prismGradient)" strokeWidth="2" fill="rgba(0, 122, 255, 0.1)"/>
        <path d="M12 4V20M4 8L20 16M4 16L20 8" stroke="url(#prismGradient)" strokeWidth="1" opacity="0.6"/>
        <defs>
          <linearGradient id="prismGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#007AFF" />
            <stop offset="100%" stopColor="#34C759" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );

  const calculatePrice = useCallback(async () => {
    const filament = FILAMENTS[config.material];
    if (!filament || !config.grams || !config.printTime) return;
    
    setIsCalculating(true);
    
    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const grams = parseFloat(config.grams) || 0;
    const printTime = parseFloat(config.printTime) || 0;
    
    const filamentCost = grams * filament.price;
    const electricityKWh = printTime * (BUSINESS_CONFIG.electricity.printerWatt / 1000);
    const electricityCost = electricityKWh * BUSINESS_CONFIG.electricity.rate;
    const electricityCharge = electricityCost * BUSINESS_CONFIG.electricity.markup;
    
    let subtotal = filamentCost + BUSINESS_CONFIG.fees.labor + BUSINESS_CONFIG.fees.serviceFee + electricityCharge;
    
    Object.entries(config.services).forEach(([service, enabled]) => {
      if (enabled && BUSINESS_CONFIG.fees[service]) {
        subtotal += BUSINESS_CONFIG.fees[service];
      }
    });
    
    const discountAmount = config.studentDiscount ? subtotal * BUSINESS_CONFIG.discounts.student : 0;
    const total = subtotal - discountAmount;
    
    setPriceBreakdown({
      filamentCost,
      electricityCharge,
      laborFee: BUSINESS_CONFIG.fees.labor,
      serviceFee: BUSINESS_CONFIG.fees.serviceFee,
      serviceFees: Object.entries(config.services).reduce((acc, [service, enabled]) => {
        if (enabled && BUSINESS_CONFIG.fees[service]) acc[service] = BUSINESS_CONFIG.fees[service];
        return acc;
      }, {}),
      subtotal,
      discountAmount,
      total,
      materialInfo: filament,
      estimatedWeight: grams,
      estimatedTime: printTime
    });
    
    setIsCalculating(false);
  }, [config, FILAMENTS, BUSINESS_CONFIG]);

  useEffect(() => {
    if (config.material && config.grams && config.printTime) {
      calculatePrice();
    } else {
      setPriceBreakdown(null);
    }
  }, [config, calculatePrice]);

  const validateStep = (stepNum) => {
    const newErrors = {};
    
    if (stepNum === 1) {
      if (!config.file) newErrors.file = 'Please select a 3D file to continue';
      if (!config.material) newErrors.material = 'Please select a material type';
      if (!config.color) newErrors.color = 'Please choose a color for your print';
    }
    
    if (stepNum === 2) {
      const grams = parseFloat(config.grams);
      const time = parseFloat(config.printTime);
      
      if (!config.grams || grams < BUSINESS_CONFIG.validation.minGrams || grams > BUSINESS_CONFIG.validation.maxGrams) {
        newErrors.grams = `Weight must be between ${BUSINESS_CONFIG.validation.minGrams}-${BUSINESS_CONFIG.validation.maxGrams}g`;
      }
      
      if (!config.printTime || time < BUSINESS_CONFIG.validation.minTime || time > BUSINESS_CONFIG.validation.maxTime) {
        newErrors.printTime = `Print time must be between ${BUSINESS_CONFIG.validation.minTime}-${BUSINESS_CONFIG.validation.maxTime} hours`;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setCompletedSteps(prev => [...prev.filter(s => s !== step), step]);
      setStep(step + 1);
      setErrors({});
    }
  };

  const goToStep = (targetStep) => {
    if (targetStep < step || completedSteps.includes(targetStep)) {
      setStep(targetStep);
      setErrors({});
    } else if (targetStep === step + 1) {
      nextStep();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrors({});
    }
  };

  const getColorStyle = (color) => {
    const colorMap = {
      'White': '#ffffff', 'Black': '#1a1a1a', 'Grey': '#6b7280',
      'Blue': '#3b82f6', 'Green': '#10b981', 'Yellow': '#f59e0b',
      'Red': '#ef4444', 'Orange': '#f97316', 'Clear': 'rgba(255,255,255,0.3)',
      'Sky Blue': '#0ea5e9', 'Pink': '#ec4899', 'Champagne Gold': '#d4af37',
      'Silver': '#94a3b8', 'Pine Green': '#047857', 'Space Navy': '#1e40af'
    };
    return colorMap[color] || '#9ca3af';
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 100 * 1024 * 1024) { // 100MB limit
      setConfig(prev => ({ ...prev, file }));
      setErrors(prev => ({ ...prev, file: null }));
    } else if (file) {
      setErrors(prev => ({ ...prev, file: 'File size must be under 100MB' }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.size <= 100 * 1024 * 1024) {
        setConfig(prev => ({ ...prev, file }));
        setErrors(prev => ({ ...prev, file: null }));
      } else {
        setErrors(prev => ({ ...prev, file: 'File size must be under 100MB' }));
      }
    }
  };

  const proceedToCheckout = () => {
    if (!priceBreakdown) return;
    navigate('/payment', { 
      state: { 
        orderData: { 
          config, 
          priceBreakdown,
          timestamp: new Date().toISOString()
        } 
      } 
    });
  };

  const canNavigateToStep = (targetStep) => {
    if (targetStep === 1) return true;
    if (targetStep <= step) return true;
    return completedSteps.includes(targetStep - 1);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="configuration-page">
      <PrismBackground />
      
      {/* Enhanced Header */}
      <motion.header 
        className="config-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="config-header-container">
          <motion.button
            className="back-button"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.02, x: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Back to Home</span>
          </motion.button>

          <div className="logo-group">
            <PrismLogo size={24} />
            <div className="header-title">
              <span className="main-title">Configure Your Print</span>
              <span className="sub-title">Step {step} of 3</span>
            </div>
          </div>

          <div className="step-indicator">
            <div className="indicator-progress" style={{ width: `${(step/3) * 100}%` }}></div>
            <span>Step {step} of 3</span>
          </div>
        </div>
      </motion.header>

      <div className="config-container">
        {/* Enhanced Progress Bar */}
        <motion.div 
          className="progress-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="progress-steps">
            {[
              { num: 1, label: 'Upload & Material', desc: 'Choose file and material' },
              { num: 2, label: 'Settings & Services', desc: 'Configure print settings' },
              { num: 3, label: 'Review & Order', desc: 'Confirm and checkout' }
            ].map(({ num, label, desc }) => (
              <motion.div
                key={num}
                className={`progress-step ${step >= num ? 'active' : ''} ${step === num ? 'current' : ''} ${canNavigateToStep(num) ? 'clickable' : ''}`}
                onClick={() => canNavigateToStep(num) && goToStep(num)}
                whileHover={canNavigateToStep(num) ? { y: -2 } : {}}
              >
                <div className="step-circle">
                  <div className="step-number">
                    {completedSteps.includes(num) && num < step ? (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      num
                    )}
                  </div>
                </div>
                <div className="step-info">
                  <div className="step-label">{label}</div>
                  <div className="step-desc">{desc}</div>
                </div>
                {num < 3 && <div className="progress-connector"></div>}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Price Preview Sidebar (shows when data available) */}
        <AnimatePresence>
          {priceBreakdown && (
            <motion.div
              className="price-sidebar"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="sidebar-header">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 1V19" stroke="currentColor" strokeWidth="2"/>
                  <path d="M15 5H7.5a2.5 2.5 0 0 0 0 5h5a2.5 2.5 0 0 1 0 5H5" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>Live Pricing</span>
                {isCalculating && <div className="loading-spinner"></div>}
              </div>
              
              <div className="price-preview">
                <div className="price-main">₱{priceBreakdown.total.toFixed(2)}</div>
                <div className="price-details">
                  <div>Material: ₱{priceBreakdown.filamentCost.toFixed(2)}</div>
                  <div>Labor: ₱{priceBreakdown.laborFee.toFixed(2)}</div>
                  <div>Service: ₱{priceBreakdown.serviceFee.toFixed(2)}</div>
                </div>
              </div>

              <div className="time-estimate">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 4V8L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span>Est. {config.printTime || '0'}h print time</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step Content */}
        <div className="steps-container">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                className="config-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="step-header">
                  <h1>Upload Your 3D File</h1>
                  <p>Upload your STL, OBJ, or 3MF file and choose your preferred material and color</p>
                </div>

                <div className="step-content">
                  {/* Enhanced File Upload */}
                  <div className="section-card file-upload-card">
                    <div className="card-header">
                      <div className="header-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2"/>
                          <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </div>
                      <div>
                        <h2>3D File Upload</h2>
                        <p>Drag and drop or click to select your file</p>
                      </div>
                    </div>
                    
                    <div 
                      className={`file-drop-zone ${isDragOver ? 'drag-over' : ''} ${config.file ? 'has-file' : ''}`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        accept=".stl,.obj,.3mf,.gcode,.ply"
                        onChange={handleFileUpload}
                        id="file-upload"
                        className="file-input"
                      />
                      <label htmlFor="file-upload" className="file-label">
                        {config.file ? (
                          <motion.div 
                            className="file-selected"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="file-preview">
                              <div className="file-icon">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                  <path d="M24 6H12C10.9 6 10 6.9 10 8V32C10 33.1 10.9 34 12 34H28C29.1 34 30 33.1 30 32V14L24 6Z" fill="currentColor"/>
                                  <path d="M24 6V14H30" stroke="white" strokeWidth="2"/>
                                </svg>
                              </div>
                              <div className="file-details">
                                <div className="file-name">{config.file.name}</div>
                                <div className="file-meta">
                                  <span className="file-size">{formatFileSize(config.file.size)}</span>
                                  <div className="file-type">{config.file.name.split('.').pop().toUpperCase()}</div>
                                </div>
                              </div>
                            </div>
                            <motion.button
                              className="remove-file"
                              onClick={(e) => {
                                e.preventDefault();
                                setConfig(prev => ({ ...prev, file: null }));
                              }}
                              whileHover={{ scale: 1.1, rotate: 90 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                              </svg>
                            </motion.button>
                          </motion.div>
                        ) : (
                          <div className="file-placeholder">
                            <motion.div 
                              className="upload-icon"
                              animate={{ y: [0, -4, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                                <rect x="8" y="16" width="48" height="40" rx="4" stroke="currentColor" strokeWidth="3" strokeDasharray="8 8"/>
                                <path d="M32 12V36" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M24 20L32 12L40 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </motion.div>
                            <div className="upload-text">
                              <strong>Drop your 3D file here</strong>
                              <span>or click to browse files</span>
                              <div className="supported-formats">
                                <small>Supports: STL, OBJ, 3MF, GCODE, PLY (max 100MB)</small>
                              </div>
                            </div>
                          </div>
                        )}
                      </label>
                    </div>
                    {errors.file && (
                      <motion.div 
                        className="error-message"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.file}
                      </motion.div>
                    )}
                  </div>

                  {/* Enhanced Material Selection */}
                  <div className="section-card">
                    <div className="card-header">
                      <div className="header-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="12" cy="12" r="1" fill="currentColor"/>
                          <path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </div>
                      <div>
                        <h2>Choose Material</h2>
                        <p>Select the best material for your project</p>
                      </div>
                    </div>
                    
                    <div className="material-grid">
                      {Object.entries(FILAMENTS).map(([material, info], index) => (
                        <motion.div
                          key={material}
                          className={`material-card ${config.material === material ? 'selected' : ''}`}
                          onClick={() => setConfig(prev => ({ ...prev, material, color: '' }))}
                          whileHover={{ y: -4, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="material-header">
                            <div>
                              <h3>{material}</h3>
                              <div className="material-features">
                                {info.features.slice(0, 2).map((feature, idx) => (
                                  <span key={idx} className="feature-badge">{feature}</span>
                                ))}
                              </div>
                            </div>
                            <div className="material-price">₱{info.price}/g</div>
                          </div>
                          
                          <p>{info.description}</p>
                          
                          <div className="material-colors">
                            <span>Available colors:</span>
                            <div className="color-previews">
                              {info.colors.slice(0, 6).map(color => (
                                <div
                                  key={color}
                                  className="color-preview"
                                  style={{ background: getColorStyle(color) }}
                                  title={color}
                                />
                              ))}
                              {info.colors.length > 6 && (
                                <div className="color-more">+{info.colors.length - 6}</div>
                              )}
                            </div>
                          </div>
                          
                          {config.material === material && (
                            <motion.div
                              className="selected-indicator"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                    {errors.material && (
                      <motion.div 
                        className="error-message"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.material}
                      </motion.div>
                    )}
                  </div>

                  {/* Enhanced Color Selection */}
                  {config.material && (
                    <motion.div 
                      className="section-card color-selection-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="card-header">
                        <div className="header-icon">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                            <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2"/>
                            <circle cx="12" cy="12" r="2" fill="currentColor"/>
                          </svg>
                        </div>
                        <div>
                          <h2>Select Color</h2>
                          <p>Choose from {FILAMENTS[config.material].colors.length} available colors</p>
                        </div>
                      </div>
                      
                      <div className="color-grid">
                        {FILAMENTS[config.material].colors.map((color, index) => (
                          <motion.div
                            key={color}
                            className={`color-option ${config.color === color ? 'selected' : ''}`}
                            onClick={() => setConfig(prev => ({ ...prev, color }))}
                            style={{ 
                              background: getColorStyle(color),
                              border: color === 'White' ? '2px solid var(--gray-300)' : `2px solid ${getColorStyle(color)}`
                            }}
                            whileHover={{ y: -3, scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <div className="color-name">{color}</div>
                            {config.color === color && (
                              <motion.div
                                className="color-selected-indicator"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500 }}
                              >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                  <path d="M16.5 6.5L7.5 15.5L3.5 11.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </motion.div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                      {errors.color && (
                        <motion.div 
                          className="error-message"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {errors.color}
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </div>

                {/* Step Navigation */}
                <div className="step-navigation">
                  <motion.button
                    className="nav-button secondary"
                    onClick={() => navigate('/')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M12 8H4M4 8L8 12M4 8L8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Cancel</span>
                  </motion.button>
                  <motion.button
                    className="nav-button primary"
                    onClick={nextStep}
                    disabled={!config.file || !config.material || !config.color}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Continue to Settings</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 8H12M12 8L8 4M12 8L8 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                className="config-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="step-header">
                  <h1>Print Settings</h1>
                  <p>Enter your print specifications and choose additional services</p>
                </div>

                <div className="step-content">
                  {/* Print Parameters */}
                  <div className="section-card">
                    <div className="card-header">
                      <div className="header-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                          <line x1="7" y1="8" x2="17" y2="8" stroke="currentColor" strokeWidth="2"/>
                          <line x1="7" y1="12" x2="17" y2="12" stroke="currentColor" strokeWidth="2"/>
                          <line x1="7" y1="16" x2="13" y2="16" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </div>
                      <div>
                        <h2>Print Parameters</h2>
                        <p>Enter details from your slicer software</p>
                      </div>
                    </div>

                    <div className="param-grid">
                      <div className="param-field">
                        <div className="field-header">
                          <label htmlFor="grams">Material Weight</label>
                          <button
                            className="help-button"
                            onMouseEnter={() => setShowHelpTooltip('weight')}
                            onMouseLeave={() => setShowHelpTooltip(null)}
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                              <path d="M6.5 6a1.5 1.5 0 0 1 3 0c0 1-1.5 1.5-1.5 2.5" stroke="currentColor" strokeWidth="1.5"/>
                              <circle cx="8" cy="12" r="0.5" fill="currentColor"/>
                            </svg>
                          </button>
                          {showHelpTooltip === 'weight' && (
                            <div className="help-tooltip">
                              Check your slicer (Cura, PrusaSlicer) for accurate filament weight
                            </div>
                          )}
                        </div>
                        <div className="input-wrapper">
                          <input
                            type="number"
                            id="grams"
                            value={config.grams}
                            onChange={(e) => setConfig(prev => ({ ...prev, grams: e.target.value }))}
                            placeholder="25"
                            className={errors.grams ? 'error' : ''}
                            min="1"
                            max="5000"
                            step="0.1"
                          />
                          <div className="input-suffix">grams</div>
                        </div>
                        <small>Typical range: 10-500g for most prints</small>
                        {errors.grams && <div className="error-message">{errors.grams}</div>}
                      </div>

                      <div className="param-field">
                        <div className="field-header">
                          <label htmlFor="printTime">Print Time</label>
                          <button
                            className="help-button"
                            onMouseEnter={() => setShowHelpTooltip('time')}
                            onMouseLeave={() => setShowHelpTooltip(null)}
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                              <path d="M6.5 6a1.5 1.5 0 0 1 3 0c0 1-1.5 1.5-1.5 2.5" stroke="currentColor" strokeWidth="1.5"/>
                              <circle cx="8" cy="12" r="0.5" fill="currentColor"/>
                            </svg>
                          </button>
                          {showHelpTooltip === 'time' && (
                            <div className="help-tooltip">
                              Estimated print time from your slicer preview
                            </div>
                          )}
                        </div>
                        <div className="input-wrapper">
                          <input
                            type="number"
                            id="printTime"
                            value={config.printTime}
                            onChange={(e) => setConfig(prev => ({ ...prev, printTime: e.target.value }))}
                            placeholder="2.5"
                            className={errors.printTime ? 'error' : ''}
                            min="0.1"
                            max="48"
                            step="0.1"
                          />
                          <div className="input-suffix">hours</div>
                        </div>
                        <small>Typical range: 1-12h for most prints</small>
                        {errors.printTime && <div className="error-message">{errors.printTime}</div>}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Services */}
                  <div className="section-card services-card">
                    <div className="card-header">
                      <div className="header-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2L22 8.5V15.5C22 19 18 22 12 24C6 22 2 19 2 15.5V8.5L12 2Z" stroke="currentColor" strokeWidth="2"/>
                          <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <h2>Additional Services</h2>
                        <p>Professional finishing and express options</p>
                      </div>
                    </div>

                    <div className="services-list">
                      {[
                        { 
                          key: 'cleaning', 
                          name: 'Professional Cleaning', 
                          price: BUSINESS_CONFIG.fees.cleaning, 
                          desc: 'Remove supports, sand rough edges, clean print lines',
                          icon: (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <path d="M2.5 10C2.5 10 7.5 15 10 17.5C12.5 15 17.5 10 17.5 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M2.5 6C2.5 6 7.5 11 10 13.5C12.5 11 17.5 6 17.5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )
                        },
                        { 
                          key: 'gluing', 
                          name: 'Assembly Service', 
                          price: BUSINESS_CONFIG.fees.gluing, 
                          desc: 'Professional assembly of multi-part prints',
                          icon: (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                          )
                        },
                        { 
                          key: 'rush', 
                          name: 'Rush Order (24h)', 
                          price: BUSINESS_CONFIG.fees.rush, 
                          desc: 'Priority printing with 24-hour guarantee',
                          icon: (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <path d="M10 1L18 5V10C18 14 14 16 10 17C6 16 2 14 2 10V5L10 1Z" stroke="currentColor" strokeWidth="2"/>
                              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                          )
                        }
                      ].map((service, index) => (
                        <motion.div
                          key={service.key}
                          className={`service-item ${config.services[service.key] ? 'selected' : ''}`}
                          whileHover={{ y: -2, scale: 1.01 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <label className="service-label">
                            <div className="service-checkbox-wrapper">
                              <input
                                type="checkbox"
                                checked={config.services[service.key]}
                                onChange={(e) => setConfig(prev => ({
                                  ...prev,
                                  services: { ...prev.services, [service.key]: e.target.checked }
                                }))}
                              />
                              <div className="custom-checkbox">
                                {config.services[service.key] && (
                                  <motion.svg 
                                    width="12" 
                                    height="12" 
                                    viewBox="0 0 12 12" 
                                    fill="none"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                  >
                                    <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </motion.svg>
                                )}
                              </div>
                            </div>
                            <div className="service-icon">
                              {service.icon}
                            </div>
                            <div className="service-content">
                              <div className="service-main">
                                <strong>{service.name}</strong>
                                <div className="service-price">+₱{service.price}</div>
                              </div>
                              <small>{service.desc}</small>
                            </div>
                          </label>
                        </motion.div>
                      ))}
                    </div>

                    {/* Student Discount */}
                    <motion.div 
                      className="discount-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="discount-label">
                        <div className="service-checkbox-wrapper">
                          <input
                            type="checkbox"
                            checked={config.studentDiscount}
                            onChange={(e) => setConfig(prev => ({ ...prev, studentDiscount: e.target.checked }))}
                          />
                          <div className="custom-checkbox">
                            {config.studentDiscount && (
                              <motion.svg 
                                width="12" 
                                height="12" 
                                viewBox="0 0 12 12" 
                                fill="none"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                              >
                                <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </motion.svg>
                            )}
                          </div>
                        </div>
                        <div className="discount-icon">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 2L12.5 6.5L18 7.5L14 11.5L15.5 17L10 14L4.5 17L6 11.5L2 7.5L7.5 6.5L10 2Z" stroke="currentColor" strokeWidth="1.5"/>
                          </svg>
                        </div>
                        <div className="discount-info">
                          <div className="discount-main">
                            <strong>Student Discount (5% off)</strong>
                            <div className="discount-badge">-5%</div>
                          </div>
                          <small>Valid student ID required for verification at delivery</small>
                        </div>
                      </label>
                    </motion.div>
                  </div>
                </div>

                {/* Step Navigation */}
                <div className="step-navigation">
                  <motion.button
                    className="nav-button secondary"
                    onClick={prevStep}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M12 8H4M4 8L8 12M4 8L8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Back to Material</span>
                  </motion.button>
                  <motion.button
                    className="nav-button primary"
                    onClick={nextStep}
                    disabled={!config.grams || !config.printTime || errors.grams || errors.printTime}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Review Order</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 8H12M12 8L8 4M12 8L8 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 3 && priceBreakdown && (
              <motion.div
                key="step3"
                className="config-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="step-header">
                  <h1>Order Summary</h1>
                  <p>Review your order details and confirm pricing before checkout</p>
                </div>

                <div className="step-content">
                  <div className="summary-layout">
                    {/* Order Details */}
                    <div className="section-card order-details-card">
                      <div className="card-header">
                        <div className="header-icon">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2"/>
                            <path d="M9 9H15M9 13H15M9 17H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </div>
                        <div>
                          <h2>Order Details</h2>
                          <p>Your print configuration summary</p>
                        </div>
                      </div>

                      <div className="order-summary">
                        <div className="summary-section">
                          <h4>File & Material</h4>
                          <div className="summary-grid">
                            <div className="summary-item">
                              <span>File:</span>
                              <div className="file-display">
                                <div className="file-icon-small">
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M10 2H4C3.4 2 3 2.4 3 3V13C3 13.6 3.4 14 4 14H12C12.6 14 13 13.6 13 13V5L10 2Z" fill="currentColor"/>
                                  </svg>
                                </div>
                                <div>
                                  <strong>{config.file?.name}</strong>
                                  <small>{formatFileSize(config.file?.size || 0)}</small>
                                </div>
                              </div>
                            </div>
                            
                            <div className="summary-item">
                              <span>Material:</span>
                              <strong>{config.material}</strong>
                            </div>
                            
                            <div className="summary-item">
                              <span>Color:</span>
                              <div className="color-display">
                                <div 
                                  className="color-dot"
                                  style={{ background: getColorStyle(config.color) }}
                                />
                                <strong>{config.color}</strong>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="summary-section">
                          <h4>Specifications</h4>
                          <div className="specs-grid">
                            <div className="spec-item">
                              <div className="spec-icon">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                  <path d="M8 2V14" stroke="currentColor" strokeWidth="2"/>
                                  <path d="M3 7H13" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                              </div>
                              <div>
                                <span>Weight</span>
                                <strong>{config.grams}g</strong>
                              </div>
                            </div>
                            <div className="spec-item">
                              <div className="spec-icon">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2"/>
                                  <path d="M8 4V8L11 11" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                              </div>
                              <div>
                                <span>Print Time</span>
                                <strong>{config.printTime}h</strong>
                              </div>
                            </div>
                          </div>
                        </div>

                        {Object.values(config.services).some(Boolean) && (
                          <div className="summary-section">
                            <h4>Selected Services</h4>
                            <div className="services-summary">
                              {Object.entries(config.services)
                                .filter(([_, enabled]) => enabled)
                                .map(([service, _]) => (
                                  <div key={service} className="service-tag">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>{service.charAt(0).toUpperCase() + service.slice(1)}</span>
                                  </div>
                                ))}
                              {config.studentDiscount && (
                                <div className="service-tag discount">
                                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M6 1L7.5 4.5L11 5L8 8L9 11.5L6 9.5L3 11.5L4 8L1 5L4.5 4.5L6 1Z" stroke="currentColor" strokeWidth="1.5"/>
                                  </svg>
                                  <span>Student Discount</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="edit-actions">
                          <button className="edit-link" onClick={() => goToStep(1)}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M11.5 3.5L12.5 4.5L5 12H4V11L11.5 3.5Z" stroke="currentColor" strokeWidth="1.5"/>
                            </svg>
                            Edit Material & Color
                          </button>
                          <button className="edit-link" onClick={() => goToStep(2)}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
                              <path d="M14.5 8a6.5 6.5 0 0 0-.5-2.5" stroke="currentColor" strokeWidth="1.5"/>
                              <path d="M2 8a6 6 0 0 0 .5 2.5" stroke="currentColor" strokeWidth="1.5"/>
                            </svg>
                            Edit Settings & Services
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Price Breakdown */}
                    <div className="section-card price-breakdown-card">
                      <div className="card-header">
                        <div className="header-icon">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 1V23" stroke="currentColor" strokeWidth="2"/>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </div>
                        <div>
                          <h2>Price Breakdown</h2>
                          <p>Transparent pricing with no hidden fees</p>
                        </div>
                      </div>

                      <div className="price-table">
                        <div className="price-section">
                          <h4>Materials & Processing</h4>
                          <div className="price-row">
                            <div className="price-item">
                              <span>Material ({config.grams}g × ₱{priceBreakdown.materialInfo.price})</span>
                              <div className="price-tooltip">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1"/>
                                  <path d="M5.5 5a1.5 1.5 0 0 1 3 0c0 1-1.5 1.5-1.5 2.5" stroke="currentColor" strokeWidth="1"/>
                                  <circle cx="7" cy="10" r="0.5" fill="currentColor"/>
                                </svg>
                                <div className="tooltip-content">Premium {config.material} filament</div>
                              </div>
                            </div>
                            <strong>₱{priceBreakdown.filamentCost.toFixed(2)}</strong>
                          </div>
                          
                          <div className="price-row">
                            <div className="price-item">
                              <span>Setup & Labor</span>
                              <div className="price-tooltip">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1"/>
                                  <path d="M5.5 5a1.5 1.5 0 0 1 3 0c0 1-1.5 1.5-1.5 2.5" stroke="currentColor" strokeWidth="1"/>
                                  <circle cx="7" cy="10" r="0.5" fill="currentColor"/>
                                </svg>
                                <div className="tooltip-content">Printer setup, calibration, and monitoring</div>
                              </div>
                            </div>
                            <strong>₱{priceBreakdown.laborFee.toFixed(2)}</strong>
                          </div>
                          
                          <div className="price-row">
                            <span>Service Fee</span>
                            <strong>₱{priceBreakdown.serviceFee.toFixed(2)}</strong>
                          </div>
                          
                          <div className="price-row">
                            <span>Processing & Electricity</span>
                            <strong>₱{priceBreakdown.electricityCharge.toFixed(2)}</strong>
                          </div>
                        </div>
                        
                        {Object.keys(priceBreakdown.serviceFees).length > 0 && (
                          <div className="price-section">
                            <h4>Additional Services</h4>
                            {Object.entries(priceBreakdown.serviceFees).map(([service, fee]) => (
                              <div key={service} className="price-row service">
                                <span>{service.charAt(0).toUpperCase() + service.slice(1)} Service</span>
                                <strong>₱{fee.toFixed(2)}</strong>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="price-divider"></div>
                        
                        <div className="price-row subtotal">
                          <span>Subtotal</span>
                          <strong>₱{priceBreakdown.subtotal.toFixed(2)}</strong>
                        </div>

                        {priceBreakdown.discountAmount > 0 && (
                          <motion.div 
                            className="price-row discount"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                          >
                            <span>Student Discount (5%)</span>
                            <strong>-₱{priceBreakdown.discountAmount.toFixed(2)}</strong>
                          </motion.div>
                        )}

                        <motion.div 
                          className="price-row total"
                          initial={{ scale: 0.95 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <span>TOTAL</span>
                          <strong>₱{priceBreakdown.total.toFixed(2)}</strong>
                        </motion.div>
                      </div>

                      {/* Delivery Info */}
                      <div className="delivery-info">
                        <div className="delivery-header">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <rect x="1" y="3" width="13" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                            <path d="M14 5L17 7V11L14 13" stroke="currentColor" strokeWidth="1.5"/>
                            <circle cx="4" cy="14.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
                            <circle cx="14" cy="14.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
                          </svg>
                          <span>Delivery Information</span>
                        </div>
                        <div className="delivery-details">
                          <div className="delivery-item">
                            <strong>₱200-400</strong> via Lalamove (paid directly to rider)
                          </div>
                          <div className="delivery-item">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M8 1L14 4V8C14 11 11 13 8 14C5 13 2 11 2 8V4L8 1Z" stroke="currentColor" strokeWidth="1.5"/>
                              <path d="M6 8L7 9L10 6" stroke="currentColor" strokeWidth="1.5"/>
                            </svg>
                            Secure packaging with damage protection
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step Navigation */}
                <div className="step-navigation">
                  <motion.button
                    className="nav-button secondary"
                    onClick={prevStep}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M12 8H4M4 8L8 12M4 8L8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Back to Settings</span>
                  </motion.button>
                  <motion.button
                    className="nav-button primary checkout"
                    onClick={proceedToCheckout}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    animate={{
                      boxShadow: [
                        '0 4px 12px rgba(52, 199, 89, 0.2)',
                        '0 8px 20px rgba(52, 199, 89, 0.4)',
                        '0 4px 12px rgba(52, 199, 89, 0.2)'
                      ]
                    }}
                    transition={{
                      boxShadow: { duration: 2, repeat: Infinity }
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M1 4H3L5 12H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="6" cy="14" r="1" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="14" r="1" stroke="currentColor" strokeWidth="2"/>
                      <path d="M5 12H13C13.5523 12 14 11.5523 14 11V8H4" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span>Proceed to Payment - ₱{priceBreakdown.total.toFixed(2)}</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Configuration;
