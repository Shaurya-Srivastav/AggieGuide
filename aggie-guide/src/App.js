import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import AuthPage from './AuthPage'; 
import UserPage from './UserPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/user" element={<UserPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
