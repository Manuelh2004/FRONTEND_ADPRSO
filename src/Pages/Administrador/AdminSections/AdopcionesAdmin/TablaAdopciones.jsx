// TablaAdopcion.jsx
import React from 'react';

const TablaAdopcion = ({ adopcionesPaginadas, obtenerEstadoTexto, handleVerMas, solicitarCambioEstado }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full text-sm table-auto border-collapse">
        <thead className="bg-[#dda15e] text-white">
          <tr>
            {['ID', 'Fecha', 'Estado', 'Mascota', 'Tipo', 'Usuario', 'Teléfono', 'Acciones'].map((header) => (
              <th key={header} className="px-6 py-4 text-center font-medium">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {adopcionesPaginadas.map((adopcion) => (
            <tr key={adopcion.adop_id} className="border-t hover:bg-gray-100">
              <td className="px-6 py-4">{adopcion.adop_id}</td>
              <td className="px-6 py-4">{adopcion.adop_fecha}</td>
              <td className="px-6 py-4">
                <span
                  className={`inline-block py-1 px-3 rounded-full ${adopcion.adop_estado === 0 ? 'bg-yellow-200 text-yellow-800' : adopcion.adop_estado === 1 ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}
                >
                  {obtenerEstadoTexto(adopcion.adop_estado)}
                </span>
              </td>
              <td className="px-6 py-4">{adopcion.mascota.masc_nombre}</td>
              <td className="px-6 py-4">{adopcion.mascota.tipo_mascota.tipma_nombre}</td>
              <td className="px-6 py-4">{adopcion.usuario.usr_nombre} {adopcion.usuario.usr_apellido}</td>
              <td className="px-6 py-4">{adopcion.usuario.usr_telefono}</td>
              <td className="px-6 py-4 text-center space-x-4">
                <button
                  className="bg-[#dda15e] text-white px-4 py-2 rounded hover:bg-[#bc6c25] transition duration-300"
                  onClick={() => handleVerMas(adopcion)}
                >
                  Ver más
                </button>
                {adopcion.adop_estado === 0 && (
                  <>
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded ml-2 hover:bg-yellow-600 transition duration-300"
                      onClick={() => solicitarCambioEstado(adopcion, 1)}
                    >
                      Aceptar
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600 transition duration-300"
                      onClick={() => solicitarCambioEstado(adopcion, 2)}
                    >
                      Rechazar
                    </button>
                  </>
                )}
                {adopcion.adop_estado === 1 && (
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600 transition duration-300"
                    onClick={() => solicitarCambioEstado(adopcion, 2)}
                  >
                    Rechazar
                  </button>
                )}
                {adopcion.adop_estado === 2 && (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded ml-2 hover:bg-green-700 transition duration-300"
                    onClick={() => solicitarCambioEstado(adopcion, 1)}
                  >
                    Aceptar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaAdopcion;
