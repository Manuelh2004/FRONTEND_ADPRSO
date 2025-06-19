import React, { useEffect, useState } from 'react';
import itemService from '../../../../services/itemApi';
import { registrarMascota } from '../../../../services/mascota/mascotaAdmApi';
import axios from 'axios';


const MascotasAdmin = () => {
  const [estadoSalud, setEstadoSalud] = useState([]);
  const [estadoVacuna, setEstadoVacuna] = useState([]);
  const [nivelEnergia, setNivelEnergia] = useState([]);
  const [tamanios, setTamanios] = useState([]);
  const [tipoMascota, setTipoMascota] = useState([]);
  const [sexos, setSexos] = useState([]);
  const [gustos, setGustos] = useState([]);

  const [imagenes, setImagenes] = useState(['']);
  const [gustosSeleccionados, setGustosSeleccionados] = useState([]);

  const [formData, setFormData] = useState({
    masc_nombre: '',
    masc_fecha_nacimiento: '',
    masc_historia: '',
    masc_observacion: '',
    estadoSalud: '',
    estadoVacuna: '',
    nivelEnergia: '',
    tamanio: '',
    tipoMascota: '',
    sexo: ''
  });

  useEffect(() => {
    itemService.listarEstadoSalud().then(res => setEstadoSalud(res.data.data));
    itemService.listarEstadoVacuna().then(res => setEstadoVacuna(res.data.data));
    itemService.listarNivelEnergia().then(res => setNivelEnergia(res.data.data));
    itemService.listarTamanios().then(res => setTamanios(res.data.data));
    itemService.listarTipoMascota().then(res => setTipoMascota(res.data.data));
    itemService.listarSexo().then(res => setSexos(res.data.data));
    itemService.listarGustos().then(res => setGustos(res.data.data));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (index, value) => {
    const newImagenes = [...imagenes];
    newImagenes[index] = value;
    setImagenes(newImagenes);
  };

  const agregarCampoImagen = () => {
    setImagenes([...imagenes, '']);
  };

  const handleGustoChange = (id) => {
    setGustosSeleccionados(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  const mascotaDTO = {
    mascota: formData,
    gustosIds: gustosSeleccionados,
    imagenUrls: imagenes
  };

  const token = localStorage.getItem('token');
  console.log("Token:", token);

  try {
    const response = await fetch('http://localhost:8080/admin/api/mascota/registrar', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mascotaDTO),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Mascota registrada con éxito:", data);
  } catch (error) {
    console.error("Error al registrar mascota:", error);
  }
};




  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Registrar Mascota</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div>
          <label className="block font-medium text-gray-700">Nombre:</label>
          <input
            type="text"
            name="masc_nombre"
            value={formData.masc_nombre}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Fecha de nacimiento:</label>
          <input
            type="date"
            name="masc_fecha_nacimiento"
            value={formData.masc_fecha_nacimiento}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium text-gray-700">Historia:</label>
          <textarea
            name="masc_historia"
            value={formData.masc_historia}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          ></textarea>
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium text-gray-700">Observación:</label>
          <textarea
            name="masc_observacion"
            value={formData.masc_observacion}
            onChange={handleChange}
            rows="2"
            className="w-full border border-gray-300 rounded px-3 py-2"
          ></textarea>
        </div>

        {/* Selects */}
        <div>
          <label className="block font-medium text-gray-700">Estado de Salud:</label>
          <select name="estadoSalud" value={formData.estadoSalud} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2">
            <option value="">-- Selecciona --</option>
            {estadoSalud.map(e => (
              <option key={e.estsa_id} value={e.estsa_id}>{e.estsa_nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Estado de Vacuna:</label>
          <select name="estadoVacuna" value={formData.estadoVacuna} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2">
            <option value="">-- Selecciona --</option>
            {estadoVacuna.map(e => (
              <option key={e.estva_id} value={e.estva_id}>{e.estva_nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Nivel de Energía:</label>
          <select name="nivelEnergia" value={formData.nivelEnergia} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2">
            <option value="">-- Selecciona --</option>
            {nivelEnergia.map(e => (
              <option key={e.nien_id} value={e.nien_id}>{e.nien_nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Tamaño:</label>
          <select name="tamanio" value={formData.tamanio} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2">
            <option value="">-- Selecciona --</option>
            {tamanios.map(e => (
              <option key={e.tam_id} value={e.tam_id}>{e.tam_nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Tipo de Mascota:</label>
          <select name="tipoMascota" value={formData.tipoMascota} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2">
            <option value="">-- Selecciona --</option>
            {tipoMascota.map(e => (
              <option key={e.tipma_id} value={e.tipma_id}>{e.tipma_nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Sexo:</label>
          <select name="sexo" value={formData.sexo} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2">
            <option value="">-- Selecciona --</option>
            {sexos.map(e => (
              <option key={e.sex_id} value={e.sex_id}>{e.sex_nombre}</option>
            ))}
          </select>
        </div>
        {/* Campo de Gustos */}
        <div className="md:col-span-2">
          <label className="block font-medium text-gray-700 mb-2">Gustos:</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {gustos.map(gusto => (
              <label key={gusto.gust_id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={gusto.gust_id}
                  checked={gustosSeleccionados.includes(gusto.gust_id)}
                  onChange={() => handleGustoChange(gusto.gust_id)}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="text-gray-700 text-sm">{gusto.gust_nombre}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Campos de imagen */}
        <div className="md:col-span-2">
          <label className="block font-medium text-gray-700 mb-1">Imágenes:</label>
          {imagenes.map((img, index) => (
            <input
              key={index}
              type="text"
              value={img}
              onChange={(e) => handleImageChange(index, e.target.value)}
              placeholder={`URL de imagen ${index + 1}`}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
            />
          ))}
          <button type="button" onClick={agregarCampoImagen} className="text-blue-600 hover:text-blue-800 text-sm mt-1">
            + Agregar otra imagen
          </button>
        </div>

        <div className="md:col-span-2 text-center mt-4">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded">
            Registrar Mascota
          </button>
        </div>
      </form>
    </div>
  );
};

export default MascotasAdmin;
