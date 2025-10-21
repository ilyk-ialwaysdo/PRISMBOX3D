import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './FAQ.css';

// SVG Icons
const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6,9 12,15 18,9"/>
  </svg>
);

const QuestionIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <circle cx="12" cy="17" r="0.5"/>
  </svg>
);

const MessengerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.93 1.17 5.56 3 7.26V22l2.91-1.61c1.25.35 2.6.54 4.09.54 5.64 0 10.2-4.13 10.2-9.23S17.64 2 12 2zm1.13 12.44l-2.61-2.78-5.09 2.78L8.5 9.89l2.61 2.78 5.09-2.78-3.07 4.55z"/>
  </svg>
);

const FAQ = () => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);

  const faqCategories = [
    {
      title: "Getting Started",
      faqs: [
        {
          q: "How do I get a quote for my 3D print?",
          a: "Send us your .STL or .3MF file through Messenger or email us at prismbox3dservice@gmail.com. We'll analyze your model and provide a detailed quote within 24 hours with all costs included."
        },
        {
          q: "What file formats do you accept?",
          a: "We accept .STL, .3MF, .OBJ, and .PLY files. STL and 3MF are preferred as they contain the most complete information for 3D printing."
        },
        {
          q: "How accurate is your pricing?",
          a: "Our quotes are based on actual material weight, print time estimates, and transparent service fees. The final price may vary by ±5% depending on actual print conditions."
        }
      ]
    },
    {
      title: "Materials & Quality",
      faqs: [
        {
          q: "What materials do you offer?",
          a: "We offer PLA Matte, PLA+, ABS, and PETG in various colors. Each material has different properties - PLA+ for general use, PETG for chemical resistance, ABS for heat resistance, and PLA Matte for aesthetic finish."
        },
        {
          q: "What colors are available?",
          a: "We stock White, Black, Red, Blue, Green, Gray, and several other colors. Available colors vary by material type. Contact us to confirm current color availability."
        },
        {
          q: "What's your print quality like?",
          a: "We use a Bambu Lab P1S printer with 0.2mm layer height standard, achieving ±0.1mm dimensional accuracy. All prints go through quality inspection before shipping."
        }
      ]
    },
    {
      title: "Printing & Delivery",
      faqs: [
        {
          q: "How long does printing take?",
          a: "Print time varies based on size and complexity. Small items (under 50g) typically take 1-2 days, larger items may take 3-5 days. We provide estimated delivery times with every quote."
        },
        {
          q: "Do you offer rush orders?",
          a: "Yes! Rush orders are available for an additional fee. Same-day printing is possible for small items, and we can arrange express delivery through Lalamove."
        },
        {
          q: "How do you ship orders?",
          a: "We offer pickup from our Bulacan location, standard shipping via LBC/J&T (1-3 days), and express delivery via Lalamove for Metro Manila (same-day)."
        },
        {
          q: "Do you provide tracking information?",
          a: "Yes, we provide tracking numbers for all shipped orders and send updates via Messenger throughout the process."
        }
      ]
    },
    {
      title: "Pricing & Payment",
      faqs: [
        {
          q: "How is pricing calculated?",
          a: "Price = (Material Weight × Price per gram) + ₱50 service fee + ₱20 packaging. Additional services like rush orders or special finishing have separate fees."
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept GCash, bank transfer, and cash on delivery (Metro Manila only). Payment is required before we start printing."
        },
        {
          q: "Do you offer student discounts?",
          a: "Yes! Students with valid ID get a 10% discount on orders. Just mention you're a student when requesting a quote."
        },
        {
          q: "Are there any hidden fees?",
          a: "No hidden fees. Our pricing is completely transparent. The only additional costs would be for optional services you specifically request."
        }
      ]
    },
    {
      title: "Technical Questions",
      faqs: [
        {
          q: "What's the maximum print size?",
          a: "Our Bambu Lab P1S can print up to 256×256×256mm. Larger models can sometimes be split into multiple parts and assembled."
        },
        {
          q: "Can you print moving parts or assemblies?",
          a: "Yes, we can print assemblies with moving parts, but clearances must be designed properly (minimum 0.3mm gap). We can provide design advice if needed."
        },
        {
          q: "Do you offer design services?",
          a: "We focus on printing rather than design, but we can provide basic modification suggestions and connect you with designers in our network."
        },
        {
          q: "Can you print food-safe items?",
          a: "PETG is food-contact safe, but 3D printed items have layer lines that can harbor bacteria. We recommend food-safe coatings for items in direct food contact."
        }
      ]
    },
    {
      title: "Business & Policies",
      faqs: [
        {
          q: "What is your beta service?",
          a: "We're currently in beta phase, meaning we have limited capacity and are still optimizing our processes. This allows us to offer competitive pricing while we grow."
        },
        {
          q: "What items won't you print?",
          a: "We don't print weapons, adult content, items violating intellectual property, medical devices, or anything illegal. Check our Terms of Service for the complete list."
        },
        {
          q: "What's your return policy?",
          a: "We guarantee print quality matching your file. If there's a printing error on our end, we'll reprint for free. Custom items can't be returned unless there's a quality issue."
        },
        {
          q: "How do I contact support?",
          a: "Reach us via Messenger (Teddy Tapiador) or email prismbox3dservice@gmail.com. We typically respond within a few hours during business hours."
        }
      ]
    }
  ];

  const handleFaqToggle = (categoryIndex, faqIndex) => {
    const key = `${categoryIndex}-${faqIndex}`;
    setActiveFaq(activeFaq === key ? null : key);
  };

  const handleContactMessenger = () => {
    window.open('https://m.me/tedtapiador', '_blank');
  };

  const fadeIn = {
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
      <div className="faq-page">
        {/* Hero Section */}
        <section className="faq-hero">
          <div className="faq-hero-content">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <div className="hero-icon">
                <QuestionIcon />
              </div>
              <h1>Frequently Asked Questions</h1>
              <p>
                Everything you need to know about our 3D printing services. 
                Can't find what you're looking for? Feel free to reach out!
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="faq-content">
          <div className="container">
            <motion.div 
              className="faq-categories"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              {faqCategories.map((category, categoryIndex) => (
                <motion.div 
                  key={categoryIndex} 
                  className="faq-category"
                  variants={fadeIn}
                >
                  <h2>{category.title}</h2>
                  <div className="faq-list">
                    {category.faqs.map((faq, faqIndex) => {
                      const key = `${categoryIndex}-${faqIndex}`;
                      const isActive = activeFaq === key;
                      
                      return (
                        <div key={faqIndex} className="faq-item">
                          <button 
                            className="faq-question"
                            onClick={() => handleFaqToggle(categoryIndex, faqIndex)}
                            aria-expanded={isActive}
                          >
                            <span>{faq.q}</span>
                            <motion.div 
                              className="faq-icon"
                              animate={{ rotate: isActive ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDownIcon />
                            </motion.div>
                          </button>
                          <AnimatePresence>
                            {isActive && (
                              <motion.div 
                                className="faq-answer"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <p>{faq.a}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="faq-cta">
          <motion.div 
            className="cta-content"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
          >
            <h2>Still Have Questions?</h2>
            <p>Can't find the answer you're looking for? Our team is here to help!</p>
            <div className="cta-buttons">
              <button className="btn btn-primary" onClick={handleContactMessenger}>
                <MessengerIcon />
                Chat with us on Messenger
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => window.location.href = 'mailto:prismbox3dservice@gmail.com'}
              >
                Send us an Email
              </button>
            </div>
          </motion.div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default FAQ;
