import React, { useEffect, useState } from 'react';
import { listarMascotas } from '../../../../services/mascota/mascotaAdmApi';  // Asegúrate de importar la función correctamente

const ListarMascota = () => {
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);  // Página actual
  const [mascotasPorPagina] = useState(10);  // Número de mascotas por página

  // Obtener el token del localStorage
  const token = localStorage.getItem('token');
  console.log("Token recuperado:", token);  // Verificar si el token es correcto

  // Verificar si el token existe
  useEffect(() => {
    if (!token) {
      setError('Token de autenticación es necesario');
      setLoading(false);
      return;
    }

    const fetchMascotas = async () => {
      try {
        const data = await listarMascotas(token);  // Pasamos el token aquí
        setMascotas(data.data);  // Suponiendo que 'data' es la propiedad que contiene las mascotas
      } catch (error) {
        setError(error.message || 'Error al cargar las mascotas.');
      } finally {
        setLoading(false);
      }
    };

    fetchMascotas();
  }, [token]);

  if (loading) return <div className="text-center">Cargando...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;  // Mostrar el error si ocurre

  // Calcular las mascotas a mostrar en la página actual
  const indexOfLastMascota = currentPage * mascotasPorPagina;
  const indexOfFirstMascota = indexOfLastMascota - mascotasPorPagina;
  const mascotasActuales = mascotas.slice(indexOfFirstMascota, indexOfLastMascota);

  // Calcular el número de páginas
  const totalPages = Math.ceil(mascotas.length / mascotasPorPagina);

  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-xl p-6">
      <table className="min-w-full table-auto text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-6 py-4">Nombre</th>
            <th className="px-6 py-4">Fecha de Nacimiento</th>
            <th className="px-6 py-4">Tipo</th>
            <th className="px-6 py-4">Estado de Salud</th>
            <th className="px-6 py-4">Tamaño</th>
            <th className="px-6 py-4">Nivel de Energía</th>
            <th className="px-6 py-4">Estado de Vacuna</th>
            <th className="px-6 py-4">Sexo</th>
            <th className="px-6 py-4">Cambiar Estado</th>
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
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300"
                  onClick={() => handleChangeState(mascota.masc_id)} // Cambiar estado al hacer clic
                >
                  Cambiar Estado
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
          className="px-4 py-2 bg-blue-500 text-white rounded-l hover:bg-blue-600 transition duration-300"
        >
          Anterior
        </button>
        <span className="px-4 py-2 flex items-center justify-center">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 transition duration-300"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ListarMascota;
