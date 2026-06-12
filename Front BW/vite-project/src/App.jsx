import { useState, useEffect } from "react";
import "./App.css";

import LoginForm from "./assets/components/LoginForm";
import RegisterForm from "./assets/components/RegisterForm";
import AdminDashboard from "./assets/components/Dashboard";
import ClienteView from "./assets/components/ClienteView";

export default function App() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [showRegister, setShowRegister] = useState(false);
   const [role, setRole] = useState("");

   useEffect(() => {
      const token = localStorage.getItem("token");
      const savedRole = localStorage.getItem("role");

      if (token) {
         setIsLoggedIn(true);
         setRole(savedRole);
      }
   }, []);

   const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      setIsLoggedIn(false);
      setRole("");
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
            onLogin={(userRole) => {
               setRole(userRole);
               setIsLoggedIn(true);
            }}
            onRegister={() => setShowRegister(true)}
         />
      );
   }

   return (
      <div className="app-wrapper">
         {role === "admin" ? (
            <AdminDashboard onLogout={handleLogout} />
         ) : (
            <ClienteView onLogout={handleLogout} />
         )}
      </div>
   );
}