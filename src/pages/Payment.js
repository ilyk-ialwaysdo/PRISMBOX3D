import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import "./Payment.css";

// --- IMPORTANT: REPLACE WITH YOUR REAL KEYS ---
// You will get these in Step 3 after deploying the site. For now, you can leave them as is, but validation will fail.
const RECAPTCHA_SITE_KEY = "YOUR_RECAPTCHA_SITE_KEY_HERE";
const MAILBOXLAYER_KEY = "YOUR_MAILBOXLAYER_API_KEY_HERE";
const NUMVERIFY_KEY = "YOUR_NUMVERIFY_API_KEY_HERE";

// --- Constants for Your Business ---
const TRUE_FILAMENT_COST_PER_GRAM = 0.40; // Your actual cost per gram from your supplier
const TRUE_LABOR_COST = 50;               // Your estimated labor cost per print
const TRUE_KWH_RATE = 12;                 // Your Meralco rate per kWh
const PRINTER_WATT = 200;                 // Your printer's average wattage

const Payment = ({ isAdmin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const recaptchaRef = useRef();

  const [customerInfo, setCustomerInfo] = useState({
    name: "", email: "", phone: "", address: "", studentId: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("gcash");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showProfit, setShowProfit] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const orderData = location.state?.orderData;

  // A default order to prevent the page from crashing if accessed directly
  const defaultOrder = {
    config: {
      file: { name: "test-model.stl" },
      material: "PLA Basic", color: "Black", grams: "50", printTime: "4",
      services: { cleaning: true }, studentDiscount: false,
    },
    priceBreakdown: {
      filamentCost: 250, laborFee: 150, electricityCharge: 19.2,
      serviceFees: { cleaning: 120 }, subtotal: 539.2, discountAmount: 0, total: 539.2,
    },
  };

  const order = orderData || defaultOrder;

  // --- Profit Calculation Logic ---
  const grams = Number(order.config.grams);
  const printHours = Number(order.config.printTime);
  const subtotal = order.priceBreakdown.subtotal;
  const trueFilamentCost = grams * TRUE_FILAMENT_COST_PER_GRAM;
  const trueElectricityCost = ((printHours * PRINTER_WATT) / 1000) * TRUE_KWH_RATE;
  const yourTotalCost = trueFilamentCost + TRUE_LABOR_COST + trueElectricityCost;
  const profitAmount = subtotal - yourTotalCost;
  const profitPercent = yourTotalCost > 0 ? (profitAmount / yourTotalCost) * 100 : 0;

  // --- API Validation Functions ---
  async function validateEmailAPI(email) {
    if (!MAILBOXLAYER_KEY.includes("YOUR_")) {
      const url = `https://apilayer.net/api/check?access_key=${MAILBOXLAYER_KEY}&email=${email}&smtp=1&format=1`;
      try {
        const res = await axios.get(url);
        return res.data.format_valid && res.data.mx_found && res.data.smtp_check && !res.data.disposable;
      } catch { return false; } // Fail safely
    }
    return /\S+@\S+\.\S+/.test(email); // Fallback to basic check if no key
  }

  async function validatePhoneAPI(phone) {
    if (!NUMVERIFY_KEY.includes("YOUR_")) {
      const url = `http://apilayer.net/api/validate?access_key=${NUMVERIFY_KEY}&number=${phone}&country_code=PH&format=1`;
      try {
        const res = await axios.get(url);
        return res.data.valid && (res.data.line_type === "mobile" || res.data.line_type === "cellular");
      } catch { return false; } // Fail safely
    }
    return /^(09|\+639)\d{9}$/.test(phone.replace(/\s/g, "")); // Fallback if no key
  }

  // --- Form Handling ---
  const handleInputChange = (field, value) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Basic Form Validation
    const formErrors = {};
    if (!customerInfo.name.trim()) formErrors.name = "Full name is required";
    if (!customerInfo.email.trim()) formErrors.email = "Email is required";
    if (!customerInfo.phone.trim()) formErrors.phone = "Mobile number is required";
    if (!customerInfo.address.trim()) formErrors.address = "Address is required";
    if (order.config.studentDiscount && !customerInfo.studentId.trim()) {
        formErrors.studentId = "Student ID is required";
    }
    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    // 2. reCAPTCHA Validation
    if (!captchaVerified) {
      alert("Please complete the reCAPTCHA verification.");
      setIsSubmitting(false);
      return;
    }

    // 3. API-based Email and Phone Validation
    const emailIsValid = await validateEmailAPI(customerInfo.email);
    if (!emailIsValid) {
      alert("The email address provided is not valid or deliverable. Please check it and try again.");
      setIsSubmitting(false);
      return;
    }

    const phoneIsValid = await validatePhoneAPI(customerInfo.phone);
    if (!phoneIsValid) {
      alert("The mobile number provided is not a valid Philippine mobile number. Please check it and try again.");
      setIsSubmitting(false);
      return;
    }
    
    // All checks passed!
    alert(`🎉 Order Submitted Successfully!\n\nThank you, ${customerInfo.name}! We will email payment instructions and order updates to ${customerInfo.email}.`);
    navigate("/");
  };

  return (
    <motion.div className="payment-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="container">
        <header className="page-header">
          <button className="back-btn" onClick={() => navigate("/configure")}>
            ← Back to Configuration
          </button>
          <div className="header-info">
            <h1>Complete Your Order</h1>
            <p>Final step to bring your creation to life!</p>
          </div>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="main-layout">
            {/* --- Left Column: Forms --- */}
            <div className="form-column">
              <div className="info-card">
                <h2>📞 Contact Information</h2>
                <div className="form-grid">
                  <div className="field-group span-2">
                    <label>Full Name *</label>
                    <input type="text" value={customerInfo.name} onChange={(e) => handleInputChange("name", e.target.value)} placeholder="Juan Dela Cruz" className={errors.name ? 'error' : ''}/>
                    {errors.name && <span className="field-error">{errors.name}</span>}
                  </div>
                  <div className="field-group">
                    <label>Email Address *</label>
                    <input type="email" value={customerInfo.email} onChange={(e) => handleInputChange("email", e.target.value)} placeholder="juan@email.com" className={errors.email ? 'error' : ''}/>
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </div>
                  <div className="field-group">
                    <label>Mobile Number *</label>
                    <input type="tel" value={customerInfo.phone} onChange={(e) => handleInputChange("phone", e.target.value)} placeholder="0912 345 6789" className={errors.phone ? 'error' : ''}/>
                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                  </div>
                  {order.config.studentDiscount && (
                    <div className="field-group span-2">
                      <label>Student ID Number *</label>
                      <input type="text" value={customerInfo.studentId} onChange={(e) => handleInputChange("studentId", e.target.value)} placeholder="Enter your student ID for verification" className={errors.studentId ? 'error' : ''}/>
                      {errors.studentId && <span className="field-error">{errors.studentId}</span>}
                    </div>
                  )}
                </div>
              </div>

              <div className="info-card">
                <h2>🚚 Lalamove Delivery</h2>
                <div className="lalamove-card">
                  <div className="service-header">
                    <span className="service-icon">🚚</span>
                    <div><strong>Lalamove from San Jose del Monte</strong><small>Fast, reliable courier service</small></div>
                  </div>
                  <div className="service-details">
                    <span>Estimated Cost: ₱200 - ₱400 (paid to rider)</span>
                  </div>
                </div>
                <div className="field-group">
                  <label>Complete Delivery Address *</label>
                  <textarea value={customerInfo.address} onChange={(e) => handleInputChange("address", e.target.value)} placeholder="Unit, Street, Barangay, City, Postal Code" className={errors.address ? 'error' : ''} rows="3"/>
                  {errors.address && <span className="field-error">{errors.address}</span>}
                </div>
                <div className="delivery-terms">
                  <h4>Delivery Terms</h4>
                  <ul><li>The Lalamove delivery fee is **not included** in the total and must be paid directly to the rider.</li></ul>
                </div>
              </div>

              <div className="info-card">
                <h2>💳 Payment Method</h2>
                <div className="payment-options">
                  <label className={`payment-option ${paymentMethod === 'gcash' ? 'selected' : ''}`}>
                    <input type="radio" name="payment" value="gcash" checked={paymentMethod === 'gcash'} onChange={(e) => setPaymentMethod(e.target.value)}/>
                    <div className="option-content"><span className="option-icon">📱</span><strong>GCash</strong></div>
                  </label>
                  <label className={`payment-option ${paymentMethod === 'bank' ? 'selected' : ''}`}>
                    <input type="radio" name="payment" value="bank" checked={paymentMethod === 'bank'} onChange={(e) => setPaymentMethod(e.target.value)}/>
                    <div className="option-content"><span className="option-icon">🏦</span><strong>Bank Transfer</strong></div>
                  </label>
                </div>
              </div>

              <div className="info-card" style={{ display: 'flex', justifyContent: 'center' }}>
                <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} onChange={() => setCaptchaVerified(true)}/>
              </div>
            </div>

            {/* --- Right Column: Order Summary --- */}
            <div className="summary-sidebar">
              <div className="summary-card">
                <h3>📋 Order Summary</h3>
                <div className="order-details">
                  {/* Order details rows */}
                  <div className="detail-item"><span>File:</span><strong>{order.config.file?.name}</strong></div>
                  <div className="detail-item"><span>Material:</span><strong>{order.config.material}</strong></div>
                  <div className="detail-item"><span>Weight:</span><strong>{order.config.grams}g</strong></div>
                </div>
                <div className="pricing">
                  <h4>💰 Price Breakdown</h4>
                  <div className="price-rows">
                    <div className="price-row"><span>Material Cost</span><span>₱{order.priceBreakdown.filamentCost.toFixed(2)}</span></div>
                    <div className="price-row"><span>Labor & Setup</span><span>₱{order.priceBreakdown.laborFee.toFixed(2)}</span></div>
                    <div className="price-row"><span>Electricity</span><span>₱{order.priceBreakdown.electricityCharge.toFixed(2)}</span></div>
                    {Object.entries(order.priceBreakdown.serviceFees || {}).map(([key, value]) => (
                        <div className="price-row" key={key}><span>{key}</span><span>₱{value.toFixed(2)}</span></div>
                    ))}
                    <div className="price-divider"></div>
                    {order.priceBreakdown.discountAmount > 0 && (
                      <div className="price-row discount"><span>Student Discount</span><span>-₱{order.priceBreakdown.discountAmount.toFixed(2)}</span></div>
                    )}
                    <div className="price-row total"><span>TOTAL</span><span>₱{order.priceBreakdown.total.toFixed(2)}</span></div>
                  </div>
                </div>
                
                {/* --- Admin Only Section --- */}
                {isAdmin && (
                  <>
                    <button type="button" className="show-profit-btn" onClick={() => setShowProfit(v => !v)}>
                      {showProfit ? 'Hide' : 'Show'} Profit Analysis
                    </button>
                    {showProfit && (
                      <div className="profit-breakdown">
                        <h4>🔎 Profit Analysis (Admin View)</h4>
                        <div className="profit-table">
                          <div><span>Real Filament Cost:</span> <span>₱{trueFilamentCost.toFixed(2)}</span></div>
                          <div><span>Your Labor Cost:</span> <span>₱{TRUE_LABOR_COST.toFixed(2)}</span></div>
                          <div><span>Real Electricity Cost:</span> <span>₱{trueElectricityCost.toFixed(2)}</span></div>
                          <div className="profit-separator"></div>
                          <div><span>Total Business Cost:</span> <span>₱{yourTotalCost.toFixed(2)}</span></div>
                          <div style={{fontWeight: 700, color: '#22c55e'}}>
                            <span>Net Profit:</span> 
                            <span>₱{profitAmount.toFixed(2)} ({profitPercent.toFixed(0)}%)</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
                
                <button type="submit" className="checkout-btn" disabled={isSubmitting}>
                  {isSubmitting ? "Verifying..." : `🚀 Place Order - ₱${order.priceBreakdown.total.toFixed(2)}`}
                </button>
                <div className="security-badge"><span>🔒</span><small>Secure and Verified Checkout</small></div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Payment;
