import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Configuration.css';

const Configuration = () => {
  const navigate = useNavigate();
  
  // Business constants (from your HTML but organized better)
  const BUSINESS_CONFIG = {
    fees: { labor: 100, cleaning: 120, gluing: 100, rush: 200 },
    electricity: { rate: 12.16, printerWatt: 160, markup: 2 },
    discounts: { student: 0.05 },
    validation: { minGrams: 1, maxGrams: 5000, minTime: 0.1, maxTime: 48 }
  };
  
  // Enhanced filament database with better organization
  const FILAMENTS = {
    'PLA Basic': { 
      colors: ['White', 'Black', 'Blue', 'Green', 'Yellow', 'Red', 'Grey', 'Beige'], 
      price: 5, 
      density: 1.24,
      description: 'Perfect for beginners - easy to print, biodegradable'
    },
    'PLA Silk+': { 
      colors: ['Sky Blue', 'Pink', 'Champagne Gold'], 
      price: 8, 
      density: 1.24,
      description: 'Premium silk finish with metallic shimmer'
    },
    'PLA Matte': { 
      colors: ['Black', 'White', 'Pine Green', 'Space Navy'], 
      price: 6, 
      density: 1.24,
      description: 'Non-reflective matte finish for professional looks'
    },
    'PETG HF': { 
      colors: ['Black', 'Clear', 'Green'], 
      price: 7, 
      density: 1.27,
      description: 'Chemical resistant and crystal clear'
    },
    'ABS': { 
      colors: ['Black', 'White', 'Grey', 'Orange'], 
      price: 7, 
      density: 1.04,
      description: 'Durable and heat resistant for functional parts'
    },
    'TPU Flexible': { 
      colors: ['Black', 'Clear'], 
      price: 10, 
      density: 1.20,
      description: 'Flexible rubber-like material for phone cases'
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
  const [completedSteps, setCompletedSteps] = useState([]); // Track completed steps
  
  // Calculate price in real-time
  useEffect(() => {
    if (config.material && config.grams && config.printTime) {
      calculatePrice();
    } else {
      setPriceBreakdown(null);
    }
  }, [config]);

  const calculatePrice = () => {
    const filament = FILAMENTS[config.material];
    if (!filament) return;

    const grams = parseFloat(config.grams) || 0;
    const printTime = parseFloat(config.printTime) || 0;

    // Your business formulas
    const filamentCost = grams * filament.price;
    const electricityKWh = printTime * (BUSINESS_CONFIG.electricity.printerWatt / 1000);
    const electricityCost = electricityKWh * BUSINESS_CONFIG.electricity.rate;
    const electricityCharge = electricityCost * BUSINESS_CONFIG.electricity.markup;

    let subtotal = filamentCost + BUSINESS_CONFIG.fees.labor + electricityCharge;
    
    // Optional services
    Object.entries(config.services).forEach(([service, enabled]) => {
      if (enabled) subtotal += BUSINESS_CONFIG.fees[service];
    });

    // Student discount
    const discountAmount = config.studentDiscount ? subtotal * BUSINESS_CONFIG.discounts.student : 0;
    const total = subtotal - discountAmount;

    setPriceBreakdown({
      filamentCost,
      electricityCharge,
      laborFee: BUSINESS_CONFIG.fees.labor,
      serviceFees: Object.entries(config.services).reduce((acc, [service, enabled]) => {
        if (enabled) acc[service] = BUSINESS_CONFIG.fees[service];
        return acc;
      }, {}),
      subtotal,
      discountAmount,
      total,
      materialInfo: filament
    });
  };

  const validateStep = (stepNum) => {
    const newErrors = {};
    
    if (stepNum === 1) {
      if (!config.file) newErrors.file = 'Please select a 3D file';
      if (!config.material) newErrors.material = 'Please select a material';
      if (!config.color) newErrors.color = 'Please choose a color';
    }
    
    if (stepNum === 2) {
      const grams = parseFloat(config.grams);
      const time = parseFloat(config.printTime);
      
      if (!config.grams || grams < BUSINESS_CONFIG.validation.minGrams || grams > BUSINESS_CONFIG.validation.maxGrams) {
        newErrors.grams = `Weight must be between ${BUSINESS_CONFIG.validation.minGrams}-${BUSINESS_CONFIG.validation.maxGrams}g`;
      }
      if (!config.printTime || time < BUSINESS_CONFIG.validation.minTime || time > BUSINESS_CONFIG.validation.maxTime) {
        newErrors.printTime = `Time must be between ${BUSINESS_CONFIG.validation.minTime}-${BUSINESS_CONFIG.validation.maxTime} hours`;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToStep = (targetStep) => {
    // Allow navigation to previous steps or if current step is valid
    if (targetStep < step || completedSteps.includes(targetStep)) {
      setStep(targetStep);
      setErrors({});
    } else if (targetStep === step + 1) {
      nextStep();
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setCompletedSteps(prev => [...prev.filter(s => s !== step), step]);
      setStep(step + 1);
      setErrors({});
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrors({});
    }
  };

  const goToHomepage = () => {
    navigate('/');
  };

  const getColorStyle = (color) => {
    const colorMap = {
      'White': '#ffffff', 'Black': '#1a1a1a', 'Grey': '#6b7280',
      'Blue': '#3b82f6', 'Green': '#10b981', 'Yellow': '#f59e0b',
      'Red': '#ef4444', 'Orange': '#f97316', 'Beige': '#d2b48c',
      'Clear': 'rgba(255,255,255,0.2)', 'Sky Blue': '#0ea5e9',
      'Pink': '#ec4899', 'Champagne Gold': '#d4af37',
      'Pine Green': '#047857', 'Space Navy': '#1e40af'
    };
    return colorMap[color] || '#9ca3af';
  };

  const proceedToCheckout = () => {
    if (!priceBreakdown) return;
    navigate('/payment', { state: { orderData: { config, priceBreakdown } } });
  };

  const canNavigateToStep = (targetStep) => {
    if (targetStep === 1) return true;
    if (targetStep <= step) return true;
    if (completedSteps.includes(targetStep - 1)) return true;
    return false;
  };

  return (
    <motion.div 
      className="configuration-modern"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="config-wrapper">
        {/* Header Navigation */}
        <div className="header-nav">
          <button 
            className="home-button"
            onClick={goToHomepage}
            title="Back to Homepage"
          >
            ← Home
          </button>
          <div className="step-indicator">
            Step {step} of 3
          </div>
        </div>

        {/* Clickable Progress Bar */}
        <div className="progress-bar">
          <div className="progress-steps">
            {[
              { num: 1, label: 'Design & Material' },
              { num: 2, label: 'Parameters & Services' },
              { num: 3, label: 'Summary & Checkout' }
            ].map(({ num, label }) => (
              <div 
                key={num} 
                className={`progress-step ${step >= num ? 'active' : ''} ${step === num ? 'current' : ''} ${canNavigateToStep(num) ? 'clickable' : ''}`}
                onClick={() => canNavigateToStep(num) && goToStep(num)}
                title={canNavigateToStep(num) ? `Go to ${label}` : `Complete previous steps first`}
              >
                <div className="step-number">
                  {completedSteps.includes(num) && num < step ? '✓' : num}
                </div>
                <span className="step-label">{label}</span>
                {num < 3 && <div className="progress-line" />}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="config-step"
            >
              <h1>Upload & Select Material</h1>
              
              {/* File Upload */}
              <div className="section-card">
                <div className="file-drop-zone">
                  <input
                    type="file"
                    accept=".stl,.obj,.3mf,.gcode"
                    onChange={(e) => setConfig(prev => ({ ...prev, file: e.target.files[0] }))}
                    id="file-upload"
                    className="file-input"
                  />
                  <label htmlFor="file-upload" className="file-label">
                    {config.file ? (
                      <div className="file-selected">
                        <div className="file-icon">📎</div>
                        <div>
                          <strong>{config.file.name}</strong>
                          <small>{(config.file.size / 1024).toFixed(1)} KB</small>
                        </div>
                        <button type="button" onClick={(e) => {
                          e.preventDefault();
                          setConfig(prev => ({ ...prev, file: null }));
                        }}>×</button>
                      </div>
                    ) : (
                      <div className="file-placeholder">
                        <div className="upload-icon">📂</div>
                        <div>
                          <strong>Drop your 3D file here</strong>
                          <small>or click to browse (.STL, .OBJ, .3MF, .GCODE)</small>
                        </div>
                      </div>
                    )}
                  </label>
                  {errors.file && <div className="error-message">{errors.file}</div>}
                </div>
              </div>

              {/* Material Selection */}
              <div className="section-card">
                <h2>Choose Your Material</h2>
                <div className="material-grid">
                  {Object.entries(FILAMENTS).map(([material, info]) => (
                    <div
                      key={material}
                      className={`material-card ${config.material === material ? 'selected' : ''}`}
                      onClick={() => setConfig(prev => ({ ...prev, material, color: '' }))}
                    >
                      <div className="material-info">
                        <h3>{material}</h3>
                        <p>{info.description}</p>
                        <div className="material-price">₱{info.price}/gram</div>
                      </div>
                      <div className="material-colors">
                        {info.colors.slice(0, 3).map(color => (
                          <div
                            key={color}
                            className="color-preview"
                            style={{ background: getColorStyle(color) }}
                          />
                        ))}
                        {info.colors.length > 3 && <span>+{info.colors.length - 3}</span>}
                      </div>
                    </div>
                  ))}
                </div>
                {errors.material && <div className="error-message">{errors.material}</div>}
              </div>

              {/* Color Selection */}
              {config.material && (
                <div className="section-card">
                  <h2>Choose Color</h2>
                  <div className="color-grid">
                    {FILAMENTS[config.material].colors.map(color => (
                      <div
                        key={color}
                        className={`color-option ${config.color === color ? 'selected' : ''}`}
                        onClick={() => setConfig(prev => ({ ...prev, color }))}
                        style={{ background: getColorStyle(color) }}
                      >
                        <span className="color-name">{color}</span>
                        {config.color === color && <div className="selected-indicator">✓</div>}
                      </div>
                    ))}
                  </div>
                  {errors.color && <div className="error-message">{errors.color}</div>}
                </div>
              )}

              <div className="step-buttons">
                <button className="step-button secondary" onClick={goToHomepage}>
                  ← Cancel
                </button>
                <button 
                  className="step-button primary" 
                  onClick={nextStep}
                  disabled={!config.file || !config.material || !config.color}
                >
                  Continue to Parameters →
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="config-step"
            >
              <h1>Print Settings</h1>
              
              {/* Parameters */}
              <div className="section-card">
                <h2>Print Parameters</h2>
                <div className="param-row">
                  <div className="param-field">
                    <label>Material Weight (grams)</label>
                    <input
                      type="number"
                      min={BUSINESS_CONFIG.validation.minGrams}
                      max={BUSINESS_CONFIG.validation.maxGrams}
                      value={config.grams}
                      onChange={(e) => setConfig(prev => ({ ...prev, grams: e.target.value }))}
                      placeholder="25"
                      className={errors.grams ? 'error' : ''}
                    />
                    {errors.grams && <div className="error-message">{errors.grams}</div>}
                    <small>Check your slicer software for accurate weight</small>
                  </div>
                  
                  <div className="param-field">
                    <label>Print Time (hours)</label>
                    <input
                      type="number"
                      min={BUSINESS_CONFIG.validation.minTime}
                      max={BUSINESS_CONFIG.validation.maxTime}
                      step="0.1"
                      value={config.printTime}
                      onChange={(e) => setConfig(prev => ({ ...prev, printTime: e.target.value }))}
                      placeholder="2.5"
                      className={errors.printTime ? 'error' : ''}
                    />
                    {errors.printTime && <div className="error-message">{errors.printTime}</div>}
                    <small>Estimated from your slicer settings</small>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="section-card">
                <h2>Additional Services</h2>
                <div className="services-list">
                  {[
                    { key: 'cleaning', icon: '🧽', name: 'Professional Cleaning', price: BUSINESS_CONFIG.fees.cleaning, desc: 'Remove supports, sand rough edges' },
                    { key: 'gluing', icon: '🔧', name: 'Assembly Service', price: BUSINESS_CONFIG.fees.gluing, desc: 'Assemble multi-part prints' },
                    { key: 'rush', icon: '⚡', name: 'Rush Order (24h)', price: BUSINESS_CONFIG.fees.rush, desc: 'Fast-track your print job' }
                  ].map(service => (
                    <div key={service.key} className="service-item">
                      <label className="service-label">
                        <input
                          type="checkbox"
                          checked={config.services[service.key]}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            services: { ...prev.services, [service.key]: e.target.checked }
                          }))}
                        />
                        <div className="service-info">
                          <div className="service-main">
                            <span className="service-icon">{service.icon}</span>
                            <strong>{service.name}</strong>
                            <span className="service-price">+₱{service.price}</span>
                          </div>
                          <small>{service.desc}</small>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>

                {/* Student Discount */}
                <div className="discount-card">
                  <label className="discount-label">
                    <input
                      type="checkbox"
                      checked={config.studentDiscount}
                      onChange={(e) => setConfig(prev => ({ ...prev, studentDiscount: e.target.checked }))}
                    />
                    <div className="discount-info">
                      <strong>🎓 Student Discount (5% off)</strong>
                      <small>Valid student ID required at pickup</small>
                    </div>
                  </label>
                </div>
              </div>

              <div className="step-buttons">
                <button className="step-button secondary" onClick={prevStep}>← Back to Material</button>
                <button className="step-button primary" onClick={nextStep}>Continue to Summary →</button>
              </div>
            </motion.div>
          )}

          {step === 3 && priceBreakdown && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="config-step"
            >
              <h1>Order Summary</h1>
              
              <div className="summary-grid">
                {/* Order Details */}
                <div className="section-card">
                  <h2>📋 Your Order</h2>
                  <div className="order-summary">
                    <div className="summary-item">
                      <span>File:</span>
                      <strong>{config.file?.name}</strong>
                    </div>
                    <div className="summary-item">
                      <span>Material:</span>
                      <strong>{config.material}</strong>
                    </div>
                    <div className="summary-item">
                      <span>Color:</span>
                      <div className="color-display">
                        <div className="color-dot" style={{ background: getColorStyle(config.color) }}></div>
                        <strong>{config.color}</strong>
                      </div>
                    </div>
                    <div className="summary-item">
                      <span>Weight:</span>
                      <strong>{config.grams}g</strong>
                    </div>
                    <div className="summary-item">
                      <span>Print Time:</span>
                      <strong>{config.printTime}h</strong>
                    </div>
                  </div>
                  
                  {/* Edit Links */}
                  <div className="edit-links">
                    <button className="edit-link" onClick={() => goToStep(1)}>
                      ✏️ Edit Material & Color
                    </button>
                    <button className="edit-link" onClick={() => goToStep(2)}>
                      ⚙️ Edit Parameters & Services
                    </button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="section-card">
                  <h2>💰 Price Details</h2>
                  <div className="price-table">
                    <div className="price-row">
                      <span>Material ({config.grams}g × ₱{priceBreakdown.materialInfo.price})</span>
                      <span>₱{priceBreakdown.filamentCost.toFixed(2)}</span>
                    </div>
                    <div className="price-row">
                      <span>Labor & Setup</span>
                      <span>₱{priceBreakdown.laborFee.toFixed(2)}</span>
                    </div>
                    <div className="price-row">
                      <span>Electricity</span>
                      <span>₱{priceBreakdown.electricityCharge.toFixed(2)}</span>
                    </div>
                    
                    {Object.entries(priceBreakdown.serviceFees).map(([service, fee]) => (
                      <div key={service} className="price-row service">
                        <span>{service.charAt(0).toUpperCase() + service.slice(1)}</span>
                        <span>₱{fee.toFixed(2)}</span>
                      </div>
                    ))}
                    
                    <div className="price-divider"></div>
                    <div className="price-row subtotal">
                      <span>Subtotal</span>
                      <span>₱{priceBreakdown.subtotal.toFixed(2)}</span>
                    </div>
                    
                    {priceBreakdown.discountAmount > 0 && (
                      <div className="price-row discount">
                        <span>Student Discount</span>
                        <span>-₱{priceBreakdown.discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="price-row total">
                      <span>TOTAL</span>
                      <span>₱{priceBreakdown.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="step-buttons">
                <button className="step-button secondary" onClick={prevStep}>← Back to Settings</button>
                <button className="step-button checkout" onClick={proceedToCheckout}>
                  Proceed to Checkout - ₱{priceBreakdown.total.toFixed(2)}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Configuration;
