const FiltroEstado = ({ estadoFiltro, setEstadoFiltro, busqueda, setBusqueda }) => {
  return (
    <div className="mb-6 flex justify-between items-center">
      {/* Filtro por estado */}
      <div className="flex items-center">
        <label className="mr-2 text-lg">Filtrar por estado:</label>
        <select
          className="p-2 border rounded shadow-md"
          value={estadoFiltro}
          onChange={(e) => setEstadoFiltro(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="aceptadas">Aceptadas</option>
          <option value="pendientes">Pendientes</option>
          <option value="rechazadas">Rechazadas</option>
        </select>
      </div>

      {/* Buscador */}
      <div className="flex items-center">
        <label className="mr-2 text-lg">Buscar:</label>
        <input
          type="text"
          className="p-2 border rounded shadow-md"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por nombre de mascota o usuario"
        />
      </div>
    </div>
  );
};

export default FiltroEstado;
