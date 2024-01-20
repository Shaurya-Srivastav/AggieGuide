// src/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Make sure to import the updated CSS
import { useAuth0 } from "@auth0/auth0-react";

const HomePage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="homepage">
      <nav className="navbar">
        <div className="logo">AggieGuide</div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
          <button className="cta-nav" onClick={() => loginWithRedirect()}>Login</button>
        </div>
      </nav>

      <header className="hero" id="home">
        <h1>Master Your Studies with AI</h1>
        <p>AggieGuide helps you understand faster and remember longer.</p>
        <button className="cta" onClick={() => loginWithRedirect()}>Get Started</button>
      </header>

      <section id="features" className="features">
        <div className="feature-card">
          <h2>Notes</h2>
          <p>Instantly generate comprehensive notes on any topic depending on your classes and teacher's materials.</p>
        </div>
        <div className="feature-card">
          <h2>Practice Tests</h2>
          <p>Prepare with practice tests tailored to your needs and designed based on your practice tests and class materials.</p>
        </div>
        <div className="feature-card">
          <h2>Flashcards</h2>
          <p>Reinforce your memory with smart flashcards generated using AI from all class materials.</p>
        </div>
        <div className="feature-card">
          <h2>Pomodoro Clock</h2>
          <p>Boost your productivity with our AI-integrated Pomodoro Clock, helping you manage study sessions with ease.</p>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <h2>Contact Us</h2>
        <p>If you have any questions, feel free to reach out to us.</p>
        <div className="contact-info">
          <p><strong>Email:</strong> support@aggieguide.com</p>
          <p><strong>Phone:</strong> (925) 356-1890</p>
          <p><strong>Address:</strong> 1 Shields Ave, Davis, CA 95616</p>
        </div>
      </section>


      <footer className="footer" id="contact">
        <p>© 2024 AggieGuide. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
