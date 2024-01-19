import React, { useState } from 'react';
import './UserPage.css'; 
import PomodoroTimer from './PomodoroTimer';
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
      <h1>Course - ECS 50</h1>
    </div>
  );

  const [uploadProgress, setUploadProgress] = useState(0);

  // Mock function to simulate file upload progress
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    // This is where you would typically use a file upload service
    // For this example, we'll simulate progress with a timeout
    const updateProgress = (value) => {
      setUploadProgress(value);
      if (value === 100) {
        // Reset progress after a delay when it reaches 100%
        setTimeout(() => setUploadProgress(0), 1500);
      }
    };

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress <= 100) {
        updateProgress(progress);
      } else {
        clearInterval(interval);
      }
    }, 200);
  };


  const [homeworks, setHomeworks] = useState([]);
  const [showAddHomeworkPopup, setShowAddHomeworkPopup] = useState(false);
  const [newHomework, setNewHomework] = useState('');

  const handleAddHomework = () => {
    if (newHomework) {
      setHomeworks([...homeworks, newHomework]);
      setNewHomework('');
      setShowAddHomeworkPopup(false);
    }
  };

  const removeHomework = (index) => {
    const updatedHomeworks = [...homeworks];
    updatedHomeworks.splice(index, 1);
    setHomeworks(updatedHomeworks);
  };

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
                <input 
                    id="file-upload" 
                    type="file" 
                    onChange={handleFileUpload}
                />
                <select name="courses" id="courses" className="course-select">
                    <option value="course1">Course 1</option>
                    <option value="course2">Course 2</option>
                </select>
                </div>
                {uploadProgress > 0 && (
                <div className="upload-progress-bar">
                    <div className="upload-progress" style={{ width: `${uploadProgress}%` }}></div>
                </div>
                )}
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

            <section className="homework-section">
              <h2>Homework</h2>
              <button className="add-homework-btn" onClick={() => setShowAddHomeworkPopup(true)}>
                Add Homework
              </button>
              {homeworks.map((hw, index) => (
                <div key={index} className="homework-item">
                  <span>{hw}</span>
                  <button className="homework-done-btn" onClick={() => removeHomework(index)}>
                    Done
                  </button>
                </div>
              ))}
            </section>
            {showAddHomeworkPopup && (
              <div className="popup">
                <div className="popup-inner">
                  <input
                    type="text"
                    placeholder="Enter homework..."
                    value={newHomework}
                    onChange={(e) => setNewHomework(e.target.value)}
                  />
                  <button onClick={handleAddHomework}>Submit</button>
                  <button onClick={() => setShowAddHomeworkPopup(false)}>Cancel</button>
                </div>
              </div>
            )}

            
          </div>
        )}
        {activePage === 'pomodoro' && (
          <div className="page-section">
            <PomodoroTimer />
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
