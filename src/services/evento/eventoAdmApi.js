import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/admin/api/evento"; 

const getHeaders = () => {
  const token = localStorage.getItem('token');
  console.log("🔐 Token desde localStorage:", token);
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

// 1. Listar eventos
export const listarEventos = async () => {
  const response = await axios.get(`${API_BASE_URL}/listar_evento`, {
    headers: getHeaders(), // ✅ agrega esto
  });
  return response.data.data;
};

// 2. Registrar evento
export const registrarEvento = async (eventoData) => {
  const token = localStorage.getItem('token'); // Obtén el token
  try {
    const response = await axios.post(API_BASE_URL, eventoData, {
      headers: {
        Authorization: `Bearer ${token}`, // Agrega el token en la cabecera
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al registrar evento:', error);
    throw error;
  }
};

// 3. Actualizar evento
export const actualizarEvento = (id, evento) => {
    return axios.put(`${API_BASE_URL}/${id}`, evento, { headers: getHeaders() });
};

// 4. Cambiar estado del evento
export const cambiarEstadoEvento = (id, nuevoEstado) => {
    return axios.put(`${API_BASE_URL}/${id}/estado?nuevoEstado=${nuevoEstado}`, null, { headers: getHeaders() });
};