import React from 'react';

const FiltroEstado = ({ filtroEstado, setFiltroEstado, searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <label htmlFor="estadoFiltro" className="mr-4 text-lg">Filtrar por Estado:</label>
        <select
          id="estadoFiltro"
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="px-4 py-2 border rounded-lg text-gray-700"
        >
          <option value="">Todos</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>

      <div className="flex items-center">
        <label htmlFor="search" className="mr-4 text-lg">Buscar:</label>
        <input
          type="text"
          id="search"
          placeholder="Buscar mascota por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg text-gray-700"
        />
      </div>
    </div>
  );
};

export default FiltroEstado;
