import React, { useState, useEffect } from 'react'; 
import './UserPage.css'; 
import PomodoroTimer from './PomodoroTimer';
import { useAuth0 } from "@auth0/auth0-react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const UserPage = () => {


  useEffect(() => {
    // Fetch courses and homeworks when the component mounts
    const fetchData = async () => {
      await updateCourseList();
      await updateHomeworkList();
    };

    fetchData();
  }, []);

  const { logout } = useAuth0();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCourseDetailsPopup, setShowCourseDetailsPopup] = useState(false);
  // const [startDate, setStartDate] = useState(new Date());
  const [startDates, setStartDates] = useState([]);
  const [newDate, setNewDate] = useState(new Date());

  const [showAddCoursePopup, setShowAddCoursePopup] = useState(false);
  const [showNotesPopup, setShowNotesPopup] = useState(false);
  const [showFlashcardsPopup, setShowFlashcardsPopup] = useState(false);
  const [showAddHomeworkPopup, setShowAddHomeworkPopup] = useState(false);
  
  const [courses, setCourses] = useState([]);
  const [homeworks, setHomeworks] = useState([]);
  const [newCourseName, setNewCourseName] = useState('');
  const [newHomework, setNewHomework] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // State to manage the active "page"
  const [activePage, setActivePage] = useState('home');

  const [courseFiles, setCourseFiles] = useState([]);

  const handleHomeworkUpload = async (nm, dt) => {
    try {
      const response = await fetch('http://localhost:3000/api/homework', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: nm, date: dt }), // Only sending the course name
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json(); // Returns the added course with _id
    } catch (error) {
      console.error("Could not add the course to the database", error);
    }
  };

  
  const updateHomeworkList = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/homework');
      const data = await response.json();
  
      // Check if data is an array before setting state
      if (Array.isArray(data)) {
        setHomeworks(data);
      } else {
        console.error('Expected an array, but received:', data);
      }
    } catch (error) {
      console.error('Error fetching homework:', error);
    }
  };

  const addCourseToDatabase = async (courseName) => {
    try {
      const response = await fetch('http://localhost:3000/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: courseName }), // Only sending the course name
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json(); // Returns the added course with _id
    } catch (error) {
      console.error("Could not add the course to the database", error);
    }
  };
  
  const deleteHomework = async (homeworkId, index) => {
    try {
      const response = await fetch(`http://localhost:3000/api/homework/${homeworkId}`, {
        method: 'DELETE',
      });
      const updatedHomeworks = [...homeworks];
      updatedHomeworks.splice(index, 1);
      setHomeworks(updatedHomeworks);  
    } catch (error) {
      console.log("Could not delete the specified homework", error);
    }
  };

  const removeHomework = async (homeworkId, index) => {
    deleteHomework(homeworkId, index);
    window.location.reload();
  };

  // Handler to change the active "page"
  const navigateTo = (page) => {
    setActivePage(page);
  };

  const handleAddCourse = async () => {
    if (newCourseName.trim() && courses.length < 6) {
      const addedCourse = await addCourseToDatabase(newCourseName);
      if (addedCourse) {
        setCourses([...courses, addedCourse]);
        setNewCourseName('');
        setShowAddCoursePopup(false); // Close the popup after adding the course
      }
    } else {
      alert("Course name is required and the limit of courses should be less than 6");
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
  // Replace your existing handleCourseClick with this
  const handleCourseClick = async (course) => {
    setSelectedCourse(course);
    setShowCourseDetailsPopup(true);
    
    // Fetch files for the selected course
    try {
      // Adjust the endpoint if needed, and ensure your server can handle the query parameter
      const response = await fetch(`http://localhost:3000/api/files?courseId=${encodeURIComponent(course._id)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const files = await response.json();
      setCourseFiles(files); // Update the state with the fetched files
    } catch (error) {
      console.error("Could not fetch the files for the course", error);
      // Handle errors here, e.g., setCourseFiles([]) or show an error message
      setCourseFiles([]); // Reset or handle as needed
    }
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

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }
  
    // Get the selected course ID from the select element
    const selectedCourseId = document.getElementById('courses').value;
    if (!selectedCourseId) {
      console.error("No course selected");
      alert("Please select a course.");
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('courseId', selectedCourseId); // Append the course ID to the form data
  
    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      alert(result.message);
      // Do NOT open any popups here
    } catch (error) {
      console.error("Could not upload the file", error);
      alert("Could not upload the file: " + error.message);
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


  const handleAddHomework = () => {
    if (newHomework) {
      setHomeworks([...homeworks, newHomework]);
      setNewHomework('');
      setShowAddHomeworkPopup(false);
    }
    setStartDates([...startDates, newDate]);
    handleHomeworkUpload(newHomework, newDate.toLocaleString());
    window.location.reload();
  };

  const updateCourseList = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/courses');
      const data = await response.json();
      
      // Check if data is an array before setting state
      if (Array.isArray(data)) {
        setCourses(data);
      } else {
        console.error('Expected an array, but received:', data);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };
  

  document.addEventListener('DOMContentLoaded', async () => {
    await updateCourseList();
    await updateHomeworkList();
  });

  return (
    <div className="user-page">
      <aside className="sidebar">
        <div className="logo-container">
          <img className='pomodoro' src="/pomodoro.png" height="120" width="120"/>
        </div>
        <nav className="navigation-menu">
          <ul>
            <li onClick={() => navigateTo('home')}>Home</li>
            <li onClick={() => navigateTo('pomodoro')}>Pomodoro Clock</li>
            <li onClick={() => window.open('https://aggie-notes.streamlit.app/', '_blank')}>Notes</li>
            <li onClick={() => window.open('https://aggie-bot.streamlit.app/', '_blank')}>Chat</li>
            <li onClick={() => window.open('https://aggieapperptest-kd8awxb7p3kjupikylponf.streamlit.app/', '_blank')}>Practice Tests</li>
            <li className="logout" onClick={() => logout({ returnTo: window.location.origin })}>Logout</li>
          </ul>
        </nav>

      </aside>
      <main className="content">
        {activePage === 'home' && (
          <div>

          

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
                    <button onClick={handleAddCourse}>Add</button>
                    <button onClick={() => setShowAddCoursePopup(false)}>Cancel</button>
                  </div>
                </div>
              )}
               {showCourseDetailsPopup && selectedCourse && (
                  <div className="course-details-popup">
                    <div className="popup-content">
                      <button className="close-btn" onClick={() => setShowCourseDetailsPopup(false)}>×</button>
                      <h2>{selectedCourse.name}</h2>
                      <div className="file-cards-container">
                        {courseFiles.map((file, index) => (
                          <div key={index} className="file-card">
                            <p>{file.originalName}</p>
                            {/* Add additional file details and actions here */}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              <section className="homework-section">
              <h2 className='homework-header'>Homework</h2>
              <button className="add-homework-btn" onClick={() => setShowAddHomeworkPopup(true)}>
                Add Homework
              </button>
              {homeworks.map((hw, index) => (
                  <div key={hw._id} className="homework-item">
                    <span>
                      {hw.date ? new Date(hw.date).toLocaleString() : 'No Date'}
                    </span>
                    <p>{hw.name}</p>
                    <button className="homework-done-btn" onClick={() => removeHomework(hw._id, index)}>
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
                  <span>
                    Due Date: 
                    <DatePicker 
                      className="date-picker"
                      selected={newDate} 
                      onChange={date => setNewDate(date)} 
                      showTimeSelect
                      dateFormat="Pp"
                    />  
                  </span>
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
           
          </div>
        )}
        {activePage === 'chat' && (
          <div>
          <h1>Chat</h1>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserPage;
