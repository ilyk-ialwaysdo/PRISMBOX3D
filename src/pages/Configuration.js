import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PrismBackground from '../components/PrismBackground';
import './Configuration.css';

const Configuration = () => {
    const navigate = useNavigate();

    // --- UNIFIED BUSINESS PRICING LOGIC (LATEST CORRECTION) ---
    const BUSINESSCONFIG = {
        fees: {
            baseService: 150,
            packaging: 20,
            rush: 100,
            gluing: 75,
            multiColor: 50,
        },
        electricity: {
            rate: 12.16,
            printerWatt: 160,
            markup: 2,
        },
        validation: {
            minGrams: 1, maxGrams: 5000,
            minTime: 0.1, maxTime: 48,
        },
    };

    const FILAMENTS = {
        'PLA Matte': {
            price: 3.50, // LATEST PRICE CORRECTION
            density: 1.24,
            description: "Non-reflective matte finish for a professional look. Hides layer lines effectively.",
            features: ["Matte Finish", "Hides Layers", "Professional Look"],
            colors: ["Beige", "Red", "Dark Blue"],
        },
        'PLA+': {
            price: 3.75,
            density: 1.24,
            description: "An enhanced PLA with improved strength and durability, perfect for functional parts.",
            features: ["High Strength", "Durable", "Great Adhesion"],
            colors: ["Beige"],
        },
        'ABS': {
            price: 4.00,
            density: 1.04,
            description: "Tough, heat-resistant thermoplastic ideal for parts that need to withstand stress and high temperatures.",
            features: ["Heat Resistant", "Very Strong", "Post-Processable"],
            colors: ["Silver"],
        },
        'PETG': {
            price: 4.00,
            density: 1.27,
            description: "Durable and chemical-resistant material offering more strength and flexibility than PLA.",
            features: ["Chemical Resistant", "Impact Resistant", "More Flexible"],
            colors: ["Silver"],
        },
    };
    // --- END OF LOGIC ---

    const [config, setConfig] = useState({
        file: null,
        material: '',
        color: '',
        grams: '',
        printTime: '',
        services: {
            rush: false,
            gluing: false,
            multiColor: false,
        },
    });

    const [errors, setErrors] = useState({});
    const [priceBreakdown, setPriceBreakdown] = useState(null);
    const [step, setStep] = useState(1);
    const [isDragOver, setIsDragOver] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);

    const availableServices = [
        { name: 'rush', label: 'Rush Service (24hr Turnaround)' },
        { name: 'gluing', label: 'Assembly / Gluing' },
        { name: 'multiColor', label: 'Multiple Color Changes' }
    ];

    const calculatePrice = useCallback(async () => {
        const filament = FILAMENTS[config.material];
        if (!filament || !config.grams || !config.printTime) return;

        setIsCalculating(true);
        await new Promise(resolve => setTimeout(resolve, 500));

        const grams = parseFloat(config.grams) || 0;
        const printTime = parseFloat(config.printTime) || 0;

        const filamentCost = grams * filament.price;
        const electricityKWh = (printTime * BUSINESSCONFIG.electricity.printerWatt) / 1000;
        const electricityCost = electricityKWh * BUSINESSCONFIG.electricity.rate;
        const electricityCharge = electricityCost * BUSINESSCONFIG.electricity.markup;

        let subtotal = filamentCost + BUSINESSCONFIG.fees.baseService + BUSINESSCONFIG.fees.packaging + electricityCharge;

        const serviceFees = {};
        Object.entries(config.services).forEach(([service, enabled]) => {
            if (enabled) {
                const fee = BUSINESSCONFIG.fees[service];
                subtotal += fee;
                serviceFees[service] = fee;
            }
        });

        setPriceBreakdown({
            filamentCost,
            electricityCharge,
            baseServiceFee: BUSINESSCONFIG.fees.baseService,
            packagingFee: BUSINESSCONFIG.fees.packaging,
            serviceFees,
            subtotal,
            total: subtotal,
            estimatedWeight: grams,
            estimatedTime: printTime,
        });

        setIsCalculating(false);
    }, [config, FILAMENTS, BUSINESSCONFIG]);

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
            if (!config.file) newErrors.file = "Please select a 3D file.";
            if (!config.material) newErrors.material = "Please select a material.";
            if (!config.color) newErrors.color = "Please choose a color.";
        }
        if (stepNum === 2) {
            const grams = parseFloat(config.grams);
            const time = parseFloat(config.printTime);
            if (!grams || grams < BUSINESSCONFIG.validation.minGrams || grams > BUSINESSCONFIG.validation.maxGrams) {
                newErrors.grams = `Weight must be between ${BUSINESSCONFIG.validation.minGrams}-${BUSINESSCONFIG.validation.maxGrams}g.`;
            }
            if (!time || time < BUSINESSCONFIG.validation.minTime || time > BUSINESSCONFIG.validation.maxTime) {
                newErrors.printTime = `Time must be between ${BUSINESSCONFIG.validation.minTime}-${BUSINESSCONFIG.validation.maxTime} hours.`;
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const nextStep = () => {
        if (validateStep(step)) setStep(step + 1);
    };
    
    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) setConfig(prev => ({ ...prev, file }));
    };
    
    const renderStepContent = () => {
        // ... (The rest of the rendering logic remains the same)
        // For brevity, I am omitting the step rendering logic as it is unchanged.
        // The price calculation now uses the corrected PLA Matte price.
    };

    return (
        <div className="configuration-page">
            <PrismBackground />
            <div className="config-container">
                <main className="config-main">
                    {/* The step rendering logic would be here */}
                </main>
                <AnimatePresence>
                    {priceBreakdown && (
                        <motion.aside className="price-sidebar">
                            <div className="price-card">
                                <h3>Live Price</h3>
                                {isCalculating ? <div className="loader">Calculating...</div> : (
                                    <>
                                        <div className="price-line"><span>Material ({priceBreakdown.estimatedWeight}g):</span> <span>₱{priceBreakdown.filamentCost.toFixed(2)}</span></div>
                                        <div className="price-line"><span>Base Service:</span> <span>₱{priceBreakdown.baseServiceFee.toFixed(2)}</span></div>
                                        <div className="price-line"><span>Packaging:</span> <span>₱{priceBreakdown.packagingFee.toFixed(2)}</span></div>
                                        <div className="price-line"><span>Energy & Markup:</span> <span>₱{priceBreakdown.electricityCharge.toFixed(2)}</span></div>
                                        {Object.entries(priceBreakdown.serviceFees).map(([key, value]) => (
                                            <div key={key} className="price-line"><span>{key.charAt(0).toUpperCase() + key.slice(1)}:</span> <span>₱{value.toFixed(2)}</span></div>
                                        ))}
                                        <hr/>
                                        <div className="price-total">
                                            <span>TOTAL</span>
                                            <span>₱{priceBreakdown.total.toFixed(2)}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.aside>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Configuration;
