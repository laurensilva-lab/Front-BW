import { useState, useEffect } from "react";
import "./App.css";
import LoginForm from "./assets/components/LoginForm";
import RegisterForm from "./assets/components/RegisterForm";
import AdminDashboard from "./assets/components/Dashboard";

export default function App() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [showRegister, setShowRegister] = useState(false);

   useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) setIsLoggedIn(true);
   }, []);

   if (!isLoggedIn) {
      if (showRegister)
         return <RegisterForm onBack={() => setShowRegister(false)} />;
      return (
         <LoginForm
            onLogin={() => setIsLoggedIn(true)}
            onRegister={() => setShowRegister(true)}
         />
      );
   }

   return (
      <div className="app-wrapper">
         <AdminDashboard
            onLogout={() => {
               localStorage.removeItem("token");
               setIsLoggedIn(false);
            }}
         />
      </div>
   );
}
