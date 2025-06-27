import React, { useState, useEffect } from 'react';

const GaleriaImagenes = ({ imagenes }) => {
  const [imagenPrincipal, setImagenPrincipal] = useState(null);

  useEffect(() => {
    if (imagenes.length > 0) {
      setImagenPrincipal(imagenes[0]); // Establecer la primera como imagen principal al cargar
    }
  }, [imagenes]);

  return (
    <>
      {/* Imagen principal */}
      <div className="w-full aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden shadow">
        {imagenPrincipal ? (
          <img
            src={imagenPrincipal.imaUrl}
            alt="Principal"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400 animate-pulse flex justify-center items-center h-full">
            Sin imagen
          </div>
        )}
      </div>

      {/* Galería de miniaturas */}
      {imagenes.length > 1 && (
        <div className="flex gap-3 overflow-x-auto overflow-y-hidden mt-3 max-h-28">
            {imagenes.map((img, idx) => (
            <img
                key={idx}
                src={img.imaUrl}
                alt={`Miniatura-${idx}`}
                onClick={() => setImagenPrincipal(img)}
                className={`w-24 h-24 object-cover rounded shadow cursor-pointer transition-transform duration-200 ${
                imagenPrincipal?.imaUrl === img.imaUrl
                    ? 'ring-2 ring-[#bc6c25] scale-105'
                    : 'hover:scale-105'
                }`}
            />
            ))}
        </div>
        )}
    </>
  );
};

export default GaleriaImagenes;
