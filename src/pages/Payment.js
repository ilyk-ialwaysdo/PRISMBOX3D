import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Payment.css';

// --- CONFIGURATION ---
// NOTE: API keys are exposed. Move to a backend for production.
const RECAPTCHA_SITE_KEY = '6Lclce4rAAAAAA7qN-JArX1mRhzhvN2K7A2ik7Hn';
const MAILBOXPLAYER_KEY = 'YOUR_MAILBOXPLAYER_API_KEY';
const NUMVERIFY_KEY = 'YOUR_NUMVERIFY_API_KEY';

// Business costs for profit analysis. Should be centralized or managed securely.
const BUSINESS_COSTS = {
    TRUE_FILAMENT_COST_PER_GRAM: 0.40, // Your actual cost per gram
    TRUE_LABOR_COST: 50,
    TRUE_KWH_RATE: 12,
    PRINTER_WATT: 160, // Consistent with Configuration.js
};

const Payment = ({ isAdmin }) => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', phone: '', address: '', studentId: '' });
    const [paymentMethod, setPaymentMethod] = useState('gcash');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showProfit, setShowProfit] = useState(false);

    // Use order data from location state. If none, use a default for display/testing.
    const orderData = location.state?.orderData;
    const defaultOrder = {
        config: { file: { name: 'test-model.stl' }, material: 'PLA+', color: 'Black', grams: 50, printTime: 4, services: { cleaning: true }, studentDiscount: false },
        priceBreakdown: { filamentCost: 275, laborFee: 150, electricityCharge: 15.56, serviceFees: { cleaning: 120 }, subtotal: 560.56, discountAmount: 0, total: 560.56 }
    };
    const order = orderData || defaultOrder;
    
    // --- Profit Calculation (uses consistent data from the order object) ---
    const calculateProfit = () => {
        if (!order || !order.config || !order.priceBreakdown) {
            return { trueFilamentCost: 0, yourTotalCost: 0, profitAmount: 0, profitPercent: 0 };
        }
        const grams = Number(order.config.grams);
        const printHours = Number(order.config.printTime);
        const customerTotal = order.priceBreakdown.total;

        const trueFilamentCost = grams * BUSINESS_COSTS.TRUE_FILAMENT_COST_PER_GRAM;
        const trueElectricityCost = (printHours * BUSINESS_COSTS.PRINTER_WATT / 1000) * BUSINESS_COSTS.TRUE_KWH_RATE;
        // Add service costs to your total cost if they exist
        const serviceCosts = Object.keys(order.priceBreakdown.serviceFees).length * 20; // Example: each service costs you 20
        const yourTotalCost = trueFilamentCost + BUSINESS_COSTS.TRUE_LABOR_COST + trueElectricityCost + serviceCosts;
        
        const profitAmount = customerTotal - yourTotalCost;
        const profitPercent = customerTotal > 0 ? (profitAmount / customerTotal) * 100 : 0;
        
        return { trueFilamentCost, yourTotalCost, profitAmount, profitPercent };
    };

    const profitAnalysis = calculateProfit();
    
    useEffect(() => {
        // In a production app, you'd redirect if no order data is present.
        if (!orderData) {
            console.warn("Navigating to payment page without order data. Using default data for testing.");
            // For a real site, uncomment the next line:
            // navigate('/configure', { replace: true });
        }
    }, [orderData, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // ... (validation and form submission logic would go here)
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
        <motion.div className="payment-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="container">
                <header className="page-header">
                    <h1>Secure Checkout</h1>
                    <p>Complete your order by providing your details below.</p>
                </header>
                <form onSubmit={handleSubmit}>
                    <div className="main-layout">
                        {/* Form Column */}
                        <div className="form-column">
                           {/* ... All your form fields for customer info, delivery, payment ... */}
                        </div>

                        {/* Summary Sidebar */}
                        <div className="summary-sidebar">
                            <div className="summary-card">
                                <h3>Order Summary</h3>
                                {/* ... Details of the order ... */}
                                <div className="pricing">
                                    <h4>Price Breakdown</h4>
                                    <div className="price-rows">
                                        <div className="price-row"><span>Material Cost</span><span>₱{order.priceBreakdown.filamentCost.toFixed(2)}</span></div>
                                        <div className="price-row"><span>Labor & Setup</span><span>₱{order.priceBreakdown.laborFee.toFixed(2)}</span></div>
                                        {Object.entries(order.priceBreakdown.serviceFees).map(([key, val]) => (
                                            <div className="price-row" key={key}><span>{key.charAt(0).toUpperCase() + key.slice(1)}</span><span>₱{val.toFixed(2)}</span></div>
                                        ))}
                                        <div className="price-row"><span>Energy & Service</span><span>₱{(order.priceBreakdown.electricityCharge + order.priceBreakdown.serviceFee).toFixed(2)}</span></div>
                                        {order.priceBreakdown.discountAmount > 0 && (
                                            <div className="price-row discount"><span>Student Discount</span><span>- ₱{order.priceBreakdown.discountAmount.toFixed(2)}</span></div>
                                        )}
                                        <div className="price-row total"><span>TOTAL</span><span>₱{order.priceBreakdown.total.toFixed(2)}</span></div>
                                    </div>
                                </div>
                                
                                {isAdmin && (
                                    <>
                                        <button type="button" className="show-profit-btn" onClick={() => setShowProfit(v => !v)}>
                                            {showProfit ? 'Hide' : 'Show'} Profit Analysis
                                        </button>
                                        {showProfit && (
                                            <div className="profit-breakdown">
                                                <h4>Profit Analysis (Admin View)</h4>
                                                <div className="profit-table">
                                                    <div><span>Real Filament Cost:</span><span>₱{profitAnalysis.trueFilamentCost.toFixed(2)}</span></div>
                                                    <div><span>Total Business Cost:</span><span>₱{profitAnalysis.yourTotalCost.toFixed(2)}</span></div>
                                                    <div className="net-profit">
                                                        <span>Net Profit:</span>
                                                        <span>₱{profitAnalysis.profitAmount.toFixed(2)} ({profitAnalysis.profitPercent.toFixed(0)}%)</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}

                                <button type="submit" className="checkout-btn" disabled={isSubmitting}>
                                    {isSubmitting ? 'Verifying...' : `Place Order - ₱${order.priceBreakdown.total.toFixed(2)}`}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default Payment;
