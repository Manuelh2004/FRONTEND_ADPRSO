import React from 'react';
import MascotasAdmin from './AdminSections/MascotasAdmin/MascotasAdmin';
import EventosAdmin from './AdminSections/EventosAdmin/EventosAdmin';
import AdopcionesAdmin from './AdminSections/AdopcionesAdmin/AdopcionesAdmin';

const Administrador = () => {
  const [seccionActiva, setSeccionActiva] = React.useState('mascotas');

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
      <main className="flex-1 p-8 overflow-y-auto">
        {renderContenido()}
      </main>
    </div>
  );
};

export default Administrador;