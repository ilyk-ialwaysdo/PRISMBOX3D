import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './FAQ.css';

// Icons
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6,9 12,15 18,9"/>
  </svg>
);

const MessageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.93 1.17 5.56 3 7.26V22l2.91-1.61c1.25.35 2.6.54 4.09.54 5.64 0 10.2-4.13 10.2-9.23S17.64 2 12 2zm1.13 12.44l-2.61-2.78-5.09 2.78L8.5 9.89l2.61 2.78 5.09-2.78-3.07 4.55z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
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
        {
            id: 1,
            category: 'ordering',
            question: 'How do I get a quote for my 3D print?',
            answer: 'Send us your .STL, .3MF, or .OBJ file through Facebook Messenger or email us at prismbox3dservice@gmail.com. We\'ll analyze your model and send you an exact quote within 24 hours including material costs, printing time, and delivery fees.'
        },
        {
            id: 2,
            category: 'ordering',
            question: 'What file formats do you accept?',
            answer: 'We accept .STL, .3MF, .OBJ files. STL is most common and preferred. If you have other formats like .STEP or .IGES, please contact us and we can help convert them.'
        },
        {
            id: 3,
            category: 'ordering',
            question: 'Is there a minimum order quantity?',
            answer: 'No minimum order! We print single items or large quantities. However, larger quantities may qualify for volume discounts - contact us for bulk pricing.'
        },
        {
            id: 4,
            category: 'ordering',
            question: 'Do you offer student discounts?',
            answer: 'Yes! Students get special pricing. Show us your student ID via Messenger or email, and we\'ll apply student rates to your order.'
        },
        
        // MATERIALS & PRINTING
        {
            id: 5,
            category: 'materials',
            question: 'What materials do you offer?',
            answer: 'We offer PLA (standard and matte), ABS, PETG, and TPU in various colors. Each material has different properties - PLA for general use, ABS for durability, PETG for clarity and food safety, TPU for flexibility.'
        },
        {
            id: 6,
            category: 'materials',
            question: 'What colors are available?',
            answer: 'We stock common colors: White, Black, Red, Blue, Green, Yellow, Orange, Purple, Gray. Specialty colors like Wood-fill, Metal-fill, or transparent can be ordered with advance notice.'
        },
        {
            id: 7,
            category: 'materials',
            question: 'Can you print with flexible materials?',
            answer: 'Yes, we print with TPU (flexible filament) for phone cases, gaskets, toys, and wearables. Flexible prints require special handling and may take longer to complete.'
        },
        {
            id: 8,
            category: 'materials',
            question: 'What\'s the difference between PLA and PLA Matte?',
            answer: 'Regular PLA has a glossy finish, while PLA Matte has a professional, non-reflective finish that hides layer lines better. Matte is great for miniatures, prototypes, and display pieces.'
        },
        
        // PRICING & PAYMENT
        {
            id: 9,
            category: 'pricing',
            question: 'How do you calculate pricing?',
            answer: 'Pricing = (Material Weight × Price per gram) + ₱50 Service Fee + ₱20 Packaging. We provide exact calculations with your quote, including delivery fees if applicable.'
        },
        {
            id: 10,
            category: 'pricing',
            question: 'What payment methods do you accept?',
            answer: 'We accept GCash, bank transfer (BPI, BDO), and cash on delivery for Metro Manila. Payment is required before we start printing your order.'
        },
        {
            id: 11,
            category: 'pricing',
            question: 'Do you charge for failed prints?',
            answer: 'No! If a print fails due to our error or equipment issues, we reprint at no charge. You only pay for successful, quality-approved prints.'
        },
        {
            id: 12,
            category: 'pricing',
            question: 'Are there additional fees I should know about?',
            answer: 'Our quotes include all fees except delivery. Delivery costs depend on location and courier. Rush orders (24-48 hour completion) have a 50% rush fee.'
        },
        
        // PRINTING PROCESS
        {
            id: 13,
            category: 'process',
            question: 'How long does printing take?',
            answer: 'Simple items: 1-2 days. Complex models: 3-5 days. Large or multiple items: 5-7 days. We provide estimated timeline with your quote and send updates during printing.'
        },
        {
            id: 14,
            category: 'process',
            question: 'Can you modify my design?',
            answer: 'We provide basic modifications like scaling, splitting large models, or adding supports. Complex design changes require additional fees. We recommend contacting us before ordering for design consultation.'
        },
        {
            id: 15,
            category: 'process',
            question: 'What if my file has printing issues?',
            answer: 'We check all files before printing. If we find issues (holes, non-manifold geometry, too thin walls), we\'ll contact you with solutions or repair recommendations before starting.'
        },
        {
            id: 16,
            category: 'process',
            question: 'Do you provide print supports?',
            answer: 'Yes, we add supports automatically where needed. We use dissolvable or breakaway supports when appropriate, and we remove all supports before delivery.'
        },
        
        // QUALITY & SPECIFICATIONS
        {
            id: 17,
            category: 'quality',
            question: 'What layer height do you use?',
            answer: 'Standard: 0.2mm (good balance of quality and speed). Fine detail: 0.15mm or 0.1mm (extra fee applies). Draft: 0.3mm (faster, lower cost). We choose optimal settings for your model.'
        },
        {
            id: 18,
            category: 'quality',
            question: 'What\'s the maximum size you can print?',
            answer: 'Build volume: 256mm × 256mm × 256mm. Larger items can be printed in parts and assembled. We provide assembly instructions and bonding recommendations.'
        },
        {
            id: 19,
            category: 'quality',
            question: 'How do you ensure quality?',
            answer: 'Every print is inspected for defects, proper adhesion, and dimensional accuracy. We take photos during printing and provide quality check images before shipping.'
        },
        {
            id: 20,
            category: 'quality',
            question: 'What if I\'m not satisfied with the quality?',
            answer: 'We guarantee quality! If you\'re not satisfied, we\'ll reprint free of charge or provide a full refund. Customer satisfaction is our priority.'
        },
        
        // DELIVERY & SHIPPING
        {
            id: 21,
            category: 'delivery',
            question: 'What delivery options do you have?',
            answer: 'Personal pickup (Bulacan), LBC nationwide, J&T Express, Lalamove (Metro Manila same-day), or meet-up within reasonable distance. Delivery fees vary by location and method.'
        },
        {
            id: 22,
            category: 'delivery',
            question: 'How do you package the prints?',
            answer: 'Items are wrapped in bubble wrap, placed in protective boxes, and labeled clearly. Fragile items get extra padding. We provide tracking numbers for all shipments.'
        },
        {
            id: 23,
            category: 'delivery',
            question: 'Do you deliver nationwide?',
            answer: 'Yes! We ship anywhere in the Philippines via LBC or J&T Express. Delivery usually takes 2-5 business days depending on location. Remote areas may take longer.'
        },
        {
            id: 24,
            category: 'delivery',
            question: 'Can I track my shipment?',
            answer: 'Absolutely! We provide tracking numbers immediately after shipping. You can track via LBC, J&T websites, or we can provide updates via Messenger.'
        },
        
        // BUSINESS & SUPPORT
        {
            id: 25,
            category: 'business',
            question: 'Are you a registered business?',
            answer: 'Yes, PrismBox 3D Services is DTI registered and BIR compliant. We provide official receipts for all transactions and maintain proper business records.'
        },
        {
            id: 26,
            category: 'business',
            question: 'Do you work with businesses and schools?',
            answer: 'Yes! We provide services to businesses, schools, and institutions. We offer educational discounts, bulk pricing, and can accommodate special requirements like invoicing or purchase orders.'
        },
        {
            id: 27,
            category: 'business',
            question: 'What are your business hours?',
            answer: 'Monday-Sunday 9:00 AM - 8:00 PM (Philippine Time). We respond to messages within a few hours during business hours, and within 24 hours on weekends and holidays.'
        },
        {
            id: 28,
            category: 'business',
            question: 'Why choose PrismBox over other services?',
            answer: 'Student-owned business means affordable prices, personal attention, and flexible service. We focus on quality, transparency, and customer satisfaction. Plus, you\'re supporting a young entrepreneur\'s education!'
        }
    ];

    const categories = [
        { id: 'all', name: 'All Questions' },
        { id: 'ordering', name: 'Ordering & Quotes' },
        { id: 'materials', name: 'Materials & Options' },
        { id: 'pricing', name: 'Pricing & Payment' },
        { id: 'process', name: 'Printing Process' },
        { id: 'quality', name: 'Quality & Specs' },
        { id: 'delivery', name: 'Delivery & Shipping' },
        { id: 'business', name: 'Business Info' }
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

    return (
        <>
            <Header />
            <div className="faq-page">
                
                {/* Hero Section */}
                <section className="faq-hero">
                    <div className="faq-container">
                        <div className="hero-content">
                            <h1>Support Center</h1>
                            <p>Find answers to all your 3D printing questions</p>
                            
                            {/* Search Bar */}
                            <div className="search-container">
                                <div className="search-box">
                                    <SearchIcon />
                                    <input
                                        type="text"
                                        placeholder="Search questions..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="search-input"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Category Filters */}
                <section className="category-section">
                    <div className="faq-container">
                        <div className="category-filters">
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(category.id)}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Content */}
                <section className="faq-content">
                    <div className="faq-container">
                        
                        {/* Results Info */}
                        <div className="results-info">
                            <p>{filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''} found</p>
                        </div>

                        {/* FAQ List */}
                        <div className="faq-list">
                            {filteredFAQs.map(faq => (
                                <div key={faq.id} className="faq-item">
                                    <button 
                                        className="faq-question"
                                        onClick={() => handleQuestionClick(faq.id)}
                                        aria-expanded={openQuestion === faq.id}
                                    >
                                        <span>{faq.question}</span>
                                        <div className={`chevron ${openQuestion === faq.id ? 'open' : ''}`}>
                                            <ChevronDownIcon />
                                        </div>
                                    </button>
                                    
                                    {openQuestion === faq.id && (
                                        <div className="faq-answer">
                                            <p>{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {filteredFAQs.length === 0 && (
                            <div className="no-results">
                                <h3>No questions found</h3>
                                <p>Try adjusting your search terms or selecting a different category.</p>
                            </div>
                        )}

                    </div>
                </section>

                {/* Contact Section */}
                <section className="faq-contact">
                    <div className="faq-container">
                        <div className="contact-card">
                            <h3>Still have questions?</h3>
                            <p>Can't find what you're looking for? Get in touch with us directly!</p>
                            
                            <div className="contact-methods">
                                <button 
                                    className="contact-btn primary"
                                    onClick={() => window.open('https://m.me/teddytapiador', '_blank')}
                                >
                                    <MessageIcon />
                                    <span>Message Us</span>
                                </button>
                                
                                <button 
                                    className="contact-btn secondary"
                                    onClick={() => window.location.href = 'mailto:prismbox3dservice@gmail.com?subject=3D Print Question'}
                                >
                                    <EmailIcon />
                                    <span>Email Us</span>
                                </button>
                            </div>
                            
                            <p className="response-time">We typically respond within a few hours during business hours.</p>
                        </div>
                    </div>
                </section>

            </div>
            <Footer />
        </>
    );
};

export default FAQ;
