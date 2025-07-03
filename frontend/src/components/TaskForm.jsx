import { useEffect, useState } from "react";

const TaskForm = ({ onTaskCreated, onTaskUpdated, editingTask, clearEditing }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState(null); // ✅ estado para feedback

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { title, description };

    try {
      let response;
      if (editingTask) {
        response = await fetch(`http://localhost:3001/api/tasks/${editingTask.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...editingTask, title, description }),
        });
        const updated = await response.json();
        onTaskUpdated(updated);
        setMessage("✅ Tarea actualizada con éxito");
      } else {
        response = await fetch("http://localhost:3001/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const created = await response.json();
        onTaskCreated(created);
        setMessage("✅ Tarea creada con éxito");
      }

      setTitle("");
      setDescription("");
      clearEditing();

      setTimeout(() => setMessage(null), 3000); // 🔄 Limpia el mensaje
    } catch (err) {
      console.error("Error al guardar tarea:", err);
      setMessage("❌ Error al guardar la tarea");
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-3">
      {message && (
        <div
          className={`p-2 rounded text-sm ${
            message.startsWith("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}
      <input
        type="text"
        placeholder="Título"
        className="border p-2 w-full rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción"
        className="border p-2 w-full rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {editingTask ? "Actualizar tarea" : "Crear tarea"}
      </button>
    </form>
  );
};

export default TaskForm;
