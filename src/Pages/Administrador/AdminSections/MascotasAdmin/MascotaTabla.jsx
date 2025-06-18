import React from 'react';

const MascotaTabla = ({ mascotas, handleEditar, handleCambiarEstado }) => {
  return (
    <table className="w-full bg-white shadow rounded">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2">Nombre</th>
          <th className="p-2">Edad</th>
          <th className="p-2">Estado</th>
          <th className="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {mascotas.map((mascota) => (
          <tr key={mascota.id}>
            <td className="p-2">{mascota.nombre}</td>
            <td className="p-2">{mascota.edad}</td>
            <td className="p-2">{mascota.estado === 1 ? 'ACTIVO' : 'INACTIVO'}</td>
            <td className="p-2 space-x-2">
              <button
                onClick={() => handleEditar(mascota)}
                className="text-blue-600 hover:underline"
              >
                Editar
              </button>
              <button
                onClick={() => handleCambiarEstado(mascota.id, mascota.estado)}
                className="text-red-600 hover:underline"
              >
                Cambiar estado
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MascotaTabla;
