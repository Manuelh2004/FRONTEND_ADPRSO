import React from 'react';

const MascotaCard = ({ mascota }) => {
  const imagen = mascota.imagenUrls?.[0] || null;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200">
      {/* Imagen */}
      <div className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center">
        {imagen ? (
          <img
            src={imagen}
            alt={mascota.mascotaNombre}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400 text-sm animate-pulse">Sin imagen</div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4 space-y-1">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{mascota.mascotaNombre}</h3>
        {mascota.tipmaNombre && (
          <p className="text-sm text-gray-500">Tipo: {mascota.tipmaNombre}</p>
        )}
        {mascota.edad && (
          <p className="text-sm text-gray-500">Edad: {mascota.edad} año(s)</p>
        )}
      </div>
    </div>
  );
};

export default MascotaCard;
