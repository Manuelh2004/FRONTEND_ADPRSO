import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventoFormulario from './EventoFormulario'; // o sin la extensión
import EventoTabla from './EventoTabla.jsx';

import {
  listarEventos,
  registrarEvento,
  actualizarEvento,
  cambiarEstadoEvento
} from '../../../../services/evento/eventoAdmApi.js'; // ajusta el path según tu estructura


const EventosAdmin = () => {
  const [eventos, setEventos] = useState([]);
  const [formData, setFormData] = useState({ nombre: '', descripcion: '', fecha_inicio: '', fecha_fin: '', lugar: '', imagen: '' });
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => { 
      console.log("Componente EventosAdmin montado");
    fetchEventos(); 
  
  }, []);

  const fetchEventos = async () => {
    try {
      const data = await listarEventos();
      setEventos(data); // <- ya recibes `data` directo gracias al return en el service
    } catch (error) {
      console.error('Error al listar eventos', error);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (editandoId) await actualizarEvento(editandoId, formData);
    else await registrarEvento(formData);

    setFormData({ nombre: '', descripcion: '', fecha_inicio: '', fecha_fin: '', lugar: '', imagen: '' });
    setEditandoId(null);

    // Espera a que se actualice antes de traer los nuevos eventos
    await fetchEventos();
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
    try {
      await cambiarEstadoEvento(id, nuevoEstado);
      fetchEventos();
    } catch (error) {
      console.error('Error al cambiar estado', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gestión de Eventos</h2>
      <EventoFormulario formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} editandoId={editandoId} />
      <EventoTabla
      eventos={eventos}
      handleEditar={handleEditar}
      handleCambiarEstado={handleCambiarEstado}
      />

    </div>
  );
};

export default EventosAdmin;
