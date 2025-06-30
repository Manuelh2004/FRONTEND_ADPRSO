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
  const [mostrarConfirmacionModal, setMostrarConfirmacionModal] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState('');
  const [estadoAConfirmar, setEstadoAConfirmar] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [registrosPorPagina] = useState(10);
  const token = localStorage.getItem('token');

  const [mostrarModalMascota, setMostrarModalMascota] = useState(false);
  const [adopcionParaRevertir, setAdopcionParaRevertir] = useState(null);

  useEffect(() => {
    if (!token) return;

    const fetchAdopciones = async () => {
      setLoading(true);
      try {
        const data = await obtenerAdopcionesPorEstado(filtroEstado, token);
        setAdopciones(data);
        setPaginaActual(1);
      } catch (err) {
        console.error('Error al obtener adopciones:', err);
        setError(err.message || 'Error al cargar adopciones.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdopciones();
  }, [filtroEstado, token]);

  const volverAPendiente = async (adopId, actualizarMascota = false) => {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/api/adopciones/volver-a-pendiente/${adopId}?actualizarMascota=${actualizarMascota}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const updatedAdopcion = await response.json();
        setAdopciones((prevAdopciones) =>
          prevAdopciones.map((item) =>
            item.adop_id === adopId ? updatedAdopcion : item
          )
        );
      } else {
        setError("Error al cambiar el estado de la adopción");
      }
    } catch (err) {
      setError("Error de conexión");
    }
  };

  const confirmarVolverAPendiente = (adopcion) => {
    setAdopcionParaRevertir(adopcion);
    setMostrarModalMascota(true);
  };

  const handleVerMas = (adopcion) => {
    setAdopcionSeleccionada(adopcion);
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
    switch (estado) {
      case 0: return "Pendiente";
      case 1: return "Aceptada";
      case 2: return "Rechazada";
      default: return "Desconocido";
    }
  };

  const adopcionesPaginados = Array.isArray(adopciones) && adopciones
    ? adopciones.slice((paginaActual - 1) * registrosPorPagina, paginaActual * registrosPorPagina)
    : [];

  const totalPaginas = Math.ceil((Array.isArray(adopciones) ? adopciones.length : 0) / registrosPorPagina);

  const handleCambiarPagina = (pagina) => {
    if (pagina >= 1 && pagina <= totalPaginas) {
      setPaginaActual(pagina);
    }
  };

  if (loading) return <p className="text-center text-lg font-bold">Cargando...</p>;
  if (error) return <p className="text-center text-lg font-bold text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#a68b5b]">Gestión de Adopciones</h2>

      <FiltroEstado
        filtroEstado={filtroEstado}
        setFiltroEstado={setFiltroEstado}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <TablaAdopcion
        adopcionesPaginados={adopcionesPaginados}
        obtenerEstadoTexto={obtenerEstadoTexto}
        handleVerMas={handleVerMas}
        solicitarCambioEstado={solicitarCambioEstado}
        paginaActual={paginaActual}
        registrosPorPagina={registrosPorPagina}
        confirmarVolverAPendiente={confirmarVolverAPendiente}
      />

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => handleCambiarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
          className="bg-[#dda15e] text-white px-6 py-2 rounded-lg disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-gray-700">
          Página {paginaActual} de {totalPaginas}
        </span>
        <button
          onClick={() => handleCambiarPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
          className="bg-[#dda15e] text-white px-6 py-2 rounded-lg disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>

      {/* Modal de confirmación de cambio de estado */}
      {mostrarConfirmacionModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
          <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-2xl max-w-lg w-full">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              ¿Estás seguro de que deseas cambiar el estado?
            </h3>
            <div className="flex justify-between">
              <button
                onClick={() => setMostrarConfirmacionModal(false)}
                className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-400 transition duration-300 transform hover:scale-105"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmarCambioEstado}
                className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-400 transition duration-300 transform hover:scale-105"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para confirmar si actualizar también la mascota */}
      {mostrarModalMascota && adopcionParaRevertir && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">
              ¿Deseas también cambiar el estado de la mascota?
            </h3>
            <div className="flex justify-around mt-6">
              <button
                onClick={() => {
                  volverAPendiente(adopcionParaRevertir.adop_id, true);
                  setMostrarModalMascota(false);
                }}
                className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600"
              >
                Sí
              </button>
              <button
                onClick={() => {
                  volverAPendiente(adopcionParaRevertir.adop_id, false);
                  setMostrarModalMascota(false);
                }}
                className="bg-yellow-500 text-white px-5 py-2 rounded hover:bg-yellow-600"
              >
                No
              </button>
              <button
                onClick={() => setMostrarModalMascota(false)}
                className="bg-gray-400 text-white px-5 py-2 rounded hover:bg-gray-500"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para mostrar más detalles */}
      {adopcionSeleccionada && (
        <ModalAdopcion
          adopcionSeleccionada={adopcionSeleccionada}
          setAdopcionSeleccionada={setAdopcionSeleccionada}
        />
      )}
    </div>
  );
};

export default AdopcionesAdmin;
