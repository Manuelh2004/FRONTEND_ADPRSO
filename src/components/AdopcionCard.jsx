// src/components/AdopcionCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function AdopcionCard({ adopcion }) {
  const getEstadoAdopcion = (estado) => {
    switch (estado) {
      case 0:
        return { texto: 'Pendiente', color: 'bg-yellow-100 text-yellow-700' };
      case 1:
        return { texto: 'Aceptada', color: 'bg-green-100 text-green-700' };
      case 2:
        return { texto: 'Rechazada', color: 'bg-red-100 text-red-700' };
      default:
        return { texto: 'Desconocido', color: 'bg-gray-100 text-gray-700' };
    }
  };

  const calcularEdad = (fechaNacStr) => {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacStr);
    let años = hoy.getFullYear() - nacimiento.getFullYear();
    let meses = hoy.getMonth() - nacimiento.getMonth();
    if (meses < 0 || (meses === 0 && hoy.getDate() < nacimiento.getDate())) {
      años--;
      meses += 12;
    }
    return `${años} año${años !== 1 ? 's' : ''} y ${meses} mes${meses !== 1 ? 'es' : ''}`;
  };

  const { texto, color } = getEstadoAdopcion(adopcion.adop_estado);
  const mascota = adopcion.mascota;
  const edad = calcularEdad(mascota?.masc_fecha_nacimiento);

  return (
    <div className="bg-white rounded-lg shadow p-4 border border-gray-200 flex gap-4">
      <img
        src={mascota?.imagenes?.[0]?.imaUrl || '/sin-imagen.jpg'}
        alt={mascota?.masc_nombre}
        className="w-24 h-24 object-cover rounded"
      />
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            {mascota?.masc_nombre}
          </h2>
          <span className={`px-3 py-1 text-sm rounded-full font-semibold ${color}`}>
            {texto}
          </span>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Tipo:</strong> {mascota?.tipo_mascota?.tipma_nombre}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Fecha de nacimiento:</strong>{' '}
          {new Date(mascota?.masc_fecha_nacimiento).toLocaleDateString()} ({edad})
        </p>
        <p className="text-sm text-gray-600">
          <strong>Motivo:</strong> {adopcion.adop_motivo}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Fecha de solicitud:</strong>{' '}
          {new Date(adopcion.adop_fecha).toLocaleDateString()}
        </p>
        <Link
          to={`/adopta/${mascota?.masc_id}`}
          className="text-blue-500 text-sm underline mt-2 inline-block"
        >
          Ver mascota
        </Link>
      </div>
    </div>
  );
}
