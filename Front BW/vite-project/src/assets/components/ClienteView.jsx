import { useState, useEffect } from "react";
import foto1 from "./img/1.png"; 
import foto2 from "./img/2.png";
import foto3 from "./img/3.png";

function MiCarrusel() {
  const imagenes = [foto1, foto2, foto3];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % imagenes.length);
    }, 3000);
    return () => clearInterval(intervalo);
  }, [imagenes.length]);

  const siguiente = () => setIndex((index + 1) % imagenes.length);
  const anterior = () => setIndex((index - 1 + imagenes.length) % imagenes.length);

  return (
    <div className="custom-carousel">
      <img src={imagenes[index]} alt={`Slide ${index + 1}`} className="carousel-img" />
      <button onClick={anterior} className="carousel-btn prev">&#10094;</button>
      <button onClick={siguiente} className="carousel-btn next">&#10095;</button>
      
      <div className="carousel-dots">
        {imagenes.map((_, i) => (
          <div 
            key={i} 
            onClick={() => setIndex(i)} 
            className={`carousel-dot ${i === index ? "active" : ""}`} 
          />
        ))}
      </div>
    </div>
  );
}

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
           <div className="logo">
      <img
         src="https://i.pinimg.com/736x/9e/12/6c/9e126c7b051587c224db1b03c45239e3.jpg"
         alt="Logo"
         className="logo-img"
      />
      <h1 className="logo-text" style={{ margin: 0, marginTop: "21px" }}>
   Libreria Indice
</h1>
   </div>
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

<MiCarrusel />

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