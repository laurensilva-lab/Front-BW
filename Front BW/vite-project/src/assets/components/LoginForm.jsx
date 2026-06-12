import { useState } from "react";


export default function LoginForm({
  onLogin,
  onRegister,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.role);

  onLogin(data.role);
 }
  else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);

      alert(
        "Error al conectar con el servidor"
      );
    }
  };

  return (
    <div className="login-container">
      <form
        onSubmit={handleSubmit}
        className="login-form-box"
      >
        <div className="branding-header">
        <img src="https://i.pinimg.com/736x/9e/12/6c/9e126c7b051587c224db1b03c45239e3.jpg" alt="Logo" className="branding-logo" />
        <h1 className="brand-text">Libreria Indice</h1>
      </div>

        <h2>Iniciar Sesión</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "8px",
          }}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "8px",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
          }}
        >
          Entrar
        </button>

        <button
          type="button"
          onClick={onRegister}
          style={{
            width: "100%",
            padding: "8px",
          }}
        >
          Crear cuenta
        </button>
      </form>
    </div>
  );
}