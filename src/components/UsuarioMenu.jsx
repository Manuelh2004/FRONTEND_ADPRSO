import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function UsuarioMenu({ isMobile = false }) {
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${isMobile ? 'w-full' : ''}`} ref={menuRef}>
      {/* Botón del menú usuario */}
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className={`text-3xl text-gray-600 hover:text-[#bc6c25] transition duration-200 ${
          isMobile ? 'w-full text-left px-4 py-2 border border-gray-300 rounded-md text-base' : ''
        }`}
      >
        <i className="fa-regular fa-circle-user mr-2"></i>
        {isMobile && 'Mi cuenta'}
      </button>

      {/* Menú desplegable */}
      {menuOpen && (
        <div className={`bg-white border rounded-md shadow-md z-50 mt-2 ${
          isMobile ? 'w-full' : 'absolute right-0 w-52'
        }`}>
          <Link
            to="/mi-perfil"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setMenuOpen(false)}
          >
            <i className="fa-solid fa-user mr-2"></i> Mi Perfil
          </Link>
          <Link
            to="/mis-adopciones"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setMenuOpen(false)}
          >
            <i className="fa-solid fa-paw mr-2"></i> Mis Adopciones
          </Link>
          <Link
            to="/mis-eventos"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setMenuOpen(false)}
          >
            <i className="fa-solid fa-calendar mr-2"></i> Mis Eventos
          </Link>
          <button
            onClick={() => {
              logout();
              setMenuOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <i className="fa-solid fa-right-from-bracket mr-2"></i> Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
