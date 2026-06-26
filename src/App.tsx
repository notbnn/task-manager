import {useState} from "react";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import "./App.css";
import { ClipboardList, Cat } from 'lucide-react';
type Task ={
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false
    };
    setTasks([...tasks, newTask]);
  };
  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const toggleTaskComplete = (id: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="AppContainer">
      <Header />
      <TaskInput onAddTask={addTask} /> 
      <div className="counter-container">
        <p className="counter-text">
          Tareas creadas: <span>{totalTasks}</span>
        </p>
        <p className="counter-text">
          Concluidas: <span>{completedTasks}</span>
        </p>
      </div>
      {tasks.length === 0 ? (
        <div className="empty-state">
          <ClipboardList size={56} className="empty-icon-vector" />
          <p className="empty-title">Estas al día!</p>
          <p className="empty-subtitle">Todavía no tenés tareas registradas. Creá una nueva arriba para empezar.</p>
        </div>
      ) : (
        <TaskList 
        tasks={tasks} 
        onDeleteTask={deleteTask}
        onToggleTaskComplete={toggleTaskComplete}
        />
        
      )}
      <footer className="app-footer">
        <p className="footer-author">
        Desarrollado por NotBnn <Cat size={16} className="michi-icon" /> 
        </p>
        <p>© 2026 Maestría en Desarrollo Fullstack</p>
      </footer>
    </div>
  );
}

export default App
