const TaskItem = ({ task, onStatusToggle, onDelete, onEdit }) => {
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
      onStatusToggle(updatedTask);
    } catch (err) {
      console.error("Error al actualizar tarea:", err);
    }
  };

  const handleDelete = async () => {
    if (!confirm("¿Seguro que querés eliminar esta tarea?")) return;

    try {
      const res = await fetch(`http://localhost:3001/api/tasks/${task.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar tarea");

      onDelete(task.id);
    } catch (err) {
      console.error("Error al eliminar tarea:", err);
    }
  };

  const handleEdit = () => {
    onEdit(task);
  };

  return (
    <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition flex justify-between items-start">
      <div className="flex-1 pr-4">
        <h2 className="text-lg font-semibold text-gray-800">{task.title}</h2>
        <p className="text-gray-600">{task.description}</p>
        <small className="text-gray-400 block mt-1">
          Creado: {new Date(task.createdAt).toLocaleString()}
        </small>
        <span
          className={`inline-block mt-2 text-sm font-medium px-2 py-1 rounded-full ${
            task.completed
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {task.completed ? "✔️ Completada" : "⏳ Pendiente"}
        </span>
      </div>

      <div className="space-y-2 text-right">
        <button
          onClick={handleToggle}
          className="text-xs px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
        >
          {task.completed ? "Desmarcar" : "Completar"}
        </button>
        <button
          onClick={handleEdit}
          className="text-xs px-3 py-1 rounded bg-indigo-100 text-indigo-700 hover:bg-indigo-200 block"
        >
          Editar
        </button>
        <button
          onClick={handleDelete}
          className="text-xs px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 block"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
