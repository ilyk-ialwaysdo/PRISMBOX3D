import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PrismBackground from '../components/PrismBackground';
import './Configuration.css';


const Configuration = () => {
    const navigate = useNavigate();

    // --- UNIFIED BUSINESS & PRICING LOGIC ---
    const BUSINESS_CONFIG = {
        fees: { labor: 150, cleaning: 120, gluing: 100, rush: 200, serviceFee: 50 },
        electricity: { rate: 12.16, printerWatt: 160, markup: 2 },
        discounts: { student: 0.327 }, // ~32.7% discount on PLA+ material cost to reach ~₱3.70/g
        validation: { minGrams: 1, maxGrams: 5000, minTime: 0.1, maxTime: 48 },
    };

    const FILAMENTS = {
        'PLA+': {
            price: 5.50, // Correct price as per your instruction
            density: 1.24,
            description: "An enhanced version of PLA, offering improved strength, layer adhesion, and durability. The best choice for a wide range of applications.",
            features: ["High Strength", "Great Adhesion", "Low Warp"],
            colors: ["White", "Black", "Grey", "Blue", "Green", "Red", "Yellow", "Orange"],
        },
        'PLA Basic': {
            price: 5.00,
            density: 1.24,
            description: "Perfect for beginners - easy to print, biodegradable, and ideal for aesthetic prints and prototypes.",
            features: ["Eco-friendly", "Low Odor", "Good Surface Finish"],
            colors: ["White", "Black", "Blue", "Green", "Yellow", "Red", "Grey", "Orange"],
        },
        'PLA Silk': {
            price: 8.00,
            density: 1.24,
            description: "Premium silk finish with a metallic shimmer, perfect for models that need to be eye-catching.",
            features: ["Metallic Finish", "Premium Quality", "Eye-catching"],
            colors: ["Sky Blue", "Pink", "Champagne Gold", "Silver"],
        },
        'PETG': {
            price: 7.00,
            density: 1.27,
            description: "A durable and chemical-resistant material that offers more strength and flexibility than PLA.",
            features: ["Chemical Resistant", "Impact Resistant", "Crystal Clear"],
            colors: ["Clear", "Black", "White", "Green", "Blue"],
        },
        'ABS': {
            price: 7.00,
            density: 1.04,
            description: "A tough, heat-resistant thermoplastic ideal for functional parts that need to withstand stress.",
            features: ["Heat Resistant", "Strong & Durable", "Post-processable"],
            colors: ["Black", "White", "Grey", "Red"],
        },
    };
    // --- END OF LOGIC ---

    const [config, setConfig] = useState({
        file: null,
        material: '',
        color: '',
        grams: '',
        printTime: '',
        services: { cleaning: false, gluing: false, rush: false },
        studentDiscount: false,
    });
    const [errors, setErrors] = useState({});
    const [priceBreakdown, setPriceBreakdown] = useState(null);
    const [step, setStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState([]);
    const [isDragOver, setIsDragOver] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);
    const [showHelpTooltip, setShowHelpTooltip] = useState(null);

    const calculatePrice = useCallback(async () => {
        const filament = FILAMENTS[config.material];
        if (!filament || !config.grams || !config.printTime) return;

        setIsCalculating(true);
        await new Promise(resolve => setTimeout(resolve, 800)); // UX delay

        const grams = parseFloat(config.grams) || 0;
        const printTime = parseFloat(config.printTime) || 0;

        const filamentCost = grams * filament.price;
        const electricityKWh = (printTime * BUSINESS_CONFIG.electricity.printerWatt) / 1000;
        const electricityCost = electricityKWh * BUSINESS_CONFIG.electricity.rate;
        const electricityCharge = electricityCost * BUSINESS_CONFIG.electricity.markup;

        let subtotal = filamentCost + BUSINESS_CONFIG.fees.labor + BUSINESS_CONFIG.fees.serviceFee + electricityCharge;
        Object.entries(config.services).forEach(([service, enabled]) => {
            if (enabled && BUSINESS_CONFIG.fees[service]) {
                subtotal += BUSINESS_CONFIG.fees[service];
            }
        });
        
        let discountAmount = 0;
        if (config.studentDiscount) {
            if (config.material === 'PLA+') {
                 // Applying a specific discount percentage to PLA+ material cost only
                 discountAmount = (grams * FILAMENTS['PLA+'].price) * BUSINESS_CONFIG.discounts.student;
            } else {
                // A standard 5% discount on the subtotal for other materials
                 discountAmount = subtotal * 0.05;
            }
        }

        const total = subtotal - discountAmount;

        setPriceBreakdown({
            filamentCost,
            electricityCharge,
            laborFee: BUSINESS_CONFIG.fees.labor,
            serviceFee: BUSINESS_CONFIG.fees.serviceFee,
            serviceFees: Object.entries(config.services).reduce((acc, [service, enabled]) => {
                if (enabled) acc[service] = BUSINESS_CONFIG.fees[service];
                return acc;
            }, {}),
            subtotal,
            discountAmount,
            total,
            materialInfo: filament,
            estimatedWeight: grams,
            estimatedTime: printTime,
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
            if (!config.file) newErrors.file = "Please select a 3D file to continue.";
            if (!config.material) newErrors.material = "Please select a material type.";
            if (!config.color) newErrors.color = "Please choose a color for your print.";
        }
        if (stepNum === 2) {
            const grams = parseFloat(config.grams);
            const time = parseFloat(config.printTime);
            if (!config.grams || grams < BUSINESS_CONFIG.validation.minGrams || grams > BUSINESS_CONFIG.validation.maxGrams) {
                newErrors.grams = `Weight must be between ${BUSINESS_CONFIG.validation.minGrams}-${BUSINESS_CONFIG.validation.maxGrams}g.`;
            }
            if (!config.printTime || time < BUSINESS_CONFIG.validation.minTime || time > BUSINESS_CONFIG.validation.maxTime) {
                newErrors.printTime = `Print time must be between ${BUSINESS_CONFIG.validation.minTime}-${BUSINESS_CONFIG.validation.maxTime} hours.`;
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(step)) {
            setCompletedSteps([...new Set([...completedSteps, step])]);
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

    const proceedToCheckout = () => {
        if (!priceBreakdown) return;
        navigate('/payment', { state: { orderData: { config, priceBreakdown, timestamp: new Date().toISOString() } } });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size <= 100 * 1024 * 1024) { // 100MB limit
                setConfig(prev => ({ ...prev, file }));
                setErrors(prev => ({ ...prev, file: null }));
            } else {
                setErrors(prev => ({ ...prev, file: "File size must be under 100MB." }));
            }
        }
    };

    const handleDragEvents = (e, isOver) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(isOver);
    };

    const handleDrop = (e) => {
        handleDragEvents(e, false);
        const file = e.dataTransfer.files[0];
        if (file) {
             handleFileUpload({ target: { files: [file] }});
        }
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <motion.div key="step1" className="config-step" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                        <h2>Step 1: Upload & Material</h2>
                        {/* File Upload */}
                        <div 
                            className={`section-card file-drop-zone ${isDragOver ? 'drag-over' : ''} ${config.file ? 'has-file' : ''}`}
                            onDragEnter={(e) => handleDragEvents(e, true)}
                            onDragLeave={(e) => handleDragEvents(e, false)}
                            onDragOver={(e) => handleDragEvents(e, true)}
                            onDrop={handleDrop}
                        >
                            <input type="file" id="file-upload" className="file-input" onChange={handleFileUpload} accept=".stl,.obj,.3mf" />
                            <label htmlFor="file-upload" className="file-label">
                                {config.file ? (
                                    <div className="file-selected">
                                        <div className="file-icon">{/* SVG for file */}</div>
                                        <div className="file-details">
                                            <div className="file-name">{config.file.name}</div>
                                            <div className="file-size">{(config.file.size / 1024 / 1024).toFixed(2)} MB</div>
                                        </div>
                                        <button className="remove-file" onClick={() => setConfig(p => ({...p, file: null}))}>&times;</button>
                                    </div>
                                ) : (
                                    <div className="file-placeholder">
                                        <div className="upload-icon">{/* SVG for upload */}</div>
                                        <strong>Drag & Drop or Click to Upload</strong>
                                        <span>Supported formats: STL, OBJ, 3MF (Max 100MB)</span>
                                    </div>
                                )}
                            </label>
                            {errors.file && <div className="error-message">{errors.file}</div>}
                        </div>
                        
                        {/* Material Selection */}
                        <div className="section-card">
                           <h2>Choose Material</h2>
                           <div className="material-grid">
                              {Object.entries(FILAMENTS).map(([material, info]) => (
                                 <motion.div 
                                   key={material} 
                                   className={`material-card ${config.material === material ? 'selected' : ''}`}
                                   onClick={() => setConfig(prev => ({ ...prev, material, color: '' }))}
                                   whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                                 >
                                   <h3>{material}</h3>
                                   <p>{info.description}</p>
                                   <div className="material-price">₱{info.price.toFixed(2)}/g</div>
                                 </motion.div>
                              ))}
                           </div>
                           {errors.material && <div className="error-message">{errors.material}</div>}
                        </div>

                        {/* Color Selection */}
                        {config.material && (
                           <div className="section-card color-selection-card">
                              <h2>Select Color for {config.material}</h2>
                              <div className="color-grid">
                                {FILAMENTS[config.material].colors.map(color => (
                                    <div 
                                        key={color} 
                                        className={`color-option ${config.color === color ? 'selected' : ''}`} 
                                        style={{ backgroundColor: color.replace(/\s+/g, '').toLowerCase() }}
                                        onClick={() => setConfig(p => ({...p, color}))}
                                    >
                                        <div className="color-name">{color}</div>
                                        {config.color === color && <div className="color-selected-indicator">{/* Check SVG */}</div>}
                                    </div>
                                ))}
                              </div>
                              {errors.color && <div className="error-message">{errors.color}</div>}
                           </div>
                        )}
                        
                        <div className="step-navigation">
                           <button onClick={nextStep} disabled={!config.file || !config.material || !config.color}>Continue to Settings</button>
                        </div>
                    </motion.div>
                );
            // ... cases for other steps
            default:
                return null;
        }
    };

    return (
        <div className="configuration-page">
            <PrismBackground />
            <motion.header className="config-header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                {/* Header content */}
            </motion.header>

            <div className="config-container">
                {/* All the JSX for progress bar, steps container, and price sidebar */}
                {renderStepContent()}

                <AnimatePresence>
                    {priceBreakdown && (
                         <motion.div className="price-sidebar" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                           {/* Live price sidebar content */}
                         </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Configuration;
