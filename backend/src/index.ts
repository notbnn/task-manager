const express = require("express");
const app = express();
const PORT = 3000;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
app.use(express.json());
type Task = {
  id: number;
  text: string;
  completed: boolean;
};

const tasks: Task[] = [
    {id: 1, text: "Estudiar Note.js", completed: false},
    {id: 2, text: "Crear servidor Express", completed: true},
    {id: 3, text: "Probar las rutas del backend", completed: false},
];

app.get("/", (req: any, res: any) => {
  res.send("Hello World! Backend is working");
});

app.get("/tasks", async (req: any, res: any) => {
    try {
        const allTasks = await prisma.task.findMany(); // Trae todo de la tabla Task
        res.json(allTasks);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener tareas" });
    }
});

app.post("/tasks", async (req: any, res: any) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ message: "La tarea debe tener un texto" });
    }

    try {
        const newTask = await prisma.task.create({
            data: {
                text: text,
                completed: false
            }
        });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la tarea" });
    }
});

app.put("/tasks/:id", async (req: any, res: any) => {
    const id = Number(req.params.id); 
    const { text, completed } = req.body; 

    try {
        const updatedTask = await prisma.task.update({
            where: { id: id },
            data: {
                ...(text !== undefined && { text }),
                ...(completed !== undefined && { completed })
            }
        });
        res.json(updatedTask);
    } catch (error) {
        res.status(404).json({ message: "Tarea no encontrada" });
    }
});

app.delete("/tasks/:id", async (req: any, res: any) => {
    const id = Number(req.params.id);

    try {
        await prisma.task.delete({
            where: { id: id }
        });
        res.json({ message: "Tarea eliminada exitosamente de PostgreSQL" });
    } catch (error) {
        res.status(404).json({ message: "Tarea no encontrada" });
    }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});