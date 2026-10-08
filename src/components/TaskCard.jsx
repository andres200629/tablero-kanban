import { useState } from "react";

export default function TaskCard({ task, onMove, onRemove }) {
  // ✅ Reto 4: Modo edición con doble clic
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleSave = () => {
    if (newTitle.trim() && newTitle.trim() !== task.title) {
      onMove(task.id, task.status, newTitle.trim());
    }
    setIsEditing(false);
  };

  return (
    <div 
      className={`card prio-${task.priority}`}
      onDoubleClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          autoFocus
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #0ea5e9"
          }}
        />
      ) : (
        <>
          <strong>{task.title}</strong>
          <small>Prioridad: {task.priority}</small>
        </>
      )}

      <div className="card-actions">
        <select
          value={task.status}
          onChange={(e) => onMove(task.id, e.target.value)}
        >
          <option value="todo">Por hacer</option>
          <option value="doing">En progreso</option>
          <option value="done">Hecho</option>
        </select>
        <button className="btn-eliminar" onClick={() => onRemove(task.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
}