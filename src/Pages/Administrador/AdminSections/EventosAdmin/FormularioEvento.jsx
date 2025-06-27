import { useState, useEffect } from 'react';

const FormularioEvento = ({ formData, setFormData, handleSubmit, editandoId, handleCancel }) => {
  const [errorFecha, setErrorFecha] = useState('');
  const [isValid, setIsValid] = useState(true);

  const inputFileRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let nuevoError = '';
    if (name === 'fecha_fin' && formData.fecha_inicio && value < formData.fecha_inicio) {
      nuevoError = 'La fecha de fin no puede ser anterior a la fecha de inicio.';
    } else if (name === 'fecha_inicio' && formData.fecha_fin && formData.fecha_fin < value) {
      nuevoError = 'La fecha de inicio no puede ser posterior a la fecha de fin.';
    }

    setErrorFecha(nuevoError);
    setIsValid(nuevoError === '');

    setFormData((prev) => ({ ...prev, [name]: value }));
    inputFileRef.current.value = null;
  };

  useEffect(() => {
    // Revalidar en caso de que el usuario modifique fechas varias veces
    if (
      formData.fecha_inicio &&
      formData.fecha_fin &&
      formData.fecha_fin < formData.fecha_inicio
    ) {
      setErrorFecha('La fecha de fin no puede ser anterior a la fecha de inicio.');
      setIsValid(false);
    } else {
      setErrorFecha('');
      setIsValid(true);
    }
  }, [formData.fecha_inicio, formData.fecha_fin]);

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6 mb-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-left text-gray-700">
          {editandoId ? 'Editar' : 'Registrar'}
        </h2>
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
        {['nombre', 'fecha_inicio', 'descripcion', 'fecha_fin', 'lugar'].map((field) => (
          <div key={field}>
            <label className="block text-gray-700 font-semibold">
              {field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ') + ':'}
            </label>
            <input
              type={field.includes('fecha') ? 'date' : 'text'}
              name={field}
              value={formData[field]}
              onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
            {(field === 'fecha_inicio' || field === 'fecha_fin') && errorFecha && (
              <p className="text-red-500 text-sm mt-1">{errorFecha}</p>
            )}
          </div>
        ))}

        {/* Mostrar imagen previa si estás editando */}
        <div>
  <label className="block text-gray-700 font-semibold">Imagen:</label>

  {/* Mostrar imagen previa si estamos en modo edición */}


  <input
    type="file"
    accept="image/*"
    ref={inputFileRef}
    onChange={(e) => setFormData(prev => ({ ...prev, imagen: e.target.files[0] }))}
    className="w-full border border-gray-300 rounded px-3 py-2"
    required={!editandoId}
  />
</div>
  {editandoId && formData.imagen && typeof formData.imagen === 'string' && (
    <div className="mb-2">
      <p className="text-sm text-gray-500 mb-1">Imagen actual:</p>
      <img
        src={formData.imagen}
        alt="Imagen actual"
        className="w-40 h-32 object-cover rounded border"
      />
    </div>
  )}


      </div>

      <button
        type="submit"
        disabled={!isValid}
        className={`w-full py-2 rounded-lg transition duration-300 cursor-pointer ${
          isValid
            ? 'bg-[#dda15e] text-white hover:bg-[#e6b17c]'
            : 'bg-gray-300 text-gray-600 cursor-not-allowed'
        }`}
      >
        {editandoId ? 'Actualizar' : 'Registrar'} Evento
      </button>
    </form>
  );
};

export default FormularioEvento;