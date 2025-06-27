import axios from 'axios';

const API_URL = 'http://localhost:8080/admin/api/mascota';  // Asegúrate de tener la URL correcta


export const fetchMascotas = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/listar_mascota`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error al listar mascotas', error);
    throw error;
  }
};

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
export const registrarMascota = async (token, formData) => {
  try {
    const response = await axios.post(`${API_URL}/registrar_mascota`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al registrar mascota:', error);
    throw error;
  }
};

// Función para actualizar los datos de una mascota
export const actualizarMascota = async (token, id, formData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar mascota:', error);
    throw error;
  }
};

export const cambiarEstadoMascota = async (token, id, nuevoEstado) => {
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


// Función para buscar mascotas por nombre
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

export const obtenerMascotasPorEstado = async (estadoFiltro, token) => {
  const headers = { 'Authorization': `Bearer ${token}` };
  let url = `${API_URL}/listar_mascota`;  // URL predeterminada

  if (estadoFiltro === 'activo') {
    url = `${API_URL}/activos`;
  } else if (estadoFiltro === 'inactivo') {
    url = `${API_URL}/inactivos`;  
  }

  try {
    const response = await axios.get(url, { headers });
    return response.data.data;
  } catch (error) {
    throw new Error('Error al cargar las mascotas');
  }
};
