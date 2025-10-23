import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
// REMOVED: import './Pricing.css'; - TEMPORARILY REMOVED FOR WORKING WEBSITE

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
        navigate('/materials');
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

    // Inline Styles (Professional Pricing CSS)
    const styles = {
        pricingPage: {
            fontFamily: 'Arial, sans-serif',
            lineHeight: 1.6,
            color: '#333'
        },
        pricingHero: {
            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
            color: 'white',
            padding: '80px 2rem',
            textAlign: 'center'
        },
        heroContainer: {
            maxWidth: '800px',
            margin: '0 auto'
        },
        heroBadge: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.2)',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '0.9rem',
            marginBottom: '2rem'
        },
        heroTitle: {
            fontSize: '3.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        },
        heroText: {
            fontSize: '1.2rem',
            opacity: 0.95,
            lineHeight: 1.6
        },
        section: {
            padding: '80px 2rem'
        },
        container: {
            maxWidth: '1200px',
            margin: '0 auto'
        },
        sectionHeader: {
            textAlign: 'center',
            marginBottom: '4rem'
        },
        sectionTitle: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '1rem'
        },
        materialsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
        },
        materialCard: {
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
            border: '2px solid #f0f0f0',
            transition: 'all 0.3s ease'
        },
        materialHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px'
        },
        materialName: {
            fontSize: '1.3rem',
            fontWeight: 'bold',
            color: '#333',
            margin: 0
        },
        categoryBadge: {
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '0.8rem',
            fontWeight: 'bold'
        },
        standardBadge: {
            background: '#e3f2fd',
            color: '#1976d2'
        },
        premiumBadge: {
            background: '#fff3e0',
            color: '#f57c00'
        },
        price: {
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#FF6B35',
            marginBottom: '15px'
        },
        materialDescription: {
            color: '#666',
            lineHeight: 1.6
        },
        discountsSection: {
            padding: '80px 2rem',
            background: '#f8f9fa'
        },
        discountsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
        },
        discountCard: {
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            textAlign: 'center',
            boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
        },
        discountIcon: {
            width: '50px',
            height: '50px',
            background: '#e3f2fd',
            color: '#1976d2',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
        },
        discountRange: {
            fontSize: '1.3rem',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '10px'
        },
        discountAmount: {
            fontSize: '1.1rem',
            fontWeight: 'bold',
            color: '#FF6B35',
            marginBottom: '10px'
        },
        discountDescription: {
            color: '#666',
            fontSize: '0.9rem'
        },
        studentDiscount: {
            display: 'flex',
            justifyContent: 'center'
        },
        studentCard: {
            background: 'linear-gradient(135deg, #28a745, #20c997)',
            color: 'white',
            padding: '25px 40px',
            borderRadius: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            boxShadow: '0 5px 20px rgba(40, 167, 69, 0.3)'
        },
        studentContent: {
            textAlign: 'left'
        },
        studentTitle: {
            fontSize: '1.1rem',
            margin: 0,
            marginBottom: '5px'
        },
        studentOffer: {
            fontSize: '1.3rem',
            fontWeight: 'bold'
        },
        deliverySection: {
            padding: '80px 2rem',
            background: 'white'
        },
        deliveryGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
        },
        deliveryCard: {
            background: '#f8f9fa',
            padding: '30px',
            borderRadius: '15px',
            textAlign: 'center',
            border: '2px solid #e0e0e0'
        },
        deliveryTitle: {
            fontSize: '1.3rem',
            fontWeight: 'bold',
            color: '#333',
            margin: '20px 0 10px'
        },
        deliveryText: {
            color: '#666',
            fontSize: '1rem'
        },
        examplesSection: {
            padding: '80px 2rem',
            background: '#f8f9fa'
        },
        examplesGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
        },
        exampleCard: {
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
        },
        exampleTitle: {
            fontSize: '1.3rem',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '20px'
        },
        exampleDetails: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
        },
        detail: {
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.95rem'
        },
        detailDiscount: {
            color: '#28a745',
            fontWeight: 'bold'
        },
        total: {
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            color: '#FF6B35',
            paddingTop: '10px',
            borderTop: '2px solid #f0f0f0',
            marginTop: '10px'
        },
        howItWorks: {
            padding: '80px 2rem',
            background: 'white'
        },
        stepsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
        },
        stepCard: {
            background: '#f8f9fa',
            padding: '30px',
            borderRadius: '15px',
            textAlign: 'center',
            position: 'relative'
        },
        stepNumber: {
            position: 'absolute',
            top: '-15px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(135deg, #FF6B35, #F7931E)',
            color: 'white',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            fontWeight: 'bold'
        },
        stepTitle: {
            fontSize: '1.3rem',
            fontWeight: 'bold',
            color: '#333',
            margin: '20px 0 15px'
        },
        stepText: {
            color: '#666',
            lineHeight: 1.6
        },
        ctaSection: {
            background: 'linear-gradient(135deg, #333 0%, #555 100%)',
            color: 'white',
            padding: '80px 2rem',
            textAlign: 'center'
        },
        ctaContent: {
            maxWidth: '600px',
            margin: '0 auto'
        },
        ctaTitle: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem'
        },
        ctaText: {
            fontSize: '1.2rem',
            marginBottom: '2rem',
            opacity: 0.9
        },
        ctaButton: {
            background: 'linear-gradient(135deg, #FF6B35, #F7931E)',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '8px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)',
            textDecoration: 'none'
        },
        contactFooter: {
            background: '#2c3e50',
            color: 'white',
            padding: '40px 2rem',
            textAlign: 'center'
        },
        contactText: {
            margin: '5px 0',
            opacity: 0.9
        }
    };

    return (
        <>
            <Header />
            <div style={styles.pricingPage}>
                {/* Hero Section */}
                <motion.section 
                    style={styles.pricingHero}
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                >
                    <div style={styles.heroContainer}>
                        <div style={styles.heroBadge}>
                            <CalculatorIcon />
                            <span>Transparent Pricing</span>
                        </div>
                        <h1 style={styles.heroTitle}>Simple, Fair Pricing</h1>
                        <p style={styles.heroText}>All-inclusive pricing with no hidden fees. Every price includes setup, printing, quality control, and packaging.</p>
                    </div>
                </motion.section>

                {/* Materials Section */}
                <motion.section 
                    style={styles.section}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={stagger}
                >
                    <div style={styles.container}>
                        <div style={styles.sectionHeader}>
                            <h2 style={styles.sectionTitle}>Choose from standard to premium materials</h2>
                        </div>
                        
                        <div style={styles.materialsGrid}>
                            {materialPrices.map((material, index) => (
                                <motion.div key={index} style={styles.materialCard} variants={fadeInUp}>
                                    <div style={styles.materialHeader}>
                                        <h3 style={styles.materialName}>{material.name}</h3>
                                        <div style={{
                                            ...styles.categoryBadge,
                                            ...(material.category.toLowerCase() === 'standard' ? styles.standardBadge : styles.premiumBadge)
                                        }}>
                                            {material.category}
                                        </div>
                                    </div>
                                    <div style={styles.price}>₱{material.price.toFixed(2)}/g</div>
                                    <p style={styles.materialDescription}>{material.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Volume Discounts */}
                <motion.section 
                    style={styles.discountsSection}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={stagger}
                >
                    <div style={styles.container}>
                        <div style={styles.sectionHeader}>
                            <h2 style={styles.sectionTitle}>Bigger orders, bigger savings</h2>
                        </div>
                        
                        <div style={styles.discountsGrid}>
                            {volumeDiscounts.map((discount, index) => (
                                <motion.div key={index} style={styles.discountCard} variants={fadeInUp}>
                                    <div style={styles.discountIcon}>
                                        <PercentIcon />
                                    </div>
                                    <h3 style={styles.discountRange}>{discount.range}</h3>
                                    <div style={styles.discountAmount}>
                                        {discount.discount > 0 ? `${discount.discount}% OFF` : 'Standard Rate'}
                                    </div>
                                    <p style={styles.discountDescription}>{discount.description}</p>
                                </motion.div>
                            ))}
                        </div>
                        
                        <motion.div style={styles.studentDiscount} variants={fadeInUp}>
                            <div style={styles.studentCard}>
                                <GraduationCapIcon />
                                <div style={styles.studentContent}>
                                    <h3 style={styles.studentTitle}>Additional</h3>
                                    <div style={styles.studentOffer}>**10% OFF** all orders with valid student ID</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Delivery Section */}
                <motion.section 
                    style={styles.deliverySection}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                >
                    <div style={styles.container}>
                        <div style={styles.sectionHeader}>
                            <h2 style={styles.sectionTitle}>Fast and reliable delivery</h2>
                        </div>
                        
                        <div style={styles.deliveryGrid}>
                            <div style={styles.deliveryCard}>
                                <TruckIcon />
                                <h3 style={styles.deliveryTitle}>FREE Delivery</h3>
                                <p style={styles.deliveryText}>Orders ₱4,500+ or 800g+</p>
                            </div>
                            <div style={styles.deliveryCard}>
                                <TruckIcon />
                                <h3 style={styles.deliveryTitle}>₱150 Delivery</h3>
                                <p style={styles.deliveryText}>All other orders</p>
                            </div>
                            <div style={styles.deliveryCard}>
                                <TruckIcon />
                                <h3 style={styles.deliveryTitle}>FREE Pickup</h3>
                                <p style={styles.deliveryText}>Bulacan area</p>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Examples Section */}
                <motion.section 
                    style={styles.examplesSection}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={stagger}
                >
                    <div style={styles.container}>
                        <div style={styles.sectionHeader}>
                            <h2 style={styles.sectionTitle}>Real calculations with volume discounts applied</h2>
                        </div>
                        
                        <div style={styles.examplesGrid}>
                            {examples.map((example, index) => {
                                const { discountedPrice, discount } = calculatePrice(example.basePrice, example.weight);
                                const materialCost = discountedPrice * example.weight;
                                const serviceFee = 50;
                                const packaging = 20;
                                const total = materialCost + serviceFee + packaging;
                                
                                return (
                                    <motion.div key={index} style={styles.exampleCard} variants={fadeInUp}>
                                        <h3 style={styles.exampleTitle}>{example.item}</h3>
                                        <div style={styles.exampleDetails}>
                                            <div style={styles.detail}>
                                                <span>Weight:</span>
                                                <span>{example.weight}g</span>
                                            </div>
                                            <div style={styles.detail}>
                                                <span>Material:</span>
                                                <span>{example.material}</span>
                                            </div>
                                            <div style={styles.detail}>
                                                <span>Base Price:</span>
                                                <span>₱{example.basePrice}/g</span>
                                            </div>
                                            {discount > 0 && (
                                                <div style={{...styles.detail, ...styles.detailDiscount}}>
                                                    <span>Discount:</span>
                                                    <span>{discount}% OFF</span>
                                                </div>
                                            )}
                                            <div style={styles.detail}>
                                                <span>Material Cost:</span>
                                                <span>₱{materialCost.toFixed(2)}</span>
                                            </div>
                                            <div style={styles.detail}>
                                                <span>Service Fee:</span>
                                                <span>₱{serviceFee}</span>
                                            </div>
                                            <div style={styles.detail}>
                                                <span>Packaging:</span>
                                                <span>₱{packaging}</span>
                                            </div>
                                            <div style={styles.total}>
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
                    style={styles.howItWorks}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={stagger}
                >
                    <div style={styles.container}>
                        <div style={styles.sectionHeader}>
                            <h2 style={styles.sectionTitle}>Simple and transparent - no hidden surprises</h2>
                        </div>
                        
                        <div style={styles.stepsGrid}>
                            <motion.div style={styles.stepCard} variants={fadeInUp}>
                                <div style={styles.stepNumber}>1</div>
                                <h3 style={styles.stepTitle}>Send Your File</h3>
                                <p style={styles.stepText}>Upload your 3D model via Messenger. We analyze the weight and recommend the best material.</p>
                            </motion.div>
                            <motion.div style={styles.stepCard} variants={fadeInUp}>
                                <div style={styles.stepNumber}>2</div>
                                <h3 style={styles.stepTitle}>Get Exact Price</h3>
                                <p style={styles.stepText}>Weight × Material price = Your total. Volume and student discounts automatically applied.</p>
                            </motion.div>
                            <motion.div style={styles.stepCard} variants={fadeInUp}>
                                <div style={styles.stepNumber}>3</div>
                                <h3 style={styles.stepTitle}>Print & Deliver</h3>
                                <p style={styles.stepText}>Professional printing with quality control. Choose your preferred delivery method.</p>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* CTA Section */}
                <motion.section 
                    style={styles.ctaSection}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                >
                    <div style={styles.container}>
                        <div style={styles.ctaContent}>
                            <h2 style={styles.ctaTitle}>Get Your Quote Now</h2>
                            <p style={styles.ctaText}>Send us your 3D model and receive an exact price based on our transparent pricing</p>
                            <button style={styles.ctaButton} onClick={handleContactMessenger}>
                                <MessengerIcon />
                                Message Us Your Files
                            </button>
                        </div>
                    </div>
                </motion.section>

                {/* Contact Footer */}
                <div style={styles.contactFooter}>
                    <div style={styles.container}>
                        <p style={styles.contactText}><strong>PrismBox 3D Service</strong> | prismbox3dservice@gmail.com</p>
                        <p style={styles.contactText}>Messenger: Teddy Tapiador</p>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    );
};

export default Pricing;