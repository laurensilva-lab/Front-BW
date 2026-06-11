import { useState } from "react";

export default function RegisterForm({ onBack }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Usuario registrado correctamente");
        onBack();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Error al registrar usuario");
    }
  };

  return (
    <div className="login-container">

      <div className="branding-header">
        <img src="https://i.pinimg.com/736x/9e/12/6c/9e126c7b051587c224db1b03c45239e3.jpg" alt="Logo" className="branding-logo" />
        <h1 className="brand-text">Libreria Indice</h1>
      </div>

      <form
        onSubmit={handleRegister}
        className="login-form-box"
      >
        <h2>Registro</h2>

        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          required
        />

        <br /><br />

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <br /><br />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <br /><br />

        <button type="submit">
          Registrarse
        </button>

        <br /><br />

        <button
          type="button"
          onClick={onBack}
        >
          Volver al Login
        </button>
      </form>
    </div>
  );
}