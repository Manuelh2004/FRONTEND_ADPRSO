const TablaAdopcion = ({
  adopcionesPaginados,
  obtenerEstadoTexto,
  handleVerMas,
  solicitarCambioEstado,
  paginaActual,
  registrosPorPagina,
  volverAPendiente,  // Asegúrate de pasar esta función como prop

}) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full text-sm table-auto border-collapse">
        <thead className="bg-[#dda15e] text-white">
          <tr>
            <th className="px-6 py-4 text-center">#</th>
            <th className="px-6 py-4 text-center">Fecha</th>
            <th className="px-6 py-4 text-center">Estado</th>
            <th className="px-6 py-4 text-center">Mascota</th>
            <th className="px-6 py-4 text-center">Tipo</th>
            <th className="px-6 py-4 text-center">Usuario</th>
            <th className="px-6 py-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {adopcionesPaginados.map((adopcion, index) => {
            // Calculamos el número de registro según la página actual
            const numeroRegistro = index + (paginaActual - 1) * registrosPorPagina;

            return (
              <tr key={adopcion.adop_id} className="border-t hover:bg-gray-100">
                <td className="px-6 py-4 text-center">{numeroRegistro + 1}</td>
                <td className="px-6 py-4 text-center">{adopcion.adop_fecha}</td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-block py-1 px-3 rounded-full ${adopcion.adop_estado === 0 ? 'bg-yellow-200 text-yellow-800' : adopcion.adop_estado === 1 ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}
                  >
                    {obtenerEstadoTexto(adopcion.adop_estado)}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">{adopcion.mascota.masc_nombre}</td>
                <td className="px-6 py-4 text-center">{adopcion.mascota.tipo_mascota.tipma_nombre}</td>
                <td className="px-6 py-4 text-center">{adopcion.usuario.usr_nombre} {adopcion.usuario.usr_apellido}</td>
                <td className="px-6 py-4 text-center flex justify-center space-x-4">
                  <button
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-900 transition duration-300 cursor-pointer"
                    onClick={() => handleVerMas(adopcion)}
                  >
                    Ver más
                  </button>
                  {adopcion.adop_estado === 0 && (
                    <>
                      <button
                        className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300 cursor-pointer"
                        onClick={() => solicitarCambioEstado(adopcion, 1)}
                      >
                        Aceptar
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-700 transition duration-300 cursor-pointer"
                        onClick={() => solicitarCambioEstado(adopcion, 2)}
                      >
                        Rechazar
                      </button>
                    </>
                  )}
                  {adopcion.adop_estado === 1 && (
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600 transition duration-300 cursor-pointer"
                      onClick={() => solicitarCambioEstado(adopcion, 2)}
                    >
                      Rechazar
                    </button>
                  )}
                  {adopcion.adop_estado === 2 && (
                    <button
                      className="bg-green-600 text-white px-4 py-2 rounded ml-2 hover:bg-green-700 transition duration-300 cursor-pointer"
                      onClick={() => solicitarCambioEstado(adopcion, 1)}
                    >
                      Aceptar
                    </button>
                  )}
                  {/* Reemplaza el botón con un ícono */}
                  {adopcion.adop_estado !== 0 && (
                    <button
                      className="text-blue-500 hover:text-blue-700 transition duration-300 cursor-pointer"
                      onClick={() => volverAPendiente(adopcion.adop_id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                      </svg>                                        
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TablaAdopcion;
