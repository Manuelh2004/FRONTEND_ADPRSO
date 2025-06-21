import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ListaEventos () {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/evento/activos/public');
        const data = await response.json();

        if (response.ok && data.status === 'success') {
          setEventos(data.data);
        } else {
          throw new Error(data.message || 'Error al cargar eventos');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  if (loading) return <p className="text-center mt-10">Cargando eventos...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-blue-900">Eventos Activos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventos.map((evento) => (
          <div
            key={evento.even_id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition"
          >
            {evento.even_imagen && (
              <img
                src={evento.even_imagen}
                alt={evento.even_nombre}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-blue-800">
                {evento.even_nombre}
              </h3>
              {evento.even_fecha_inicio && (
              <p className="text-sm text-gray-500">
                Inicia: {new Date(evento.even_fecha_inicio).toLocaleDateString()}
              </p>
              )}

              <p className="text-gray-600 mb-2">{evento.even_lugar}</p>
              <p className="text-gray-700 line-clamp-3 mb-4">
                {evento.even_descripcion}
              </p>
              <Link
                to={`/eventos/${evento.even_id}`}
                className="text-amber-600 font-semibold hover:underline"
              >
                Ver más
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
