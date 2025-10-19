import React from 'react';
import { motion } from 'framer-motion';

const FAQ = () => {
  // You can easily expand this list with more questions and answers in the future
  const allFaqs = [
    { 
      question: "What is the average cost of a print?", 
      answer: "Our pricing is based on material weight, print time, and complexity. A typical palm-sized model might range from ₱300-₱800. We are currently developing an instant online price calculator for precise quotes." 
    },
    { 
      question: "How long does it take to get my order?", 
      answer: "Standard orders are typically printed and ready for dispatch within 2-4 business days. Complex or large volume orders may take longer. We'll give you a time estimate when you place your order." 
    },
    { 
      question: "What file formats do you accept?", 
      answer: "We primarily work with .STL and .3MF files, which are the most common formats for 3D printing. If you have another file type, such as .OBJ or .STEP, please contact us and we will see if we can convert it for you." 
    },
    { 
      question: "Do you offer shipping?", 
      answer: "Yes! We ship nationwide. For Metro Manila and nearby areas, we use Lalamove for same-day delivery once the print is complete. Provincial shipping is also available through our courier partners." 
    },
    { 
      question: "Can you help me design a 3D model?", 
      answer: "Currently, our service is focused on printing customer-provided files. We do not offer 3D modeling or design services at this time. However, we can recommend freelance designers if needed." 
    },
    { 
      question: "What is the maximum size you can print?", 
      answer: "Our printers have a build volume of 256 x 256 x 256 mm. If your model is larger, we may be able to print it in separate parts that can be assembled." 
    },
    {
      question: "What materials can I choose from?",
      answer: "We offer a wide range of materials from standard PLA+ and durable PETG/ABS to advanced engineering resins for high-performance applications. You can view our full, up-to-date catalog on the Filaments page."
    },
    {
      question: "Where are you located?",
      answer: "Our workshop is based in Bulacan, Philippines. While we don't currently have a physical storefront, we proudly serve and ship to the entire country."
    }
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '4rem auto' }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '3rem', fontWeight: '800' }}>Frequently Asked Questions</h1>
        <p style={{ textAlign: 'center', color: '#6c757d', fontSize: '1.1rem', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem auto' }}>
          Have questions? We’ve got answers. If you can’t find what you’re looking for, feel free to contact us directly.
        </p>
      </motion.div>
      <div>
        {allFaqs.map((faq, index) => (
          <motion.div 
            key={index} 
            style={{ marginBottom: '1.5rem', borderBottom: '1px solid #e0e0e0', paddingBottom: '1.5rem' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem', fontWeight: '600' }}>{faq.question}</h3>
            <p style={{ lineHeight: '1.6', color: '#495057', margin: 0 }}>{faq.answer}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
