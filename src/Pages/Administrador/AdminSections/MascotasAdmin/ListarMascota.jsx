import React, { useEffect, useState } from 'react';
import { listarMascotas } from '../../../../services/mascota/mascotaAdmApi';  // Asegúrate de importar la función correctamente
import FormularioMascota from './FormularioMascota';  // Asegúrate de que el formulario esté correctamente importado
import ApiService from '../../../../services/itemAdmApi'; // Asegúrate de importar el servicio de la API

const ListarMascota = () => {
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [mascotasPorPagina] = useState(10);
  const [formData, setFormData] = useState({
    masc_nombre: '',
    masc_fecha_nacimiento: '',
    masc_historia: '',
    masc_observacion: '',
    estadoSalud: '',
    estadoVacuna: '',
    nivelEnergia: '',
    tamanio: '',
    tipoMascota: '',
    sexo: ''
  });
  const [editingMascotaId, setEditingMascotaId] = useState(null);
  const [imagenes, setImagenes] = useState(['']);
  const [gustos, setGustos] = useState([]);  // Aquí definimos el estado de gustos
  const [gustosSeleccionados, setGustosSeleccionados] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);  // Estado para abrir/cerrar el modal

  // Obtener token
  const token = localStorage.getItem('token');

  // Verificar si el token existe y obtener datos
  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError('Token de autenticación es necesario');
        setLoading(false);
        return;
      }

      try {
        const data = await listarMascotas(token);  // Obtener las mascotas
        setMascotas(data.data);

        // Obtener los gustos
        const dataGustos = await ApiService.getData('gustos', token);  // Suponiendo que tienes un endpoint para gustos
        setGustos(dataGustos);  // Guardar los gustos en el estado
      } catch (error) {
        setError(error.message || 'Error al cargar las mascotas.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <div className="text-center">Cargando...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  // Función para manejar la edición
  const handleEdit = (mascota) => {
    setFormData({
      masc_nombre: mascota.masc_nombre,
      masc_fecha_nacimiento: mascota.masc_fecha_nacimiento,
      masc_historia: mascota.masc_historia,
      masc_observacion: mascota.masc_observacion,
      estadoSalud: mascota.estado_salud.estsa_id,
      estadoVacuna: mascota.estado_vacuna.estva_id,
      nivelEnergia: mascota.nivel_energia.nien_id,
      tamanio: mascota.tamanio.tam_id,
      tipoMascota: mascota.tipo_mascota.tipma_id,
      sexo: mascota.sexo.sex_id
    });

    setEditingMascotaId(mascota.masc_id);  // Guardamos el ID de la mascota que estamos editando
    setIsModalOpen(true);  // Abrimos el modal
  };

  // Función para manejar el cierre del modal
  const handleCloseModal = () => {
    setIsModalOpen(false);  // Cerramos el modal
  };

  // Función de cambio de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Actualizamos el campo correspondiente en formData
    }));
  };

  // Función para manejar los gustos seleccionados
  const handleGustoChange = (gustoId) => {
    setGustosSeleccionados((prev) => {
      if (prev.includes(gustoId)) {
        return prev.filter((id) => id !== gustoId);  // Si el gusto ya está seleccionado, lo eliminamos
      } else {
        return [...prev, gustoId];  // Si no está seleccionado, lo agregamos
      }
    });
  };

  // Función para manejar el cambio de imagen
  const handleImageChange = (index, value) => {
    const newImagenes = [...imagenes];
    newImagenes[index] = value;
    setImagenes(newImagenes);  // Actualiza el estado de las imágenes
  };

  // Función para manejar la eliminación de imágenes
  const handleImageRemove = (index) => {
    const newImagenes = [...imagenes];
    newImagenes.splice(index, 1);  // Elimina la imagen en la posición del índice
    setImagenes(newImagenes);  // Actualiza el estado de las imágenes
  };

  const indexOfLastMascota = currentPage * mascotasPorPagina;
  const indexOfFirstMascota = indexOfLastMascota - mascotasPorPagina;
  const mascotasActuales = mascotas.slice(indexOfFirstMascota, indexOfLastMascota);
  const totalPages = Math.ceil(mascotas.length / mascotasPorPagina);

  return (
    <div>
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
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300"
                  onClick={() => handleEdit(mascota)} // Llamamos a la función handleEdit con la mascota seleccionada
                >
                  Editar
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

      {/* Modal para editar mascota */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-4/5 md:w-2/3">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
            <FormularioMascota
              formData={formData}
              handleChange={handleChange}
              handleGustoChange={handleGustoChange}  // Pasamos handleGustoChange aquí
              gustos={gustos} // Aquí pasamos los gustos
              gustosSeleccionados={gustosSeleccionados}
              imagenes={imagenes}
              handleImageChange={handleImageChange} // Pasamos handleImageChange aquí
              handleImageRemove={handleImageRemove}  // Pasamos handleImageRemove aquí
              agregarCampoImagen={agregarCampoImagen}
              handleSubmit={handleSubmit}  // Llamas a la función para enviar los cambios
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListarMascota;
