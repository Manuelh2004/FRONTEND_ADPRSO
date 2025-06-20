import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function EventoDetalle () {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const response = await fetch(`/api/evento/${id}/public`);
        const data = await response.json();

        if (response.ok && data.status === 'success') {
          setEvento(data.data);
        } else {
          throw new Error(data.message || 'Error al obtener detalles del evento');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvento();
  }, [id]);

  const handleRegistrarEvento = () => {
    // Registro del usuario al evento
    alert('Función de registro aún no implementada');
  };

  if (loading) return <p className="text-center mt-10">Cargando detalles...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">Error: {error}</p>;
  if (!evento) return <p className="text-center mt-10">Evento no encontrado</p>;

    // Cálculo de días restantes
  const calcularMensajeDias = () => {
    const fechaInicio = new Date(evento.even_fecha_inicio);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    fechaInicio.setHours(0, 0, 0, 0);

    const diffTime = fechaInicio - hoy;
    const diffDias = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDias > 0) {
      return <p className="text-blue-600 font-medium">Faltan {diffDias} día{diffDias > 1 ? 's' : ''}</p>;
    } else if (diffDias === 0) {
      return <p className="text-green-600 font-medium">¡Hoy es el evento!</p>;
    } else {
      return <p className="text-red-500 font-medium">Evento finalizado</p>;
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      {evento.even_imagen && (
        <img
          src={evento.even_imagen}
          alt={evento.even_nombre}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
      )}
      <h2 className="text-3xl font-bold text-blue-900 mb-2">{evento.even_nombre}</h2>
      <p className="text-gray-700 mb-1">
        <strong>Ubicación:</strong> {evento.even_lugar}
      </p>
      <p className="text-gray-700 mb-1">
        <strong>Fecha inicio:</strong> {new Date(evento.even_fecha_inicio).toLocaleDateString()}
      </p>
      {calcularMensajeDias()}

      <p className="text-gray-700 mb-4">
        <strong>Fecha fin:</strong> {new Date(evento.even_fecha_fin).toLocaleDateString()}
      </p>
      <p className="text-gray-800 leading-relaxed whitespace-pre-line">{evento.even_descripcion}</p>
      
      <button
        onClick={handleRegistrarEvento}
        className="bg-blue-600 text-white font-bold px-4 py-2 rounded hover:bg-blue-700 mt-4"
      >
        ¡Quiero participar!
      </button>

    </div>
  );
};
