const TaskItem = ({ task }) => {
  return (
    <div className="border p-4 rounded shadow flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold">{task.title}</h2>
        <p className="text-gray-600">{task.description}</p>
        <small className="text-gray-400">Creado: {new Date(task.createdAt).toLocaleString()}</small>
      </div>
      <div>
        {task.completed ? (
          <span className="text-green-600 font-semibold">✔️ Completada</span>
        ) : (
          <span className="text-yellow-600 font-semibold">⏳ Pendiente</span>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
