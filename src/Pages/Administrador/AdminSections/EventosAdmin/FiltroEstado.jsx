const FiltroEstado = ({ filtroEstado, setFiltroEstado }) => (
  <div className="mb-6">
    <label className="block text-gray-700 font-semibold">Filtrar por Estado</label>
    <select
      value={filtroEstado}
      onChange={(e) => setFiltroEstado(e.target.value)}
      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Todos</option>
      <option value="activo">Activo</option>
      <option value="inactivo">Inactivo</option>
    </select>
  </div>
);

export default FiltroEstado