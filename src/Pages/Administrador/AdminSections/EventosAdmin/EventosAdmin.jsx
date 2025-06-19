import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventosAdmin = () => {
  const [eventos, setEventos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: '',
    lugar: '',
    imagen: ''
  });

  const [editandoId, setEditandoId] = useState(null);

  // 1. Cargar eventos al iniciar
  useEffect(() => {
    fetchEventos();
  }, []);

  const fetchEventos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/admin/api/evento/listar_evento', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setEventos(response.data.data);
    } catch (error) {
      console.error('Error al listar eventos', error);
    }
  };

  const registrarEvento = async (eventoData) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://localhost:8080/admin/api/evento/registrar_evento',
        {
          even_nombre: eventoData.nombre,
          even_descripcion: eventoData.descripcion,
          even_fecha_inicio: eventoData.fecha_inicio,
          even_fecha_fin: eventoData.fecha_fin,
          even_lugar: eventoData.lugar,
          even_imagen: eventoData.imagen
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error registrando evento', error);
      throw error;
    }
  };

  const actualizarEvento = async (id, eventoData) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        `http://localhost:8080/admin/api/evento/${id}`,
        {
          even_nombre: eventoData.nombre,
          even_descripcion: eventoData.descripcion,
          even_fecha_inicio: eventoData.fecha_inicio,
          even_fecha_fin: eventoData.fecha_fin,
          even_lugar: eventoData.lugar,
          even_imagen: eventoData.imagen
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error actualizando evento', error);
      throw error;
    }
  };

  const cambiarEstadoEvento = async (id, nuevoEstado) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:8080/admin/api/evento/${id}/estado?nuevoEstado=${nuevoEstado}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    } catch (error) {
      console.error('Error cambiando estado', error);
      throw error;
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await actualizarEvento(editandoId, formData);
      } else {
        await registrarEvento(formData);
      }
      setFormData({ nombre: '', descripcion: '', fecha_inicio: '', fecha_fin: '', lugar: '', imagen: '' });
      setEditandoId(null);
      fetchEventos();
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
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Gestión de Eventos</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Nombre del Evento</label>
          <input
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-medium">Fecha de Inicio</label>
            <input
              type="date"
              name="fecha_inicio"
              value={formData.fecha_inicio}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Fecha de Fin</label>
            <input
              type="date"
              name="fecha_fin"
              value={formData.fecha_fin}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Lugar</label>
          <input
            name="lugar"
            value={formData.lugar}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">URL de la Imagen</label>
          <input
            name="imagen"
            value={formData.imagen}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {editandoId ? 'Actualizar' : 'Registrar'} Evento
        </button>
      </form>

      {/* Tabla de eventos */}
      <div className="mt-8 overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full table-auto">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-4 text-left">Nombre</th>
              <th className="p-4 text-left">Descripción</th>
              <th className="p-4 text-left">Fecha</th>
              <th className="p-4 text-left">Estado</th>
              <th className="p-4 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map(evento => (
              <tr key={evento.even_id} className="border-t hover:bg-gray-100">
                <td className="p-4">{evento.even_nombre}</td>
                <td className="p-4">{evento.even_descripcion}</td>
                <td className="p-4">{evento.even_fecha_inicio}</td>
                <td className="p-4">
                  <span className={`inline-block py-1 px-3 rounded-full ${evento.even_estado === 1 ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {evento.even_estado === 1 ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="p-4 space-x-2">
                  <button
                    onClick={() => handleEditar(evento)}
                    className="text-blue-600 hover:underline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleCambiarEstado(evento.even_id, evento.even_estado)}
                    className="text-red-600 hover:underline"
                  >
                    Cambiar estado
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventosAdmin;
