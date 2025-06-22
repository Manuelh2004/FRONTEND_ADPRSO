import axios from 'axios';

const API_URL = 'http://localhost:8080/admin/api/mascota';  // Asegúrate de tener la URL correcta

// Función para obtener todas las mascotas
export const listarMascotas = async (token) => {
  // Verificar si el token existe
  if (!token) {
    throw new Error('Token de autenticación es necesario');
  }

  try {
    // Realizar la solicitud con el token en los encabezados
    const response = await axios.get(`${API_URL}/listar_mascota`, {
      headers: {
        'Authorization': `Bearer ${token}`,  // Asegúrate de que el token esté en el encabezado Authorization
      }
    });

    return response.data;  // Retornar los datos obtenidos de la API
  } catch (error) {
    // Manejo de errores
    if (error.response && error.response.status === 401) {
      throw new Error('No autorizado. El token podría estar expirado o no ser válido.');
    } else {
      console.error('Error al listar mascotas:', error);
      throw new Error('Error al listar mascotas.');
    }
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
