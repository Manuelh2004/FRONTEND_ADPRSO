import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMascotaDetalle } from '../../services/mascotaApi';

const MascotaDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mascota, setMascota] = useState(null);

  useEffect(() => {
    getMascotaDetalle(id)
      .then(res => {
        setMascota(res.data.data);
      })
      .catch(err => {
        console.error(err);
        // Podrías mostrar un mensaje de error o redirigir
      });
  }, [id]);

  if (!mascota) {
    return <div className="text-center py-10">Cargando información...</div>;
  }

  const imagenes = mascota.imagenes || [];
  const imagenPrincipal = imagenes[0] || null;
  const galeria = imagenes.slice(1);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Imagen principal */}
      <div className="w-full aspect-[16/9] bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
        {imagenPrincipal ? (
          <img
            src={imagenPrincipal.ima_url}
            alt={mascota.masc_nombre}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400 animate-pulse">Sin imagen</div>
        )}
      </div>

      {/* Galería miniatura */}
      {galeria.length > 0 && (
        <div className="flex gap-2 overflow-x-auto mb-4">
          {galeria.map((img, idx) => (
            <img
              key={idx}
              className="w-20 h-20 object-cover rounded"
              src={img.ima_url}
              alt={`${mascota.masc_nombre}-${idx}`}
            />
          ))}
        </div>
      )}

      {/* Información general */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">{mascota.masc_nombre}</h2>
          <p><strong>Registrado el:</strong> {new Date(mascota.masc_fecha_registro).toLocaleDateString()}</p>
          <p><strong>Tamaño:</strong> {mascota.tamanio.tam_nombre}</p>
          <p><strong>Tipo:</strong> {mascota.tipo_mascota.tipma_nombre}</p>
          <p><strong>Nivel de energía:</strong> {mascota.nivel_energia.nien_nombre}</p>
          <p><strong>Estado de salud:</strong> {mascota.estado_salud.estsa_nombre}</p>
          <p><strong>Estado de vacunas:</strong> {mascota.estado_vacuna.estva_nombre}</p>
        </div>
        <div>
  {mascota.gustoMascotaList && mascota.gustoMascotaList.length > 0 && (
    <>
      <h3 className="font-semibold text-lg mb-2">Gustos:</h3>
      <ul className="list-disc list-inside space-y-1">
        {mascota.gustoMascotaList.map((gusto, index) => (
          <li key={index}>
            {gusto.gust_id?.gust_nombre || 'Sin nombre'}
          </li>
        ))}
      </ul>
    </>
  )}
</div>
      </div>

      {/* Historia */}
      <div>
        <h3 className="text-lg font-semibold mb-1">Historia</h3>
        <p className="text-gray-700 leading-relaxed">{mascota.masc_historia}</p>
      </div>

      {/* Botones */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => alert('¡Gracias por tu interés en adoptar!')}
          className="bg-yellow-400 text-black font-bold px-6 py-2 rounded-full shadow hover:bg-yellow-300 transition"
        >
          ¡Quiero adoptar!
        </button>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-500 underline"
        >
          ← Volver
        </button>
      </div>
    </div>
  );
};

export default MascotaDetalle;
