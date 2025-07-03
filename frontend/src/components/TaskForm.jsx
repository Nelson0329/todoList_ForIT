import { useEffect, useState } from "react";

const TaskForm = ({ onTaskCreated, onTaskUpdated, editingTask, clearEditing }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
        // UPDATE
        response = await fetch(`http://localhost:3001/api/tasks/${editingTask.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...editingTask,
            title,
            description,
          }),
        });
        const updated = await response.json();
        onTaskUpdated(updated);
      } else {
        // CREATE
        response = await fetch("http://localhost:3001/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const created = await response.json();
        onTaskCreated(created);
      }

      setTitle("");
      setDescription("");
      clearEditing(); // Vuelve a modo crear
    } catch (err) {
      console.error("Error al guardar tarea:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-3">
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
