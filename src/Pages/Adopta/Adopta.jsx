import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MascotaCard from './MascotaCard';
import {
  getSexos,
  getTamanios,
  getNivelesEnergia,
  getTiposMascota,
  getMascotasFiltradas
} from '../../services/mascotaApi'; // ajusta la ruta según tu estructura
import { FaWhatsapp } from 'react-icons/fa'; // Importamos el ícono de WhatsApp

const Adopta = () => {
  const [mascotas, setMascotas] = useState([]);
  const [filtros, setFiltros] = useState({
    sexId: null,
    tamId: null,
    nienId: null,
    tipmaId: null
  });

  const [opciones, setOpciones] = useState({
    sexos: [],
    tamanios: [],
    nivelesEnergia: [],
    tiposMascota: []
  });

  useEffect(() => {
    const fetchOpciones = async () => {
      const [sexos, tamanios, nivelesEnergia, tiposMascota] = await Promise.all([
        getSexos(),
        getTamanios(),
        getNivelesEnergia(),
        getTiposMascota()
      ]);
      setOpciones({
        sexos: sexos.data.data,
        tamanios: tamanios.data.data,
        nivelesEnergia: nivelesEnergia.data.data,
        tiposMascota: tiposMascota.data.data
      });
    };

    fetchOpciones();
  }, []);

  useEffect(() => {
    const fetchMascotas = async () => {
      const params = {};
      Object.keys(filtros).forEach((key) => {
        if (filtros[key]) params[key] = filtros[key];
      });

      const response = await getMascotasFiltradas(params);
      setMascotas(response.data.data);
    };

    fetchMascotas();
  }, [filtros]);

  const handleFiltroChange = (tipo, valor) => {
    setFiltros((prev) => ({
      ...prev,
      [tipo]: valor === prev[tipo] ? null : valor
    }));
  };

  // Reemplaza con tu número de WhatsApp y el mensaje que deseas enviar
  const telefonoWhatsApp = "51922266310";  // Agrega tu número de WhatsApp aquí
  const mensaje = "¡Hola! Quiero saber más sobre las mascotas disponibles para adopción."; // Mensaje predeterminado

  // Enlace a la API de WhatsApp
  const enlaceWhatsApp = `https://wa.me/${telefonoWhatsApp}?text=${encodeURIComponent(mensaje)}`;

  return (
  <div className="flex flex-col md:flex-row gap-6 p-6 ">
    {/* Filtros */}
    <aside className="min-w-[220px] md:w-[18%] h-100 space-y-4 md:sticky md:top-4 bg-#a1774c text-white p-3 rounded-lg shadow-md text-sm bg-[#9A6C3B]">
      <h2 className="text-lg font-semibold mb-2 text-center">Filtrar por</h2>

      {/* Tamaño */}
      <div>
        <label className="block font-medium mb-1">Tamaño</label>
        <div className="flex flex-wrap gap-1">
          {opciones.tamanios.map(t => (
            <button
              key={t.tam_id}
              onClick={() => handleFiltroChange('tamId', t.tam_id)}
              className={`px-2 py-1 rounded-full text-xs font-medium transition ${
                filtros.tamId === t.tam_id ? 'bg-[#dda15e] text-white' : 'bg-white text-black hover:bg-gray-300'
              }`}
            >
              {t.tam_nombre}
            </button>
          ))}
        </div>
      </div>

      {/* Sexo */}
      <div>
        <label className="block font-medium mb-1">Sexo</label>
        <div className="flex flex-col gap-1">
          {opciones.sexos.map(s => (
            <label key={s.sex_id} className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="sexo"
                value={s.sex_id}
                checked={filtros.sexId === s.sex_id}
                onChange={() => handleFiltroChange('sexId', s.sex_id)}
                className="accent-[#dda15e]"
              />
              <span>{s.sex_nombre}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Nivel de energía */}
      <div>
        <label className="block font-medium mb-1">Nivel de energía</label>
        <div className="flex flex-wrap gap-1">
          {opciones.nivelesEnergia.map(n => (
            <button
              key={n.nien_id}
              onClick={() => handleFiltroChange('nienId', n.nien_id)}
              className={`px-2 py-1 rounded-full text-xs font-medium transition ${
                filtros.nienId === n.nien_id ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-gray-300'
              }`}
            >
              {n.nien_nombre}
            </button>
          ))}
        </div>
      </div>

      {/* Tipo de mascota */}
      <div>
        <label className="block font-medium mb-1">Tipo de mascota</label>
        <div className="flex flex-wrap gap-1">
          {opciones.tiposMascota.map(t => (
            <button
              key={t.tipma_id}
              onClick={() => handleFiltroChange('tipmaId', t.tipma_id)}
              className={`px-2 py-1 rounded-full text-xs font-medium transition border ${
                filtros.tipmaId === t.tipma_id
                  ? 'bg-purple-500 text-white border-purple-500'
                  : 'bg-white text-black border-gray-300 hover:bg-gray-100'
              }`}
            >
              {t.tipma_nombre}
            </button>
          ))}
        </div>
      </div>
    </aside>

    {/* Galería */}
    <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {mascotas.length === 0 && (
        <p className="col-span-full text-center text-gray-500">No se encontraron mascotas</p>
      )}
      {mascotas.map((mascota) => (
        <Link key={mascota.mascotaId} to={`/adopta/${mascota.mascotaId}`}>
          <MascotaCard mascota={mascota} />
        </Link>
      ))}
    </main>

    {/* Botón flotante de WhatsApp */}
    <a
      href={enlaceWhatsApp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition z-50"
      title="Enviar mensaje por WhatsApp"
    >
      <FaWhatsapp size={30} />
    </a>
  </div>
);

};

export default Adopta;
