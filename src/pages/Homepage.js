import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Homepage.css';

// Custom, Lightweight SVG Icons
const UploadIcon = () => ( <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg> );
const PrintIcon = () => ( <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V2h12v7" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><path d="M6 14h12v8H6z" /></svg> );
const DeliverIcon = () => ( <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg> );

const Homepage = () => {
    const navigate = useNavigate();
    const [openFAQ, setOpenFAQ] = useState(null);

    // Dynamic "Raycast-style" quotes
    const heroQuotes = useMemo(() => [
        "The future is something which everyone reaches at the rate of sixty minutes an hour, whatever he does, whoever he is.",
        "Design is not just what it looks like and feels like. Design is how it works.",
        "The best way to predict the future is to invent it.",
        "Creativity is intelligence having fun.",
        "Simplicity is the ultimate sophistication."
    ], []);

    const [currentQuote] = useState(heroQuotes[Math.floor(Math.random() * heroQuotes.length)]);

    const toggleFAQ = useCallback((index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    }, [openFAQ]);
    
    const pageVariants = { initial: { opacity: 0 }, in: { opacity: 1 }, out: { opacity: 0 } };
    const sectionVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };

    const howItWorksSteps = useMemo(() => [
        { icon: <UploadIcon />, title: "1. Upload Your Design", description: "Submit your .STL or .3MF file through our secure portal. Our system provides an instant quote." },
        { icon: <PrintIcon />, title: "2. We Fabricate It", description: "Using state-of-the-art printers, we bring your design to life with precision and care." },
        { icon: <DeliverIcon />, title: "3. We Deliver It", description: "Your finished product is quality-checked, securely packaged, and shipped directly to you." },
    ], []);

    const faqs = useMemo(() => [
        { question: "What file formats do you accept?", answer: "We primarily work with .STL and .3MF files. Our system can also handle .OBJ and .STEP files automatically." },
        { question: "How long does it take?", answer: "Production time is typically 1-3 business days, plus shipping. You'll receive a delivery estimate at checkout." },
    ], []);

    return (
        <motion.div className="homepage" initial="initial" animate="in" exit="out" variants={pageVariants}>
            <section className="hero-section">
                <motion.div className="hero-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h1 className="hero-quote">"{currentQuote}"</h1>
                    <div className="hero-cta-group">
                        <div>
                            <button className="cta-button primary" disabled>Get Instant Quote</button>
                            <p className="future-feature-text">File Upload & Instant Pricing Coming Soon!</p>
                        </div>
                        <button className="cta-button secondary" onClick={() => navigate('/filaments')}>Explore Materials</button>
                    </div>
                </motion.div>
            </section>

            <motion.section className="how-it-works-section" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
                <h2 className="section-title">A Simple, Seamless Process</h2>
                <div className="steps-grid">
                    {howItWorksSteps.map((step) => (
                        <motion.div key={step.title} className="step-card" whileHover={{ y: -5 }}>
                            <div className="step-icon">{step.icon}</div>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            <motion.section className="faq-section" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
                <h2 className="section-title">Quick Questions</h2>
                <div className="faq-container">
                    {faqs.map((faq, index) => (
                        <div key={index} className="faq-item">
                            <button className="faq-question" onClick={() => toggleFAQ(index)}>
                                <span>{faq.question}</span>
                                <motion.span className="faq-arrow" animate={{ rotate: openFAQ === index ? 45 : 0 }}>+</motion.span>
                            </button>
                            <AnimatePresence>
                                {openFAQ === index && (
                                    <motion.div className="faq-answer" initial="collapsed" animate="open" exit="collapsed" variants={{ open: { opacity: 1, height: 'auto' }, collapsed: { opacity: 0, height: 0 } }} transition={{ duration: 0.3 }}>
                                        <p>{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
                <button className="cta-button-center" onClick={() => navigate('/faq')}>View More FAQs</button>
            </motion.section>
            
            <footer className="footer">
                <p>&copy; 2025 Prism Box 3D. All Rights Reserved. A modern 3D printing service in the heart of Bulacan.</p>
            </footer>
        </motion.div>
    );
};

export default Homepage;
