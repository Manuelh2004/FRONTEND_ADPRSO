import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import EventoCard from "../../../components/EventoCard";

export default function MisEventos() {
  const { token } = useAuth();
  const [eventos, setEventos] = useState([]);
  const [sugerencias, setSugerencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMisEventos = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/evento/mis_eventos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok && data.status === "success") {
          setEventos(data.data || []);

          if ((data.data || []).length === 0) {
            // Si no hay eventos, obtener sugerencias
            const sugerenciasRes = await fetch("http://localhost:8080/api/evento/activos/public");
            const sugerenciasData = await sugerenciasRes.json();
            if (sugerenciasRes.ok && sugerenciasData.status === "success") {
              setSugerencias(sugerenciasData.data.slice(0, 3));
            }
          }
        } else {
          throw new Error(data.message || "Error al obtener eventos");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMisEventos();
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

        {/* Sugerencias de eventos */}
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
