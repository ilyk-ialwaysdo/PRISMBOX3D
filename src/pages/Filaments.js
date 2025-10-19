import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Filaments.css';

const FILAMENTS_DATA = {
    // --- Standard Filaments (Priced with 4.69x Markup) ---
    "eSUN PLA+": { brand: "eSUN", colors: ["Bone White", "Fire Engine Red", "Peak Green"], price: 3.75, density: 1.24, description: "The go-to choice for hobbyists. Known for superb layer adhesion and minimal warping at a great value.", properties: ["Low Warping", "High Strength", "Vibrant Colors"], applications: ["Cosplay Props", "Figurines", "Large Models"], compatibility: "P1S & AMS" },
    "Overture PETG": { brand: "Overture", colors: ["Space Gray", "Clear", "Jet Black"], price: 4.22, density: 1.27, description: "Reliable and easy-to-print PETG on cardboard spools, perfect for functional parts requiring durability.", properties: ["Chemical Resistant", "Low Shrinkage", "Eco-Friendly Spool"], applications: ["Phone Cases", "Protective Covers", "Mechanical Parts"], compatibility: "P1S (Requires Spool Adapter)" },
    "Bambu Lab PLA Basic": { brand: "Bambu Lab", colors: ["White", "Black", "Grey", "Jade White", "Bambu Green"], price: 4.69, density: 1.24, description: "Official PLA from Bambu Lab, optimized for high-speed printing on the P1S. Features RFID for auto-detection.", properties: ["High-Speed Optimized", "RFID Enabled", "Consistent Quality"], applications: ["Prototyping", "Functional Parts", "Hobbyist Models"], compatibility: "P1S & AMS" },
    "Polymaker PolyLite PLA Pro": { brand: "Polymaker", colors: ["Army Beige", "Teal", "Galaxy Blue"], price: 5.16, density: 1.20, description: "A professional-grade PLA with toughness rivaling ABS. Excellent for high-impact functional prints.", properties: ["Exceptional Toughness", "Matte Finish", "Easy to Print"], applications: ["Jigs & Fixtures", "High-Durability Tools", "Mechanical Components"], compatibility: "P1S & AMS" },

    // --- Abrasive Filaments (Priced with 4.69x Markup) ---
    "Bambu Lab PETG-CF": { brand: "Bambu Lab", colors: ["Carbon Black", "Space Grey"], price: 10.31, density: 1.25, description: "Carbon fiber reinforced PETG for strong, durable parts with a premium matte finish. High heat resistance.", properties: ["High Stiffness", "Glossy Carbon Fiber", "Creep Resistant"], applications: ["Drone Parts", "Brackets", "Engineering Prototypes"], compatibility: "P1S with Hardened Nozzle/Extruder" },
    "Polymaker PA6-GF": { brand: "Polymaker", colors: ["Natural Grey"], price: 14.06, density: 1.35, description: "Glass fiber reinforced Nylon 6, offering incredible stiffness, strength, and heat resistance.", properties: ["Glass Fiber Reinforced", "Extreme Stiffness", "High Thermal Resistance"], applications: ["Automotive Components", "Structural Parts", "Industrial Tools"], compatibility: "P1S with Hardened Nozzle/Extruder" },
    "Bambu Lab PAHT-CF": { brand: "Bambu Lab", colors: ["Carbon Black"], price: 15.00, density: 1.21, description: "PA12 and Carbon Fiber composite with low water absorption and outstanding mechanical and thermal properties.", properties: ["Extreme Strength", "High Heat Resistance", "Low Water Absorption"], applications: ["Jigs & Fixtures", "Injection Molds", "Production Parts"], compatibility: "P1S with Hardened Nozzle/Extruder" },
    "MatterHackers NylonX": { brand: "MatterHackers", colors: ["Carbon Fiber Black"], price: 15.94, density: 1.15, description: "A carbon fiber-filled nylon known for its stiffness, impact resistance, and high tensile strength.", properties: ["High Stiffness", "Impact Resistant", "Excellent Surface Finish"], applications: ["Gears", "Bearings", "High-Stress Parts"], compatibility: "P1S with Hardened Nozzle/Extruder" },
};


const getColorStyle = (color) => {
    const colorMap = { "White": "#ffffff", "Black": "#1a1a1a", "Grey": "#6b7280", "Blue": "#3b82f6", "Green": "#10b981", "Yellow": "#f59e0b", "Red": "#ef4444", "Orange": "#f97316", "Clear": "rgba(255,255,255,0.3)", "Sky Blue": "#0ea5e9", "Pink": "#ec4899", "Champagne Gold": "#d4af37", "Silver": "#94a3b8", "Pine Green": "#047857", "Space Navy": "#1e40af", "Jade White": "#f0fff4", "Bambu Green": "#00ae42", "Carbon Black": "#222222", "Space Grey": "#4a4a4a", "Army Beige": "#a59468", "Teal": "#008080", "Galaxy Blue": "#2a4d69", "Bone White": "#f9f6ee", "Fire Engine Red": "#ce2029", "Peak Green": "#2b5246", "Space Gray": "#5B6A72", "Jet Black": "#232323", "Macaron Blue": "#a2d5f2", "Mint Green": "#98ff98", "Pastel Pink": "#ffdfd3", "Carbon Fiber Black": "#1c1c1c", "Natural Grey": "#a9a9a9" };
    return colorMap[color] || '#9ca3af';
};

const Filaments = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedMaterial, setSelectedMaterial] = useState(null);

    const materials = useMemo(() => {
        return Object.entries(FILAMENTS_DATA).map(([name, data]) => ({ name, ...data }));
    }, []);

    const filteredMaterials = useMemo(() => {
        return materials
            .filter(material => {
                if (activeCategory === 'All') return true;
                if (activeCategory === 'Abrasive') return material.compatibility.includes('Hardened');
                return material.brand.includes(activeCategory) || material.name.includes(activeCategory);
            })
            .filter(material =>
                material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                material.brand.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [materials, searchTerm, activeCategory]);

    const categories = ['All', 'Abrasive', 'Bambu Lab', 'Polymaker', 'eSUN', 'Overture', 'MatterHackers', 'PLA', 'PETG', 'PAHT-CF', 'PA6-GF'];
    const totalMaterials = materials.length;
    const availableColors = materials.reduce((acc, mat) => acc + mat.colors.length, 0);

    const PrismLogo = ({ size = 20 }) => (
        <div className="logo-icon" style={{ width: size, height: size }}>
            <div className="cube-3d">
                {[...Array(6)].map((_, i) => <div key={i} className={`cube-face ${['front', 'back', 'right', 'left', 'top', 'bottom'][i]}`}></div>)}
            </div>
        </div>
    );

    const Modal = ({ material, onClose }) => {
        if (!material) return null;
        const price = (material.price).toFixed(2);

        return (
            <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
                <motion.div className="modal-content" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <div className="modal-title-section">
                            <div className="color-swatch-large" style={{ background: getColorStyle(material.colors[0]) }}></div>
                            <div>
                                <h2 className="modal-header-h2">{material.name}</h2>
                                <p className="modal-brand">{material.brand} High-Performance Filament</p>
                            </div>
                        </div>
                        <button className="close-btn" onClick={onClose}>&times;</button>
                    </div>
                    <p className="modal-description">{material.description}</p>
                    
                    <div className="pricing-section">
                         <div className="price-item-single">
                            <span className="price-label">Price</span>
                            <span className="price-value">₱{price}/g</span>
                        </div>
                    </div>

                    <div className="info-sections">
                        <div className="info-section">
                            <h4>Specifications</h4>
                            <div className="specs-list">
                                <div className="spec-item"><span className="spec-name">Brand</span><span className="spec-value">{material.brand}</span></div>
                                <div className="spec-item"><span className="spec-name">Density</span><span className="spec-value">{material.density} g/cm³</span></div>
                                <div className="spec-item"><span className="spec-name">Compatibility</span><span className="spec-value">{material.compatibility}</span></div>
                                <div className="spec-item"><span className="spec-name">Base Price</span><span className="spec-value">₱{material.price.toFixed(2)}/g</span></div>
                            </div>
                        </div>
                        <div className="info-section">
                            <h4>Key Properties</h4>
                            <div className="properties-list">
                                {material.properties.map(prop => <span key={prop} className="property-badge">{prop}</span>)}
                            </div>
                        </div>
                        <div className="info-section">
                            <h4>Common Applications</h4>
                            <div className="applications-list">
                                {material.applications.map(app => <div key={app} className="application-item"><span className="app-bullet">•</span>{app}</div>)}
                            </div>
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button className="select-btn" onClick={() => navigate('/configuration')}>Start Printing with {material.name}</button>
                    </div>
                </motion.div>
            </motion.div>
        );
    };

    return (
        <div className="filaments-page">
            <header className="filaments-header">
                <div className="header-container">
                    <div className="logo-section">
                        <div className="logo-group" onClick={() => navigate('/')}>
                            <PrismLogo />
                            <div>
                                <h1 className="logo-title">Prism Box 3D</h1>
                                <p className="logo-subtitle">3D Printing Services</p>
                            </div>
                        </div>
                    </div>
                    <div className="page-title-section">
                        <h1 className="page-title">Materials Catalog</h1>
                        <p className="page-subtitle">Premium Filaments for Every Project</p>
                    </div>
                    <div className="nav-links">
                        <button onClick={() => navigate('/')} className="nav-link">Home</button>
                        <button onClick={() => navigate('/configuration')} className="nav-link primary-button">Start Printing</button>
                    </div>
                </div>
            </header>
            
            <main>
                <section className="filaments-hero">
                    <div className="hero-container">
                        <div className="hero-stats">
                            <div className="stat">
                                <span className="stat-value">{totalMaterials}</span>
                                <span className="stat-label">Material Types</span>
                            </div>
                            <div className="stat">
                                <span className="stat-value">{availableColors}+</span>
                                <span className="stat-label">Colors Available</span>
                            </div>
                            <div className="stat">
                                <span className="stat-value stock-available">In Stock</span>
                                <span className="stat-label">Current Status</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="filters-section">
                    <div className="filters-container">
                        <div className="search-box">
                             <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.5 11.5L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.5"/></svg>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search by name, brand, or feature..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="filter-controls">
                            <div className="category-filters">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
                                       onClick={() => setActiveCategory(cat)}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="materials-section">
                    <div className="materials-container">
                        <AnimatePresence>
                            {filteredMaterials.length > 0 ? (
                                <div className="materials-list">
                                    {filteredMaterials.map((material, index) => (
                                        <motion.div
                                            key={material.name}
                                            className="material-item"
                                            onClick={() => setSelectedMaterial(material)}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            whileHover={{ y: -5, boxShadow: "0 8px 25px rgba(0,0,0,0.1)" }}
                                        >
                                            <div className="material-main">
                                                <div className="material-visual">
                                                    <div className="color-swatch" style={{ background: getColorStyle(material.colors[0]) }}></div>
                                                </div>
                                                <div className="material-info">
                                                    <div className="material-header-info">
                                                        <h3 className="material-name">{material.name}</h3>
                                                        <p className="material-brand">{material.brand}</p>
                                                    </div>
                                                    <p className="material-description">{material.description}</p>
                                                    <div className="material-properties-compact">
                                                        {material.properties.slice(0, 3).map(prop => <span key={prop} className="property-tag-small">{prop}</span>)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="material-details">
                                                 <div className="price-display">
                                                    <p className="price">₱{(material.price).toFixed(2)}<span className="price-unit">/g</span></p>
                                                    <p className="stock-status in-stock">
                                                        <span className="stock-indicator-dot"></span>
                                                        In Stock
                                                    </p>
                                                 </div>
                                                <button className="view-btn">View Details</button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <motion.div className="no-results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <div className="no-results-icon">😢</div>
                                    <h3>No Materials Found</h3>
                                    <p>Your search for "{searchTerm}" did not match any materials.</p>
                                    <button className="reset-btn" onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}>Reset Filters</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </section>
                 <AnimatePresence>
                    {selectedMaterial && <Modal material={selectedMaterial} onClose={() => setSelectedMaterial(null)} />}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default Filaments;
