import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onUpdate, onDelete }) => {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onStatusToggle={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
