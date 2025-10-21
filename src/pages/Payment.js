import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Payment.css';

// Business costs for profit analysis
const BUSINESS_COSTS = {
  TRUE_FILAMENT_COST_PER_GRAM: 0.40,
  TRUE_LABOR_COST: 50,
  TRUE_KWH_RATE: 12,
  PRINTER_WATT: 160,
};

const Payment = ({ isAdmin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [customerInfo, setCustomerInfo] = useState({ 
    name: '', email: '', phone: '', address: '', studentId: '' 
  });
  const [paymentMethod, setPaymentMethod] = useState('gcash');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showProfit, setShowProfit] = useState(false);

  // Use order data from location state
  const orderData = location.state?.orderData;
  const defaultOrder = {
    config: { 
      file: { name: 'test-model.stl' }, 
      material: 'PLA+', 
      color: 'Black', 
      grams: 50, 
      printTime: 4, 
      services: { cleaning: true }, 
      studentDiscount: false 
    },
    priceBreakdown: { 
      filamentCost: 275, 
      laborFee: 150, 
      electricityCharge: 15.56, 
      serviceFees: { cleaning: 120 }, 
      subtotal: 560.56, 
      discountAmount: 0, 
      total: 560.56 
    }
  };

  const order = orderData || defaultOrder;

  // Profit Calculation
  const calculateProfit = () => {
    if (!order || !order.config || !order.priceBreakdown) {
      return { trueFilamentCost: 0, yourTotalCost: 0, profitAmount: 0, profitPercent: 0 };
    }

    const grams = Number(order.config.grams);
    const printHours = Number(order.config.printTime);
    const customerTotal = order.priceBreakdown.total;
    
    const trueFilamentCost = grams * BUSINESS_COSTS.TRUE_FILAMENT_COST_PER_GRAM;
    const trueElectricityCost = (printHours * BUSINESS_COSTS.PRINTER_WATT / 1000) * BUSINESS_COSTS.TRUE_KWH_RATE;
    const serviceCosts = Object.keys(order.priceBreakdown.serviceFees).length * 20;
    
    const yourTotalCost = trueFilamentCost + BUSINESS_COSTS.TRUE_LABOR_COST + trueElectricityCost + serviceCosts;
    const profitAmount = customerTotal - yourTotalCost;
    const profitPercent = customerTotal > 0 ? (profitAmount / customerTotal) * 100 : 0;

    return { trueFilamentCost, yourTotalCost, profitAmount, profitPercent };
  };

  const profitAnalysis = calculateProfit();

  useEffect(() => {
    if (!orderData) {
      console.warn("Navigating to payment page without order data. Using default data for testing.");
    }
  }, [orderData, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Fake submission delay
    await new Promise(res => setTimeout(res, 1500));
    
    setIsSubmitting(false);
    alert('Order Submitted Successfully! (This is a demo)');
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Header />
      <div className="payment-page">
        <div className="container">
          <div className="payment-grid">
            {/* Form Column */}
            <div className="form-column">
              <div className="page-header">
                <h1>Complete Your Order</h1>
                <p>Fill in your details to finalize your 3D printing order</p>
              </div>

              <form onSubmit={handleSubmit} className="payment-form">
                {/* Customer Info Section */}
                <div className="form-section">
                  <h3>Customer Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={customerInfo.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={customerInfo.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={customerInfo.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method Section */}
                <div className="form-section">
                  <h3>Payment Method</h3>
                  <div className="payment-options">
                    <label className={`payment-option ${paymentMethod === 'gcash' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="gcash"
                        checked={paymentMethod === 'gcash'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span>GCash</span>
                    </label>
                    
                    <label className={`payment-option ${paymentMethod === 'bank' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={paymentMethod === 'bank'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span>Bank Transfer</span>
                    </label>
                  </div>
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Verifying...' : `Place Order - ₱${order.priceBreakdown.total.toFixed(2)}`}
                </button>
              </form>
            </div>

            {/* Summary Sidebar */}
            <div className="summary-column">
              <div className="order-summary">
                <h3>Order Summary</h3>
                
                <div className="order-details">
                  <div className="detail-item">
                    <span>File:</span>
                    <span>{order.config.file.name}</span>
                  </div>
                  <div className="detail-item">
                    <span>Material:</span>
                    <span>{order.config.material}</span>
                  </div>
                  <div className="detail-item">
                    <span>Color:</span>
                    <span>{order.config.color}</span>
                  </div>
                  <div className="detail-item">
                    <span>Weight:</span>
                    <span>{order.config.grams}g</span>
                  </div>
                </div>

                <div className="price-breakdown">
                  <h4>Price Breakdown</h4>
                  <div className="breakdown-item">
                    <span>Material Cost</span>
                    <span>₱{order.priceBreakdown.filamentCost.toFixed(2)}</span>
                  </div>
                  <div className="breakdown-item">
                    <span>Labor & Setup</span>
                    <span>₱{order.priceBreakdown.laborFee.toFixed(2)}</span>
                  </div>
                  
                  {Object.entries(order.priceBreakdown.serviceFees).map(([key, val]) => (
                    <div key={key} className="breakdown-item">
                      <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                      <span>₱{val.toFixed(2)}</span>
                    </div>
                  ))}
                  
                  <div className="breakdown-item">
                    <span>Energy & Service</span>
                    <span>₱{(order.priceBreakdown.electricityCharge + (order.priceBreakdown.serviceFee || 0)).toFixed(2)}</span>
                  </div>
                  
                  {order.priceBreakdown.discountAmount > 0 && (
                    <div className="breakdown-item discount">
                      <span>Student Discount</span>
                      <span>- ₱{order.priceBreakdown.discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="breakdown-total">
                    <span>TOTAL</span>
                    <span>₱{order.priceBreakdown.total.toFixed(2)}</span>
                  </div>
                </div>

                {isAdmin && (
                  <>
                    <button 
                      type="button" 
                      className="profit-toggle"
                      onClick={() => setShowProfit(v => !v)}
                    >
                      {showProfit ? 'Hide' : 'Show'} Profit Analysis
                    </button>
                    
                    {showProfit && (
                      <div className="profit-analysis">
                        <h4>Profit Analysis (Admin View)</h4>
                        <div className="profit-item">
                          <span>Real Filament Cost:</span>
                          <span>₱{profitAnalysis.trueFilamentCost.toFixed(2)}</span>
                        </div>
                        <div className="profit-item">
                          <span>Total Business Cost:</span>
                          <span>₱{profitAnalysis.yourTotalCost.toFixed(2)}</span>
                        </div>
                        <div className="profit-total">
                          <span>Net Profit:</span>
                          <span>
                            ₱{profitAnalysis.profitAmount.toFixed(2)} ({profitAnalysis.profitPercent.toFixed(0)}%)
                          </span>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment;
