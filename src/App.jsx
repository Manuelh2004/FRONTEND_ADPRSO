import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Nosotros from './Pages/Nosotros/Nosotros';
import Adopta from './Pages/Adopta/Adopta';
import Donaciones from './Pages/Donaciones/Donaciones';
import Contacto from './Pages/Contacto/Contacto';
import MascotaDetalle from './Pages/Adopta/MascotaDetalle';
import Voluntario from './Pages/Voluntario/Voluntario';
import Login from './Login';



export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  
  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUsername(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = (user) => {
    setUsername(user);
    setIsAuthenticated(true);
    localStorage.setItem('username', user);
  };

  const handleLogout = () => {
    setUsername('');
    setIsAuthenticated(false);
    localStorage.removeItem('username');
  };

  return (
    <Router>
      {isAuthenticated ? (
        <div>
          <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-900 text-white font-bold text-xl px-6 py-2 rounded-full">
                <span className="tracking-wide">San Francisco</span>
              </div>

              <ul className="hidden md:flex space-x-6 text-blue-900 font-medium">
                <li><Link to="/">Voluntariado</Link></li>
                <li><Link to="/nosotros">Nosotros</Link></li>
                <li><Link to="/adopta">Adopta</Link></li>
                <li><Link to="/donaciones">Donaciones</Link></li>
                <li><Link to="/contacto">Contacto</Link></li>
              </ul>
            </div>

            {/* Botones */}
            <div className="flex items-center space-x-4">
              <button className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-full shadow-md hover:bg-yellow-300 transition">
                AYUDA AQUÍ
              </button>
              <div className="text-blue-900 font-medium">Hola, {username}</div>
              <button
                onClick={handleLogout}
                className="text-red-500 font-medium hover:underline"
              >
                Cerrar sesión
              </button>
            </div>
          </nav>

          {/* RUTAS */}
          <Routes>
            <Route path="/" element={<Voluntario />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/adopta" element={<Adopta />} />
            <Route path="/adopta/:id" element={<MascotaDetalle />} />
            <Route path="/donaciones" element={<Donaciones />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </div>
      ) : (
        // MOSTRAR SOLO LOGIN SI NO ESTÁ AUTENTICADO
        <Routes>
          <Route path="*" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        </Routes>
      )}
    </Router>
  );
};