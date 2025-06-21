import React, { useState, useEffect } from 'react';
import { 
  obtenerAdopciones, 
  obtenerAdopcionesAceptadas, 
  obtenerAdopcionesPendientes, 
  obtenerAdopcionesRechazadas,
  cambiarEstadoAdopcion
} from '../../../../services/adopcion/adopcionAdmApi'; // Asegúrate de que la ruta sea correcta

const AdopcionesAdmin = () => {
  const [adopciones, setAdopciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adopcionSeleccionada, setAdopcionSeleccionada] = useState(null); // Para almacenar la adopción seleccionada
  const [mostrarModal, setMostrarModal] = useState(false); // Para manejar la visibilidad del modal
  const [estadoFiltro, setEstadoFiltro] = useState(''); // Para manejar el filtro por estado

  useEffect(() => {
    const fetchAdopciones = async () => {
      setLoading(true);
      try {
        let data;
        if (estadoFiltro === 'aceptadas') {
          data = await obtenerAdopcionesAceptadas();
        } else if (estadoFiltro === 'pendientes') {
          data = await obtenerAdopcionesPendientes();
        } else if (estadoFiltro === 'rechazadas') {
          data = await obtenerAdopcionesRechazadas();
        } else {
          data = await obtenerAdopciones(); // Si no hay filtro, trae todas
        }

        setAdopciones(data);  // Ajusta según la estructura de la respuesta
        setLoading(false); // Cambia el estado a cargado
      } catch (err) {
        setError(err.message || "Ocurrió un error al cargar las adopciones");
        setLoading(false);
      }
    };

    fetchAdopciones(); // Llama la función al montar el componente o al cambiar el filtro
  }, [estadoFiltro]); // Ejecuta el efecto cada vez que cambie el filtro

  // Si está cargando
  if (loading) return <p>Cargando...</p>;

  // Si ocurrió un error
  if (error) return <p>Error: {error}</p>;

  // Función para manejar el click en el botón de "Ver más"
  const handleVerMas = (adopcion) => {
    setAdopcionSeleccionada(adopcion);
    setMostrarModal(true);
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setMostrarModal(false);
    setAdopcionSeleccionada(null);
  };

  // Función para manejar el cambio de estado de la adopción
  const handleCambiarEstado = async (adopcion, nuevoEstado) => {
    try {
      // Llama al servicio para cambiar el estado
      const updatedAdopcion = await cambiarEstadoAdopcion(adopcion.adop_id, nuevoEstado);
      setAdopciones((prevAdopciones) =>
        prevAdopciones.map((item) =>
          item.adop_id === adopcion.adop_id ? updatedAdopcion : item
        )
      );
    } catch (err) {
      setError("Error al cambiar el estado de la adopción");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gestión de Adopciones</h2>

      {/* Filtro por estado */}
      <div className="mb-4">
        <label className="mr-2">Filtrar por estado:</label>
        <select 
          className="p-2 border rounded" 
          value={estadoFiltro} 
          onChange={(e) => setEstadoFiltro(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="aceptadas">Aceptadas</option>
          <option value="pendientes">Pendientes</option>
          <option value="rechazadas">Rechazadas</option>
        </select>
      </div>

      <div className="bg-white p-4 shadow rounded">
        <p>Lista de adopciones</p>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Motivo</th>
              <th className="px-4 py-2 border">Fecha</th>
              <th className="px-4 py-2 border">Estado</th>
              <th className="px-4 py-2 border">Mascota</th>
              <th className="px-4 py-2 border">Tipo</th>
              <th className="px-4 py-2 border">Usuario</th>
              <th className="px-4 py-2 border">Teléfono</th>
              <th className="px-4 py-2 border">Acciones</th> {/* Nueva columna */}
            </tr>
          </thead>
          <tbody>
            {adopciones.map((adopcion) => (
              <tr key={adopcion.adop_id}>
                <td className="px-4 py-2 border">{adopcion.adop_id}</td>
                <td className="px-4 py-2 border">{adopcion.adop_motivo}</td>
                <td className="px-4 py-2 border">{adopcion.adop_fecha}</td>
                <td className="px-4 py-2 border">{adopcion.adop_estado === 1 ? "Pendiente" : "Aceptada"}</td>
                <td className="px-4 py-2 border">{adopcion.mascota.masc_nombre}</td>
                <td className="px-4 py-2 border">{adopcion.mascota.tipo_mascota.tipma_nombre}</td>
                <td className="px-4 py-2 border">{adopcion.usuario.usr_nombre} {adopcion.usuario.usr_apellido}</td>
                <td className="px-4 py-2 border">{adopcion.usuario.usr_telefono}</td>
                <td className="px-4 py-2 border">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handleVerMas(adopcion)}
                  >
                    Ver más
                  </button>
                  {/* Botón para cambiar el estado */}
                  {adopcion.adop_estado === 1 && (
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded ml-2"
                      onClick={() => handleCambiarEstado(adopcion, 2)} // Cambia a "Aceptada"
                    >
                      Aceptar
                    </button>
                  )}
                  {adopcion.adop_estado === 2 && (
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                      onClick={() => handleCambiarEstado(adopcion, 3)} // Cambia a "Rechazada"
                    >
                      Rechazar
                    </button>
                  )}
                  {adopcion.adop_estado === 3 && (
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded ml-2"
                      onClick={() => handleCambiarEstado(adopcion, 2)} // Cambia a "Aceptada"
                    >
                      Aceptar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para mostrar más detalles de la adopción */}
      {mostrarModal && adopcionSeleccionada && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Detalles de la adopción</h3>
            <p><strong>Motivo:</strong> {adopcionSeleccionada.adop_motivo}</p>
            <p><strong>Fecha de Adopción:</strong> {adopcionSeleccionada.adop_fecha}</p>
            <p><strong>Estado:</strong> {adopcionSeleccionada.adop_estado === 1 ? "Pendiente" : "Aceptada"}</p>
            <p><strong>Nombre de la Mascota:</strong> {adopcionSeleccionada.mascota.masc_nombre}</p>
            <p><strong>Tipo de Mascota:</strong> {adopcionSeleccionada.mascota.tipo_mascota.tipma_nombre}</p>
            <p><strong>Usuario:</strong> {adopcionSeleccionada.usuario.usr_nombre} {adopcionSeleccionada.usuario.usr_apellido}</p>
            <p><strong>Teléfono del Usuario:</strong> {adopcionSeleccionada.usuario.usr_telefono}</p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
              onClick={cerrarModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdopcionesAdmin;
