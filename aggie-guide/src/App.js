import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import AuthPage from './AuthPage'; 
import UserPage from './UserPage';
import './App.css';
import { Auth0Provider } from '@auth0/auth0-react';

function App() {
  return (
    <Auth0Provider
    domain="dev-tnijgq1ck832j8gi.us.auth0.com"
    clientId="i7ch9CiT8uOS6Xy81vBZD3bMlUpllUp3"
    redirectUri="http://localhost:3000/user"
    >
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          {/* <Route path="/auth" element={<AuthPage />} /> */}
          <Route path="/user" element={<UserPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </Auth0Provider>
  );
}

export default App;
