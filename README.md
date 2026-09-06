# Task Manager - Full Stack Monorepo

Aplicación web para la gestión cronológica de tareas y organización diaria, estructurada en un monorepo con cliente React y servidor Node.js.

<!-- BADGE_CI -->

##  Instalación local

Sigue estos pasos desde la terminal para levantar el ecosistema completo:

bash
git clone https://github.com/TU_USUARIO_DE_GITHUB/task-manager.git
cd task-manager

### Variables de entorno
Crea un archivo `.env` en la raíz del `backend/` con las siguientes claves (sin valores reales en este documento):

text
DATABASE_URL=
JWT_SECRET=
PORT=

### Iniciar el proyecto

**1. Backend:**

bash
cd backend
npm install
npx prisma migrate dev --name init
npm run dev

**2. Frontend:**
Abre otra terminal y ejecuta:

bash
cd frontend
npm install
npm run dev

##  Comandos disponibles

| Comando          | Descripción                              |
|------------------|-------------------------------------------|
| `npm run dev`    | Levanta el entorno de desarrollo           |
| `npm run build`  | Genera el build de producción              |
| `npm test`       | Corre las pruebas automatizadas (pendiente — Sesión 3) |

## 🗄️ Base de datos

PostgreSQL con migraciones y seeds gestionados con Prisma (ver Módulo 2).

---

## Tecnologías Utilizadas
* **Capa de Cliente (Frontend):** React (v18+), Vite, TypeScript y TailwindCSS.
* **Capa de Servidor (Backend):** Node.js, Express, TypeScript, JWT y Bcryptjs.

##  Autor
**Desarrollador:** Oscar Saavedra  
**Entorno de Desarrollo:** CachyOS Linux
