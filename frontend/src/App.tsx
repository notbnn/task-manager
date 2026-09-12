// TODO: verificación de pipeline para captura de laboratorio 1
import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Login from "./components/Login"; 
import { ClipboardList, Cat, LogOut } from 'lucide-react';

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [tasks, setTasks] = useState<Task[]>([]);

  // 1. LEER TAREAS (Solo corre si el usuario está logueado)
useEffect(() => {
  if (!token) return; 

  const loadTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.status === 401) {
        console.warn("⚠️ Sesión expirada o token inválido. Limpiando credenciales...");
        localStorage.removeItem("token"); 
        setToken(null);
        alert("Su sesión ha expirado. Por favor, vuelva a ingresar.");
        return; 
      }
      const data = await response.json();
      setTasks(data);
      
    } catch (error) {
      console.error("Error al traer las tareas:", error);
    }
  };
  
  loadTasks();
}, [token]);

  // 2. CREAR TAREA
  const addTask = async (text: string) => {
    if (!token) return;
    try {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) throw new Error("Error al crear tarea");
      const newTask: Task = await response.json();
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error("Error en addTask:", error);
    }
  };

  // 3. BORRAR TAREA
  const deleteTask = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Error al borrar");
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error("Error en deleteTask:", error);
    }
  };

  // 4. CAMBIAR ESTADO
  const toggleTaskComplete = async (id: number) => {
    try {
      const currentTask = tasks.find(task => task.id === id);
      if (!currentTask) return;

      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !currentTask.completed }),
      });
      const updatedTask: Task = await response.json();
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
    } catch (error) {
      console.error("Error en toggleTaskComplete:", error);
    }
  };

  // Función para desloguearse (Borra el baúl)
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setTasks([]); // Limpia la pantalla
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  if (!token) {
    return <Login onLoginSuccess={(newToken) => setToken(newToken)} />;
  }

 
  return (
    <div className="AppContainer">
      {/* Botón premium flotante de Logout */}
      <button onClick={handleLogout} className="logout-btn" style={{ position: "absolute", top: "20px", right: "20px", background: "#ef4444", color: "#fff", border: "none", padding: "10px 15px", borderRadius: "6px", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: "bold" }}>
        <LogOut size={16} /> Salir
      </button>

      <Header />
      <TaskInput onAddTask={addTask} /> 
      
      <div className="counter-container">
        <p className="counter-text">Tareas creadas: <span>{totalTasks}</span></p>
        <p className="counter-text">Concluidas: <span>{completedTasks}</span></p>
      </div>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <ClipboardList size={56} className="empty-icon-vector" />
          <p className="empty-title">Estas al día!</p>
          <p className="empty-subtitle">Todavía no tienes tareas registradas.</p>
        </div>
      ) : (
        <TaskList tasks={tasks} onDeleteTask={deleteTask} onToggleTaskComplete={toggleTaskComplete} />
      )}

      <footer className="app-footer">
        <p className="footer-author">Desarrollado por NotBnn <Cat size={16} className="michi-icon" /></p>
        <p>© 2026 Maestría en Desarrollo Fullstack</p>
      </footer>
    </div>
  );
}

export default App;