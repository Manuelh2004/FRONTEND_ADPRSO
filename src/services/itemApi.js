import axios from 'axios';

const API_URL = 'http://localhost:8080/admin/api/item'; // Cambia según tu backend

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const itemService = {
  listarEstadoSalud: () => axios.get(`${API_URL}/estado_salud`, getAuthHeaders()),
  listarEstadoVacuna: () => axios.get(`${API_URL}/estado_vacuna`, getAuthHeaders()),
  listarGustos: () => axios.get(`${API_URL}/gustos`, getAuthHeaders()),
  listarNivelEnergia: () => axios.get(`${API_URL}/nivel_energia`, getAuthHeaders()),
  listarTamanios: () => axios.get(`${API_URL}/tamanios`, getAuthHeaders()),
  listarTipoUsuario: () => axios.get(`${API_URL}/tipo_usuario`, getAuthHeaders()),
  listarTipoMascota: () => axios.get(`${API_URL}/tipo_mascota`, getAuthHeaders()),
  listarSexo: () => axios.get(`${API_URL}/sexo`, getAuthHeaders()),
};

export default itemService;
