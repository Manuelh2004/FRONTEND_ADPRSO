const ModalMascota = ({ mascotaSeleccionada, setMascotaSeleccionada }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-transparent"> {/* Fondo transparente */}
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-2xl max-w-lg w-full overflow-y-auto max-h-[80vh]">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Detalles de la Mascota</h3>

        {/* Mostrar los detalles del evento */}
        <p><strong className="text-gray-600">Nombre:</strong> {mascotaSeleccionada.masc_nombre}</p>
        <p><strong className="text-gray-600">Tipo:</strong> {mascotaSeleccionada.tipo_mascota.tipma_nombre}</p>
        <p><strong className="text-gray-600">Fecha de Inicio:</strong> {mascotaSeleccionada.masc_fecha_nacimiento}</p>
        
        <p><strong className="text-gray-600">Sexo:</strong> {mascotaSeleccionada.sexo.sex_nombre}</p>
        <p><strong className="text-gray-600">Nivel de Energia:</strong> {mascotaSeleccionada.nivel_energia.nien_nombre}</p>
        <p><strong className="text-gray-600">Estado de Salud:</strong> {mascotaSeleccionada.estado_salud.estsa_nombre}</p>
        <p><strong className="text-gray-600">Estado de Vacunas:</strong> {mascotaSeleccionada.estado_vacuna.estva_nombre}</p>

        <p><strong className="text-gray-600">Observación:</strong></p>
        <div className="text-gray-700 whitespace-pre-line">{mascotaSeleccionada.masc_observacion}</div>
        <p><strong className="text-gray-600">Historia:</strong></p>
        <div className="text-gray-700 whitespace-pre-line">{mascotaSeleccionada.masc_historia}</div>

        <p><strong className="text-gray-600">Estado:</strong> {mascotaSeleccionada.masc_estado === 1 ? 'Activo' : 'Inactivo'}</p>

        {/* Botón para cerrar el modal */}
        <div className="mt-4">
          <button
            onClick={() => setMascotaSeleccionada(null)} 
            className="bg-[#dda15e] text-white py-2 px-6 rounded-lg hover:bg-[#dda15e] transition duration-300 transform hover:scale-105">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalMascota;
