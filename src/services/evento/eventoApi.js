// src/services/eventoApi.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const fetchMisEventos = (token) => {
  return axios.get(`${API_URL}/evento/mis-eventos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const getEventosActivos = () =>
  axios.get(`${API_URL}/evento/activos/public`);