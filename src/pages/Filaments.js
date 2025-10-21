import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Filaments.css';

// SVG Icons
const MaterialIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
    <path d="M2 17l10 5 10-5"/>
    <path d="M2 12l10 5 10-5"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20,6 9,17 4,12"/>
  </svg>
);

const MessengerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.93 1.17 5.56 3 7.26V22l2.91-1.61c1.25.35 2.6.54 4.09.54 5.64 0 10.2-4.13 10.2-9.23S17.64 2 12 2zm1.13 12.44l-2.61-2.78-5.09 2.78L8.5 9.89l2.61 2.78 5.09-2.78-3.07 4.55z"/>
  </svg>
);

const Filaments = () => {
  const navigate = useNavigate();

  const materials = [
    {
      name: "PLA Matte",
      price: "₱8/gram",
      description: "Premium matte finish filament perfect for decorative prints",
      properties: {
        difficulty: "Beginner Friendly",
        strength: "Low-Medium",
        temperature: "190-220°C",
        heatResistance: "60°C",
        flexibility: "Rigid"
      },
      applications: [
        "Decorative items",
        "Prototypes", 
        "Figurines",
        "Educational models",
        "Art projects"
      ],
      colors: ["White", "Black", "Gray", "Red", "Blue", "Green"],
      pros: [
        "Easy to print",
        "Beautiful matte finish",
        "No odor during printing",
        "Biodegradable",
        "Great surface finish"
      ],
      cons: [
        "Limited heat resistance",
        "Can be brittle",
        "Not suitable for functional parts"
      ]
    },
    {
      name: "PLA+",
      price: "₱10/gram", 
      description: "Enhanced PLA with improved strength and durability",
      properties: {
        difficulty: "Beginner Friendly",
        strength: "Medium",
        temperature: "200-230°C",
        heatResistance: "70°C",
        flexibility: "Semi-Rigid"
      },
      applications: [
        "Functional parts",
        "Mechanical components",
        "Tools and fixtures",
        "Phone cases",
        "Storage containers"
      ],
      colors: ["White", "Black", "Red", "Blue", "Green", "Gray", "Orange"],
      pros: [
        "Stronger than regular PLA",
        "Still easy to print",
        "Good layer adhesion",
        "Minimal warping",
        "Good value for money"
      ],
      cons: [
        "Slightly higher printing temperature",
        "Limited heat resistance",
        "Not chemical resistant"
      ]
    },
    {
      name: "ABS",
      price: "₱12/gram",
      description: "Industrial-grade thermoplastic for demanding applications",
      properties: {
        difficulty: "Intermediate",
        strength: "High",
        temperature: "220-250°C",
        heatResistance: "100°C",
        flexibility: "Tough"
      },
      applications: [
        "Automotive parts",
        "Electronic housings",
        "Tools and fixtures",
        "Heat-resistant components",
        "Mechanical parts"
      ],
      colors: ["White", "Black", "Red", "Blue", "Natural"],
      pros: [
        "High strength and durability",
        "Good heat resistance",
        "Chemical resistant",
        "Can be post-processed",
        "Lightweight"
      ],
      cons: [
        "Requires heated bed",
        "Can warp during printing",
        "Produces odor when printing",
        "More challenging for beginners"
      ]
    },
    {
      name: "PETG",
      price: "₱14/gram",
      description: "Chemical-resistant with crystal clarity and strength",
      properties: {
        difficulty: "Intermediate", 
        strength: "High",
        temperature: "220-250°C",
        heatResistance: "80°C",
        flexibility: "Semi-Flexible"
      },
      applications: [
        "Food containers",
        "Chemical storage",
        "Transparent parts",
        "Medical devices",
        "Protective equipment"
      ],
      colors: ["Clear", "White", "Black", "Blue", "Red", "Green"],
      pros: [
        "Excellent chemical resistance",
        "Food-safe options available",
        "Good clarity when printed well",
        "Strong and durable",
        "Easy to post-process"
      ],
      cons: [
        "Can string during printing",
        "Requires precise temperature control",
        "More expensive than PLA",
        "Can stick too well to bed"
      ]
    }
  ];

  const handleContactMessenger = () => {
    window.open('https://m.me/tedtapiador', '_blank');
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <>
      <Header />
      <div className="filaments-page">
        {/* Hero Section */}
        <section className="filaments-hero">
          <div className="filaments-hero-content">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <div className="hero-icon">
                <MaterialIcon />
              </div>
              <h1>3D Printing Materials</h1>
              <p>
                Professional grade filaments for every application. From decorative prints to functional prototypes, 
                we have the right material for your project.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Materials Grid */}
        <section className="materials-content">
          <div className="container">
            <motion.div 
              className="materials-grid"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              {materials.map((material, index) => (
                <motion.div 
                  key={index} 
                  className="material-card"
                  variants={fadeIn}
                >
                  <div className="material-header">
                    <h3>{material.name}</h3>
                    <span className="material-price">{material.price}</span>
                  </div>
                  
                  <p className="material-description">{material.description}</p>

                  <div className="material-properties">
                    <h4>Properties</h4>
                    <div className="properties-grid">
                      <div className="property-item">
                        <span>Difficulty:</span>
                        <span>{material.properties.difficulty}</span>
                      </div>
                      <div className="property-item">
                        <span>Strength:</span>
                        <span>{material.properties.strength}</span>
                      </div>
                      <div className="property-item">
                        <span>Print Temp:</span>
                        <span>{material.properties.temperature}</span>
                      </div>
                      <div className="property-item">
                        <span>Heat Resistance:</span>
                        <span>{material.properties.heatResistance}</span>
                      </div>
                    </div>
                  </div>

                  <div className="material-applications">
                    <h4>Best For</h4>
                    <ul>
                      {material.applications.map((app, idx) => (
                        <li key={idx}>
                          <CheckIcon />
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="material-colors">
                    <h4>Available Colors</h4>
                    <div className="colors-list">
                      {material.colors.map((color, idx) => (
                        <span key={idx} className="color-tag">{color}</span>
                      ))}
                    </div>
                  </div>

                  <div className="material-pros-cons">
                    <div className="pros">
                      <h5>Pros</h5>
                      <ul>
                        {material.pros.map((pro, idx) => (
                          <li key={idx}>+ {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="cons">
                      <h5>Cons</h5>
                      <ul>
                        {material.cons.map((con, idx) => (
                          <li key={idx}>- {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Material Comparison Table */}
        <section className="materials-comparison">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
            >
              <h2>Material Comparison</h2>
              <div className="comparison-table">
                <table>
                  <thead>
                    <tr>
                      <th>Material</th>
                      <th>Price</th>
                      <th>Difficulty</th>
                      <th>Strength</th>
                      <th>Heat Resistance</th>
                      <th>Best Use Case</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materials.map((material, index) => (
                      <tr key={index}>
                        <td className="material-name">{material.name}</td>
                        <td>{material.price}</td>
                        <td>{material.properties.difficulty}</td>
                        <td>{material.properties.strength}</td>
                        <td>{material.properties.heatResistance}</td>
                        <td>{material.applications[0]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="filaments-cta">
          <motion.div 
            className="cta-content"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
          >
            <h2>Need Help Choosing?</h2>
            <p>Not sure which material is right for your project? Our team can help you select the perfect filament for your needs.</p>
            <div className="cta-buttons">
              <button className="btn btn-primary" onClick={handleContactMessenger}>
                <MessengerIcon />
                Get Material Advice
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => navigate('/pricing')}
              >
                View Pricing Details
              </button>
            </div>
          </motion.div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Filaments;
