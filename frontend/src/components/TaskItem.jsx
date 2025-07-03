const TaskItem = ({ task, onStatusToggle }) => {
  const handleToggle = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...task,
          completed: !task.completed,
        }),
      });

      if (!res.ok) throw new Error("Error al actualizar tarea");

      const updatedTask = await res.json();
      onStatusToggle(updatedTask); // Actualiza el estado desde el padre
    } catch (err) {
      console.error("Error al actualizar tarea:", err);
    }
  };

  return (
    <div className="border p-4 rounded shadow flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold">{task.title}</h2>
        <p className="text-gray-600">{task.description}</p>
        <small className="text-gray-400">
          Creado: {new Date(task.createdAt).toLocaleString()}
        </small>
      </div>
      <div className="text-right space-y-2">
        <div>
          {task.completed ? (
            <span className="text-green-600 font-semibold">✔️ Completada</span>
          ) : (
            <span className="text-yellow-600 font-semibold">⏳ Pendiente</span>
          )}
        </div>
        <button
          onClick={handleToggle}
          className="text-sm text-blue-600 underline"
        >
          {task.completed ? "Desmarcar" : "Completar"}
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
