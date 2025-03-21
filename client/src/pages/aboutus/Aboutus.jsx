import React from 'react';
import './aboutus.css';

const Aboutus = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1 className="mental-health-title">MINDHAVEN</h1>
      </header>
      
      <div className="about-content-wrapper">
        <div className="about-content">
          <h2 className="about-title">ABOUT US</h2>
          
          <div className="about-section">
            <h3>Our Mission</h3>
            <p>
              At MindHaven we belive that everybody need a healthy mind Expecialiy Students 
              so wehave created this place where students can seek for help from others
              and also find ways to cope with mental health issues
            </p>
          </div>
          
          <div className="about-section">
            <h3>What We Offer</h3>
            <ul className="services-list">
              <li>
                <span className="service-title">Community Chat</span>
                <p>Connect with others facing similar challenges in a safe, moderated environment</p>
              </li>
              <li>
                <span className="service-title">Professional Resources</span>
                <p>We offer a place where evey user can shar their thoughts on mental health and also support others going through it </p>
              </li>
              <li>
                <span className="service-title">Guidance </span>
                <p>Discover a place where you can get help from professionals</p>
              </li>
              <li>
                <span className="service-title">Mood Test</span>
                <p>Monitor your emotional wellbeing with simple daily check-ins</p>
              </li>
            </ul>
          </div>
          
          <div className="about-section">
            <h3>Our Aim</h3>
            <p>
              We believe that every student who is going through mental stress should find a way to del with 
              their stress in a supportive and safe environment. We strive to create an inclusive and welcoming community where everyone feels heard and valued.

            </p>
          </div>
        </div>
      </div>
      
      <div className="cta-section">
        <h3>For More Information Contact us</h3>
        <div className="cta-buttons">
          <button className="cta-button contact-btn">Contact Us</button>
        </div>
      </div>
      
      <footer className="about-footer">
        <p>&copy; 2025 MentalHealth. All rights reserved.</p>
        <div className="footer-links">
          <a href="/terms">Terms of Service</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/contact">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default Aboutus;