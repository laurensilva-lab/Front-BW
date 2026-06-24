import { useState, useEffect } from "react";

import foto1 from "./img/1.png";
import foto2 from "./img/2.png";
import foto3 from "./img/3.png";
const misLibros = [
   {
      id: 100,
      nombre: "Romeo y Julieta",
      autor: "William Shakespeare",
      genero: "Teatro / Tragedia",
      año: 1597,
      paginas: 150,
      precio: 300,
      stock: 18,
      cover: "https://i.pinimg.com/736x/e9/fd/20/e9fd20aa26f6c54361b6692d85e2c795.jpg",
   },
   {
      id: 101,
      nombre: "La Metamorfosis",
      autor: "Franz Kafka",
      genero: "Ficción / Realismo mágico",
      año: 1915,
      paginas: 100,
      precio: 250,
      stock: 27,
      cover: "https://i.pinimg.com/736x/a6/39/13/a639138484094c40856b464389acf3b3.jpg",
   },
   {
      id: 102,
      nombre: "El Alquimista",
      autor: "Paulo Coelho",
      genero: "Ficción / Aventuras",
      año: 1988,
      paginas: 200,
      precio: 550,
      stock: 14,
      cover: "https://i.pinimg.com/736x/7b/65/2c/7b652ccb6c0b4c59b63191fb7b7d4c88.jpg",
   },
];

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
   const anterior = () =>
      setIndex((index - 1 + imagenes.length) % imagenes.length);

   return (
      <div className="custom-carousel">
         <img
            src={imagenes[index]}
            alt={`Slide ${index + 1}`}
            className="carousel-img"
         />
         <button onClick={anterior} className="carousel-btn prev">
            &#10094;
         </button>
         <button onClick={siguiente} className="carousel-btn next">
            &#10095;
         </button>

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
   const [isCartOpen, setIsCartOpen] = useState(false);
   const [cartItems, setCartItems] = useState([]);
   const [filter, setFilter] = useState("");
   const [genreFilter, setGenreFilter] = useState("");
   const [authorFilter, setAuthorFilter] = useState("");
   const [maxPrice, setMaxPrice] = useState("");
   const [step, setStep] = useState("cart");
   const [formData, setFormData] = useState({
      nombre: "",
      direccion: "",
      nota: "",
      tarjetaNombre: "",
      tarjetaNumero: "",
      tarjetaVencimiento: "",
      tarjetaCVV: "",
   });

   const addToCart = (book) => {
      setCartItems((prevItems) => {
         const existingItem = prevItems.find((item) => item.id === book.id);
         if (existingItem) {
            return prevItems.map((item) =>
               item.id === book.id
                  ? { ...item, cantidad: (Number(item.cantidad) || 0) + 1 }
                  : item,
            );
         }
         return [...prevItems, { ...book, cantidad: 1 }];
      });
      setIsCartOpen(true);
   };

   const removeItem = (id) => {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
   };

   useEffect(() => {
      fetch("http://localhost:3000/api/books")
         .then((res) => res.json())
         .then((data) => setBooks(data))
         .catch((err) => {
            console.error("Error cargando libros:", err);
            setBooks(misLibros);
         });
   }, []);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const handlePayment = () => {
      alert("Procesando pago...");
      setTimeout(() => {
         alert("¡Pago exitoso! Gracias por tu compra.");
         setStep("cart");
         setCartItems([]);
         setIsCartOpen(false);
      }, 2000);
   };
const genres = [
   ...new Set(
      books
         .map((book) => book.genero)
         .filter(Boolean)
   ),
];

const authors = [
   ...new Set(
      books
         .map((book) => book.autor)
         .filter(Boolean)
   ),
];

const filteredBooks = books.filter((book) => {
   const matchesText =`${book.nombre} ${book.autor} ${book.genero}`
         .toLowerCase()
         .includes(filter.toLowerCase());

   const matchesGenre =!genreFilter ||
      book.genero === genreFilter;

   const matchesAuthor =!authorFilter ||
      book.autor === authorFilter;

   const matchesPrice =!maxPrice ||
      Number(book.precio) <= Number(maxPrice);

   return (
      matchesText &&
      matchesGenre &&
      matchesAuthor &&
      matchesPrice
   );
});
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
                  <h1
                     className="logo-text"
                     style={{ marginLeft: "10px" }}
                  >
                     Libreria Indice
                  </h1>
               </div>
            </h1>
            <div className="header-buttons" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <button className="btn-secondary cart-toggle-btn" onClick={() => setIsCartOpen(true)}>
         🛒 Carrito ({cartItems.reduce((acc, item) => acc + item.cantidad, 0)})
      </button>
            <button className="btn-primary" onClick={onLogout}>
               Cerrar sesión
            </button>
            </div>
         </header>
         <main className="main-layout">
            <section className="grid-panel">
               <div className="grid-header">
                  <span className="grid-label">Catálogo</span>

                  <span className="book-count">
                   {filteredBooks.length} libros encontrados
                  </span>
               </div>

               <MiCarrusel />
<div className="filters">
   <input
      type="text"
      placeholder="Buscar por nombre, autor o género..."
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="filter-input"
   />

   <select
      value={genreFilter}
      onChange={(e) => setGenreFilter(e.target.value)}
      className="filter-select"
   >
      <option value="">Todos los géneros</option>

      {genres.map((genre) => (
         <option key={genre} value={genre}>
            {genre}
         </option>
      ))}
   </select>

   <select
      value={authorFilter}
      onChange={(e) => setAuthorFilter(e.target.value)}
      className="filter-select"
   >
      <option value="">Todos los autores</option>

      {authors.map((author) => (
         <option key={author} value={author}>
            {author}
         </option>
      ))}
   </select>

   <input
      type="number"
      placeholder="Precio máximo"
      value={maxPrice}
      onChange={(e) => setMaxPrice(e.target.value)}
      className="filter-input"
   />

   <button
      className="btn-secondary"
      onClick={() => {
         setFilter("");
         setGenreFilter("");
         setAuthorFilter("");
         setMaxPrice("");
      }}
   >
      Limpiar filtros
   </button>
</div>
               <div className="book-grid">
                  {filteredBooks.map((book) => (
                     <button
                        key={book.id}
                        className={`book-card ${
                           selectedBook?.id === book.id ? "active" : ""
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

                        <span className="book-card-title">{book.nombre}</span>
                     </button>
                  ))}
               </div>
            </section>

            <div className="detail-panel">
               {selectedBook ? (
                  <div className="detail-content">
                     <div className="detail-cover-wrap">
                        <img
                           src={selectedBook.cover}
                           alt={selectedBook.nombre}
                           className="detail-cover"
                        />
                     </div>

                     <h2 className="detail-title">{selectedBook.nombre}</h2>

                     <p className="detail-author">{selectedBook.autor}</p>

                     <p>
                        <strong>Género:</strong> {selectedBook.genero}
                     </p>

                     <p>
                        <strong>Año:</strong> {selectedBook.año}
                     </p>

                     <p>
                        <strong>Páginas:</strong> {selectedBook.paginas}
                     </p>

                     <p>
                        <strong>Stock:</strong> {selectedBook.stock}
                     </p>

                     <p className="meta-value">
                        <strong>Precio:</strong> ${selectedBook.precio}
                     </p>

                     <button
                        className="btn-primary"
                        onClick={() => addToCart(selectedBook)}
                     >
                        Comprar
                     </button>
                  </div>
               ) : (
                  <h2>📖 Selecciona un libro</h2>
               )}
            </div>
         </main>

         <div
            className={`cart-side-overlay ${isCartOpen ? "open" : ""}`}
            onClick={() => setIsCartOpen(false)}
         ></div>

         <div className={`cart-side-panel ${isCartOpen ? "open" : ""}`}>
            <div className="cart-side-header">
               <h3>ARTÍCULOS ({cartItems.length})</h3>
               <button onClick={() => setIsCartOpen(false)}>×</button>
            </div>

            <div className="cart-side-items">
               {step === "cart" && (
                  <>
                     {cartItems.map((item) => (
                        <div key={item.id} className="cart-item-row">
                           <img
                              src={item.cover}
                              className="cart-item-img"
                              alt={item.nombre}
                           />
                           <div className="cart-item-info">
                              <p>{item.nombre}</p>
                              <small>CANT: {item.cantidad}</small>
                           </div>
                           <p className="cart-item-price">
                              $ {item.precio * item.cantidad}
                           </p>
                           <button
                              className="btn-delete-custom"
                              onClick={() => removeItem(item.id)}
                           >
                              🗑️
                           </button>
                        </div>
                     ))}
                  </>
               )}

               {step === "shipping" && (
                  <div className="shipping-form" style={{ padding: "20px" }}>
                     <h3>Datos de envío</h3>
                     <input
                        name="nombre"
                        placeholder="Nombre completo"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        style={{ width: "100%", marginBottom: "10px" }}
                     />
                     <input
                        name="direccion"
                        placeholder="Dirección"
                        value={formData.direccion}
                        onChange={handleInputChange}
                        style={{ width: "100%", marginBottom: "10px" }}
                     />
                     <textarea
                        name="nota"
                        placeholder="Nota para el repartidor"
                        value={formData.nota}
                        onChange={handleInputChange}
                        style={{ width: "100%", marginBottom: "10px" }}
                     />

                     <h3>Datos de pago</h3>
                     <input
                        name="tarjetaNombre"
                        placeholder="Nombre en la tarjeta"
                        value={formData.tarjetaNombre}
                        onChange={handleInputChange}
                        style={{ width: "100%", marginBottom: "10px" }}
                     />
                     <input
                        name="tarjetaNumero"
                        placeholder="Número de tarjeta"
                        value={formData.tarjetaNumero}
                        onChange={handleInputChange}
                        style={{ width: "100%", marginBottom: "10px" }}
                     />
                     <div className="row-container">
                        <input
                           name="tarjetaVencimiento"
                           placeholder="MM/AA"
                           value={formData.tarjetaVencimiento}
                           onChange={handleInputChange}
                        />
                        <input
                           name="tarjetaCVV"
                           placeholder="CVV"
                           value={formData.tarjetaCVV}
                           onChange={handleInputChange}
                        />
                     </div>

                     <button
                        className="btn-primary"
                        onClick={handlePayment}
                        style={{ width: "100%" }}
                     >
                        PAGAR AHORA
                     </button>
                     <button
                        className="btn-secondary"
                        onClick={() => setStep("cart")}
                        style={{ width: "100%", marginTop: "10px" }}
                     >
                        Volver al carrito
                     </button>
                  </div>
               )}
            </div>

            {step === "cart" && (
               <div className="cart-side-footer">
                  <p>
                     Importe total: ${" "}
                     {cartItems.reduce(
                        (acc, item) => acc + item.precio * (item.cantidad || 1),
                        0,
                     )}
                  </p>
                  <button
                     className="btn-primary"
                     style={{ width: "100%" }}
                     onClick={() => setStep("shipping")}
                  >
                     FINALIZAR COMPRA
                  </button>
               </div>
            )}
         </div>
         <footer className="app-footer">
            <div className="footer-container">
               <div className="footer-info">
                  <h4>Sobre Librería Índice</h4>
                  <p>
                     Somos 4 estudiantes de Anima Finest apasionados por la
                     lectura. Creamos este proyecto para conectar historias con
                     lectores.
                  </p>
                  <button
                     className="footer-btn"
                     onClick={() =>
                        alert(
                           "¡Hola! Somos un equipo de 4 estudiantes (Lauren Silva, Diego Silva, Nahuel Velazquez y Maite Silveira) de Anima Finest trabajando en este e-commerce.",
                        )
                     }
                  >
                     Conoce al equipo
                  </button>
               </div>

               <div className="footer-info">
                  <h4>Nuestro objetivo</h4>
                  <p>
                     Fomentar el hábito de la lectura mediante un espacio
                     digital accesible, cercano y diseñado con el corazón.
                  </p>
                  <button
                     className="footer-btn"
                     onClick={() =>
                        alert(
                           "Nuestra meta es facilitar el acceso a la lectura con un diseño cercano y funcional.",
                        )
                     }
                  >
                     Ver objetivo
                  </button>
                  <button
                     className="footer-btn"
                     style={{ marginLeft: "10px" }}
                     onClick={() =>
                        alert(
                           "Puedes contactarnos en: contacto@libreriaindice.com",
                        )
                     }
                  >
                     Contacto
                  </button>
               </div>
            </div>

            <div className="footer-credits">
               <p>
                  &copy; 2026 Librería Índice | Desarrollado por el equipo Anima
                  Finest
               </p>
            </div>
         </footer>
      </>
   );
}
