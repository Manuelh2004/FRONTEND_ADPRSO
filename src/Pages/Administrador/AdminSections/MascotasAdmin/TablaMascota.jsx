const TablaMascota = ({
  mascotasPaginados,
  handleEditar,
  handleCambiarEstado,
  handleVerMas,
  paginaActual,
  registrosPorPagina,
}) => {
  // Función para calcular la edad
  const calcularEdad = (fechaNacimiento) => {
    const nacimiento = new Date(fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }

    return edad;
  };

  return (
    <div className="overflow-x-auto bg-white p-8 rounded-lg shadow-lg space-y-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-left text-gray-700">
        Tabla
      </h2>
      <table className="min-w-full text-sm table-auto border-collapse">
        <thead className="bg-[#dda15e] text-white">
          <tr>
            <th className="px-6 py-4 text-center">#</th>
            <th className="px-6 py-4 text-center">Nombre</th>
            <th className="px-6 py-4 text-center">Tipo</th>
            <th className="px-6 py-4 text-center">Edad</th>
            <th className="px-6 py-4 text-center">Estado</th>
            <th className="px-6 py-4 text-center">Sexo</th>
            <th className="px-6 py-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {mascotasPaginados.map((mascota, index) => {
            const numeroRegistro = index + (paginaActual - 1) * registrosPorPagina;
            const edad = calcularEdad(mascota.masc_fecha_nacimiento);

            return (
              <tr key={mascota.masc_id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 text-center">{numeroRegistro + 1}</td>
                <td className="px-6 py-4 text-center">{mascota.masc_nombre}</td>
                <td className="px-6 py-4 text-center">{mascota.tipo_mascota.tipma_nombre}</td>
                <td className="px-6 py-4 text-center">{edad}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`inline-block py-1 px-3 rounded-full ${
                      mascota.masc_estado === 1
                        ? 'bg-green-200 text-green-800'
                        : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {mascota.masc_estado === 1 ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">{mascota.sexo.sex_nombre}</td>
                <td className="px-6 py-4 text-center flex justify-center space-x-4">
                  <button
                    onClick={() => handleEditar(mascota)}
                    className="bg-amber-400 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition duration-300 cursor-pointer"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleCambiarEstado(mascota.masc_id, mascota.masc_estado)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 cursor-pointer"
                  >
                    Cambiar estado
                  </button>
                  <button
                    onClick={() => handleVerMas(mascota)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition duration-300 cursor-pointer"
                  >
                    Ver más
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

export default TablaMascota;
