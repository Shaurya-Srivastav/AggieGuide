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
            <section className="upload-section">
                <h2>Upload Materials</h2>
                <div className="upload-area">
                    <label htmlFor="file-upload" className="custom-file-upload">
                    <i className="fa fa-cloud-upload"></i> Upload File
                    </label>
                    <input id="file-upload" type="file"/>
                    
                    <select name="courses" id="courses" className="course-select">
                    <option value="">Select Course...</option>
                    {/* Populate with courses */}
                    <option value="course1">Course 1</option>
                    <option value="course2">Course 2</option>
                    {/* ... more options ... */}
                    </select>
                </div>
            </section>

            <section className="courses-section">
            <h2>Courses</h2>
            <div className="course-cards-container">
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                {/* Add more CourseCards as needed */}
            </div>
            </section>
          </div>
        )}
        {activePage === 'pomodoro' && (
          <div>
            <h1>Pomodoro</h1>
          </div>
        )}
        {activePage === 'notes' && (
          <div>
            <h1>Notes</h1>
          </div>
        )}
        {activePage === 'flashcards' && (
          <div>
            <h1>flashcards</h1>
          </div>
        )}
        {activePage === 'practice' && (
          <div>
             <h1>Practice Test</h1>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserPage;
