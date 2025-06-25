// AdopcionesAdmin.jsx
import React, { useState, useEffect } from 'react';
import { obtenerAdopcionesPorEstado, cambiarEstadoAdopcion } from '../../../../services/adopcion/adopcionAdmApi';
import FiltroEstado from './FiltroEstado';
import ModalAdopcion from './ModalAdopcion';
import TablaAdopcion from './TablaAdopcion';

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

  const totalPages = Math.ceil(adopcionesFiltradas.length / adopcionesPorPagina);
  const isNextDisabled = paginaActual === totalPages;
  const isPrevDisabled = paginaActual === 1;

  if (loading) return <p className="text-center text-lg font-bold">Cargando...</p>;

  if (error) return <p className="text-center text-lg font-bold text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Gestión de Adopciones</h2>

      <FiltroEstado estadoFiltro={estadoFiltro} setEstadoFiltro={setEstadoFiltro} busqueda={busqueda} setBusqueda={setBusqueda} />

      <TablaAdopcion
        adopcionesPaginadas={adopcionesPaginadas}
        obtenerEstadoTexto={obtenerEstadoTexto}
        handleVerMas={handleVerMas}
        solicitarCambioEstado={solicitarCambioEstado}
      />

      {/* Paginación */}
      <div className="flex justify-between mt-4">
        <button
          className="bg-[#dda15e] text-white px-4 py-2 rounded hover:bg-[#bc6c25]"
          onClick={() => setPaginaActual(paginaActual - 1)}
          disabled={isPrevDisabled}
        >
          Anterior
        </button>
        <button
          className="bg-[#dda15e] text-white px-4 py-2 rounded hover:bg-[#bc6c25]"
          onClick={() => setPaginaActual(paginaActual + 1)}
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
        <ModalAdopcion
          adopcionSeleccionada={adopcionSeleccionada}
          cerrarModal={cerrarModal}
          obtenerEstadoTexto={obtenerEstadoTexto}
        />
      )}
    </div>
  );
};

export default AdopcionesAdmin;
