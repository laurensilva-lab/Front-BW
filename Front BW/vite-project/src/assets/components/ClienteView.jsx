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
      setCartItems([...cartItems, book]);
      setIsCartOpen(true);
   };

   const removeItem = (index) => {
      const newCart = cartItems.filter((_, i) => i !== index);
      setCartItems(newCart);
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
         {/* --- COMIENZA EL CAMBIO --- */}
         <div className="cart-side-items">
            {step === "cart" && (
               <>
                  {cartItems.map((item, index) => (
                     <div key={index} className="cart-item-row">
                        <img src={item.cover} className="cart-item-img" />
                        <div className="cart-item-info">
                           <p>{item.nombre}</p>
                        </div>
                        <p className="cart-item-price">$ {item.precio}</p>
                        <button
                           className="btn-delete-custom"
                           onClick={() => removeItem(index)}
                        >
                           🗑️
                        </button>
                     </div>
                  ))}
                  <div className="cart-side-footer">
                     <p>
                        Total: $
                        {cartItems.reduce((acc, item) => acc + item.precio, 0)}
                     </p>
                     <button
                        className="btn-primary"
                        style={{ width: "100%" }}
                        onClick={() => setStep("shipping")}
                     >
                        FINALIZAR COMPRA
                     </button>
                  </div>
               </>
            )}

            {step === "shipping" && (
               <div style={{ padding: "20px" }}>
                  <h3>Forma de entrega</h3>
                  <label>
                     <input type="radio" name="delivery" defaultChecked />{" "}
                     Enviar a domicilio
                  </label>
                  <br />
                  <label>
                     <input type="radio" name="delivery" /> Retirar en punto
                  </label>
                  <button
                     className="btn-primary"
                     style={{ marginTop: "20px", width: "100%" }}
                     onClick={() => setStep("payment")}
                  >
                     Continuar al pago
                  </button>
               </div>
            )}

            {step === "payment" && (
               <div style={{ padding: "20px" }}>
                  <h3>Método de pago</h3>
                  <input
                     type="text"
                     placeholder="Número de tarjeta"
                     className="form-input-custom"
                     style={{ width: "100%", marginBottom: "10px" }}
                  />
                  <input
                     type="text"
                     placeholder="Nombre titular"
                     className="form-input-custom"
                     style={{ width: "100%" }}
                  />
                  <button
                     className="btn-primary"
                     style={{ marginTop: "20px", width: "100%" }}
                     onClick={() => setStep("success")}
                  >
                     Confirmar compra
                  </button>
               </div>
            )}

            {step === "success" && (
               <div style={{ textAlign: "center", padding: "40px" }}>
                  <h3>¡Gracias por tu compra!</h3>
                  <p>Fue realizada con éxito.</p>
                  <button
                     className="btn-primary"
                     onClick={() => {
                        setIsCartOpen(false);
                        setStep("cart");
                        setCartItems([]);
                     }}
                  >
                     Cerrar
                  </button>
               </div>
            )}
         </div>
      </>
   );
}
