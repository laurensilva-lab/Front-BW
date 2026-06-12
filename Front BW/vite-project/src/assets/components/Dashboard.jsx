import React, { useState, useEffect } from "react";

export default function Dashboard({ onLogout }) {
   const [books, setBooks] = useState([]);

   useEffect(() => {
      const fetchBooks = async () => {
         try {
            const response = await fetch("http://localhost:3000/api/books");
            const data = await response.json();

            if (response.ok) {
               setBooks(data);
            }
         } catch (error) {
            console.error("Error cargando libros:", error);
         }
      };

      fetchBooks();
   }, []);

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

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const response = await fetch("http://localhost:3000/api/books", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(formData),
         });

         const data = await response.json();

         if (response.ok) {
            setBooks([...books, data]);

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

            alert("Libro guardado correctamente");
         } else {
            alert(data.message);
         }
      } catch (error) {
         console.error(error);
         alert("Error al guardar libro");
      }
   };

 const handleDelete = async (id) => {
   try {
      const response = await fetch(
         `http://localhost:3000/api/books/${id}`,
         {
            method: "DELETE",
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         }
      );

      const data = await response.json();

      if (response.ok) {
         setBooks(books.filter((b) => b.id !== id));
         alert("Libro eliminado correctamente");
      } else {
         alert(data.message);
      }
   } catch (error) {
      console.error(error);
      alert("Error al eliminar libro");
   }
};
   //  NUEVO: actualizar stock
   const handleUpdateStock = async (id, newStock) => {
      try {
         const response = await fetch(
            `http://localhost:3000/api/books/${id}`,
            {
               method: "PUT",
               headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
               },
               body: JSON.stringify({ stock: newStock }),
            }
         );

         const data = await response.json();

         if (response.ok) {
            setBooks(
               books.map((b) =>
                  b.id === id ? { ...b, stock: newStock } : b
               )
            );
         } else {
            alert(data.message);
         }
      } catch (error) {
         console.error(error);
         alert("Error al actualizar stock");
      }
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
      position: "relative",
   }}
>
   
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

 
   <button
      className="btn-primary"
      onClick={onLogout}
      style={{
         position: "fixed",
         top: "15px",
         right: "20px",
         zIndex: 9999,
         padding: "10px 16px",
         whiteSpace: "nowrap",
      }}
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
            {/* FORM */}
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

            {/* TABLA */}
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
               <h2 style={{ marginBottom: "20px" }}>
                  📚 Inventario de Libros
               </h2>

               <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                     <tr style={{ borderBottom: "2px solid #5a3d2e" }}>
                        <th>PORTADA</th>
                        <th>LIBRO</th>
                        <th>GÉNERO</th>
                        <th>AÑO</th>
                        <th>PRECIO</th>
                        <th>STOCK</th>
                        <th>ACCIONES</th>
                     </tr>
                  </thead>

                  <tbody>
                     {books.map((book) => (
                        <tr key={book.id}>
                           <td style={{ textAlign: "center" }}>
                              <img
                                 src={book.cover}
                                 alt="portada"
                                 style={{
                                    width: "100px",
                                    height: "140px",
                                    objectFit: "cover",
                                 }}
                              />
                           </td>

                           <td>
                              <strong>{book.nombre}</strong>
                              <div style={{ fontStyle: "italic" }}>
                                 {book.autor}
                              </div>
                           </td>

                           <td style={{ textAlign: "center" }}>
                              {book.genero}
                           </td>

                           <td style={{ textAlign: "center" }}>
                              {book.año}
                           </td>

                           <td style={{ textAlign: "center" }}>
                              $ {book.precio}
                           </td>

                           <td style={{ textAlign: "center" }}>
                              <input
                                 type="number"
                                 value={book.stock}
                                 onChange={(e) => {
                                    const newStock = Number(e.target.value);

                                    setBooks(
                                       books.map((b) =>
                                          b.id === book.id
                                             ? { ...b, stock: newStock }
                                             : b
                                       )
                                    );
                                 }}
                                 style={{
                                    width: "60px",
                                    textAlign: "center",
                                 }}
                              />

                              <button
                                 onClick={() =>
                                    handleUpdateStock(book.id, book.stock)
                                 }
                                 style={{
                                    marginLeft: "10px",
                                    padding: "5px 10px",
                                    background: "#5a3d2e",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                 }}
                              >
                                 Actualizar
                              </button>
                           </td>

                           <td style={{ textAlign: "center" }}>
                              <button
                                 onClick={() => handleDelete(book.id)}
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