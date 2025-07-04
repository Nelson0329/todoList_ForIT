import { useState } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 búsqueda

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error al obtener tareas:", err);
    }
  };

  const handleTaskCreated = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const clearEditing = () => {
    setEditingTask(null);
  };

  const handleTaskUpdated = (updated) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updated.id ? updated : task))
    );
    clearEditing();
  };

  const filteredTasks = tasks.filter((task) =>
    (task.title + task.description)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">
          📝 Mis tareas
        </h1>

        <TaskForm
          onTaskCreated={handleTaskCreated}
          onTaskUpdated={handleTaskUpdated}
          editingTask={editingTask}
          clearEditing={clearEditing}
        />

        <input
          type="text"
          placeholder="Buscar tareas..."
          className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-6"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <TaskList
          tasks={filteredTasks}
          onUpdate={handleTaskUpdate}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />

        <button
          onClick={fetchTasks}
          className="mt-6 block mx-auto text-sm text-indigo-600 hover:underline"
        >
          🔄 Recargar tareas
        </button>
      </div>
    </div>
  );
};

export default Home;
