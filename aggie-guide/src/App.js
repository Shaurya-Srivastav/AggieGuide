import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import AuthPage from './AuthPage'; // Import the AuthPage component
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
