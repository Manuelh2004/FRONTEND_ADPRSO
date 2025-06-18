import React, { useState } from 'react';
import MascotasAdmin from './AdminSections/MascotasAdmin/MascotasAdmin';
import EventosAdmin from './AdminSections/EventosAdmin/EventosAdmin';
import AdopcionesAdmin from './AdminSections/AdopcionesAdmin';
import UsuariosAdmin from './AdminSections/UsuariosAdmin';


const Administrador = () => {
  const [seccionActiva, setSeccionActiva] = useState('mascotas');

  const renderContenido = () => {
    switch (seccionActiva) {
      case 'mascotas':
        return <MascotasAdmin />;
      case 'eventos':
        return <EventosAdmin />;
      case 'adopciones':
        return <AdopcionesAdmin />;
      case 'usuarios':
        return <UsuariosAdmin />;
      default:
        return <MascotasAdmin />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-blue-900 text-white p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-8">Panel de Administración</h2>
        <nav className="flex flex-col space-y-3">
          <button onClick={() => setSeccionActiva('mascotas')} className="text-left hover:underline">🐾 Mascotas</button>
          <button onClick={() => setSeccionActiva('eventos')} className="text-left hover:underline">📅 Eventos</button>
          <button onClick={() => setSeccionActiva('adopciones')} className="text-left hover:underline">📋 Adopciones</button>
          <button onClick={() => setSeccionActiva('usuarios')} className="text-left hover:underline">👥 Usuarios</button>
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-gray-100">
        {renderContenido()}
      </main>
    </div>
  );
};

export default Administrador;
