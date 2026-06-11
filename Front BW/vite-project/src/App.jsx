import { useState, useEffect } from "react";
import "./App.css";
import LoginForm from "./assets/components/LoginForm";
import RegisterForm from "./assets/components/RegisterForm";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [books, setBooks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
      loadBooks();
    }
  }, []);

  const loadBooks = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/books"
      );

      const data = await response.json();

      setBooks(data);

      if (data.length > 0) {
        setSelected(data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    loadBooks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setShowRegister(false);
  };

  if (!isLoggedIn) {

    if (showRegister) {
      return (
        <RegisterForm
          onBack={() => setShowRegister(false)}
        />
      );
    }

    return (
      <LoginForm
        onLogin={handleLogin}
        onRegister={() => setShowRegister(true)}
      />
    );
  }

  return (
    <div className="app-wrapper">
      

      <button
        className="btn-primary"
        onClick={logout}
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 1000,
        }}
      >
        Cerrar sesión
      </button>

      <div className="main-layout">

        <div className="grid-panel">

          <div >
             <div className="branding-header">
        <img src="https://i.pinimg.com/736x/9e/12/6c/9e126c7b051587c224db1b03c45239e3.jpg" alt="Logo" className="branding-logo" />
        <h1 className="brand-text">Libreria Indice</h1>
      </div>

            <span className="book-count">
              {books.length} libros
            </span>
          </div>

          <div className="book-grid">

            {books.map((book) => (

              <button
                key={book.id}
                className={`book-card ${
                  selected?.id === book.id
                    ? "active"
                    : ""
                }`}
                onClick={() => setSelected(book)}
              >

                <div className="book-cover-wrap">
                  <img
                    src={book.cover}
                    alt={book.nombre}
                    className="book-cover"
                  />
                </div>

                <p className="book-card-title">
                  {book.nombre}
                </p>

              </button>

            ))}

          </div>

        </div>

        <div className="detail-panel">

          {selected ? (

            <div className="detail-content">

              <div className="detail-cover-wrap">

                <img
                  src={selected.cover}
                  alt={selected.nombre}
                  className="detail-cover"
                />

              </div>

              <div className="detail-info">

                <h2 className="detail-title">
                  {selected.nombre}
                </h2>

                <p>
                  <strong>Autor:</strong>{" "}
                  {selected.autor}
                </p>

                <p>
                  <strong>Género:</strong>{" "}
                  {selected.genero}
                </p>

                <p>
                  <strong>Año:</strong>{" "}
                  {selected.año}
                </p>

                <p>
                  <strong>Páginas:</strong>{" "}
                  {selected.paginas}
                </p>

              </div>

            </div>

          ) : (

            <div className="detail-empty">
              <p>Selecciona un libro</p>
            </div>

          )}

        </div>

      </div>

    </div>
  );
}