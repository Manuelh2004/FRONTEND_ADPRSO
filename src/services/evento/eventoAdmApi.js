// eventosService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/admin/api/evento';

export const fetchEventos = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/listar_evento`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error al listar eventos', error);
    throw error;
  }
};

export const registrarEvento = async (token, eventoData) => {
  try {
    const response = await axios.post(
      `${API_URL}/registrar_evento`,
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

export const actualizarEvento = async (token, id, eventoData) => {
  try {
    const response = await axios.put(
      `${API_URL}/${id}`,
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

export const cambiarEstadoEvento = async (token, id, nuevoEstado) => {
  try {
    await axios.put(
      `${API_URL}/${id}/estado?nuevoEstado=${nuevoEstado}`,
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
