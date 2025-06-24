import React, { useEffect, useState } from 'react';

const TablaMascota = ({ mascotas, handleEdit, handleCambiarEstado, handleVerMas }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [mascotasPorPagina] = useState(10);

  // Verifica si 'mascotas' es un array válido antes de hacer el slice
  const mascotasAUsar = Array.isArray(mascotas) ? mascotas : [];

  // Función de cambio de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastMascota = currentPage * mascotasPorPagina;
  const indexOfFirstMascota = indexOfLastMascota - mascotasPorPagina;
  const mascotasActuales = mascotasAUsar.slice(indexOfFirstMascota, indexOfLastMascota);
  const totalPages = Math.ceil(mascotasAUsar.length / mascotasPorPagina);

  return (
    <div>
      <table className="min-w-full table-auto text-sm text-center">
        <thead className="bg-[#dda15e] text-white">
          <tr>
            <th className="px-6 py-4">Nombre</th>
            <th className="px-6 py-4">Fecha de Nacimiento</th>
            <th className="px-6 py-4">Tipo</th>
            <th className="px-6 py-4">Estado de Salud</th>
            <th className="px-6 py-4">Tamaño</th>
            <th className="px-6 py-4">Nivel de Energía</th>
            <th className="px-6 py-4">Estado de Vacuna</th>
            <th className="px-6 py-4">Sexo</th>
            <th className="px-6 py-4">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {mascotasActuales.map((mascota) => (
            <tr key={mascota.masc_id} className="border-t hover:bg-gray-50 transition-colors duration-300">
              <td className="px-6 py-4">{mascota.masc_nombre}</td>
              <td className="px-6 py-4">{mascota.masc_fecha_nacimiento}</td>
              <td className="px-6 py-4">{mascota.tipo_mascota.tipma_nombre}</td>
              <td className="px-6 py-4">{mascota.estado_salud.estsa_nombre}</td>
              <td className="px-6 py-4">{mascota.tamanio.tam_nombre}</td>
              <td className="px-6 py-4">{mascota.nivel_energia.nien_nombre}</td>
              <td className="px-6 py-4">{mascota.estado_vacuna.estva_nombre}</td>
              <td className="px-6 py-4">{mascota.sexo.sex_nombre}</td>
              <td className="px-6 py-4">
                <button
                  className="bg-[#dda15e] hover:bg-[#dda15e] text-white px-4 py-2 rounded-lg transition duration-300"
                  onClick={() => handleEdit(mascota)} // Llamamos a la función handleEdit con la mascota seleccionada
                >
                  Editar
                </button>
                <button
                  className={`ml-2 ${mascota.estado_vacuna.estva_id === 1 ? 'bg-red-500' : 'bg-green-500'} text-white px-4 py-2 rounded-lg`}
                  onClick={() => handleCambiarEstado(mascota.masc_id, mascota.estado_vacuna.estva_id)} // Cambiar estado
                >
                  {mascota.estado_vacuna.estva_id === 1 ? 'Desactivar' : 'Activar'}
                </button>
                <button
                  className="ml-2 bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                  onClick={() => handleVerMas(mascota)} // Llamar a la función para ver más detalles
                >
                  Ver Más
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-[#dda15e] text-white rounded-l hover:bg-[#dda15e] transition duration-300"
        >
          Anterior
        </button>
        <span className="px-4 py-2 flex items-center justify-center">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-[#dda15e] text-white rounded-r hover:bg-[#dda15e] transition duration-300"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default TablaMascota;
