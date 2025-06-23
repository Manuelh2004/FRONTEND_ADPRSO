import React, { useState } from 'react';
import MascotasAdmin from './AdminSections/MascotasAdmin/MascotasAdmin';
import EventosAdmin from './AdminSections/EventosAdmin/EventosAdmin';
import AdopcionesAdmin from './AdminSections/AdopcionesAdmin/AdopcionesAdmin';
import UsuariosAdmin from './AdminSections/UsuariosAdmin/UsuariosAdmin';
import ListarMascota from './AdminSections/MascotasAdmin/ListarMascota';  // Correcto

const Administrador = () => {
  const [seccionActiva, setSeccionActiva] = useState('mascotas');
  const [subseccionActiva, setSubseccionActiva] = useState('registrar'); // Estado para manejar submódulos

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
      <aside className="w-64 bg-blue-800 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-10">Panel de Administración</h2>
        <nav className="flex flex-col gap-2">
          {botones.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setSeccionActiva(id)}
              className={`text-left px-4 py-2 rounded-lg transition-colors ${
                seccionActiva === id
                  ? 'bg-blue-600 font-semibold'
                  : 'hover:bg-blue-700'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {renderContenido()}
      </main>
    </div>
  );
};

export default Administrador;
