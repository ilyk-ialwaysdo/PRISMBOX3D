import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './PrivacyPolicy.css';

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 19-7-7 7-7"/>
    <path d="m19 12H5"/>
  </svg>
);

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <div className="privacy-policy-page">
                
                {/* Header Section */}
                <section className="policy-header">
                    <div className="policy-container">
                        <button className="back-button" onClick={() => navigate('/')}>
                            <BackIcon />
                            Back to Home
                        </button>
                        
                        <div className="header-content">
                            <h1>Privacy Policy</h1>
                            <div className="policy-meta">
                                <p>Last updated: <strong>October 22, 2025</strong></p>
                                <p>Effective date: <strong>October 22, 2025</strong></p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content Sections */}
                <section className="policy-content">
                    <div className="policy-container">
                        
                        <div className="content-section">
                            <h2>1. Information We Collect</h2>
                            <div className="section-content">
                                <h3>Personal Information</h3>
                                <p>We collect information you provide directly to us, including:</p>
                                <ul>
                                    <li><strong>Contact Information:</strong> Name, email address, phone number, and shipping address</li>
                                    <li><strong>Payment Information:</strong> GCash details, bank account information for transactions</li>
                                    <li><strong>Communication Data:</strong> Messages sent through Messenger, email correspondence, and support inquiries</li>
                                    <li><strong>Project Files:</strong> 3D model files (.STL, .3MF, .OBJ) and related design specifications</li>
                                </ul>
                                
                                <h3>Student Information</h3>
                                <p>For student discount eligibility:</p>
                                <ul>
                                    <li>Student identification numbers and verification documents</li>
                                    <li>Educational institution name and enrollment status</li>
                                    <li>Academic program information (deleted after verification)</li>
                                </ul>
                            </div>
                        </div>

                        <div className="content-section">
                            <h2>2. How We Use Your Information</h2>
                            <div className="section-content">
                                <p>We use the information we collect to:</p>
                                <ul>
                                    <li><strong>Process Orders:</strong> Analyze your 3D files, calculate costs, and fulfill printing services</li>
                                    <li><strong>Communicate:</strong> Send order confirmations, status updates, and respond to inquiries</li>
                                    <li><strong>Payment Processing:</strong> Handle transactions and maintain financial records</li>
                                    <li><strong>Customer Support:</strong> Provide technical assistance and resolve issues</li>
                                    <li><strong>Service Improvement:</strong> Analyze feedback to enhance our services and processes</li>
                                    <li><strong>Legal Compliance:</strong> Meet regulatory requirements for business operations and tax reporting</li>
                                </ul>
                            </div>
                        </div>

                        <div className="content-section">
                            <h2>3. Information Sharing</h2>
                            <div className="section-content">
                                <p>We may share your information with:</p>
                                
                                <h3>Service Providers</h3>
                                <ul>
                                    <li><strong>Delivery Services:</strong> LBC, J&T Express, Lalamove for shipping (name, address, contact only)</li>
                                    <li><strong>Payment Processors:</strong> GCash and banking partners for transaction processing</li>
                                    <li><strong>Communication Platforms:</strong> Facebook Messenger, email providers (subject to their privacy policies)</li>
                                </ul>
                                
                                <h3>Legal Requirements</h3>
                                <p>We may disclose information when required by Philippine law, including:</p>
                                <ul>
                                    <li>Bureau of Internal Revenue (BIR) for tax compliance</li>
                                    <li>Department of Trade and Industry (DTI) for consumer protection</li>
                                    <li>Court orders or valid legal processes</li>
                                </ul>
                            </div>
                        </div>

                        <div className="content-section">
                            <h2>4. Data Security</h2>
                            <div className="section-content">
                                <p>We implement appropriate security measures to protect your personal information:</p>
                                <ul>
                                    <li><strong>Encryption:</strong> Secure file transfer and storage systems</li>
                                    <li><strong>Access Controls:</strong> Limited access based on business necessity</li>
                                    <li><strong>Regular Backups:</strong> Secure data backup and recovery systems</li>
                                    <li><strong>Physical Security:</strong> Secure storage of equipment and documents</li>
                                    <li><strong>Staff Training:</strong> Regular privacy and security awareness training</li>
                                </ul>
                            </div>
                        </div>

                        <div className="content-section">
                            <h2>5. Data Retention</h2>
                            <div className="section-content">
                                <p>We retain your information for the following periods:</p>
                                <ul>
                                    <li><strong>3D Model Files:</strong> Deleted within 30 days after successful delivery</li>
                                    <li><strong>Order Records:</strong> Retained for 2 years for warranty and support</li>
                                    <li><strong>Financial Records:</strong> Kept for 10 years per BIR requirements</li>
                                    <li><strong>Communication Records:</strong> Retained for 1 year for customer service</li>
                                    <li><strong>Customer Accounts:</strong> Active during business relationship, archived after 1 year of inactivity</li>
                                </ul>
                                <p>You may request earlier deletion of your data subject to legal retention requirements.</p>
                            </div>
                        </div>

                        <div className="content-section">
                            <h2>6. Your Privacy Rights</h2>
                            <div className="section-content">
                                <p>Under the Data Privacy Act of 2012, you have the right to:</p>
                                <ul>
                                    <li><strong>Access:</strong> Request copies of your personal data</li>
                                    <li><strong>Rectification:</strong> Correct inaccurate or incomplete information</li>
                                    <li><strong>Erasure:</strong> Request deletion of your data when no longer necessary</li>
                                    <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
                                    <li><strong>Object:</strong> Opt-out of certain data processing activities</li>
                                    <li><strong>Restrict Processing:</strong> Limit how we use your information</li>
                                </ul>
                                
                                <h3>Exercising Your Rights</h3>
                                <p>To exercise these rights, contact us at:</p>
                                <ul>
                                    <li><strong>Email:</strong> prismbox3dservice@gmail.com</li>
                                    <li><strong>Messenger:</strong> Teddy Tapiador</li>
                                </ul>
                                <p>We will respond within 30 days and may require identity verification.</p>
                            </div>
                        </div>

                        <div className="content-section">
                            <h2>7. Children's Privacy</h2>
                            <div className="section-content">
                                <p>Our services are intended for customers 18 years and older. For customers under 18:</p>
                                <ul>
                                    <li>Parental consent is required for service use</li>
                                    <li>Enhanced protections and limited data collection apply</li>
                                    <li>Parents have full rights to access and control their child's information</li>
                                    <li>No direct marketing to identified minor customers</li>
                                </ul>
                            </div>
                        </div>

                        <div className="content-section">
                            <h2>8. International Data Transfers</h2>
                            <div className="section-content">
                                <p>Some of our service providers may be located outside the Philippines. When we transfer data internationally, we:</p>
                                <ul>
                                    <li>Select providers with adequate data protection standards</li>
                                    <li>Include contractual protections equivalent to Philippine standards</li>
                                    <li>Monitor compliance with data protection requirements</li>
                                    <li>Maintain documentation of all international transfers</li>
                                </ul>
                            </div>
                        </div>

                        <div className="content-section">
                            <h2>9. Changes to This Policy</h2>
                            <div className="section-content">
                                <p>We may update this Privacy Policy periodically. When we make changes:</p>
                                <ul>
                                    <li>We will notify customers 30 days in advance of material changes</li>
                                    <li>Updated policies will be posted on our website</li>
                                    <li>Continued use of our services constitutes acceptance of changes</li>
                                    <li>Customers unable to accept changes may terminate services</li>
                                </ul>
                            </div>
                        </div>

                        <div className="content-section">
                            <h2>10. Contact Information</h2>
                            <div className="section-content">
                                <p>For privacy-related questions, concerns, or requests, contact our Data Protection Officer:</p>
                                
                                <div className="contact-info">
                                    <div className="contact-item">
                                        <strong>Teddy Tapiador</strong>
                                        <p>Owner & Data Protection Officer</p>
                                        <p>PrismBox 3D Services</p>
                                    </div>
                                    
                                    <div className="contact-methods">
                                        <p><strong>Email:</strong> prismbox3dservice@gmail.com</p>
                                        <p><strong>Messenger:</strong> Teddy Tapiador</p>
                                        <p><strong>Location:</strong> Bulacan, Philippines</p>
                                        <p><strong>Response Time:</strong> Maximum 48 hours</p>
                                    </div>
                                </div>
                                
                                <p>For unresolved privacy issues, you may also contact the National Privacy Commission of the Philippines.</p>
                            </div>
                        </div>

                        <div className="content-section">
                            <h2>11. Legal Compliance</h2>
                            <div className="section-content">
                                <p>This Privacy Policy complies with:</p>
                                <ul>
                                    <li>Republic Act No. 10173 (Data Privacy Act of 2012)</li>
                                    <li>Implementing Rules and Regulations of the DPA</li>
                                    <li>National Privacy Commission circulars and advisories</li>
                                    <li>Republic Act No. 7394 (Consumer Act of the Philippines)</li>
                                </ul>
                                
                                <p>As a small business, we operate under exemption provisions but voluntarily implement enhanced data protection measures to ensure your privacy rights are fully respected.</p>
                            </div>
                        </div>

                        {/* Footer Note */}
                        <div className="policy-footer">
                            <p><strong>Student-Owned Business Commitment:</strong> As a student entrepreneur, we are committed to building trust through transparent data practices, responsible information handling, and respect for customer privacy rights. Your privacy is fundamental to our business values and long-term success.</p>
                        </div>

                    </div>
                </section>

            </div>
            <Footer />
        </>
    );
};

export default PrivacyPolicy;
