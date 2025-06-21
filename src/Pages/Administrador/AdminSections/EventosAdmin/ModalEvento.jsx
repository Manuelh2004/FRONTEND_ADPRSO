import React from 'react';

const ModalEvento = ({ eventoSeleccionado, setEventoSeleccionado }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full overflow-y-auto max-h-[80vh]">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Detalles del Evento</h3>

        {/* Mostrar los detalles del evento */}
        <p><strong className="text-gray-600">Nombre:</strong> {eventoSeleccionado.even_nombre}</p>
        <p><strong className="text-gray-600">Lugar:</strong> {eventoSeleccionado.even_lugar}</p>
        <p><strong className="text-gray-600">Fecha de Inicio:</strong> {eventoSeleccionado.even_fecha_inicio}</p>
        <p><strong className="text-gray-600">Fecha de Fin:</strong> {eventoSeleccionado.even_fecha_fin}</p>
        <p><strong className="text-gray-600">Descripción:</strong></p>
        <div className="text-gray-700 whitespace-pre-line">{eventoSeleccionado.even_descripcion}</div>

        <p><strong className="text-gray-600">Estado:</strong> {eventoSeleccionado.even_estado === 1 ? 'Activo' : 'Inactivo'}</p>

        {/* Botón para cerrar el modal */}
        <div className="mt-4">
          <button
            onClick={() => setEventoSeleccionado(null)} 
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEvento;
