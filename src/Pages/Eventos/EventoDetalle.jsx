import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function EventoDetalle () {
  const navigate = useNavigate();
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/evento/${id}/public`);
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

  const handleRegistrarse = () => {
    // Registro del usuario al evento
    navigate('/Login');;
  };

  if (loading) return <p className="text-center mt-10">Cargando detalles...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">Error: {error}</p>;
  if (!evento) return <p className="text-center mt-10">Evento no encontrado</p>;

    // Función auxiliar para crear fecha local sin problemas de zona horaria
    const crearFechaLocal = (fechaString) => {
      const fecha = new Date(fechaString + 'T00:00:00');
      return fecha;
    };

    // Cálculo de días restantes - CORREGIDO
    const calcularMensajeDias = () => {
      const fechaInicio = crearFechaLocal(evento.even_fecha_inicio);
      const fechaFin = crearFechaLocal(evento.even_fecha_fin);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      // Si el evento aún no ha comenzado
      if (hoy < fechaInicio) {
        const diffTime = fechaInicio - hoy;
        const diffDias = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return <p className="text-blue-600 font-medium">Faltan {diffDias} día{diffDias > 1 ? 's' : ''}</p>;
      }
      // Si el evento está en curso (hoy está entre fecha inicio y fecha fin)
      else if (hoy >= fechaInicio && hoy <= fechaFin) {
        const diffTime = fechaFin - hoy;
        const diffDias = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDias === 0) {
          return <p className="text-orange-600 font-medium">¡Último día del evento!</p>;
        } else {
          return <p className="text-green-600 font-medium">¡Evento en curso! Quedan {diffDias} día{diffDias > 1 ? 's' : ''}</p>;
        }
      }
      // Si el evento ya terminó
      else {
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
          <strong>Fecha inicio:</strong> {crearFechaLocal(evento.even_fecha_inicio).toLocaleDateString()}
        </p>
        {calcularMensajeDias()}
        <p className="text-gray-700 mb-4">
          <strong>Fecha fin:</strong> {crearFechaLocal(evento.even_fecha_fin).toLocaleDateString()}
        </p>
        <p className="text-gray-800 leading-relaxed whitespace-pre-line">{evento.even_descripcion}</p>
        <button
          onClick={handleRegistrarse}
          className="text-white font-bold px-4 py-2 rounded mt-4"
          style={{ backgroundColor: '#dda15e' }}
        >
          ¡Quiero participar!
        </button>
      </div>
    );
};
