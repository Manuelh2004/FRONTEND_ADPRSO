import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import EventoCard from "../../../components/EventoCard";
import { fetchMisEventos, getEventosActivos } from "../../../services/evento/eventoApi"; // ← importa los servicios

export default function MisEventos() {
  const { token } = useAuth();
  const [eventos, setEventos] = useState([]);
  const [sugerencias, setSugerencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    const cargarEventos = async () => {
      try {
        const resEventos = await fetchMisEventos(token);
        const listaEventos = resEventos.data.data || [];
        setEventos(listaEventos);

        if (listaEventos.length === 0) {
          const resSugerencias = await getEventosActivos();
          const listaSugerencias = resSugerencias.data.data || [];
          setSugerencias(listaSugerencias.slice(0, 3));
        }
      } catch (err) {
        console.error("Error al obtener eventos:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    cargarEventos();
  }, [token]);

  if (loading) return <p className="text-center mt-10">Cargando eventos...</p>;
  if (error) return <p className="text-red-600 text-center mt-10">Error: {error}</p>;

  if (eventos.length === 0)
    return (
      <div className="max-w-5xl mx-auto px-6 py-10 text-center space-y-6">
        <h2 className="text-2xl font-semibold text-[#bc6c25]">¡Aún no te has inscrito a ningún evento!</h2>
        <p className="text-gray-600 text-base">
          Únete a nuestros eventos de voluntariado y marca la diferencia en la vida de muchos animales.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {sugerencias.map((evento) => (
            <EventoCard key={evento.even_id} evento={evento} />
          ))}
        </div>

        <Link
          to="/eventos"
          className="inline-block mt-6 bg-[#bc6c25] text-white px-6 py-2 rounded hover:bg-[#a65a1e] transition"
        >
          Ver más eventos
        </Link>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-[#bc6c25] mb-6 text-center">Mis Eventos</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {eventos.map((evento) => (
          <EventoCard key={evento.even_id} evento={evento} />
        ))}
      </div>
    </div>
  );
}
