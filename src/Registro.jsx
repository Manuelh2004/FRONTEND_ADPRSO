import React, { useEffect, useState } from 'react';
import axios from 'axios';
import pawPrint from './Imagenes/huella.jpg'; 
import dogSilhouette from './Imagenes/perrito-silueta.jpg'; 
import { useNavigate } from 'react-router-dom';

// ... imports sin cambios

export default function Registro() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    usr_nombre: '',
    usr_apellido: '',
    usr_documento: '',
    usr_direccion: '',
    usr_telefono: '',
    usr_fecha_nacimiento: '',
    usr_email: '',
    usr_password: '',
    tipoDocumento: { tipdoc_id: '' }
  });

  const [tiposDocumento, setTiposDocumento] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/item/tipo-documento/public')
      .then((res) => setTiposDocumento(res.data.data))
      .catch(() => setError('Error al cargar los tipos de documento'));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'tipdoc_id') {
      setFormData({ ...formData, tipoDocumento: { tipdoc_id: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

const validarCampos = () => {
  const { usr_email, usr_password, usr_nombre, usr_apellido, usr_telefono, usr_documento, tipoDocumento, usr_fecha_nacimiento } = formData;

  // Validar nombre y apellido
  if (!usr_nombre.trim()) {
    setError("El nombre es obligatorio.");
    return false;
  }

  if (!usr_apellido.trim()) {
    setError("El apellido es obligatorio.");
    return false;
  }

  // Validar correo
  const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correoRegex.test(usr_email)) {
    setError("Ingrese un correo electrónico válido.");
    return false;
  }

  // Validar contraseña
  if (usr_password.length < 6) {
    setError("La contraseña debe tener al menos 6 caracteres.");
    return false;
  }

  // Validar teléfono
  const telefonoRegex = /^\d{9,}$/;
  if (!telefonoRegex.test(usr_telefono)) {
    setError("El teléfono debe contener al menos 9 dígitos.");
    return false;
  }

  // Validar edad (18+)
  const hoy = new Date();
  const nacimiento = new Date(usr_fecha_nacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
    }

  if (edad < 18) {
    setError("Debes ser mayor de edad (mínimo 18 años) para registrarte.");
    return false;
  }

  // Validar documento según tipo
  const tipo = tipoDocumento.tipdoc_id;
  const numero = usr_documento.trim();

  if (tipo === "1" && !/^\d{8}$/.test(numero)) {
    setError("El DNI debe tener exactamente 8 dígitos numéricos.");
    return false;
  }

  if (tipo === "2" && !/^[a-zA-Z0-9]{8,12}$/.test(numero)) {
    setError("El Pasaporte debe tener entre 8 y 12 caracteres alfanuméricos.");
    return false;
  }

  if (tipo === "3" && !/^[a-zA-Z0-9]{9,12}$/.test(numero)) {
    setError("El Carnet de Extranjería debe tener entre 9 y 12 caracteres alfanuméricos.");
    return false;
  }

  return true;
};


  const handleSubmit = async (e) => {
  e.preventDefault();
  setMensaje('');
  setError('');

  if (!validarCampos()) return;

  try {
    const response = await axios.post('http://localhost:8080/auth/crear_usuario', formData);
    setMensaje('Registro exitoso. Redirigiendo...');
    // console.log(response.data);
    setTimeout(() => navigate('/login'), 2000);
  } catch (error) {
    const msg = error.response?.data?.message || 'Error al registrar usuario';
    setError(msg);
  }
};


  return (
    <div
      className="flex justify-center items-center min-h-screen bg-amber-50 bg-opacity-50"
      style={{
        backgroundImage: `url(${pawPrint})`,
        backgroundSize: '200px',
        backgroundBlendMode: 'overlay'
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-xl w-96 border-2 border-amber-200 relative overflow-hidden"
        aria-label="Formulario de registro"
      >
        <div className="absolute -top-10 -right-10 w-32 h-32">
          <img src={pawPrint} alt="Huella decorativa" className="opacity-20 rotate-45" />
        </div>

        <div className="flex justify-center mb-4">
          <img src={dogSilhouette} alt="Silueta de perrito" className="h-16 w-16" />
        </div>

        <h2 className="text-2xl font-bold mb-4 text-center text-amber-800">
          Regístrate en el Albergue
        </h2>

        {/* Nombre */}
        <div className="mb-4 relative">
          <input type="text" name="usr_nombre" placeholder="Nombre" value={formData.usr_nombre} onChange={handleChange} required className="w-full p-3 border-2 border-amber-200 rounded-lg pl-10 focus:border-amber-400 focus:ring-2 focus:ring-amber-100" />
          <span className="absolute left-4 top-4 text-amber-500">
            {/* Icono */}
            <i class="fa-solid fa-user"></i>
          </span>
        </div>

        {/* Apellido */}
        <div className="mb-4 relative">
          <input type="text" name="usr_apellido" placeholder="Apellido" value={formData.usr_apellido} onChange={handleChange} required className="w-full p-3 border-2 border-amber-200 rounded-lg pl-10 focus:border-amber-400 focus:ring-2 focus:ring-amber-100" />
          <span className="absolute left-4 top-4 text-amber-500">
            <i class="fa-solid fa-user"></i>
          </span>
        </div>

        {/* Correo */}
        <div className="mb-4 relative">
          <input type="email" name="usr_email" placeholder="Correo electrónico" value={formData.usr_email} onChange={handleChange} required className="w-full p-3 border-2 border-amber-200 rounded-lg pl-10 focus:border-amber-400 focus:ring-2 focus:ring-amber-100" />
          <span className="absolute left-4 top-4 text-amber-500">
            <i class="fa-solid fa-envelope"></i>
          </span>
        </div>

        {/* Contraseña */}
        <div className="mb-4 relative">
          <input type="password" name="usr_password" placeholder="Contraseña" value={formData.usr_password} onChange={handleChange} required className="w-full p-3 border-2 border-amber-200 rounded-lg pl-10 focus:border-amber-400 focus:ring-2 focus:ring-amber-100" />
          <span className="absolute left-4 top-4 text-amber-500">
            <i class="fa-solid fa-lock"></i>
          </span>
        </div>

        {/* Tipo documento */}
        <div className="mb-4 relative">
          <select name="tipdoc_id" onChange={handleChange} value={formData.tipoDocumento.tipdoc_id} required className="w-full p-3 border-2 border-amber-200 rounded-lg pl-10 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 appearance-none">
            <option value="">Tipo de documento</option>
            {tiposDocumento.map((tipo) => (
              <option key={tipo.tipdoc_id} value={tipo.tipdoc_id}>{tipo.tipdoc_nombre}</option>
            ))}
          </select>
          <span className="absolute left-4 top-4 text-amber-500">
            <i class="fa-solid fa-id-card"></i>
          </span>
        </div>

        {/* Documento */}
        <div className="mb-4 relative">
          <input type="text" name="usr_documento" placeholder="N° Documento" value={formData.usr_documento} onChange={handleChange} required className="w-full p-3 border-2 border-amber-200 rounded-lg pl-10 focus:border-amber-400 focus:ring-2 focus:ring-amber-100" />
          <span className="absolute left-4 top-4 text-amber-500">
            <i class="fa-solid fa-id-card"></i>
          </span>
        </div>

        {/* Dirección */}
        <div className="mb-4 relative">
          <input type="text" name="usr_direccion" placeholder="Dirección" value={formData.usr_direccion} onChange={handleChange} className="w-full p-3 border-2 border-amber-200 rounded-lg pl-10 focus:border-amber-400 focus:ring-2 focus:ring-amber-100" />
          <span className="absolute left-4 top-4 text-amber-500">
            <i class="fa-solid fa-route"></i>
          </span>
        </div>

        {/* Teléfono */}
        <div className="mb-4 relative">
          <input type="text" name="usr_telefono" placeholder="Teléfono" value={formData.usr_telefono} onChange={handleChange} className="w-full p-3 border-2 border-amber-200 rounded-lg pl-10 focus:border-amber-400 focus:ring-2 focus:ring-amber-100" />
          <span className="absolute left-4 top-4 text-amber-500">
            <i class="fa-solid fa-phone"></i>
          </span>
        </div>

        {/* Fecha de nacimiento */}
        <div className="mb-4 relative">
          <input type="date" name="usr_fecha_nacimiento" value={formData.usr_fecha_nacimiento} onChange={handleChange} required className="w-full p-3 border-2 border-amber-200 rounded-lg pl-10 focus:border-amber-400 focus:ring-2 focus:ring-amber-100" />
          <span className="absolute left-4 top-4 text-amber-500">
            <i class="fa-solid fa-calendar"></i>
          </span>
        </div>

        <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold p-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
          Registrarse
        </button>

        {mensaje && <div className="mt-3 text-green-600 text-sm text-center">{mensaje}</div>}
        {error && <div className="mt-3 text-red-500 text-sm text-center">{error}</div>}

        <div className="mt-4 text-center text-sm text-amber-700">
          ¿Ya tienes cuenta? <a href="/login" className="underline">Inicia sesión</a>
        </div>
      </form>
    </div>
  );
}
