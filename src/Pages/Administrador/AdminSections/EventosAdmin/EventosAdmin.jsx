import { useEffect, useState } from 'react';
import { fetchEventos, registrarEvento, actualizarEvento, cambiarEstadoEvento, obtenerEventosPorEstado, buscarEventosPorNombre } from '../../../../services/evento/eventoAdmApi';
import FormularioEvento from './FormularioEvento';
import FiltroEstado from './FiltroEstado';
import TablaEvento from './TablaEvento';  

const EventosAdmin = () => {
  const [eventos, setEventos] = useState([]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
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
  const [filtroEstado, setFiltroEstado] = useState("");
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const obtenerEventos = async () => {
      try {
        const eventosFiltrados = await obtenerEventosPorEstado(filtroEstado, token);
        setEventos(eventosFiltrados);
      } catch (error) {
        console.error('Error al obtener eventos filtrados', error);
      }
    };

    obtenerEventos(); 
  }, [filtroEstado]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const obtenerEventosPorNombre = async () => {
      if (searchTerm) {
        try {
          const eventosPorNombre = await buscarEventosPorNombre(token, searchTerm);
          setEventos(eventosPorNombre.data); 
        } catch (error) {
          console.error('Error al buscar eventos por nombre', error);
        }
      } else {
        const eventosFiltrados = await obtenerEventosPorEstado(filtroEstado, token);
        setEventos(eventosFiltrados);
      }
    };

    obtenerEventosPorNombre(); 
  }, [searchTerm, filtroEstado]);  

  // Paginación de eventos
  const eventosPaginados = Array.isArray(eventos) && eventos ? eventos.slice(
    (paginaActual - 1) * registrosPorPagina,
    paginaActual * registrosPorPagina
  ) : []; 
  const totalPaginas = Math.ceil((Array.isArray(eventos) ? eventos.length : 0) / registrosPorPagina);

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
      await cambiarEstadoEvento(token, id, nuevoEstado);
      const eventosFiltrados = await obtenerEventosPorEstado(filtroEstado, token);
      setEventos(eventosFiltrados);
    } catch (error) {
      console.error('Error al cambiar estado', error);
    }
  };

  const handleVerMas = async (evento) => {
    try {
      if (!evento || !evento.even_id) {
        console.error('ID de evento no válido:', evento);
        return;
      }
      const url = `http://localhost:8080/api/evento/${evento.even_id}/public`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error al obtener los detalles del evento');
      }

      const result = await response.json();
      const eventoDetails = result.data;

      if (!eventoDetails) {
        console.error('Detalles del evento no encontrados');
        return;
      }

      setEventoSeleccionado(eventoDetails);
      console.log('Detalles del evento:', eventoDetails); 
    } catch (error) {
      console.error('Error al obtener los detalles del evento:', error);
      alert('Hubo un error al cargar los detalles del evento.');
    }
  };

  return (
  <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
    <h2 className="text-4xl font-semibold text-gray-800 mb-8">Gestión de Eventos</h2>

    {/* Formulario */}
    <FormularioEvento
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      editandoId={editandoId}
    />

    {/* Filtro por estado y búsqueda */}
    <div className="flex justify-between mb-6">
      <div className="w-1/2 pr-2"> {/* Ajustar espacio de la derecha */}
        <FiltroEstado filtroEstado={filtroEstado} setFiltroEstado={setFiltroEstado} />
      </div>
      <div className="w-1/2 pl-2"> {/* Ajustar espacio de la izquierda */}
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    {/* Tabla de eventos */}
    <TablaEvento 
      eventosPaginados={eventosPaginados}
      handleEditar={handleEditar}
      handleCambiarEstado={handleCambiarEstado}
      handleVerMas={handleVerMas}
    />

    {/* Paginación */}
    <div className="flex justify-between items-center mt-6">
      <button onClick={() => handleCambiarPagina(paginaActual - 1)} disabled={paginaActual === 1} className="bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50">
        Anterior
      </button>
      <span className="text-gray-700">
        Página {paginaActual} de {totalPaginas}
      </span>
      <button onClick={() => handleCambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas} className="bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50">
        Siguiente
      </button>
    </div>

    {/* Modal para mostrar los detalles del evento */}
    {eventoSeleccionado && (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full overflow-y-auto max-h-[80vh]">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Detalles del Evento</h3>

          {/* Mostrar los detalles del evento */}
          <p><strong className="text-gray-600">Nombre:</strong> {eventoSeleccionado.even_nombre}</p>
          <p><strong className="text-gray-600">Lugar:</strong> {eventoSeleccionado.even_lugar}</p>
          <p><strong className="text-gray-600">Fecha de Inicio:</strong> {eventoSeleccionado.even_fecha_inicio}</p>
          <p><strong className="text-gray-600">Fecha de Fin:</strong> {eventoSeleccionado.even_fecha_fin}</p>
          <p><strong className="text-gray-600">Descripción:</strong></p>
          <div className="text-gray-700 whitespace-pre-line">{eventoSeleccionado.even_descripcion}</div>

          <p><strong className="text-gray-600">Estado:</strong> {eventoSeleccionado.even_estado === 1 ? 'Activo' : 'Inactivo'}</p>

          {/* Botón para cerrar el modal */}
          <div className="mt-4">
            <button 
              onClick={() => setEventoSeleccionado(null)} 
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);

};

export default EventosAdmin;
