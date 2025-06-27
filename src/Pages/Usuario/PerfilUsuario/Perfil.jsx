import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import ModalMensaje from '../../../components/ModalMensaje';

const Perfil = () => {
  const { token } = useAuth();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [modal, setModal] = useState({ visible: false, tipo: 'success', mensaje: '' });
  const [errores, setErrores] = useState({});

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/usuario/perfil', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuario(response.data.data);
      } catch (err) {
        setModal({
          visible: true,
          tipo: 'error',
          mensaje: 'No se pudo obtener el perfil del usuario.',
        });
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchPerfil();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardar = async () => {
  const nuevosErrores = {};

  if (!usuario.usr_nombre.trim()) nuevosErrores.usr_nombre = 'El nombre es obligatorio.';
  if (!usuario.usr_apellido.trim()) nuevosErrores.usr_apellido = 'El apellido es obligatorio.';
  if (!usuario.usr_direccion.trim()) nuevosErrores.usr_direccion = 'La dirección es obligatoria.';
  if (!/^\d{9}$/.test(usuario.usr_telefono)) nuevosErrores.usr_telefono = 'El teléfono debe tener 9 dígitos.';

  setErrores(nuevosErrores);

  if (Object.keys(nuevosErrores).length > 0) return;

  try {
    setGuardando(true);
    const response = await axios.put(
      'http://localhost:8080/api/usuario/perfil',
      usuario,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setModal({
      visible: true,
      tipo: 'success',
      mensaje: response.data.message,
    });
  } catch (error) {
    setModal({
      visible: true,
      tipo: 'error',
      mensaje: error.response?.data?.message || 'Error al actualizar el perfil',
    });
  } finally {
    setGuardando(false);
  }
};



  if (loading) return <div className="text-center mt-10">Cargando perfil...</div>;
  if (!usuario) return <div className="text-center mt-10 text-red-500">No se pudo cargar el perfil</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg border border-amber-200">
      <h2 className="text-2xl font-semibold mb-6 text-amber-800 text-center">Mi Perfil</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Campos editables */}
        <CampoEditable label="Nombre" name="usr_nombre" value={usuario.usr_nombre} onChange={handleChange} error={errores.usr_nombre}/>
        <CampoEditable label="Apellido" name="usr_apellido" value={usuario.usr_apellido} onChange={handleChange} error={errores.usr_apellido}/>
        <CampoEditable label="Dirección" name="usr_direccion" value={usuario.usr_direccion} onChange={handleChange} error={errores.usr_direccion}/>
        <CampoEditable label="Teléfono" name="usr_telefono" value={usuario.usr_telefono} onChange={handleChange} error={errores.usr_telefono}/>

        {/* Campos de solo lectura */}
        <CampoSoloLectura label="Correo electrónico" value={usuario.usr_email} />
        <CampoSoloLectura label="Documento" value={usuario.usr_documento} />
        <CampoSoloLectura label="Fecha de nacimiento" value={usuario.usr_fecha_nacimiento} />
        <CampoSoloLectura label="Estado de cuenta" value={usuario.usr_estado} />
        <CampoSoloLectura label="Tipo de documento" value={usuario.tipoDocumento?.tipdoc_nombre || '—'} />
        <CampoSoloLectura label="Rol de usuario" value={usuario.tipoUsuario?.tipus_nombre || '—'} />
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleGuardar}
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded shadow-md"
          disabled={guardando}
        >
          {guardando ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>

      <ModalMensaje
        visible={modal.visible}
        tipo={modal.tipo}
        mensaje={modal.mensaje}
        onClose={() => setModal({ ...modal, visible: false })}
      />
    </div>
  );
};

const CampoEditable = ({ label, name, value, onChange, error }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value || ''}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded"
      required
    />
  {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const CampoSoloLectura = ({ label, value }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type="text"
      value={value || ''}
      readOnly
      className="w-full p-2 bg-gray-100 border border-gray-300 rounded text-gray-600"
    />
  </div>
);

export default Perfil;
