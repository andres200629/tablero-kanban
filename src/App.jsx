import { useState, useEffect } from "react";
import Column from "./components/Column";
import TaskForm from "./components/TaskForm";
import { COLUMNS } from "./columns";

const initialTasks = [
  { id: 1, title: "Diseñar la base de datos", status: "done", priority: "alta" },
  { id: 2, title: "Crear el controlador de productos", status: "doing", priority: "media" },
  { id: 3, title: "Conectar React con Spring Boot", status: "todo", priority: "alta" },
  { id: 4, title: "Preparar evidencia SENA", status: "todo", priority: "baja" },
];

export default function App() {
  // Cargar desde localStorage
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("kanban-tasks");
    return saved ? JSON.parse(saved) : initialTasks;
  });

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ✅ Reto 3 (Clase 3): Título con tareas pendientes
  useEffect(() => {
    const pendingTasks = tasks.filter(t => t.status !== "done");
    document.title = `Kanban (${pendingTasks.length} pendientes)`;
  }, [tasks]);

  // ✅ Reto 2: Evitar tareas duplicadas
  function addTask(title, priority) {
    const existe = tasks.some(t => 
      t.title.toLowerCase() === title.toLowerCase()
    );
    
    if (existe) {
      alert("⚠️ Esa tarea ya existe");
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      status: "todo",
      priority,
    };
    setTasks([...tasks, newTask]);
  }

  // ✅ Reto 4: Permitir editar el título
  function moveTask(taskId, newStatus, newTitle = null) {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            status: newStatus,
            ...(newTitle && { title: newTitle })
          };
        }
        return task;
      })
    );
  }

  function removeTask(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  // ✅ Reto 3 (Clase 2): Vaciar columna Hecho
  function clearDone() {
    setTasks(tasks.filter(task => task.status !== "done"));
  }

  return (
    <main>
      <header>
        <h1>📊 Tablero Kanban — Proyecto Inventario</h1>
        <p className="total-tareas">Total: {tasks.length} tareas</p>
        <button 
          onClick={clearDone}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            marginTop: "12px",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          🗑️ Vaciar columna "Hecho"
        </button>
      </header>

      <TaskForm onAdd={addTask} />

      <div className="board">
        {COLUMNS.map((col) => (
          <Column
            key={col.id}
            title={col.title}
            tasks={tasks.filter((t) => t.status === col.id)}
            onMove={moveTask}
            onRemove={removeTask}
          />
        ))}
      </div>
    </main>
  );
}