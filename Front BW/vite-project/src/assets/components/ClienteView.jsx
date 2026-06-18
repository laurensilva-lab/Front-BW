import { useState, useEffect } from "react";

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

export default function ClienteView({ onLogout }) {
   const [books, setBooks] = useState([]);
   const [selectedBook, setSelectedBook] = useState(null);
   const [isCartOpen, setIsCartOpen] = useState(false);
   const [cartItems, setCartItems] = useState([]);
   const [step, setStep] = useState("cart");

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
         .then((data) => setBooks([...data, ...misLibros]))
         .catch((err) => {
            console.error("Error cargando libros:", err);
            setBooks(misLibros);
         });
   }, []);

   return (
      <>
         <header className="app-header">
            <h1 className="app-title">📚 Librería Índice</h1>
            <button className="btn-primary" onClick={onLogout}>
               Cerrar sesión
            </button>
         </header>

         <main className="main-layout">
            <section className="grid-panel">
               <div className="grid-header">
                  <span className="grid-label">Catálogo</span>
                  <span className="book-count">
                     {books.length} libros disponibles
                  </span>
               </div>
               <div className="book-grid">
                  {books.map((book) => (
                     <button
                        key={book.id}
                        className="book-card"
                        onClick={() => setSelectedBook(book)}
                     >
                        <div className="book-cover-wrap">
                           <img
                              src={book.cover}
                              alt={book.nombre}
                              className="book-cover"
                           />
                        </div>
                        <span className="book-card-title">{book.nombre}</span>
                     </button>
                  ))}
               </div>
            </section>

            <aside className="detail-panel">
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
                     <p className="meta-value">$ {selectedBook.precio}</p>
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
            </aside>
         </main>

         {/* CARRITO */}
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
            </div>
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
         </div>
      </>
   );
}
