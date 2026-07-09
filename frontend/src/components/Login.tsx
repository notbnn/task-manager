import { useState } from "react";

type LoginProps = {
  onLoginSuccess: (token: string) => void;
};

export default function Login({ onLoginSuccess }: LoginProps) {
  const [isRegister, setIsRegister] = useState(false); // Estado para alternar entre login y registro
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Elegimos la URL dependiendo de si el modo es registro o login
    const endpoint = isRegister ? "register" : "login";

    try {
      const response = await fetch(`http://localhost:3000/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ocurrió un error en el sistema");
      }

      if (isRegister) {
        // MODO REGISTRO: Avisamos que se creó y lo pasamos a la pantalla de login
        setMessage("¡Usuario creado con éxito! Ya puedes iniciar sesión.");
        setIsRegister(false);
        setPassword(""); // Limpiamos clave por seguridad
      } else {
        // MODO LOGIN: Guardamos el token en el baúl y entramos
        localStorage.setItem("token", data.token);
        onLoginSuccess(data.token);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="login-card" style={{ maxWidth: "400px", margin: "100px auto", padding: "30px", background: "#17181f", borderRadius: "8px", border: "1px solid #7c3aed", boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
      <h2 style={{ color: "#7c3aed", textAlign: "center", marginBottom: "20px", fontFamily: "sans-serif" }}>
        {isRegister ? "Crear Cuenta Nueva" : "Iniciar Sesión"}
      </h2>
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input 
          type="email" 
          placeholder="Tu Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "12px", borderRadius: "6px", border: "1px solid #2d2e38", background: "#20212c", color: "#fff", outline: "none" }}
          required 
        />
        <input 
          type="password" 
          placeholder="Tu Contraseña" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "12px", borderRadius: "6px", border: "1px solid #2d2e38", background: "#20212c", color: "#fff", outline: "none" }}
          required 
        />
        <button type="submit" style={{ padding: "12px", background: "#7c3aed", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "16px" }}>
          {isRegister ? "Registrarme Ahora" : "Ingresar al Sistema"}
        </button>
      </form>

      {/* Carteles de éxito o error */}
      {message && <p style={{ color: "#10b981", textAlign: "center", marginTop: "15px", fontSize: "14px" }}>{message}</p>}
      {error && <p style={{ color: "#ef4444", textAlign: "center", marginTop: "15px", fontSize: "14px" }}>⚠️ {error}</p>}

      {/* Botón link para alternar modos */}
      <p style={{ textAlign: "center", marginTop: "20px", color: "#aaa", fontSize: "14px" }}>
        {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta aún?"}{" "}
        <span 
          onClick={() => { setIsRegister(!isRegister); setError(""); setMessage(""); }} 
          style={{ color: "#7c3aed", cursor: "pointer", fontWeight: "bold", textDecoration: "underline" }}
        >
          {isRegister ? "Inicia Sesión" : "Regístrate acá"}
        </span>
      </p>
    </div>
  );
}