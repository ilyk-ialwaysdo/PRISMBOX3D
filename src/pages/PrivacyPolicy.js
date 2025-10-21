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
                                    <strong>(a) Legal Entity:</strong> PrismBox 3D Services, a sole proprietorship owned and operated by Teddy Tapiador, Filipino citizen, student entrepreneur, with principal place of business in Bulacan, Philippines, serves as the Data Controller for all personal data processing activities described in this Policy.
                                </p>
                                <p>
                                    <strong>(b) Contact Information for Data Protection Matters:</strong> Data Protection Officer (Business Owner): Teddy Tapiador; Email: prismbox3dservice@gmail.com; Messenger: Teddy Tapiador; Business Address: Bulacan, Philippines (specific address provided upon request for legal purposes); Response Time: Maximum 48 hours for privacy-related inquiries; Escalation: National Privacy Commission for unresolved issues.
                                </p>
                                <p>
                                    <strong>(c) Business Registration and Compliance Status:</strong> Operating under valid business permits and DTI registration; Compliant with BIR tax obligations for data processing activities; Adherent to local government requirements; Maintaining appropriate business insurance coverage; Subject to regular compliance review and updates.
                                </p>

                                <h3>1.2 Data Privacy Act Exemption and Voluntary Compliance</h3>
                                <p>
                                    <strong>(a) Exemption Status Under RA 10173:</strong> As a small business with fewer than 250 employees processing personal data of fewer than 1,000 individuals annually, PrismBox 3D Services operates under the exemption provisions of the Data Privacy Act as clarified in NPC Circular 16-01 and related issuances. This exemption covers certain registration and compliance requirements but does not eliminate all data protection obligations.
                                </p>
                                <p>
                                    <strong>(b) Voluntary Enhanced Compliance:</strong> Despite exemption status, we voluntarily implement data protection measures that meet or exceed statutory requirements including: Formal privacy policies and procedures; Data subject rights recognition and implementation; Security measures appropriate for our business scale; Breach notification procedures; Regular review and improvement of data practices.
                                </p>
                                <p>
                                    <strong>(c) Regulatory Monitoring and Adaptation:</strong> We continuously monitor: Changes in Data Privacy Act regulations and interpretations; National Privacy Commission advisories and guidelines; Court decisions affecting small business obligations; Industry best practices for data protection; International standards applicable to Philippine businesses.
                                </p>

                                <h3>1.3 Lawful Basis for Data Processing</h3>
                                <p>
                                    <strong>(a) Legitimate Interest:</strong> Processing based on legitimate business interests for: Order fulfillment and customer service activities; Quality control and business improvement; Financial record keeping and tax compliance; Business operations and administrative purposes; Customer relationship management and communication.
                                </p>
                                <p>
                                    <strong>(b) Contractual Necessity:</strong> Data processing required for: Executing service agreements and order contracts; Providing requested 3D printing services; Delivery and logistics coordination; Payment processing and financial transactions; Warranty and support service provision.
                                </p>
                                <p>
                                    <strong>(c) Consent-Based Processing:</strong> Express consent obtained for: Marketing communications and newsletters; Customer feedback and survey participation; Student discount program participation; Optional services not included in basic offerings; Third-party data sharing beyond service providers.
                                </p>
                                <p>
                                    <strong>(d) Legal Obligation Compliance:</strong> Processing required by law for: Tax record keeping and BIR reporting; Business registration and permit maintenance; Consumer protection law compliance; Anti-money laundering reporting if applicable; Court orders or government investigations.
                                </p>
                            </div>
                        </section>

                        <section className="policy-section">
                            <h2>SECTION 2: COMPREHENSIVE DATA COLLECTION PRACTICES</h2>
                            <div className="section-content">
                                
                                <h3>2.1 Personal Information Categories</h3>
                                <p>
                                    <strong>(a) Identity and Contact Information:</strong> We collect: Full legal name as provided by customer; Email addresses for business communication; Phone numbers for order coordination and delivery; Messenger account information for customer service; Alternative contact information for delivery purposes; Emergency contacts for high-value orders or special circumstances.
                                </p>
                                <p>
                                    <strong>(b) Address and Location Data:</strong> Geographic information includes: Billing address for payment processing; Shipping address for delivery purposes; Pickup location for personal collection arrangements; Geographic region for pricing and delivery calculations; Specific delivery instructions for complex locations; Address verification data from delivery carriers.
                                </p>
                                <p>
                                    <strong>(c) Financial and Payment Information:</strong> Transaction-related data: Payment method preferences and details; GCash account information for transactions; Bank account details for transfers; Transaction history and payment confirmations; Invoicing and receipt information; Credit and payment history for business relationship management.
                                </p>
                                <p>
                                    <strong>(d) Order and Project Information:</strong> Service-related data includes: 3D model files and technical specifications; Material preferences and color selections; Quantity requirements and sizing information; Special instructions and customization requests; Delivery preferences and timing requirements; Quality standards and acceptance criteria.
                                </p>

                                <h3>2.2 Technical and Digital File Information</h3>
                                <p>
                                    <strong>(a) 3D Model Files and Designs:</strong> Digital assets processed: Original 3D model files in various formats (.STL, .3MF, .OBJ, etc.); Modified or optimized versions created for printing; Slicing parameters and printer settings; Print job history and statistics; Quality control images and documentation; File metadata including creation date, software used, and technical parameters.
                                </p>
                                <p>
                                    <strong>(b) Communication Records:</strong> Correspondence data: Email conversations regarding orders and services; Messenger chat history and attachments; Voice messages or recordings if provided; Image and video files shared for clarification; Technical discussions and consultation records; Customer feedback and satisfaction surveys.
                                </p>
                                <p>
                                    <strong>(c) Website and System Information:</strong> Technical data collected: IP addresses and geographic location data; Device information including browser type and operating system; Website usage statistics and page views; Session information and user preferences; Error logs and technical troubleshooting data; Performance metrics and system optimization data.
                                </p>

                                <h3>2.3 Special Categories and Sensitive Information</h3>
                                <p>
                                    <strong>(a) Student Information:</strong> Educational data for discount programs: Student identification numbers and verification; Educational institution names and enrollment status; Academic program and year level for eligibility; Student ID images for verification purposes (deleted after confirmation); Educational email addresses for verification; Graduation dates and academic status changes.
                                </p>
                                <p>
                                    <strong>(b) Business and Professional Information:</strong> Commercial client data: Company names and business registration details; Professional titles and organizational roles; Business addresses and contact information; Project budgets and procurement processes; Professional references and recommendations; Industry classifications and business sectors.
                                </p>
                                <p>
                                    <strong>(c) Preference and Behavioral Data:</strong> Service customization information: Material and color preferences; Quality standards and specifications; Communication preferences and methods; Delivery preferences and special requirements; Feedback patterns and service ratings; Repeat order patterns and customer loyalty data.
                                </p>

                                <h3>2.4 Data Collection Methods and Sources</h3>
                                <p>
                                    <strong>(a) Direct Collection from Customers:</strong> Information provided directly: Order forms and service requests; Email communications and attachments; Messenger conversations and file sharing; Phone calls and voice messages; In-person meetings and consultations; Written correspondence and documentation.
                                </p>
                                <p>
                                    <strong>(b) Automatic Collection Through Systems:</strong> Technology-generated data: Website analytics and usage tracking; System logs and performance monitoring; Error reports and debugging information; Security monitoring and access logs; Backup and recovery system data; Integration data from third-party services.
                                </p>
                                <p>
                                    <strong>(c) Third-Party Sources:</strong> External information sources: Delivery carrier tracking and confirmation data; Payment processor transaction details; Social media platform information (Facebook Messenger); Educational institution verification data; Government databases for business compliance; Professional networks and referral sources.
                                </p>
                            </div>
                        </section>

                        <section className="policy-section">
                            <h2>SECTION 3: DATA PROCESSING PURPOSES AND LEGAL JUSTIFICATIONS</h2>
                            <div className="section-content">
                                
                                <h3>3.1 Primary Business Processing Purposes</h3>
                                <p>
                                    <strong>(a) Order Processing and Service Delivery:</strong> Core business functions: Converting customer requirements into technical specifications; Analyzing 3D files for printability and optimization; Material selection and cost calculation; Production scheduling and capacity planning; Quality control monitoring and documentation; Packaging and delivery coordination.
                                </p>
                                <p>
                                    <strong>(b) Customer Communication and Support:</strong> Service-related communication: Responding to initial inquiries and questions; Providing quotations and technical consultations; Order confirmations and status updates; Problem resolution and customer support; Delivery notifications and tracking information; Post-delivery follow-up and satisfaction surveys.
                                </p>
                                <p>
                                    <strong>(c) Financial Management and Accounting:</strong> Business administration: Invoice generation and payment processing; Financial record keeping and tax compliance; Credit assessment for payment terms; Collection activities for overdue accounts; Financial reporting and business analysis; Audit trail maintenance for regulatory compliance.
                                </p>
                                <p>
                                    <strong>(d) Quality Assurance and Improvement:</strong> Service enhancement: Analyzing customer feedback for service improvements; Tracking quality metrics and defect rates; Identifying trends and patterns in customer requirements; Developing new services and capabilities; Benchmarking performance against industry standards; Implementing process improvements based on data analysis.
                                </p>

                                <h3>3.2 Secondary Processing Purposes</h3>
                                <p>
                                    <strong>(a) Business Development and Marketing:</strong> Growth activities: Market research and customer segmentation; Service development and expansion planning; Competitive analysis and positioning; Customer retention and relationship building; Referral program management; Brand development and marketing communications.
                                </p>
                                <p>
                                    <strong>(b) Legal Compliance and Risk Management:</strong> Regulatory adherence: Maintaining records required by law; Responding to government inquiries and investigations; Implementing consumer protection requirements; Data breach detection and response; Legal dispute support and evidence preservation; Insurance claim documentation and support.
                                </p>
                                <p>
                                    <strong>(c) Research and Development:</strong> Innovation activities: Analyzing project types and technical challenges; Researching new materials and technologies; Developing improved processes and procedures; Educational and academic research integration; Industry collaboration and knowledge sharing; Publication of anonymized research findings.
                                </p>

                                <h3>3.3 Data Processing Principles and Safeguards</h3>
                                <p>
                                    <strong>(a) Data Minimization Principle:</strong> Collection limitations: Only collecting personal data necessary for specified purposes; Regular review of data collection practices; Elimination of unnecessary data requests; Streamlined forms and processes; Customer choice in optional data provision; Periodic purging of unnecessary information.
                                </p>
                                <p>
                                    <strong>(b) Purpose Limitation and Compatibility:</strong> Use restrictions: Data used only for stated purposes unless additional consent obtained; Compatible uses evaluated for necessity and customer benefit; Prohibition on unrelated commercial uses; Clear boundaries between business and personal use; Secondary use approvals documented and tracked.
                                </p>
                                <p>
                                    <strong>(c) Accuracy and Data Quality:</strong> Information integrity: Regular verification of customer information; Correction procedures for inaccurate data; Customer access to review and update information; Quality control checks for data entry; Error correction protocols and procedures; Data validation systems and verification processes.
                                </p>

                                <h3>3.4 Retention and Storage Justifications</h3>
                                <p>
                                    <strong>(a) Business Record Retention:</strong> Operational necessity: Customer information retained for relationship management; Order history maintained for warranty and support purposes; Financial records kept for tax and audit compliance; Communication records preserved for customer service; Quality data retained for process improvement; Legal records maintained for dispute resolution.
                                </p>
                                <p>
                                    <strong>(b) Legal and Regulatory Requirements:</strong> Mandatory retention: Tax records maintained per BIR requirements (typically 3-10 years); Consumer protection records per DTI guidelines; Contract documentation per Civil Code statute of limitations; Employee records per Labor Code requirements; Business permit and registration records; Intellectual property protection documentation.
                                </p>
                                <p>
                                    <strong>(c) Security and Backup Considerations:</strong> Technical requirements: Backup systems for business continuity; Disaster recovery and data restoration; Version control and change tracking; System maintenance and upgrade records; Security monitoring and incident logs; Technical support and troubleshooting documentation.
                                </p>
                            </div>
                        </section>

                        <section className="policy-section">
                            <h2>SECTION 4: DATA SHARING, THIRD PARTIES, AND INTERNATIONAL TRANSFERS</h2>
                            <div className="section-content">
                                
                                <h3>4.1 Authorized Third-Party Service Providers</h3>
                                <p>
                                    <strong>(a) Delivery and Logistics Partners:</strong> Necessary information sharing with: LBC Express for shipping services (name, address, contact number, package details); J&T Express for delivery coordination (delivery information only); Lalamove for same-day delivery (location and contact data); Local courier services for specialized deliveries; Insurance providers for high-value shipment protection.
                                </p>
                                <p>
                                    <strong>(b) Payment Processing Services:</strong> Financial data sharing: GCash for electronic payment processing (transaction amounts and references); Banking institutions for transfer verification; Payment gateway providers for online transactions; Financial verification services for large orders; Accounting software providers for record keeping.
                                </p>
                                <p>
                                    <strong>(c) Communication Platform Providers:</strong> Platform-mediated data sharing: Facebook/Meta for Messenger communications (subject to Facebook Privacy Policy); Google for email services (subject to Google Privacy Policy); Cloud storage providers for file backup and sharing; Website hosting services for online presence; Analytics providers for website performance monitoring.
                                </p>
                                <p>
                                    <strong>(d) Professional Service Providers:</strong> Business support sharing: Legal counsel for contract and compliance advice; Accounting professionals for tax and financial compliance; Insurance brokers and providers; Technical consultants for specialized projects; Educational institution resources for research and development.
                                </p>

                                <h3>4.2 Data Protection Requirements for Third Parties</h3>
                                <p>
                                    <strong>(a) Contractual Safeguards:</strong> All service providers bound by: Written agreements requiring equivalent data protection; Specific limitations on data use and processing; Security requirements matching our standards; Breach notification and response procedures; Regular compliance monitoring and auditing; Termination rights for non-compliance.
                                </p>
                                <p>
                                    <strong>(b) Due Diligence and Vetting:</strong> Third-party evaluation: Privacy policy and security practice reviews; Reputation and reliability assessment; Financial stability and business continuity evaluation; Technical capability and security infrastructure review; Legal compliance and regulatory standing verification; Customer references and industry reputation checks.
                                </p>
                                <p>
                                    <strong>(c) Ongoing Monitoring and Management:</strong> Relationship oversight: Regular security and privacy practice reviews; Performance monitoring and service level verification; Incident response coordination and communication; Contract renewal evaluations and improvements; Alternative provider research and backup planning; Customer notification of significant changes.
                                </p>

                                <h3>4.3 Government and Legal Disclosure Requirements</h3>
                                <p>
                                    <strong>(a) Mandatory Legal Disclosures:</strong> Required by Philippine law: Bureau of Internal Revenue for tax compliance and audit purposes; Department of Trade and Industry for consumer protection investigations; National Privacy Commission for data protection compliance verification; Court orders and judicial proceedings requiring evidence; Law enforcement agencies with valid legal process.
                                </p>
                                <p>
                                    <strong>(b) Voluntary Cooperation with Authorities:</strong> Good faith assistance: Consumer protection investigations and compliance reviews; Tax audits and financial record verification; Business permit and licensing renewals; Industry surveys and regulatory studies; Academic research and policy development (anonymized data only).
                                </p>
                                <p>
                                    <strong>(c) Legal Process Response Procedures:</strong> Systematic approach: Legal review of all government requests; Customer notification where legally permissible; Minimum necessary information disclosure; Documentation of all government interactions; Legal counsel consultation for complex requests; Appeals and challenge procedures where appropriate.
                                </p>

                                <h3>4.4 International Data Transfer Safeguards</h3>
                                <p>
                                    <strong>(a) Cloud Storage and International Services:</strong> Cross-border protections: Selection of providers with adequate protection standards; Contractual guarantees for data protection equivalent to Philippine standards; Regular security audits and compliance certifications; Data residency preferences for Philippine-based storage; Backup and recovery systems with appropriate protections.
                                </p>
                                <p>
                                    <strong>(b) Communication Platform Protections:</strong> International service use: Facebook/Meta Messenger with privacy safeguards; Google services with appropriate data protection; International email providers with encryption; Cloud file sharing with access controls; International payment processors with security standards.
                                </p>
                                <p>
                                    <strong>(c) Transfer Documentation and Monitoring:</strong> Oversight procedures: Documentation of all international data transfers; Regular review of transfer mechanisms and protections; Monitoring of provider policy changes; Impact assessment for regulatory changes; Customer notification of significant changes to international transfer practices.
                                </p>
                            </div>
                        </section>

                        <section className="policy-section">
                            <h2>SECTION 5: COMPREHENSIVE DATA SUBJECT RIGHTS AND PROCEDURES</h2>
                            <div className="section-content">
                                
                                <h3>5.1 Fundamental Privacy Rights Under Philippine Law</h3>
                                <p>
                                    <strong>(a) Right to Be Informed:</strong> Customers entitled to: Complete information about data collection purposes and legal basis; Details about data processing activities and duration; Information about third-party sharing and safeguards; Explanation of rights and how to exercise them; Updates about changes to processing practices; Clear and understandable privacy notices and communications.
                                </p>
                                <p>
                                    <strong>(b) Right of Access:</strong> Comprehensive access includes: Copies of all personal data we maintain; Information about data sources and collection methods; Details of processing purposes and legal justifications; Lists of third parties who have received the data; Data retention schedules and deletion timelines; Processing history and activity logs.
                                </p>
                                <p>
                                    <strong>(c) Right to Rectification and Correction:</strong> Data accuracy rights: Correction of inaccurate or incomplete personal information; Updates to outdated contact or billing information; Modification of preferences and service requirements; Addition of missing information for complete records; Verification procedures for accuracy improvements; Notification of corrections to relevant third parties.
                                </p>
                                <p>
                                    <strong>(d) Right to Erasure and Deletion:</strong> Data deletion entitlements: Complete removal of personal data when no longer necessary; Deletion upon withdrawal of consent where applicable; Erasure for unlawfully processed information; Removal upon successful objection to processing; Secure deletion with verification and confirmation; Exception notifications for legal retention requirements.
                                </p>

                                <h3>5.2 Advanced Privacy Rights and Options</h3>
                                <p>
                                    <strong>(a) Right to Restrict Processing:</strong> Processing limitations: Suspension of non-essential processing activities; Restriction pending dispute resolution or investigation; Limitation during accuracy verification processes; Temporary holds for consent withdrawal processing; Processing restrictions for specific data categories; Exemptions for legal obligations and vital interests.
                                </p>
                                <p>
                                    <strong>(b) Right to Data Portability:</strong> Data transfer facilitation: Machine-readable formats for customer data exports; Standardized file formats for easy transfer; Complete data packages including metadata; Technical assistance for data migration; Secure transfer procedures to prevent unauthorized access; Documentation and verification of successful transfers.
                                </p>
                                <p>
                                    <strong>(c) Right to Object and Withdraw Consent:</strong> Opposition and withdrawal rights: Objection to processing based on legitimate interests; Withdrawal of consent for optional processing activities; Opt-out procedures for marketing communications; Cessation of non-essential data collection; Alternative service arrangements respecting objections; Clear procedures for implementing customer choices.
                                </p>

                                <h3>5.3 Rights Exercise Procedures and Timelines</h3>
                                <p>
                                    <strong>(a) Request Submission and Verification:</strong> Procedural requirements: Written requests via official communication channels; Identity verification to prevent unauthorized access; Specific description of rights being exercised; Supporting documentation where necessary; Clear statement of desired outcomes; Contact information for response delivery.
                                </p>
                                <p>
                                    <strong>(b) Response Timelines and Commitments:</strong> Processing schedules: Acknowledgment within 24 hours of request receipt; Initial response within 72 hours for simple requests; Complete response within 30 calendar days (statutory maximum); Extensions communicated in advance with justification; Progress updates for complex requests; Final confirmation of actions taken.
                                </p>
                                <p>
                                    <strong>(c) Appeal and Escalation Procedures:</strong> Dispute resolution: Internal review process for denied requests; Management escalation for complex situations; Independent review by qualified professionals; National Privacy Commission complaint procedures; Legal remedy information and assistance; Documentation of appeals and resolution attempts.
                                </p>

                                <h3>5.4 Consumer Protection Integration</h3>
                                <p>
                                    <strong>(a) Consumer Act Rights:</strong> Additional protections: Right to accurate information about services and pricing; Protection against deceptive practices in data handling; Right to fair treatment in privacy policy enforcement; Consumer complaint mechanisms for privacy violations; Integration with general consumer protection procedures.
                                </p>
                                <p>
                                    <strong>(b) Enhanced Remedies for Privacy Violations:</strong> Consumer-specific remedies: Service credits or discounts for privacy policy violations; Priority service restoration after privacy incidents; Enhanced support and assistance for affected customers; Goodwill gestures for privacy-related inconvenience; Long-term monitoring for customers affected by breaches.
                                </p>
                                <p>
                                    <strong>(c) Educational and Support Resources:</strong> Customer empowerment: Plain-language explanations of privacy rights; Step-by-step guides for exercising rights; Educational materials about data protection; Personal assistance with privacy requests; Follow-up support to ensure satisfaction; Continuous improvement based on customer feedback.
                                </p>
                            </div>
                        </section>

                        <section className="policy-section">
                            <h2>SECTION 6: COMPREHENSIVE SECURITY MEASURES AND DATA PROTECTION</h2>
                            <div className="section-content">
                                
                                <h3>6.1 Technical Security Safeguards</h3>
                                <p>
                                    <strong>(a) Data Encryption and Protection:</strong> Technical measures: End-to-end encryption for sensitive communications; Secure file transfer protocols for 3D model files; Encrypted storage systems for customer data; Password protection for all access points; Two-factor authentication where technically feasible; Regular encryption key rotation and management.
                                </p>
                                <p>
                                    <strong>(b) Access Controls and User Management:</strong> System security: Limited access based on business necessity and role requirements; Unique user accounts with strong password requirements; Regular access reviews and permission auditing; Automated logout procedures for inactive sessions; Privileged access monitoring and logging; Emergency access procedures with full documentation.
                                </p>
                                <p>
                                    <strong>(c) Network and System Security:</strong> Infrastructure protection: Firewall protection for all business systems; Regular security updates and patch management; Antivirus and malware protection systems; Network monitoring for suspicious activities; Intrusion detection and prevention systems; Regular security assessments and vulnerability testing.
                                </p>
                                <p>
                                    <strong>(d) Backup and Recovery Systems:</strong> Data preservation: Regular automated backups of all critical data; Geographically distributed backup storage; Recovery testing and verification procedures; Business continuity planning for data protection; Disaster recovery procedures and timelines; Backup encryption and security verification.
                                </p>

                                <h3>6.2 Physical Security Measures</h3>
                                <p>
                                    <strong>(a) Facility and Equipment Protection:</strong> Physical safeguards: Secure storage of computing equipment and devices; Locked storage for physical documents and records; Access controls for business premises; Visitor management and supervision procedures; Equipment disposal and destruction protocols; Environmental controls for equipment protection.
                                </p>
                                <p>
                                    <strong>(b) Document and Media Security:</strong> Physical information protection: Locked filing systems for paper documents; Secure destruction of confidential materials; USB and storage device encryption requirements; Printer and copier security for confidential materials; Clean desk policies for work areas; Secure mail and package handling procedures.
                                </p>
                                <p>
                                    <strong>(c) Personal Device and BYOD Security:</strong> Device management: Security requirements for personal devices accessing business data; Mobile device management and encryption; Remote access security protocols; Lost or stolen device response procedures; Personal device separation of business and personal data; Regular security training and awareness.
                                </p>

                                <h3>6.3 Administrative and Procedural Safeguards</h3>
                                <p>
                                    <strong>(a) Personnel Security and Training:</strong> Human resource protections: Background checks appropriate for business scale; Confidentiality agreements for all personnel; Regular privacy and security training; Incident response training and procedures; Disciplinary procedures for security violations; Ongoing education about evolving threats and protections.
                                </p>
                                <p>
                                    <strong>(b) Policy and Procedure Implementation:</strong> Systematic approaches: Written security policies and procedures; Regular review and update of security measures; Incident response plans and communication procedures; Customer notification protocols for security events; Documentation requirements for security incidents; Continuous improvement based on lessons learned.
                                </p>
                                <p>
                                    <strong>(c) Vendor and Third-Party Management:</strong> Supply chain security: Security requirements in all vendor contracts; Regular security assessments of service providers; Incident notification requirements from vendors; Termination rights for security violations; Alternative provider evaluation and backup planning; Integration of third-party security into overall protection strategy.
                                </p>

                                <h3>6.4 Monitoring, Auditing, and Improvement</h3>
                                <p>
                                    <strong>(a) Security Monitoring and Detection:</strong> Ongoing surveillance: Real-time monitoring of system access and activities; Automated alerts for suspicious or unauthorized activities; Regular log reviews and analysis; Trend identification and threat assessment; Performance monitoring of security controls; Customer activity monitoring for fraud prevention.
                                </p>
                                <p>
                                    <strong>(b) Regular Assessment and Testing:</strong> Validation procedures: Periodic security assessments and penetration testing; Vulnerability scans and remediation; Business continuity and disaster recovery testing; Employee security awareness testing; Customer notification system testing; Third-party security validation and verification.
                                </p>
                                <p>
                                    <strong>(c) Continuous Improvement and Investment:</strong> Security enhancement: Regular investment in security technology and tools; Staff training and certification programs; Industry best practice implementation; Customer feedback integration into security improvements; Regulatory change adaptation and implementation; Future-proofing for evolving threats and requirements.
                                </p>
                            </div>
                        </section>

                        <section className="policy-section">
                            <h2>SECTION 7: DATA RETENTION, DELETION, AND LIFECYCLE MANAGEMENT</h2>
                            <div className="section-content">
                                
                                <h3>7.1 Comprehensive Retention Schedule</h3>
                                <p>
                                    <strong>(a) Customer Account Information:</strong> Identity and contact retention: Active customer data maintained throughout business relationship; Contact information retained for 2 years after last order; Account preferences and settings preserved during active period; Inactive account data archived after 1 year of no activity; Complete deletion after 3 years unless legal retention required; Customer-requested deletion honored immediately upon verification.
                                </p>
                                <p>
                                    <strong>(b) Order and Transaction Records:</strong> Business record retention: Order details and specifications retained for 2 years minimum; Payment and financial records kept per BIR requirements (typically 10 years); Invoice and receipt information maintained for tax compliance; Warranty claims and resolution records kept for 3 years; Quality control data retained for process improvement (2 years); Customer feedback and survey responses kept for 1 year.
                                </p>
                                <p>
                                    <strong>(c) Digital Files and Technical Data:</strong> File management lifecycle: 3D model files deleted within 30 days after successful delivery unless retention requested; Modified or optimized files deleted with original files; Print job settings and parameters retained for 6 months for support purposes; Quality control images deleted after 90 days; Communication attachments deleted with message retention schedule; Backup copies deleted according to same timeline.
                                </p>
                                <p>
                                    <strong>(d) Communication and Correspondence:</strong> Communication retention: Email correspondence retained for 1 year for customer service; Messenger conversations archived for 1 year; Voice messages and recordings deleted after 6 months; Customer support tickets retained for 2 years; Legal correspondence retained indefinitely; Marketing communications tracking deleted after 1 year.
                                </p>

                                <h3>7.2 Deletion Procedures and Verification</h3>
                                <p>
                                    <strong>(a) Secure Deletion Standards:</strong> Technical deletion procedures: Multi-pass overwriting of digital storage media; Cryptographic erasure for encrypted data; Physical destruction of storage media when replacement occurs; Verification of complete deletion through technical audits; Documentation of deletion procedures and completion; Recovery testing to verify successful deletion.
                                </p>
                                <p>
                                    <strong>(b) Third-Party Deletion Coordination:</strong> External data management: Notification to service providers requiring data deletion; Verification of third-party deletion compliance; Documentation of deletion requests and confirmations; Monitoring of third-party retention policy compliance; Legal agreements requiring synchronized deletion; Customer notification of complete deletion across all systems.
                                </p>
                                <p>
                                    <strong>(c) Legal Hold and Preservation Exceptions:</strong> Retention despite deletion schedules: Court orders requiring data preservation; Government investigations preventing routine deletion; Legal disputes requiring evidence preservation; Regulatory audits extending retention requirements; Customer requests for extended retention; Insurance claims requiring supporting documentation.
                                </p>

                                <h3>7.3 Customer Control and Customization</h3>
                                <p>
                                    <strong>(a) Retention Preference Management:</strong> Customer choices: Extended retention periods for customer convenience; Early deletion upon customer request; Selective retention for specific data categories; Custom retention schedules for business customers; Anniversary-based deletion scheduling; Automatic deletion notifications and confirmations.
                                </p>
                                <p>
                                    <strong>(b) Data Download and Export:</strong> Customer data access: Complete data exports in machine-readable formats; Historical data packages including all interactions; Technical file packages with original and modified versions; Communication exports with timestamps and metadata; Financial transaction summaries and detailed records; Custom data packages tailored to customer needs.
                                </p>
                                <p>
                                    <strong>(c) Legacy and Archive Management:</strong> Long-term considerations: Archive systems for historical data beyond active retention; Legacy system migration and data preservation; Customer notification of archive procedures; Access procedures for archived information; Historical data integrity and verification; Long-term storage security and accessibility.
                                </p>
                            </div>
                        </section>

                        <section className="policy-section">
                            <h2>SECTION 8: INCIDENT RESPONSE, BREACH NOTIFICATION, AND REMEDIATION</h2>
                            <div className="section-content">
                                
                                <h3>8.1 Security Incident Detection and Response</h3>
                                <p>
                                    <strong>(a) Incident Classification and Assessment:</strong> Security event categories: Unauthorized access attempts or successful breaches; Data theft or malicious exfiltration; System compromises or malware infections; Physical security breaches or equipment theft; Employee errors resulting in data exposure; Third-party breaches affecting customer data; Social engineering or phishing attacks.
                                </p>
                                <p>
                                    <strong>(b) Immediate Response Procedures:</strong> Crisis management protocol: Immediate containment of security incidents; Assessment of scope and impact on customer data; Preservation of evidence for investigation and legal purposes; Notification of relevant authorities as required by law; Internal incident response team activation; Communication planning for stakeholder notifications.
                                </p>
                                <p>
                                    <strong>(c) Investigation and Forensics:</strong> Detailed analysis: Root cause analysis of security incidents; Impact assessment on specific customer data; Timeline reconstruction of incident events; Identification of vulnerabilities and failure points; Evidence collection and preservation; Third-party forensic assistance when necessary.
                                </p>

                                <h3>8.2 Legal Notification Requirements and Compliance</h3>
                                <p>
                                    <strong>(a) National Privacy Commission Reporting:</strong> Regulatory notification: Notification within 72 hours of incident discovery for significant breaches; Detailed incident reports with impact assessment; Remediation plans and timeline commitments; Follow-up reports on resolution progress; Compliance with NPC investigation requirements; Documentation of lessons learned and improvements implemented.
                                </p>
                                <p>
                                    <strong>(b) Customer Notification Procedures:</strong> Stakeholder communication: Direct notification to affected customers within reasonable timeframe; Clear explanation of incident nature and impact; Specific information about data types affected; Steps taken for containment and remediation; Recommendations for customer protective actions; Ongoing updates throughout resolution process.
                                </p>
                                <p>
                                    <strong>(c) Third-Party and Partner Notifications:</strong> Supply chain communication: Immediate notification to relevant service providers; Coordination with affected third parties for response; Joint investigation and remediation efforts; Shared responsibility for customer notifications; Collaborative approach to prevention of future incidents; Documentation of partner response and cooperation.
                                </p>

                                <h3>8.3 Remediation and Recovery Procedures</h3>
                                <p>
                                    <strong>(a) Immediate Customer Protection:</strong> Emergency response: Credit monitoring services for financial data breaches; Password reset assistance and security consultations; Enhanced monitoring for affected customer accounts; Priority customer service for breach-related issues; Expedited replacement of compromised credentials; Additional security measures for high-risk customers.
                                </p>
                                <p>
                                    <strong>(b) System Recovery and Hardening:</strong> Technical remediation: Complete system restoration from secure backups; Security vulnerability patching and system updates; Enhanced monitoring and detection capabilities; Additional security controls and access restrictions; Staff retraining and procedure updates; Independent security validation and testing.
                                </p>
                                <p>
                                    <strong>(c) Long-Term Prevention and Improvement:</strong> Strategic enhancements: Comprehensive security policy reviews and updates; Investment in advanced security technologies; Enhanced staff training and awareness programs; Regular security assessments and penetration testing; Customer education about security best practices; Industry collaboration for threat intelligence and prevention.
                                </p>

                                <h3>8.4 Legal and Financial Remediation</h3>
                                <p>
                                    <strong>(a) Customer Compensation and Support:</strong> Breach remediation: Financial compensation for documented damages; Service credits for inconvenience and disruption; Enhanced services at no additional cost; Priority processing for affected customers; Legal assistance referrals when appropriate; Long-term support for ongoing breach impacts.
                                </p>
                                <p>
                                    <strong>(b) Legal Compliance and Reporting:</strong> Regulatory response: Full cooperation with government investigations; Implementation of regulatory recommendations; Legal counsel engagement for complex incidents; Documentation of compliance efforts and outcomes; Public reporting as required by law; Transparency in communication about incidents and responses.
                                </p>
                                <p>
                                    <strong>(c) Insurance and Risk Management:</strong> Financial protection: Cyber insurance claims processing and coordination; Legal defense coverage for privacy-related claims; Business continuity insurance for operational disruption; Professional liability coverage for privacy violations; Risk assessment and insurance adequacy reviews; Premium management and coverage optimization.
                                </p>
                            </div>
                        </section>

                        <section className="policy-section">
                            <h2>SECTION 9: COOKIES, WEBSITE ANALYTICS, AND DIGITAL TRACKING</h2>
                            <div className="section-content">
                                
                                <h3>9.1 Cookie Usage and Management</h3>
                                <p>
                                    <strong>(a) Essential Cookies:</strong> Necessary website functionality: Session management for user experience; Shopping cart and order tracking; User preference storage; Security authentication tokens; Load balancing and performance optimization; Error tracking and debugging information; These cookies cannot be disabled without affecting website functionality.
                                </p>
                                <p>
                                    <strong>(b) Analytics and Performance Cookies:</strong> Website optimization: Page view tracking and user behavior analysis; Site performance monitoring and improvement; Popular content identification; User journey mapping and optimization; A/B testing for website improvements; Conversion rate optimization; Customer consent required for non-essential analytics.
                                </p>
                                <p>
                                    <strong>(c) Marketing and Preference Cookies:</strong> Enhanced user experience: Marketing campaign effectiveness tracking; Personalized content and service recommendations; Social media integration and sharing; Customer preference learning and application; Targeted content delivery; Cross-device recognition; Opt-out options available for all marketing cookies.
                                </p>

                                <h3>9.2 Website Analytics and Data Collection</h3>
                                <p>
                                    <strong>(a) Analytics Platform Usage:</strong> Data collection tools: Google Analytics for website performance monitoring; Social media analytics for engagement measurement; Email platform analytics for communication effectiveness; Customer feedback platforms; Heat mapping tools for user experience improvement; Search engine optimization tracking.
                                </p>
                                <p>
                                    <strong>(b) Information Collected Through Analytics:</strong> Behavioral data: Page views, session duration, and navigation patterns; Geographic location data (country, region, city level); Device information including browser, operating system, screen resolution; Referral sources and marketing campaign attribution; Search queries and keywords; User interaction with forms and buttons.
                                </p>
                                <p>
                                    <strong>(c) Analytics Data Usage and Retention:</strong> Analysis and application: Website performance optimization and improvement; Content strategy development; Marketing campaign assessment; Customer behavior understanding; Service development priorities; Business intelligence and strategic planning; Data retention aligned with platform policies and business needs.
                                </p>

                                <h3>9.3 Customer Control and Opt-Out Options</h3>
                                <p>
                                    <strong>(a) Cookie Management Tools:</strong> Customer control options: Browser-based cookie controls and settings; Opt-out links for specific tracking systems; Cookie preference centers on our website; Global Privacy Control (GPC) signal recognition; Do Not Track (DNT) header respect; Third-party opt-out tools and services.
                                </p>
                                <p>
                                    <strong>(b) Analytics Opt-Out Procedures:</strong> Customer privacy choices: Google Analytics opt-out browser add-on; Facebook pixel opt-out options; Email tracking prevention settings; Social media platform privacy controls; Marketing communication preferences; Granular control over different tracking categories.
                                </p>
                                <p>
                                    <strong>(c) Alternative Access and Service Options:</strong> Non-tracking alternatives: Cookie-free website access options; Direct communication channels bypassing tracking; Phone and messenger ordering without web tracking; Alternative analytics that respect privacy preferences; Service delivery without behavioral tracking; Privacy-focused alternatives for essential services.
                                </p>
                            </div>
                        </section>

                        <section className="policy-section">
                            <h2>SECTION 10: CHILDREN'S PRIVACY AND AGE-APPROPRIATE PROTECTIONS</h2>
                            <div className="section-content">
                                
                                <h3>10.1 Age Restrictions and Verification</h3>
                                <p>
                                    <strong>(a) Age Requirements:</strong> Service limitations: Primary services intended for customers 18 years and older; Parental consent required for customers under 18 years of age; Guardian authorization necessary for significant purchases; Age verification procedures for account creation; Enhanced protections for identified minor customers; Alternative service arrangements for age-restricted customers.
                                </p>
                                <p>
                                    <strong>(b) Age Verification Methods:</strong> Identification procedures: Government-issued ID verification for age confirmation; Educational institution verification for student discounts; Parental consent forms for minor customers; Guardian authorization documentation; Legal capacity verification for contract formation; Alternative verification methods for legitimate cases.
                                </p>
                                <p>
                                    <strong>(c) Parental Rights and Controls:</strong> Guardian protections: Full access to minor's data processing information; Right to modify or delete minor's personal information; Notification requirements for significant data processing; Consent withdrawal rights on behalf of minors; Educational information about children's privacy rights; Support for exercising parental rights and controls.
                                </p>

                                <h3>10.2 Enhanced Protections for Minor Customers</h3>
                                <p>
                                    <strong>(a) Data Minimization for Children:</strong> Reduced data collection: Only essential information collected for service delivery; No behavioral tracking or profiling; Limited retention periods for children's data; Enhanced security measures for minor customer information; Segregated processing systems for children's data; Regular audits of children's data handling practices.
                                </p>
                                <p>
                                    <strong>(b) Communication and Marketing Restrictions:</strong> Protective limitations: No direct marketing to identified minor customers; Parent/guardian included in all significant communications; Educational content focus rather than commercial promotion; Enhanced consent requirements for optional communications; Opt-out defaults for all non-essential communications; Regular review of communication practices for age-appropriateness.
                                </p>
                                <p>
                                    <strong>(c) Safety and Security Enhancements:</strong> Additional protections: Enhanced identity verification for account changes; Parental notification for significant account activities; Limited payment options requiring adult authorization; Enhanced privacy settings with restrictive defaults; Priority security monitoring for minor accounts; Immediate incident response for children's data breaches.
                                </p>

                                <h3>10.3 Educational and School-Related Processing</h3>
                                <p>
                                    <strong>(a) Student Customer Identification:</strong> Educational status processing: Student ID verification for discount programs; Enrollment confirmation through educational institutions; Academic program information for eligibility verification; Graduation date tracking for discount expiration; Educational email verification and validation; Institution-based identity confirmation.
                                </p>
                                <p>
                                    <strong>(b) Educational Institution Coordination:</strong> School partnerships: Collaboration with educational institutions for student verification; Bulk ordering programs for educational projects; Academic project support and consultation; Educational pricing programs and discounts; Research collaboration opportunities; Student privacy protection in all educational partnerships.
                                </p>
                                <p>
                                    <strong>(c) Academic Project Privacy:</strong> Project-specific protections: Enhanced confidentiality for academic and research projects; Intellectual property protection for student innovations; Collaboration restrictions to prevent academic misconduct; Secure handling of proprietary educational materials; Academic deadline accommodation; Special retention policies for educational projects.
                                </p>
                            </div>
                        </section>

                        <section className="policy-section">
                            <h2>SECTION 11: FINAL LEGAL PROVISIONS AND CUSTOMER ACKNOWLEDGMENTS</h2>
                            <div className="section-content">
                                
                                <h3>11.1 Policy Updates and Change Management</h3>
                                <p>
                                    <strong>(a) Modification Authority and Procedures:</strong> Policy changes: Regular review and updates to maintain legal compliance; Customer notification through multiple channels for significant changes; 30-day advance notice for material modifications; Opportunity for customer comment and feedback; Version control and historical policy access; Grandfathering provisions for existing customers during transition periods.
                                </p>
                                <p>
                                    <strong>(b) Change Notification and Communication:</strong> Update procedures: Email notifications to all active customers; Website banner announcements for policy changes; Messenger notifications for regular communication users; Social media announcements for significant changes; Direct mail for customers without electronic contact preferences; Multiple reminder notifications to ensure awareness.
                                </p>
                                <p>
                                    <strong>(c) Customer Response and Acceptance:</strong> Change management: Continued service use constitutes acceptance of modified policies; Opt-out procedures for customers unable to accept changes; Alternative arrangements for customers with concerns; Good faith discussion of customer objections; Service termination options with data deletion; Feedback incorporation into policy development.
                                </p>

                                <h3>11.2 Legal Compliance and Regulatory Adherence</h3>
                                <p>
                                    <strong>(a) Comprehensive Legal Framework:</strong> Applicable laws and regulations: Republic Act No. 10173 (Data Privacy Act of 2012); Implementing Rules and Regulations of the Data Privacy Act; National Privacy Commission circulars and advisories; Republic Act No. 7394 (Consumer Act of the Philippines); Civil Code provisions on privacy and confidentiality; International standards and best practices adopted voluntarily.
                                </p>
                                <p>
                                    <strong>(b) Regulatory Monitoring and Adaptation:</strong> Ongoing compliance: Regular monitoring of legal developments and changes; Professional development and training on privacy law; Consultation with privacy professionals and legal counsel; Industry association participation and guidance; International best practice research and implementation; Customer feedback integration into compliance programs.
                                </p>
                                <p>
                                    <strong>(c) Audit and Verification Procedures:</strong> Compliance validation: Internal privacy audits and assessments; Third-party privacy reviews when appropriate; Customer satisfaction surveys on privacy practices; Employee training and certification programs; Documented compliance procedures and checklists; Regular reporting to management on privacy program effectiveness.
                                </p>

                                <h3>11.3 Customer Rights Summary and Exercise</h3>
                                <p>
                                    <strong>(a) Complete Rights Summary:</strong> All customer rights include: Right to be informed about data processing; Right of access to personal data; Right to rectification of inaccurate data; Right to erasure when appropriate; Right to restrict processing; Right to data portability; Right to object to processing; Right to human review of automated decisions; Right to compensation for privacy violations; Right to file complaints with regulatory authorities.
                                </p>
                                <p>
                                    <strong>(b) Rights Exercise Support:</strong> Customer assistance: Step-by-step guides for exercising privacy rights; Personal assistance with complex requests; Educational materials about privacy rights; Legal resource referrals when appropriate; Advocacy support for dealing with third parties; Follow-up support to ensure satisfaction with rights exercise outcomes.
                                </p>
                                <p>
                                    <strong>(c) Complaint Resolution and Appeal:</strong> Dispute procedures: Internal complaint resolution process; Management escalation for unresolved issues; National Privacy Commission complaint filing assistance; Legal resource recommendations; Mediation and alternative dispute resolution; Documentation and tracking of complaint resolution; Continuous improvement based on complaint patterns and feedback.
                                </p>

                                <h3>11.4 Final Acknowledgments and Legal Statements</h3>
                                <p>
                                    <strong>(a) Customer Acknowledgment Requirements:</strong> By using our services, customers acknowledge: Complete reading and understanding of this Privacy Policy; Consent to described data processing activities; Understanding of rights and procedures for exercising them; Agreement to data sharing with authorized third parties; Acceptance of data retention and deletion schedules; Commitment to providing accurate information and timely updates.
                                </p>
                                <p>
                                    <strong>(b) Business Privacy Commitments:</strong> Our binding obligations: Full compliance with Philippine data protection laws; Respect for customer privacy rights and preferences; Implementation of appropriate security measures; Transparent communication about data practices; Good faith response to privacy requests and concerns; Continuous improvement of privacy protection measures; Professional conduct in all data processing activities.
                                </p>
                                <p>
                                    <strong>(c) Legal Validity and Enforceability:</strong> Policy effectiveness: Legally binding privacy protections under Philippine law; Enforceability through National Privacy Commission procedures; Integration with Terms of Service for complete legal framework; Admissibility in legal proceedings as evidence of privacy practices; Customer recourse through regulatory and judicial channels; Professional and ethical obligations beyond legal minimums.
                                </p>

                                <div className="final-privacy-notice">
                                    <h3>FINAL PRIVACY PROTECTION COMMITMENT</h3>
                                    <p>
                                        <strong>CUSTOMER PRIVACY GUARANTEE:</strong> PrismBox 3D Services commits to treating your personal information with the highest level of respect, protection, and care. We recognize that privacy is a fundamental right and that your trust in our data handling practices is essential to our business relationship. We pledge to process your personal data only as described in this Policy, to implement appropriate security measures, and to respect your privacy rights under Philippine law.
                                    </p>
                                    
                                    <p>
                                        <strong>REGULATORY COMPLIANCE COMMITMENT:</strong> We commit to maintaining full compliance with the Data Privacy Act of 2012 and all related Philippine privacy laws and regulations. As our business grows and evolves, we will continue to enhance our privacy practices, invest in appropriate technologies and training, and maintain the trust our customers place in us. We welcome feedback on our privacy practices and are committed to continuous improvement in protecting your personal information.
                                    </p>
                                    
                                    <p>
                                        <strong>CONTACT AND SUPPORT:</strong> For any privacy-related questions, concerns, or requests, please contact our Data Protection Officer at prismbox3dservice@gmail.com or via Facebook Messenger (Teddy Tapiador). We are committed to responding promptly and professionally to all privacy inquiries and to helping you understand and exercise your privacy rights under Philippine law.
                                    </p>
                                </div>

                                <div className="signature-block">
                                    <p>
                                        <strong>PRISMBOX 3D SERVICES</strong><br/>
                                        Teddy Tapiador, Owner and Data Protection Officer<br/>
                                        Student Entrepreneur<br/>
                                        Bulacan, Philippines<br/>
                                        <br/>
                                        <em>By: Electronic Publication and Digital Implementation</em><br/>
                                        <em>Date: October 22, 2025</em><br/>
                                        <em>Next Review: October 2026 or as required by regulatory changes</em>
                                    </p>
                                </div>
                            </div>
                        </section>

                        <div className="policy-footer">
                            <p>
                                <strong>PrismBox 3D Services - Comprehensive Privacy Policy and Data Protection Statement</strong><br/>
                                Student-Owned Business | Bulacan, Philippines<br/>
                                Operating in Full Compliance with Data Privacy Act of 2012 and Related Philippine Laws<br/>
                                11 Detailed Sections Covering All Aspects of Personal Data Processing<br/>
                                Committed to Privacy Protection, Regulatory Compliance, and Customer Trust<br/>
                                <br/>
                                <em>This comprehensive Privacy Policy provides detailed information about how we collect, use, protect, and manage your personal information. We encourage all customers to read and understand these practices. Contact our Data Protection Officer with any questions or concerns about your privacy rights or our data handling practices.</em>
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
