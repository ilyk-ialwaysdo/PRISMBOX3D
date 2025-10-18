import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrismBackground from "./components/PrismBackground";
import Homepage from "./pages/Homepage";
import Configuration from "./pages/Configuration";
import Payment from "./pages/Payment";
import "./App.css";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem("adminMode") === "true");

  function handleAdminLogin() {
    const pwd = window.prompt("Enter admin password:");
    if (pwd === "123") { // CHANGE THIS for production!
      setIsAdmin(true);
      localStorage.setItem("adminMode", "true");
    } else if (pwd !== null) {
      alert("Wrong password.");
    }
  }

  function handleAdminLogout() {
    setIsAdmin(false);
    localStorage.removeItem("adminMode");
  }

  return (
    <Router>
      <div className="App">
        <PrismBackground />
        <div className="admin-nav">
          {isAdmin ? (
            <button className="admin-btn" onClick={handleAdminLogout}>
              Admin Logout
            </button>
          ) : (
            <button className="admin-btn" onClick={handleAdminLogin}>
              Admin Login
            </button>
          )}
        </div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/configure" element={<Configuration isAdmin={isAdmin} />} />
          <Route path="/payment" element={<Payment isAdmin={isAdmin} />} />
        </Routes>

        <Analytics />
      </div>
    </Router>
  );
}

export default App;
