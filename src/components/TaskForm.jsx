import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("media");
  // ✅ Reto 1: Estado para mensaje de error
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    
    // ✅ Reto 1: Validar campo vacío
    if (!title.trim()) {
      setError("⚠️ Escribe el nombre de la tarea");
      return;
    }

    onAdd(title.trim(), priority);
    setTitle("");
    setPriority("media");
    setError("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nueva tarea..."
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="alta">🔴 Alta</option>
        <option value="media">🟡 Media</option>
        <option value="baja">🟢 Baja</option>
      </select>

      <button type="submit" className="btn-agregar">Agregar</button>

      {error && <span className="error">{error}</span>}
    </form>
  );
}