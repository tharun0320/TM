import React, { useState, useEffect } from "react";
import "./../App.css";

const images = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  "https://images.unsplash.com/photo-1506784983877-45594efa4cbe",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
];

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [deadline, setDeadline] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [accentColor, setAccentColor] = useState("#007bff");
  const [selectedImage, setSelectedImage] = useState(images[0]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!taskText) return;
    setTasks([...tasks, { taskText, deadline }]);
    setTaskText("");
    setDeadline("");
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <h1>Task Planner</h1>

      <img src={selectedImage} alt="motivation" className="banner" />

      <div>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="choice"
            className="thumb"
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>

      <input
        type="color"
        value={accentColor}
        onChange={(e) => setAccentColor(e.target.value)}
      />

      <input
        placeholder="Task description"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />

      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <button style={{ background: accentColor }} onClick={addTask}>
        Add Task
      </button>

      <button onClick={() => setDarkMode(!darkMode)}>
        Toggle Theme
      </button>

      <ul>
        {tasks.map((t, i) => (
          <li key={i}>{t.taskText} – {t.deadline}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
