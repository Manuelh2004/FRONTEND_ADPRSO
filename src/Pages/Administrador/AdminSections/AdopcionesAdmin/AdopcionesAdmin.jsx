import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdopcionesAdmin = () => {
  const [adopciones, setAdopciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adopcionSeleccionada, setAdopcionSeleccionada] = useState(null); // Para almacenar la adopción seleccionada
  const [mostrarModal, setMostrarModal] = useState(false); // Para manejar la visibilidad del modal
  const [mostrarConfirmacionModal, setMostrarConfirmacionModal] = useState(false); // Modal de confirmación
  const [estadoFiltro, setEstadoFiltro] = useState(''); // Para manejar el filtro por estado
  const [estadoAConfirmar, setEstadoAConfirmar] = useState(null); // Estado de la adopción a cambiar

  const token = localStorage.getItem('token'); // Obtener el token

  useEffect(() => {
    const fetchAdopciones = async () => {
      setLoading(true);
      try {
        let data;
        const headers = { 'Authorization': `Bearer ${token}` }; // Agregar el token a los encabezados

        if (estadoFiltro === 'aceptadas') {
          const response = await axios.get('http://localhost:8080/admin/api/adopciones/aceptadas', { headers });
          data = response.data.data;
        } else if (estadoFiltro === 'pendientes') {
          const response = await axios.get('http://localhost:8080/admin/api/adopciones/pendientes', { headers });
          data = response.data.data;
        } else if (estadoFiltro === 'rechazadas') {
          const response = await axios.get('http://localhost:8080/admin/api/adopciones/rechazadas', { headers });
          data = response.data.data;
        } else {
          const response = await axios.get('http://localhost:8080/admin/api/adopciones/listar_adopciones', { headers });
          data = response.data.data;
        }

        setAdopciones(data);  // Ajusta según la estructura de la respuesta
        setLoading(false); // Cambia el estado a cargado
      } catch (err) {
        setError(err.message || "Ocurrió un error al cargar las adopciones");
        setLoading(false);
      }
    };

    fetchAdopciones(); // Llama la función al montar el componente o al cambiar el filtro
  }, [estadoFiltro, token]); // Ejecuta el efecto cada vez que cambie el filtro o el token

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

  // Función para manejar la solicitud de cambio de estado y mostrar el modal de confirmación
  const solicitarCambioEstado = (adopcion, nuevoEstado) => {
    setEstadoAConfirmar({ adopcion, nuevoEstado });
    setMostrarConfirmacionModal(true);
  };

  // Función para ejecutar el cambio de estado después de la confirmación
  const handleConfirmarCambioEstado = async () => {
    const { adopcion, nuevoEstado } = estadoAConfirmar;
    const token = localStorage.getItem('token'); // Obtener el token

    // Verificar si el token está presente
    if (!token) {
      setError("No se encuentra un token de autorización válido. Por favor, inicia sesión.");
      return;
    }

    try {
      // Cambiar la URL para incluir el parámetro nuevoEstado en la consulta de la URL
      const response = await axios.put(
        `http://localhost:8080/admin/api/adopciones/${adopcion.adop_id}/estado?nuevoEstado=${nuevoEstado}`,
        {},
        {
          headers: { 
            'Authorization': `Bearer ${token}`, // Usar comillas invertidas para interpolar el token
          }
        }
      );

      const updatedAdopcion = response.data.data;
      setAdopciones((prevAdopciones) =>
        prevAdopciones.map((item) =>
          item.adop_id === adopcion.adop_id ? updatedAdopcion : item
        )
      );
      setMostrarConfirmacionModal(false); // Cerrar el modal de confirmación
    } catch (err) {
      console.error("Error al cambiar el estado de la adopción:", err);
      setError("Error al cambiar el estado de la adopción.");
      setMostrarConfirmacionModal(false); // Cerrar el modal de confirmación
    }
  };

  // Función para mostrar el estado como texto
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
              <td className="px-4 py-2 border">{obtenerEstadoTexto(adopcion.adop_estado)}</td>
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
                {adopcion.adop_estado === 0 && (
                  <>
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded ml-2"
                      onClick={() => solicitarCambioEstado(adopcion, 1)} // Cambia a "Aceptada"
                    >
                      Aceptar
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                      onClick={() => solicitarCambioEstado(adopcion, 2)} // Cambia a "Rechazada"
                    >
                      Rechazar
                    </button>
                  </>
                )}
                {adopcion.adop_estado === 1 && (
                  <>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                      onClick={() => solicitarCambioEstado(adopcion, 2)} // Cambia a "Rechazada"
                    >
                      Rechazar
                    </button>
                  </>
                )}
                {adopcion.adop_estado === 2 && (
                  <>
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded ml-2"
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
