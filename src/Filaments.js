import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
// REMOVED: import './Filaments.css'; - TEMPORARILY REMOVED FOR WORKING WEBSITE

// SVG Icons
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20,6 9,17 4,12"></polyline>
  </svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="21 21l-4.35-4.35"></path>
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"></polygon>
  </svg>
);

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

// COMPLETE P1S COMPATIBLE FILAMENTS WITH NEW TIERED PRICING
const FILAMENTSDATA = {
  // === STANDARD MATERIALS (317% markup) - IN STOCK ===
  'PLA+': {
    brand: "eSUN",
    price: 3.75,
    inStock: true,
    colors: [
      { name: "Beige", available: true },
      { name: "White", available: false },
      { name: "Black", available: false }
    ],
    density: 1.24,
    description: "Enhanced PLA with superior strength and minimal warping. Perfect for functional parts.",
    properties: ["High Strength", "Low Warping", "Durable"],
    applications: ["Functional Parts", "Tools", "Mechanical Components"],
    difficulty: "Beginner",
    category: "Standard"
  },
  'PETG': {
    brand: "Overture",
    price: 2.92,
    inStock: true,
    colors: [
      { name: "Silver", available: true },
      { name: "Clear", available: false }
    ],
    density: 1.27,
    description: "Chemical resistant with excellent durability for demanding applications.",
    properties: ["Chemical Resistant", "Durable", "Clear Options"],
    applications: ["Chemical Storage", "Food Containers", "Durable Parts"],
    difficulty: "Intermediate",
    category: "Standard"
  },
  'ABS': {
    brand: "Bambu Lab",
    price: 3.13,
    inStock: true,
    colors: [
      { name: "Silver", available: true }
    ],
    density: 1.04,
    description: "Heat-resistant thermoplastic for demanding applications and automotive parts.",
    properties: ["Heat Resistant", "Impact Strong", "Durable"],
    applications: ["Automotive Parts", "Heat Resistant Items", "Mechanical Parts"],
    difficulty: "Intermediate",
    category: "Standard"
  },
  
  // === PREMIUM MATERIALS (250% markup) ===
  'PLA Matte': {
    brand: "Polymaker",
    price: 4.37,
    inStock: true,
    colors: [
      { name: "Beige", available: true },
      { name: "Red", available: true },
      { name: "Dark Blue", available: false },
      { name: "White", available: false }
    ],
    density: 1.19,
    description: "Professional matte finish PLA that hides layer lines perfectly.",
    properties: ["Matte Finish", "Hides Layers", "Professional"],
    applications: ["Aesthetic Models", "Prototypes", "Display Items"],
    difficulty: "Beginner",
    category: "Premium"
  },
  'TPU': {
    brand: "eSUN",
    price: 5.25,
    inStock: false,
    colors: [
      { name: "Black", available: false },
      { name: "White", available: false },
      { name: "Red", available: false }
    ],
    density: 1.20,
    description: "Flexible thermoplastic perfect for rubber-like applications.",
    properties: ["Flexible", "Impact Resistant", "Rubber-Like"],
    applications: ["Phone Cases", "Gaskets", "Flexible Components"],
    difficulty: "Advanced",
    category: "Premium"
  },
  'ASA': {
    brand: "Bambu Lab",
    price: 3.85,
    inStock: false,
    colors: [
      { name: "Black", available: false },
      { name: "White", available: false }
    ],
    density: 1.07,
    description: "UV and weather resistant for outdoor applications and automotive exteriors.",
    properties: ["UV Resistant", "Weatherproof", "Outdoor Safe"],
    applications: ["Outdoor Parts", "Automotive Exteriors", "Weather Exposed Items"],
    difficulty: "Advanced",
    category: "Premium"
  },
  'PLA Wood Fill': {
    brand: "Hatchbox",
    price: 4.44,
    inStock: false,
    colors: [
      { name: "Natural Wood", available: false },
      { name: "Dark Wood", available: false }
    ],
    density: 1.15,
    description: "PLA with real wood particles - can be stained and sanded like real wood.",
    properties: ["Real Wood", "Sandable", "Unique Texture"],
    applications: ["Decorative Items", "Art Projects", "Wooden Look Items"],
    difficulty: "Intermediate",
    category: "Premium"
  },
  'PETG-CF': {
    brand: "Bambu Lab",
    price: 7.70,
    inStock: false,
    colors: [
      { name: "Carbon Black", available: false }
    ],
    density: 1.25,
    description: "Carbon fiber reinforced PETG for maximum strength applications.",
    properties: ["Carbon Fiber", "Ultra Strong", "Premium Finish"],
    applications: ["Drone Parts", "High-Stress Components", "Engineering"],
    difficulty: "Advanced",
    category: "Premium",
    requiresUpgrade: "Hardened nozzle + extruder required"
  },
  
  // === NEW STANDARD MATERIALS - COMING SOON ===
  'PLA Basic': {
    brand: "ELEGOO",
    price: 2.29,
    inStock: false,
    colors: [
      { name: "White", available: false },
      { name: "Black", available: false },
      { name: "Red", available: false },
      { name: "Blue", available: false }
    ],
    density: 1.24,
    description: "High-quality basic PLA perfect for general printing and prototypes.",
    properties: ["Reliable", "Easy Print", "Budget Friendly"],
    applications: ["General Printing", "Prototypes", "Educational Projects"],
    difficulty: "Beginner",
    category: "Standard"
  },
  'PLA Silk': {
    brand: "SUNLU",
    price: 3.42,
    inStock: false,
    colors: [
      { name: "Silk Gold", available: false },
      { name: "Silk Silver", available: false },
      { name: "Silk Red", available: false },
      { name: "Silk Blue", available: false }
    ],
    density: 1.24,
    description: "Shiny silk finish PLA for decorative and aesthetic applications.",
    properties: ["Silk Finish", "Decorative", "Vibrant Colors"],
    applications: ["Decorative Items", "Vases", "Artistic Projects"],
    difficulty: "Beginner",
    category: "Standard"
  },
  
  // === ULTRA-PREMIUM MATERIALS (200% markup) - SPECIAL ORDER ===
  'PAHT-CF': {
    brand: "Bambu Lab",
    price: 12.00,
    inStock: false,
    colors: [
      { name: "Carbon Black", available: false }
    ],
    density: 1.40,
    description: "High-temperature carbon fiber composite for aerospace and automotive applications.",
    properties: ["High Temperature", "Carbon Fiber", "Aerospace Grade"],
    applications: ["Aerospace Components", "High-Temp Applications", "Professional Prototypes"],
    difficulty: "Expert",
    category: "Ultra-Premium",
    requiresUpgrade: "Hardened nozzle + extruder + enclosure required"
  },
  'PA6-GF (Glass Fiber Nylon)': {
    brand: "Bambu Lab",
    price: 10.50,
    inStock: false,
    colors: [
      { name: "Natural", available: false },
      { name: "Black", available: false }
    ],
    density: 1.35,
    description: "Glass fiber reinforced nylon for exceptional strength and stiffness.",
    properties: ["Glass Fiber", "Ultra Strong", "Engineering Grade"],
    applications: ["Industrial Parts", "Gears", "Structural Components"],
    difficulty: "Expert",
    category: "Ultra-Premium",
    requiresUpgrade: "Hardened nozzle + extruder required"
  }
};

const Filaments = () => {
  // State hooks
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeApplication, setActiveApplication] = useState('All');
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const navigate = useNavigate();

  // Memoized values
  const materials = useMemo(() => Object.entries(FILAMENTSDATA).map(([name, data]) => ({ name, ...data })), []);
  const categories = useMemo(() => ['All', 'In Stock', 'Standard', 'Premium', 'Ultra-Premium', ...new Set(materials.map(m => m.brand))], [materials]);
  const applications = useMemo(() => ['All', ...new Set(materials.flatMap(m => m.applications))], [materials]);
  
  const filteredMaterials = useMemo(() => {
    return materials.filter(material => {
      const search = searchTerm.toLowerCase();
      const categoryMatch = activeCategory === 'All' || 
        (activeCategory === 'In Stock' && material.inStock) ||
        material.category === activeCategory ||
        material.brand === activeCategory;
      const appMatch = activeApplication === 'All' || material.applications.includes(activeApplication);
      const searchMatch = material.name.toLowerCase().includes(search) || material.brand.toLowerCase().includes(search);
      return categoryMatch && appMatch && searchMatch;
    });
  }, [materials, searchTerm, activeCategory, activeApplication]);

  const getColorStyle = (color) => {
    const colorMap = {
      'white': '#ffffff',
      'black': '#1a1a1a',
      'grey': '#6b7280',
      'red': '#ef4444',
      'dark blue': '#1e3a8a',
      'beige': '#F5F5DC',
      'silver': '#C0C0C0',
      'carbon black': '#222222',
      'clear': 'rgba(240, 248, 255, 0.8)',
      'natural wood': '#8b4513',
      'dark wood': '#654321',
      'blue': '#3b82f6',
      'silk gold': '#ffd700',
      'silk silver': '#C0C0C0',
      'silk red': '#dc2626',
      'silk blue': '#2563eb',
      'natural': '#f5f5dc'
    };
    return colorMap[color.toLowerCase()] || '#9ca3af';
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Standard': return '🏷️';
      case 'Premium': return '⭐';
      case 'Ultra-Premium': return '💎';
      default: return '📦';
    }
  };

  // Inline Styles for Professional Filaments Page
  const styles = {
    filamentsPage: {
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
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 2rem'
    },
    filtersSection: {
      background: 'white',
      padding: '40px 2rem',
      borderBottom: '1px solid #e0e0e0'
    },
    searchBox: {
      position: 'relative',
      maxWidth: '400px',
      margin: '0 auto 2rem'
    },
    searchInput: {
      width: '100%',
      padding: '12px 40px 12px 16px',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      fontSize: '1rem',
      outline: 'none'
    },
    searchIcon: {
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#666'
    },
    filterTabs: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      justifyContent: 'center',
      marginBottom: '20px'
    },
    filterTab: {
      padding: '8px 16px',
      border: 'none',
      borderRadius: '20px',
      fontSize: '0.9rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    activeTab: {
      background: 'linear-gradient(135deg, #FF6B35, #F7931E)',
      color: 'white'
    },
    inactiveTab: {
      background: '#f0f0f0',
      color: '#666'
    },
    materialsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '2rem',
      padding: '40px 2rem'
    },
    materialCard: {
      background: 'white',
      borderRadius: '15px',
      padding: '25px',
      boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
      border: '2px solid #f0f0f0',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    inStockCard: {
      border: '2px solid #28a745'
    },
    outOfStockCard: {
      border: '2px solid #dc3545',
      opacity: 0.7
    },
    materialHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '15px'
    },
    materialName: {
      fontSize: '1.4rem',
      fontWeight: 'bold',
      color: '#333',
      margin: 0
    },
    materialBrand: {
      fontSize: '0.9rem',
      color: '#666',
      marginTop: '5px'
    },
    stockBadge: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '0.8rem',
      fontWeight: 'bold'
    },
    inStockBadge: {
      background: '#d4edda',
      color: '#155724'
    },
    outOfStockBadge: {
      background: '#f8d7da',
      color: '#721c24'
    },
    price: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: '#FF6B35',
      marginBottom: '15px'
    },
    description: {
      color: '#666',
      lineHeight: 1.6,
      marginBottom: '20px'
    },
    properties: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginBottom: '15px'
    },
    propertyTag: {
      background: '#e3f2fd',
      color: '#1976d2',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '0.8rem',
      fontWeight: '500'
    },
    colorsSection: {
      marginTop: '20px'
    },
    colorsTitle: {
      fontSize: '0.9rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '10px'
    },
    colorDots: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap'
    },
    colorDot: {
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      border: '2px solid #ddd',
      position: 'relative'
    },
    availableColor: {
      border: '2px solid #28a745'
    },
    unavailableColor: {
      border: '2px solid #dc3545',
      opacity: 0.5
    },
    noResults: {
      textAlign: 'center',
      padding: '80px 2rem',
      color: '#666'
    },
    noResultsTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '10px'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '20px'
    },
    modalContent: {
      background: 'white',
      borderRadius: '15px',
      padding: '30px',
      maxWidth: '600px',
      width: '100%',
      maxHeight: '80vh',
      overflow: 'auto'
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '20px'
    },
    modalTitle: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: '#333'
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: '#666'
    },
    modalPrice: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#FF6B35',
      marginBottom: '20px'
    },
    modalDescription: {
      color: '#666',
      lineHeight: 1.6,
      marginBottom: '25px'
    },
    modalSection: {
      marginBottom: '20px'
    },
    modalSectionTitle: {
      fontSize: '1.1rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '10px'
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <>
      <Header />
      <div style={styles.filamentsPage}>
        {/* Hero Section */}
        <motion.section 
          style={styles.hero}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div style={styles.container}>
            <h1 style={styles.heroTitle}>Premium 3D Printing Materials</h1>
            <p style={styles.heroText}>
              Complete catalog of P1S-compatible materials with optimized pricing
            </p>
          </div>
        </motion.section>

        {/* Filters Section */}
        <section style={styles.filtersSection}>
          <div style={styles.container}>
            {/* Search */}
            <div style={styles.searchBox}>
              <input
                type="text"
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
              <div style={styles.searchIcon}>
                <SearchIcon />
              </div>
            </div>

            {/* Category Filters */}
            <div style={styles.filterTabs}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  style={{
                    ...styles.filterTab,
                    ...(activeCategory === category ? styles.activeTab : styles.inactiveTab)
                  }}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Application Filters */}
            <div style={styles.filterTabs}>
              {applications.slice(0, 8).map((app) => (
                <button
                  key={app}
                  onClick={() => setActiveApplication(app)}
                  style={{
                    ...styles.filterTab,
                    ...(activeApplication === app ? styles.activeTab : styles.inactiveTab)
                  }}
                >
                  {app}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Materials Grid */}
        <section style={{ padding: '40px 0' }}>
          <div style={styles.container}>
            {filteredMaterials.length === 0 ? (
              <div style={styles.noResults}>
                <h3 style={styles.noResultsTitle}>No Materials Found</h3>
                <p>Try adjusting your search or filters.</p>
              </div>
            ) : (
              <motion.div 
                style={styles.materialsGrid}
                initial="hidden"
                animate="visible"
                variants={stagger}
              >
                {filteredMaterials.map((material, index) => (
                  <motion.div
                    key={material.name}
                    style={{
                      ...styles.materialCard,
                      ...(material.inStock ? styles.inStockCard : styles.outOfStockCard)
                    }}
                    variants={fadeIn}
                    onClick={() => setSelectedMaterial(material)}
                    whileHover={{ y: -5, boxShadow: '0 8px 25px rgba(0,0,0,0.15)' }}
                  >
                    {/* Header */}
                    <div style={styles.materialHeader}>
                      <div>
                        <h3 style={styles.materialName}>{material.name}</h3>
                        <div style={styles.materialBrand}>{material.brand}</div>
                      </div>
                      <div style={{
                        ...styles.stockBadge,
                        ...(material.inStock ? styles.inStockBadge : styles.outOfStockBadge)
                      }}>
                        {material.inStock ? <CheckIcon /> : <XIcon />}
                        {material.inStock ? 'In Stock' : 'Out of Stock'}
                      </div>
                    </div>

                    {/* Price */}
                    <div style={styles.price}>
                      ₱{material.price.toFixed(2)}/gram
                    </div>

                    {/* Description */}
                    <p style={styles.description}>{material.description}</p>

                    {/* Properties */}
                    <div style={styles.properties}>
                      {material.properties.map((prop, i) => (
                        <span key={i} style={styles.propertyTag}>{prop}</span>
                      ))}
                    </div>

                    {/* Colors */}
                    <div style={styles.colorsSection}>
                      <div style={styles.colorsTitle}>Available Colors:</div>
                      <div style={styles.colorDots}>
                        {material.colors.map((color, i) => (
                          <div
                            key={i}
                            style={{
                              ...styles.colorDot,
                              background: getColorStyle(color.name),
                              ...(color.available ? styles.availableColor : styles.unavailableColor)
                            }}
                            title={`${color.name} ${color.available ? '(Available)' : '(Out of Stock)'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* Material Detail Modal */}
        <AnimatePresence>
          {selectedMaterial && (
            <motion.div
              style={styles.modal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMaterial(null)}
            >
              <motion.div
                style={styles.modalContent}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div style={styles.modalHeader}>
                  <div>
                    <h2 style={styles.modalTitle}>{selectedMaterial.name}</h2>
                    <div style={styles.materialBrand}>{selectedMaterial.brand}</div>
                  </div>
                  <button 
                    style={styles.closeButton}
                    onClick={() => setSelectedMaterial(null)}
                  >
                    ×
                  </button>
                </div>

                <div style={styles.modalPrice}>
                  ₱{selectedMaterial.price.toFixed(2)}/gram
                </div>

                <p style={styles.modalDescription}>{selectedMaterial.description}</p>

                <div style={styles.modalSection}>
                  <h3 style={styles.modalSectionTitle}>Key Properties</h3>
                  <div style={styles.properties}>
                    {selectedMaterial.properties.map((prop, i) => (
                      <span key={i} style={styles.propertyTag}>{prop}</span>
                    ))}
                  </div>
                </div>

                <div style={styles.modalSection}>
                  <h3 style={styles.modalSectionTitle}>Perfect For</h3>
                  <ul style={{ color: '#666', paddingLeft: '20px' }}>
                    {selectedMaterial.applications.map((app, i) => (
                      <li key={i}>{app}</li>
                    ))}
                  </ul>
                </div>

                <div style={styles.modalSection}>
                  <h3 style={styles.modalSectionTitle}>Available Colors</h3>
                  <div style={styles.colorDots}>
                    {selectedMaterial.colors.map((color, i) => (
                      <div
                        key={i}
                        style={{
                          ...styles.colorDot,
                          background: getColorStyle(color.name),
                          ...(color.available ? styles.availableColor : styles.unavailableColor),
                          width: '30px',
                          height: '30px'
                        }}
                        title={`${color.name} ${color.available ? '(Available)' : '(Out of Stock)'}`}
                      />
                    ))}
                  </div>
                </div>

                {selectedMaterial.requiresUpgrade && (
                  <div style={{
                    background: '#fff3cd',
                    border: '1px solid #ffeaa7',
                    padding: '15px',
                    borderRadius: '8px',
                    marginTop: '20px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                      <InfoIcon />
                      <strong style={{ color: '#856404' }}>Special Requirements</strong>
                    </div>
                    <p style={{ color: '#856404', margin: 0, fontSize: '0.9rem' }}>
                      {selectedMaterial.requiresUpgrade}
                    </p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
};

export default Filaments;