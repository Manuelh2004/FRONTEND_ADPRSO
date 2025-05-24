import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Nosotros from './Pages/Nosotros/Nosotros';
import Adopta from './Pages/Adopta/Adopta';
import Donaciones from './Pages/Donaciones/Donaciones';
import Contacto from './Pages/Contacto/Contacto';
import MascotaDetalle from './Pages/Adopta/MascotaDetalle';

export const App = () => {
  return (
    <Router>
      <div>
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="bg-blue-900 text-white font-bold text-xl px-6 py-2 rounded-full">
              <span className="tracking-wide">San Francisco</span>
            </div>
            
            {/* Links */}
            <ul className="hidden md:flex space-x-6 text-blue-900 font-medium">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/nosotros">Nosotros</Link></li>
              <li><Link to="/adopta">Adopta</Link></li>
              <li><Link to="/donaciones">Donaciones</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </div>
          
          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center bg-yellow-400 text-black font-bold px-4 py-2 rounded-full shadow-md hover:bg-yellow-300 transition">
              <span className="mr-2" />
              AYUDA AQUÍ
            </button>
            <div className="flex items-center space-x-1 text-yellow-500 font-medium">
              <a href="#" className="hover:underline">Iniciar sesión</a>
            </div>
          </div>
        </nav>

        {/* Página renderizada */}
        <Routes>
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/adopta" element={<Adopta />} />
          <Route path="/adopta/:id" element={<MascotaDetalle />} />
          <Route path="/donaciones" element={<Donaciones />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </div>
    </Router>
  )
}