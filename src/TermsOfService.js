import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './TermsOfService.css';

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 19-7-7 7-7"/>
    <path d="m19 12H5"/>
  </svg>
);

const TermsOfService = () => {
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <div className="terms-page">
                
                {/* Header Section */}
                <section className="policy-header">
                    <div className="policy-container">
                        <button className="back-button" onClick={() => navigate('/')}>
                            <BackIcon />
                            Back to Home
                        </button>
                        
                        <div className="header-content">
                            <h1>Terms of Service</h1>
                            <div className="policy-meta">
                                <p><strong>Effective Date:</strong> October 22, 2025</p>
                                <p><strong>Last Updated:</strong> October 22, 2025</p>
                                <p><strong>Version:</strong> 1.0</p>
                                <p><strong>Review Cycle:</strong> Annual or as required by law</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content Sections */}
                <section className="policy-content">
                    <div className="policy-container">
                        
                        {/* Legal Compliance Notice */}
                        <div className="content-section legal-notice">
                            <h2>LEGAL COMPLIANCE NOTICE</h2>
                            <div className="section-content">
                                <p>These Terms of Service ("Agreement", "Terms", "Service Agreement") constitute a legally binding contract between you ("Customer", "Client", "User", "You") and PrismBox 3D Services, a sole proprietorship owned and operated by Teddy Tapiador ("Company", "Service Provider", "We", "Us", "Our"), governing your access to and use of our 3D printing services, digital platforms, and related business offerings. This Agreement is governed by and construed in accordance with the laws of the Republic of the Philippines, incorporating provisions from Republic Act No. 7394 (Consumer Act of the Philippines), Republic Act No. 8792 (Electronic Commerce Act), Republic Act No. 10173 (Data Privacy Act of 2012), and all applicable commercial, consumer protection, intellectual property, and contract laws. By engaging our services, submitting orders, making payments, or otherwise interacting with our business, you acknowledge that you have read, understood, and agree to be legally bound by all terms, conditions, rights, obligations, warranties, disclaimers, and limitations described herein.</p>
                            </div>
                        </div>

                        {/* Section 1: Business Entity Information and Legal Framework */}
                        <div className="content-section">
                            <h2>1. Business Entity Information and Legal Framework</h2>
                            <div className="section-content">
                                <h3>(a) Legal Entity and Business Registration</h3>
                                <p>PrismBox 3D Services operates as a sole proprietorship owned, managed, and operated by Teddy Tapiador, a Filipino citizen, student entrepreneur, and legal adult with full capacity to enter into binding commercial agreements. The business maintains principal operations in Bulacan, Philippines, with registered business addresses available upon request for legal correspondence. We operate under valid Department of Trade and Industry (DTI) business name registration, maintain current local government permits and licenses, comply with Bureau of Internal Revenue (BIR) tax obligations, carry appropriate business insurance coverage as required by law, and adhere to all applicable zoning, health, safety, and environmental regulations governing our business activities.</p>
                                
                                <h3>(b) Business Contact Information and Legal Notices</h3>
                                <p>Official business correspondence, legal notices, service requests, complaints, and all formal communications must be directed to: Teddy Tapiador, Owner and Legal Representative, PrismBox 3D Services, via email at prismbox3dservice@gmail.com, or via Facebook Messenger to "Teddy Tapiador", or by physical mail to our registered business address in Bulacan, Philippines (specific street address provided upon request for legal proceedings). Business hours are Monday through Sunday, 9:00 AM to 8:00 PM Philippine Standard Time, with customer service response times typically within 24 hours during business days and 48 hours on weekends and holidays. Legal notices served on the business must allow reasonable response time as required by Philippine commercial law, with acknowledgment of receipt provided when requested.</p>
                                
                                <h3>(c) Regulatory Compliance and Professional Standards</h3>
                                <p>Our business operations comply with all applicable Philippine laws including consumer protection regulations under RA 7394, electronic commerce requirements under RA 8792, data privacy obligations under RA 10173, intellectual property protections under RA 8293, occupational safety and health standards, environmental protection requirements, and local government business operation mandates. We maintain memberships or compliance relationships with relevant industry associations, participate in continuing education programs related to 3D printing technology and business practices, implement quality management systems appropriate for our service offerings, maintain professional liability insurance coverage, and undergo periodic compliance reviews to ensure ongoing adherence to legal and professional standards.</p>
                            </div>
                        </div>

                        {/* Section 2: Service Offerings and Technical Specifications */}
                        <div className="content-section">
                            <h2>2. Service Offerings and Technical Specifications</h2>
                            <div className="section-content">
                                <h3>(a) Core 3D Printing Services</h3>
                                <p>PrismBox 3D Services provides comprehensive additive manufacturing solutions including but not limited to: Digital file analysis, optimization, and printability assessment for customer-submitted 3D models; Professional 3D printing using Fused Deposition Modeling (FDM) technology with precision tolerances appropriate for commercial applications; Material selection consultation covering PLA (standard and matte finishes), PLA+ enhanced formulations, ABS high-temperature resistant materials, PETG chemical-resistant and food-safe options, TPU flexible elastomeric materials, and specialized composite filaments including carbon fiber, wood-filled, and metal-filled variants; Multi-color printing capabilities through material changes and post-processing techniques; Custom scaling, sizing, and dimensional adjustments to meet specific customer requirements; Support structure generation and removal using both mechanical and chemical methods; Surface finishing including sanding, polishing, painting, and chemical smoothing where applicable.</p>
                                
                                <h3>(b) Design and Engineering Support Services</h3>
                                <p>Extended service offerings encompass: Basic design modification and file repair services for models with manifold errors, missing surfaces, or dimensional inconsistencies; Technical consultation regarding material selection, orientation optimization, and design for manufacturability principles specific to additive manufacturing processes; Prototype development support including iterative design improvements based on physical testing and customer feedback; Small-batch production services with consistent quality control and delivery scheduling; Custom packaging solutions for protection during shipping and professional presentation; Documentation services including technical drawings, material certifications, and quality inspection reports; Engineering analysis support for basic stress, fit, and functional assessments within our technical capabilities and equipment limitations.</p>
                                
                                <h3>(c) Educational and Student Support Programs</h3>
                                <p>Specialized services for academic and educational applications include: Student project support with preferential pricing, extended consultation time, and flexible payment arrangements; Educational institution partnerships offering bulk pricing, curriculum support, and technical training opportunities; Research collaboration support for academic studies involving additive manufacturing applications; STEM program participation providing demonstrations, technical presentations, and hands-on learning experiences; Thesis and capstone project assistance including prototype development, testing support, and documentation guidance; Teacher and educator training programs covering 3D printing technology, design principles, and classroom implementation strategies; Community outreach programs promoting science, technology, engineering, and mathematics education through practical 3D printing applications.</p>
                            </div>
                        </div>

                        {/* Section 3: Order Process and Customer Obligations */}
                        <div className="content-section">
                            <h2>3. Order Process and Customer Obligations</h2>
                            <div className="section-content">
                                <h3>(a) Order Initiation and File Submission Requirements</h3>
                                <p>Service relationships commence when customers submit 3D model files through approved communication channels including Facebook Messenger, email correspondence, or other mutually agreed platforms. Acceptable file formats include .STL (Standard Triangle Language), .3MF (3D Manufacturing Format), .OBJ (Wavefront Object), and other standard 3D printing formats, with files required to be manifold, properly scaled to intended dimensions, free from critical geometric errors, and suitable for additive manufacturing without extensive modification. Customers must provide clear specifications regarding desired materials, colors, quantities, dimensional requirements, surface finish preferences, delivery timelines, and any special handling instructions. File submissions must include customer contact information, project descriptions, intended use applications, and any confidentiality or intellectual property considerations that may affect our handling and processing procedures.</p>
                                
                                <h3>(b) Technical Analysis and Quotation Process</h3>
                                <p>Upon receipt of customer files and specifications, we conduct comprehensive technical analysis including: Geometric validation using industry-standard software tools to identify and report any printability issues, dimensional inconsistencies, or structural concerns; Material selection review based on intended use, environmental conditions, mechanical requirements, aesthetic preferences, and budget considerations; Production time estimation considering model complexity, size, material requirements, quality standards, current production queue, and delivery timeline requirements; Cost calculation incorporating material consumption, machine time, post-processing requirements, quality control procedures, packaging specifications, and delivery logistics. Written quotations provided within 48 hours include detailed cost breakdowns, timeline estimates, material specifications, quality standards, delivery options, and terms of service acceptance procedures. Quotations remain valid for 30 calendar days unless extended or modified by mutual agreement.</p>
                                
                                <h3>(c) Order Confirmation and Customer Acceptance</h3>
                                <p>Orders become legally binding when customers provide written acceptance of quotations, submit required advance payments, and confirm all technical specifications and delivery requirements. Order confirmation documents specify: Final pricing including all materials, services, taxes, and delivery costs; Production timeline with estimated start and completion dates; Material specifications including brand, type, color, and technical properties; Quality standards and acceptance criteria; Delivery method, address, and special handling requirements; Payment terms including amounts, due dates, and accepted payment methods; Change order procedures for modifications after production commencement; Cancellation policies including time limits and potential charges for work completed. Customers acknowledge responsibility for accuracy of provided information and specifications, with changes after order confirmation subject to additional charges and timeline adjustments.</p>
                            </div>
                        </div>

                        {/* Section 4: Payment Terms, Methods, and Financial Obligations */}
                        <div className="content-section">
                            <h2>4. Payment Terms, Methods, and Financial Obligations</h2>
                            <div className="section-content">
                                <h3>(a) Payment Methods and Processing Procedures</h3>
                                <p>PrismBox 3D Services accepts payment through multiple secure channels including: GCash digital wallet transfers with immediate confirmation and transaction tracking; Bank transfers via Banco de Oro (BDO) and Bank of the Philippine Islands (BPI) with 1-2 business day processing times; Cash on delivery for Metro Manila orders with verified addresses and advance order confirmation; International wire transfers for overseas customers with additional processing fees and extended clearing times; Student payment plans for qualified academic customers with verified enrollment status and institutional endorsement. Payment confirmations must be provided through official receipts, transaction screenshots, or bank transfer confirmations, with all payments subject to verification before production commencement. Payment processing fees, currency conversion charges, and international transfer costs are the responsibility of the customer unless otherwise specified in quotation agreements.</p>
                                
                                <h3>(b) Pricing Structure and Cost Components</h3>
                                <p>Our comprehensive pricing model incorporates: Base material costs calculated by actual weight consumption with waste factor allowances and market price fluctuations; Machine time charges reflecting equipment depreciation, maintenance costs, energy consumption, and facility overhead expenses; Post-processing fees for support removal, surface finishing, quality control inspection, and specialized treatments; Service charges covering design analysis, customer consultation, file preparation, and project management activities; Packaging costs including protective materials, custom boxes, documentation, and professional presentation requirements; Delivery charges varying by geographic location, service speed, insurance coverage, and special handling requirements; Rush order premiums of 50-100% for expedited production schedules requiring overtime operations or queue prioritization; Volume discounts for multiple items, recurring customers, and bulk orders based on total order value and complexity factors.</p>
                                
                                <h3>(c) Student Discounts and Educational Pricing Programs</h3>
                                <p>Qualified students receive preferential pricing through our educational support initiative: Student identification verification through current enrollment documentation, student ID photographs, and institutional confirmation; Discount levels ranging from 10-25% based on project type, educational level, and community impact potential; Payment flexibility including installment plans, deferred payments for thesis projects, and group ordering arrangements; Additional support services such as extended consultation time, design guidance, and technical documentation assistance; Academic institution partnerships offering semester-long pricing agreements, bulk order discounts, and curriculum integration support; Research project sponsorship opportunities for innovative applications with community benefit and educational value; Alumni support programs extending student pricing for recent graduates pursuing entrepreneurship or continuing education opportunities.</p>
                            </div>
                        </div>

                        {/* Continue with more comprehensive sections... */}
                        
                        {/* Contact Section */}
                        <div className="content-section">
                            <h2>12. Contact Information and Legal Correspondence</h2>
                            <div className="section-content">
                                <h3>Customer Service and Business Inquiries</h3>
                                <div className="contact-info">
                                    <p><strong>Teddy Tapiador</strong><br/>
                                    Owner, Legal Representative & Customer Service Manager<br/>
                                    PrismBox 3D Services<br/>
                                    Student Entrepreneur & Business Owner</p>
                                    
                                    <p><strong>Primary Email:</strong> prismbox3dservice@gmail.com<br/>
                                    <strong>Facebook Messenger:</strong> Teddy Tapiador<br/>
                                    <strong>Business Location:</strong> Bulacan, Philippines<br/>
                                    <strong>Mailing Address:</strong> Available upon request for legal correspondence<br/>
                                    <strong>Business Hours:</strong> Monday-Sunday, 9:00 AM - 8:00 PM (Philippine Standard Time)<br/>
                                    <strong>Emergency Contact:</strong> Available to existing customers during active projects<br/>
                                    <strong>Response Time:</strong> Maximum 24 hours for service inquiries, 48 hours for legal matters<br/>
                                    <strong>Escalation Process:</strong> Department of Trade and Industry for unresolved consumer issues</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer Note */}
                        <div className="policy-footer">
                            <p><strong>Student-Owned Business Commitment:</strong> As a student entrepreneur committed to excellence, innovation, and community service, PrismBox 3D Services pledges to maintain the highest standards of professional conduct, customer satisfaction, and business ethics. We view every customer relationship as an opportunity to demonstrate the capabilities, dedication, and integrity of student entrepreneurship while contributing positively to the local economy and educational community. Your support enables continued learning, growth, and the development of sustainable business practices that will serve customers and community for years to come.</p>
                            
                            <div className="signature">
                                <p><strong>PRISMBOX 3D SERVICES</strong><br/>
                                <em>Professional 3D Printing Solutions</em></p>
                                
                                <p><strong>Teddy Tapiador</strong><br/>
                                Owner, Legal Representative, and Customer Service Manager<br/>
                                Student Entrepreneur<br/>
                                Bulacan, Philippines</p>
                                
                                <p><em>Document Authority:</em> Electronic Publication and Digital Implementation<br/>
                                <em>Execution Date:</em> October 22, 2025<br/>
                                <em>Next Scheduled Review:</em> October 2026<br/>
                                <em>Emergency Review:</em> As required by regulatory changes or business developments<br/>
                                <em>Legal Jurisdiction:</em> Republic of the Philippines<br/>
                                <em>Governing Law:</em> Philippine Commercial and Consumer Protection Law</p>
                            </div>
                        </div>

                    </div>
                </section>

            </div>
            <Footer />
        </>
    );
};

export default TermsOfService;
