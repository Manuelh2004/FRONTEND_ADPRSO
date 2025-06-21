import React from 'react';

const MascotaFormulario = ({ formData, handleChange, handleSubmit, editandoId }) => {
  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <div className="mb-4">
        <label className="block font-medium">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium">Edad</label>
        <input
          type="number"
          name="edad"
          value={formData.edad}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      {/* Agrega aquí más campos según tu entidad Mascota */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {editandoId ? 'Actualizar' : 'Registrar'} Mascota
      </button>
    </form>
  );
};

export default MascotaFormulario;
