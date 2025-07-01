import axios from 'axios';

const API_URL = 'http://localhost:8080/admin/api/adopciones';

// Obtener las adopciones filtradas por estado
export const obtenerAdopcionesPorEstado = async (estadoFiltro, token) => {
  const headers = { 'Authorization': `Bearer ${token}` };
  let url = `${API_URL}/listar_adopciones`;

  if (estadoFiltro === 'aceptadas') {
    url = `${API_URL}/aceptadas`;
  } else if (estadoFiltro === 'pendientes') {
    url = `${API_URL}/pendientes`;
  } else if (estadoFiltro === 'rechazadas') {
    url = `${API_URL}/rechazadas`;
  }

  try {
    const response = await axios.get(url, { headers });
    return response.data.data;
  } catch (error) {
    throw new Error('Error al cargar las adopciones');
  }
};

// Cambiar el estado de una adopción
export const cambiarEstadoAdopcion = async (adop_id, nuevoEstado, token) => {
  const headers = { 'Authorization': `Bearer ${token}` };
  try {
    const response = await axios.put(
      `${API_URL}/${adop_id}/estado?nuevoEstado=${nuevoEstado}`,
      {},
      { headers }
    );
    return response.data.data;
  } catch (error) {
    throw new Error('Error al cambiar el estado de la adopción');
  }
};

// Buscar mascotas por nombre
export const buscarMascotasPorNombre = async (token, nombre) => {
  try {
    const response = await axios.get(`${API_URL}/buscar`, {
      params: { nombre },
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al buscar mascota:', error);
    throw new Error(error.response ? error.response.data.message : 'Error al buscar mascota.');
  }
};