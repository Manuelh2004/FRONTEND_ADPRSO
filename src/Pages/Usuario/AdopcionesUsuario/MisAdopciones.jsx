import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { fetchMisAdopciones } from '../../../services/adopcion/adopcionApi';
import { getMascotasFiltradas } from '../../../services/mascotaApi';
import AdopcionCard from '../../../components/AdopcionCard';
import MascotaCard from '../../Adopta/MascotaCard';
import { Link } from 'react-router-dom';

export default function MisAdopciones() {
  const { token } = useAuth();
  const [adopciones, setAdopciones] = useState([]);
  const [mascotasRecomendadas, setMascotasRecomendadas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const cargarDatos = async () => {
      try {
        const resAdopciones = await fetchMisAdopciones(token);
        const listaAdopciones = resAdopciones.data.data || [];
        setAdopciones(listaAdopciones);

        // Si no tiene adopciones, obtener 3 mascotas para recomendar
        if (listaAdopciones.length === 0) {
          const resMascotas = await getMascotasFiltradas({});
          setMascotasRecomendadas(resMascotas.data.data.slice(0, 3));
        }
      } catch (err) {
        console.error('Error al obtener datos:', err);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [token]);

  if (loading) return <div className="text-center py-10">Cargando adopciones...</div>;

  if (adopciones.length === 0)
    return (
      <div className="max-w-5xl mx-auto px-6 py-10 text-center space-y-6">
        <h2 className="text-2xl font-semibold text-[#bc6c25]">¡Aún no has adoptado una mascota!</h2>
        <p className="text-gray-600 text-base">
          Muchas mascotas esperan un hogar. ¿Por qué no echar un vistazo?
        </p>

        {/* Sugerencias de mascotas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {mascotasRecomendadas.map((mascota) => (
            <Link key={mascota.mascotaId} to={`/adopta/${mascota.mascotaId}`}>
              <MascotaCard mascota={mascota} />
            </Link>
          ))}
        </div>

        <Link
          to="/adopta"
          className="inline-block mt-6 bg-[#bc6c25] text-white px-6 py-2 rounded hover:bg-[#a65a1e] transition"
        >
          Ver más mascotas
        </Link>
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
