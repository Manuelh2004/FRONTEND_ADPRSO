import React, { useState } from "react";

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
    tipo: "Adopción",
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar lógica de envío real, como fetch o axios
    setEnviado(true);
  };

  return (
    <div className="px-6 py-10 max-w-xl mx-auto">
      {!enviado ? (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center">Contáctanos</h2>
          <p className="text-center text-sm text-gray-600">Déjanos tu mensaje y te responderemos pronto.</p>
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">🐶</div>
          </div>

          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            className="w-full p-2 border rounded"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="correo"
            placeholder="Correo"
            className="w-full p-2 border rounded"
            value={formData.correo}
            onChange={handleChange}
            required
          />
          <textarea
            name="mensaje"
            placeholder="Mensaje"
            className="w-full p-2 border rounded"
            rows="4"
            value={formData.mensaje}
            onChange={handleChange}
            required
          />
          <select
            name="tipo"
            className="w-full p-2 border rounded"
            value={formData.tipo}
            onChange={handleChange}
          >
            <option value="Adopción">Adopción</option>
            <option value="Donación">Donación</option>
            <option value="Voluntariado">Voluntariado</option>
            <option value="Otros">Otros</option>
          </select>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Guardar
          </button>
        </form>
      ) : (
        <div className="text-center bg-white p-8 shadow-lg rounded-lg space-y-4">
          <div className="w-16 h-16 mx-auto bg-green-200 rounded-full flex items-center justify-center text-3xl">✔</div>
          <h3 className="text-xl font-bold text-green-700">¡Felicidades!</h3>
          <p>Se guardó exitosamente sus datos</p>
          <button
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            onClick={() => setEnviado(false)}
          >
            Aceptar
          </button>
        </div>
      )}
    </div>
  );
};

export default Contacto;
