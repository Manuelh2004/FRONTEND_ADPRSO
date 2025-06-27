
import { React, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Nosotros from './Pages/Nosotros/Nosotros';
import Adopta from './Pages/Adopta/Adopta';
import Donaciones from './Pages/Donaciones/Donaciones';
import Contacto from './Pages/Contacto/Contacto';
import MascotaDetalle from './Pages/Adopta/MascotaDetalle';
import Eventos from './Pages/Eventos/Eventos';
import Login from './Login';
import Registro from './Registro';
import ProtectedRoute from './components/ProtectedRoute';
import ListaEventos from './Pages/Eventos/ListaEventos';
import EventoDetalle from './Pages/Eventos/EventoDetalle';
import { useAuth } from './context/AuthContext';
import Administrador from './Pages/Administrador/Administrador';
import UsuarioMenu from './components/UsuarioMenu';
import MisEventos from './Pages/Usuario/EventosUsuario/MisEventos';
import MisAdopciones from './Pages/Usuario/AdopcionesUsuario/MisAdopciones';
import Perfil from './Pages/Usuario/PerfilUsuario/Perfil';
import ForgotPassword from './ForgotPassword'; // Asegúrate de que la ruta sea correcta
import ResetPassword from './ResetPassword';


export const App = () => {
  const { isAuthenticated, role, logout } = useAuth();

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-lg border-b border-blue-100 transition-all duration-300 sticky top-0 z-50">
        <div className="flex items-center space-x-6">
          <div className="bg-[#bc6c25] text-white font-extrabold text-2xl px-6 py-2 rounded-full shadow-md hover:scale-105 transform transition duration-300">
            <span className="tracking-wider">San Francisco</span>
          </div>

          <ul className="hidden md:flex space-x-6 text-[#bc6c25] font-semibold">
            <li className="hover:text-[#dda15e] transition duration-300">
              <Link to="/eventos">Eventos</Link>
            </li>
            <li className="hover:text-[#dda15e] transition duration-300">
              <Link to="/nosotros">Nosotros</Link>
            </li>
            <li className="hover:text-[#dda15e] transition duration-300">
              <Link to="/adopta">Adopta</Link>
            </li>
            <li className="hover:text-[#dda15e] transition duration-300">
              <Link to="/donaciones">Donaciones</Link>
            </li>
            <li className="hover:text-[#dda15e] transition duration-300">
              <Link to="/contacto">Contáctanos</Link>
            </li>
            {isAuthenticated && role === 'Administrador' && (
              <li className="hover:text-[#dda15e] transition duration-300">
                <Link to="/admin-only">Administrador</Link>
              </li>
            )}
          </ul>
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <UsuarioMenu />
          ) : (
            <>
              <Link
                to="/login"
                className="text-white bg-[#bc6c25] px-4 py-2 rounded-full hover:bg-[#dda15e] transition duration-300 shadow-sm"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/registro"
                className="text-white bg-[#bc6c25] px-4 py-2 rounded-full hover:bg-[#dda15e] transition duration-300 shadow-sm"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </nav>

      <div className="flex-1">
      <Routes>
        {/* RUTA PÚBLICA */}
        <Route index element={<Navigate to="/nosotros" replace />} />

        {/* RUTAS PÚBLICAS EXTRAS */}
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/adopta" element={<Adopta />} />
        <Route path="/adopta/:id" element={<MascotaDetalle />} />
        <Route path="/donaciones" element={<Donaciones />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/eventos/lista" element={<ListaEventos />} />
        <Route path="/eventos/:id" element={<EventoDetalle />} />
        <Route path='/eventos' element={<Eventos/>} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* RUTA DE LOGIN */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* RUTA DE RECUPERACIÓN DE CONTRASEÑA */}
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Agregada la ruta para forgot-password */}

        {/* RUTAS PROTEGIDAS */}
        <Route path="/admin-only" element={<ProtectedRoute allowedRoles={['Administrador']} element={<Administrador/>} />}/>
        <Route path="/mis-eventos" element={<ProtectedRoute allowedRoles={['Usuario', 'Administrador']} element={<MisEventos />} />}/>
        <Route path="/mis-adopciones" element={<ProtectedRoute allowedRoles={['Usuario', 'Administrador']} element={<MisAdopciones />} />}/>
        <Route path="/mi-perfil" element={<ProtectedRoute allowedRoles={['Usuario', 'Administrador']} element={<Perfil />} />}/>
      </Routes>
      </div>
      {/* FOOTER */}
      <footer className="bg-[#9A6C3B] text-white text-center py-6">
        <p>© 2025 Albergue San Francisco. Todos los derechos reservados.</p>
      </footer>
      </div>
    </Router>
  );
};
