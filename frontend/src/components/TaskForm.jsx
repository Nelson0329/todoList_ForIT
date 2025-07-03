import { useState } from "react";

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
    };

    try {
      const res = await fetch("http://localhost:3001/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!res.ok) throw new Error("Error al crear tarea");

      const created = await res.json();
      onTaskCreated(created); // callback para actualizar lista
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Error:", err.message);
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
        Crear tarea
      </button>
    </form>
  );
};

export default TaskForm;
