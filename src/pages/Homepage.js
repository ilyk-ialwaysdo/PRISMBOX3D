import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Homepage.css';

// Custom, Lightweight SVG Icons
const UploadIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
);
const PrintIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V2h12v7"></path><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><path d="M6 14h12v8H6z"></path></svg>
);
const DeliverIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
);

const Homepage = () => {
    const navigate = useNavigate();
    const [faqs] = useState([
        { q: "What file formats do you accept?", a: "We primarily work with .STL and .3MF files, which are the most common formats for 3D printing. If you have another file type, such as .OBJ or .STEP, please contact us and we will see if we can convert it for you." },
        { q: "How long does it take to get my order?", a: "Standard orders are typically printed and ready for dispatch within 2-4 business days. Complex or large volume orders may take longer. We'll give you a time estimate when you place your order." },
        { q: "What materials do you offer?", a: "We offer a wide range of materials including various types of PLA, PETG, ABS, and flexible filaments. Check out our Materials page for a full list and their properties." },
    ]);
    const [activeFaq, setActiveFaq] = useState(0);

    const handleFaqToggle = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    return (
        <div className="homepage">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        Professional 3D Printing Services
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                        From rapid prototypes to final products, we bring your digital designs to life with precision, speed, and a wide range of quality materials.
                    </motion.p>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="hero-buttons">
                        <button className="cta-button primary" onClick={() => navigate('/configure')}>
                            Start Your Print
                        </button>
                        <button className="cta-button secondary" disabled>
                            Get Instant Quote (Coming Soon)
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works-section">
                <h2>How It Works</h2>
                <div className="steps-container">
                    <div className="step">
                        <div className="step-icon"><UploadIcon /></div>
                        <h3>1. Upload Your File</h3>
                        <p>Submit your 3D model in .STL, .3MF, or .OBJ format through our secure portal.</p>
                    </div>
                    <div className="step">
                        <div className="step-icon"><PrintIcon /></div>
                        <h3>2. We Print It</h3>
                        <p>We print your design using state-of-the-art printers and your chosen material.</p>
                    </div>
                    <div className="step">
                        <div className="step-icon"><DeliverIcon /></div>
                        <h3>3. We Deliver</h3>
                        <p>Receive your high-quality 3D print delivered straight to your doorstep.</p>
                    </div>
                </div>
            </section>

            {/* Featured Filaments Section */}
            <section className="featured-filaments-section">
                <h2>Popular Materials</h2>
                <div className="filaments-grid">
                    {/* Placeholder for filament cards */}
                    <div className="filament-card">
                        <div className="filament-card-image pla"></div>
                        <h3>PLA+</h3>
                        <p>Strong, easy to print, and perfect for a wide range of applications.</p>
                    </div>
                    <div className="filament-card">
                        <div className="filament-card-image petg"></div>
                        <h3>PETG</h3>
                        <p>Durable, chemical-resistant, and great for mechanical parts.</p>
                    </div>
                    <div className="filament-card">
                        <div className="filament-card-image abs"></div>
                        <h3>ABS</h3>
                        <p>Tough, heat-resistant, and ideal for functional prototypes.</p>
                    </div>
                </div>
                <button className="cta-button-center" onClick={() => navigate('/filaments')}>
                    Explore All Materials
                </button>
            </section>

            {/* FAQ Section */}
            <section className="faq-section">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-container">
                    {faqs.map((faq, index) => (
                        <div key={index} className="faq-item">
                            <button className="faq-question" onClick={() => handleFaqToggle(index)}>
                                <span>{faq.q}</span>
                                <motion.span
                                    animate={{ rotate: activeFaq === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="faq-icon"
                                >
                                    &#9660;
                                </motion.span>
                            </button>
                            <AnimatePresence>
                                {activeFaq === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="faq-answer"
                                    >
                                        <p>{faq.a}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
                <button className="cta-button-center" onClick={() => navigate('/faq')}>View More FAQs</button>
            </section>
        </div>
    );
};

export default Homepage;

