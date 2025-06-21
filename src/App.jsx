import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Nosotros from './Pages/Nosotros/Nosotros';
import Adopta from './Pages/Adopta/Adopta';
import Donaciones from './Pages/Donaciones/Donaciones';
import Contacto from './Pages/Contacto/Contacto';
import MascotaDetalle from './Pages/Adopta/MascotaDetalle';
import Eventos from './Pages/Eventos/Eventos';
import Login from './Login';
import ProtectedRoute from './components/ProtectedRoute';
import ListaEventos from './Pages/Eventos/ListaEventos';
import EventoDetalle from './Pages/Eventos/EventoDetalle';
import { useAuth } from './context/AuthContext';
import Administrador from './Pages/Administrador/Administrador';

export const App = () => {
  const { isAuthenticated, role, logout } = useAuth();

  return (
    <Router>
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-900 text-white font-bold text-xl px-6 py-2 rounded-full">
            <span className="tracking-wide">San Francisco</span>
          </div>

          <ul className="hidden md:flex space-x-6 text-blue-900 font-medium">
            <li><Link to="/eventos">Eventos</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/adopta">Adopta</Link></li>
            <li><Link to="/donaciones">Donaciones</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>           
            
           {isAuthenticated && role === 'ROLE_ADMIN' && (
              <li><Link to="/admin-only">Administrador</Link></li>
            )}

         
          </ul>
        </div>

        <div className="flex items-center space-x-4">
          <button className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-full shadow-md hover:bg-yellow-300 transition">
            AYUDA AQUÍ
          </button>

          {isAuthenticated ? (
            <>
              <div className="text-blue-900 font-medium">Rol: {role}</div>
              <button
                onClick={logout}
                className="text-red-500 font-medium hover:underline"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-blue-900 font-medium hover:underline"
            >
              Iniciar sesión
            </Link>
          )}
        </div>

      </nav>

      <Routes>
        {/* RUTA PÚBLICA */}
        <Route path="/eventos" element={<Eventos/>} />

        {/* RUTAS PÚBLICAS EXTRAS */}
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/adopta" element={<Adopta />} />
        <Route path="/adopta/:id" element={<MascotaDetalle />} />
        <Route path="/donaciones" element={<Donaciones />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/eventos/lista" element={<ListaEventos />} />
        <Route path="/eventos/:id" element={<EventoDetalle />} />



        {/* RUTA DE LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* RUTAS PROTEGIDAS */}
        <Route
          path="/admin-only"
          element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN']} element={<Administrador/>} />
          }
        />
        <Route
          path="/usuario-only"
          element={
            <ProtectedRoute allowedRoles={['Usuario']} element={<h2>Vista Usuario</h2>} />
          }
        />
      </Routes>
    </Router>
  );
};
