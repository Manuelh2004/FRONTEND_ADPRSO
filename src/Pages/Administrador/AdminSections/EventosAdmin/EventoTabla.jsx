// EventoTabla.jsx
import React from 'react';
import EventoFila from './EventoFila';

const EventoTabla = ({ eventos, handleEditar, handleCambiarEstado }) => {
  return (
    <table className="w-full bg-white shadow rounded">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2">Nombre</th>
          <th className="p-2">Descripción</th>
          <th className="p-2">Fecha</th>
          <th className="p-2">Estado</th>
          <th className="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {eventos.map(evento => (
          <EventoFila
            key={evento.even_id}
            evento={evento}
            handleEditar={handleEditar}
            handleCambiarEstado={handleCambiarEstado}
          />
        ))}
      </tbody>
    </table>
  );
};

export default EventoTabla;
