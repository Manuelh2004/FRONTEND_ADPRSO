const TablaEvento = ({ eventosPaginados, handleEditar, handleCambiarEstado, handleVerMas }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg space-y-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-left text-gray-700">
        Tabla de Eventos
      </h2>
      <table className="w-full table-auto text-sm">
        <thead className="bg-[#dda15e] text-white">
          <tr>
            <th className="px-4 py-3 text-left">Nombre</th>
            <th className="px-4 py-3 text-left">Lugar</th>
            <th className="px-4 py-3 text-center">Fecha</th>
            <th className="px-4 py-3 text-center">Estado</th>
            <th className="px-4 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {eventosPaginados.map((evento) => (
            <tr key={evento.even_id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-3">{evento.even_nombre}</td>
              <td className="px-4 py-3">{evento.even_lugar}</td>
              <td className="px-4 py-3 text-center">{evento.even_fecha_inicio}</td>
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
              <td className="px-4 py-3 text-center space-x-2">
                <button
                  onClick={() => handleEditar(evento)}
                  className="bg-amber-400 text-white px-4 py-2 rounded-lg hover:bg-amber-500 transition duration-300"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleCambiarEstado(evento.even_id, evento.even_estado)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Cambiar estado
                </button>
                <button
                  onClick={() => handleVerMas(evento)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
                >
                  Ver más
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaEvento;
