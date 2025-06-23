// src/pages/client/MisEventos.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import EventoCard from "../../../components/EventoCard";

export default function MisEventos() {
  const { token } = useAuth();
  const [eventos, setEventos] = useState([]);
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
  if (eventos.length === 0) return <p className="text-center mt-10">No estás inscrito en ningún evento aún.</p>;

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
