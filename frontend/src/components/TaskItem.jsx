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
          className="text-sm text-blue-600 underline block"
        >
          {task.completed ? "Desmarcar" : "Completar"}
        </button>
        <button
          onClick={handleEdit}
          className="text-sm text-indigo-600 underline block"
        >
          Editar
        </button>
        <button
          onClick={handleDelete}
          className="text-sm text-red-600 underline block"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
