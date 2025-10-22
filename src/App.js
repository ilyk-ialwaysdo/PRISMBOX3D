import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// IMPORT GLOBAL VARIABLES FIRST - CRITICAL!
import './styles/GlobalVariables.css';

// Import CSS files
import './Homepage.css';
import './Pricing.css';
import './Filaments.css';
import './PrivacyPolicy.css';
import './TermsOfService.css';
import './components/Header.css';
import './components/Footer.css';
import './pages/FAQ.css';

// Import components
import Homepage from './Homepage';
import Pricing from './Pricing';
import Filaments from './Filaments';  // NEW SEPARATE PAGE
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';
import FAQ from './pages/FAQ';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/filaments" element={<Filaments />} />  {/* SEPARATE ROUTE */}
                    <Route path="/materials" element={<Filaments />} />   {/* ALIAS */}
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermsOfService />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
