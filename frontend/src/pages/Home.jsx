import TaskList from "../components/TaskList";

const Home = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Mis tareas</h1>
      <TaskList />
    </div>
  );
};

export default Home;
