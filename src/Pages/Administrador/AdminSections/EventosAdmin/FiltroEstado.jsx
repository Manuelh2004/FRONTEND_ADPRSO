const FiltroEstado = ({ filtroEstado, setFiltroEstado, searchTerm, setSearchTerm }) => (
  <div className="flex justify-between mb-6">
    {/* Filtro por Estado */}
    <div className="w-1/2 pr-2">
      <label className="block text-gray-700 font-semibold">Filtrar por Estado</label>
      <select
        value={filtroEstado}
        onChange={(e) => setFiltroEstado(e.target.value)}
        className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bg-[#dda15e] "
      >
        <option value="">Todos</option>
        <option value="activo">Activo</option>
        <option value="inactivo">Inactivo</option>
      </select>
    </div>

    {/* Buscador por nombre */}
    <div className="w-1/2 pl-2">
      <label className="block text-gray-700 font-semibold">Buscar por nombre</label>
      <input
        type="text"
        placeholder="Buscar evento..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bg-[#dda15e] "
      />
    </div>
  </div>
);

export default FiltroEstado;
