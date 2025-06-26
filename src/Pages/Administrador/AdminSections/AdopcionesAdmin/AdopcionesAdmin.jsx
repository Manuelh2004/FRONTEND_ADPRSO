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
  const [paginaActual, setPaginaActual] = useState(1);
  const [adopcionesPorPagina] = useState(10);

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

  const adopcionesFiltradas = adopciones.filter((adopcion) =>
    adopcion.mascota.masc_nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
    `${adopcion.usuario.usr_nombre} ${adopcion.usuario.usr_apellido}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  const indexOfLastAdopcion = paginaActual * adopcionesPorPagina;
  const indexOfFirstAdopcion = indexOfLastAdopcion - adopcionesPorPagina;
  const adopcionesPaginadas = adopcionesFiltradas.slice(indexOfFirstAdopcion, indexOfLastAdopcion);

  const handlePaginaSiguiente = () => {
    if (paginaActual < Math.ceil(adopcionesFiltradas.length / adopcionesPorPagina)) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const handlePaginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  const totalPages = Math.ceil(adopcionesFiltradas.length / adopcionesPorPagina);
  const isNextDisabled = paginaActual === totalPages;
  const isPrevDisabled = paginaActual === 1;

  if (loading) return <p className="text-center text-lg font-bold text-[#8b5a2b]">Cargando...</p>;
  if (error) return <p className="text-center text-lg font-bold text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 bg-[#f8f1e5] rounded-lg shadow-md min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#8b5a2b]">Gestión de Adopciones</h2>

      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center">
          <label className="mr-2 text-lg text-[#8b5a2b]">Filtrar por estado:</label>
          <select
            className="p-2 border rounded shadow-md bg-white text-[#8b5a2b] border-[#dda15e]"
            value={estadoFiltro}
            onChange={(e) => setEstadoFiltro(e.target.value)}
          >
            <option value="">Todas</option>
            <option value="aceptadas">Aceptadas</option>
            <option value="pendientes">Pendientes</option>
            <option value="rechazadas">Rechazadas</option>
          </select>
        </div>

        <div className="flex items-center w-full md:w-auto">
          <label className="mr-2 text-lg text-[#8b5a2b]">Buscar:</label>
          <input
            type="text"
            className="p-2 border rounded shadow-md bg-white text-[#8b5a2b] border-[#dda15e] flex-grow md:flex-grow-0"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre de mascota o usuario"
          />
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm table-auto border-collapse">
          <thead className="bg-[#dda15e] text-white">
            <tr>
              {['ID', 'Fecha', 'Estado', 'Mascota', 'Tipo', 'Usuario', 'Teléfono', 'Acciones'].map((header) => (
                <th key={header} className="px-6 py-4 text-center font-medium">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-[#8b5a2b]">
            {adopcionesPaginadas.map((adopcion) => (
              <tr key={adopcion.adop_id} className="border-t hover:bg-gray-50 border-[#dda15e]">
                <td className="px-6 py-4 text-center">{adopcion.adop_id}</td>
                <td className="px-6 py-4 text-center">{new Date(adopcion.adop_fecha).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-block py-1 px-3 rounded-full text-sm font-semibold ${
                      adopcion.adop_estado === 0 ? 'bg-yellow-100 text-yellow-800' : 
                      adopcion.adop_estado === 1 ? 'bg-green-100 text-green-800' : 
                      'bg-red-100 text-red-800'
                    }`}
                  >
                    {obtenerEstadoTexto(adopcion.adop_estado)}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">{adopcion.mascota.masc_nombre}</td>
                <td className="px-6 py-4 text-center">{adopcion.mascota.tipo_mascota.tipma_nombre}</td>
                <td className="px-6 py-4 text-center">{adopcion.usuario.usr_nombre} {adopcion.usuario.usr_apellido}</td>
                <td className="px-6 py-4 text-center">{adopcion.usuario.usr_telefono}</td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button
                    className="bg-[#dda15e] text-white px-3 py-1 rounded hover:bg-[#bc6c25] transition duration-300 text-sm"
                    onClick={() => handleVerMas(adopcion)}
                  >
                    Ver más
                  </button>
                  {adopcion.adop_estado === 0 && (
                    <>
                      <button
                        className="bg-green-600 text-white px-3 py-1 rounded ml-1 hover:bg-green-700 transition duration-300 text-sm"
                        onClick={() => solicitarCambioEstado(adopcion, 1)}
                      >
                        Aceptar
                      </button>
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded ml-1 hover:bg-red-700 transition duration-300 text-sm"
                        onClick={() => solicitarCambioEstado(adopcion, 2)}
                      >
                        Rechazar
                      </button>
                    </>
                  )}
                  {adopcion.adop_estado === 1 && (
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded ml-1 hover:bg-red-700 transition duration-300 text-sm"
                      onClick={() => solicitarCambioEstado(adopcion, 2)}
                    >
                      Rechazar
                    </button>
                  )}
                  {adopcion.adop_estado === 2 && (
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded ml-1 hover:bg-green-700 transition duration-300 text-sm"
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

      <div className="flex justify-between mt-4">
        <button
          className={`bg-[#dda15e] text-white px-4 py-2 rounded hover:bg-[#bc6c25] transition duration-300 ${isPrevDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handlePaginaAnterior}
          disabled={isPrevDisabled}
        >
          Anterior
        </button>
        <span className="text-[#8b5a2b] self-center">
          Página {paginaActual} de {totalPages}
        </span>
        <button
          className={`bg-[#dda15e] text-white px-4 py-2 rounded hover:bg-[#bc6c25] transition duration-300 ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handlePaginaSiguiente}
          disabled={isNextDisabled}
        >
          Siguiente
        </button>
      </div>

      {mostrarConfirmacionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4 text-[#8b5a2b]">Confirmar cambio</h3>
            <p className="text-[#8b5a2b] mb-4">¿Estás seguro de que deseas cambiar el estado de esta adopción?</p>
            <div className="flex justify-end space-x-3">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition duration-300"
                onClick={() => setMostrarConfirmacionModal(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-[#dda15e] text-white px-4 py-2 rounded hover:bg-[#bc6c25] transition duration-300"
                onClick={handleConfirmarCambioEstado}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {mostrarModal && adopcionSeleccionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 md:w-96 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 text-[#8b5a2b]">Detalles de la adopción</h3>
            <div className="space-y-3">
              <p><span className="font-semibold text-[#8b5a2b]">ID:</span> {adopcionSeleccionada.adop_id}</p>
              <p><span className="font-semibold text-[#8b5a2b]">Fecha:</span> {new Date(adopcionSeleccionada.adop_fecha).toLocaleDateString()}</p>
              <p><span className="font-semibold text-[#8b5a2b]">Estado:</span> {obtenerEstadoTexto(adopcionSeleccionada.adop_estado)}</p>
              <p><span className="font-semibold text-[#8b5a2b]">Mascota:</span> {adopcionSeleccionada.mascota.masc_nombre}</p>
              <p><span className="font-semibold text-[#8b5a2b]">Tipo:</span> {adopcionSeleccionada.mascota.tipo_mascota.tipma_nombre}</p>
              <p><span className="font-semibold text-[#8b5a2b]">Usuario:</span> {adopcionSeleccionada.usuario.usr_nombre} {adopcionSeleccionada.usuario.usr_apellido}</p>
              <p><span className="font-semibold text-[#8b5a2b]">Teléfono:</span> {adopcionSeleccionada.usuario.usr_telefono}</p>
              <p><span className="font-semibold text-[#8b5a2b]">Email:</span> {adopcionSeleccionada.usuario.usr_email}</p>
            </div>
            <button
              className="mt-4 bg-[#dda15e] text-white px-4 py-2 rounded hover:bg-[#bc6c25] transition duration-300 w-full"
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