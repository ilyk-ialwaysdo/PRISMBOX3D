import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './Pricing.css';

// WORKING SVG Icons
const CalculatorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2"/>
    <line x1="8" y1="6" x2="16" y2="6"/>
    <line x1="8" y1="10" x2="16" y2="10"/>
    <line x1="8" y1="14" x2="16" y2="14"/>
    <line x1="8" y1="18" x2="12" y2="18"/>
  </svg>
);

const MessengerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.93 1.17 5.56 3 7.26V22l2.91-1.61c1.25.35 2.6.54 4.09.54 5.64 0 10.2-4.13 10.2-9.23S17.64 2 12 2zm1.13 12.44l-2.61-2.78-5.09 2.78L8.5 9.89l2.61 2.78 5.09-2.78-3.07 4.55z"/>
  </svg>
);

const TruckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="3" width="15" height="13"/>
    <polygon points="16,8 20,8 23,11 23,16 16,16"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);

const PercentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="5" x2="5" y2="19"/>
    <circle cx="6.5" cy="6.5" r="2.5"/>
    <circle cx="17.5" cy="17.5" r="2.5"/>
  </svg>
);

const GraduationCapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

const Pricing = () => {
    const navigate = useNavigate();
    
    // FIXED: Corrected Messenger URL to 'teddytapiador'
    const handleContactMessenger = () => {
        window.open('https://m.me/teddytapiador', '_blank');
    };
    
    const handleViewMaterials = () => {
        navigate('/filaments');
    };

    // Material pricing with new tiered markups
    const materialPrices = [
        { name: 'PLA Basic', price: 2.29, category: 'Standard', description: 'Perfect for beginners and general use' },
        { name: 'PLA+', price: 3.75, category: 'Standard', description: 'Enhanced strength, low warping' },
        { name: 'PETG', price: 2.92, category: 'Standard', description: 'Chemical resistant, food-safe' },
        { name: 'PLA Matte', price: 4.37, category: 'Premium', description: 'Professional matte finish' },
        { name: 'TPU', price: 5.25, category: 'Premium', description: 'Flexible, rubber-like material' },
        { name: 'PETG-CF', price: 7.70, category: 'Premium', description: 'Carbon fiber reinforced strength' }
    ];

    // Updated volume discounts (10% and 15%)
    const volumeDiscounts = [
        { range: '1-99g', discount: 0, description: 'Standard pricing' },
        { range: '100-299g', discount: 5, description: 'Small volume discount' },
        { range: '300-499g', discount: 10, description: 'Medium volume discount' },
        { range: '500g+', discount: 15, description: 'Bulk order discount' }
    ];

    // Updated calculation with new discounts
    const calculatePrice = (basePrice, weight) => {
        let discount = 0;
        if (weight >= 500) discount = 15;
        else if (weight >= 300) discount = 10;
        else if (weight >= 100) discount = 5;
        
        const discountedPrice = basePrice * (1 - discount/100);
        return { discountedPrice, discount };
    };

    // 3 examples only
    const examples = [
        { item: 'Phone Case', weight: 35, material: 'TPU', basePrice: 5.25 },
        { item: 'Engineering Part', weight: 250, material: 'PETG', basePrice: 2.92 },
        { item: 'Drone Frame', weight: 600, material: 'PETG-CF', basePrice: 7.70 }
    ];

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const stagger = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    return (
        <>
            <Header />
            <div className="pricing-page">
                {/* Hero Section */}
                <motion.section 
                    className="pricing-hero"
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                >
                    <div className="hero-container">
                        <div className="hero-badge">
                            <CalculatorIcon />
                            <span>Transparent Pricing</span>
                        </div>
                        <h1>Simple, Fair Pricing</h1>
                        <p>All-inclusive pricing with no hidden fees. Every price includes setup, printing, quality control, and packaging.</p>
                    </div>
                </motion.section>

                {/* Materials Section */}
                <motion.section 
                    className="materials-section"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={stagger}
                >
                    <div className="container">
                        <div className="section-header">
                            <h2>Choose from standard to premium materials</h2>
                        </div>
                        
                        <div className="materials-grid">
                            {materialPrices.map((material, index) => (
                                <motion.div key={index} className="material-card" variants={fadeInUp}>
                                    <div className="material-header">
                                        <h3>{material.name}</h3>
                                        <div className={`category-badge ${material.category.toLowerCase()}`}>
                                            {material.category}
                                        </div>
                                    </div>
                                    <div className="price">₱{material.price.toFixed(2)}/g</div>
                                    <p>{material.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Volume Discounts */}
                <motion.section 
                    className="discounts-section"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={stagger}
                >
                    <div className="container">
                        <div className="section-header">
                            <h2>Bigger orders, bigger savings</h2>
                        </div>
                        
                        <div className="discounts-grid">
                            {volumeDiscounts.map((discount, index) => (
                                <motion.div key={index} className="discount-card" variants={fadeInUp}>
                                    <div className="discount-icon">
                                        <PercentIcon />
                                    </div>
                                    <h3>{discount.range}</h3>
                                    <div className="discount-amount">
                                        {discount.discount > 0 ? `${discount.discount}% OFF` : 'Standard Rate'}
                                    </div>
                                    <p>{discount.description}</p>
                                </motion.div>
                            ))}
                        </div>
                        
                        <motion.div className="student-discount" variants={fadeInUp}>
                            <div className="student-card">
                                <GraduationCapIcon />
                                <div className="student-content">
                                    <h3>Additional</h3>
                                    <div className="student-offer">**10% OFF** all orders with valid student ID</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Delivery Section */}
                <motion.section 
                    className="delivery-section"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                >
                    <div className="container">
                        <div className="section-header">
                            <h2>Fast and reliable delivery</h2>
                        </div>
                        
                        <div className="delivery-grid">
                            <div className="delivery-card">
                                <TruckIcon />
                                <h3>FREE Delivery</h3>
                                <p>Orders ₱4,500+ or 800g+</p>
                            </div>
                            <div className="delivery-card">
                                <TruckIcon />
                                <h3>₱150 Delivery</h3>
                                <p>All other orders</p>
                            </div>
                            <div className="delivery-card">
                                <TruckIcon />
                                <h3>FREE Pickup</h3>
                                <p>Bulacan area</p>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Examples Section */}
                <motion.section 
                    className="examples-section"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={stagger}
                >
                    <div className="container">
                        <div className="section-header">
                            <h2>Real calculations with volume discounts applied</h2>
                        </div>
                        
                        <div className="examples-grid">
                            {examples.map((example, index) => {
                                const { discountedPrice, discount } = calculatePrice(example.basePrice, example.weight);
                                const materialCost = discountedPrice * example.weight;
                                const serviceFee = 50;
                                const packaging = 20;
                                const total = materialCost + serviceFee + packaging;
                                
                                return (
                                    <motion.div key={index} className="example-card" variants={fadeInUp}>
                                        <h3>{example.item}</h3>
                                        <div className="example-details">
                                            <div className="detail">
                                                <span>Weight:</span>
                                                <span>{example.weight}g</span>
                                            </div>
                                            <div className="detail">
                                                <span>Material:</span>
                                                <span>{example.material}</span>
                                            </div>
                                            <div className="detail">
                                                <span>Base Price:</span>
                                                <span>₱{example.basePrice}/g</span>
                                            </div>
                                            {discount > 0 && (
                                                <div className="detail discount">
                                                    <span>Discount:</span>
                                                    <span>{discount}% OFF</span>
                                                </div>
                                            )}
                                            <div className="detail">
                                                <span>Material Cost:</span>
                                                <span>₱{materialCost.toFixed(2)}</span>
                                            </div>
                                            <div className="detail">
                                                <span>Service Fee:</span>
                                                <span>₱{serviceFee}</span>
                                            </div>
                                            <div className="detail">
                                                <span>Packaging:</span>
                                                <span>₱{packaging}</span>
                                            </div>
                                            <div className="total">
                                                <span>Total:</span>
                                                <span>₱{total.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </motion.section>

                {/* How it Works */}
                <motion.section 
                    className="how-it-works"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={stagger}
                >
                    <div className="container">
                        <div className="section-header">
                            <h2>Simple and transparent - no hidden surprises</h2>
                        </div>
                        
                        <div className="steps-grid">
                            <motion.div className="step-card" variants={fadeInUp}>
                                <div className="step-number">1</div>
                                <h3>Send Your File</h3>
                                <p>Upload your 3D model via Messenger. We analyze the weight and recommend the best material.</p>
                            </motion.div>
                            <motion.div className="step-card" variants={fadeInUp}>
                                <div className="step-number">2</div>
                                <h3>Get Exact Price</h3>
                                <p>Weight × Material price = Your total. Volume and student discounts automatically applied.</p>
                            </motion.div>
                            <motion.div className="step-card" variants={fadeInUp}>
                                <div className="step-number">3</div>
                                <h3>Print & Deliver</h3>
                                <p>Professional printing with quality control. Choose your preferred delivery method.</p>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* CTA Section */}
                <motion.section 
                    className="cta-section"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                >
                    <div className="container">
                        <div className="cta-content">
                            <h2>Get Your Quote Now</h2>
                            <p>Send us your 3D model and receive an exact price based on our transparent pricing</p>
                            <button className="cta-button" onClick={handleContactMessenger}>
                                <MessengerIcon />
                                Message Us Your Files
                            </button>
                        </div>
                    </div>
                </motion.section>

                {/* Contact Footer */}
                <div className="contact-footer">
                    <div className="container">
                        <p><strong>PrismBox 3D Service</strong> | prismbox3dservice@gmail.com</p>
                        <p>Messenger: Teddy Tapiador</p>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    );
};

export default Pricing;
