import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';

// Icons
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="21 21l-4.35-4.35"></path>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6,9 12,15 18,9"></polyline>
  </svg>
);

const MessageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.93 1.17 5.56 3 7.26V22l2.91-1.61c1.25.35 2.6.54 4.09.54 5.64 0 10.2-4.13 10.2-9.23S17.64 2 12 2zm1.13 12.44l-2.61-2.78-5.09 2.78L8.5 9.89l2.61 2.78 5.09-2.78-3.07 4.55z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const FAQ = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openQuestion, setOpenQuestion] = useState(null);

  // Comprehensive FAQ Data
  const faqData = [
    // ORDERING & QUOTES
    { id: 1, category: 'ordering', question: 'How do I get a quote for my 3D print?', answer: 'Send us your .STL, .3MF, or .OBJ file through Facebook Messenger or email us at prismbox3dservice@gmail.com. We\'ll analyze your model and send you an exact quote within 24 hours including material costs, printing time, and delivery fees.' },
    { id: 2, category: 'ordering', question: 'What file formats do you accept?', answer: 'We accept .STL, .3MF, .OBJ files. STL is most common and preferred. If you have other formats like .STEP or .IGES, please contact us and we can help convert them.' },
    { id: 3, category: 'ordering', question: 'Is there a minimum order quantity?', answer: 'No minimum order! We print single items or large quantities. However, larger quantities may qualify for volume discounts - contact us for bulk pricing.' },
    { id: 4, category: 'ordering', question: 'Do you offer student discounts?', answer: 'Yes! Students get special pricing. Show us your student ID via Messenger or email, and we\'ll apply student rates to your order.' },
    
    // MATERIALS & PRINTING
    { id: 5, category: 'materials', question: 'What materials do you offer?', answer: 'We offer PLA (standard and matte), ABS, PETG, and TPU in various colors. Each material has different properties - PLA for general use, ABS for durability, PETG for clarity and food safety, TPU for flexibility.' },
    { id: 6, category: 'materials', question: 'What colors are available?', answer: 'We stock common colors: White, Black, Red, Blue, Green, Yellow, Orange, Purple, Gray. Specialty colors like Wood-fill, Metal-fill, or transparent can be ordered with advance notice.' },
    { id: 7, category: 'materials', question: 'Can you print with flexible materials?', answer: 'Yes, we print with TPU (flexible filament) for phone cases, gaskets, toys, and wearables. Flexible prints require special handling and may take longer to complete.' },
    { id: 8, category: 'materials', question: 'What\'s the difference between PLA and PLA Matte?', answer: 'Regular PLA has a glossy finish, while PLA Matte has a professional, non-reflective finish that hides layer lines better. Matte is great for miniatures, prototypes, and display pieces.' },
    
    // PRICING & PAYMENT
    { id: 9, category: 'pricing', question: 'How do you calculate pricing?', answer: 'Pricing = (Material Weight × Price per gram) + ₱50 Service Fee + ₱20 Packaging. We provide exact calculations with your quote, including delivery fees if applicable.' },
    { id: 10, category: 'pricing', question: 'What payment methods do you accept?', answer: 'We accept GCash, bank transfer (BPI, BDO), and cash on delivery for Metro Manila. Payment is required before we start printing your order.' },
    { id: 11, category: 'pricing', question: 'Do you charge for failed prints?', answer: 'No! If a print fails due to our error or equipment issues, we reprint at no charge. You only pay for successful, quality-approved prints.' },
    { id: 12, category: 'pricing', question: 'Are there additional fees I should know about?', answer: 'Our quotes include all fees except delivery. Delivery costs depend on location and courier. Rush orders (24-48 hour completion) have a 50% rush fee.' }
  ];

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'ordering', name: 'Ordering & Quotes' },
    { id: 'materials', name: 'Materials & Options' },
    { id: 'pricing', name: 'Pricing & Payment' }
  ];

  // Filter FAQs based on search and category
  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleQuestionClick = useCallback((id) => {
    setOpenQuestion(openQuestion === id ? null : id);
  }, [openQuestion]);

  // Inline Styles
  const styles = {
    faqPage: {
      fontFamily: 'Arial, sans-serif',
      lineHeight: 1.6,
      color: '#333',
      minHeight: '100vh',
      background: '#f8f9fa'
    },
    hero: {
      background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
      color: 'white',
      padding: '80px 2rem',
      textAlign: 'center'
    },
    heroTitle: {
      fontSize: '3rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
    },
    heroText: {
      fontSize: '1.2rem',
      opacity: 0.9,
      maxWidth: '600px',
      margin: '0 auto'
    },
    container: {
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '0 2rem'
    },
    searchSection: {
      background: 'white',
      padding: '40px 2rem',
      borderBottom: '1px solid #e0e0e0'
    },
    searchBox: {
      position: 'relative',
      maxWidth: '500px',
      margin: '0 auto 2rem'
    },
    searchInput: {
      width: '100%',
      padding: '15px 50px 15px 20px',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      fontSize: '1rem',
      outline: 'none',
      boxSizing: 'border-box'
    },
    searchIcon: {
      position: 'absolute',
      right: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#666'
    },
    categoryTabs: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      justifyContent: 'center',
      marginBottom: '20px'
    },
    categoryTab: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '25px',
      fontSize: '0.9rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    activeTab: {
      background: 'linear-gradient(135deg, #FF6B35, #F7931E)',
      color: 'white',
      fontWeight: 'bold'
    },
    inactiveTab: {
      background: '#f0f0f0',
      color: '#666'
    },
    resultsCount: {
      textAlign: 'center',
      color: '#666',
      fontSize: '0.9rem'
    },
    faqsSection: {
      padding: '40px 2rem'
    },
    faqList: {
      maxWidth: '800px',
      margin: '0 auto'
    },
    faqItem: {
      background: 'white',
      marginBottom: '15px',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 3px 10px rgba(0,0,0,0.1)'
    },
    faqQuestion: {
      width: '100%',
      background: 'white',
      border: 'none',
      padding: '20px',
      textAlign: 'left',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '1.1rem',
      fontWeight: '600',
      color: '#333',
      transition: 'background 0.3s ease'
    },
    faqAnswer: {
      padding: '0 20px 20px',
      color: '#666',
      lineHeight: 1.6,
      borderTop: '1px solid #f0f0f0'
    },
    faqIcon: {
      color: '#FF6B35',
      transition: 'transform 0.3s ease'
    },
    noResults: {
      textAlign: 'center',
      padding: '60px 2rem',
      color: '#666'
    },
    noResultsTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#333'
    },
    contactSection: {
      background: 'linear-gradient(135deg, #333 0%, #555 100%)',
      color: 'white',
      padding: '60px 2rem',
      textAlign: 'center'
    },
    contactTitle: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '1rem'
    },
    contactText: {
      fontSize: '1.1rem',
      marginBottom: '2rem',
      opacity: 0.9
    },
    contactButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    contactButton: {
      background: 'linear-gradient(135deg, #FF6B35, #F7931E)',
      color: 'white',
      border: 'none',
      padding: '15px 25px',
      borderRadius: '8px',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      textDecoration: 'none'
    },
    emailButton: {
      background: 'transparent',
      color: 'white',
      border: '2px solid white',
      padding: '15px 25px',
      borderRadius: '8px',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      textDecoration: 'none'
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  return (
    <>
      <Header />
      <div style={styles.faqPage}>
        {/* Hero Section */}
        <motion.section 
          style={styles.hero}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div style={styles.container}>
            <h1 style={styles.heroTitle}>Frequently Asked Questions</h1>
            <p style={styles.heroText}>
              Find answers to all your 3D printing questions
            </p>
          </div>
        </motion.section>

        {/* Search & Filters */}
        <section style={styles.searchSection}>
          <div style={styles.container}>
            {/* Search Bar */}
            <div style={styles.searchBox}>
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
              <div style={styles.searchIcon}>
                <SearchIcon />
              </div>
            </div>

            {/* Category Tabs */}
            <div style={styles.categoryTabs}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  style={{
                    ...styles.categoryTab,
                    ...(activeCategory === category.id ? styles.activeTab : styles.inactiveTab)
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div style={styles.resultsCount}>
              {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </section>

        {/* FAQ List */}
        <section style={styles.faqsSection}>
          <div style={styles.container}>
            {filteredFAQs.length === 0 ? (
              <div style={styles.noResults}>
                <h3 style={styles.noResultsTitle}>No FAQs Found</h3>
                <p>Try adjusting your search terms or selecting a different category.</p>
              </div>
            ) : (
              <motion.div 
                style={styles.faqList}
                initial="hidden"
                animate="visible"
                variants={stagger}
              >
                {filteredFAQs.map((faq) => (
                  <motion.div 
                    key={faq.id} 
                    style={styles.faqItem}
                    variants={fadeIn}
                  >
                    <button
                      style={styles.faqQuestion}
                      onClick={() => handleQuestionClick(faq.id)}
                    >
                      <span>{faq.question}</span>
                      <motion.div
                        style={styles.faqIcon}
                        animate={{ rotate: openQuestion === faq.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDownIcon />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence>
                      {openQuestion === faq.id && (
                        <motion.div
                          style={styles.faqAnswer}
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
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* Contact Section - FIXED JSX */}
        <motion.section 
          style={styles.contactSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div style={styles.container}>
            <h2 style={styles.contactTitle}>Can't find what you're looking for?</h2>
            <p style={styles.contactText}>
              Get in touch with us directly! We typically respond within a few hours during business hours.
            </p>
            <div style={styles.contactButtons}>
              <button 
                style={styles.contactButton}
                onClick={() => window.open('https://m.me/teddytapiador', '_blank')}
              >
                <MessageIcon />
                Message Us on Messenger
              </button>
              <button 
                style={styles.emailButton}
                onClick={() => window.location.href = 'mailto:prismbox3dservice@gmail.com?subject=FAQ%20Question'}
              >
                <EmailIcon />
                Email Your Question
              </button>
            </div>
          </div>
        </motion.section>
      </div>
      <Footer />
    </>
  );
};

export default FAQ;