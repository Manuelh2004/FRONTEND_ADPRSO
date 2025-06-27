const ModalAdopcion = ({ adopcionSeleccionada, setAdopcionSeleccionada }) => {
  if (!adopcionSeleccionada) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-transparent">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-2xl max-w-lg w-full overflow-y-auto max-h-[80vh]">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Detalles de la Postulación de Adopción</h3>

        <div className="space-y-4">
          {/* Motivo de la adopción */}
          <div>
            <p><strong className="text-gray-600">Motivo de la Adopción:</strong></p>
            <p className="text-gray-700 whitespace-pre-line overflow-y-auto max-h-40">{adopcionSeleccionada.adop_motivo}</p>
          </div>

          {/* Información de la mascota */}
          <div>
            <p><strong className="text-gray-600">Nombre de la Mascota:</strong> {adopcionSeleccionada.mascota.masc_nombre}</p>
            <p><strong className="text-gray-600">Tipo de Mascota:</strong> {adopcionSeleccionada.mascota.tipo_mascota.tipma_nombre}</p>
            <p><strong className="text-gray-600">Estado de la Mascota:</strong> {adopcionSeleccionada.mascota.masc_estado === 1 ? 'Activo' : 'Inactivo'}</p>
          </div>

          {/* Imagen de la mascota */}
          <div className="mt-4">
            <img
              src={adopcionSeleccionada.mascota.imagenes[0]?.ima_url}
              alt={`Imagen de ${adopcionSeleccionada.mascota.masc_nombre}`}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Información del usuario */}
          <div>
            <p><strong className="text-gray-600">Nombre del Usuario:</strong> {adopcionSeleccionada.usuario.usr_nombre} {adopcionSeleccionada.usuario.usr_apellido}</p>
            <p><strong className="text-gray-600">Teléfono:</strong> {adopcionSeleccionada.usuario.usr_telefono}</p>
            <p><strong className="text-gray-600">Correo Electrónico:</strong> {adopcionSeleccionada.usuario.usr_email}</p>
          </div>
        </div>

        {/* Botón para cerrar el modal */}
        <div className="mt-4">
          <button
            onClick={() => setAdopcionSeleccionada(null)} 
            className="bg-[#dda15e] text-white py-2 px-6 rounded-lg hover:bg-[#dda15e] transition duration-300 transform hover:scale-105">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAdopcion;
