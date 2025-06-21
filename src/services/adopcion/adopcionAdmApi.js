import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/admin/api/adopciones"; 

const getHeaders = () => {
  const token = localStorage.getItem('token');
  console.log("🔐 Token desde localStorage:", token);
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

// 1. Listar todas las adopciones
export const obtenerAdopciones = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/listar_adopciones`, {
      headers: getHeaders(),
    });
    return response.data.data;  // Ajusta según la estructura de tu respuesta
  } catch (error) {
    console.error("Error al obtener adopciones:", error.response || error.message);
    throw error;
  }
};

// 2. Listar adopciones aceptadas
export const obtenerAdopcionesAceptadas = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/aceptadas`, {
      headers: getHeaders(),
    });
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener adopciones aceptadas:", error.response || error.message);
    throw error;
  }
};

// 3. Listar adopciones pendientes
export const obtenerAdopcionesPendientes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pendientes`, {
      headers: getHeaders(),
    });
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener adopciones pendientes:", error.response || error.message);
    throw error;
  }
};

// 4. Listar adopciones rechazadas
export const obtenerAdopcionesRechazadas = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rechazadas`, {
      headers: getHeaders(),
    });
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener adopciones rechazadas:", error.response || error.message);
    throw error;
  }
};

// 5. Obtener adopción por ID
export const obtenerAdopcionPorId = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`, {
      headers: getHeaders(),
    });
    return response.data.data;  // Ajusta según la estructura de tu respuesta
  } catch (error) {
    console.error("Error al obtener adopción por ID:", error.response || error.message);
    throw error;
  }
};

// 6. Cambiar estado de la adopción
export const cambiarEstadoAdopcion = async (id, nuevoEstado) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}/estado?nuevoEstado=${nuevoEstado}`, {
      headers: getHeaders(),
    });
    return response.data.data;  // Ajusta según la estructura de tu respuesta
  } catch (error) {
    console.error("Error al cambiar estado de la adopción:", error.response || error.message);
    throw error;
  }
};
