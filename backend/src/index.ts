const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;
const prisma = new PrismaClient();
const JWT_SECRET = "MICI_GUARDIAN_SUPER_SECRETO_123";

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// --- BASE ---
app.get("/", (req: any, res: any) => {
  res.send("Hello World! Backend is working");
});


app.post("/register", async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email y password requeridos" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword, 
      },
    });
    res.status(201).json({ message: "Usuario creado con éxito", userId: newUser.id });
  } catch (error: any) {
    console.error("ERROR POSTA EN REGISTRO:", error); 
    if (error.code === "P2002") {
      return res.status(400).json({ error: "El email ya está registrado" });
    }
    res.status(500).json({ error: "Error interno al registrar usuario", detalle: error.message });
  }
});


app.post("/login", async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Credenciales inválidas" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: "Credenciales inválidas" });

    const token = jwt.sign(
      { userId: user.id, email: user.email }, 
      JWT_SECRET, 
      { expiresIn: "1h" } 
    );
    res.json({ message: "Login exitoso", token });
  } catch (error) {
    res.status(500).json({ error: "Error interno al loguear usuario" });
  }
});


app.get("/profile", (req: any, res: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({
      message: "Protected profile data",
      user: decoded
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

app.get("/tasks", async (req: any, res: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "No autorizado. Falta token." });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded: any = jwt.verify(token, JWT_SECRET);
        const loggedUserId = decoded.userId;
        const userTasks = await prisma.task.findMany({
            where: {
                userId: loggedUserId
            }
        });
        res.json(userTasks);
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            console.warn("⚠️ Intento de acceso rechazado: El JWT del usuario ha expirado.");
            return res.status(401).json({ message: "Sesión expirada. Por favor, inicie sesión nuevamente." });
        }
        if (error.name === "JsonWebTokenError") {
            console.warn("⚠️ Intento de acceso rechazado: Firma de JWT inválida o adulterada.");
            return res.status(401).json({ message: "Token inválido. Acceso denegado." });
        }
        console.error("Error crítico al obtener tareas por usuario:", error);
        res.status(500).json({ message: "Error interno del servidor al procesar tus tareas." });
    }
});

app.post("/tasks", async (req: any, res: any) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "La tarea debe tener un texto" });

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "No autorizado. Falta token." });
    }
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const loggedUserId = decoded.userId; 
        const newTask = await prisma.task.create({
            data: {
                text: text,
                completed: false,
                userId: loggedUserId 
            }
        });
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error al crear tarea en backend:", error);
        res.status(500).json({ message: "Error interno al crear la tarea" });
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
        await prisma.task.delete({ where: { id: id } });
        res.json({ message: "Tarea eliminada exitosamente" });
    } catch (error) {
        res.status(404).json({ message: "Tarea no encontrada" });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});