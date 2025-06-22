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
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-lg border-b border-blue-100 transition-all duration-300 sticky top-0 z-50">
          <div className="flex items-center space-x-6">
            <div className="bg-blue-900 text-white font-extrabold text-2xl px-6 py-2 rounded-full shadow-md hover:scale-105 transform transition duration-300">
              <span className="tracking-wider">San Francisco</span>
            </div>

            <ul className="hidden md:flex space-x-6 text-blue-900 font-semibold">
              <li className="hover:text-blue-600 transition duration-300">
                <Link to="/eventos">Eventos</Link>
              </li>
              <li className="hover:text-blue-600 transition duration-300">
                <Link to="/nosotros">Nosotros</Link>
              </li>
              <li className="hover:text-blue-600 transition duration-300">
                <Link to="/adopta">Adopta</Link>
              </li>
              <li className="hover:text-blue-600 transition duration-300">
                <Link to="/donaciones">Donaciones</Link>
              </li>
              <li className="hover:text-blue-600 transition duration-300">
                <Link to="/contacto">Contacto</Link>
              </li>
              {isAuthenticated && role === 'ROLE_ADMIN' && (
                <li className="hover:text-blue-600 transition duration-300">
                  <Link to="/admin-only">Administrador</Link>
                </li>
              )}
            </ul>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="text-blue-900 font-semibold">Rol: {role}</div>
                <button
                  onClick={logout}
                  className="text-white bg-red-500 px-4 py-2 rounded-full hover:bg-red-600 transition duration-300 shadow-sm"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-white bg-blue-900 px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300 shadow-sm"
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
