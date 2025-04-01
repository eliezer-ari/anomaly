'use client';
import Link from 'next/link';
import '../legal-pages.css';

export default function PrivacyPolicy() {
  return (
    <div className="legal-container">
      <div className="legal-content">
        <Link href="/" className="back-to-home">← Back to Home</Link>
        <h1>Privacy Policy</h1>
        <span className="legal-date">Last Updated: {new Date().toLocaleDateString()}</span>
        
        <h2>1. Introduction</h2>
        <p>Welcome to Anomaly Design, LLC ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and protect your information when you visit our website or use our services.</p>
        
        <h2>2. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul>
          <li><strong>Personal Information:</strong> Name, email address, phone number, and other contact details you provide when contacting us.</li>
          <li><strong>Usage Data:</strong> Information about how you use our website, including IP address, browser type, pages visited, and time spent on our site.</li>
          <li><strong>Communication Data:</strong> Any communication and correspondence you have with us.</li>
        </ul>
        
        <h2>3. How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Provide and improve our services</li>
          <li>Respond to your inquiries</li>
          <li>Send you relevant information about our services</li>
          <li>Analyze website usage to improve user experience</li>
          <li>Comply with legal obligations</li>
        </ul>
        
        <h2>4. Data Storage and Security</h2>
        <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
        
        <h2>5. Third-Party Services</h2>
        <p>We may use third-party services (such as analytics or payment processors) that may collect information about you. These third parties have their own privacy policies addressing how they use such information.</p>
        
        <h2>6. Your Rights</h2>
        <p>Depending on your location, you may have rights regarding your personal data, including:</p>
        <ul>
          <li>Access to your personal information</li>
          <li>Correction of inaccurate information</li>
          <li>Deletion of your personal information</li>
          <li>Objection to processing of your personal information</li>
        </ul>
        
        <h2>7. Cookies</h2>
        <p>We use cookies to improve your experience on our website. You can set your browser to refuse all or some browser cookies, but this may affect site functionality.</p>
        
        <h2>8. Contact Us</h2>
        <p>If you have any questions about this privacy policy, please contact us at <a href="mailto:info@anomalydesign.com">info@anomalydesign.com</a>.</p>
        
        <div className="legal-nav">
          <Link href="/">Home</Link>
          <Link href="/terms-of-service">Terms of Service</Link>
        </div>
      </div>
    </div>
  );
} 