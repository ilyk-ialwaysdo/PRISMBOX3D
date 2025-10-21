import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Filaments.css';

// SVG Icons
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20,6 9,17 4,12"/>
  </svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
);

const FlameIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="16" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12.01" y2="8"/>
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
            'white': '#ffffff', 'black': '#1a1a1a', 'grey': '#6b7280', 'red': '#ef4444', 
            'dark blue': '#1e3a8a', 'beige': '#F5F5DC', 'silver': '#C0C0C0', 
            'carbon black': '#222222', 'clear': 'rgba(240, 248, 255, 0.8)',
            'natural wood': '#8b4513', 'dark wood': '#654321', 'blue': '#3b82f6',
            'silk gold': '#ffd700', 'silk silver': '#C0C0C0', 'silk red': '#dc2626',
            'silk blue': '#2563eb', 'natural': '#f5f5dc'
        };
        return colorMap[color.toLowerCase()] || '#9ca3af';
    };

    const getCategoryIcon = (category) => {
        switch(category) {
            case 'Standard': return <CheckIcon />;
            case 'Premium': return <FlameIcon />;
            case 'Ultra-Premium': return <StarIcon />;
            default: return null;
        }
    };

    // IMPROVED Modal - Removed Print Specs + Better Layout
    const Modal = ({ material, onClose }) => {
        if (!material) return null;
        
        const availableColors = material.colors.filter(color => color.available);
        const unavailableColors = material.colors.filter(color => !color.available);
        
        return (
            <motion.div className="modal-overlay" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.div className="modal-content" onClick={e => e.stopPropagation()} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}>
                    
                    {/* IMPROVED HEADER */}
                    <div className="modal-header">
                        <div className="header-content">
                            <div className="title-section">
                                <h2>{material.name}</h2>
                                <div className="badges-row">
                                    <span className="brand-badge">{material.brand}</span>
                                    <span className={`category-badge ${material.category.toLowerCase()}`}>
                                        {getCategoryIcon(material.category)}
                                        {material.category}
                                    </span>
                                </div>
                            </div>
                            <div className="price-display">
                                <span className="modal-price">₱{material.price.toFixed(2)}</span>
                                <span className="modal-price-unit">per gram</span>
                            </div>
                        </div>
                        <button className="close-btn" onClick={onClose}>
                            <XIcon />
                        </button>
                    </div>
                    
                    <div className="modal-body">
                        {/* AVAILABILITY STATUS */}
                        <div className={`availability-banner ${material.inStock ? 'available' : 'unavailable'}`}>
                            {material.inStock ? (
                                <><CheckIcon /> Available Now - Ready to Print</>
                            ) : (
                                <><ClockIcon /> Coming Soon - Pre-order Available</>
                            )}
                        </div>

                        {/* DESCRIPTION */}
                        <div className="description-section">
                            <p className="main-description">{material.description}</p>
                            {material.requiresUpgrade && (
                                <div className="upgrade-notice">
                                    <InfoIcon />
                                    <span>Requires P1S upgrade: {material.requiresUpgrade}</span>
                                </div>
                            )}
                        </div>
                        
                        {/* PROPERTIES & APPLICATIONS - SIDE BY SIDE */}
                        <div className="info-grid">
                            <div className="info-section">
                                <h4>Key Properties</h4>
                                <div className="properties-grid">
                                    {material.properties.map(prop => (
                                        <div key={prop} className="property-item">
                                            <CheckIcon />
                                            <span>{prop}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="info-section">
                                <h4>Perfect For</h4>
                                <div className="applications-grid">
                                    {material.applications.map(app => (
                                        <div key={app} className="application-item">
                                            <div className="bullet"></div>
                                            <span>{app}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* COLORS SECTION - IMPROVED LAYOUT */}
                        <div className="colors-section">
                            <h4>Available Colors</h4>
                            <div className="colors-container">
                                <div className="colors-grid">
                                    {material.colors.map(color => (
                                        <div key={color.name} className={`color-card ${color.available ? 'available' : 'unavailable'}`}>
                                            <div className="color-swatch-container">
                                                <div 
                                                    className="color-swatch" 
                                                    style={{ backgroundColor: getColorStyle(color.name) }}
                                                ></div>
                                                {!color.available && (
                                                    <div className="unavailable-overlay">
                                                        <XIcon />
                                                    </div>
                                                )}
                                            </div>
                                            <span className="color-name">{color.name}</span>
                                            <span className={`color-status ${color.available ? 'available' : 'unavailable'}`}>
                                                {color.available ? 'In Stock' : 'Coming Soon'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        );
    };

    // Main render
    return (
        <>
            <Header />
            <div className="filaments-page">
                <section className="page-intro-section">
                    <h1 className="page-title">Filament Guide</h1>
                    <p className="page-subtitle">Complete catalog of P1S-compatible materials with optimized pricing.</p>
                </section>
                
                <section className="application-filter-section">
                    <div className="filters-container">
                        <label className="filter-label">Filter by Application:</label>
                        <div className="application-filters">
                            {applications.map(app => 
                                <button key={app} className={`application-btn ${activeApplication === app ? 'active' : ''}`} 
                                        onClick={() => setActiveApplication(app)}>{app}</button>
                            )}
                        </div>
                    </div>
                </section>
                
                <section className="filters-section">
                    <div className="filters-container">
                        <div className="search-box">
                            <input type="text" className="search-input" placeholder="Search filaments..." 
                                   value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                        </div>
                        <div className="filter-controls">
                            <div className="category-filters">
                                {categories.map(cat => 
                                    <button key={cat} className={`category-btn ${activeCategory === cat ? 'active' : ''}`} 
                                            onClick={() => setActiveCategory(cat)}>{cat}</button>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
                
                <main className="materials-section">
                    <div className="materials-grid">
                        <AnimatePresence>
                            {filteredMaterials.length > 0 ? (
                                filteredMaterials.map(material => (
                                    <motion.div 
                                        key={material.name} 
                                        className={`material-card ${material.category.toLowerCase()} ${!material.inStock ? 'coming-soon' : ''}`}
                                        onClick={() => setSelectedMaterial(material)} 
                                        initial={{ opacity: 0, y: 20 }} 
                                        animate={{ opacity: 1, y: 0 }} 
                                        exit={{ opacity: 0, y: -20 }}
                                        whileHover={{ y: -4 }}
                                        layout
                                    >
                                        <div className="card-header">
                                            <div className="material-info">
                                                <h3 className="material-name">{material.name}</h3>
                                                <p className="material-brand">{material.brand}</p>
                                            </div>
                                            <div className="price-and-category">
                                                <div className="price-section">
                                                    <span className="price">₱{material.price.toFixed(2)}</span>
                                                    <span className="price-unit">/gram</span>
                                                </div>
                                                <span className={`category-tag ${material.category.toLowerCase()}`}>
                                                    {getCategoryIcon(material.category)}
                                                    {material.category}
                                                </span>
                                            </div>
                                        </div>

                                        <p className="material-description">{material.description}</p>

                                        <div className="properties-preview">
                                            {material.properties.map(prop => (
                                                <span key={prop} className="property-tag">{prop}</span>
                                            ))}
                                        </div>

                                        <div className="colors-preview">
                                            <span className="colors-label">Colors:</span>
                                            <div className="colors-row">
                                                {material.colors.slice(0, 3).map(color => (
                                                    <div key={color.name} className="color-preview">
                                                        <div 
                                                            className="color-dot"
                                                            style={{ backgroundColor: getColorStyle(color.name) }}
                                                        ></div>
                                                        {!color.available && (
                                                            <div className="unavailable-mark">
                                                                <XIcon />
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                                {material.colors.length > 3 && (
                                                    <span className="more-colors">+{material.colors.length - 3}</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="card-footer">
                                            <div className={`stock-indicator ${material.inStock ? 'available' : 'unavailable'}`}>
                                                {material.inStock ? (
                                                    <><CheckIcon /> Available</>
                                                ) : (
                                                    <><ClockIcon /> Coming Soon</>
                                                )}
                                            </div>
                                            <span className="view-more">View Details →</span>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div className="no-results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <h3>No Materials Found</h3>
                                    <p>Try adjusting your search or filters.</p>
                                    <button className="reset-btn" onClick={() => { setSearchTerm(''); setActiveCategory('All'); setActiveApplication('All'); }}>Reset Filters</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </main>

                <AnimatePresence>
                    {selectedMaterial && <Modal material={selectedMaterial} onClose={() => setSelectedMaterial(null)} />}
                </AnimatePresence>
            </div>
            <Footer />
        </>
    );
};

export default Filaments;
