import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FAQ.css';

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6,9 12,15 18,9" />
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const MessengerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.93 1.17 5.56 3 7.26V22l2.91-1.61c1.25.35 2.6.54 4.09.54 5.64 0 10.2-4.13 10.2-9.23S17.64 2 12 2zm1.13 12.44l-2.61-2.78-5.09 2.78L8.5 9.89l2.61 2.78 5.09-2.78-3.07 4.55z" />
  </svg>
);

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const allFaqs = [
    {
      question: "How do I get a quote for my 3D print?",
      answer: "Send us your .STL or .3MF file through Messenger (@tedtapiador) or email (prismbox3dservice@gmail.com). We'll review your model and send you a detailed quote within 24 hours.",
      category: "Ordering"
    },
    {
      question: "What file formats do you accept?",
      answer: "We accept .STL and .3MF files, which are the standard formats for 3D printing. If you have other formats, send them to us and we'll see if we can work with them.",
      category: "Technical"
    },
    {
      question: "How much does 3D printing cost?",
      answer: "Pricing depends on your model's size, material choice, and complexity. Small items start around ₱150-300, medium pieces ₱300-800, and larger items ₱800+.",
      category: "Pricing"
    },
    {
      question: "How long does printing and delivery take?",
      answer: "Printing takes 2-4 business days depending on complexity. Metro Manila delivery via Lalamove is same-day once printing is complete. Provincial shipping takes 1-3 additional days.",
      category: "Timeline"
    },
    {
      question: "What materials and colors do you offer?",
      answer: "We have PLA+ (15+ colors), PETG (clear, white, black, colored), and ABS (standard colors). Check our Materials page for current color samples.",
      category: "Materials"
    },
    {
      question: "How do I pay for my order?",
      answer: "We accept GCash, PayMaya, and bank transfers. Payment is required before we start printing. Metro Manila orders can also use cash-on-delivery.",
      category: "Payment"
    }
  ];

  const filteredFaqs = allFaqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleContactMessenger = () => {
    window.open('https://m.me/tedtapiador', '_blank');
  };

  const handleContactEmail = () => {
    window.location.href = 'mailto:prismbox3dservice@gmail.com';
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const iconRotate = {
    closed: { rotate: 0 },
    open: { rotate: 180 }
  };

  return (
    <div className="faq-page">
      {/* Hero Section */}
      <motion.section 
        className="faq-hero"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="faq-hero-content">
          <h1>Frequently Asked Questions</h1>
          <p>Everything you need to know about our 3D printing services. Can't find your answer? Message us directly!</p>
          
          <div className="faq-search">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </motion.section>

      {/* FAQ Content */}
      <motion.section 
        className="faq-content"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <div className="faq-container">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <motion.div key={index} className="faq-item" variants={fadeInUp}>
                <div className="faq-category">{faq.category}</div>
                <button
                  className="faq-question"
                  onClick={() => handleToggle(index)}
                >
                  <span>{faq.question}</span>
                  <motion.div
                    className="faq-icon"
                    variants={iconRotate}
                    animate={activeIndex === index ? "open" : "closed"}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDownIcon />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <motion.div className="no-results" variants={fadeInUp}>
              <p>No FAQs found matching your search. Message us directly for help!</p>
            </motion.div>
          )}
        </div>

        {/* CTA Section */}
        <motion.div className="faq-cta" variants={fadeInUp}>
          <h3>Still have questions?</h3>
          <p>We're here to help! Contact us and we'll get back to you quickly.</p>
          <div className="faq-cta-buttons">
            <button className="cta-button primary" onClick={handleContactMessenger}>
              <MessengerIcon />
              <span>Messenger</span>
            </button>
            <button className="cta-button secondary" onClick={handleContactEmail}>
              <EmailIcon />
              <span>Email Us</span>
            </button>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default FAQ;
