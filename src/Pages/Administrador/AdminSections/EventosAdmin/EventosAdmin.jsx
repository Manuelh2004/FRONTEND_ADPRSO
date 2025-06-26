import { useEffect, useState } from 'react';
import { fetchEventos, registrarEvento, actualizarEvento, cambiarEstadoEvento, obtenerEventosPorEstado, buscarEventosPorNombre } from '../../../../services/evento/eventoAdmApi';
import FormularioEvento from './FormularioEvento';
import FiltroEstado from './FiltroEstado';
import TablaEvento from './TablaEvento';  
import ModalEvento from './ModalEvento';

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

  const handleCancelar = () => {
    setFormData({ nombre: '', descripcion: '', fecha_inicio: '', fecha_fin: '', lugar: '', imagen: '' });
    setEditandoId(null);
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
    <h2 className="text-3xl font-bold mb-6 text-center">Gestión de Eventos</h2>
      {/* Formulario */}
      <FormularioEvento
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        editandoId={editandoId}
        handleCancel={handleCancelar} 
      />

      {/* Filtro por estado y búsqueda */}
      <FiltroEstado 
        filtroEstado={filtroEstado} 
        setFiltroEstado={setFiltroEstado} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
      />

      {/* Tabla de eventos */}
      <TablaEvento 
        eventosPaginados={eventosPaginados}
        handleEditar={handleEditar}
        handleCambiarEstado={handleCambiarEstado}
        handleVerMas={handleVerMas}
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

      {/* Mostrar el modal si se ha seleccionado un evento */}
      {eventoSeleccionado && (
        <ModalEvento 
          eventoSeleccionado={eventoSeleccionado} 
          setEventoSeleccionado={setEventoSeleccionado} 
        />
      )}
    </div>
  );
};

export default EventosAdmin;
