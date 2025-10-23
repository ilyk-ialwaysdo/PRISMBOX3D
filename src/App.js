import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your existing components
import Homepage from './Homepage';
import Pricing from './Pricing';
import Filaments from './Filaments';
import FAQ from './FAQ';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/materials" element={<Filaments />} />
        <Route path="/filaments" element={<Filaments />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Routes>
    </Router>
  );
}

export default App;