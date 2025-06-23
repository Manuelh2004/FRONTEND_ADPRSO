import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { fetchMisAdopciones } from '../../../services/adopcion/adopcionApi';
import AdopcionCard from '../../../components/AdopcionCard';

export default function MisAdopciones() {
  const { token } = useAuth();
  const [adopciones, setAdopciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    fetchMisAdopciones(token)
      .then((res) => {
        setAdopciones(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al obtener adopciones:', err);
        setLoading(false);
      });
  }, [token]);

  if (loading) return <div className="text-center py-10">Cargando adopciones...</div>;

  if (adopciones.length === 0)
    return (
      <div className="text-center py-10 text-gray-600">
        No tienes adopciones registradas aún.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#bc6c25] mb-4">Mis Adopciones</h1>
      {adopciones.map((adop) => (
        <AdopcionCard key={adop.adop_id} adopcion={adop} />
      ))}
    </div>
  );
}
