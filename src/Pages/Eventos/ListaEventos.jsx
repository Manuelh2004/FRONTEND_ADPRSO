import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EventoCard from "../../components/EventoCard";


export default function ListaEventos () {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/evento/activos/public`);
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

  const crearFechaLocal = (fechaString) => {
    const fecha = new Date(fechaString + 'T00:00:00');
    return fecha;
  };
  if (eventos.length === 0) {
    return (
      <div className="text-center mt-10 text-xl font-semibold text-white">
        <p className="col-span-full text-center text-gray-500">
          Por el momento no hay eventos disponibles.
        </p>
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto p-4" style={{ backgroundColor: '#9A6C3B', color: '#F5F5DC' }}>
      <h2 className="text-3xl font-bold mb-6">Eventos</h2>
 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventos.map((evento) => (
          <EventoCard key={evento.even_id} evento={evento} />
        ))}
      </div>
    </div>
  );
};
