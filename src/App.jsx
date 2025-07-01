import { React, useState, useEffect } from "react";
import { Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
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
  const { isAuthenticated, role, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const location = useLocation(); // Hook to listen to route changes

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu visibility
  };

  // Close the menu when the route changes
  useEffect(() => {
    setIsMenuOpen(false); // Close the menu when route changes
  }, [location]); // Dependency on location (route change)

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        {/* Sticky Navigation Bar */}
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-lg border-b border-blue-100 transition-all duration-300 sticky top-0 z-50">
          <div className="flex items-center space-x-6">
            <div className="bg-[#bc6c25] text-white font-extrabold text-2xl px-6 py-2 rounded-full shadow-md hover:scale-105 transform transition duration-300">
              <span className="tracking-wider">San Francisco</span>
            </div>

            {/* Desktop Menu */}
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

        {/* Mobile Dropdown Menu */}
        <div className={`md:hidden fixed top-0 left-0 w-full bg-white shadow-lg py-4 space-y-2 z-50 transition-transform duration-300 ${isMenuOpen ? 'transform translate-y-0' : 'transform -translate-y-full'}`}>
          <div className="flex justify-end px-6">
            {/* Close Button with Custom Color Border */}
            <button onClick={toggleMenu} className="text-2xl text-[#bc6c25] p-2 border-2 border-[#9A4E22] rounded-full hover:bg-[#dda15e] transition duration-300">
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
          <div className="flex flex-col items-center space-y-4 py-4">
            <Link to="/eventos" className="text-[#bc6c25] py-2 text-lg font-medium hover:text-[#dda15e] transition duration-300">Eventos</Link>
            <Link to="/nosotros" className="text-[#bc6c25] py-2 text-lg font-medium hover:text-[#dda15e] transition duration-300">Nosotros</Link>
            <Link to="/adopta" className="text-[#bc6c25] py-2 text-lg font-medium hover:text-[#dda15e] transition duration-300">Adopta</Link>
            <Link to="/donaciones" className="text-[#bc6c25] py-2 text-lg font-medium hover:text-[#dda15e] transition duration-300">Donaciones</Link>
            <Link to="/contacto" className="text-[#bc6c25] py-2 text-lg font-medium hover:text-[#dda15e] transition duration-300">Contáctanos</Link>
            {isAuthenticated && role === 'Administrador' && (
              <Link to="/admin-only" className="text-[#bc6c25] py-2 text-lg font-medium hover:text-[#dda15e] transition duration-300">Administrador</Link>
            )}
          </div>
        </div>

        {/* Floating hamburger icon */}
        <div className="md:hidden fixed bottom-6 left-6 bg-[#bc6c25] p-4 rounded-full shadow-lg z-50">
          <button onClick={toggleMenu} className="text-white text-2xl">
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>

        {/* Main content */}
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
            <Route path="/verify-email" element={<VerifyEmail/>} />
            {/* RUTA DE LOGIN */}
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            {/* RUTA DE RECUPERACIÓN DE CONTRASEÑA */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
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

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/529876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-lg z-50"
        >
          <i className="fab fa-whatsapp text-white text-2xl"></i>
        </a>
      </div>
    </div>
  );
};
