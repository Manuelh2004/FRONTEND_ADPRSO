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
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1); // Página actual
  const [adopcionesPorPagina] = useState(10); // Número de adopciones por página

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

  // Filtrar adopciones por la búsqueda
  const adopcionesFiltradas = adopciones.filter((adopcion) =>
    adopcion.mascota.masc_nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
    `${adopcion.usuario.usr_nombre} ${adopcion.usuario.usr_apellido}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Paginación: obtener adopciones correspondientes a la página actual
  const indexOfLastAdopcion = paginaActual * adopcionesPorPagina;
  const indexOfFirstAdopcion = indexOfLastAdopcion - adopcionesPorPagina;
  const adopcionesPaginadas = adopcionesFiltradas.slice(indexOfFirstAdopcion, indexOfLastAdopcion);

  // Cambiar página
  const handlePaginaSiguiente = () => {
    if (paginaActual < totalPages) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const handlePaginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  // Total de páginas
  const totalPages = Math.ceil(adopcionesFiltradas.length / adopcionesPorPagina);

  // Desactivar botones de paginación
  const isNextDisabled = paginaActual === totalPages;
  const isPrevDisabled = paginaActual === 1;

  if (loading) return <p className="text-center text-lg font-bold">Cargando...</p>;

  if (error) return <p className="text-center text-lg font-bold text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Gestión de Adopciones</h2>

      {/* Filtro y Buscador en una sola línea */}
      <div className="mb-6 flex justify-between items-center">
        {/* Filtro por estado */}
        <div className="flex items-center">
          <label className="mr-2 text-lg">Filtrar por estado:</label>
          <select
            className="p-2 border rounded shadow-md"
            value={estadoFiltro}
            onChange={(e) => setEstadoFiltro(e.target.value)}
          >
            <option value="">Todas</option>
            <option value="aceptadas">Aceptadas</option>
            <option value="pendientes">Pendientes</option>
            <option value="rechazadas">Rechazadas</option>
          </select>
        </div>

        {/* Buscador */}
        <div className="flex items-center">
          <label className="mr-2 text-lg">Buscar:</label>
          <input
            type="text"
            className="p-2 border rounded shadow-md"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre de mascota o usuario"
          />
        </div>
      </div>

      {/* Tabla con adopciones */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm table-auto border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              {['ID', 'Fecha', 'Estado', 'Mascota', 'Tipo', 'Usuario', 'Teléfono', 'Acciones'].map((header) => (
                <th key={header} className="px-6 py-4 text-center font-medium">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {adopcionesPaginadas.map((adopcion) => (
              <tr key={adopcion.adop_id} className="border-t hover:bg-gray-100">
                <td className="px-6 py-4">{adopcion.adop_id}</td>
                <td className="px-6 py-4">{adopcion.adop_fecha}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block py-1 px-3 rounded-full ${adopcion.adop_estado === 0 ? 'bg-yellow-200 text-yellow-800' : adopcion.adop_estado === 1 ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}
                  >
                    {obtenerEstadoTexto(adopcion.adop_estado)}
                  </span>
                </td>
                <td className="px-6 py-4">{adopcion.mascota.masc_nombre}</td>
                <td className="px-6 py-4">{adopcion.mascota.tipo_mascota.tipma_nombre}</td>
                <td className="px-6 py-4">{adopcion.usuario.usr_nombre} {adopcion.usuario.usr_apellido}</td>
                <td className="px-6 py-4">{adopcion.usuario.usr_telefono}</td>
                <td className="px-6 py-4 text-center space-x-4">
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
                        onClick={() => solicitarCambioEstado(adopcion, 1)}
                      >
                        Aceptar
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600 transition duration-300"
                        onClick={() => solicitarCambioEstado(adopcion, 2)}
                      >
                        Rechazar
                      </button>
                    </>
                  )}
                  {adopcion.adop_estado === 1 && (
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600 transition duration-300"
                      onClick={() => solicitarCambioEstado(adopcion, 2)}
                    >
                      Rechazar
                    </button>
                  )}
                  {adopcion.adop_estado === 2 && (
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded ml-2 hover:bg-green-700 transition duration-300"
                      onClick={() => solicitarCambioEstado(adopcion, 1)}
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

      {/* Paginación */}
      <div className="flex justify-between mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handlePaginaAnterior}
          disabled={isPrevDisabled}
        >
          Anterior
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handlePaginaSiguiente}
          disabled={isNextDisabled}
        >
          Siguiente
        </button>
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
