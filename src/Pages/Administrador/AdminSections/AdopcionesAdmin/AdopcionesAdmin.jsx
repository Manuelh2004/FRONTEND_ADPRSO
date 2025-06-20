import React, { useState, useEffect } from 'react';
import { obtenerAdopcionesPorEstado, cambiarEstadoAdopcion } from '../../../../services/adopcion/adopcionAdmApi'; 

const AdopcionesAdmin = () => {
  const [adopciones, setAdopciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adopcionSeleccionada, setAdopcionSeleccionada] = useState(null); 
  const [mostrarModal, setMostrarModal] = useState(false); 
  const [mostrarConfirmacionModal, setMostrarConfirmacionModal] = useState(false);
  const [estadoFiltro, setEstadoFiltro] = useState(''); 
  const [estadoAConfirmar, setEstadoAConfirmar] = useState(null); 

  const token = localStorage.getItem('token'); 

  useEffect(() => {
    const fetchAdopciones = async () => {
      setLoading(true);
      try {
        const data = await obtenerAdopcionesPorEstado(estadoFiltro, token);
        setAdopciones(data);  
        setLoading(false); 
      } catch (err) {
        setError(err.message || "Ocurrió un error al cargar las adopciones");
        setLoading(false);
      }
    };

    fetchAdopciones();
  }, [estadoFiltro, token]); 

  if (loading) return <p>Cargando...</p>;

  if (error) return <p>Error: {error}</p>;

  const handleVerMas = (adopcion) => {
    setAdopcionSeleccionada(adopcion);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setAdopcionSeleccionada(null);
  };

  const solicitarCambioEstado = (adopcion, nuevoEstado) => {
    setEstadoAConfirmar({ adopcion, nuevoEstado });
    setMostrarConfirmacionModal(true);
  };

  const handleConfirmarCambioEstado = async () => {
    const { adopcion, nuevoEstado } = estadoAConfirmar;
    try {
      const updatedAdopcion = await cambiarEstadoAdopcion(adopcion.adop_id, nuevoEstado, token);
      setAdopciones((prevAdopciones) =>
        prevAdopciones.map((item) =>
          item.adop_id === adopcion.adop_id ? updatedAdopcion : item
        )
      );
      setMostrarConfirmacionModal(false); 
    } catch (err) {
      console.error("Error al cambiar el estado de la adopción:", err);
      setError("Error al cambiar el estado de la adopción.");
      setMostrarConfirmacionModal(false); 
    }
  };

  const obtenerEstadoTexto = (estado) => {
    switch(estado) {
      case 0: return "Pendiente";
      case 1: return "Aceptada";
      case 2: return "Rechazada";
      default: return "Desconocido";
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
        <p className="text-lg font-semibold mb-4">Lista de Adopciones</p>
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-4 text-center">ID</th>
              <th className="px-6 py-4 text-center">Motivo</th>
              <th className="px-6 py-4 text-center">Fecha</th>
              <th className="px-6 py-4 text-center">Estado</th>
              <th className="px-6 py-4 text-center">Mascota</th>
              <th className="px-6 py-4 text-center">Tipo</th>
              <th className="px-6 py-4 text-center">Usuario</th>
              <th className="px-6 py-4 text-center">Teléfono</th>
              <th className="px-6 py-4 text-center">Acciones</th> {/* Nueva columna */}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {adopciones.map((adopcion) => (
              <tr key={adopcion.adop_id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{adopcion.adop_id}</td>
                <td className="px-6 py-4">{adopcion.adop_motivo}</td>
                <td className="px-6 py-4">{adopcion.adop_fecha}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block py-1 px-3 rounded-full ${
                      adopcion.adop_estado === 0
                        ? 'bg-yellow-200 text-yellow-800'
                        : adopcion.adop_estado === 1
                        ? 'bg-green-200 text-green-800'
                        : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {obtenerEstadoTexto(adopcion.adop_estado)}
                  </span>
                </td>
                <td className="px-6 py-4">{adopcion.mascota.masc_nombre}</td>
                <td className="px-6 py-4">{adopcion.mascota.tipo_mascota.tipma_nombre}</td>
                <td className="px-6 py-4">{adopcion.usuario.usr_nombre} {adopcion.usuario.usr_apellido}</td>
                <td className="px-6 py-4">{adopcion.usuario.usr_telefono}</td>
                <td className="px-6 py-4 space-x-4 text-center">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                    onClick={() => handleVerMas(adopcion)}
                  >
                    Ver más
                  </button>
                  {adopcion.adop_estado === 0 && (
                    <>
                      <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded ml-2 hover:bg-yellow-600 transition duration-300"
                        onClick={() => solicitarCambioEstado(adopcion, 1)} // Cambia a "Aceptada"
                      >
                        Aceptar
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600 transition duration-300"
                        onClick={() => solicitarCambioEstado(adopcion, 2)} // Cambia a "Rechazada"
                      >
                        Rechazar
                      </button>
                    </>
                  )}
                  {adopcion.adop_estado === 1 && (
                    <>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600 transition duration-300"
                        onClick={() => solicitarCambioEstado(adopcion, 2)} // Cambia a "Rechazada"
                      >
                        Rechazar
                      </button>
                    </>
                  )}
                  {adopcion.adop_estado === 2 && (
                    <>
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded ml-2 hover:bg-green-700 transition duration-300"
                        onClick={() => solicitarCambioEstado(adopcion, 1)} // Cambia a "Aceptada"
                      >
                        Aceptar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmación */}
      {mostrarConfirmacionModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">¿Estás seguro de que deseas cambiar el estado?</h3>
            <div className="flex justify-between">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => setMostrarConfirmacionModal(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleConfirmarCambioEstado}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para mostrar más detalles de la adopción */}
      {mostrarModal && adopcionSeleccionada && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Detalles de la adopción</h3>
            <p><strong>Motivo:</strong> {adopcionSeleccionada.adop_motivo}</p>
            <p><strong>Fecha de Adopción:</strong> {adopcionSeleccionada.adop_fecha}</p>
            <p><strong>Estado:</strong> {obtenerEstadoTexto(adopcionSeleccionada.adop_estado)}</p>
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
