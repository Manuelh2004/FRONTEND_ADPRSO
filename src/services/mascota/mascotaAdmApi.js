import axios from 'axios';

const API_URL = 'http://localhost:8080/admin/api/mascota';  // Asegúrate de tener la URL correcta

// Función para obtener todas las mascotas
export const listarMascotas = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/listar_mascota`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al listar mascotas:', error);
    throw error;
  }
};

// Función para registrar una nueva mascota
export const registrarMascota = async (token, mascotaData) => {
  try {
    const response = await axios.post(`${API_URL}/registrar_mascota`, mascotaData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al registrar mascota:', error);
    throw error;
  }
};

// Función para actualizar los datos de una mascota
export const actualizarMascota = async (token, id, mascotaData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, mascotaData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar mascota:', error);
    throw error;
  }
};

// Función para cambiar el estado de una mascota
export const cambiarEstadoMascota = async (token, id, nuevoEstado) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/estado`, null, {
      params: { nuevoEstado },
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al cambiar estado de la mascota:', error);
    throw error;
  }
};
