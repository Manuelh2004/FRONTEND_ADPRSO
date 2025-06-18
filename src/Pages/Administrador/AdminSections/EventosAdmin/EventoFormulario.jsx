const EventoFormulario = ({ formData, handleChange, handleSubmit, editandoId }) => {
  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      {/* Campo Nombre */}
      <div className="mb-4">
        <label className="block font-medium">Nombre del evento</label>
        <input name="nombre" value={formData.nombre} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
      </div>

      {/* Campo Descripción */}
      <div className="mb-4">
        <label className="block font-medium">Descripción</label>
        <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
      </div>

      {/* Fecha Inicio */}
      <div className="mb-4">
        <label className="block font-medium">Fecha Inicio</label>
        <input type="date" name="fecha_inicio" value={formData.fecha_inicio} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
      </div>

      {/* Fecha Fin */}
      <div className="mb-4">
        <label className="block font-medium">Fecha Fin</label>
        <input type="date" name="fecha_fin" value={formData.fecha_fin} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
      </div>

      {/* Lugar */}
      <div className="mb-4">
        <label className="block font-medium">Lugar</label>
        <input name="lugar" value={formData.lugar} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
      </div>

      {/* Imagen */}
      <div className="mb-4">
        <label className="block font-medium">URL de la Imagen</label>
        <input name="imagen" value={formData.imagen} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        {editandoId ? 'Actualizar' : 'Registrar'} Evento
      </button>
    </form>
  );
};

export default EventoFormulario;
