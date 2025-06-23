const FormularioEvento = ({ formData, setFormData, handleSubmit, editandoId }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6 mb-8">
      <h3 className="text-xl font-medium text-gray-700">{editandoId ? 'Editar Evento' : 'Registrar Nuevo Evento'}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {['nombre', 'fecha_inicio', 'descripcion', 'fecha_fin', 'lugar', 'imagen'].map((field) => (
          <div key={field}>
            <label className="block text-gray-700 font-semibold">{field.replace('_', ' ').toUpperCase()}</label>
            <input
              type={field.includes('fecha') ? 'date' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bg-[#dda15e] 
              required
            />
          </div>
        ))}
      </div>

      <button type="submit" className="w-full bg-[#dda15e]  text-white py-2 rounded-lg hover:bg-[#dda15e]  transition duration-300">
        {editandoId ? 'Actualizar' : 'Registrar'} Evento
      </button>
    </form>
  );
};


export default FormularioEvento