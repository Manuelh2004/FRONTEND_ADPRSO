const TablaEvento = ({
  eventosPaginados,
  handleEditar,
  handleCambiarEstado,
  handleVerMas,
  handleDescargarUnEvento,
  paginaActual,
  registrosPorPagina,
}) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6 space-y-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-left text-gray-700">
        Tabla
      </h2>
      <table className="min-w-full text-sm table-auto border-collapse">
        <thead className="bg-[#dda15e] text-white">
          <tr>
            <th className="px-6 py-4 text-center">#</th>
            <th className="px-4 py-3 text-center">Nombre</th>
            <th className="px-4 py-3 text-center">Lugar</th>
            <th className="px-4 py-3 text-center">Estado</th>
            <th className="px-4 py-3 text-center">Fecha</th>
            <th className="px-4 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {eventosPaginados.map((evento, index) => {
            const numeroRegistro = index + (paginaActual - 1) * registrosPorPagina;

            return (
              <tr key={evento.even_id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 text-center">{numeroRegistro + 1}</td>
                <td className="px-4 py-3 text-center">{evento.even_nombre}</td>
                <td className="px-4 py-3 text-center">{evento.even_lugar}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`inline-block py-1 px-3 rounded-full ${
                      evento.even_estado === 1
                        ? 'bg-green-200 text-green-800'
                        : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {evento.even_estado === 1 ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">{evento.even_fecha_inicio}</td>
                <td className="px-4 py-3 text-center flex justify-center space-x-4">
                  <button
                    onClick={() => handleEditar(evento)}
                    className="bg-amber-400 text-white px-4 py-2 rounded-lg hover:bg-amber-500 transition duration-300 cursor-pointer"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleCambiarEstado(evento.even_id, evento.even_estado)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 cursor-pointer"
                  >
                    Cambiar estado
                  </button>
                  <button
                    onClick={() => handleVerMas(evento)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition duration-300 cursor-pointer"
                  >
                    Ver más                    
                  </button>
                   <button
                  onClick={() => handleDescargarUnEvento(evento.even_id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 cursor-pointer"
                >
                  <i className="fa-solid fa-download"></i> Reporte
                </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TablaEvento;
