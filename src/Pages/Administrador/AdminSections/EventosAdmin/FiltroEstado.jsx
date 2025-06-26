const FiltroEstado = ({ filtroEstado, setFiltroEstado, searchTerm, setSearchTerm, onDescargarReporte }) => (
  <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
    {/* Filtro por Estado */}
    <div className="lg:w-1/3">
      <label className="block text-gray-700 font-semibold">Filtrar por Estado</label>
      <select
        value={filtroEstado}
        onChange={(e) => setFiltroEstado(e.target.value)}
        className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#dda15e]"
      >
        <option value="">Todos</option>
        <option value="activo">Activo</option>
        <option value="inactivo">Inactivo</option>
      </select>
    </div>

    {/* Buscador por nombre */}
    <div className="lg:w-1/3">
      <label className="block text-gray-700 font-semibold">Buscar por nombre</label>
      <input
        type="text"
        placeholder="Buscar evento..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dda15e]"
      />
    </div>

    {/* Botón de descarga */}
    <div className="lg:w-1/3 text-right">
      <button
        onClick={onDescargarReporte}
        className="mt-2 lg:mt-0 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 w-full lg:w-auto"
      >
      <i class="fa-solid fa-download"></i> Reporte de eventos
      </button>
    </div>
  </div>
);


export default FiltroEstado;
