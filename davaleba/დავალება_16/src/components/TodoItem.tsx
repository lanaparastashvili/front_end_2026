import type { Task } from "../App";
import deleteicon from '../assets/deleteicon.png';
 
type TodoItemProps = {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};
 
function TodoItem({ task, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="task-item">
      <div className="task-info">
        <span className={`task-title ${task.done ? "done" : ""}`}>
          {task.title}
        </span>
        <span className="task-time">Today at 8:00 PM</span>
      </div>
 
      <div className="task-actions">
        <button
          className={`check-btn ${task.done ? "checked" : ""}`}
          onClick={() => onToggle(task.id)}
        >
          {task.done ? "✓" : ""}
        </button>
 
        <button className="delete-btn" onClick={() => onDelete(task.id)}>
          <img src={deleteicon} alt="" />
        </button>
      </div>
    </div>
  );
}
 
export default TodoItem;
 