import axios from 'axios';

const API_URL = 'http://localhost:8080/admin/api/item';

const getData = async (endpoint, token) => {
  try {
    const response = await axios.get(`${API_URL}/${endpoint}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data.data;
  } catch (error) {
    console.error(`Error al obtener datos de ${endpoint}:`, error);
    throw error; // Re-lanzamos el error para manejarlo en el componente
  }
};

export default {
  getData
};
