import React, { useState } from 'react';
import './UserPage.css'; 
import PomodoroTimer from './PomodoroTimer';
import { Link } from 'react-router-dom';

const UserPage = () => {


  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCourseDetailsPopup, setShowCourseDetailsPopup] = useState(false);


  // State to manage the active "page"
  const [activePage, setActivePage] = useState('home');

  // Handler to change the active "page"
  const navigateTo = (page) => {
    setActivePage(page);
  };

  const [courses, setCourses] = useState([]);
  const [showAddCoursePopup, setShowAddCoursePopup] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseImage, setNewCourseImage] = useState(null);

  // Handler for adding a new course
  const handleAddCourse = () => {
    if (newCourseName && courses.length < 6) {
      setCourses([...courses, { name: newCourseName, image: newCourseImage }]);
      setNewCourseName('');
      setNewCourseImage(null);
      setShowAddCoursePopup(false);
    }
  };

  

  // Handler for the file input change
  const handleCourseImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewCourseImage(URL.createObjectURL(file));
    }
  };
  const handleRemoveCourse = (index) => {
    // Confirm before deleting the course
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (confirmDelete) {
      const updatedCourses = [...courses];
      updatedCourses.splice(index, 1);
      setCourses(updatedCourses);
    }
  };
  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setShowCourseDetailsPopup(true);
  };

  const CourseCard = ({ course, index }) => (
    <div
      className="course-card"
      style={{ backgroundImage: course.image ? `url(${course.image})` : 'none', backgroundColor: course.image ? 'transparent' : '#009fd4' }}
      onClick={() => handleCourseClick(course)}
      onDoubleClick={() => handleRemoveCourse(index)}
    >
      <h3>{course.name}</h3>
    </div>
  );

    const [showNotesPopup, setShowNotesPopup] = useState(false);

    const handleNotesClick = (course) => {
      setShowNotesPopup(true);
    }

  const NotesCourseCard = ({ course }) => (
    <div className="notesCourseCard"
        style={{ backgroundImage: course.image ? `url(${course.image})` : 'none', backgroundColor: course.image ? 'transparent' : '#009fd4' }}
        onClick={() => handleNotesClick(course)}
      >
      <h1>{course.name}</h1>

    </div>
  );


  const [showFlashcardsPopup, setShowFlashcardsPopup] = useState(false);

  const FlashcardsCourseCard = ({ course }) => (
    <div className="notesCourseCard"
      style={{ backgroundImage: course.image ? `url(${course.image})` : 'none', backgroundColor: course.image ? 'transparent' : '#009fd4' }}
      onClick={() => handleFlashcardClick(course)}
    >
      <h1>{course.name}</h1>
   </div>
  );

  const handleFlashcardClick = (course) => (
    setShowFlashcardsPopup(true)
  );

  /*Change to connect to database dates, and open corresponding pdf*/
  const FlashcardsDateListItem = ({date}) => (
    <div className="notesDateListItem">
    <h1>{date}</h1>

    </div>
  );

  const NotesDateListItem = ({date}) => (
    <div className="notesDateListItem">
    <h1>{date}</h1>

    </div>
  );


  const AddCourseCard = () => (
    <div className="course-card add-course" onClick={() => setShowAddCoursePopup(true)}>
      <h3>+ Add Course</h3>
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
                {courses.map((course, index) => (
                  <CourseCard key={index} course={course} />
                ))}
                {courses.length < 6 && (
                  <div className="course-card add-course" onClick={() => setShowAddCoursePopup(true)}>
                    <h3>+ Add Course</h3>
                  </div>
                )}
              </div>
            </section>
            {showAddCoursePopup && (
              <div className="popup">
                <div className="popup-inner">
                  <input
                    type="text"
                    placeholder="Course name"
                    value={newCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                  />
                  <input
                    type="file"
                    onChange={handleCourseImageChange}
                  />
                  <button onClick={handleAddCourse}>Add</button>
                  <button onClick={() => setShowAddCoursePopup(false)}>Cancel</button>
                </div>
              </div>
            )}

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

              {/* Popup for Course Details */}
          {showCourseDetailsPopup && selectedCourse && (
            <div className="course-details-popup">
              <div className="popup-content">
                <button className="close-btn" onClick={() => setShowCourseDetailsPopup(false)}>×</button>
                <h2>{selectedCourse.name}</h2>
                {/* Additional course details here */}
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
            <div className="course-cards-container">
              {courses.map((course, index) => (
                  <NotesCourseCard key={index} course={course} />
              ))}
            </div>
            { showNotesPopup && (
              <div className="popup">
                <div className="notesPage">
                  <div className='notesDateListContainer'>

                    <NotesDateListItem date="01/20/2024"/>
                    <NotesDateListItem date="01/21/2024"/>
                    <NotesDateListItem date="01/22/2024"/>
                    <NotesDateListItem date="01/20/2024"/>
                    <NotesDateListItem date="01/21/2024"/>
                    <NotesDateListItem date="01/22/2024"/>
                    <NotesDateListItem date="01/20/2024"/>
                    <NotesDateListItem date="01/21/2024"/>
                    <NotesDateListItem date="01/22/2024"/>
                    <NotesDateListItem date="01/20/2024"/>
                    <NotesDateListItem date="01/21/2024"/>
                    

                    <button className="close-btn" onClick={() => setShowNotesPopup(false)}>×</button>

                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {activePage === 'flashcards' && (
          <div>
          <h1>Flashcards</h1>
          <div className="course-cards-container">
            {courses.map((course, index) => (
                <FlashcardsCourseCard key={index} course={course} />
            ))}
          </div>
          { showFlashcardsPopup && (
            <div className="popup">
              <div className="notesPage">
                <div className='notesDateListContainer'>

                  <FlashcardsDateListItem date="01/20/2024"/>
                  <FlashcardsDateListItem date="01/20/2024"/>
                  <FlashcardsDateListItem date="01/20/2024"/>
                  <FlashcardsDateListItem date="01/20/2024"/>
                  <FlashcardsDateListItem date="01/20/2024"/>
                  

                  <button className="close-btn" onClick={() => setShowFlashcardsPopup(false)}>×</button>

                </div>
              </div>
            </div>
          )}
        </div>
          /*
          <div>
            <h1>Flashcards</h1>
             <div className="course-cards-container">
                {courses.map((course, index) => (
                  <FlashcardsCourseCard key={index} course={course}/>
                ))}
              </div>
              { showFlashcardsPopup && (
              <div className="popup">
                <div className="notesPage">
                  <div className='notesDateListContainer'>

                    <FlashcardsDateListItem date="01/20/2024"/>
                    <FlashcardsDateListItem date="01/21/2024"/>
                    <FlashcardsDateListItem date="01/22/2024"/>
                    

                    <button className="close-btn" onClick={() => setShowFlashcardsPopup(false)}>×</button>

                  </div>
                </div>
              </div>
              
            )}
          </div>
          */
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
