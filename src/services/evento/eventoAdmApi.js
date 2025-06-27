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
  const formData = new FormData();
  formData.append("evento", new Blob([JSON.stringify({
    even_nombre: eventoData.nombre,
    even_descripcion: eventoData.descripcion,
    even_fecha_inicio: eventoData.fecha_inicio,
    even_fecha_fin: eventoData.fecha_fin,
    even_lugar: eventoData.lugar
  })], { type: "application/json" }));

  formData.append("imagen", eventoData.imagen);

  try {
    const response = await axios.post(`${API_URL}/registrar-evento-imagen`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error registrando evento con imagen", error);
    throw error;
  }
};

export const actualizarEvento = async (token, id, eventoData) => {
  const formData = new FormData();
  formData.append("evento", new Blob([JSON.stringify({
    even_nombre: eventoData.nombre,
    even_descripcion: eventoData.descripcion,
    even_fecha_inicio: eventoData.fecha_inicio,
    even_fecha_fin: eventoData.fecha_fin,
    even_lugar: eventoData.lugar
  })], { type: "application/json" }));

  if (eventoData.imagen && eventoData.imagen instanceof File) {
    formData.append("imagen", eventoData.imagen);
  }

  try {
    const response = await axios.put(`${API_URL}/${id}/actualizar-evento`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error actualizando evento con imagen", error);
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

export const obtenerEventosPorEstado = async (estadoFiltro, token) => {
  const headers = { 'Authorization': `Bearer ${token}` };
  let url = `${API_URL}/listar_evento`;  // URL predeterminada

  if (estadoFiltro === 'activo') {
    url = `${API_URL}/activos`;
  } else if (estadoFiltro === 'inactivo') {
    url = `${API_URL}/inactivos`;  
  }

  try {
    const response = await axios.get(url, { headers });
    return response.data.data;
  } catch (error) {
    throw new Error('Error al cargar los eventos');
  }
};

// Función para buscar eventos por nombre
export const buscarEventosPorNombre = async (token, nombre) => {
  try {
    const response = await axios.get(`${API_URL}/buscar`, {
      params: { nombre: nombre }, // Pasa el nombre como parámetro
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data; // Devuelve la respuesta de la API
  } catch (error) {
    console.error('Error buscando eventos por nombre', error);
    throw error;
  }
};

export const obtenerUsuariosPorEvento = async (token, eventoId) => {
  try {
    const response = await axios.get(`${API_URL}/${eventoId}/usuarios`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios por evento', error);
    throw error;
  }
};

export const descargarReporteFiltrado = async (token, idsEvento) => {
  const response = await fetch('http://localhost:8080/admin/api/evento/reporte-inscripciones', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(idsEvento),
  });

  if (!response.ok) throw new Error('Error al descargar');

  return await response.blob();
};