import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function UsuarioMenu() {
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
    <div className="relative" ref={menuRef}>
      {/* Botón con icono Font Awesome */}
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="text-3xl text-gray-600 hover:text-[#bc6c25] transition duration-200"
      >
        <i className="fa-regular fa-circle-user"></i>
      </button>

      {/* Menú desplegable */}
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
          <Link
            to="/mi-perfil"
            className="block px-5 py-3 text-sm text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setMenuOpen(false)}
          >
            <i className="fa-solid fa-user"></i> Mi Perfil
          </Link>
          <Link
            to="/mis-adopciones"
            className="block px-5 py-3 text-sm text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setMenuOpen(false)}
          >
            <i className="fa-solid fa-paw"></i> Mis Adopciones
          </Link>
          <Link
            to="/mis-eventos"
            className="block px-5 py-3 text-sm text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setMenuOpen(false)}
          >
            <i className="fa-solid fa-calendar"></i> Mis Eventos
          </Link>
          <button
            onClick={() => {
              logout();
              setMenuOpen(false);
            }}
            className="w-full text-left px-5 py-3 text-sm text-red-600 hover:bg-red-50 transition"
          >
            <i className="fa-solid fa-right-from-bracket"></i> Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
