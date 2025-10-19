import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Filaments.css';

const FILAMENTS_DATA = {
    "Polymaker PolyLite PLA Matte": { 
        brand: "Polymaker", 
        colors: [
            { name: "Red", inStock: true }, 
            { name: "Dark Blue", inStock: true }, 
            { name: "Beige", inStock: true }
        ], 
        price: 5.16, 
        description: "Professional-grade PLA with a beautiful, non-reflective matte finish. Excellent for aesthetic and functional prints.", 
        properties: ["Matte Finish", "Easy to Print"], 
        applications: ["Aesthetic Prototypes", "Architectural Models"] 
    },
    "Bambu Lab ABS": { 
        brand: "Bambu Lab", 
        colors: [{ name: "Silver", inStock: true }], 
        price: 4.69, 
        description: "A durable, high-impact thermoplastic ideal for strong, functional parts that can withstand higher temperatures.", 
        properties: ["High Impact Strength", "Heat Resistant"], 
        applications: ["Functional/Mechanical Parts", "Automotive Prototypes"] 
    },
    "Overture PETG": { 
        brand: "Overture", 
        colors: [{ name: "Silver", inStock: true }], 
        price: 4.22, 
        description: "Reliable and easy-to-print PETG, perfect for functional parts requiring good durability and chemical resistance.", 
        properties: ["Chemical Resistant", "High Durability"], 
        applications: ["Functional/Mechanical Parts", "Protective Covers"] 
    },
    "eSUN PLA+": { 
        brand: "eSUN", 
        colors: [
            { name: "Beige", inStock: true },
            { name: "Bone White", inStock: false }, 
            { name: "Black", inStock: false }, 
            { name: "Grey", inStock: false }, 
            { name: "Red", inStock: false }, 
            { name: "Blue", inStock: false }, 
            { name: "Green", inStock: false }
        ], 
        price: 3.75, 
        description: "The go-to choice for hobbyists. Known for superb layer adhesion and minimal warping at a great value.", 
        properties: ["High Strength", "Low Warping"], 
        applications: ["Figurines & Miniatures", "Cosplay Props"] 
    },
    "Bambu Lab PLA Basic": { 
        brand: "Bambu Lab", 
        colors: [
            { name: "Black", inStock: false }, 
            { name: "White", inStock: false }, 
            { name: "Grey", inStock: false }, 
            { name: "Bambu Green", inStock: false }
        ], 
        price: 4.69, 
        description: "Official PLA from Bambu Lab, optimized for high-speed printing. A reliable workhorse for any project.", 
        properties: ["High-Speed Optimized", "Consistent Quality"], 
        applications: ["Aesthetic Prototypes", "Hobbyist Models"] 
    },
    "Bambu Lab ASA": { 
        brand: "Bambu Lab", 
        colors: [{ name: "Black", inStock: false }, { name: "White", inStock: false }], 
        price: 5.63, 
        description: "The superior alternative to ABS for outdoor applications, offering excellent UV, weather, and thermal resistance.", 
        properties: ["UV & Weather Resistant", "High Impact Strength"], 
        applications: ["Outdoor/UV Resistant", "Garden Equipment"] 
    },
    "Bambu Lab PA (Nylon)": { 
        brand: "Bambu Lab", 
        colors: [{ name: "Natural White", inStock: false }], 
        price: 8.44, 
        description: "Classic engineering nylon offering excellent toughness, wear resistance, and a low-friction surface for moving parts.", 
        properties: ["High Toughness", "Wear Resistant"], 
        applications: ["Functional/Mechanical Parts", "Gears & Bushings"] 
    },
    "Bambu Lab PC": { 
        brand: "Bambu Lab", 
        colors: [{ name: "Clear", inStock: false }, { name: "Black", inStock: false }], 
        price: 9.38, 
        description: "Polycarbonate delivers extreme strength, high heat deflection, and optical clarity for the most demanding engineering tasks.", 
        properties: ["Extreme Strength", "High Heat Resistance"], 
        applications: ["Functional/Mechanical Parts", "Protective Shields"] 
    },
    "Bambu Lab PETG-CF": { 
        brand: "Bambu Lab", 
        colors: [{ name: "Carbon Black", inStock: false }], 
        price: 10.31, 
        description: "Carbon fiber reinforced PETG for strong, stiff parts with a premium matte finish and high heat resistance.", 
        properties: ["High Stiffness", "Creep Resistant"], 
        applications: ["Functional/Mechanical Parts", "Drone Parts"] 
    },
    "MatterHackers NylonX": { 
        brand: "MatterHackers", 
        colors: [{ name: "Carbon Fiber Black", inStock: false }], 
        price: 15.94, 
        description: "A top-tier carbon fiber filled nylon known for its extreme stiffness, impact resistance, and high tensile strength.", 
        properties: ["Extreme Stiffness", "Impact Resistant"], 
        applications: ["Functional/Mechanical Parts", "High-Stress Parts"] 
    },
};

const getColorStyle = (color) => {
    const colorMap = { "White": "#ffffff", "Black": "#1a1a1a", "Grey": "#6b7280", "Clear": "rgba(255,255,255,0.3)", "Bambu Green": "#00ae42", "Carbon Black": "#222222", "Bone White": "#f9f6ee", "Red": "#ef4444", "Blue": "#3b82f6", "Green": "#10b981", "Dark Blue": "#00008B", "Beige": "#F5F5DC", "Silver": "#C0C0C0", "Natural White": "#f5f5dc" };
    return colorMap[color] || '#9ca3af';
};

const Filaments = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeApplication, setActiveApplication] = useState('All');
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [notificationEmail, setNotificationEmail] = useState('');

    const materials = useMemo(() => {
        return Object.entries(FILAMENTS_DATA).map(([name, data]) => {
            const isInStock = data.colors.some(color => color.inStock);
            return { name, ...data, isInStock };
        });
    }, []);

    const filteredMaterials = useMemo(() => {
        return materials
            .filter(material => activeCategory === 'All' || (activeCategory === 'In Stock' && material.isInStock) || material.brand === activeCategory)
            .filter(material => activeApplication === 'All' || material.applications.includes(activeApplication))
            .filter(material =>
                material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                material.brand.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [materials, searchTerm, activeCategory, activeApplication]);

    const categories = ['All', 'In Stock', 'Bambu Lab', 'Polymaker', 'eSUN', 'Overture', 'MatterHackers'];
    const applications = ['All', 'Functional/Mechanical Parts', 'Aesthetic Prototypes', 'Figurines & Miniatures', 'Outdoor/UV Resistant'];
    
    const handleNotificationSubmit = (e) => {
        e.preventDefault();
        alert(`Thank you! We will notify you at ${notificationEmail} when more colors of ${selectedMaterial.name} are back in stock.`);
        setNotificationEmail('');
        setSelectedMaterial(null);
    };

    const Modal = ({ material, onClose }) => {
        if (!material) return null;
        return (
            <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
                <motion.div className="modal-content" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <div className="modal-title-section">
                            <div className="color-swatch-large" style={{ background: getColorStyle(material.colors[0].name) }}></div>
                            <div><h2 className="modal-header-h2">{material.name}</h2><p className="modal-brand">{material.brand}</p></div>
                        </div>
                        <button className="close-btn" onClick={onClose}>&times;</button>
                    </div>
                    {!material.isInStock && <div className="out-of-stock-banner"><p>This material is currently out of stock.</p></div>}
                    <p className="modal-description">{material.description}</p>
                    <div className="info-sections">
                        <div className="info-section"><h4>Key Properties</h4><div className="properties-list">{material.properties.map(prop => <span key={prop} className="property-badge">{prop}</span>)}</div></div>
                        <div className="info-section"><h4>Common Applications</h4><div className="properties-list">{material.applications.map(app => <span key={app} className="property-badge">{app}</span>)}</div></div>
                        <div className="info-section"><h4>Available Colors</h4><div className="modal-colors-list">{material.colors.map(color => <div key={color.name} className={`color-option ${!color.inStock ? 'out-of-stock' : ''}`} style={{ backgroundColor: getColorStyle(color.name) }}><span className="color-name-tooltip">{color.name}{!color.inStock ? ' (Out of Stock)' : ''}</span></div>)}</div></div>
                    </div>
                    <div className="modal-actions">
                        {material.isInStock ? <button className="select-btn" disabled>Printing Coming Soon</button> : <form className="notify-form" onSubmit={handleNotificationSubmit}><input type="email" placeholder="Enter your email" value={notificationEmail} onChange={(e) => setNotificationEmail(e.target.value)} required /><button type="submit" className="notify-btn">Notify Me</button></form>}
                    </div>
                </motion.div>
            </motion.div>
        );
    };

    return (
        <div className="filaments-page">
            <section className="page-intro-section"><h1 className="page-title">Materials Catalog</h1><p className="page-subtitle">Premium Filaments for Every Project</p></section>
            <section className="application-filter-section"><div className="filters-container"><label className="filter-label">Filter by Use Case:</label><div className="application-filters">{applications.map(app => <button key={app} className={`application-btn ${activeApplication === app ? 'active' : ''}`} onClick={() => setActiveApplication(app)}>{app}</button>)}</div></div></section>
            <section className="filters-section"><div className="filters-container"><div className="search-box"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.5 11.5L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.5"/></svg><input type="text" className="search-input" placeholder="Search by name, brand, or feature..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div><div className="filter-controls"><div className="category-filters">{categories.map(cat => <button key={cat} className={`category-btn ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>{cat}</button>)}</div></div></div></section>
            <section className="materials-section">
                <div className="materials-container">
                    <div className="materials-list-header"><span>Material</span><span>Key Properties</span><span>Price</span></div>
                    <AnimatePresence>
                        {filteredMaterials.length > 0 ? (
                            filteredMaterials.map((material) => (
                                <motion.div key={material.name} className="material-item-row" onClick={() => setSelectedMaterial(material)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} whileHover={{ backgroundColor: "#f8f9fa" }}>
                                    <div className="material-info-col">
                                        <div className="color-swatch-small" style={{ background: getColorStyle(material.colors[0].name) }}></div>
                                        <div><div className="material-name">{material.name}</div><div className="material-brand">{material.brand}</div></div>
                                    </div>
                                    <div className="material-properties-col">{material.properties.map(prop => <span key={prop} className="property-tag-small">{prop}</span>)}</div>
                                    <div className="material-price-col">
                                        <div className="price">₱{(material.price).toFixed(2)}<span className="price-unit">/g</span></div>
                                        <div className={`stock-status ${material.isInStock ? 'in-stock' : 'out-of-stock'}`}>{material.isInStock ? 'In Stock' : 'Out of Stock'}</div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div className="no-results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><div className="no-results-icon">😢</div><h3>No Materials Found</h3><p>Your search for "{searchTerm}" did not match any materials.</p><button className="reset-btn" onClick={() => { setSearchTerm(''); setActiveCategory('All'); setActiveApplication('All'); }}>Reset Filters</button></motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
            <AnimatePresence>{selectedMaterial && <Modal material={selectedMaterial} onClose={() => setSelectedMaterial(null)} />}</AnimatePresence>
        </div>
    );
};

export default Filaments;
