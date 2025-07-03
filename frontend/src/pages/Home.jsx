import { useState } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null); // ← NUEVO

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

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Mis tareas</h1>
      
      <TaskForm
        onTaskCreated={handleTaskCreated}
        onTaskUpdated={handleTaskUpdated}
        editingTask={editingTask}
        clearEditing={clearEditing}
      />
      
      <TaskList
        tasks={tasks}
        onUpdate={handleTaskUpdate}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <button
        onClick={fetchTasks}
        className="mt-4 underline text-sm text-gray-500"
      >
        Recargar tareas
      </button>
    </div>
  );
};

export default Home;

