import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const PrismLogo = () => (
    <div className="logo-icon-prism">
        <div className="prism-shape shape1"></div>
        <div className="prism-shape shape2"></div>
        <div className="prism-shape shape3"></div>
    </div>
);

const BetaBadge = () => <span className="beta-badge">BETA</span>;

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="site-header">
            <div className="header-container">
                <div className="logo-section" onClick={() => navigate('/')}>
                    <PrismLogo />
                    <div className="logo-content">
                        <div className="logo-title-row">
                            <h1 className="logo-title">Prism Box 3D</h1>
                            <BetaBadge />
                        </div>
                        <span className="logo-subtitle">3D Printing Services</span>
                    </div>
                </div>
                
                <nav className="nav-links">
                    <button onClick={() => navigate('/')} className="nav-link">Home</button>
                    <button onClick={() => navigate('/filaments')} className="nav-link">Filaments</button>
                    <button onClick={() => navigate('/faq')} className="nav-link">FAQ</button>
                    <button className="nav-link primary-button" disabled>Start Printing</button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
