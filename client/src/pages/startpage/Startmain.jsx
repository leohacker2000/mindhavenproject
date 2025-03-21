import React from 'react';
import { Link } from 'react-router-dom';
import "./startmain.css";

const Startmain = () => {
  return (
    <div className="main-container">
      <div className="nav-buttons">
        <Link to="/signup">
          <button className="signup-btn">SIGNUP</button>
        </Link>
        <Link to="/login">
          <button className="login-btn">LOGIN</button>
        </Link>
      </div>
      
      <div className="content-wrapper">
        <div className="hero-image">
          <img src="assets/startpageimage.png" alt="MindHaven" />
        </div>
        
        <div className="info-section">
          <div className="about-us">
            <h2>About Us</h2>
            <p>
              Student life's tough, we know. We're here to offer support not judgment. 
              Find resources, connect with help, and remember; you're not alone in this.
            </p>
          </div>
          
          <div className="resources">
            <h2>Resources</h2>
            <ul>
              <li>Free Videos on mental stability</li>
              <li>An AI Chatbot and post feature</li>
              <li>Free Mental stability test</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Startmain;