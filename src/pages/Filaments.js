import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Filaments.css';

// --- DATA MOVED OUTSIDE COMPONENT FOR PERFORMANCE ---
// This object is now a constant and will not be recreated on every render.
const FILAMENTSDATA = {
    'PLA Matte': { brand: "Polymaker", price: 3.50, inStock: true, colors: ["Beige", "Red", "Dark Blue"], density: 1.19, description: "A professional-grade PLA with a beautiful, non-reflective matte finish, ideal for hiding layer lines.", properties: ["Matte Finish", "Hides Layers", "Easy to Print"], applications: ["Aesthetic Prototypes", "Architectural Models"] },
    'PLA+': { brand: "eSUN", price: 3.75, inStock: true, colors: ["Beige"], density: 1.24, description: "A leading 3rd-party choice, known for its superb layer adhesion and minimal warping. Great value.", properties: ["Low Warping", "High Strength", "Vibrant Colors"], applications: ["Cosplay Props", "Figurines", "Large Models"] },
    'ABS': { brand: "Bambu Lab", price: 4.00, inStock: true, colors: ["Silver"], density: 1.04, description: "A durable, high-impact thermoplastic ideal for strong, functional parts that can withstand higher temperatures.", properties: ["High Impact Strength", "Heat Resistant", "Post-Processable"], applications: ["Functional/Mechanical Parts", "Automotive Prototypes"] },
    'PETG': { brand: "Overture", price: 4.00, inStock: true, colors: ["Silver"], density: 1.27, description: "Reliable and easy-to-print PETG, perfect for functional parts requiring good durability and chemical resistance.", properties: ["Chemical Resistant", "High Durability", "Low Shrinkage"], applications: ["Functional/Mechanical Parts", "Protective Covers"] },
    'Bambu Lab PLA Basic': { brand: "Bambu Lab", price: 5.20, inStock: false, colors: ["White", "Black", "Grey"], density: 1.24, description: "Official PLA from Bambu Lab, optimized for high-speed printing on the P1S. Features RFID for auto-detection.", properties: ["High-Speed Optimized", "RFID Enabled", "Consistent Quality"], applications: ["Prototyping", "Functional Parts", "Hobbyist Models"] },
    'Bambu Lab PETG-CF': { brand: "Bambu Lab", price: 7.70, inStock: false, colors: ["Carbon Black"], density: 1.25, description: "Carbon fiber reinforced PETG for strong, durable parts with a premium matte finish. High heat resistance.", properties: ["High Stiffness", "Glossy Carbon Fiber", "Creep Resistant"], applications: ["Drone Parts", "Brackets", "Engineering Prototypes"] },
    'Bambu Lab ASA': { brand: "Bambu Lab", price: 6.00, inStock: false, colors: ["Black", "White"], density: 1.07, description: "Engineered for outdoor use, offering exceptional UV, weather, and thermal resistance.", properties: ["UV Resistant", "Weatherproof", "High Impact Strength"], applications: ["Outdoor Fixtures", "Automotive Exteriors", "Garden Equipment"] },
    'Polymaker PolyLite PLA Pro': { brand: "Polymaker", price: 4.10, inStock: false, colors: ["Army Beige", "Teal"], density: 1.20, description: "A professional-grade PLA with toughness rivaling ABS. Excellent for high-impact functional prints.", properties: ["Exceptional Toughness", "Matte Finish", "Easy to Print"], applications: ["Jigs & Fixtures", "High-Durability Tools", "Mechanical Components"] },
};

const Filaments = () => {
    // State hooks
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeApplication, setActiveApplication] = useState('All');
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [notificationEmail, setNotificationEmail] = useState('');

    // Memoized values for performance
    const materials = useMemo(() => Object.entries(FILAMENTSDATA).map(([name, data]) => ({ name, ...data })), []);
    
    const categories = useMemo(() => ['All', 'In Stock', ...new Set(materials.map(m => m.brand))], [materials]);
    
    const applications = useMemo(() => ['All', ...new Set(materials.flatMap(m => m.applications))], [materials]);
    
    const filteredMaterials = useMemo(() => {
        return materials.filter(material => {
            const search = searchTerm.toLowerCase();
            const categoryMatch = activeCategory === 'All' || (activeCategory === 'In Stock' && material.inStock) || material.brand === activeCategory;
            const appMatch = activeApplication === 'All' || material.applications.includes(activeApplication);
            const searchMatch = material.name.toLowerCase().includes(search) || material.brand.toLowerCase().includes(search);
            return categoryMatch && appMatch && searchMatch;
        });
    }, [materials, searchTerm, activeCategory, activeApplication]);
    
    // Handlers and helper functions
    const handleNotificationSubmit = (e) => {
        e.preventDefault();
        alert(`Thank you! We will notify you at ${notificationEmail} when ${selectedMaterial.name} is back in stock.`);
        setNotificationEmail('');
        setSelectedMaterial(null);
    };

    const getColorStyle = (color) => {
        const colorMap = { 'white': '#ffffff', 'black': '#1a1a1a', 'grey': '#6b7280', 'red': '#ef4444', 'dark blue': '#00008B', 'beige': '#F5F5DC', 'silver': '#C0C0C0', 'jade white': '#f0fff4', 'bambu green': '#00ae42', 'carbon black': '#222222', 'space grey': '#4a4a4a', 'army beige': '#a59468', 'teal': '#008080', 'galaxy blue': '#2a4d69' };
        return colorMap[color.toLowerCase()] || '#9ca3af';
    };

    // Modal sub-component
    const Modal = ({ material, onClose }) => {
        if (!material) return null;
        return (
            <motion.div className="modal-overlay" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.div className="modal-content" onClick={e => e.stopPropagation()} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}>
                    <div className="modal-header">
                        <h2>{material.name}</h2>
                        <button className="close-btn" onClick={onClose}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <p className="modal-description">{material.description}</p>
                        <div className="info-section">
                            <h4>Specifications</h4>
                            <div className="specs-list">
                                <div className="spec-item"><span>Brand</span><span>{material.brand}</span></div>
                                <div className="spec-item"><span>Density</span><span>{material.density} g/cm³</span></div>
                                <div className="spec-item"><span>Price</span><span>₱{material.price.toFixed(2)} / gram</span></div>
                            </div>
                        </div>
                        <div className="info-section">
                            <h4>Available Colors</h4>
                            <div className="modal-colors-list">
                                {material.colors.map(color => (
                                    <div key={color} className="color-option">
                                        <div className="color-swatch-small" style={{ backgroundColor: getColorStyle(color) }}></div>
                                        <span className="color-name">{color}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="modal-actions">
                        {material.inStock ? (
                            <div>
                                <button className="select-btn" disabled>Start Printing</button>
                                <p className="future-feature-modal-text">Online configurator coming soon!</p>
                            </div>
                        ) : (
                            <form className="notify-form" onSubmit={handleNotificationSubmit}>
                                <input type="email" placeholder="Enter email for stock alert" value={notificationEmail} onChange={e => setNotificationEmail(e.target.value)} required />
                                <button type="submit" className="notify-btn">Notify Me</button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        );
    };

    // Main JSX Render
    return (
        <>
            <Header />
            <div className="filaments-page">
                <section className="page-intro-section">
                    <h1 className="page-title">Materials Catalog</h1>
                    <p className="page-subtitle">Premium filaments for every project, fully compatible with high-speed printers.</p>
                </section>
                
                <section className="application-filter-section">
                    <div className="filters-container">
                        <label className="filter-label">Filter by Use-Case:</label>
                        <div className="application-filters">
                            {applications.map(app => <button key={app} className={`application-btn ${activeApplication === app ? 'active' : ''}`} onClick={() => setActiveApplication(app)}>{app}</button>)}
                        </div>
                    </div>
                </section>
                
                <section className="filters-section">
                    <div className="filters-container">
                        <div className="search-box">
                            <input type="text" className="search-input" placeholder="Search by name, brand, or feature..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                        </div>
                        <div className="filter-controls">
                            <div className="category-filters">
                                {categories.map(cat => <button key={cat} className={`category-btn ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>{cat}</button>)}
                            </div>
                        </div>
                    </div>
                </section>
                
                <main className="materials-section">
                    <div className="materials-container">
                        <div className="materials-list-header">
                            <span>Material</span>
                            <span>Key Properties</span>
                            <span>Price</span>
                        </div>
                        <AnimatePresence>
                            {filteredMaterials.length > 0 ? (
                                filteredMaterials.map(material => (
                                    <motion.div key={material.name} className="material-item-row" onClick={() => setSelectedMaterial(material)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileHover={{ backgroundColor: '#f8f9fa' }}>
                                        <div className="material-info-col">
                                            <div className="color-swatch-small" style={{ backgroundColor: getColorStyle(material.colors[0]) }}></div>
                                            <div>
                                                <div className="material-name">{material.name}</div>
                                                <div className="material-brand">{material.brand}</div>
                                            </div>
                                        </div>
                                        <div className="material-properties-col">
                                            {material.properties.slice(0, 3).map(prop => <span key={prop} className="property-tag-small">{prop}</span>)}
                                        </div>
                                        <div className="material-price-col">
                                            <div className="price">₱{material.price.toFixed(2)}<span className="price-unit">/g</span></div>
                                            <div className={`stock-status ${material.inStock ? 'in-stock' : 'out-of-stock'}`}>{material.inStock ? 'In Stock' : 'Out of Stock'}</div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div className="no-results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <h3>No Materials Found</h3>
                                    <p>Your search for "{searchTerm}" did not match any materials.</p>
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
