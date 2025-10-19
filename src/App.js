import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import Filaments from './pages/Filaments';
import FAQ from './pages/FAQ'; // Import the new FAQ page
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/filaments" element={<Filaments />} />
            <Route path="/faq" element={<FAQ />} /> {/* Add the route for the FAQ page */}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
