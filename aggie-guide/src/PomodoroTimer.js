import React, { useState, useEffect } from 'react';
import './PomodoroTimer.css';

const PomodoroTimer = () => {
    const [isActive, setIsActive] = useState(false);
    const [isWorkSession, setIsWorkSession] = useState(true);
    const [workTime, setWorkTime] = useState(25 * 60); // 25 minutes
    const [breakTime, setBreakTime] = useState(5 * 60); // 5 minutes
    const [secondsLeft, setSecondsLeft] = useState(workTime);
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState('');

    useEffect(() => {
        let interval = null;
        if (isActive && secondsLeft > 0) {
            interval = setInterval(() => {
                setSecondsLeft(secondsLeft => secondsLeft - 1);
            }, 1000);
        } else if (secondsLeft === 0) {
            setIsWorkSession(!isWorkSession);
            setSecondsLeft(isWorkSession ? breakTime : workTime);
        }
        return () => clearInterval(interval);
    }, [isActive, secondsLeft, isWorkSession, workTime, breakTime]);

    const handleStart = () => {
        setIsActive(true);
        if (secondsLeft === workTime || secondsLeft === breakTime) {
            setSecondsLeft(isWorkSession ? workTime : breakTime);
        }
    };

    const handlePause = () => {
        setIsActive(false);
    };

    const handleReset = () => {
        setIsActive(false);
        setIsWorkSession(true);
        setSecondsLeft(workTime);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const addTask = () => {
        if (currentTask.trim() !== '') {
            setTasks([...tasks, { text: currentTask, id: Date.now() }]);
            setCurrentTask('');
        }
    };

    const removeTask = (taskId) => {
        document.getElementById(`task-card-${taskId}`).classList.add('task-completed');
        setTimeout(() => {
            setTasks(tasks.filter(task => task.id !== taskId));
        }, 1000);
    };

    const changeWorkTime = (timeAdded) => {
        if (timeAdded + workTime > 0) {
            setWorkTime(workTime + timeAdded);
            setSecondsLeft(secondsLeft + timeAdded);    
        }
    }; 

    const changeBreakTime = (timeAdded) => {
        if (timeAdded + breakTime > 0) {
            setBreakTime(breakTime + timeAdded);
            setSecondsLeft(secondsLeft + timeAdded);    
        }
    }; 

    return (
        <div className="pomodoro-timer">
            <div className="time-display">{formatTime(secondsLeft)}</div>
            <div className="progress-bar">
                <div
                    className="progress"
                    style={{ width: `${(isWorkSession ? (workTime - secondsLeft) / workTime : (breakTime - secondsLeft) / breakTime) * 100}%` }}
                ></div>
            </div>
            <div className="timer-controls">
                <button onClick={handleStart} disabled={isActive}>Start</button>
                <button onClick={handlePause} disabled={!isActive}>Pause</button>
                <button onClick={handleReset}>Reset</button>
            </div>
            <div className="settings">
                <div>
                    <label>Work: {formatTime(workTime)}</label>
                    {/* <button onClick={() => setWorkTime(workTime + 60)}>+</button>
                    <button onClick={() => setWorkTime(workTime - 60)}>-</button> */}
                    <button onClick={() => changeWorkTime(60)}>+</button>
                    <button onClick={() => changeWorkTime(-60)}>-</button>
                </div>
                <div>
                    <label>Break: {formatTime(breakTime)}</label>
                    {/* <button onClick={() => setBreakTime(breakTime + 60)}>+</button>
                    <button onClick={() => setBreakTime(breakTime - 60)}>-</button> */}
                    <button onClick={() => changeBreakTime(60)}>+</button>
                    <button onClick={() => changeBreakTime(-60)}>-</button>
                </div>
            </div>
            <div className="task-input">
                <input
                    type="text"
                    placeholder="Enter a task..."
                    value={currentTask}
                    onChange={(e) => setCurrentTask(e.target.value)}
                />
                <button onClick={addTask}>Add Task</button>
            </div>
            <div className="task-list">
                {tasks.map((task) => (
                    <div key={task.id} id={`task-card-${task.id}`} className="task-card">
                        <span>{task.text}</span>
                        <button className="task-done" onClick={() => removeTask(task.id)}>Done</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PomodoroTimer;
