import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Filaments from './pages/Filaments';
import Configuration from './pages/Configuration';
import Payment from './pages/Payment';
import './App.css';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/filaments" element={<Filaments />} />
          <Route path="/configuration" element={<Configuration />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
