const FormularioEvento = ({ formData, setFormData, handleSubmit, editandoId, handleCancel }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6 mb-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-left text-gray-700">
          {editandoId ? 'Editar' : 'Registrar'}
        </h2>

        {/* Botón de Cancelar solo si estamos en edición */}
        {editandoId && (
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white py-1 px-4 rounded-lg hover:bg-gray-600 transition duration-300 cursor-pointer"
          >
            Cancelar
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {['nombre', 'fecha_inicio', 'descripcion', 'fecha_fin', 'lugar', 'imagen'].map((field) => (
          <div key={field}>
            <label className="block text-gray-700 font-semibold">
              {field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ') + ":"}
            </label>
            <input
              type={field.includes('fecha') ? 'date' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full bg-[#dda15e] text-white py-2 rounded-lg hover:bg-[#dda15e] transition duration-300 cursor-pointer"
      >
        {editandoId ? 'Actualizar' : 'Registrar'} Evento
      </button>
    </form>
  );
};

export default FormularioEvento;
