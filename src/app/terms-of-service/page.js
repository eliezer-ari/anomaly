'use client';
import Link from 'next/link';
import '../legal-pages.css';

export default function TermsOfService() {
  return (
    <div className="legal-container">
      <div className="legal-content">
        <Link href="/" className="back-to-home">← Back to Home</Link>
        <h1>Terms of Service</h1>
        <span className="legal-date">Last Updated: {new Date().toLocaleDateString()}</span>
        
        <h2>1. Agreement to Terms</h2>
        <p>By accessing or using our website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
        
        <h2>2. Description of Services</h2>
        <p>Anomaly Design, LLC provides web design, development, and related digital services as described on our website. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time.</p>
        
        <h2>3. Client Responsibilities</h2>
        <p>As a client, you are responsible for:</p>
        <ul>
          <li>Providing accurate and complete information necessary for project completion</li>
          <li>Reviewing and approving work in a timely manner</li>
          <li>Obtaining any necessary rights or permissions for materials provided to us</li>
          <li>Making payments according to agreed-upon terms</li>
        </ul>
        
        <h2>4. Intellectual Property Rights</h2>
        <p>Upon full payment, clients receive rights to the final deliverables as specified in individual project agreements. Anomaly Design, LLC retains the right to:</p>
        <ul>
          <li>Display completed work in our portfolio</li>
          <li>Retain ownership of unused concepts and preliminary designs</li>
          <li>Reuse non-exclusive elements across projects</li>
        </ul>
        
        <h2>5. Payment Terms</h2>
        <p>Payment terms are specified in individual project agreements. We typically require a deposit before beginning work, with remaining payments due at project milestones or completion.</p>
        
        <h2>6. Project Timelines</h2>
        <p>Project timelines are estimates and depend on prompt client feedback and approval. Delays in client responses may extend project timelines.</p>
        
        <h2>7. Limitation of Liability</h2>
        <p>Anomaly Design, LLC is not liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services or any products created by us.</p>
        
        <h2>8. Warranty Disclaimer</h2>
        <p>Our services are provided "as is" without warranties of any kind, either express or implied, including but not limited to warranties of merchantability or fitness for a particular purpose.</p>
        
        <h2>9. Termination</h2>
        <p>Either party may terminate services according to the conditions specified in individual project agreements. Termination fees may apply for projects cancelled before completion.</p>
        
        <h2>10. Governing Law</h2>
        <p>These Terms shall be governed by the laws of the State of California, without regard to its conflict of law provisions.</p>
        
        <h2>11. Changes to Terms</h2>
        <p>We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on our website.</p>
        
        <h2>12. Contact Information</h2>
        <p>If you have any questions about these Terms, please contact us at <a href="mailto:info@anomalydesign.com">info@anomalydesign.com</a>.</p>
        
        <div className="legal-nav">
          <Link href="/">Home</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
} 