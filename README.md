# Task Manager - Full Stack Monorepo

¡Bienvenido al **Task Manager**! Un ecosistema web robusto enfocado en la gestión cronológica de tareas y organización diaria, diseñado bajo una arquitectura desacoplada y libre de estado (*Stateless*).

Este proyecto implementa un flujo de seguridad perimetral de extremo a extremo, persistencia relacional estricta y un diseño de interfaz altamente reactivo.

---

## Tecnologías Utilizadas

La arquitectura se encuentra formalmente dividida en tres capas independientes:

* **Capa de Cliente (Frontend):** React (v18+), Vite, TypeScript y TailwindCSS.
* **Capa de Servidor (Backend):** Node.js, Express, TypeScript, JSON Web Tokens (JWT) para sesiones y Bcryptjs para el hashing criptográfico de contraseñas.
* **Capa de Persistencia (Base de Datos):** PostgreSQL relacional, interactuando mediante la capa de abstracción tipada de **Prisma ORM (v6)**.

---

## Arquitectura de Directorios (Monorrepo)

El proyecto está organizado en una estructura limpia de carpetas mellizas dentro de un único repositorio principal:

```text
task-manager/
├── backend/               # Servidor Express, Prisma ORM y Criptografía
│   ├── prisma/            # Esquemas de base de datos relacional
│   └── src/               # Lógica de endpoints, controladores y middlewares
├── frontend/              # Interfaz de usuario SPA en React + TypeScript
│   └── src/               # Componentes modulares, hooks y vistas controladas
└── README.md              # Documentación técnica principal
Características Clave de Seguridad e Integración
    Autenticación Criptográfica: El registro cifra las contraseñas de forma irreversible con bcryptjs antes de impactar el motor SQL. El inicio de sesión genera firmas digitales con JWT.
    Rutas Protegidas: Los endpoints de tareas se encuentran blindados perimetralmente mediante un middleware que intercepta y decodifica las cabeceras HTTP (Authorization: Bearer <token>).
    Sincronización Reactiva (Mecanismo Interceptor 401): El Frontend intercepta proactivamente las respuestas del servidor. Ante una excepción 401 Unauthorized (token expirado o adulterado), se dispara una rutina automática de purga que limpia el localStorage en milisegundos y redirige al usuario al Login automáticamente.

    Instalación y Despliegue Local

Sigue estos pasos desde la terminal para levantar el ecosistema completo en tu máquina:
1. Clonar el repositorio
    git clone [https://github.com/TU_USUARIO_DE_GITHUB/task-manager.git](https://github.com/TU_USUARIO_DE_GITHUB/task-manager.git)
    cd task-manager

2. Configuración y Despliegue del Backend
Abre una terminal dedicada para el servidor, configura las variables de entorno (.env) e inicia los servicios:
    cd backend
    npm install
    # Inicializar migraciones e impactar las tablas en PostgreSQL
    npx prisma migrate dev --name init
    # Iniciar servidor Express (Puerto 3000)
    npm run dev

3. Despliegue del Frontend
En una segunda pestaña de tu terminal, levanta el servidor de desarrollo rápido de Vite:
    cd ../frontend
    npm install

    # Iniciar aplicación React (Puerto 5173)
    npm run dev

Herramientas de Administración Adicionales
Prisma Studio (Cliente Visual de BD)

Para inspeccionar de forma gráfica las tablas de usuarios y tareas impactadas directamente en PostgreSQL sin necesidad de clientes externos, ejecuta dentro de la carpeta backend/:
    npx prisma studio


##Autor

    Desarrollador: Oscar Saavedra
    Entorno de Desarrollo: CachyOS Linux