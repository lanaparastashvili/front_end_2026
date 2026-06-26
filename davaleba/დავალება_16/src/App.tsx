import { useState } from "react";
import "./App.css";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
export type Task = {
  id: number;
  title: string;
  done: boolean;
};

const initialTasks: Task[] = [
  { id: 1, title: "Dinner", done: true },
  { id: 2, title: "Walk with Coby", done: false },
  { id: 3, title: "Buy Groceries", done: false },
  { id: 4, title: "Go to repair shop", done: false },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [nextId, setNextId] = useState<number>(5);



  function addTask(title: string): void {
    const newTask: Task = {
      id: nextId,
      title: title,
      done: false,
    };
    setTasks([...tasks, newTask]);
    setNextId(nextId + 1);
  }

  function toggleTask(id: number): void {
    const updated: Task[] = tasks.map((task: Task) => {
      if (task.id === id) {
        return { ...task, done: !task.done };
      }
      return task;
    });
    setTasks(updated);
  }

  function deleteTask(id: number): void {
    const filtered: Task[] = tasks.filter((task: Task) => task.id !== id);
    setTasks(filtered);
  }

  return (

    <div className="app">
          <div className="title">
      <p>ToDo</p>
    </div>
      <div className="card">
        <div className="hero">
          <div className="hero-time">
            <span className="hero-date">Thur 9</span>
            <span className="hero-clock">6:23 AM</span>
          </div>
        </div>

        <TodoInput onAdd={addTask} />

        <TodoList
          tasks={tasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </div>
    </div>

  );
}

export default App;