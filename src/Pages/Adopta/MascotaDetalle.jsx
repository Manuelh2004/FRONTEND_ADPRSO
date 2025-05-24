import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MascotaDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Simulación de datos 
  const mascota = {
    id,
    nombre: 'Luna',
    imagenPrincipal: '', // URL de imagen
    galeria: ['', '', '', '', ''], // URLs de imágenes adicionales
    fechaIngreso: '03/03/2024',
    tamano: 'Mediano',
    edad: '4 años',
    energia: 'Alta',
    salud: 'Saludable',
    historia: 'Luna fue rescatada de las calles y ha demostrado ser muy cariñosa y juguetona.',
    gustos: ['Pasear al aire libre', 'Caricias']
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Imagen principal */}
      <div className="bg-gray-300 w-full h-64 rounded-md mb-4 flex items-center justify-center">
        {/* Aquí podrías usar <img src={mascota.imagenPrincipal} ... /> */}
        Imagen principal de {mascota.nombre}
      </div>

      {/* Galería miniatura */}
      <div className="flex gap-2 mb-4">
        {mascota.galeria.map((img, index) => (
          <div key={index} className="bg-gray-200 w-16 h-16 rounded" />
        ))}
      </div>

      {/* Info general */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h2 className="text-xl font-bold mb-2">{mascota.nombre}</h2>
          <p><strong>Fecha de ingreso:</strong> {mascota.fechaIngreso}</p>
          <p><strong>Tamaño:</strong> {mascota.tamano}</p>
          <p><strong>Edad:</strong> {mascota.edad}</p>
          <p><strong>Nivel de energía:</strong> {mascota.energia}</p>
          <p><strong>Estado de salud:</strong> {mascota.salud}</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-1">Gustos</h3>
          <ul className="list-disc ml-5">
            {mascota.gustos.map((gusto, idx) => (
              <li key={idx}>{gusto}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Historia */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-1">Mi historia</h3>
        <p className="text-gray-700">{mascota.historia}</p>
      </div>

      {/* Botón adoptar */}
      <button
        onClick={() => alert('¡Gracias por tu interés en adoptar!')}
        className="bg-yellow-400 text-black font-bold px-6 py-2 rounded-full shadow hover:bg-yellow-300 transition"
      >
        ¡Quiero adoptar!
      </button>

      {/* Regresar */}
      <button
        onClick={() => navigate(-1)}
        className="ml-4 text-sm text-blue-500 underline"
      >
        ← Volver
      </button>
    </div>
  );
};

export default MascotaDetalle;
