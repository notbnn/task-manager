import TaskCard from "./TaskCard";
type Task={
    id: number;
    text: string;
    completed: boolean;   
};

type TaskListProps = {
    tasks: Task[];
    onDeleteTask: (id: number) => void;
    onToggleTaskComplete: (id: number) => void;
};

function TaskList(props: TaskListProps) {
    return (
        <ul className="list-container">
            {props.tasks.map((task) => (
                <TaskCard
                 key={task.id} 
                 text={task.text}
                 id={task.id}
                 completed={task.completed}
                 onDeleteTask={props.onDeleteTask}
                 onToggleTaskComplete={props.onToggleTaskComplete}/>
            ))}
        </ul>
    );
   
}
export default TaskList;
