import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M8.5,14.5L11,12L13.5,14.5L16.5,11.5L15,10L12.5,13L10,10.5L7,13.5L8.5,14.5Z"/>
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
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="5" x2="5" y2="19"/>
    <circle cx="6.5" cy="6.5" r="2.5"/>
    <circle cx="17.5" cy="17.5" r="2.5"/>
  </svg>
);

const GraduationCapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

const Pricing = () => {
    const navigate = useNavigate();

    const handleContactMessenger = () => {
        window.open('https://m.me/tedtapiador', '_blank');
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
                {/* HERO SECTION */}
                <motion.section className="pricing-hero" initial="hidden" animate="visible" variants={fadeInUp}>
                    <div className="hero-content">
                        <h1 className="hero-title">Simple, Transparent Pricing</h1>
                        <p className="hero-subtitle">
                            All-inclusive pricing with no hidden fees. Every price includes setup, printing, quality control, and packaging.
                        </p>
                    </div>
                </motion.section>

                {/* MATERIAL PRICING */}
                <motion.section className="materials-pricing-section" initial="hidden" animate="visible" variants={stagger}>
                    <div className="section-container">
                        <div className="section-header">
                            <h2>Material Pricing</h2>
                            <p>Choose from standard to premium materials</p>
                        </div>
                        
                        <div className="materials-grid">
                            {materialPrices.map((material, index) => (
                                <motion.div key={material.name} className={`material-price-card ${material.category.toLowerCase()}`} variants={fadeInUp}>
                                    <div className="card-header">
                                        <div className="material-info">
                                            <h3>{material.name}</h3>
                                            <span className={`category-badge ${material.category.toLowerCase()}`}>
                                                {material.category}
                                            </span>
                                        </div>
                                        <div className="price-display">
                                            <span className="price">₱{material.price.toFixed(2)}</span>
                                            <span className="price-unit">per gram</span>
                                        </div>
                                    </div>
                                    <p className="material-description">{material.description}</p>
                                </motion.div>
                            ))}
                        </div>
                        
                        <div className="view-all-materials">
                            <button onClick={handleViewMaterials} className="view-materials-btn">
                                View Complete Material Catalog →
                            </button>
                        </div>
                    </div>
                </motion.section>

                {/* VOLUME DISCOUNTS */}
                <motion.section className="volume-section" initial="hidden" animate="visible" variants={stagger}>
                    <div className="section-container">
                        <div className="section-header">
                            <PercentIcon />
                            <h2>Volume Discounts</h2>
                            <p>Bigger orders, bigger savings</p>
                        </div>
                        
                        <div className="volume-grid">
                            {volumeDiscounts.map((tier, index) => (
                                <motion.div key={tier.range} className="volume-card" variants={fadeInUp}>
                                    <div className="volume-range">{tier.range}</div>
                                    <div className="volume-discount">{tier.discount}% OFF</div>
                                    <div className="volume-description">{tier.description}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* STUDENT DISCOUNT */}
                <motion.section className="student-section" initial="hidden" animate="visible" variants={fadeInUp}>
                    <div className="section-container">
                        <div className="student-discount-card">
                            <div className="student-content">
                                <div className="student-icon">
                                    <GraduationCapIcon />
                                </div>
                                <div className="student-info">
                                    <h3>Student Discount</h3>
                                    <p>Additional <strong>10% OFF</strong> all orders with valid student ID</p>
                                    <span className="student-note">Supporting student innovation</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* SHIPPING POLICY - REMOVED REGIONAL REFERENCES */}
                <motion.section className="shipping-section" initial="hidden" animate="visible" variants={stagger}>
                    <div className="section-container">
                        <div className="section-header">
                            <TruckIcon />
                            <h2>Delivery Options</h2>
                            <p>Fast and reliable delivery</p>
                        </div>
                        
                        <div className="shipping-grid">
                            <motion.div className="shipping-card" variants={fadeInUp}>
                                <h4>FREE Shipping</h4>
                                <div className="shipping-price">FREE</div>
                                <p>Orders ₱4,500+ or 800g+</p>
                                <div className="shipping-details">
                                    <span>• LBC/J&T Express (1-3 days)</span>
                                    <span>• Lalamove Express (same day)</span>
                                </div>
                            </motion.div>

                            <motion.div className="shipping-card" variants={fadeInUp}>
                                <h4>Standard Shipping</h4>
                                <div className="shipping-price">₱100</div>
                                <p>All other orders</p>
                                <div className="shipping-details">
                                    <span>• LBC/J&T Express</span>
                                    <span>• 1-3 business days</span>
                                </div>
                            </motion.div>

                            <motion.div className="shipping-card featured" variants={fadeInUp}>
                                <h4>Personal Pickup</h4>
                                <div className="shipping-price">FREE</div>
                                <p>Bulacan area</p>
                                <div className="shipping-details">
                                    <span>• Save shipping costs</span>
                                    <span>• Meet in person</span>
                                    <span>• Eco-friendly option</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* PRICING EXAMPLES - PERFECT VARIED SHAPES */}
                <motion.section className="examples-section" initial="hidden" animate="visible" variants={stagger}>
                    <div className="section-container">
                        <div className="section-header">
                            <CalculatorIcon />
                            <h2>Pricing Examples</h2>
                            <p>Real calculations with volume discounts applied</p>
                        </div>
                        
                        <div className="examples-layout">
                            {examples.map((example, index) => {
                                const { discountedPrice, discount } = calculatePrice(example.basePrice, example.weight);
                                const totalCost = example.weight * discountedPrice;
                                
                                return (
                                    <motion.div key={index} className={`example-card shape-${index}`} variants={fadeInUp}>
                                        <div className="example-visual">
                                            <div className="weight-display">{example.weight}g</div>
                                            <div className="material-tag">{example.material}</div>
                                        </div>
                                        
                                        <div className="example-details">
                                            <h4>{example.item}</h4>
                                            <div className="price-breakdown">
                                                <div className="calc-row">
                                                    <span>Base rate:</span>
                                                    <span>₱{example.basePrice.toFixed(2)}/g</span>
                                                </div>
                                                {discount > 0 && (
                                                    <div className="calc-row discount-row">
                                                        <span>Volume discount:</span>
                                                        <span className="discount-amount">{discount}% OFF</span>
                                                    </div>
                                                )}
                                                <div className="calc-row final-row">
                                                    <span>Your rate:</span>
                                                    <span>₱{discountedPrice.toFixed(2)}/g</span>
                                                </div>
                                            </div>
                                            <div className="total-price">₱{totalCost.toFixed(2)}</div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </motion.section>

                {/* HOW IT WORKS */}
                <motion.section className="how-it-works-section" initial="hidden" animate="visible" variants={stagger}>
                    <div className="section-container">
                        <div className="section-header">
                            <h2>How Our Pricing Works</h2>
                            <p>Simple and transparent - no hidden surprises</p>
                        </div>
                        
                        <div className="process-flow">
                            <motion.div className="process-step" variants={fadeInUp}>
                                <div className="step-number">1</div>
                                <h4>Send Your File</h4>
                                <p>Upload your 3D model via Messenger. We analyze the weight and recommend the best material.</p>
                            </motion.div>
                            
                            <motion.div className="process-step" variants={fadeInUp}>
                                <div className="step-number">2</div>
                                <h4>Get Instant Quote</h4>
                                <p>Weight × Material price = Your total. Volume and student discounts automatically applied.</p>
                            </motion.div>
                            
                            <motion.div className="process-step" variants={fadeInUp}>
                                <div className="step-number">3</div>
                                <h4>Print & Deliver</h4>
                                <p>Professional printing with quality control. Choose your preferred delivery method.</p>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* CTA SECTION */}
                <motion.section className="cta-section" initial="hidden" animate="visible" variants={fadeInUp}>
                    <div className="cta-container">
                        <h2>Get Your Quote Today</h2>
                        <p>Send us your 3D model and receive an exact price based on our transparent pricing</p>
                        <div className="cta-buttons">
                            <button onClick={handleContactMessenger} className="messenger-btn">
                                <MessengerIcon />
                                Get Quote via Messenger
                            </button>
                            <button onClick={handleViewMaterials} className="materials-btn">
                                Browse Materials
                            </button>
                        </div>
                        <div className="contact-info">
                            <p><strong>PrismBox 3D Service</strong> | prismbox3dservice@gmail.com</p>
                            <p>Messenger: Teddy Tapiador</p>
                        </div>
                    </div>
                </motion.section>
            </div>
            <Footer />
        </>
    );
};

export default Pricing;
