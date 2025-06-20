import React, { useEffect, useState } from 'react';
import { fetchEventos, registrarEvento, actualizarEvento, cambiarEstadoEvento } from '../../../../services/evento/eventoAdmApi';

const EventosAdmin = () => {
  const [eventos, setEventos] = useState([]);  // Inicializamos como un arreglo vacío
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);  // Nuevo estado para los detalles del evento
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: '',
    lugar: '',
    imagen: ''
  });

  const [editandoId, setEditandoId] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [registrosPorPagina] = useState(10);
  const [filtroEstado, setFiltroEstado] = useState(""); // Usar "" en lugar de null

  useEffect(() => {
    const token = localStorage.getItem('token');
    const url = filtroEstado === ""
      ? 'http://localhost:8080/admin/api/evento/listar_evento'
      : `http://localhost:8080/admin/api/evento/estado/${filtroEstado}`;

    fetchEventosConFiltro(url, token);
  }, [filtroEstado]);

  const fetchEventosConFiltro = async (url, token) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setEventos(data.data || []); // Asegúrate de que siempre sea un arreglo
    } catch (error) {
      console.error('Error al obtener eventos', error);
    }
  };

  // Asegúrate de que `eventos` es un arreglo antes de intentar usar slice()
  const eventosPaginados = Array.isArray(eventos) ? eventos.slice(
    (paginaActual - 1) * registrosPorPagina,
    paginaActual * registrosPorPagina
  ) : [];

  const totalPaginas = Math.ceil(eventos.length / registrosPorPagina);

  const handleCambiarPagina = (pagina) => {
    if (pagina >= 1 && pagina <= totalPaginas) {
      setPaginaActual(pagina);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      if (editandoId) {
        await actualizarEvento(token, editandoId, formData);
      } else {
        await registrarEvento(token, formData);
      }
      setFormData({ nombre: '', descripcion: '', fecha_inicio: '', fecha_fin: '', lugar: '', imagen: '' });
      setEditandoId(null);
      const data = await fetchEventos(token);
      setEventos(data);
    } catch (error) {
      console.error('Error al guardar evento', error);
    }
  };

  const handleEditar = (evento) => {
    setEditandoId(evento.even_id);
    setFormData({
      nombre: evento.even_nombre || '',
      descripcion: evento.even_descripcion || '',
      fecha_inicio: evento.even_fecha_inicio || '',
      fecha_fin: evento.even_fecha_fin || '',
      lugar: evento.even_lugar || '',
      imagen: evento.even_imagen || ''
    });
  };

  const handleCambiarEstado = async (id, estadoActual) => {
    const nuevoEstado = estadoActual === 1 ? 0 : 1;
    const token = localStorage.getItem('token');
    try {
      // Cambiar el estado del evento
      await cambiarEstadoEvento(token, id, nuevoEstado);

      // Recargar los eventos con el filtro actual después de cambiar el estado
      const url = filtroEstado === "" 
        ? 'http://localhost:8080/admin/api/evento/listar_evento'
        : `http://localhost:8080/admin/api/evento/estado/${filtroEstado}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setEventos(data.data || []); // Actualizamos la lista de eventos
    } catch (error) {
      console.error('Error al cambiar estado', error);
    }
  };

  const handleVerMas = async (evento) => {
    try {
      const response = await fetch(`http://localhost:8080/api/evento/${evento.even_id}/public`);
      
      if (!response.ok) {
        throw new Error('Error al obtener los detalles del evento');
      }
      const result = await response.json();
      const eventoDetails = result.data; 
      setEventoSeleccionado(eventoDetails);  
    } catch (error) {
      console.error('Error al obtener los detalles del evento:', error);
      alert('Hubo un error al cargar los detalles del evento.');
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-semibold text-gray-800 mb-8">Gestión de Eventos</h2>

      {/* Filtro por estado */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold">Filtrar por Estado</label>
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todos</option> {/* Cambié null por "" */}
          <option value={1}>Activo</option>
          <option value={0}>Inactivo</option>
        </select>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
        <h3 className="text-xl font-medium text-gray-700">{editandoId ? 'Editar Evento' : 'Registrar Nuevo Evento'}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold">Nombre del Evento</label>
            <input
              name="nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Fecha de Inicio</label>
            <input
              type="date"
              name="fecha_inicio"
              value={formData.fecha_inicio}
              onChange={(e) => setFormData({ ...formData, fecha_inicio: e.target.value })}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Fecha de Fin</label>
            <input
              type="date"
              name="fecha_fin"
              value={formData.fecha_fin}
              onChange={(e) => setFormData({ ...formData, fecha_fin: e.target.value })}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold">Lugar</label>
            <input
              name="lugar"
              value={formData.lugar}
              onChange={(e) => setFormData({ ...formData, lugar: e.target.value })}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">URL de la Imagen</label>
            <input
              name="imagen"
              value={formData.imagen}
              onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {editandoId ? 'Actualizar' : 'Registrar'} Evento
        </button>
      </form>

      {/* Tabla de eventos */}
      <div className="mt-10 overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="w-full table-auto text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-4 text-center">Nombre</th>
              <th className="px-6 py-4 text-center">Lugar</th>
              <th className="px-6 py-4 text-center">Fecha</th>
              <th className="px-6 py-4 text-center">Estado</th>
              <th className="px-6 py-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {eventosPaginados.map(evento => (
              <tr key={evento.even_id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{evento.even_nombre}</td>
                <td className="px-6 py-4">{evento.even_lugar}</td>
                <td className="px-6 py-4">{evento.even_fecha_inicio}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block py-1 px-3 rounded-full ${evento.even_estado === 1 ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`} />
                  {evento.even_estado === 1 ? 'Activo' : 'Inactivo'}
                </td>
                <td className="px-6 py-4 space-x-4">
                  <button
                    onClick={() => handleEditar(evento)}
                    className="bg-amber-400 text-white px-4 py-2 rounded-lg hover:bg-amber-500 transition duration-300"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleCambiarEstado(evento.even_id, evento.even_estado)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    Cambiar estado
                  </button>
                  <button
                    onClick={() => handleVerMas(evento)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
                  >
                    Ver más
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => handleCambiarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-gray-700">
          Página {paginaActual} de {totalPaginas}
        </span>
        <button
          onClick={() => handleCambiarPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>

      {/* Modal para mostrar los detalles del evento */}
      {eventoSeleccionado && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-2xl font-semibold mb-4">Detalles del Evento</h3>
            <p><strong>Nombre:</strong> {eventoSeleccionado.even_nombre}</p>
            <p><strong>Lugar:</strong> {eventoSeleccionado.even_lugar}</p>
            <p><strong>Fecha de Inicio:</strong> {eventoSeleccionado.even_fecha_inicio}</p>
            <p><strong>Descripción:</strong> {eventoSeleccionado.even_descripcion}</p>
            <p><strong>Estado:</strong> {eventoSeleccionado.even_estado === 1 ? 'Activo' : 'Inactivo'}</p>
            <button onClick={() => setEventoSeleccionado(null)} className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventosAdmin;
