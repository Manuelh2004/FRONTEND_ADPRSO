const TablaEvento = ({ eventosPaginados, handleEditar, handleCambiarEstado, handleVerMas }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
      <table className="w-full table-auto text-sm">
        <thead className="bg-[#dda15e]  text-white">
          <tr>
            <th className="px-6 py-4 text-center">Nombre</th>
            <th className="px-6 py-4 text-center">Lugar</th>
            <th className="px-6 py-4 text-center">Fecha</th>
            <th className="px-6 py-4 text-center">Estado</th>
            <th className="px-6 py-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {eventosPaginados.map(evento => (
            <tr key={evento.even_id} className="border-t hover:bg-gray-50">
              <td className="px-6 py-4">{evento.even_nombre}</td>
              <td className="px-6 py-4">{evento.even_lugar}</td>
              <td className="px-6 py-4">{evento.even_fecha_inicio}</td>
              <td className="px-6 py-4">
                <span className={`inline-block py-1 px-3 rounded-full ${evento.even_estado === 1 ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`} />
                {evento.even_estado === 1 ? 'Activo' : 'Inactivo'}
              </td>
              <td className="px-6 py-4 space-x-4">
                <button onClick={() => handleEditar(evento)} className="bg-amber-400 text-white px-4 py-2 rounded-lg hover:bg-amber-500 transition duration-300">
                  Editar
                </button>
                <button onClick={() => handleCambiarEstado(evento.even_id, evento.even_estado)} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300">
                  Cambiar estado
                </button>
                <button onClick={() => handleVerMas(evento)} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300">
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
