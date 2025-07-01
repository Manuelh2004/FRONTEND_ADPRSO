import { React, useState, useEffect } from "react";
import { Routes, Route, Link, Navigate } from 'react-router-dom';
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
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import VerifyEmail from './VerifyEmail';

export const App = () => {
  const { isAuthenticated, role } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        {/* Encabezado */}
        <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-blue-100 relative">
          <nav className="flex items-center justify-between px-6 py-4 transition-all duration-300">
            {/* Logo y enlaces de escritorio */}
            <div className="flex items-center space-x-6">
              <div className="bg-[#bc6c25] text-white font-extrabold 
            text-base px-4 py-1 
            sm:text-lg sm:px-5 sm:py-1.5 
            md:text-xl md:px-6 md:py-2 
            rounded-full shadow-md hover:scale-105 transform transition duration-300">
            <span className="tracking-wider">San Francisco</span>
          </div>

              <ul className="hidden md:flex space-x-6 text-[#bc6c25] font-semibold">
                <li className="hover:text-[#dda15e] transition duration-300"><Link to="/eventos">Eventos</Link></li>
                <li className="hover:text-[#dda15e] transition duration-300"><Link to="/nosotros">Nosotros</Link></li>
                <li className="hover:text-[#dda15e] transition duration-300"><Link to="/adopta">Adopta</Link></li>
                <li className="hover:text-[#dda15e] transition duration-300"><Link to="/donaciones">Donaciones</Link></li>
                <li className="hover:text-[#dda15e] transition duration-300"><Link to="/contacto">Contáctanos</Link></li>
                {isAuthenticated && role === 'Administrador' && (
                  <li className="hover:text-[#dda15e] transition duration-300">
                    <Link to="/admin-only">Administrador</Link>
                  </li>
                )}
              </ul>
            </div>

            {/* Botones de sesión / Usuario */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <UsuarioMenu />
              ) : (
                <>
                  <Link to="/login" className="text-white bg-[#bc6c25] px-4 py-2 rounded-full hover:bg-[#dda15e] transition duration-300 shadow-sm">Iniciar sesión</Link>
                  <Link to="/registro" className="text-white bg-[#bc6c25] px-4 py-2 rounded-full hover:bg-[#dda15e] transition duration-300 shadow-sm">Registrarse</Link>
                </>
              )}
            </div>

            {/* Ícono Hamburguesa */}
            <div className="md:hidden flex items-center">
              <button
                className="text-[#bc6c25] focus:outline-none transition-transform duration-200"
                onClick={() => setIsOpen(!isOpen)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </nav>

          {/* Menú desplegable móvil */}
          {isOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-40">
              <ul className="flex flex-col space-y-4 p-4 text-[#bc6c25] font-semibold">
                <li className="hover:text-[#dda15e] transition duration-300">
                  <Link to="/eventos" onClick={() => setIsOpen(false)}>Eventos</Link>
                </li>
                <li className="hover:text-[#dda15e] transition duration-300">
                  <Link to="/nosotros" onClick={() => setIsOpen(false)}>Nosotros</Link>
                </li>
                <li className="hover:text-[#dda15e] transition duration-300">
                  <Link to="/adopta" onClick={() => setIsOpen(false)}>Adopta</Link>
                </li>
                <li className="hover:text-[#dda15e] transition duration-300">
                  <Link to="/donaciones" onClick={() => setIsOpen(false)}>Donaciones</Link>
                </li>
                <li className="hover:text-[#dda15e] transition duration-300">
                  <Link to="/contacto" onClick={() => setIsOpen(false)}>Contáctanos</Link>
                </li>
                {isAuthenticated && role === 'Administrador' && (
                  <li className="hover:text-[#dda15e] transition duration-300">
                    <Link to="/admin-only" onClick={() => setIsOpen(false)}>Administrador</Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </header>

        {/* Contenido principal */}
        <div className="flex-1">
          <Routes>
            <Route index element={<Navigate to="/nosotros" replace />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/adopta" element={<Adopta />} />
            <Route path="/adopta/:id" element={<MascotaDetalle />} />
            <Route path="/donaciones" element={<Donaciones />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/eventos/lista" element={<ListaEventos />} />
            <Route path="/eventos/:id" element={<EventoDetalle />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin-only" element={<ProtectedRoute allowedRoles={['Administrador']} element={<Administrador />} />} />
            <Route path="/mis-eventos" element={<ProtectedRoute allowedRoles={['Usuario', 'Administrador']} element={<MisEventos />} />} />
            <Route path="/mis-adopciones" element={<ProtectedRoute allowedRoles={['Usuario', 'Administrador']} element={<MisAdopciones />} />} />
            <Route path="/mi-perfil" element={<ProtectedRoute allowedRoles={['Usuario', 'Administrador']} element={<Perfil />} />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="bg-[#9A6C3B] text-white text-center py-6">
          <p>© 2025 Albergue San Francisco. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

