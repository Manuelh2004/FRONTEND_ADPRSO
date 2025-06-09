import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Nosotros from './Pages/Nosotros/Nosotros';
import Adopta from './Pages/Adopta/Adopta';
import Donaciones from './Pages/Donaciones/Donaciones';
import Contacto from './Pages/Contacto/Contacto';
import MascotaDetalle from './Pages/Adopta/MascotaDetalle';
import Principal from './Principal';
import Login from './Login';


export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      {isAuthenticated ? (
        <div>
          {/* NAVBAR SOLO SI ESTÁ AUTENTICADO */}
          <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
            {/* Logo y Links */}
            <div className="flex items-center space-x-4">
              <div className="bg-blue-900 text-white font-bold text-xl px-6 py-2 rounded-full">
                <span className="tracking-wide">San Francisco</span>
              </div>

              <ul className="hidden md:flex space-x-6 text-blue-900 font-medium">
                <li><Link to="/">Inicio</Link></li>
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
              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-red-500 font-medium hover:underline"
              >
                Cerrar sesión
              </button>
            </div>
          </nav>

          {/* RUTAS PROTEGIDAS */}
          <Routes>
            <Route path="/" element={<Principal />} />
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
          <Route path="*" element={<Login onLoginSuccess={() => setIsAuthenticated(true)} />} />
        </Routes>
      )}
    </Router>
  );
};