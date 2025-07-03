import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks }) => {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
