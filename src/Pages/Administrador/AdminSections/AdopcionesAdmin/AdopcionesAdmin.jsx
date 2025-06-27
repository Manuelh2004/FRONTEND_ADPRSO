// AdopcionesAdmin.jsx
import React, { useState, useEffect } from 'react';
import { obtenerAdopcionesPorEstado, cambiarEstadoAdopcion, buscarMascotasPorNombre} from '../../../../services/adopcion/adopcionAdmApi';
import FiltroEstado from './FiltroEstado';
import ModalAdopcion from './ModalAdopcion';
import TablaAdopcion from './TablaAdopcion';

const AdopcionesAdmin = () => {
  const [adopciones, setAdopciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adopcionSeleccionada, setAdopcionSeleccionada] = useState(null);
  const [mostrarConfirmacionModal, setMostrarConfirmacionModal] = useState(false);
  const [estadoFiltro, setEstadoFiltro] = useState('');
  const [estadoAConfirmar, setEstadoAConfirmar] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1); // Página actual
  const [registrosPorPagina] = useState(10);
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

  const adopcionesPaginados = Array.isArray(adopciones) && adopciones ? adopciones.slice(
    (paginaActual - 1) * registrosPorPagina,
    paginaActual * registrosPorPagina
  ) : []; 
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
      <h2 className="text-3xl font-bold mb-6 text-center">Gestión de Adopciones</h2>

      <FiltroEstado 
        estadoFiltro={estadoFiltro} 
        setEstadoFiltro={setEstadoFiltro} 
        busqueda={busqueda} 
        setBusqueda={setBusqueda} />

      <TablaAdopcion
        adopcionesPaginados={adopcionesPaginados}
        obtenerEstadoTexto={obtenerEstadoTexto}
        handleVerMas={handleVerMas}
        solicitarCambioEstado={solicitarCambioEstado}
        paginaActual={paginaActual}
        registrosPorPagina={registrosPorPagina}
      />

       {/* Paginación */}
      <div className="flex justify-between items-center mt-6">
        <button onClick={() => handleCambiarPagina(paginaActual - 1)} disabled={paginaActual === 1} className="bg-[#dda15e] text-white px-6 py-2 rounded-lg disabled:opacity-50">
          Anterior
        </button>
        <span className="text-gray-700">
          Página {paginaActual} de {totalPaginas}
        </span>
        <button onClick={() => handleCambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas} className="bg-[#dda15e]  text-white px-6 py-2 rounded-lg disabled:opacity-50">
          Siguiente
        </button>
      </div>

      {/* Modal de confirmación */}
      {mostrarConfirmacionModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-2xl max-w-lg w-full">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">¿Estás seguro de que deseas cambiar el estado?</h3>

            <div className="space-y-4">
              {/* Botones de confirmación */}
              <div className="flex justify-between">
                <button
                  onClick={() => setMostrarConfirmacionModal(false)}
                  className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-400 transition duration-300 transform hover:scale-105">
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmarCambioEstado}
                  className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-400 transition duration-300 transform hover:scale-105">
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para mostrar más detalles de la adopción */}
      {adopcionSeleccionada  && (
        <ModalAdopcion
          adopcionSeleccionada={adopcionSeleccionada}
          setAdopcionSeleccionada={setAdopcionSeleccionada}
        />
      )}
    </div>
  );
};

export default AdopcionesAdmin;