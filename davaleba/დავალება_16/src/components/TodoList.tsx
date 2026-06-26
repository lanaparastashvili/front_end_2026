import type { Task  } from "../App";
import TodoItem from "./TodoItem";

type TodoListProps = {
    tasks:Task[];
    onToggle:(id:number) => void;
    onDelete :(id:number) => void;
}
function TodoList({tasks,onToggle,onDelete}:TodoListProps){
    if(tasks.length === 0){
        return <p className="empty-text">დავალება არ არის</p>

    }
    return(
        <div className="task-list">
            {tasks.map((tasks:Task) =>(
                <TodoItem
                key = {tasks.id}
                task = {tasks}
                onToggle = {onToggle}
                onDelete = {onDelete}
                />
            ))}
        </div>
    )
}
export default TodoList;