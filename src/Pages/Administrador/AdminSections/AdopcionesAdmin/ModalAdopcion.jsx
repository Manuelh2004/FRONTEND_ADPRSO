const ModalAdopcion = ({ adopcionSeleccionada, cerrarModal, obtenerEstadoTexto }) => {
  if (!adopcionSeleccionada) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-xl font-bold mb-4">Detalles de la adopción</h3>
        <p><strong>Fecha de Adopción:</strong> {adopcionSeleccionada.adop_fecha}</p>
        <p><strong>Estado:</strong> {obtenerEstadoTexto(adopcionSeleccionada.adop_estado)}</p>
        <p><strong>Nombre de la Mascota:</strong> {adopcionSeleccionada.mascota.masc_nombre}</p>
        <p><strong>Tipo de Mascota:</strong> {adopcionSeleccionada.mascota.tipo_mascota.tipma_nombre}</p>
        <p><strong>Usuario:</strong> {adopcionSeleccionada.usuario.usr_nombre} {adopcionSeleccionada.usuario.usr_apellido}</p>
        <p><strong>Teléfono del Usuario:</strong> {adopcionSeleccionada.usuario.usr_telefono}</p>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
          onClick={cerrarModal}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalAdopcion;
