import React from 'react';

const ModalEvento = ({ eventoSeleccionado, setEventoSeleccionado }) => {
  if (!eventoSeleccionado) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-transparent">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl max-w-lg w-full overflow-y-auto max-h-[80vh]">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Detalles del Evento</h3>

        <div className="space-y-4">
          {/* Información del evento */}
          <div>
            <p><strong className="text-gray-600">Nombre:</strong> {eventoSeleccionado.even_nombre}</p>
            <p><strong className="text-gray-600">Lugar:</strong> {eventoSeleccionado.even_lugar}</p>
            <p><strong className="text-gray-600">Fecha de Inicio:</strong> {eventoSeleccionado.even_fecha_inicio}</p>
            <p><strong className="text-gray-600">Fecha de Fin:</strong> {eventoSeleccionado.even_fecha_fin}</p>           
            <p><strong className="text-gray-600">Estado:</strong> {eventoSeleccionado.even_estado === 1 ? 'Activo' : 'Inactivo'}</p>   
          </div>

          {/* Descripción del evento */}
          <div>
            <p><strong className="text-gray-600">Descripción:</strong></p>
            <p className="text-gray-700 whitespace-pre-line overflow-y-auto max-h-40">{eventoSeleccionado.even_descripcion}</p>
          </div>

          {/* Imagen del evento */}
          <div className="mt-4">
            <img
              src={eventoSeleccionado.even_imagen || 'ruta/default-imagen.jpg'}  // Validación en caso de imagen vacía
              alt={`Imagen del evento ${eventoSeleccionado.even_nombre}`}  // Corregido el alt
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Botón para cerrar el modal */}
        <div className="mt-4">
          <button
            onClick={() => setEventoSeleccionado(null)} 
            className="bg-[#dda15e] text-white py-2 px-6 rounded-lg hover:bg-[#dda15e] transition duration-300 transform hover:scale-105">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEvento;
