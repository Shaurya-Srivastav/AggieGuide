import React, { useState } from 'react';
import './UserPage.css'; 
import { Link } from 'react-router-dom';

const UserPage = () => {
  // State to manage the active "page"
  const [activePage, setActivePage] = useState('home');

  // Handler to change the active "page"
  const navigateTo = (page) => {
    setActivePage(page);
  };

  // Define a simple Card component (you can expand upon this)
  const CourseCard = () => (
    <div className="course-card">
      {/* Card content goes here */}
    </div>
  );

  return (
    <div className="user-page">
      <aside className="sidebar">
        <div className="logo-container">
          <h1>AggieGuide</h1>
        </div>
        <nav className="navigation-menu">
          <ul>
            <li onClick={() => navigateTo('home')}>Home</li>
            <li onClick={() => navigateTo('pomodoro')}>Pomodoro</li>
            <li onClick={() => navigateTo('notes')}>Notes</li>
            <li onClick={() => navigateTo('flashcards')}>Flashcards</li>
            <li onClick={() => navigateTo('practice')}>Practice Tests</li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        {activePage === 'home' && (
          <div>
            {/* Home page content */}
          </div>
        )}
        {activePage === 'pomodoro' && (
          <div>
            {/* Pomodoro page content */}
          </div>
        )}
        {activePage === 'notes' && (
          <div>
            {/* Notes page content */}
          </div>
        )}
        {activePage === 'flashcards' && (
          <div>
            {/* Flashcards page content */}
          </div>
        )}
        {activePage === 'practice' && (
          <div>
            {/* Practice Tests page content */}
          </div>
        )}

        <section className="upload-section">
          <h2>Upload Materials</h2>
          <div className="upload-area">
            <div className="upload-icon"></div>
          </div>
        </section>

        <section className="courses-section">
          <h2>Courses</h2>
          <div className="course-cards-container">
            <CourseCard />
            <CourseCard />
            <CourseCard />
            {/* Add more CourseCards as needed */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserPage;
