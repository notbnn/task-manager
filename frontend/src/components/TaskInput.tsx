import { useState } from "react";
interface TaskInputProps {
  onAddTask: (text: string) => void;
}
function TaskInput({ onAddTask }: TaskInputProps) {
    const [inputText, setInputText] = useState("");
    const handleSubmit = (e: React.FormEvent) => {
       e.preventDefault(); 
        if (!inputText.trim()) return; 
        onAddTask(inputText); 
        setInputText(""); 
    };
    return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Escribe una nueva tarea..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="task-input"
      />
      <button type="submit" className="task-button">
        Agregar Tarea
      </button>
    </form>
  );

}
export default TaskInput;
