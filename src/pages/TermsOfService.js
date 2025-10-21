import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './PrivacyPolicy.css';

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5"/>
    <polyline points="12,19 5,12 12,5"/>
  </svg>
);

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <div className="privacy-policy-page">
                <div className="policy-container">
                    
                    <div className="policy-header">
                        <button onClick={() => navigate('/')} className="back-button">
                            <BackIcon />
                            Back to Home
                        </button>
                        <div className="header-content">
                            <h1>Privacy Policy and Data Protection Statement</h1>
                            <p className="last-updated">
                                <strong>Effective Date:</strong> October 22, 2025<br/>
                                <strong>Last Updated:</strong> October 22, 2025<br/>
                                <strong>Version:</strong> 1.0<br/>
                                <strong>Review Cycle:</strong> Annual or as required by law
                            </p>
                            <p className="policy-intro">
                                <strong>LEGAL COMPLIANCE NOTICE:</strong> This Privacy Policy ("Policy", "Statement") is designed to comply with Republic Act No. 10173 (Data Privacy Act of 2012), its Implementing Rules and Regulations, National Privacy Commission circulars and issuances, and all other applicable Philippine data protection laws and regulations. This Policy also incorporates consumer protection principles from Republic Act No. 7394 (Consumer Act of the Philippines) as they relate to information handling and customer rights. By using our services, you acknowledge understanding and acceptance of all data processing practices described herein.
                            </p>
                        </div>
                    </div>

                    <div className="policy-content">
                        
                        <section className="policy-section">
                            <h2>SECTION 1: DATA CONTROLLER IDENTIFICATION AND LEGAL STATUS</h2>
                            <div className="section-content">
                                
                                <h3>1.1 Data Controller Information</h3>
                                <p>
                                    <strong>(a) Legal Entity:</strong> PrismBox 3D Services, a sole proprietorship owned and operated by Edward "Teddy" Tapiador, Filipino citizen, student entrepreneur, with principal place of business in Bulacan, Philippines, serves as the Data Controller for all personal data processing activities described in this Policy.
                                </p>
                                <p>
                                    <strong>(b) Contact Information for Data Protection Matters:</strong> Data Protection Officer (Business Owner): Edward "Teddy" Tapiador; Email: prismbox3dservice@gmail.com; Messenger: Teddy Tapiador; Business Address: Bulacan, Philippines (specific address provided upon request for legal purposes); Response Time: Maximum 48 hours for privacy-related inquiries; Escalation: National Privacy Commission for unresolved issues.
                                </p>
                                <p>
                                    <strong>(c) Business Registration and Compliance Status:</strong> Operating under valid business permits and DTI registration; Compliant with BIR tax obligations for data processing activities; Adherent to local government requirements; Maintaining appropriate business insurance coverage; Subject to regular compliance review and updates.
                                </p>

                                <h3>1.2 Data Privacy Act Exemption and Voluntary Compliance</h3>
                                <p>
                                    <strong>(a) Exemption Status Under RA 10173:</strong> As a small business with fewer than 250 employees processing personal data of fewer than 1,000 individuals annually, PrismBox 3D Services operates under the exemption provisions of the Data Privacy Act as clarified in NPC Circular 16-01 and related issuances. This exemption covers certain registration and compliance requirements but does not eliminate all data protection obligations.
                                </p>
                                
                                <div className="compliance-note">
                                    <strong>Voluntary Enhanced Compliance:</strong> Despite exemption status, we voluntarily implement data protection measures that meet or exceed statutory requirements including formal privacy policies and procedures, data subject rights recognition and implementation, security measures appropriate for our business scale, breach notification procedures, and regular review and improvement of data practices.
                                </div>

                                <p>
                                    <strong>(c) Regulatory Monitoring and Adaptation:</strong> We continuously monitor changes in Data Privacy Act regulations and interpretations, National Privacy Commission advisories and guidelines, court decisions affecting small business obligations, industry best practices for data protection, and international standards applicable to Philippine businesses.
                                </p>

                                <h3>1.3 Lawful Basis for Data Processing</h3>
                                <p>
                                    <strong>(a) Legitimate Interest:</strong> Processing based on legitimate business interests for order fulfillment and customer service activities, quality control and business improvement, financial record keeping and tax compliance, business operations and administrative purposes, and customer relationship management and communication.
                                </p>
                                <p>
                                    <strong>(b) Contractual Necessity:</strong> Data processing required for executing service agreements and order contracts, providing requested 3D printing services, delivery and logistics coordination, payment processing and financial transactions, and warranty and support service provision.
                                </p>
                                <p>
                                    <strong>(c) Consent-Based Processing:</strong> Express consent obtained for marketing communications and newsletters, customer feedback and survey participation, student discount program participation, optional services not included in basic offerings, and third-party data sharing beyond service providers.
                                </p>
                                <p>
                                    <strong>(d) Legal Obligation Compliance:</strong> Processing required by law for tax record keeping and BIR reporting, business registration and permit maintenance, consumer protection law compliance, anti-money laundering reporting if applicable, and court orders or government investigations.
                                </p>
                            </div>
                        </section>

                        <section className="policy-section">
                            <h2>SECTION 2: COMPREHENSIVE DATA COLLECTION PRACTICES</h2>
                            <div className="section-content">
                                
                                <h3>2.1 Personal Information Categories</h3>
                                <p>
                                    <strong>(a) Identity and Contact Information:</strong> We collect full legal name as provided by customer, email addresses for business communication, phone numbers for order coordination and delivery, Messenger account information for customer service, alternative contact information for delivery purposes, and emergency contacts for high-value orders or special circumstances.
                                </p>
                                <p>
                                    <strong>(b) Address and Location Data:</strong> Geographic information includes billing address for payment processing, shipping address for delivery purposes, pickup location for personal collection arrangements, geographic region for pricing and delivery calculations, specific delivery instructions for complex locations, and address verification data from delivery carriers.
                                </p>
                                <p>
                                    <strong>(c) Financial and Payment Information:</strong> Transaction-related data including payment method preferences and details, GCash account information for transactions, bank account details for transfers, transaction history and payment confirmations, invoicing and receipt information, and credit and payment history for business relationship management.
                                </p>
                                <p>
                                    <strong>(d) Order and Project Information:</strong> Service-related data includes 3D model files and technical specifications, material preferences and color selections, quantity requirements and sizing information, special instructions and customization requests, delivery preferences and timing requirements, and quality standards and acceptance criteria.
                                </p>

                                <h3>2.2 Technical and Digital File Information</h3>
                                <p>
                                    <strong>(a) 3D Model Files and Designs:</strong> Digital assets processed include original 3D model files in various formats (.STL, .3MF, .OBJ, etc.), modified or optimized versions created for printing, slicing parameters and printer settings, print job history and statistics, quality control images and documentation, and file metadata including creation date, software used, and technical parameters.
                                </p>
                                <p>
                                    <strong>(b) Communication Records:</strong> Correspondence data includes email conversations regarding orders and services, Messenger chat history and attachments, voice messages or recordings if provided, image and video files shared for clarification, technical discussions and consultation records, and customer feedback and satisfaction surveys.
                                </p>
                                <p>
                                    <strong>(c) Website and System Information:</strong> Technical data collected includes IP addresses and geographic location data, device information including browser type and operating system, website usage statistics and page views, session information and user preferences, error logs and technical troubleshooting data, and performance metrics and system optimization data.
                                </p>

                                <h3>2.3 Special Categories and Sensitive Information</h3>
                                <p>
                                    <strong>(a) Student Information:</strong> Educational data for discount programs includes student identification numbers and verification, educational institution names and enrollment status, academic program and year level for eligibility, student ID images for verification purposes (deleted after confirmation), educational email addresses for verification, and graduation dates and academic status changes.
                                </p>

                                <div className="data-minimization">
                                    <strong>Data Minimization Principle:</strong> We collect only information necessary for our 3D printing services. We do not process personal data for marketing, profiling, or any purpose beyond our core business activities. Regular review ensures we maintain minimal data collection practices.
                                </div>

                                <p>
                                    <strong>(c) Business and Professional Information:</strong> Commercial client data includes company names and business registration details, professional titles and organizational roles, business addresses and contact information, project budgets and procurement processes, professional references and recommendations, and industry classifications and business sectors.
                                </p>

                                <h3>2.4 Data Collection Methods and Sources</h3>
                                <p>
                                    <strong>(a) Direct Collection from Customers:</strong> Information provided directly through order forms and service requests, email communications and attachments, Messenger conversations and file sharing, phone calls and voice messages, in-person meetings and consultations, and written correspondence and documentation.
                                </p>
                                <p>
                                    <strong>(b) Automatic Collection Through Systems:</strong> Technology-generated data includes website analytics and usage tracking, system logs and performance monitoring, error reports and debugging information, security monitoring and access logs, backup and recovery system data, and integration data from third-party services.
                                </p>
                                <p>
                                    <strong>(c) Third-Party Sources:</strong> External information sources include delivery carrier tracking and confirmation data, payment processor transaction details, social media platform information (Facebook Messenger), educational institution verification data, government databases for business compliance, and professional networks and referral sources.
                                </p>
                            </div>
                        </section>

                        <section className="policy-section">
                            <h2>SECTION 3: DATA PROCESSING PURPOSES AND LEGAL JUSTIFICATIONS</h2>
                            <div className="section-content">
                                
                                <h3>3.1 Primary Business Processing Purposes</h3>
                                <p>
                                    <strong>(a) Order Processing and Service Delivery:</strong> Core business functions include converting customer requirements into technical specifications, analyzing 3D files for printability and optimization, material selection and cost calculation, production scheduling and capacity planning, quality control monitoring and documentation, and packaging and delivery coordination.
                                </p>
                                <p>
                                    <strong>(b) Customer Communication and Support:</strong> Service-related communication includes responding to initial inquiries and questions, providing quotations and technical consultations, order confirmations and status updates, problem resolution and customer support, delivery notifications and tracking information, and post-delivery follow-up and satisfaction surveys.
                                </p>
                                <p>
                                    <strong>(c) Financial Management and Accounting:</strong> Business administration includes invoice generation and payment processing, financial record keeping and tax compliance, credit assessment for payment terms, collection activities for overdue accounts, financial reporting and business analysis, and audit trail maintenance for regulatory compliance.
                                </p>
                                <p>
                                    <strong>(d) Quality Assurance and Improvement:</strong> Service enhancement includes analyzing customer feedback for service improvements, tracking quality metrics and defect rates, identifying trends and patterns in customer requirements, developing new services and capabilities, benchmarking performance against industry standards, and implementing process improvements based on data analysis.
                                </p>

                                <h3>3.2 Secondary Processing Purposes</h3>
                                <p>
                                    <strong>(a) Business Development and Marketing:</strong> Growth activities include market research and customer segmentation, service development and expansion planning, competitive analysis and positioning, customer retention and relationship building, referral program management, and brand development and marketing communications.
                                </p>

                                <div className="legal-note">
                                    <strong>Legal Basis for Collection:</strong> Information is collected based on legitimate business interests and consent as required under the Data Privacy Act of 2012. We maintain detailed records of legal justifications for all processing activities.
                                </div>

                                <p>
                                    <strong>(c) Legal Compliance and Risk Management:</strong> Regulatory adherence includes maintaining records required by law, responding to government inquiries and investigations, implementing consumer protection requirements, data breach detection and response, legal dispute support and evidence preservation, and insurance claim documentation and support.
                                </p>

                                <h3>3.3 Data Processing Principles and Safeguards</h3>
                                <p>
                                    <strong>(a) Data Minimization Implementation:</strong> Collection limitations include only collecting personal data necessary for specified purposes, regular review of data collection practices, elimination of unnecessary data requests, streamlined forms and processes, customer choice in optional data provision, and periodic purging of unnecessary information.
                                </p>
                                <p>
                                    <strong>(b) Purpose Limitation and Compatibility:</strong> Use restrictions include data used only for stated purposes unless additional consent obtained, compatible uses evaluated for necessity and customer benefit, prohibition on unrelated commercial uses, clear boundaries between business and personal use, and secondary use approvals documented and tracked.
                                </p>

                                <div className="third-party-protection">
                                    <strong>Third-Party Protection:</strong> Any service provider with access to your data is required to maintain the same level of privacy protection as outlined in this policy. We maintain strict contractual requirements for all data processors.
                                </div>
                            </div>
                        </section>

                        <section className="policy-section">
                            <h2>SECTION 4: DATA SHARING, THIRD PARTIES, AND INTERNATIONAL TRANSFERS</h2>
                            <div className="section-content">
                                
                                <h3>4.1 Authorized Third-Party Service Providers</h3>
                                <p>
                                    <strong>(a) Delivery and Logistics Partners:</strong> Necessary information sharing with LBC Express for shipping services (name, address, contact number, package details), J&T Express for delivery coordination (delivery information only), Lalamove for same-day delivery (location and contact data), local courier services for specialized deliveries, and insurance providers for high-value shipment protection.
                                </p>
                                <p>
                                    <strong>(b) Payment Processing Services:</strong> Financial data sharing includes GCash for electronic payment processing (transaction amounts and references), banking institutions for transfer verification, payment gateway providers for online transactions, financial verification services for large orders, and accounting software providers for record keeping.
                                </p>
                                <p>
                                    <strong>(c) Communication Platform Providers:</strong> Platform-mediated data sharing includes Facebook/Meta for Messenger communications (subject to Facebook Privacy Policy), Google for email services (subject to Google Privacy Policy), cloud storage providers for file backup and sharing, website hosting services for online presence, and analytics providers for website performance monitoring.
                                </p>

                                <h3>4.2 Government and Legal Disclosure Requirements</h3>
                                <p>
                                    <strong>(a) Mandatory Legal Disclosures:</strong> Required by Philippine law for Bureau of Internal Revenue for tax compliance and audit purposes, Department of Trade and Industry for consumer protection investigations, National Privacy Commission for data protection compliance verification, court orders and judicial proceedings requiring evidence, and law enforcement agencies with valid legal process.
                                </p>
                                <p>
                                    <strong>(b) Voluntary Cooperation with Authorities:</strong> Good faith assistance includes consumer protection investigations and compliance reviews, tax audits and financial record verification, business permit and licensing renewals, industry surveys and regulatory studies, and academic research and policy development (anonymized data only).
                                </p>

                                <div className="rights-exercise">
                                    <strong>How to Exercise Your Rights:</strong> Contact us at prismbox3dservice@gmail.com or via Facebook Messenger (Teddy Tapiador). We will respond within 48 hours and provide complete resolution within 30 days as required by law.
                                </div>
                            </div>
                        </section>

                        <section className="policy-section">
                            <h2>SECTION 5: COMPREHENSIVE DATA SUBJECT RIGHTS AND PROCEDURES</h2>
                            <div className="section-content">
                                
                                <h3>5.1 Fundamental Privacy Rights Under Philippine Law</h3>
                                <p>
                                    <strong>(a) Right to Be Informed:</strong> Customers entitled to complete information about data collection purposes and legal basis, details about data processing activities and duration, information about third-party sharing and safeguards, explanation of rights and how to exercise them, updates about changes to processing practices, and clear and understandable privacy notices and communications.
                                </p>
                                <p>
                                    <strong>(b) Right of Access:</strong> Comprehensive access includes copies of all personal data we maintain, information about data sources and collection methods, details of processing purposes and legal justifications, lists of third parties who have received the data, data retention schedules and deletion timelines, and processing history and activity logs.
                                </p>
                                <p>
                                    <strong>(c) Right to Rectification and Correction:</strong> Data accuracy rights include correction of inaccurate or incomplete personal information, updates to outdated contact or billing information, modification of preferences and service requirements, addition of missing information for complete records, verification procedures for accuracy improvements, and notification of corrections to relevant third parties.
                                </p>
                                <p>
                                    <strong>(d) Right to Erasure and Deletion:</strong> Data deletion entitlements include complete removal of personal data when no longer necessary, deletion upon withdrawal of consent where applicable, erasure for unlawfully processed information, removal upon successful objection to processing, secure deletion with verification and confirmation, and exception notifications for legal retention requirements.
                                </p>

                                <h3>5.2 Consumer Protection Rights Integration</h3>
                                <p>
                                    <strong>(a) Consumer Act Rights:</strong> Additional protections include right to accurate information about services and pricing, protection against deceptive practices in data handling, right to fair treatment in privacy policy enforcement, consumer complaint mechanisms for privacy violations, and integration with general consumer protection procedures.
                                </p>

                                <div className="security-disclaimer">
                                    <strong>Beta Service Disclaimer:</strong> As a beta service, we implement reasonable security measures but cannot guarantee absolute security. We continuously improve our security practices as our business grows and commit to transparency about any limitations.
                                </div>

                                <h3>5.3 Rights Exercise Procedures and Timelines</h3>
                                <p>
                                    <strong>(a) Request Submission and Verification:</strong> Procedural requirements include written requests via official communication channels, identity verification to prevent unauthorized access, specific description of rights being exercised, supporting documentation where necessary, clear statement of desired outcomes, and contact information for response delivery.
                                </p>
                                <p>
                                    <strong>(b) Response Timelines and Commitments:</strong> Processing schedules include acknowledgment within 24 hours of request receipt, initial response within 72 hours for simple requests, complete response within 30 calendar days (statutory maximum), extensions communicated in advance with justification, progress updates for complex requests, and final confirmation of actions taken.
                                </p>
                            </div>
                        </section>

                        <section className="policy-section">
                            <h2>SECTION 6: COMPREHENSIVE SECURITY MEASURES AND DATA PROTECTION</h2>
                            <div className="section-content">
                                
                                <h3>6.1 Technical Security Safeguards</h3>
                                <p>
                                    <strong>(a) Data Encryption and Protection:</strong> Technical measures include end-to-end encryption for sensitive communications, secure file transfer protocols for 3D model files, encrypted storage systems for customer data, password protection for all access points, two-factor authentication where technically feasible, and regular encryption key rotation and management.
                                </p>
                                <p>
                                    <strong>(b) Access Controls and User Management:</strong> System security includes limited access based on business necessity and role requirements, unique user accounts with strong password requirements, regular access reviews and permission auditing, automated logout procedures for inactive sessions, privileged access monitoring and logging, and emergency access procedures with full documentation.
                                </p>

                                <h3>6.2 Data Retention and Deletion</h3>
                                <p>
                                    <strong>(a) Comprehensive Retention Schedule:</strong> Order records kept for 2 years for warranty and tax compliance purposes, 3D files deleted within 30 days after order delivery (unless requested otherwise), communication records retained for 1 year for customer service purposes, and student verification deleted immediately after discount verification.
                                </p>
                                <p>
                                    <strong>(b) Secure Deletion Procedures:</strong> Technical deletion includes multi-pass overwriting of digital storage media, cryptographic erasure for encrypted data, physical destruction of storage media when replacement occurs, verification of complete deletion through technical audits, and documentation of deletion procedures and completion.
                                </p>
                            </div>
                        </section>

                        <section className="policy-section">
                            <h2>SECTION 7: COOKIES, WEBSITE ANALYTICS, AND DIGITAL TRACKING</h2>
                            <div className="section-content">
                                
                                <h3>7.1 Cookie Usage and Management</h3>
                                <p>
                                    <strong>(a) Essential Cookies:</strong> Necessary website functionality includes session management for user experience, shopping cart and order tracking, user preference storage, security authentication tokens, load balancing and performance optimization, and error tracking and debugging information. These cookies cannot be disabled without affecting website functionality.
                                </p>
                                <p>
                                    <strong>(b) Analytics and Performance Cookies:</strong> Website optimization includes page view tracking and user behavior analysis, site performance monitoring and improvement, popular content identification, user journey mapping and optimization, A/B testing for website improvements, conversion rate optimization, with customer consent required for non-essential analytics.
                                </p>

                                <div className="beta-warning">
                                    <strong>Beta Service Notice:</strong> PrismBox 3D Services is currently operating in beta phase. This means we are continuously improving our processes, quality control, and data protection measures based on customer feedback and regulatory developments.
                                </div>

                                <h3>7.2 Customer Control and Opt-Out Options</h3>
                                <p>
                                    <strong>(a) Cookie Management Tools:</strong> Customer control options include browser-based cookie controls and settings, opt-out links for specific tracking systems, cookie preference centers on our website, Global Privacy Control (GPC) signal recognition, Do Not Track (DNT) header respect, and third-party opt-out tools and services.
                                </p>
                            </div>
                        </section>

                        <section className="policy-section">
                            <h2>SECTION 8: CHILDREN'S PRIVACY AND AGE-APPROPRIATE PROTECTIONS</h2>
                            <div className="section-content">
                                
                                <h3>8.1 Age Restrictions and Verification</h3>
                                <p>
                                    Our services are intended for individuals 18 years and older. We do not knowingly collect personal information from children under 18 without parental consent, in compliance with the Data Privacy Act of 2012.
                                </p>
                                <p>
                                    If you are under 18 and wish to use our services, please have a parent or guardian place the order on your behalf. We implement enhanced protections for any identified minor customers including parental notification requirements and limited data collection practices.
                                </p>
                            </div>
                        </section>

                        <section className="policy-section">
                            <h2>SECTION 9: INTERNATIONAL DATA TRANSFER SAFEGUARDS</h2>
                            <div className="section-content">
                                
                                <h3>9.1 Cross-Border Data Protection</h3>
                                <p>
                                    Your personal data is processed and stored within the Philippines. Any international transfer (such as cloud storage services) is conducted with appropriate safeguards to ensure data protection equivalent to Philippine standards.
                                </p>
                                
                                <ul>
                                    <li><strong>Cloud Storage:</strong> Reputable providers with Philippines data residency or equivalent protection</li>
                                    <li><strong>Email Services:</strong> Gmail/Google services with standard encryption</li>
                                    <li><strong>Communication:</strong> Facebook Messenger (governed by Facebook's privacy policy)</li>
                                </ul>
                            </div>
                        </section>

                        <section className="policy-section">
                            <h2>SECTION 10: INCIDENT RESPONSE AND BREACH NOTIFICATION</h2>
                            <div className="section-content">
                                
                                <h3>10.1 Security Incident Management</h3>
                                <p>
                                    <strong>(a) Detection and Response:</strong> We maintain systems for detecting unauthorized access, data breaches, or security incidents. Upon detection, we immediately contain the incident, assess the impact, and notify affected customers and relevant authorities as required by law.
                                </p>
                                <p>
                                    <strong>(b) Customer Notification:</strong> In the event of a data breach affecting your personal information, we will notify you within 72 hours via email and provide clear information about what happened, what information was involved, what we are doing to resolve the issue, and steps you can take to protect yourself.
                                </p>

                                <div className="contact-info-box">
                                    <h3>Privacy Officer Contact Information</h3>
                                    <p>
                                        <strong>Name:</strong> Teddy Tapiador (Business Owner/Student)<br/>
                                        <strong>Email:</strong> prismbox3dservice@gmail.com<br/>
                                        <strong>Messenger:</strong> Teddy Tapiador<br/>
                                        <strong>Response Time:</strong> Within 48 hours for privacy-related inquiries<br/>
                                        <strong>Business Hours:</strong> Monday-Sunday, 9:00 AM - 8:00 PM (Philippine Time)
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="policy-section">
                            <h2>SECTION 11: FINAL LEGAL PROVISIONS AND ACKNOWLEDGMENTS</h2>
                            <div className="section-content">
                                
                                <h3>11.1 Policy Updates and Change Management</h3>
                                <p>
                                    We may update this Privacy Policy periodically to reflect changes in our business practices, legal requirements, or improvements to our data protection measures. Material changes will be communicated via email and posted on our website 30 days before taking effect.
                                </p>

                                <h3>11.2 Legal Compliance Framework</h3>
                                <p>
                                    This Privacy Policy is designed to comply with Philippine law and protect both customer rights and business interests. However, this document does not constitute legal advice. As a student-owned business, we operate with good faith and reasonable care in handling personal data.
                                </p>

                                <h3>11.3 Government Contact Information</h3>
                                <ul>
                                    <li><strong>National Privacy Commission:</strong> privacy.gov.ph | +63 (2) 8234-2228</li>
                                    <li><strong>DTI Consumer Care:</strong> consumercare.dti.gov.ph | 1384 (DTI Hotline)</li>
                                </ul>

                                <div className="final-privacy-notice">
                                    <h3>FINAL PRIVACY PROTECTION COMMITMENT</h3>
                                    <p>
                                        <strong>CUSTOMER PRIVACY GUARANTEE:</strong> PrismBox 3D Services commits to treating your personal information with the highest level of respect, protection, and care. We recognize that privacy is a fundamental right and that your trust in our data handling practices is essential to our business relationship.
                                    </p>
                                    
                                    <p>
                                        <strong>REGULATORY COMPLIANCE COMMITMENT:</strong> We commit to maintaining full compliance with the Data Privacy Act of 2012 and all related Philippine privacy laws and regulations. As our business grows and evolves, we will continue to enhance our privacy practices and maintain the trust our customers place in us.
                                    </p>
                                </div>

                                <div className="signature-block">
                                    <p>
                                        <strong>PRISMBOX 3D SERVICES</strong><br/>
                                        Edward "Teddy" Tapiador, Owner and Data Protection Officer<br/>
                                        Student Entrepreneur<br/>
                                        Bulacan, Philippines<br/>
                                        <br/>
                                        <em>By: Electronic Publication and Digital Implementation</em><br/>
                                        <em>Date: October 22, 2025</em>
                                    </p>
                                </div>
                            </div>
                        </section>

                        <div className="policy-footer">
                            <p>
                                <strong>PrismBox 3D Services - Privacy Policy and Data Protection Statement</strong><br/>
                                Student-Owned Business | Bulacan, Philippines<br/>
                                Operating in Full Compliance with Data Privacy Act of 2012<br/>
                                Committed to Privacy Protection and Customer Trust
                            </p>
                            
                            <div className="policy-actions">
                                <button onClick={() => navigate('/terms')} className="terms-link-btn">
                                    View Terms of Service
                                </button>
                                <button onClick={() => navigate('/')} className="home-link-btn">
                                    Back to Home
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PrivacyPolicy;
