type TaskCardProps = {
    text: string;
    id: number;
    completed: boolean;
    onToggleTaskComplete: (id: number) => void;
    onDeleteTask: (id: number) => void;
};
// este comentario es una prueba de documentación
function TaskCard(props: TaskCardProps){
    return(
        <div className={`card ${props.completed ? 'completed' : ''}`}>
            <div className="task-content">
                <div
                    className={`custom-checkbox ${props.completed ? 'checked' : ''}`}
                    onClick={() => props.onToggleTaskComplete(props.id)}
                />
              
                <p 
                    className="text"
                    onClick={() => props.onToggleTaskComplete(props.id)}
                    style={{ cursor: 'pointer' }}
                >
                    {props.text}
                </p>
            </div>  
            <button 
                className="delete-button" 
                onClick={() => props.onDeleteTask(props.id)}
            >
                Eliminar
            </button>
        </div>
    );
}
export default TaskCard;
