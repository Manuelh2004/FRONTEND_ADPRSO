import React from 'react';
import { Link } from 'react-router-dom';
import MascotaCard from './MascotaCard';
import MascotaDetalle from './MascotaDetalle';

const Adopta = () => {
  const mascotas = [
    { id: 1, nombre: 'Luna', edad: '4 años', sexo: 'Hembra', imagen: '', energia: 'Alta', salud: 'Saludable', tamano: 'Mediano' },
    { id: 2, nombre: 'Max', edad: '6 años', sexo: 'Macho', imagen: '', energia: 'Media', salud: 'Saludable', tamano: 'Grande' },
    // más mascotas...
  ];

  return (
    <div className="flex p-6">
      {/* Filtros */}
      <aside className="w-1/4 pr-6 space-y-4">
        <h2 className="text-xl font-semibold">Filtrar por</h2>
        <div>
          <label className="block font-medium">Tamaño</label>
          <div className="flex gap-2">
            <button className="bg-gray-200 px-2 py-1 rounded">Pequeño</button>
            <button className="bg-gray-200 px-2 py-1 rounded">Mediano</button>
            <button className="bg-gray-200 px-2 py-1 rounded">Grande</button>
          </div>
        </div>
        <div>
          <label className="block font-medium">Sexo</label>
          <div className="flex gap-2">
            <input type="radio" name="sexo" /> ♂
            <input type="radio" name="sexo" /> ♀
          </div>
        </div>
        <div>
          <label className="block font-medium">Edad</label>
          <select className="w-full border rounded px-2 py-1">
            <option>1-2 años</option>
            <option>3-5 años</option>
            <option>6+ años</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Nivel de energía</label>
          <select className="w-full border rounded px-2 py-1">
            <option>Alta</option>
            <option>Media</option>
            <option>Baja</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Estado de salud</label>
          <select className="w-full border rounded px-2 py-1">
            <option>Saludable</option>
            <option>Tratamiento</option>
          </select>
        </div>
      </aside>

      {/* Galería */}
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-3/4">
        {mascotas.map((mascota) => (
          <Link key={mascota.id} to={`/adopta/${mascota.id}`}>
            <MascotaCard mascota={mascota} />
          </Link>
        ))}
      </main>
    </div>
  );
};

export default Adopta;