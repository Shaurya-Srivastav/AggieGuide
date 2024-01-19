import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AuthPage.css';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleAuth = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="auth-page">
      <nav className="navbar"> {/* This class is now scoped to AuthPage only */}
        <Link to="/" className="logo">AggieGuide</Link>
      </nav>
      <div className="auth-container">
        <h1>{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
        <form>
          {isSignUp && <input type="text" placeholder="Full Name" />}
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          {isSignUp && <input type="password" placeholder="Confirm Password" />}
          <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
        </form>
        <button className="toggle-btn" onClick={toggleAuth}>
          {isSignUp ? 'Already have an account? Sign In' : 'Don’t have an account? Sign Up'}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;