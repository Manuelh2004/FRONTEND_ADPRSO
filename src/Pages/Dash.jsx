import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  getSexos,
  getTamanios,
  getNivelesEnergia,
  getTiposMascota,
  getEstadosSalud,
  getEstadosVacuna,
  getGustos,
  registrarMascota,
} from '../services/mascotaApi';
import { useAuth } from '../context/AuthContext';

const Dash = () => {
    const { token } = useAuth();
  const [form, setForm] = useState({
    nombre: "",
    fechaNacimiento: "",
    historia: "",
    observacion: "",
    sexoId: "",
    tamanioId: "",
    nivelEnergiaId: "",
    tipoMascotaId: "",
    estadoSaludId: "",
    estadoVacunaId: "",
    gustoIds: [],
    imagenesUrls: [""],
  });

  const [catalogos, setCatalogos] = useState({
    sexos: [],
    tamanios: [],
    niveles: [],
    tipos: [],
    estadosSalud: [],
    estadosVacuna: [],
    gustos: [],
  });

useEffect(() => {
  const fetchData = async () => {
    try {
      const [sexos, tamanios, niveles, tipos, salud, vacunas, gustos] = await Promise.all([
        getSexos(),
        getTamanios(),
        getNivelesEnergia(),
        getTiposMascota(),
        getEstadosSalud(),
        getEstadosVacuna(),
        getGustos(),
      ]);

      setCatalogos({
        sexos: sexos.data.data,
        tamanios: tamanios.data.data,
        niveles: niveles.data.data,
        tipos: tipos.data.data,
        estadosSalud: salud.data.data,
        estadosVacuna: vacunas.data.data,
        gustos: gustos.data.data,
      });
    } catch (err) {
      console.error('Error cargando catálogos:', err);
    }
  };

  fetchData();
}, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGustoChange = (id) => {
    const selected = form.gustoIds.includes(id)
      ? form.gustoIds.filter((gid) => gid !== id)
      : [...form.gustoIds, id];
    setForm({ ...form, gustoIds: selected });
  };

  const handleImagenChange = (i, value) => {
    const nuevas = [...form.imagenesUrls];
    nuevas[i] = value;
    setForm({ ...form, imagenesUrls: nuevas });
  };

  const addImagenUrl = () => {
    setForm({ ...form, imagenesUrls: [...form.imagenesUrls, ""] });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await registrarMascota(form,token);
    alert('Mascota registrada');
  } catch (err) {
    console.error('Error al registrar mascota:', err);
    alert('Error al registrar');
  }
};

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Registrar nueva mascota</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="nombre" placeholder="Nombre" className="border p-2 w-full" value={form.nombre} onChange={handleChange} />

        <input type="date" name="fechaNacimiento" className="border p-2 w-full" value={form.fechaNacimiento} onChange={handleChange} />

        <textarea name="historia" placeholder="Historia" className="border p-2 w-full" value={form.historia} onChange={handleChange} />

        <textarea name="observacion" placeholder="Observación" className="border p-2 w-full" value={form.observacion} onChange={handleChange} />

        <select name="sexoId" className="border p-2 w-full" value={form.sexoId} onChange={handleChange}>
          <option value="">Selecciona sexo</option>
          {catalogos.sexos.map((s) => <option key={s.sex_id} value={s.sex_id}>{s.sex_nombre}</option>)}
        </select>

        <select name="tamanioId" className="border p-2 w-full" value={form.tamanioId} onChange={handleChange}>
          <option value="">Selecciona tamaño</option>
          {catalogos.tamanios.map((t) => <option key={t.tam_id} value={t.tam_id}>{t.tam_nombre}</option>)}
        </select>

        <select name="nivelEnergiaId" className="border p-2 w-full" value={form.nivelEnergiaId} onChange={handleChange}>
          <option value="">Nivel de energía</option>
          {catalogos.niveles.map((n) => <option key={n.nien_id} value={n.nien_id}>{n.nien_nombre}</option>)}
        </select>

        <select name="tipoMascotaId" className="border p-2 w-full" value={form.tipoMascotaId} onChange={handleChange}>
          <option value="">Tipo de mascota</option>
          {catalogos.tipos.map((tm) => <option key={tm.tipma_id} value={tm.tipma_id}>{tm.tipma_nombre}</option>)}
        </select>

        <select name="estadoSaludId" className="border p-2 w-full" value={form.estadoSaludId} onChange={handleChange}>
          <option value="">Estado de salud</option>
          {catalogos.estadosSalud.map((e) => <option key={e.estsa_id} value={e.estsa_id}>{e.estsa_nombre}</option>)}
        </select>

        <select name="estadoVacunaId" className="border p-2 w-full" value={form.estadoVacunaId} onChange={handleChange}>
          <option value="">Estado de vacunas</option>
          {catalogos.estadosVacuna.map((e) => <option key={e.estva_id} value={e.estva_id}>{e.estva_nombre}</option>)}
        </select>

        <div>
          <label className="font-semibold">Gustos:</label>
          <div className="flex flex-wrap gap-2">
            {catalogos.gustos.map((g) => (
              <label key={g.gust_id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.gustoIds.includes(g.gust_id)}
                  onChange={() => handleGustoChange(g.gust_id)}
                />
                {g.gust_nombre}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="font-semibold">Imágenes (URLs):</label>
          {form.imagenesUrls.map((url, i) => (
            <input
              key={i}
              className="border p-2 w-full mb-2"
              value={url}
              onChange={(e) => handleImagenChange(i, e.target.value)}
              placeholder={`URL imagen ${i + 1}`}
            />
          ))}
          <button type="button" onClick={addImagenUrl} className="text-blue-600 underline">Agregar otra imagen</button>
        </div>

        <button type="submit" className="bg-blue-800 text-white px-4 py-2 rounded">Registrar Mascota</button>
      </form>
    </div>
  );
};

export default Dash;
