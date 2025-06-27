import React, { useState, useEffect } from 'react';
import MascotasAdmin from './AdminSections/MascotasAdmin/MascotasAdmin';
import EventosAdmin from './AdminSections/EventosAdmin/EventosAdmin';
import AdopcionesAdmin from './AdminSections/AdopcionesAdmin/AdopcionesAdmin';

const Administrador = () => {
  const [seccionActiva, setSeccionActiva] = React.useState('mascotas');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Función para mostrar el botón de "Subir" cuando se hace scroll
  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderContenido = () => {
    switch (seccionActiva) {
      case 'mascotas':
        return <MascotasAdmin />;
      case 'eventos':
        return <EventosAdmin />;
      case 'adopciones':
        return <AdopcionesAdmin />;
      default:
        return <MascotasAdmin />;
    }
  };

  const botones = [
    { id: 'mascotas', label: '🐾 Mascotas' },
    { id: 'eventos', label: '📅 Eventos' },
    { id: 'adopciones', label: '📋 Adopciones' },
  ];

  // Función para scroll al inicio
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Panel lateral desplegable por hover */}
      <aside className="group relative bg-[#dda15e] text-white transition-all duration-300 ease-in-out overflow-hidden w-16 hover:w-72 flex flex-col p-2 hover:p-6">
        <h2 className="text-xl font-bold mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Panel de Administración
        </h2>
        <nav className="flex flex-col gap-2">
          {botones.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setSeccionActiva(id)}
              className={`text-left px-4 py-2 rounded-lg transition-colors ${
                seccionActiva === id
                  ? 'bg-white/20 font-semibold'
                  : 'hover:bg-white/10'
              } whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            >
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Contenido principal */}
      <main style={{ backgroundColor: '#F5F5DC' }} className="flex-1 p-8 overflow-y-auto">
        {renderContenido()}
      </main>

      {/* Botón flotante para subir */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="group fixed bottom-8 right-8 bg-[#dda15e] text-white p-4 rounded-full shadow-xl transition-transform transform hover:scale-110 hover:bg-[#b77f40] focus:outline-none"
          title="Volver arriba"
        >
          <svg
            className="w-6 h-6 transition-transform group-hover:-translate-y-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Administrador;
