// src/services/adopcionApi.js
import axios from 'axios';

export const fetchMisAdopciones = (token) => {
  return axios.get('http://localhost:8080/api/adopcion/mis-adopciones', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};