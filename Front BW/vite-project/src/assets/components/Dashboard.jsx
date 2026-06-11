import React, { useState } from "react";

export default function Dashboard({ onLogout }) {
   const [books, setBooks] = useState([
      {
         id: 1,
         nombre: "Romeo y Julieta",
         autor: "William Shakespeare",
         genero: "Teatro / Tragedia",
         año: "1597",
         paginas: "150",
         stock: 5,
         precio: "450",
         cover: "https://via.placeholder.com/50",
      },
      {
         id: 2,
         nombre: "La Metamorfosis",
         autor: "Franz Kafka",
         genero: "Ficción",
         año: "1915",
         paginas: "100",
         stock: 3,
         precio: "380",
         cover: "https://via.placeholder.com/50",
      },
   ]);

   const [formData, setFormData] = useState({
      nombre: "",
      autor: "",
      genero: "",
      año: "",
      paginas: "",
      stock: "",
      precio: "",
      cover: "",
   });

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!formData.nombre || !formData.autor) return;
      const newBook = {
         ...formData,
         id: Date.now(),
         stock: parseInt(formData.stock) || 0,
      };
      setBooks([...books, newBook]);
      setFormData({
         nombre: "",
         autor: "",
         genero: "",
         año: "",
         paginas: "",
         stock: "",
         precio: "",
         cover: "",
      });
   };

   const handleDelete = (id) => {
      setBooks(books.filter((b) => b.id !== id));
   };

   return (
      <div className="app-workspace-bg" style={{ paddingTop: "0px" }}>
         <header
            style={{
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center",
               paddingTop: "15px",
               paddingBottom: "15px",
               marginBottom: "30px",
               borderBottom: "1px solid var(--khaki)",
            }}
         >
            <h1
               className="app-title"
               style={{
                  margin: 0,
                  color: "#fff",
                  textShadow: "1px 1px 4px rgba(0, 0, 0, 0.4)",
               }}
            >
               Libreria Indice
            </h1>
            <button
               className="btn-primary"
               onClick={onLogout}
               style={{ zIndex: 1000 }}
            >
               Cerrar sesión
            </button>
         </header>

         <div
            style={{
               display: "grid",
               gridTemplateColumns: "1fr 2fr",
               gap: "30px",
               alignItems: "start",
            }}
         >
            {/* Formulario */}
            <div className="form-card-custom">
               <h2 className="form-title-custom">Gestionar Libro</h2>
               <form
                  onSubmit={handleSubmit}
                  style={{
                     display: "flex",
                     flexDirection: "column",
                     gap: "16px",
                  }}
               >
                  <input
                     name="nombre"
                     value={formData.nombre}
                     onChange={handleChange}
                     placeholder="Título"
                     className="form-input-custom"
                     required
                  />
                  <input
                     name="autor"
                     value={formData.autor}
                     onChange={handleChange}
                     placeholder="Autor"
                     className="form-input-custom"
                     required
                  />
                  <input
                     name="genero"
                     value={formData.genero}
                     onChange={handleChange}
                     placeholder="Género"
                     className="form-input-custom"
                  />
                  <div
                     style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "12px",
                     }}
                  >
                     <input
                        name="año"
                        value={formData.año}
                        onChange={handleChange}
                        placeholder="Año"
                        className="form-input-custom"
                     />
                     <input
                        name="paginas"
                        value={formData.paginas}
                        onChange={handleChange}
                        placeholder="Págs"
                        className="form-input-custom"
                     />
                  </div>
                  <div
                     style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "12px",
                     }}
                  >
                     <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        placeholder="Stock"
                        className="form-input-custom"
                     />
                     <input
                        name="precio"
                        value={formData.precio}
                        onChange={handleChange}
                        placeholder="Precio"
                        className="form-input-custom"
                     />
                  </div>
                  <input
                     name="cover"
                     value={formData.cover}
                     onChange={handleChange}
                     placeholder="URL Imagen"
                     className="form-input-custom"
                  />
                  <button
                     type="submit"
                     className="btn-primary"
                     style={{ marginTop: "10px", padding: "12px" }}
                  >
                     Guardar Libro
                  </button>
               </form>
            </div>

            {/* Contenedor principal de la tabla*/}
            <div
               style={{
                  backgroundColor: "rgba(255, 255, 255, 0.85)",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  marginTop: "20px",
               }}
            >
               <h2
                  className="table-title-custom"
                  style={{ marginBottom: "20px" }}
               >
                  📚 Inventario de Libros
               </h2>

               <table
                  className="table-custom"
                  style={{ width: "100%", borderCollapse: "collapse" }}
               >
                  <thead>
                     <tr style={{ borderBottom: "2px solid #5a3d2e" }}>
                        <th style={{ padding: "10px", textAlign: "center" }}>
                           PORTADA
                        </th>
                        <th style={{ padding: "10px", textAlign: "left" }}>
                           LIBRO
                        </th>
                        <th style={{ padding: "10px", textAlign: "center" }}>
                           GÉNERO
                        </th>
                        <th style={{ padding: "10px", textAlign: "center" }}>
                           AÑO
                        </th>
                        <th style={{ padding: "10px", textAlign: "center" }}>
                           PRECIO
                        </th>
                        <th style={{ padding: "10px", textAlign: "center" }}>
                           STOCK
                        </th>
                        <th style={{ padding: "10px", textAlign: "center" }}>
                           ACCIONES
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {books.map((book) => (
                        <tr
                           key={book.id}
                           style={{
                              borderBottom: "1px solid rgba(90, 61, 46, 0.15)",
                           }}
                        >
                           <td style={{ padding: "10px", textAlign: "center" }}>
                              <img
                                 src={book.cover}
                                 alt="portada"
                                 style={{
                                    width: "100px",
                                    height: "140px",
                                    objectFit: "cover",
                                    borderRadius: "4px",
                                 }}
                              />
                           </td>
                           <td style={{ padding: "10px" }}>
                              <strong
                                 style={{ display: "block", color: "#1a0f0a" }}
                              >
                                 {book.nombre}
                              </strong>
                              <span
                                 style={{
                                    fontStyle: "italic",
                                    fontSize: "0.9rem",
                                    color: "#666",
                                 }}
                              >
                                 {book.autor}
                              </span>
                           </td>
                           <td style={{ padding: "10px", textAlign: "center" }}>
                              {book.genero}
                           </td>
                           <td style={{ padding: "10px", textAlign: "center" }}>
                              {book.año}
                           </td>
                           <td style={{ padding: "10px", textAlign: "center" }}>
                              $ {book.precio}
                           </td>
                           <td style={{ padding: "10px", textAlign: "center" }}>
                              <input
                                 type="number"
                                 defaultValue={book.stock}
                                 style={{
                                    width: "45px",
                                    textAlign: "center",
                                    padding: "4px",
                                 }}
                              />
                           </td>
                           <td style={{ padding: "10px", textAlign: "center" }}>
                              <button
                                 onClick={() => handleDelete(book.id)}
                                 className="btn-delete-custom"
                              >
                                 Eliminar
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
}
