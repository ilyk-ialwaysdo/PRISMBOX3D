import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import Filaments from './pages/Filaments';
import FAQ from './pages/FAQ';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/filaments" element={<Filaments />} />
            <Route path="/faq" element={<FAQ />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
