const FormularioMascota = ({
  formData,
  handleChange,
  handleImageChange,
  handleImageRemove,
  agregarCampoImagen,
  handleGustoChange,
  gustos,
  gustosSeleccionados,
  estadoSalud,
  estadoVacuna,
  nivelEnergia,
  tamanios,
  tipoMascota,
  sexos,
  imagenes,
  handleSubmit,
  editandoId,
  handleCancelar
}) => {
  return (
    <div className="w-full mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl mb-4">
      {/* Contenedor para el Título y el Botón de Cancelar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-left text-gray-700">
          {formData.masc_nombre ? 'Editar' : 'Registrar'}
        </h2>

        {/* Botón de Cancelar solo si estamos en edición */}
        {editandoId && (
          <button
            type="button"
            onClick={handleCancelar}
            className="bg-gray-500 text-white py-1 px-4 rounded-lg hover:bg-gray-600 transition duration-300 cursor-pointer"
          >
            Cancelar
          </button>
        )}
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Nombre */}
        <div>
          <label className="block font-medium text-gray-700">Nombre:</label>
          <input
            type="text"
            name="masc_nombre"
            value={formData.masc_nombre}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* Fecha de nacimiento */}
        <div>
          <label className="block font-medium text-gray-700">Fecha de nacimiento:</label>
          <input
            type="date"
            name="masc_fecha_nacimiento"
            value={formData.masc_fecha_nacimiento}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* Historia */}
        <div className="md:col-span-2">
          <label className="block font-medium text-gray-700">Historia:</label>
          <textarea
            name="masc_historia"
            value={formData.masc_historia}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          ></textarea>
        </div>

        {/* Observación */}
        <div className="md:col-span-2">
          <label className="block font-medium text-gray-700">Observación:</label>
          <textarea
            name="masc_observacion"
            value={formData.masc_observacion}
            onChange={handleChange}
            rows="2"
            className="w-full border border-gray-300 rounded px-3 py-2"
          ></textarea>
        </div>

        {/* Selects */}
        <div>
          <label className="block font-medium text-gray-700">Estado de Salud:</label>
          <select
            name="estadoSalud"
            value={formData.estadoSalud}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">-- Selecciona --</option>
            {estadoSalud.map(e => (
              <option key={e.estsa_id} value={e.estsa_id}>{e.estsa_nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Estado de Vacuna:</label>
          <select
            name="estadoVacuna"
            value={formData.estadoVacuna}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">-- Selecciona --</option>
            {estadoVacuna.map(e => (
              <option key={e.estva_id} value={e.estva_id}>{e.estva_nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Nivel de Energía:</label>
          <select
            name="nivelEnergia"
            value={formData.nivelEnergia}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">-- Selecciona --</option>
            {nivelEnergia.map(e => (
              <option key={e.nien_id} value={e.nien_id}>{e.nien_nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Tamaño:</label>
          <select
            name="tamanio"
            value={formData.tamanio}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">-- Selecciona --</option>
            {tamanios.map(e => (
              <option key={e.tam_id} value={e.tam_id}>{e.tam_nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Tipo de Mascota:</label>
          <select
            name="tipoMascota"
            value={formData.tipoMascota}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">-- Selecciona --</option>
            {tipoMascota.map(e => (
              <option key={e.tipma_id} value={e.tipma_id}>{e.tipma_nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Sexo:</label>
          <select
            name="sexo"
            value={formData.sexo}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">-- Selecciona --</option>
            {sexos.map(e => (
              <option key={e.sex_id} value={e.sex_id}>{e.sex_nombre}</option>
            ))}
          </select>
        </div>

        {/* Gustos */}
        <div className="md:col-span-2">
          <label className="block font-medium text-gray-700 mb-2">Gustos:</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {gustos.map(gusto => (
              <label key={gusto.gust_id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={gusto.gust_id}
                  checked={gustosSeleccionados.includes(gusto.gust_id)}
                  onChange={() => handleGustoChange(gusto.gust_id)}
                  className="form-checkbox h-4 w-4 text-bg-[#dda15e] "
                />
                <span className="text-gray-700 text-sm">{gusto.gust_nombre}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Imágenes */}
        <div className="md:col-span-2">
          <label className="block font-medium text-gray-700 mb-1">Imágenes:</label>
          {imagenes.map((img, index) => {
  // Si es una imagen ya existente (del backend)
  if (img && typeof img === 'object' && img.imaUrl) {
    return (
      <div key={index} className="flex items-center space-x-3 mb-2">
        <img src={img.imaUrl} alt={`Imagen-${index}`} className="w-20 h-20 object-cover rounded" />
        <button
          type="button"
          onClick={() => handleImageRemove(index)}
          className="bg-red-500 text-white text-sm px-2 py-1 rounded hover:bg-red-600"
        >
          ✕
        </button>
      </div>
    );
  }

  // Si es una nueva imagen tipo File (pendiente de subir)
  if (img instanceof File) {
    return (
      <div key={index} className="flex items-center space-x-3 mb-2">
        <span className="text-gray-700 text-sm">{img.name}</span>
        <button
          type="button"
          onClick={() => handleImageRemove(index)}
          className="text-red-500 hover:text-red-700 text-sm font-medium cursor-pointer"
        >
          Eliminar
        </button>
      </div>
    );
  }

  // Campo de carga para nueva imagen vacía
  return (
    <div key={index} className="flex items-center space-x-3 mb-2">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageChange(index, e.target.files[0])}
        className="border border-gray-300 px-2 py-1 rounded"
      />
      <button
        type="button"
        onClick={() => handleImageRemove(index)}
        className="text-red-500 hover:text-red-700 text-sm font-medium cursor-pointer"
      >
        Eliminar
      </button>
    </div>
  );
})}



          <button
            type="button"
            onClick={agregarCampoImagen}
            className="text-bg-[#dda15e]  hover:text-bg-[#dda15e]  text-sm mt-1 cursor-pointer"
          >
            + Agregar otra imagen
          </button>
        </div>

        {/* Botón de enviar */}
        <div className="md:col-span-2 text-center mt-4">
          <button
            type="submit"
            className="w-full bg-[#dda15e] text-white py-2 rounded-lg hover:bg-[#dda15e] transition duration-300 cursor-pointer"
          >
           {editandoId ? 'Actualizar' : 'Registrar'} Mascota
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioMascota;
