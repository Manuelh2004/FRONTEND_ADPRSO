// src/api/mascotaApi.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const getSexos = () => axios.get(`${API_URL}/item/sexo/public`);
export const getTamanios = () => axios.get(`${API_URL}/item/tamanios/public`);
export const getNivelesEnergia = () => axios.get(`${API_URL}/item/nivel_energia/public`);
export const getTiposMascota = () => axios.get(`${API_URL}/item/tipo_mascota/public`);
export const getEstadosSalud = () => axios.get(`${API_URL}/item/estado_salud/public`);
export const getEstadosVacuna = () => axios.get(`${API_URL}/item/estado_vacuna/public`);
export const getGustos = () => axios.get(`${API_URL}/item/gustos/public`);
export const getMascotasFiltradas = (filtros) =>
  axios.get(`${API_URL}/mascota/filter/public`, { params: filtros });

export const getMascotaDetalle = (id) =>
  axios.get(`http://localhost:8080/api/mascota/${id}/public`);

export const registrarMascota = (data, token) =>
  axios.post(`http://localhost:8080/admin/api/mascota/registrar`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

