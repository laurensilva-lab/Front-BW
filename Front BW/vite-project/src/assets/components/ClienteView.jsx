import { useState, useEffect } from "react";

export default function ClienteView({ onLogout }) {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) =>
        console.error("Error cargando libros:", err)
      );
  }, []);

  return (
    <>
      <header className="app-header">
        <h1 className="app-title">
          📚 Librería Índice
        </h1>

        <button
          className="btn-primary"
          onClick={onLogout}
        >
          Cerrar sesión
        </button>
      </header>

      <main className="main-layout">
        <section className="grid-panel">
          <div className="grid-header">
            <span className="grid-label">
              Catálogo
            </span>

            <span className="book-count">
              {books.length} libros disponibles
            </span>
          </div>

          <div className="book-grid">
            {books.map((book) => (
              <button
                key={book.id}
                className={`book-card ${
                  selectedBook?.id === book.id
                    ? "active"
                    : ""
                }`}
                onClick={() => setSelectedBook(book)}
              >
                <div className="book-cover-wrap">
                  <img
                    src={
                      book.cover ||
                      "https://via.placeholder.com/200x300"
                    }
                    alt={book.nombre}
                    className="book-cover"
                  />
                </div>

                <span className="book-card-title">
                  {book.nombre}
                </span>
              </button>
            ))}
          </div>
        </section>

        <aside className="detail-panel">
          {selectedBook ? (
            <div className="detail-content">
              <div className="detail-cover-wrap">
                <img
                  src={
                    selectedBook.cover ||
                    "https://via.placeholder.com/200x300"
                  }
                  alt={selectedBook.nombre}
                  className="detail-cover"
                />
              </div>

              <div className="detail-info">
                <h2 className="detail-title">
                  {selectedBook.nombre}
                </h2>

                <p className="detail-author">
                  {selectedBook.autor}
                </p>

                <div>
                  <p className="meta-label">
                    Género
                  </p>

                  <p className="meta-value">
                    {selectedBook.genero}
                  </p>
                </div>

                <div>
                  <p className="meta-label">
                    Año
                  </p>

                  <p className="meta-value">
                    {selectedBook.año}
                  </p>
                </div>

                <div>
                  <p className="meta-label">
                    Páginas
                  </p>

                  <p className="meta-value">
                    {selectedBook.paginas}
                  </p>
                </div>

                <div>
                  <p className="meta-label">
                    Stock
                  </p>

                  <p className="meta-value">
                    {selectedBook.stock}
                  </p>
                </div>

                <div>
                  <p className="meta-label">
                    Precio
                  </p>

                  <p className="meta-value">
                    $ {selectedBook.precio}
                  </p>
                </div>

                <button className="btn-primary">
                  Comprar
                </button>
              </div>
            </div>
          ) : (
            <div className="detail-empty">
              <h2>📖 Bienvenido</h2>

              <p>
                Selecciona un libro para ver
                sus detalles.
              </p>
            </div>
          )}
        </aside>
      </main>
    </>
  );
}