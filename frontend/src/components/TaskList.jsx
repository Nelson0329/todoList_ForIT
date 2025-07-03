import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onUpdate }) => {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onStatusToggle={onUpdate} />
      ))}
    </div>
  );
};

export default TaskList;
