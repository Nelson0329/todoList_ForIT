import { useState } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

const Home = () => {
  const [tasks, setTasks] = useState([]);

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

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Mis tareas</h1>
      <TaskForm onTaskCreated={handleTaskCreated} />
      <TaskList tasks={tasks} />
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
