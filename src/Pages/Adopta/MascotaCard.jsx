import React from 'react';

const MascotaCard = ({ mascota }) => (
  <div className="border p-4 rounded shadow hover:shadow-lg transition">
    <div className="bg-gray-300 w-full h-40 rounded mb-2 flex items-center justify-center">
      Imagen de {mascota.nombre}
    </div>
    <h3 className="text-lg font-semibold">{mascota.nombre}</h3>
    <p className="text-sm">Edad: {mascota.edad}</p>
    <p className="text-sm">Sexo: {mascota.sexo}</p>
  </div>
);

export default MascotaCard;
