import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/admin/api/mascota";

// 🔐 Función para obtener headers con token
const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

// 📥 1. Listar mascotas
export const listarMascotas = async () => {
  const response = await axios.get(`${API_BASE_URL}/listar_mascota`, {
    headers: getHeaders()
  });
  return response.data.data; // o como esté estructurada tu respuesta
};

// 🐾 2. Registrar mascota (DTO: mascota + gustos + imágenes)
export const registrarMascota = async (mascotaDTO) => {
  const token = localStorage.getItem('token');

  return await axios.post(`${API_BASE_URL}/registrar_mascota`, mascotaDTO, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // 👈 Esto es lo más importante
    },
  });
};

// ✏️ 3. Actualizar mascota (por ID)
export const actualizarMascota = async (id, mascota, gustosIds = [], imagenUrls = []) => {
  const params = new URLSearchParams();
  gustosIds.forEach(id => params.append("nuevosGustosIds", id));
  imagenUrls.forEach(url => params.append("nuevasImagenUrls", url));

  const response = await axios.put(`${API_BASE_URL}/${id}?${params.toString()}`, mascota, {
    headers: getHeaders()
  });
  return response.data.data;
};

// 🔄 4. Cambiar estado (activo/inactivo)
export const cambiarEstadoMascota = async (id, nuevoEstado) => {
  const response = await axios.put(`${API_BASE_URL}/${id}/estado?nuevoEstado=${nuevoEstado}`, null, {
    headers: getHeaders()
  });
  return response.data.data;
};
